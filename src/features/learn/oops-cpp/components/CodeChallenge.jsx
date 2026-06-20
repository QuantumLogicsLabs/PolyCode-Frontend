import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../../auth/context/AuthContext";
import { getApiBase } from "../../../../config/apiBase";
import {
  definePolycodeMonacoTheme,
  getVSCodeEditorOptions,
  POLYCODE_VSCODE_THEME,
} from "../../../../shared/utils/monacoTheme";
import ChallengeCompleteCelebration from "../../shared/ChallengeCompleteCelebration";
import { useChallengeCelebration } from "../../shared/useChallengeCelebration";

export default function CodeChallenge({
  challenge,
  accentColor,
  isCompleted,
  onComplete,
  initialCode,
  onCodeChange,
}) {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const canRun = isAuthenticated && !authLoading;

  const [code, setCode] = useState(initialCode || challenge.starterCode);
  const [results, setResults] = useState(null); // null | { passed, tests }
  const [output, setOutput] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning] = useState(false);
  const activeChallengeId = useRef(challenge.id);
  const runTestsRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const fixedSelectionDecorationRef = useRef([]);
  const fixedSelectionRangeRef = useRef(null);
  const { showCelebration, triggerCelebration, dismissCelebration } =
    useChallengeCelebration(challenge.id);
  useEffect(() => {
    const challengeChanged = activeChallengeId.current !== challenge.id;

    if (challengeChanged) {
      activeChallengeId.current = challenge.id;
      setCode(initialCode || challenge.starterCode);
      setResults(null);
      setOutput(null);
      setShowSolution(false);
      clearFixedSelection();
      return;
    }

    if (typeof initialCode === "string") {
      setCode((currentCode) =>
        currentCode === challenge.starterCode ? initialCode : currentCode,
      );
    }
  }, [challenge.id, challenge.starterCode, initialCode]);

  // Lesson runner: use the backend compiler when available, then run the
  // challenge-specific acceptance checks. The local diagnostics keep broken
  // C++ from passing silently if the compiler API is down.
  function runTests() {
    if (!canRun || running || showSolution) return;

    setRunning(true);
    setResults(null);
    setOutput({
      status: "running",
      stdout: "Running checks...",
      expected: simulateCppOutput(challenge.solutionCode),
    });

    setTimeout(async () => {
      const expectedOutput = simulateCppOutput(challenge.solutionCode);
      const diagnostics = getCppDiagnostics(code);

      if (diagnostics.length) {
        const failedTests = challenge.tests.map((test) => ({
          ...test,
          passed: false,
        }));
        setResults({
          passed: false,
          tests: [
            {
              id: "compile",
              label: "C++ compiles before acceptance tests",
              passed: false,
              hint: diagnostics[0],
            },
            ...failedTests,
          ],
        });
        setOutput({
          status: "fail",
          stdout: diagnostics.join("\n"),
          expected: expectedOutput,
        });
        setRunning(false);
        return;
      }

      let compilerResult = null;
      let compilerUnavailable = false;

      try {
        compilerResult = await runCppCodeRemotely(code);
      } catch (error) {
        compilerUnavailable = true;
        console.warn("C++ compiler API unavailable, using local preview:", error);
      }

      if (compilerUnavailable) {
        setResults({
          passed: false,
          tests: [
            {
              id: "compile",
              label: "C++ compiler is reachable",
              passed: false,
              hint: "Start or deploy the backend compiler API.",
            },
            ...challenge.tests.map((test) => ({ ...test, passed: false })),
          ],
        });
        setOutput({
          status: "fail",
          stdout:
            "C++ compiler API is unavailable, so this challenge cannot be verified reliably.\nCheck REACT_APP_API_URL and make sure /api/challenges/run-cpp is deployed.",
          expected: expectedOutput,
        });
        setRunning(false);
        return;
      }

      const compilerError =
        compilerResult?.error || compilerResult?.stderr || "";
      if (compilerResult && (compilerResult.exitCode !== 0 || compilerError)) {
        setResults({
          passed: false,
          tests: [
            {
              id: "compile",
              label: "C++ compiles before acceptance tests",
              passed: false,
              hint: "Fix the compiler error shown in Output.",
            },
            ...challenge.tests.map((test) => ({ ...test, passed: false })),
          ],
        });
        setOutput({
          status: "fail",
          stdout: compilerError || "Compilation failed.",
          expected: expectedOutput,
        });
        setRunning(false);
        return;
      }

      const testResults = challenge.tests.map((test) => {
        // Heuristic checks based on solution keywords
        const solutionKeywords = extractKeywords(
          challenge.solutionCode,
          test.id,
        );
        const passed = solutionKeywords.every((kw) =>
          typeof kw === "string"
            ? code.includes(kw) ||
              code.replace(/\s+/g, "").includes(kw.replace(/\s+/g, ""))
            : kw?.pattern
              ? new RegExp(kw.pattern, kw.flags || "").test(code)
              : true,
        );
        return { ...test, passed };
      });

      const allPassed = testResults.every((t) => t.passed);
      const simulatedOutput = simulateCppOutput(code);
      setResults({ passed: allPassed, tests: testResults });
      const stdout =
        compilerResult?.stdout?.trimEnd() ||
        simulatedOutput ||
        "Program ran, but no console output was produced.";
      setOutput({
        status: allPassed ? "pass" : "fail",
        stdout,
        expected: expectedOutput,
      });
      if (allPassed) {
        triggerCelebration();
        if (!isCompleted) {
          Promise.resolve(onComplete()).catch((error) => {
            console.error("Unable to save lesson progress:", error);
          });
        }
      }
      setRunning(false);
    }, 800);
  }

  useEffect(() => {
    runTestsRef.current = runTests;
  });

  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (canRun) runTestsRef.current?.();
    });

    editor.onContextMenu((event) => {
      const position = event.target.position;
      if (!position) return;

      const fixedRange = fixedSelectionRangeRef.current;
      if (fixedRange && rangeContainsPosition(fixedRange, position)) {
        event.event.preventDefault();
        event.event.stopPropagation();
        clearFixedSelection();
        editor.setSelection(
          new monaco.Selection(
            fixedRange.startLineNumber,
            fixedRange.startColumn,
            fixedRange.startLineNumber,
            fixedRange.startColumn,
          ),
        );
        return;
      }

      const selection = editor.getSelection();
      if (!selection || selection.isEmpty() || !rangeContainsPosition(selection, position)) {
        return;
      }

      event.event.preventDefault();
      event.event.stopPropagation();
      fixedSelectionRangeRef.current = selection;
      fixedSelectionDecorationRef.current = editor.deltaDecorations(
        fixedSelectionDecorationRef.current,
        [
          {
            range: selection,
            options: {
              className: "oops-fixed-selection-range",
              inlineClassName: "oops-fixed-selection-inline",
              stickiness:
                monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          },
        ],
      );
    });
  }

  function clearFixedSelection() {
    if (!editorRef.current) {
      fixedSelectionDecorationRef.current = [];
      fixedSelectionRangeRef.current = null;
      return;
    }

    fixedSelectionDecorationRef.current = editorRef.current.deltaDecorations(
      fixedSelectionDecorationRef.current,
      [],
    );
    fixedSelectionRangeRef.current = null;
  }

  function rangeContainsPosition(range, position) {
    const monaco = monacoRef.current;
    if (!monaco || !range || !position) return false;
    return monaco.Range.containsPosition(range, position);
  }

  function extractKeywords(sol, testId) {
    const explicit = challenge.tests.find((test) => test.id === testId)
      ?.keywords;
    if (explicit) return explicit;

    // Per-test keyword extraction from solution code
    // Maps test index → structural signals to look for in user code
    const lines = sol.split("\n").filter(Boolean);
    switch (testId) {
      case 1:
        return [
          lines
            .find((l) => l.includes("class"))
            ?.trim()
            .split(" ")[1]
            ?.replace("{", "") || "class",
        ].filter(Boolean);
      case 2:
        return [
          lines
            .find((l) => l.includes("(") && !l.includes("//"))
            ?.match(/\w+\s*\(/)?.[0]
            .trim() || "",
        ].filter(Boolean);
      case 3:
        return [
          lines.find((l) => l.includes("cout"))?.includes("cout") ? "cout" : "",
        ].filter(Boolean);
      case 4:
        return ["cout"].filter(Boolean);
      default:
        return [];
    }
  }

  async function runCppCodeRemotely(source) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(`${getApiBase()}/challenges/run-cpp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: source }),
        signal: controller.signal,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || payload.error || "Compiler API failed");
      }
      return payload;
    } finally {
      clearTimeout(timeout);
    }
  }

  function getCppDiagnostics(source = "") {
    const cleanSource = stripComments(source);
    const diagnostics = [];
    const balanceError = getBalanceError(cleanSource);
    if (balanceError) diagnostics.push(balanceError);

    if (!/\bint\s+main\s*\(/.test(cleanSource)) {
      diagnostics.push("Missing int main(). Add a main function that runs your code.");
    }

    collectClassDiagnostics(cleanSource).forEach((message) => {
      diagnostics.push(message);
    });

    collectStatementDiagnostics(cleanSource).forEach((message) => {
      diagnostics.push(message);
    });

    return [...new Set(diagnostics)].slice(0, 5);
  }

  function getBalanceError(source) {
    const pairs = { "(": ")", "{": "}", "[": "]" };
    const opens = new Set(Object.keys(pairs));
    const closes = new Set(Object.values(pairs));
    const stack = [];
    let quote = null;

    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      const previous = source[index - 1];

      if ((char === '"' || char === "'") && previous !== "\\") {
        quote = quote === char ? null : quote || char;
      }
      if (quote) continue;

      if (opens.has(char)) {
        stack.push({ char, index });
      } else if (closes.has(char)) {
        const last = stack.pop();
        if (!last || pairs[last.char] !== char) {
          return `Unexpected '${char}'. Check your brackets near character ${index + 1}.`;
        }
      }
    }

    const last = stack.pop();
    return last
      ? `Missing '${pairs[last.char]}' for '${last.char}'. Check your brackets.`
      : "";
  }

  function collectClassDiagnostics(source) {
    const diagnostics = [];
    const classRegex = /class\s+([A-Za-z_]\w*)\s*(?::\s*[^{]+)?\s*\{/g;
    const mainSource = source.match(/\bint\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}\s*$/)?.[1] || "";

    for (const classMatch of source.matchAll(classRegex)) {
      const className = classMatch[1];
      const openBraceIndex = classMatch.index + classMatch[0].length - 1;
      const closeBraceIndex = findMatchingBrace(source, openBraceIndex);
      if (closeBraceIndex === -1) continue;

      const afterClass = source.slice(closeBraceIndex + 1).trimStart();
      if (!afterClass.startsWith(";")) {
        diagnostics.push(`Missing ';' after class ${className}.`);
      }

      const classBody = source.slice(openBraceIndex + 1, closeBraceIndex);
      const constructorRegex = new RegExp(
        `${className}\\s*\\([^)]*\\)\\s*(?::\\s*[^{}]*)?\\s*\\{([\\s\\S]*?)\\}`,
        "g",
      );

      for (const constructorMatch of classBody.matchAll(constructorRegex)) {
        if (/\breturn\b/.test(constructorMatch[1])) {
          diagnostics.push(`Constructor ${className} cannot return a value.`);
        }
      }

      const firstPublicIndex = classBody.search(/\bpublic\s*:/);
      const firstConstructor = classBody.search(
        new RegExp(`${className}\\s*\\(`),
      );
      const constructorIsPrivate =
        firstConstructor !== -1 &&
        (firstPublicIndex === -1 || firstConstructor < firstPublicIndex);
      const constructedInMain = new RegExp(`\\b${className}\\s+[A-Za-z_]\\w*\\s*[({;]`)
        .test(mainSource);

      if (constructorIsPrivate && constructedInMain) {
        diagnostics.push(
          `${className} constructor is private by default. Add public: before constructors and methods used in main().`,
        );
      }
    }

    return diagnostics;
  }

  function collectStatementDiagnostics(source) {
    const diagnostics = [];
    const lines = source.split("\n");

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      const next = lines[index + 1]?.trim() || "";

      if (!trimmed || trimmed.startsWith("#")) return;
      if (/^(class|struct|public:|private:|protected:|else\b|catch\b)/.test(trimmed)) return;
      if (/[;:{}]$/.test(trimmed)) return;
      if (/[{,]$/.test(trimmed)) return;
      if (/^(if|for|while|switch)\s*\(/.test(trimmed)) return;

      const looksLikeStatement =
        /\b(return|cout|cin|delete|new)\b/.test(trimmed) ||
        /=/.test(trimmed) ||
        /^\)/.test(trimmed);

      if (looksLikeStatement && next.startsWith("}")) {
        diagnostics.push(`Possible missing ';' before line ${index + 2}.`);
      }
    });

    return diagnostics;
  }

  function cleanLiteral(value = "") {
    const trimmed = value.trim();
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed
        .slice(1, -1)
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");
    }
    return trimmed;
  }

  function stripComments(source = "") {
    return source
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split("\n")
      .map((line) => line.replace(/\/\/.*$/, ""))
      .join("\n");
  }

  function splitArgs(value = "") {
    const args = [];
    let current = "";
    let quote = null;

    for (const char of value) {
      if ((char === '"' || char === "'") && quote === null) quote = char;
      else if (char === quote) quote = null;

      if (char === "," && quote === null) {
        args.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    if (current.trim()) args.push(current.trim());
    return args;
  }

  function getParamNames(params = "") {
    return splitArgs(params)
      .map((param) => {
        const pointerToArray = param.match(/\(\s*\*\s*([A-Za-z_]\w*)\s*\)/);
        if (pointerToArray) return pointerToArray[1];

        return param
          .replace(/=.*$/, "")
          .replace(/\[[^\]]*\]/g, "")
          .trim()
          .split(/\s+/)
          .pop()
          ?.replace(/[&*]/g, "");
      })
      .filter(Boolean);
  }

  function resolveToken(token, values, params = new Map()) {
    const cleanToken = token.trim().replace(/;$/, "");
    if (params.has(cleanToken)) return params.get(cleanToken);
    if (values.has(cleanToken)) return values.get(cleanToken);
    return cleanLiteral(cleanToken);
  }

  function collectObjectOutput(source, baseValues) {
    const cleanSource = stripComments(source);
    const output = [];
    const classDefs = new Map();
    const classRegex = /class\s+([A-Za-z_]\w*)\s*(?::\s*([^{]+))?\{([\s\S]*?)\};/g;

    for (const classMatch of cleanSource.matchAll(classRegex)) {
      const [, className, inheritance = "", classBody] = classMatch;
      const constructorRegex = new RegExp(
        `${className}\\s*\\(([^)]*)\\)\\s*(?::\\s*([^{}]*))?\\s*\\{([\\s\\S]*?)\\}`,
        "g",
      );
      const constructors = [...classBody.matchAll(constructorRegex)].map(
        (match) => ({
          params: getParamNames(match[1]),
          initializers: match[2] || "",
          body: match[3] || "",
        }),
      );
      const methodRegex =
        /\b(?:void|int|double|float|string|bool|auto)\s+([A-Za-z_]\w*)\s*\([^)]*\)\s*(?:const)?\s*\{([\s\S]*?)\}/g;
      const methods = new Map(
        [...classBody.matchAll(methodRegex)].map((match) => [
          match[1],
          match[2] || "",
        ]),
      );
      const bases = inheritance
        .split(",")
        .map((base) =>
          base
            .replace(/\b(public|private|protected|virtual)\b/g, "")
            .trim(),
        )
        .filter(Boolean);

      classDefs.set(className, { className, constructors, methods, bases });
    }

    function getAvailableMethods(className, seen = new Set()) {
      const classDef = classDefs.get(className);
      if (!classDef || seen.has(className)) return new Map();

      seen.add(className);
      const availableMethods = new Map();
      classDef.bases.forEach((baseName) => {
        getAvailableMethods(baseName, seen).forEach((body, name) => {
          availableMethods.set(name, body);
        });
      });
      classDef.methods.forEach((body, name) => {
        availableMethods.set(name, body);
      });
      seen.delete(className);
      return availableMethods;
    }

    classDefs.forEach(({ className, constructors }) => {
      const availableMethods = getAvailableMethods(className);
      const objectRegex = new RegExp(
        `\\b${className}\\s+([A-Za-z_]\\w*)\\s*\\(([^;]*)\\)\\s*;`,
        "g",
      );

      for (const objectMatch of cleanSource.matchAll(objectRegex)) {
        const [, objectName, rawArgs] = objectMatch;
        const args = splitArgs(rawArgs).map((arg) =>
          resolveToken(arg, baseValues),
        );
        const constructor =
          constructors.find((item) => item.params.length === args.length) ||
          constructors[0];
        const memberValues = new Map();
        const paramValues = new Map();

        constructor?.params.forEach((param, index) => {
          paramValues.set(param, args[index] ?? "");
        });

        const initializerRegex = /([A-Za-z_]\w*)\s*\(([^)]*)\)/g;
        for (const initMatch of (constructor?.initializers || "").matchAll(
          initializerRegex,
        )) {
          memberValues.set(
            initMatch[1],
            resolveToken(initMatch[2], baseValues, paramValues),
          );
        }

        const assignmentRegex =
          /(?:this->)?([A-Za-z_]\w*)\s*=\s*("[^"]*"|'[^']*'|[A-Za-z_]\w*|[-+]?\d+(?:\.\d+)?)/g;
        for (const assignmentMatch of (constructor?.body || "").matchAll(
          assignmentRegex,
        )) {
          memberValues.set(
            assignmentMatch[1],
            resolveToken(assignmentMatch[2], baseValues, paramValues),
          );
        }

        memberValues.forEach((value, key) => {
          baseValues.set(key, value);
          baseValues.set(`${objectName}.${key}`, value);
        });
        const objectMemberAssignments = new RegExp(
          `\\b${objectName}\\.([A-Za-z_]\\w*)\\s*=\\s*("[^"]*"|'[^']*'|[-+]?\\d+(?:\\.\\d+)?|true|false)\\s*;`,
          "g",
        );
        for (const assignmentMatch of cleanSource.matchAll(objectMemberAssignments)) {
          const [, memberName, rawValue] = assignmentMatch;
          const value = cleanLiteral(rawValue);
          memberValues.set(memberName, value);
          baseValues.set(memberName, value);
          baseValues.set(`${objectName}.${memberName}`, value);
        }
        availableMethods.forEach((methodBody, methodName) => {
          const returnMatch = methodBody.match(/return\s+([^;]+);/);
          if (!returnMatch) return;

          const resolved = evaluateExpression(returnMatch[1], memberValues);
          if (resolved !== "") {
            baseValues.set(`${methodName}()`, resolved);
            baseValues.set(`${objectName}.${methodName}()`, resolved);
          }
        });

        const callRegex = new RegExp(
          `\\b${objectName}\\.([A-Za-z_]\\w*)\\s*\\(\\s*\\)\\s*;`,
          "g",
        );
        for (const callMatch of cleanSource.matchAll(callRegex)) {
          const methodBody = availableMethods.get(callMatch[1]);
          if (!methodBody) continue;

          output.push(...renderMethodBody(methodBody, availableMethods, baseValues));
        }
      }
    });

    return output;
  }

  function renderMethodBody(methodBody, methods, values, seen = new Set()) {
    const output = [];
    const statementRegex = /([^;]+);/g;

    for (const statementMatch of methodBody.matchAll(statementRegex)) {
      const statement = statementMatch[1].trim();
      if (!statement) continue;
      const callOnlyMatch = statement.match(/([A-Za-z_]\w*)\s*\(\s*\)$/);

      if (statement.includes("cout")) {
        const rendered = statement
          .split("<<")
          .map((part) => renderCoutPart(part, values))
          .join("");
        if (rendered) output.push(rendered);
        continue;
      }

      const callMatch = callOnlyMatch && statement === callOnlyMatch[0]
        ? callOnlyMatch
        : null;
      if (!callMatch || seen.has(callMatch[1])) continue;

      const nestedBody = methods.get(callMatch[1]);
      if (!nestedBody) continue;

      seen.add(callMatch[1]);
      output.push(...renderMethodBody(nestedBody, methods, values, seen));
      seen.delete(callMatch[1]);
    }

    return output;
  }

  function findMatchingBrace(source, openIndex) {
    let depth = 0;
    let quote = null;

    for (let index = openIndex; index < source.length; index += 1) {
      const char = source[index];
      const previous = source[index - 1];

      if ((char === '"' || char === "'") && previous !== "\\") {
        quote = quote === char ? null : quote || char;
      }
      if (quote) continue;

      if (char === "{") depth += 1;
      if (char === "}") {
        depth -= 1;
        if (depth === 0) return index;
      }
    }

    return -1;
  }

  function collectFunctionDefs(source) {
    const functions = new Map();
    const functionRegex =
      /\b(?:void|int|double|float|string|bool|auto)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*\{/g;

    for (const match of source.matchAll(functionRegex)) {
      const [, functionName, params] = match;
      if (functionName === "main") continue;

      const openBraceIndex = match.index + match[0].length - 1;
      const closeBraceIndex = findMatchingBrace(source, openBraceIndex);
      if (closeBraceIndex === -1) continue;

      const overloads = functions.get(functionName) || [];
      overloads.push({
        params: getParamNames(params),
        body: source.slice(openBraceIndex + 1, closeBraceIndex),
      });
      functions.set(functionName, overloads);
    }

    return functions;
  }

  function bindFunctionArgs(functionDef, rawArgs, baseValues) {
    const values = new Map(baseValues);
    const args = splitArgs(rawArgs);

    functionDef.params.forEach((param, index) => {
      const arg = args[index]?.trim();
      if (!arg) return;

      values.set(param, resolveToken(arg, baseValues));
      [...baseValues.entries()].forEach(([key, value]) => {
        if (key === arg || key.startsWith(`${arg}[`)) {
          values.set(key.replace(arg, param), value);
        }
      });
    });

    return values;
  }

  function resolveLoopLimit(rawLimit, values) {
    const resolved = values.get(rawLimit.trim()) ?? rawLimit.trim();
    const parsed = Number(resolved);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function renderFunctionBody(body, values, functionDefs = new Map(), maxLines = 200) {
    const output = [];
    let lineCount = 0;

    function renderLines(block, scopedValues) {
      block.split("\n").forEach((rawLine) => {
        const line = rawLine.split("//")[0];
        if (!line.includes("cout") || lineCount >= maxLines) return;

        const rendered = line
          .split("<<")
          .map((part) => renderCoutPart(part, scopedValues, functionDefs))
          .join("");
        if (rendered) {
          output.push(rendered);
          lineCount += 1;
        }
      });
    }

    function runBlock(block, scopedValues) {
      const forRegex =
        /for\s*\(\s*(?:int\s+)?([A-Za-z_]\w*)\s*=\s*(-?\d+)\s*;\s*\1\s*<\s*([A-Za-z_]\w*|-?\d+)\s*;\s*\1\s*\+\+\s*\)\s*\{/g;
      let cursor = 0;

      for (const loopMatch of block.matchAll(forRegex)) {
        renderLines(block.slice(cursor, loopMatch.index), scopedValues);

        const [, loopVar, rawStart, rawLimit] = loopMatch;
        const openBraceIndex = loopMatch.index + loopMatch[0].length - 1;
        const closeBraceIndex = findMatchingBrace(block, openBraceIndex);
        if (closeBraceIndex === -1) continue;

        const loopBody = block.slice(openBraceIndex + 1, closeBraceIndex);
        const start = Number(rawStart);
        const limit = resolveLoopLimit(rawLimit, scopedValues);

        for (let value = start; value < limit && lineCount < maxLines; value += 1) {
          const nextValues = new Map(scopedValues);
          nextValues.set(loopVar, String(value));
          runBlock(loopBody, nextValues);
        }

        cursor = closeBraceIndex + 1;
      }

      renderLines(block.slice(cursor), scopedValues);
    }

    runBlock(body, values);
    return output;
  }

  function evaluateExpression(expression, values) {
    const result = evaluateNumericExpression(expression, values);
    if (!Number.isFinite(result)) return "";
    return Number.isInteger(result)
      ? String(result)
      : String(Number(result.toFixed(2)));
  }

  function evaluateNumericExpression(expression, values) {
    const tokens = String(expression)
      .replace(/\bM_PI\b|\bPI\b/g, "3.14159")
      .match(/sqrt|[A-Za-z_]\w*|\d+(?:\.\d+)?|[()+\-*/]/g);
    if (!tokens) return NaN;

    let index = 0;
    const peek = () => tokens[index];
    const consume = () => tokens[index++];

    function parseExpression() {
      let value = parseTerm();
      while (peek() === "+" || peek() === "-") {
        const op = consume();
        const next = parseTerm();
        value = op === "+" ? value + next : value - next;
      }
      return value;
    }

    function parseTerm() {
      let value = parseFactor();
      while (peek() === "*" || peek() === "/") {
        const op = consume();
        const next = parseFactor();
        value = op === "*" ? value * next : value / next;
      }
      return value;
    }

    function parseFactor() {
      const token = consume();
      if (token === "-") return -parseFactor();
      if (token === "+") return parseFactor();
      if (token === "(") {
        const value = parseExpression();
        if (peek() === ")") consume();
        return value;
      }
      if (token === "sqrt") {
        if (peek() === "(") consume();
        const value = parseExpression();
        if (peek() === ")") consume();
        return Math.sqrt(value);
      }
      if (/^\d/.test(token)) return Number(token);
      if (values.has(token)) return Number(values.get(token));
      return NaN;
    }

    const result = parseExpression();
    return index <= tokens.length && Number.isFinite(result) ? result : NaN;
  }

  function evaluateFunctionCall(token, values, functionDefs) {
    const callMatch = token.match(/^([A-Za-z_]\w*)\s*\((.*)\)$/);
    if (!callMatch) return "";

    const [, functionName, rawArgs] = callMatch;
    const overloads = functionDefs.get(functionName) || [];
    const args = splitArgs(rawArgs);
    const functionDef = overloads.find((item) => item.params.length === args.length);
    if (!functionDef) return "";

    const scopedValues = new Map(values);
    functionDef.params.forEach((param, index) => {
      const arg = args[index] || "";
      const numericValue = evaluateNumericExpression(arg, values);
      scopedValues.set(
        param,
        Number.isFinite(numericValue) ? String(numericValue) : resolveToken(arg, values),
      );
    });

    const localDeclarationRegex =
      /\b(?:int|double|float|auto)\s+([A-Za-z_]\w*)\s*=\s*([^;]+);/g;
    for (const localMatch of functionDef.body.matchAll(localDeclarationRegex)) {
      const [, name, expr] = localMatch;
      const value = evaluateExpression(expr, scopedValues);
      if (value !== "") scopedValues.set(name, value);
    }

    const returnMatch = functionDef.body.match(/return\s+([^;]+);/);
    return returnMatch ? evaluateExpression(returnMatch[1], scopedValues) : "";
  }

  function collectFunctionOutput(source, baseValues, mainSource, functionDefs) {
    const output = [];
    const callRegex = /\b([A-Za-z_]\w*)\s*\(([^;{}]*)\)\s*;/g;

    for (const callMatch of mainSource.matchAll(callRegex)) {
      const functionDef = (functionDefs.get(callMatch[1]) || [])[0];
      if (!functionDef) continue;

      const values = bindFunctionArgs(functionDef, callMatch[2], baseValues);
      output.push(...renderFunctionBody(functionDef.body, values, functionDefs));
    }

    return output;
  }

  function resolveIndexedKey(token, values) {
    return token.replace(/\[([^\]]+)\]/g, (match, expression) => {
      const numericValue = evaluateNumericExpression(expression, values);
      if (Number.isFinite(numericValue)) return `[${Math.trunc(numericValue)}]`;
      const name = expression.trim();
      return `[${values.get(name) ?? name}]`;
    });
  }

  function collectKnownValues(source) {
    const values = new Map();
    const arrays = new Map();
    const declarations =
      /\b(?:string|int|double|float|char|bool|auto)\s+([A-Za-z_]\w*)\s*=\s*("[^"]*"|'[^']*'|[-+]?\d+(?:\.\d+)?|true|false)/g;
    const arrayDeclarations =
      /\b(?:int|double|float|char|bool|string)\s+([A-Za-z_]\w*)\s*\[\s*\]\s*=\s*\{([^}]*)\}/g;
    const twoDArrayDeclarations =
      /\b(?:int|double|float|char|bool|string)\s+([A-Za-z_]\w*)\s*\[\s*\d+\s*\]\s*\[\s*\d+\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/g;
    const pointerDeclarations =
      /\b(?:int|double|float|char|bool|string)\s*\*\s*([A-Za-z_]\w*)\s*=\s*(nullptr|&\s*[A-Za-z_]\w*|[A-Za-z_]\w*)/g;
    const rowPointerDeclarations =
      /\b(?:int|double|float|char|bool|string)\s*\(\s*\*\s*([A-Za-z_]\w*)\s*\)\s*\[\s*\d+\s*\]\s*=\s*([A-Za-z_]\w*)/g;
    const newPointerDeclarations =
      /\b(?:int|double|float|char|bool|string)\s*\*\s*([A-Za-z_]\w*)\s*=\s*new\s+(?:int|double|float|char|bool|string)\s*\(([^)]*)\)/g;
    const smartPointerDeclarations =
      /\b(?:auto|(?:std::)?(?:unique_ptr|shared_ptr)\s*<\s*(?:int|double|float|char|bool|string)\s*>)\s+([A-Za-z_]\w*)\s*=\s*(?:std::)?make_(?:unique|shared)\s*<\s*(?:int|double|float|char|bool|string)\s*>\s*\(([^)]*)\)/g;
    const pointerAssignments =
      /(^|[^\w*])([A-Za-z_]\w*)\s*=\s*&\s*([A-Za-z_]\w*)/gm;
    const memberAssignments =
      /\b([A-Za-z_]\w*)\.([A-Za-z_]\w*)\s*=\s*("[^"]*"|'[^']*'|[-+]?\d+(?:\.\d+)?|true|false)/g;
    const indexedAssignments =
      /\b([A-Za-z_]\w*(?:\s*\[[^\]]+\])+)\s*=\s*("[^"]*"|'[^']*'|[-+]?\d+(?:\.\d+)?|true|false)/g;
    const assignments =
      /\b([A-Za-z_]\w*)\s*=\s*("[^"]*"|'[^']*'|[-+]?\d+(?:\.\d+)?|true|false)/g;

    for (const match of source.matchAll(declarations)) {
      values.set(match[1], cleanLiteral(match[2]));
    }
    for (const match of source.matchAll(arrayDeclarations)) {
      const arrayName = match[1];
      const items = splitArgs(match[2]).map((item) => cleanLiteral(item));
      arrays.set(arrayName, items);
      items.forEach((item, index) => {
        values.set(`${arrayName}[${index}]`, item);
      });
    }
    for (const match of source.matchAll(twoDArrayDeclarations)) {
      const arrayName = match[1];
      const rowMatches = [...match[2].matchAll(/\{([^{}]*)\}/g)];
      rowMatches.forEach((rowMatch, rowIndex) => {
        splitArgs(rowMatch[1]).forEach((item, columnIndex) => {
          values.set(
            `${arrayName}[${rowIndex}][${columnIndex}]`,
            cleanLiteral(item),
          );
        });
      });
    }
    for (const match of source.matchAll(rowPointerDeclarations)) {
      const pointerName = match[1];
      const arrayName = match[2];
      values.set(pointerName, arrayName);
      [...values.entries()].forEach(([key, value]) => {
        if (key.startsWith(`${arrayName}[`)) {
          values.set(key.replace(arrayName, pointerName), value);
        }
      });
    }
    for (const match of source.matchAll(pointerDeclarations)) {
      const pointerName = match[1];
      const target = match[2].replace(/&\s*/, "").trim();
      values.set(pointerName, match[2].trim());
      if (arrays.has(target)) {
        values.set(`@array:${pointerName}`, target);
      } else if (target !== "nullptr" && values.has(target)) {
        values.set(`*${pointerName}`, values.get(target));
      }
    }
    for (const match of source.matchAll(newPointerDeclarations)) {
      const pointerName = match[1];
      values.set(pointerName, "heap allocation");
      values.set(`*${pointerName}`, cleanLiteral(match[2]));
    }
    for (const match of source.matchAll(smartPointerDeclarations)) {
      const pointerName = match[1];
      values.set(pointerName, "smart pointer");
      values.set(`*${pointerName}`, cleanLiteral(match[2]));
    }
    for (const match of source.matchAll(pointerAssignments)) {
      const pointerName = match[2];
      const target = match[3];
      values.set(pointerName, `&${target}`);
      if (values.has(target)) {
        values.set(`*${pointerName}`, values.get(target));
      }
    }
    for (const match of source.matchAll(memberAssignments)) {
      values.set(`${match[1]}.${match[2]}`, cleanLiteral(match[3]));
    }
    for (const match of source.matchAll(indexedAssignments)) {
      values.set(resolveIndexedKey(match[1].replace(/\s+/g, ""), values), cleanLiteral(match[2]));
    }
    for (const match of source.matchAll(assignments)) {
      if (!values.has(match[1])) values.set(match[1], cleanLiteral(match[2]));
    }

    return values;
  }

  function renderCoutPart(part, values, functionDefs = new Map()) {
    const token = part.trim().replace(/;$/, "");
    if (!token || token === "cout") return "";
    if (token === "endl") return "\n";
    if (token === "fixed" || /^setprecision\s*\(/.test(token)) return "";
    if (token === '"\\n"' || token === "'\\n'") return "\n";
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'"))
    ) {
      return cleanLiteral(token);
    }
    if (/^[-+]?\d+(\.\d+)?$/.test(token)) return token;
    const pointerArrayAccess = token.match(
      /^\*\s*\(\s*([A-Za-z_]\w*)\s*\+\s*(\d+)\s*\)$/,
    );
    if (pointerArrayAccess) {
      const [, pointerName, index] = pointerArrayAccess;
      const arrayName = values.get(`@array:${pointerName}`);
      const arrayValue = values.get(`${arrayName}[${index}]`);
      if (arrayValue !== undefined) return arrayValue;
    }
    const resolvedIndexedToken = resolveIndexedKey(token, values);
    const functionValue = evaluateFunctionCall(token, values, functionDefs);
    if (functionValue !== "") return functionValue;
    if (values.has(resolvedIndexedToken)) return values.get(resolvedIndexedToken);
    if (values.has(token)) return values.get(token);
    return "";
  }

  function simulateCppOutput(source = "") {
    const values = collectKnownValues(source);
    const functionDefs = collectFunctionDefs(source);
    const outputLines = collectObjectOutput(source, values);
    const mainMatch = source.match(/\bint\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}\s*$/);
    const directOutputSource = mainMatch ? mainMatch[1] : source;
    outputLines.push(
      ...collectFunctionOutput(source, values, directOutputSource, functionDefs),
    );

    directOutputSource.split("\n").forEach((rawLine) => {
      const line = rawLine.split("//")[0];
      if (!line.includes("cout")) return;
      const rendered = line
        .split("<<")
        .map((part) => renderCoutPart(part, values, functionDefs))
        .join("");
      if (rendered) outputLines.push(rendered);
    });

    return outputLines.join("").trim();
  }

  function resetCode() {
    setCode(challenge.starterCode);
    onCodeChange?.(challenge.starterCode);
    setResults(null);
    setOutput(null);
    setShowSolution(false);
  }

  return (
    <div className="oops-challenge">
      <ChallengeCompleteCelebration
        show={showCelebration}
        onDismiss={dismissCelebration}
      />
      {/* Problem statement */}
      <div className="oops-problem-panel">
        <div className="oops-problem-header">
          <h3 className="oops-problem-title">{challenge.title}</h3>
          {canRun && isCompleted && (
            <span
              className="oops-problem-solved"
              style={{ color: accentColor }}
            >
              ✓ Solved
            </span>
          )}
        </div>
        <p className="oops-problem-desc">{challenge.description}</p>

        {!canRun && (
          <div className="oops-auth-gate">
            <p>
              You can write code in the editor. Sign in or create an account to
              run, submit, save progress, and mark lessons complete.
            </p>
            <div className="oops-auth-gate-actions">
              <Link to="/login" className="oops-auth-gate-btn">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="oops-auth-gate-btn oops-auth-gate-btn-primary"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

        {/* Test cases */}
        <div className="oops-test-cases">
          <div className="oops-test-cases-label">Acceptance Tests</div>
          {(results ? results.tests : challenge.tests).map((t) => (
            <div
              key={t.id}
              className={`oops-test-row ${
                results ? (t.passed ? "oops-test-pass" : "oops-test-fail") : ""
              }`}
            >
              <span className="oops-test-icon">
                {results ? (t.passed ? "✓" : "✗") : "○"}
              </span>
              <span className="oops-test-label">{t.label}</span>
              {results && !t.passed && t.hint && (
                <span className="oops-test-hint">Hint: {t.hint}</span>
              )}
            </div>
          ))}
        </div>

        <div
          className={`oops-output-panel ${
            output?.status ? `oops-output-${output.status}` : ""
          }`}
        >
          <div className="oops-output-head">
            <span>Output</span>
            <small>{output ? "after last run" : "waiting for run"}</small>
          </div>
          <pre className="oops-output-body">
            {output?.stdout || "Run your code to see console output here."}
          </pre>
          {output?.expected && (
            <div className="oops-expected-output">
              <span>Expected</span>
              <code>{output.expected}</code>
            </div>
          )}
        </div>
      </div>

      {/* Editor panel */}
      <div className="oops-editor-panel">
        <div className="oops-editor-topbar">
          <span className="oops-editor-lang">C++ · main.cpp</span>
          <div className="oops-editor-actions">
            <button
              className="oops-editor-action"
              onClick={resetCode}
              title="Reset"
            >
              ↺ Reset
            </button>
            <button
              type="button"
              className="oops-editor-action"
              onClick={() => setShowSolution(!showSolution)}
              disabled={!canRun}
            >
              {showSolution ? "Hide Solution" : "💡 Solution"}
            </button>
          </div>
        </div>

        <div className="oops-editor">
          <Editor
            height="100%"
            language="cpp"
            value={showSolution ? challenge.solutionCode : code}
            beforeMount={definePolycodeMonacoTheme}
            onMount={handleEditorMount}
            theme={POLYCODE_VSCODE_THEME}
            onChange={(value) => {
              if (!showSolution) {
                const nextCode = value || "";
                setCode(nextCode);
                if (isAuthenticated) onCodeChange?.(nextCode);
              }
            }}
            options={getVSCodeEditorOptions({
              fontSize: 14,
              readOnly: showSolution,
            })}
          />
        </div>

        {/* Run bar */}
        <div className="oops-run-bar">
          {results && (
            <div
              className={`oops-verdict ${results.passed ? "oops-verdict-pass" : "oops-verdict-fail"}`}
            >
              {results.passed
                ? `✓ All tests passed!`
                : `${results.tests.filter((t) => t.passed).length}/${results.tests.length} tests passed`}
            </div>
          )}
          <button
            type="button"
            className="oops-run-btn"
            style={{ "--accent": accentColor }}
            onClick={runTests}
            disabled={!canRun || running || showSolution}
            title={
              !canRun ? "Sign in or sign up to run and submit" : undefined
            }
          >
            {authLoading ? (
              <span className="oops-run-spinner">Checking sign-in…</span>
            ) : running ? (
              <span className="oops-run-spinner">⟳ Running…</span>
            ) : canRun ? (
              "▶ Run & Submit"
            ) : (
              "Sign in to run & submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
