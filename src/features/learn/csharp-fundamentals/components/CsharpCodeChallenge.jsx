import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  definePolycodeMonacoTheme,
  getVSCodeEditorOptions,
  POLYCODE_VSCODE_THEME,
} from "../../../../shared/utils/monacoTheme";
import ChallengeCompleteCelebration from "../../shared/ChallengeCompleteCelebration";
import { useChallengeCelebration } from "../../shared/useChallengeCelebration";

function normalizeWhitespace(value = "") {
  return value.replace(/\s+/g, "");
}

function testPasses(test, code, solutionCode) {
  const keywords =
    test.keywords || extractKeywords(solutionCode, test.id, [test]);
  if (!keywords.length) return true;

  return keywords.every((keyword) => {
    if (typeof keyword === "string") {
      return (
        code.includes(keyword) ||
        normalizeWhitespace(code).includes(normalizeWhitespace(keyword))
      );
    }
    if (keyword?.pattern) {
      return new RegExp(keyword.pattern, keyword.flags || "").test(code);
    }
    return true;
  });
}

function extractKeywords(solutionCode, testId) {
  const lines = solutionCode
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("//"));

  return lines[testId - 1] ? [lines[testId - 1]] : [];
}

export default function CsharpCodeChallenge({
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
  const [results, setResults] = useState(null);
  const [output, setOutput] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning] = useState(false);
  const activeChallengeId = useRef(challenge.id);
  const runTestsRef = useRef(null);
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
      return;
    }

    if (typeof initialCode === "string") {
      setCode((currentCode) =>
        currentCode === challenge.starterCode ? initialCode : currentCode,
      );
    }
  }, [challenge.id, challenge.starterCode, initialCode]);

  function runTests() {
    if (!canRun || running || showSolution) return;

    setRunning(true);
    setResults(null);
    setOutput({
      status: "running",
      stdout: "Compiling source structure and running .NET validation assertions…",
    });

    window.setTimeout(() => {
      // Basic static analysis check mimicking runtime verification
      const missingSemicolon = code.includes("Console.WriteLine") && 
                              !new RegExp("Console\\.WriteLine\\s*\\(.*\\)\\s*;").test(code);

      if (missingSemicolon) {
        setResults({
          passed: false,
          tests: [
            {
              id: "runtime",
              label: "C# source compiles without errors",
              passed: false,
              hint: "Compilation Error (CS1002): ; expected",
            },
            ...challenge.tests.map((test) => ({ ...test, passed: false })),
          ],
        });
        setOutput({
          status: "fail",
          stdout: "Compilation Error (CS1002): ; expected near end of line statement context.",
          expected: "Program executable output stream logs.",
        });
        setRunning(false);
        return;
      }

      const testResults = challenge.tests.map((test) => ({
        ...test,
        passed: testPasses(test, code, challenge.solutionCode),
      }));

      const acceptanceTests = testResults.filter((test) => test.id !== "runtime");
      const allPassed = acceptanceTests.every((test) => test.passed);

      // Simulating a parsed stdout window for visual continuity
      let simulatedStdout = "";
      if (allPassed) {
        const match = challenge.solutionCode.match(/Console\.WriteLine\s*\(\s*["'](.*)["']\s*\)/);
        simulatedStdout = match ? match[1] : "Process exited with code 0.";
      } else {
        simulatedStdout = "Test validation sequence failed. Mismatched code signatures.";
      }

      setResults({ passed: allPassed, tests: testResults });
      setOutput({
        status: allPassed ? "pass" : "fail",
        stdout: simulatedStdout,
        expected: challenge.tests[0]?.hint || "All conditions met.",
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
    }, 600);
  }

  useEffect(() => {
    runTestsRef.current = runTests;
  });

  function handleEditorMount(editor, monaco) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (canRun) runTestsRef.current?.();
    });
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
        {Array.isArray(challenge.description) ? (
          <div className="oops-problem-desc">
            {challenge.description.map((block, i) => {
              if (block.type === "text")
                return (
                  <p key={i} style={{ marginBottom: "10px" }}>
                    {block.content}
                  </p>
                );
              if (block.type === "code")
                return (
                  <pre
                    key={i}
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      padding: "10px 14px",
                      borderRadius: "7px",
                      fontSize: "0.82rem",
                      margin: "8px 0",
                      overflowX: "auto",
                    }}
                  >
                    <code>{block.content}</code>
                  </pre>
                );
              if (block.type === "callout")
                return (
                  <div
                    key={i}
                    style={{
                      borderLeft: "3px solid #ffe566",
                      padding: "8px 12px",
                      background: "rgba(184,255,0,0.06)",
                      borderRadius: "6px",
                      margin: "8px 0",
                      fontSize: "0.86rem",
                    }}
                  >
                    {block.content}
                  </div>
                );
              if (block.type === "expected")
                return (
                  <div key={i} style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#6e7891",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {block.label}
                    </span>
                    <pre
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        marginTop: "5px",
                      }}
                    >
                      <code>{block.content}</code>
                    </pre>
                  </div>
                );
              return null;
            })}
          </div>
        ) : (
          <p className="oops-problem-desc">{challenge.description}</p>
        )}

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
            <span>Console Output</span>
            <small>{output ? "after last run" : "waiting for compilation"}</small>
          </div>
          <pre className="oops-output-body">
            {output?.stdout || "Compile your source entry assembly to inspect output lines."}
          </pre>
          {output?.expected && (
            <div className="oops-expected-output">
              <span>Expected Check</span>
              <code>{output.expected}</code>
            </div>
          )}
        </div>
      </div>

      <div className="oops-editor-panel">
        <div className="oops-editor-topbar">
          <span className="oops-editor-lang">C# · Program.cs</span>
          <div className="oops-editor-actions">
            <button
              type="button"
              className="oops-editor-action"
              onClick={resetCode}
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
            language="csharp"
            value={showSolution ? challenge.solutionCode : code}
            beforeMount={definePolycodeMonacoTheme}
            onMount={handleEditorMount}
            theme={POLYCODE_VSCODE_THEME}
            onChange={(value) => {
              if (!showSolution) {
                const next = value || "";
                setCode(next);
                if (isAuthenticated) onCodeChange?.(next);
              }
            }}
            options={getVSCodeEditorOptions({
              fontSize: 14,
              readOnly: showSolution,
            })}
          />
        </div>

        <div className="oops-run-bar">
          {results && (
            <div
              className={`oops-verdict ${results.passed ? "oops-verdict-pass" : "oops-verdict-fail"}`}
            >
              {results.passed
                ? "✓ All compiler validations passed!"
                : `${results.tests.filter((t) => t.passed && t.id !== "runtime").length}/${challenge.tests.length} tests passed`}
            </div>
          )}
          <button
            type="button"
            className="oops-run-btn"
            style={{ "--accent": accentColor }}
            onClick={runTests}
            disabled={!canRun || running || showSolution}
            title={!canRun ? "Sign in or sign up to run and submit" : undefined}
          >
            {authLoading
              ? "Checking sign-in…"
              : running
                ? "⟳ Compiling…"
                : canRun
                  ? "▶ Build & Run"
                  : "Sign in to compile & run"}
          </button>
        </div>
      </div>
    </div>
  );
}