import React, { useState, useCallback, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  executeCode,
  resolveEngine,
} from "../../playground/services/BrowserExecutor";
import "../../playground/components/IDE.css";

const customStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: "20px",
    fontSize: "0.845rem",
    lineHeight: "1.75",
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "transparent",
  },
};

export default function CodeBlock({
  code: initialCode,
  language = "python",
  filename,
}) {
  const [code, setCode] = useState(initialCode);
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null); // null = hidden
  const [previewHTML, setPreview] = useState(null);
  const textareaRef = useRef(null);

  const langInfo = resolveEngine(language);
  const hasOutput = output !== null || previewHTML !== null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
    setPreview(null);
  };

  const toggleEdit = () => {
    setEditMode((e) => !e);
    if (!editMode) setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleKeyDown = (e) => {
    // Tab key inserts spaces instead of switching focus
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      }, 0);
    }
    // Ctrl+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  const handleRun = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setOutput(null);
    setPreview(null);

    try {
      const result = await executeCode(code, language);
      if (result.previewHTML) {
        setPreview(result.previewHTML);
      } else {
        const lines = [];
        if (result.stdout) lines.push({ type: "stdout", text: result.stdout });
        if (result.stderr) lines.push({ type: "stderr", text: result.stderr });
        if (result.error) lines.push({ type: "stderr", text: result.error });
        if (!lines.length) lines.push({ type: "stdout", text: "(no output)" });
        setOutput(lines);
      }
    } catch (e) {
      setOutput([{ type: "stderr", text: e.message }]);
    } finally {
      setRunning(false);
    }
  }, [code, language, running]);

  const handleClear = () => {
    setOutput(null);
    setPreview(null);
  };

  const langMap = {
    python: "py",
    javascript: "js",
    typescript: "ts",
    bash: "sh",
  };
  const displayLang = langMap[language] || language;

  return (
    <div className={`code-block ide-enhanced ${hasOutput ? "has-output" : ""}`}>
      {/* ── Header ── */}
      <div className="code-block-header">
        <div className="dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <span className="lang-label">
          {langInfo.icon} {filename || displayLang}
        </span>
        <div className="ide-actions">
          {/* Edit toggle */}
          <button
            className={`ide-btn ${editMode ? "active" : ""}`}
            onClick={toggleEdit}
            title={editMode ? "Switch to read-only view" : "Edit this code"}
          >
            {editMode ? "👁 View" : "✏ Edit"}
          </button>

          {/* Reset (only when edited) */}
          {code !== initialCode && (
            <button
              className="ide-btn"
              onClick={handleReset}
              title="Reset to original"
            >
              ↺
            </button>
          )}

          {/* Run button */}
          <button
            className={`ide-btn run-btn ${running ? "running" : ""}`}
            onClick={handleRun}
            disabled={running}
            title={editMode ? "Run (Ctrl+Enter)" : "Run code"}
          >
            {running ? "⟳ Running…" : "▶ Run"}
          </button>

          {langInfo.engine === "server" && (
            <span
              className="ide-runtime-pill"
              title="Runs in local simulation mode"
            >
              Local Sim
            </span>
          )}

          {/* Copy */}
          <button
            className={`copy-trigger ${copied ? "active" : ""}`}
            onClick={handleCopy}
            aria-label="Copy code"
          >
            <span className="copy-label">{copied ? "✓ COPIED" : "COPY"}</span>
            <div className="copy-glow"></div>
          </button>
        </div>
      </div>

      {/* ── Split layout: code LEFT, output RIGHT ── */}
      <div className="ide-split-layout">
        {/* Code panel */}
        <div className="ide-code-panel">
          {editMode ? (
            <div className="ide-editor-wrapper">
              <textarea
                ref={textareaRef}
                className="ide-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="Write your code here…"
              />
            </div>
          ) : (
            <SyntaxHighlighter
              language={langInfo.mono || language}
              style={customStyle}
              showLineNumbers
              lineNumberStyle={{
                color: "rgba(255,255,255,0.12)",
                fontSize: "0.7rem",
                minWidth: "2.5em",
                paddingRight: "1em",
                userSelect: "none",
              }}
              wrapLongLines={false}
            >
              {code}
            </SyntaxHighlighter>
          )}
        </div>

        {/* Output panel — RIGHT side, visible only when there's output */}
        {hasOutput && (
          <div className="ide-output-panel">
            <div className="ide-output-header">
              <span>{previewHTML ? "🌐 Preview" : "⬡ Output"}</span>
              <button className="ide-clear-btn" onClick={handleClear}>
                ✕ Clear
              </button>
            </div>

            {previewHTML ? (
              <iframe
                className="ide-preview-iframe"
                srcDoc={previewHTML}
                title="preview"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="ide-output-body">
                {output.map((line, i) => (
                  <pre key={i} className={`ide-out-line ${line.type}`}>
                    {line.text}
                  </pre>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit hint */}
      {editMode && (
        <div className="ide-edit-hint">
          Tab = indent &nbsp;·&nbsp; Ctrl+Enter = run
        </div>
      )}
    </div>
  );
}
