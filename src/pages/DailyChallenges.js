import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Play,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  Terminal,
  Timer,
  Activity,
  Check,
  X,
} from "lucide-react";
import { getApiBase } from "../config/apiBase";
import ChallengeCompleteCelebration from "../features/learn/shared/ChallengeCompleteCelebration";
import { useChallengeCelebration } from "../features/learn/shared/useChallengeCelebration";
import "./DailyChallenges.css";

export default function DailyChallenge({ theme }) {
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [resultData, setResultData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [streak, setStreak] = useState(0);
  const { showCelebration, triggerCelebration, dismissCelebration } =
    useChallengeCelebration(challenge?._id);

  useEffect(() => {
    if (resultData?.status === "Accepted") {
      triggerCelebration();
    }
  }, [resultData, triggerCelebration]);

  useEffect(() => {
    fetch(`${getApiBase()}/challenges/today`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.message) {
          setChallenge(data);
          setCode(data.starterCode?.[language] || "");
        }
      })
      .catch((err) => console.error("Failed to fetch challenge:", err));
  }, [language]);

  // Update code when language changes
  useEffect(() => {
    if (challenge && challenge.starterCode) {
      setCode(challenge.starterCode[language] || "");
    }
  }, [language, challenge]);

  const handleSubmit = async () => {
    if (!challenge) return;
    setIsSubmitting(true);
    setResultData({ status: "PENDING" });

    const userId = localStorage.getItem("userId") || crypto.randomUUID();
    localStorage.setItem("userId", userId);

    try {
      const res = await fetch(
        `${getApiBase()}/challenges/${challenge._id}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, language, code }),
        },
      );
      const data = await res.json();
      setResultData(data);
      if (data.streak !== undefined) setStreak(data.streak);
    } catch (err) {
      console.error("Submission failed:", err);
      setResultData({ status: "ERROR", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!challenge) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Retrieving today's technical challenge...</p>
      </div>
    );
  }

  return (
  <>
    <ChallengeCompleteCelebration
      show={showCelebration}
      onDismiss={dismissCelebration}
    />
    <motion.div
      className="daily-challenges-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Left Pane: Challenge Details ── */}
      <div className="challenge-info-pane">
        <div className="challenge-card">
          <div className="challenge-title-area">
            <motion.h1 initial={{ x: -20 }} animate={{ x: 0 }}>
              {challenge.title}
            </motion.h1>
            <div className="badge-group">
              <span
                className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}
              >
                {challenge.difficulty}
              </span>
              {streak > 0 && (
                <motion.div
                  className="streak-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  🔥 {streak} Day Streak
                </motion.div>
              )}
            </div>
          </div>

          <p className="challenge-description">{challenge.description}</p>

          <div className="challenge-section-title">
            <Lightbulb size={16} /> Examples
          </div>
          {challenge.examples?.map((ex, i) => (
            <motion.div
              key={i}
              className="example-box"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="example-header">
                <span>Example {i + 1}</span>
              </div>
              <pre>
                <strong>Input:</strong> {ex.input}
                {"\n"}
                <strong>Output:</strong> {ex.output}
              </pre>
              {ex.explanation && (
                <p className="example-explanation">
                  <ChevronRight size={12} style={{ display: "inline" }} />{" "}
                  {ex.explanation}
                </p>
              )}
            </motion.div>
          ))}

          {challenge.constraints && challenge.constraints.length > 0 && (
            <>
              <div className="challenge-section-title">
                <AlertCircle size={16} /> Constraints
              </div>
              <ul className="constraints-list">
                {challenge.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* ── Right Pane: Editor ── */}
      <div className="editor-pane">
        <div className="editor-header">
          <div className="lang-selector-wrapper">
            <Terminal size={18} className="text-muted" />
            <select
              className="premium-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="spinner-mini" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
            Submit Solution
          </button>
        </div>

        <div className="editor-container">
          <Editor
            height="100%"
            language={language === "cpp" ? "cpp" : language}
            value={code}
            onChange={(v) => setCode(v || "")}
            theme={theme === "light" ? "vs" : "vs-dark"}
            options={{
              fontSize: 14,
              fontFamily: "'Space Mono', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 20 },
              lineNumbers: "on",
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 3,
              wordWrap: "on",
            }}
          />
        </div>

        <AnimatePresence>
          {resultData && (
            <motion.div
              className="result-area-detailed"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {resultData.status === "PENDING" ? (
                <div className="status-card pending">
                  <Activity size={20} className="spin-slow" />
                  <span>Running test cases against your code...</span>
                </div>
              ) : (
                <div className="detailed-results">
                  <div
                    className={`status-header ${resultData.status.toLowerCase().replace(" ", "-")}`}
                  >
                    <div className="status-main">
                      {resultData.status === "Accepted" ? (
                        <Trophy size={24} />
                      ) : (
                        <AlertCircle size={24} />
                      )}
                      <h2>{resultData.status}</h2>
                    </div>
                    <div className="status-stats">
                      <div className="stat-item">
                        <CheckCircle2 size={14} />
                        <span>
                          {resultData.passedCount} / {resultData.totalCount}{" "}
                          Passed
                        </span>
                      </div>
                      {resultData.executionTime && (
                        <div className="stat-item">
                          <Timer size={14} />
                          <span>{resultData.executionTime}ms</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="test-cases-grid">
                    {resultData.results?.map((res, i) => (
                      <div
                        key={i}
                        className={`test-case-chip ${res.passed ? "passed" : "failed"}`}
                      >
                        {res.passed ? <Check size={14} /> : <X size={14} />}
                        <span>
                          Test {i + 1}{" "}
                          {res.isRandom && (
                            <span className="random-tag">Random</span>
                          )}
                        </span>
                        {!res.passed && !res.isHidden && (
                          <div className="test-case-tooltip">
                            <div>
                              Expected:{" "}
                              <code className="expected-val">
                                {res.expected}
                              </code>
                            </div>
                            <div>
                              Actual:{" "}
                              <code className="actual-val">{res.actual}</code>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {resultData.status === "Accepted" && (
                    <motion.div
                      className="success-feedback"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      🎉 Excellent work! Your solution is efficient and correct.
                    </motion.div>
                  )}

                  {resultData.results?.some((r) => r.error) && (
                    <div className="error-log-container">
                      <div className="error-log-header">
                        <AlertCircle size={14} />
                        <span>Runtime Error Output</span>
                      </div>
                      <pre className="error-log-body">
                        {resultData.results.find((r) => r.error).error}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  </>
  );
}
