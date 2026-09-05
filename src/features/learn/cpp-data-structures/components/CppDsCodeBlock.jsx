import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  formatCppOutput,
  getCppRuntimeError,
  runCppCode,
} from "../../shared/runCpp";

// A short list of C++ keywords for light syntax colour. Library names like
// `cout` / `vector` stay the default colour on purpose - less noise.
const KEYWORDS = new Set(
  (
    "alignas alignof auto bool break case catch char class const constexpr " +
    "continue decltype default delete do double else enum explicit extern " +
    "false float for friend goto if inline int long mutable namespace new " +
    "noexcept nullptr operator private protected public return short signed " +
    "sizeof static static_cast struct switch template this throw true try " +
    "typedef typename union unsigned using virtual void volatile while"
  ).split(" "),
);

// Tokenise C++ into an array of strings and coloured <span>s. Always makes
// forward progress, so it cannot loop forever; on anything odd it just falls
// back to plain text.
function renderCode(src) {
  const re =
    /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(#[A-Za-z_]+)|(\b\d[\w.]*\b)|([A-Za-z_]\w*)|(\s+)|([\s\S])/g;
  const out = [];
  let match;
  let key = 0;
  while ((match = re.exec(src)) !== null) {
    const value = match[0];
    let cls = null;
    if (match[1] || match[2]) cls = "cmt";
    else if (match[3] || match[4]) cls = "str";
    else if (match[5]) cls = "pp";
    else if (match[6]) cls = "num";
    else if (match[7] && KEYWORDS.has(value)) cls = "kw";

    if (cls) {
      out.push(
        <span key={key++} className={`cppds-tok-${cls}`}>
          {value}
        </span>,
      );
    } else {
      out.push(value);
    }
  }
  return out;
}

/**
 * A calm, read-only code panel with Copy and Run. No editor, no grid
 * background, no "no print statement" noise - just the code and, once you
 * press Run, its output.
 *
 * Three kinds of snippet, three behaviours:
 * - `output` given  -> Run reveals that text as-is, no compiler, no sign-in.
 * - a full program  -> Run compiles and runs it (sign-in required).
 * - a fragment      -> no Run button at all; there is nothing to run.
 */
export default function CppDsCodeBlock({ code = "", label, output: staticOutput }) {
  const { isAuthenticated, loading } = useAuth();
  const hasStaticOutput = Boolean(staticOutput);
  const isProgram = /\bint\s+main\s*\(/.test(code);
  const showRun = hasStaticOutput || isProgram;
  const canRun = hasStaticOutput || (isAuthenticated && !loading);

  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null); // { text, error }

  const rendered = useMemo(() => renderCode(code), [code]);

  async function handleRun() {
    if (!canRun || running) return;
    if (hasStaticOutput) {
      setOutput({ text: staticOutput, error: false });
      return;
    }
    setRunning(true);
    setOutput({ text: "Running…", error: false });
    try {
      const { result } = await runCppCode(code);
      const err = getCppRuntimeError(result);
      if (err) {
        setOutput({ text: err, error: true });
      } else {
        setOutput({
          text:
            formatCppOutput(result) ||
            "The program ran without printing anything.",
          error: false,
        });
      }
    } catch (error) {
      setOutput({
        text: error?.message || "Could not run this example right now.",
        error: true,
      });
    } finally {
      setRunning(false);
    }
  }

  function handleCopy() {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      })
      .catch(() => {});
  }

  return (
    <div className="cppds-code">
      <div className="cppds-code-bar">
        <span className="cppds-code-lang">C++</span>
        <span className="cppds-code-label">{label || ""}</span>
        <button type="button" className="cppds-code-btn" onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
        {showRun ? (
          <button
            type="button"
            className="cppds-code-btn cppds-code-btn--run"
            onClick={handleRun}
            disabled={!canRun || running}
            title={canRun ? undefined : "Sign in to run the examples"}
          >
            {running ? "Running…" : canRun ? "▶ Run it" : "Sign in to run"}
          </button>
        ) : null}
      </div>

      <pre className="cppds-code-pre">
        <code>{rendered}</code>
      </pre>

      {showRun && !canRun && !loading ? (
        <div className="cppds-code-gate">
          <Link to="/login">Sign in</Link> or{" "}
          <Link to="/signup">create a free account</Link> to run the examples and
          see their output here.
        </div>
      ) : null}

      {output ? (
        <div
          className={`cppds-code-out${output.error ? " cppds-code-out--err" : ""}`}
        >
          <div className="cppds-code-out-head">Output</div>
          <pre>{output.text}</pre>
        </div>
      ) : null}
    </div>
  );
}
