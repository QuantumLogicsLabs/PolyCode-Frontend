import React from "react";

export default function LessonChallengeTab({
  active,
  locked,
  xp,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`oops-tab${active ? " active" : ""}${locked ? " oops-tab-locked" : ""}`}
      onClick={onClick}
      disabled={locked}
      title={
        locked ? "Mark the lesson as read on the Theory tab first" : undefined
      }
    >
      Challenge <span className="oops-tab-xp">+{xp} XP</span>
    </button>
  );
}
