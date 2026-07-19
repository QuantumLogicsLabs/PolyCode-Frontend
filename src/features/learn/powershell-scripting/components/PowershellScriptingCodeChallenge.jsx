import React, { useState, useEffect } from "react";
import { Play, CheckCircle, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function PowershellScriptingCodeChallenge({ lesson, onSuccess, isCompleted }) {
  const [code, setCode] = useState(lesson.challenge.starterCode || "");
  const [results, setResults] = useState(null);

  useEffect(() => {
    setCode(lesson.challenge.starterCode || "");
    setResults(null);
  }, [lesson.id]);

  const runCode = () => {
    const tests = lesson.challenge.tests;
    const newResults = [];
    let allPassed = true;

    tests.forEach((test) => {
      const passed = test.keywords.every((kw) =>
        new RegExp(kw, "i").test(code)
      );
      if (!passed) allPassed = false;
      newResults.push({ ...test, passed });
    });

    setResults(newResults);
    if (allPassed) {
      onSuccess();
    }
  };

  return (
    <div className="oops-code-challenge">
      <div className="oops-editor-toolbar">
        <span>script.ps1</span>
        <button
          className="oops-run-btn"
          onClick={runCode}
          disabled={!code.trim()}
        >
          <Play size={14} /> Run Code
        </button>
      </div>
      <Editor
          height="300px"
          defaultLanguage="powershell"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      {results && (
        <div className="oops-test-results">
          <h4>Test Results</h4>
          <ul>
            {results.map((r, i) => (
              <li key={i} className={r.passed ? "passed" : "failed"}>
                {r.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                <span>{r.label}</span>
                {!r.passed && <div className="oops-hint">Hint: {r.hint}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
