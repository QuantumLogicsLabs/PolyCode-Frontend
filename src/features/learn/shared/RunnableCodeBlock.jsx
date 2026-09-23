import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../auth/context/AuthContext";
import { useSiteMonacoTheme } from "../../../shared/hooks/useSiteMonacoTheme";
import { getVSCodeEditorOptions } from "../../../shared/utils/monacoTheme";
import { formatCppOutput, getCppRuntimeError, runCppCode } from "./runCpp";
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
import PythonRunOutput from "./PythonRunOutput";
import {
  formatCsharpOutput,
  getCsharpRuntimeError,
  runCsharpCode,
} from "./runCsharp";
import { formatRustOutput, getRustRuntimeError, runRustCode } from "./runRust";
import { formatRubyOutput, getRubyRuntimeError, runRubyCode } from "./runRuby";
import { formatPhpOutput, getPhpRuntimeError, runPhpCode } from "./runPhp";
import { formatGoOutput, getGoRuntimeError, runGoCode } from "./runGo";
import { formatSqlOutput, getSqlRuntimeError, runSqlCode } from "./runSql";
import {
  runHTML,
  runCSS,
  runSCSS,
} from "../../playground/services/BrowserExecutor";

function normalizeLang(lang = "python") {
  const value = lang.toLowerCase();
  if (value === "c++" || value === "cpp") return "cpp";
  if (value === "javascript" || value === "js") return "javascript";
  if (value === "csharp" || value === "c#") return "csharp";
  if (value === "ruby") return "ruby";
  if (value === "php") return "php";
  if (value === "go") return "go";
  if (value === "rust" || value === "rs") return "rust";
  if (value === "sql") return "sql";
  return value;
}

function monacoLanguage(lang) {
  if (lang === "cpp") return "cpp";
  if (lang === "javascript") return "javascript";
  if (lang === "html") return "html";
  if (lang === "css") return "css";
  if (lang === "scss") return "scss";
  if (lang === "csharp") return "csharp";
  if (lang === "ruby") return "ruby";
  if (lang === "php") return "php";
  if (lang === "go") return "go";
  if (lang === "rust") return "rust";
  if (lang === "sql") return "sql";
  return "python";
}

async function executeTheoryCode(source, lang, block = {}) {
  if (lang === "cpp") {
    return runCppCode(source);
  }
  if (lang === "javascript") {
    return runJavaScriptCode(source);
  }
  if (lang === "html") {
    const result = await runHTML(source);
    return {
      result,
      runtime: "preview",
      previewHTML: result?.previewHTML || null,
    };
  }
  if (lang === "css") {
    const result = await runCSS(source);
    return {
      result,
      runtime: "preview",
      previewHTML: result?.previewHTML || null,
    };
  }
  if (lang === "scss") {
    return {
      result: await runSCSS(source, { modules: block.modules }),
      runtime: "browser",
    };
  }
  if (lang === "csharp") {
    return runCsharpCode(source);
  }
  if (lang === "ruby") {
    return runRubyCode(source, { learn: true });
  }
  if (lang === "php") {
    return runPhpCode(source);
  }
  if (lang === "go") {
    let finalCode = source;
    // If the snippet is just raw code logic without a package header, wrap it up cleanly
    if (!source.includes("package main")) {
      finalCode = `package main

import "fmt"

func main() {
${source
  .split("\n")
  .map((line) => "    " + line)
  .join("\n")}
}`;
    }
    return runGoCode(finalCode);
  }
  if (lang === "rust") {
    let finalCode = source;
    // Auto-wrap bare snippet logs cleanly inside an implicit main function
    if (!source.includes("fn main(")) {
      finalCode = `fn main() {\n${source.split("\n").map((line) => "    " + line).join("\n")}\n}`;
    }
    return runRustCode(finalCode);
  }
  if (lang === "sql") {
    return runSqlCode(source);
  }
  return runPythonCode(source);
}

function formatTheoryOutput(result, lang) {
  if (lang === "html" || lang === "css") {
    return result?.error || result?.stderr || "Preview ready.";
  }
  if (lang === "scss") {
    const notes = (result?.warnings || []).join("\n");
    const css = result?.stdout || "/* No CSS output. */";
    return notes ? `${notes}\n\n${css}` : css;
  }
  if (lang === "cpp") return formatCppOutput(result);
  if (lang === "javascript") return formatJavaScriptOutput(result);
  if (lang === "csharp") return formatCsharpOutput(result);
  if (lang === "ruby") return formatRubyOutput(result);
  if (lang === "php") return formatPhpOutput(result);
  if (lang === "go") return formatGoOutput(result);
  if (lang === "rust") return formatRustOutput(result);
  if (lang === "sql") return formatSqlOutput(result);
  return formatPythonOutput(result);
}

function getTheoryRuntimeError(result, lang) {
  if (lang === "html" || lang === "css" || lang === "scss") {
    return result?.error || result?.stderr || "";
  }
  if (lang === "cpp") return getCppRuntimeError(result);
  if (lang === "javascript") return getJavaScriptRuntimeError(result);
  if (lang === "csharp") return getCsharpRuntimeError(result);
  if (lang === "ruby") return getRubyRuntimeError(result);
  if (lang === "php") return getPhpRuntimeError(result);
  if (lang === "go") return getGoRuntimeError(result);
  if (lang === "rust") return getRustRuntimeError(result);
  if (lang === "sql") return getSqlRuntimeError(result);
  return getPythonRuntimeError(result);
}

export default function RunnableCodeBlock({
  block,
  accentColor = "#4f46e5",
  language = "python",
}) {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const { monacoTheme, beforeMount } = useSiteMonacoTheme();
  const canRun = isAuthenticated && !authLoading;

  const lang = normalizeLang(block.lang || language);
  const editorLang = monacoLanguage(lang);
  const displayLang = (block.lang || language).toUpperCase();

  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [previewHTML, setPreviewHTML] = useState(null);
  const [previewTheme, setPreviewTheme] = useState("light");
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(block.content);

  useEffect(() => {
    setCode(block.content);
    setOutput(null);
    setPreviewHTML(null);
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
    setPreviewHTML(null);
  }

  function resetCode() {
    setCode(block.content);
    setOutput(null);
    setPreviewHTML(null);
  }

  async function handleRun() {
    if (!canRun || running) return;

    setRunning(true);
    setOutput({ status: "running", stdout: "Running…" });
    setPreviewHTML(null);

    try {
      const {
        result,
        runtime,
        previewHTML: htmlPreview,
      } = await executeTheoryCode(code, lang, block);
      const runtimeError = getTheoryRuntimeError(result, lang);

      if (runtimeError) {
        setOutput({ status: "fail", stdout: runtimeError });
        return;
      }

      if (htmlPreview) {
        setPreviewHTML(htmlPreview);
        setOutput(null);
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
        stdout:
          error?.message ||
          (typeof error === "string" ? error : "Could not run this example."),
      });
    } finally {
      setRunning(false);
    }
  }

  function themedPreviewHtml(html, theme) {
    if (!html) return html;
    // Inject a theme override style into the preview head.
    const themeStyle =
      theme === "dark"
        ? `\n<style id="preview-theme">html,body{background:#0b1220!important;color:#e6eef8!important} .preview-note{color:#cbd5e1!important} a{color:#93c5fd!important} </style>\n`
        : `\n<style id="preview-theme">html,body{background:#ffffff!important;color:#111111!important} .preview-note{color:#666666!important} a{color:#1e3a8a!important} </style>\n`;

    if (html.includes("</head>")) {
      return html.replace(/<\/head>/i, `${themeStyle}</head>`);
    }
    return themeStyle + html;
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
          beforeMount={beforeMount}
          theme={monacoTheme}
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
        } ${previewHTML ? "oops-output-preview" : ""}`}
      >
        <div className="oops-output-head">
          <span>{previewHTML ? "Preview" : "Output"}</span>
          <div className="oops-output-head-actions">
            <small>
              {output || previewHTML
                ? "after last run"
                : "run the example to see output"}
            </small>
            {(output || previewHTML) && (
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
        {previewHTML ? (
          <div className="oops-preview-frame">
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "0 1rem 0 1rem",
              }}
            >
              <small style={{ color: "#666" }}>Theme:</small>
              <div>
                <button
                  type="button"
                  onClick={() => setPreviewTheme("light")}
                  style={{
                    marginRight: 6,
                    padding: "4px 8px",
                    borderRadius: 4,
                    border:
                      previewTheme === "light"
                        ? "1px solid #111"
                        : "1px solid #ccc",
                  }}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTheme("dark")}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 4,
                    border:
                      previewTheme === "dark"
                        ? "1px solid #111"
                        : "1px solid #ccc",
                  }}
                >
                  Dark
                </button>
              </div>
            </div>
            <iframe
              title="html-preview"
              srcDoc={themedPreviewHtml(previewHTML, previewTheme)}
              sandbox=""
              referrerPolicy="no-referrer"
              style={{
                width: "100%",
                minHeight: 300,
                border: "1px solid #e5e7eb",
                borderRadius: 6,
              }}
            />
          </div>
        ) : (
          <PythonRunOutput
            stdout={output?.stdout}
            plotImages={output?.plotImages}
            emptyHint="Output will appear here after you run the code."
          />
        )}
      </div>
    </div>
  );
}
