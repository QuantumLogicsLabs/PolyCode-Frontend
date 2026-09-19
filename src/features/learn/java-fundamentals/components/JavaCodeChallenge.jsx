import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  definePolycodeMonacoTheme,
  getVSCodeEditorOptions,
  POLYCODE_VSCODE_THEME,
} from "../../../../shared/utils/monacoTheme";
import {
  formatJavaOutput,
  getJavaRuntimeError,
  runJavaCode,
} from "../../shared/runJava";
import ChallengeCompleteCelebration from "../../shared/ChallengeCompleteCelebration";
import { useChallengeCelebration } from "../../shared/useChallengeCelebration";
import { useChallengeTelemetry } from "../../shared/challengeTelemetry";

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

export default function JavaCodeChallenge({
  challenge,
  accentColor,
  isCompleted,
  onComplete,
  initialCode,
  onCodeChange,
}) {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const canRun = isAuthenticated && !authLoading;
  const reportChallengeResult = useChallengeTelemetry();

  const [code, setCode] = useState(initialCode || challenge.starterCode);
  const [results, setResults] = useState(null);
  const [output, setOutput] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  // Read by the editor's onChange: Monaco fires it with the solution text when
  // swapping it in, before the handler closure sees showSolution=true.
  const showSolutionRef = useRef(false);
  showSolutionRef.current = showSolution;
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
      stdout: "Compiling and running Java…",
    });

    window.setTimeout(async () => {
      // Run the solution code to get the expected output
      let expectedOutput = "";
      try {
        const expectedRun = await runJavaCode(challenge.solutionCode);
        expectedOutput = formatJavaOutput(expectedRun.result);
      } catch {
        expectedOutput = "";
      }

      // Run the student's code
      let runPayload;
      try {
        runPayload = await runJavaCode(code);
      } catch (error) {
        setResults({
          passed: false,
          tests: [
            {
              id: "runtime",
              label: "Java compiles and runs without errors",
              passed: false,
              hint: error.message || "Could not run Java. Is the backend running?",
            },
            ...challenge.tests.map((test) => ({ ...test, passed: false })),
          ],
        });
        setOutput({
          status: "fail",
          stdout: error.message || "Run failed",
          expected: expectedOutput,
        });
        setRunning(false);
        return;
      }

      const { result: runResult } = runPayload;
      const runtimeError = getJavaRuntimeError(runResult);
      const stdout = formatJavaOutput(runResult);

      if (runtimeError) {
        setResults({
          passed: false,
          tests: [
            {
              id: "runtime",
              label: "Java compiles and runs without errors",
              passed: false,
              hint: "Fix the error shown in Output, then run again.",
            },
            ...challenge.tests.map((test) => ({ ...test, passed: false })),
          ],
        });
        setOutput({
          status: "fail",
          stdout: runtimeError,
          expected: expectedOutput,
        });
        setRunning(false);
        return;
      }

      // Run keyword/pattern acceptance tests against student code
      const testResults = challenge.tests.map((test) => ({
        ...test,
        passed: testPasses(test, code, challenge.solutionCode),
      }));

      const acceptanceTests = testResults.filter((t) => t.id !== "runtime");
      const allPassed = acceptanceTests.every((t) => t.passed);

      setResults({ passed: allPassed, tests: testResults });
      setOutput({
        status: allPassed ? "pass" : "fail",
        stdout: stdout || "Program ran (no printed output).",
        expected: expectedOutput,
      });

      if (allPassed) {
        reportChallengeResult?.(true);
        triggerCelebration();
        if (!isCompleted) {
          Promise.resolve(onComplete()).catch((error) => {
            console.error("Unable to save lesson progress:", error);
          });
        }
      } else {
        reportChallengeResult?.(false);
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

        {/* Challenge description — supports rich block arrays or plain string */}
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
                      borderLeft: "3px solid #e76f00",
                      padding: "8px 12px",
                      background: "rgba(231,111,0,0.07)",
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

        {/* Auth gate — can write but not run without signing in */}
        {!canRun && (
          <div className="oops-auth-gate">
            <p>
              You can write code in the editor. Sign in or create an account to
              compile, run, save progress, and mark lessons complete.
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

        {/* Acceptance tests */}
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

        {/* Output panel */}
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
            {output?.stdout || "Run your code to see output here."}
          </pre>
          {output?.expected && (
            <div className="oops-expected-output">
              <span>Expected</span>
              <code>{output.expected}</code>
            </div>
          )}
        </div>
      </div>

      {/* Monaco editor panel */}
      <div className="oops-editor-panel">
        <div className="oops-editor-topbar">
          <span className="oops-editor-lang">Java · Solution.java</span>
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
              {showSolution ? "Hide Solution" : "Solution"}
            </button>
          </div>
        </div>

        <div className="oops-editor">
          <Editor
            height="100%"
            language="java"
            value={showSolution ? challenge.solutionCode : code}
            beforeMount={definePolycodeMonacoTheme}
            onMount={handleEditorMount}
            theme={POLYCODE_VSCODE_THEME}
            onChange={(value) => {
              if (!showSolutionRef.current) {
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
                ? "✓ All tests passed!"
                : `${results.tests.filter((t) => t.passed && t.id !== "runtime").length}/${challenge.tests.length} tests passed`}
            </div>
          )}
          <button
            type="button"
            className="oops-run-btn"
            style={{ "--accent": accentColor }}
            onClick={runTests}
            disabled={!canRun || running || showSolution}
            title={!canRun ? "Sign in or sign up to compile and run" : undefined}
          >
            {authLoading
              ? "Checking sign-in…"
              : running
                ? "⟳ Compiling…"
                : canRun
                  ? "▶ Run & Submit"
                  : "Sign in to run & submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
