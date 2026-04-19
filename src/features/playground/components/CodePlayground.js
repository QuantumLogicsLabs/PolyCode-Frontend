import React, { useState, useRef, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { executeCode, resolveEngine } from "../services/BrowserExecutor";
import { STARTERS } from "../constants/playgroundStarters";
import "./CodePlayground.css";

// ── Language selector groups ──────────────────────────────────────────────────

const LANG_GROUPS = [
  {
    label: "Browser IDEs",
    langs: [
      "javascript",
      "typescript",
      "python",
      "html",
      "css",
      "sql",
      "json",
      "xml",
      "markdown",
      "brainfuck",
      "regex",
      "php",
    ],
  },
  {
    label: "Server IDEs",
    langs: [
      "c",
      "cpp",
      "java",
      "go",
      "rust",
      "ruby",
      "bash",
      "kotlin",
      "swift",
      "csharp",
      "r",
      "lua",
      "powershell",
      "batch",
      "dart",
      "perl",
      "scala",
    ],
  },
];

const ALL_LANGUAGES = LANG_GROUPS.flatMap((group) => group.langs);
const DEFAULT_LANGUAGE = "javascript";
const DEFAULT_STARTER = "// Start coding here\n";

function getStarterCode(lang) {
  return STARTERS[lang] || DEFAULT_STARTER;
}

function createWorkspace(lang, seedCode) {
  return {
    code: seedCode ?? getStarterCode(lang),
    output: [],
    previewHTML: null,
    activeTab: "output",
  };
}

function normalizeLanguage(lang) {
  return ALL_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

function buildInitialWorkspaces(initialLanguage, initialCode) {
  const activeLanguage = normalizeLanguage(initialLanguage);
  return ALL_LANGUAGES.reduce((acc, lang) => {
    acc[lang] = createWorkspace(
      lang,
      lang === activeLanguage && typeof initialCode === "string"
        ? initialCode
        : undefined,
    );
    return acc;
  }, {});
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CodePlayground({
  initialCode,
  initialLanguage = "javascript",
  onToggleSidebar,
  sidebarOpen,
  theme,
}) {
  const normalizedInitialLanguage = normalizeLanguage(initialLanguage);
  const [language, setLanguage] = useState(normalizedInitialLanguage);
  const [workspaces, setWorkspaces] = useState(() =>
    buildInitialWorkspaces(normalizedInitialLanguage, initialCode),
  );
  const [runningLanguage, setRunningLanguage] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(false);
  const outputRef = useRef(null);
  const currentWorkspace = workspaces[language] || createWorkspace(language);
  const { code, output, previewHTML, activeTab } = currentWorkspace;
  const currentIsRunning = runningLanguage === language;
  const anyIsRunning = runningLanguage !== null;

  const updateWorkspace = useCallback((lang, nextValue) => {
    setWorkspaces((prev) => {
      const current = prev[lang] || createWorkspace(lang);
      const patch =
        typeof nextValue === "function" ? nextValue(current) : nextValue;
      return {
        ...prev,
        [lang]: {
          ...current,
          ...patch,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [language, output]);

  useEffect(() => {
    const nextLanguage = normalizeLanguage(initialLanguage);
    setLanguage((prev) => (prev === nextLanguage ? prev : nextLanguage));
    setWorkspaces((prev) => {
      const next = { ...prev };
      ALL_LANGUAGES.forEach((lang) => {
        if (!next[lang]) {
          next[lang] = createWorkspace(lang);
        }
      });
      if (typeof initialCode === "string") {
        next[nextLanguage] = {
          ...(next[nextLanguage] || createWorkspace(nextLanguage)),
          code: initialCode,
        };
      }
      return next;
    });
  }, [initialLanguage, initialCode]);

  const handleLangChange = (lang) => {
    setLanguage(lang);
  };

  const handleRun = useCallback(async () => {
    const currentLanguage = language;
    const currentCode = (
      workspaces[currentLanguage] || createWorkspace(currentLanguage)
    ).code;
    if (runningLanguage) return;

    setRunningLanguage(currentLanguage);
    updateWorkspace(currentLanguage, {
      output: [
        {
          type: "system",
          text: `▶ Running ${resolveEngine(currentLanguage).label}...`,
        },
      ],
      previewHTML: null,
      activeTab: "output",
    });

    const t0 = performance.now();
    try {
      const result = await executeCode(currentCode, currentLanguage);
      const ms = ((performance.now() - t0) / 1000).toFixed(2);

      if (result.previewHTML) {
        updateWorkspace(currentLanguage, {
          previewHTML: result.previewHTML,
          activeTab: "preview",
          output: [{ type: "system", text: `✓ Rendered in ${ms}s` }],
        });
      } else {
        const lines = [{ type: "system", text: `✓ Done in ${ms}s` }];
        if (result.stdout) lines.push({ type: "stdout", text: result.stdout });
        if (result.stderr) lines.push({ type: "stderr", text: result.stderr });
        if (result.error) lines.push({ type: "stderr", text: result.error });
        if (!result.stdout && !result.stderr && !result.error)
          lines.push({ type: "stdout", text: "(no output)" });
        updateWorkspace(currentLanguage, {
          output: lines,
          previewHTML: null,
          activeTab: "output",
        });
      }
    } catch (e) {
      updateWorkspace(currentLanguage, {
        output: [{ type: "stderr", text: e.message }],
        previewHTML: null,
        activeTab: "output",
      });
    } finally {
      setRunningLanguage(null);
    }
  }, [language, runningLanguage, updateWorkspace, workspaces]);

  const handleEditorKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    [handleRun],
  );

  const langInfo = resolveEngine(language);
  const isServerBased = langInfo.engine === "server";
  const hasPreview = previewHTML !== null;
  const isLightTheme = theme === "light";

  return (
    <div className="playground-root">
      {/* ── Toolbar ── */}
      <div className="pg-toolbar">
        <div className="pg-toolbar-left">
          {/* Hamburger — re-open sidebar */}
          {onToggleSidebar && (
            <button
              className="pg-hamburger"
              onClick={onToggleSidebar}
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-label="Toggle sidebar"
            >
              <span />
              <span />
              <span />
            </button>
          )}

          <span className="pg-logo">⬡ IDE</span>

          {/* Language selector */}
          <select
            className="pg-lang-select"
            value={language}
            onChange={(e) => handleLangChange(e.target.value)}
          >
            {LANG_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.langs.map((l) => {
                  const info = resolveEngine(l);
                  return (
                    <option key={l} value={l}>
                      {info.icon} {info.label}
                    </option>
                  );
                })}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="pg-toolbar-center">
          <span className="pg-workspace-badge">
            Separate workspace per language
          </span>
          {isServerBased ? (
            <span className="pg-server-badge">✓ Runs in local simulation</span>
          ) : (
            <span className="pg-browser-badge">✓ Runs in browser</span>
          )}
        </div>

        <div className="pg-toolbar-right">
          <button
            className="pg-icon-btn"
            onClick={() => setFontSize((f) => Math.max(10, f - 1))}
            title="Smaller font"
          >
            A-
          </button>
          <span className="pg-font-size">{fontSize}px</span>
          <button
            className="pg-icon-btn"
            onClick={() => setFontSize((f) => Math.min(24, f + 1))}
            title="Larger font"
          >
            A+
          </button>
          <button
            className={`pg-icon-btn ${wordWrap ? "active" : ""}`}
            onClick={() => setWordWrap((w) => !w)}
            title="Word wrap"
          >
            ⇌
          </button>
          <button
            className="pg-icon-btn"
            onClick={() =>
              updateWorkspace(language, {
                code: getStarterCode(language),
                output: [],
                previewHTML: null,
                activeTab: "output",
              })
            }
            title="Reset"
          >
            ↺
          </button>
          <button
            className={`pg-run-btn ${currentIsRunning ? "running" : ""}`}
            onClick={handleRun}
            disabled={anyIsRunning}
            title="Run (Ctrl+Enter)"
          >
            {currentIsRunning ? (
              <>
                <span className="pg-spinner">⟳</span> Running...
              </>
            ) : (
              <>{anyIsRunning ? "⌛ Busy" : "▶ Run"}</>
            )}
          </button>
        </div>
      </div>

      <div className="pg-workspace-strip">
        {LANG_GROUPS.map((group) => (
          <div className="pg-workspace-group" key={group.label}>
            <span className="pg-workspace-label">{group.label}</span>
            <div className="pg-workspace-list">
              {group.langs.map((lang) => {
                const info = resolveEngine(lang);
                const workspace = workspaces[lang] || createWorkspace(lang);
                const changed = workspace.code !== getStarterCode(lang);
                return (
                  <button
                    key={lang}
                    className={`pg-workspace-chip ${language === lang ? "active" : ""}`}
                    onClick={() => handleLangChange(lang)}
                    title={`${info.label} workspace`}
                  >
                    <span>
                      {info.icon} {info.label}
                    </span>
                    {changed && (
                      <span className="pg-workspace-dot" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Split panes ── */}
      <div className="pg-panes" onKeyDown={handleEditorKeyDown}>
        {/* Editor */}
        <div className="pg-editor-pane">
          <div className="pg-pane-header">
            <span className="pg-pane-title">
              {langInfo.icon} {langInfo.label}
            </span>
            <span className="pg-pane-hint">
              Ctrl+Enter to run. Switching languages keeps each IDE state.
            </span>
          </div>
          <div className="pg-editor-body">
            <Editor
              height="100%"
              language={langInfo.mono}
              value={code}
              onChange={(v) => updateWorkspace(language, { code: v || "" })}
              theme={isLightTheme ? "vs" : "vs-dark"}
              key={`editor-${theme}-${language}`}
              options={{
                fontSize,
                fontFamily:
                  "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: wordWrap ? "on" : "off",
                lineNumbers: "on",
                renderLineHighlight: "gutter",
                bracketPairColorization: { enabled: true },
                guides: { bracketPairs: true },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        {/* Output / Preview — RIGHT side */}
        <div className="pg-output-pane">
          <div className="pg-pane-header">
            <div className="pg-output-tabs">
              <button
                className={`pg-tab ${activeTab === "output" ? "active" : ""}`}
                onClick={() =>
                  updateWorkspace(language, { activeTab: "output" })
                }
              >
                ⬡ Console
              </button>
              {hasPreview && (
                <button
                  className={`pg-tab ${activeTab === "preview" ? "active" : ""}`}
                  onClick={() =>
                    updateWorkspace(language, { activeTab: "preview" })
                  }
                >
                  🌐 Preview
                </button>
              )}
            </div>
            <button
              className="pg-clear-btn"
              onClick={() =>
                updateWorkspace(language, {
                  output: [],
                  previewHTML: null,
                  activeTab: "output",
                })
              }
            >
              CLEAR
            </button>
          </div>

          <div className="pg-output-body" ref={outputRef}>
            {activeTab === "output" && (
              <>
                {output.length === 0 ? (
                  <div className="pg-empty-state">
                    <span className="pg-empty-icon">▶</span>
                    <p>
                      Hit <strong>Run</strong> or press <kbd>Ctrl+Enter</kbd>
                    </p>
                    {isServerBased && (
                      <p className="pg-unsupported-note">
                        {langInfo.label} runs here in local simulation mode.
                        <br />
                        Use print-style statements to view output instantly.
                      </p>
                    )}
                  </div>
                ) : (
                  output.map((line, i) => (
                    <pre key={i} className={`pg-line ${line.type}`}>
                      {line.text}
                    </pre>
                  ))
                )}
                {currentIsRunning && (
                  <div className="pg-loader">
                    <span className="pg-pulse" />
                  </div>
                )}
              </>
            )}
            {activeTab === "preview" && hasPreview && (
              <iframe
                className="pg-preview-frame"
                srcDoc={previewHTML}
                title="Preview"
                sandbox="allow-scripts"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
