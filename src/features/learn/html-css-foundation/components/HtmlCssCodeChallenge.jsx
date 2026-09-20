import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../../auth/context/AuthContext";
import { getVSCodeEditorOptions } from "../../../../shared/utils/monacoTheme";
import { useSiteMonacoTheme } from "../../../../shared/hooks/useSiteMonacoTheme";
import { runHTML, runCSS } from "../../../playground/services/BrowserExecutor";
import ChallengeCompleteCelebration from "../../shared/ChallengeCompleteCelebration";
import { useChallengeCelebration } from "../../shared/useChallengeCelebration";
import { useChallengeTelemetry } from "../../shared/challengeTelemetry";
import PolyGuardPanel from "../../../polyguard/components/PolyGuardPanel";

function normalizeWhitespace(value = "") {
  return value.replace(/\s+/g, "");
}

function testPasses(test, code) {
  const keywords = test.keywords || [];
  if (!keywords.length) return true;

  return keywords.every((keyword) => {
    if (typeof keyword === "string") {
      return (
        code.includes(keyword) ||
        normalizeWhitespace(code).includes(normalizeWhitespace(keyword))
      );
    }
    if (keyword?.pattern) {
      return new RegExp(keyword.pattern, keyword.flags || "i").test(code);
    }
    return true;
  });
}

async function buildPreview(code, language = "html") {
  const lang = String(language || "html").toLowerCase();
  if (lang === "css") {
    return runCSS(code);
  }
  return runHTML(code);
}

export default function HtmlCssCodeChallenge({
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
  const editorLanguage =
    String(challenge.language || "html").toLowerCase() === "css"
      ? "css"
      : "html";
  const fileLabel =
    editorLanguage === "css" ? "CSS · styles.css" : "HTML · index.html";

  const [code, setCode] = useState(initialCode || challenge.starterCode);
  const [results, setResults] = useState(null);
  const [output, setOutput] = useState(null);
  const [previewHTML, setPreviewHTML] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  // Read by the editor's onChange: Monaco fires it with the solution text when
  // swapping it in, before the handler closure sees showSolution=true.
  const showSolutionRef = useRef(false);
  showSolutionRef.current = showSolution;
  const [running, setRunning] = useState(false);
  const [submitGeneration, setSubmitGeneration] = useState(0);
  const activeChallengeId = useRef(challenge.id ?? challenge.starterCode);
  const runTestsRef = useRef(null);
  const { showCelebration, triggerCelebration, dismissCelebration } =
    useChallengeCelebration(challenge.id ?? challenge.starterCode);
  const { monacoTheme, beforeMount } = useSiteMonacoTheme();

  useEffect(() => {
    const challengeKey = challenge.id ?? challenge.starterCode;
    const challengeChanged = activeChallengeId.current !== challengeKey;
    if (challengeChanged) {
      activeChallengeId.current = challengeKey;
      setCode(initialCode || challenge.starterCode);
      setResults(null);
      setOutput(null);
      setPreviewHTML(null);
      setShowSolution(false);
      setSubmitGeneration(0);
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
      stdout: "Building preview and checking your markup…",
    });

    window.setTimeout(async () => {
      const activeCode = code;
      let previewDoc = null;

      try {
        const runResult = await buildPreview(activeCode, editorLanguage);
        previewDoc = runResult?.previewHTML || null;
        if (runResult?.error) {
          setResults({
            passed: false,
            tests: [
              {
                id: "runtime",
                label: "Preview builds without errors",
                passed: false,
                hint: runResult.error,
              },
              ...(challenge.tests || []).map((test) => ({
                ...test,
                passed: false,
              })),
            ],
          });
          setOutput({
            status: "fail",
            stdout: runResult.error,
          });
          setPreviewHTML(null);
          setRunning(false);
          setSubmitGeneration((value) => value + 1);
          return;
        }
      } catch (error) {
        setResults({
          passed: false,
          tests: [
            {
              id: "runtime",
              label: "Preview builds without errors",
              passed: false,
              hint: error.message || "Could not build preview.",
            },
            ...(challenge.tests || []).map((test) => ({
              ...test,
              passed: false,
            })),
          ],
        });
        setOutput({
          status: "fail",
          stdout: error.message || "Run failed",
        });
        setPreviewHTML(null);
        setRunning(false);
        setSubmitGeneration((value) => value + 1);
        return;
      }

      const testResults = (challenge.tests || []).map((test) => ({
        ...test,
        passed: testPasses(test, activeCode),
      }));
      const allPassed = testResults.every((test) => test.passed);

      setResults({ passed: allPassed, tests: testResults });
      setPreviewHTML(previewDoc);
      setOutput({
        status: allPassed ? "pass" : "fail",
        stdout: allPassed
          ? "Preview ready — all acceptance checks passed."
          : "Preview ready — fix the failing checks below.",
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
      setSubmitGeneration((value) => value + 1);
    }, 400);
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
    setPreviewHTML(null);
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
        <p className="oops-problem-desc">{challenge.description}</p>

        {!canRun && (
          <div className="oops-auth-gate">
            <p>
              You can edit the HTML/CSS in the editor. Sign in to run the live
              preview, submit, and mark the lesson complete.
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
          } ${previewHTML ? "oops-output-preview" : ""}`}
        >
          <div className="oops-output-head">
            <span>{previewHTML ? "Live Preview" : "Output"}</span>
            <small>{output ? "after last run" : "waiting for run"}</small>
          </div>
          {previewHTML ? (
            <iframe
              title="HTML CSS challenge preview"
              className="oops-html-preview-frame"
              sandbox=""
              referrerPolicy="no-referrer"
              srcDoc={previewHTML}
              style={{
                width: "100%",
                minHeight: 220,
                border: "none",
                borderRadius: 8,
                background: "#fff",
              }}
            />
          ) : (
            <pre className="oops-output-body">
              {output?.stdout || "Run your code to see a live preview here."}
            </pre>
          )}
          <PolyGuardPanel
            code={showSolution ? challenge.solutionCode : code}
            language={editorLanguage}
            variant="learn"
            disabled={!canRun || showSolution}
            resetKey={`${challenge.id}:${showSolution ? "solution" : "code"}`}
            autoRunKey={submitGeneration || null}
            hideManualTrigger
            analysisContext={{
              coachMode: true,
              testResults: results,
              runtimeError:
                output?.status === "fail" ? output?.stdout : "",
            }}
          />
        </div>
      </div>

      <div className="oops-editor-panel">
        <div className="oops-editor-topbar">
          <span className="oops-editor-lang">{fileLabel}</span>
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
            language={editorLanguage}
            value={showSolution ? challenge.solutionCode : code}
            beforeMount={beforeMount}
            onMount={handleEditorMount}
            theme={monacoTheme}
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
            title={!canRun ? "Sign in or sign up to run and submit" : undefined}
          >
            {authLoading
              ? "Checking sign-in…"
              : running
                ? "⟳ Running…"
                : canRun
                  ? "▶ Run & Submit"
                  : "Sign in to run & submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
