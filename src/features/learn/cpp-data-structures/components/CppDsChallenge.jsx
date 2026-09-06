import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  formatCppOutput,
  getCppRuntimeError,
  runCppCode,
} from "../../shared/runCpp";

const ACCENT = "#8b5cf6";

// Does the learner's code satisfy a test's keyword(s)?  Whitespace-tolerant:
// we try the pattern against the raw code and against a space-collapsed copy.
function testPasses(test, code) {
  const keywords = Array.isArray(test.keywords) ? test.keywords : [];
  if (!keywords.length) return true; // nothing to check -> treat as satisfied
  const collapsed = code.replace(/[ \t]+/g, " ");
  return keywords.every((kw) => {
    if (typeof kw === "string") {
      const bare = kw.replace(/\s+/g, "");
      return (
        code.includes(kw) || code.replace(/\s+/g, "").includes(bare)
      );
    }
    if (kw && kw.pattern) {
      try {
        const re = new RegExp(kw.pattern, kw.flags || "");
        return re.test(code) || re.test(collapsed);
      } catch {
        return true;
      }
    }
    return true;
  });
}

function looksLikeCompileError(message = "") {
  return /(?:^|\n).*\berror:|compilation (?:error|failed)|expected .* before/i.test(
    message,
  );
}

/**
 * A calm coding exercise for the C++ Data Structures course. A plain,
 * quiet editor (no IDE chrome, no security scanner, no scoring widget), one
 * "Run & check" button, a friendly checklist, and output only when there is
 * something real to show. Passing the checks marks the lesson complete.
 */
export default function CppDsChallenge({
  challenge,
  accentColor = ACCENT,
  isCompleted,
  onComplete,
  initialCode,
  onCodeChange,
}) {
  const { isAuthenticated, loading } = useAuth();
  const canRun = isAuthenticated && !loading;

  const [code, setCode] = useState(initialCode || challenge.starterCode || "");
  const [showSolution, setShowSolution] = useState(false);
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState(null); // null | [{ id, label, hint, passed }]
  const [output, setOutput] = useState(null); // null | { text, error }
  const [solved, setSolved] = useState(Boolean(isCompleted));
  const taRef = useRef(null);
  const challengeKey = challenge.id ?? challenge.title;

  useEffect(() => {
    setCode(initialCode || challenge.starterCode || "");
    setShowSolution(false);
    setChecking(false);
    setResults(null);
    setOutput(null);
    setSolved(Boolean(isCompleted));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeKey]);

  const visibleCode = showSolution ? challenge.solutionCode || "" : code;
  const previewTests = useMemo(
    () =>
      (challenge.tests || []).map((t) => ({
        id: t.id,
        label: t.label,
        hint: t.hint,
        passed: null,
      })),
    [challenge.tests],
  );
  const shownTests = results || previewTests;

  function updateCode(next) {
    setCode(next);
    if (isAuthenticated) onCodeChange?.(next);
  }

  function handleKeyDown(event) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const el = event.target;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = code.slice(0, start) + "    " + code.slice(end);
    updateCode(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 4;
    });
  }

  function resetCode() {
    updateCode(challenge.starterCode || "");
    setResults(null);
    setOutput(null);
    setShowSolution(false);
  }

  async function runAndCheck() {
    if (!canRun || checking || showSolution) return;
    setChecking(true);
    setResults(null);
    setOutput({ text: "Checking your code…", error: false });

    const graded = (challenge.tests || []).map((t) => ({
      id: t.id,
      label: t.label,
      hint: t.hint,
      passed: testPasses(t, code),
    }));
    const checksPass = graded.every((t) => t.passed);

    let compileError = "";
    let stdout = "";
    const isProgram = /\bint\s+main\s*\(/.test(code);

    if (isProgram && !challenge.compileOptional) {
      try {
        const { result } = await runCppCode(code);
        const err = getCppRuntimeError(result);
        if (err && looksLikeCompileError(err)) {
          compileError = err;
        } else if (err && !/compiler|not installed|enoent|fetch|network/i.test(err)) {
          compileError = err; // a real runtime failure
        } else {
          const raw = formatCppOutput(result);
          if (
            raw &&
            !/no direct print statement|local browser simulation/i.test(raw)
          ) {
            stdout = raw;
          }
        }
      } catch {
        /* compiler/backend unavailable - don't block on it */
      }
    }

    const passed = checksPass && !compileError;
    setResults(graded);
    if (compileError) {
      setOutput({ text: compileError, error: true });
    } else if (stdout) {
      setOutput({ text: stdout, error: false });
    } else {
      setOutput({
        text: passed
          ? "Nice — everything checks out."
          : "Not quite yet. The checklist above shows what's still missing.",
        error: false,
      });
    }

    if (passed && !solved) {
      setSolved(true);
      Promise.resolve(onComplete?.()).catch(() => {});
    }
    setChecking(false);
  }

  return (
    <div className="cppds-lesson">
      <div className="cppds-challenge" style={{ "--cppds-accent": accentColor }}>
        <div className="cppds-ch-head">
          <h2 className="cppds-ch-title">{challenge.title}</h2>
          {solved ? <span className="cppds-ch-solved">✓ Solved</span> : null}
        </div>
        <p className="cppds-ch-desc">{challenge.description}</p>

        {!canRun && !loading ? (
          <div className="cppds-code-gate cppds-ch-gate">
            You can type in the editor now.{" "}
            <Link to="/login">Sign in</Link> or{" "}
            <Link to="/signup">create a free account</Link> to run your code and
            save your progress.
          </div>
        ) : null}

        <div className="cppds-ch-tests">
          <div className="cppds-ch-tests-head">What this checks</div>
          {shownTests.map((t) => (
            <div
              key={t.id}
              className={`cppds-ch-test${
                t.passed === true
                  ? " cppds-ch-test--pass"
                  : t.passed === false
                    ? " cppds-ch-test--fail"
                    : ""
              }`}
            >
              <span className="cppds-ch-test-mark">
                {t.passed === true ? "✓" : t.passed === false ? "✗" : "○"}
              </span>
              <span className="cppds-ch-test-label">{t.label}</span>
              {t.passed === false && t.hint ? (
                <span className="cppds-ch-test-hint">{t.hint}</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="cppds-code cppds-ch-editor">
          <div className="cppds-code-bar">
            <span className="cppds-code-lang">C++</span>
            <span className="cppds-code-label">your solution</span>
            <button
              type="button"
              className="cppds-code-btn"
              onClick={resetCode}
              disabled={showSolution}
            >
              Reset
            </button>
            <button
              type="button"
              className="cppds-code-btn"
              onClick={() => setShowSolution((v) => !v)}
            >
              {showSolution ? "Hide answer" : "Show answer"}
            </button>
          </div>
          <textarea
            ref={taRef}
            className="cppds-ch-textarea"
            value={visibleCode}
            spellCheck={false}
            readOnly={showSolution}
            onChange={(e) => updateCode(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Code editor"
          />
          <div className="cppds-ch-runbar">
            {results ? (
              <span
                className={`cppds-ch-verdict${
                  results.every((t) => t.passed)
                    ? " cppds-ch-verdict--ok"
                    : ""
                }`}
              >
                {results.every((t) => t.passed)
                  ? "all checks passed"
                  : `${results.filter((t) => t.passed).length} of ${results.length} checks passed`}
              </span>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="cppds-code-btn cppds-code-btn--run"
              onClick={runAndCheck}
              disabled={!canRun || checking || showSolution}
              title={canRun ? undefined : "Sign in to run and check"}
            >
              {checking
                ? "Checking…"
                : canRun
                  ? "▶ Run & check"
                  : "Sign in to check"}
            </button>
          </div>
        </div>

        {output ? (
          <div
            className={`cppds-code-out cppds-ch-out${output.error ? " cppds-code-out--err" : ""}`}
          >
            <div className="cppds-code-out-head">Output</div>
            <pre>{output.text}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
