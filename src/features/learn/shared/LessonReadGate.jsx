import React from "react";

const CONFIDENCE_OPTIONS = [
  ["review", "😅 Need another read"],
  ["almost", "🙂 Getting it"],
  ["ready", "🚀 Ready for the challenge"],
];

/**
 * Mark-as-read gate, then confidence check + challenge CTA.
 * Used at the end of theory content across all courses.
 */
export default function LessonReadGate({
  markedAsRead = false,
  onMarkAsRead,
  confidence = "",
  onConfidenceChange,
  onGoChallenge,
  accentColor = "#818cf8",
  challengeLabel = "Ready? Try the coding challenge →",
}) {
  if (!markedAsRead) {
    return (
      <div
        className="lesson-read-gate"
        style={{ "--lesson-accent": accentColor }}
      >
        <p className="lesson-read-gate-hint">
          Finished reading? Mark this lesson as read to unlock the next steps.
        </p>
        <button
          type="button"
          className="lesson-mark-read-btn"
          onClick={onMarkAsRead}
        >
          Mark as read
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="lesson-confidence-panel">
        <h3>How do you feel about this lesson?</h3>
        <div className="lesson-confidence-options">
          {CONFIDENCE_OPTIONS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={confidence === value ? "active" : ""}
              onClick={() => onConfidenceChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="lesson-read-actions">
        <button
          type="button"
          className="lesson-challenge-cta"
          style={{ "--lesson-accent": accentColor }}
          onClick={onGoChallenge}
        >
          {challengeLabel}
        </button>
      </div>
    </>
  );
}
