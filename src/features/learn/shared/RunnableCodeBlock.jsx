import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../auth/context/AuthContext";
import {
  definePolycodeMonacoTheme,
  getVSCodeEditorOptions,
  POLYCODE_VSCODE_THEME,
} from "../../../shared/utils/monacoTheme";
import {
  formatCppOutput,
  getCppRuntimeError,
  runCppCode,
} from "./runCpp";
import {
  formatJavaScriptOutput,
  getJavaScriptRuntimeError,
  runJavaScriptCode,
} from "./runJavaScript";
import {
  formatPythonOutput,
  getPythonRuntimeError,
  runPythonCode,
} from "./runPython";
import {
  formatCsharpOutput,
  getCsharpRuntimeError,
  runCsharpCode,
} from "./runCsharp";

function normalizeLang(lang = "python") {
  const value = lang.toLowerCase();
  if (value === "c++" || value === "cpp") return "cpp";
  if (value === "javascript" || value === "js") return "javascript";
  if (value === "csharp" || value === "c#") return "csharp";
  return value;
}

function monacoLanguage(lang) {
  if (lang === "cpp") return "cpp";
  if (lang === "javascript") return "javascript";
  if (lang === "csharp") return "csharp";
  return "python";
}

async function executeTheoryCode(source, lang) {
  if (lang === "cpp") {
    return runCppCode(source);
  }
  if (lang === "javascript") {
    return runJavaScriptCode(source);
  }
  if (lang === "csharp") {
    return runCsharpCode(source); 
  }
  return runPythonCode(source);
}

function formatTheoryOutput(result, lang) {
  if (lang === "cpp") return formatCppOutput(result);
  if (lang === "javascript") return formatJavaScriptOutput(result);
  if (lang === "csharp") return formatCsharpOutput(result);
  return formatPythonOutput(result);
}

function getTheoryRuntimeError(result, lang) {
  if (lang === "cpp") return getCppRuntimeError(result);
  if (lang === "javascript") return getJavaScriptRuntimeError(result);
  if (lang === "csharp") return getCsharpRuntimeError(result);
  return getPythonRuntimeError(result);
}

export default function RunnableCodeBlock({
  block,
  accentColor = "#4f46e5",
  language = "python",
}) {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const canRun = isAuthenticated && !authLoading;

  const lang = normalizeLang(block.lang || language);
  const editorLang = monacoLanguage(lang);
  const displayLang = (block.lang || language).toUpperCase();

  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(block.content);

  useEffect(() => {
    setCode(block.content);
    setOutput(null);
    setIsEditing(false);
  }, [block.content]);

  function copyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function clearOutput() {
    setOutput(null);
  }

  function resetCode() {
    setCode(block.content);
    setOutput(null);
  }

  async function handleRun() {
    if (!canRun || running) return;

    setRunning(true);
    setOutput({ status: "running", stdout: "Running…" });

    try {
      const { result, runtime } = await executeTheoryCode(code, lang);
      const runtimeError = getTheoryRuntimeError(result, lang);

      if (runtimeError) {
        setOutput({ status: "fail", stdout: runtimeError });
        return;
      }

      const stdout =
        formatTheoryOutput(result, lang) ||
        (runtime === "server"
          ? "Ran on server (no printed output)."
          : "Ran in browser (no printed output).");

      setOutput({ status: "pass", stdout });
    } catch (error) {
      setOutput({
        status: "fail",
        stdout: error.message || "Could not run this example.",
      });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="oops-code-block oops-code-block-runnable">
      <div className="oops-code-label">
        <span className="oops-code-lang">{displayLang}</span>
        {block.label && <span className="oops-code-file">{block.label}</span>}
        <div className="oops-code-actions">
          <button
            type="button"
            className="oops-copy-btn"
            onClick={() => setIsEditing((value) => !value)}
          >
            {isEditing ? "Done" : "Edit"}
          </button>
          {isEditing && (
            <button type="button" className="oops-copy-btn" onClick={resetCode}>
              Reset
            </button>
          )}
          <button type="button" className="oops-copy-btn" onClick={copyCode}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            type="button"
            className="oops-run-code-btn"
            style={{ "--accent": accentColor }}
            onClick={handleRun}
            disabled={!canRun || running}
            title={!canRun ? "Sign in or sign up to run code" : undefined}
          >
            {authLoading
              ? "…"
              : running
                ? "⟳ Running…"
                : canRun
                  ? "▶ Run"
                  : "Sign in to run"}
          </button>
        </div>
      </div>

      <div className="oops-theory-editor">
        <Editor
          height="220px"
          language={editorLang}
          value={code}
          beforeMount={definePolycodeMonacoTheme}
          theme={POLYCODE_VSCODE_THEME}
          onChange={(value) => setCode(value ?? "")}
          options={getVSCodeEditorOptions({
            fontSize: 13,
            readOnly: !isEditing,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            folding: true,
            wordWrap: "on",
          })}
        />
      </div>

      {!canRun && !authLoading && (
        <div className="oops-auth-gate oops-auth-gate-theory">
          <p>
            Sign in or create an account to run examples and see output here.
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

      <div
        className={`oops-theory-output oops-output-panel ${
          output?.status ? `oops-output-${output.status}` : ""
        }`}
      >
        <div className="oops-output-head">
          <span>Output</span>
          <div className="oops-output-head-actions">
            <small>
              {output ? "after last run" : "run the example to see output"}
            </small>
            {output && (
              <button
                type="button"
                className="oops-clear-output-btn"
                onClick={clearOutput}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <pre className="oops-output-body">
          {output?.stdout || "Output will appear here after you run the code."}
        </pre>
      </div>
    </div>
  );
}
