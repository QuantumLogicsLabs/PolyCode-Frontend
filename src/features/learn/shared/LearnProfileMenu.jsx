import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../../profile/components/ProfileAvatar";

export default function LearnProfileMenu({
  user,
  trackTitle,
  syncLabel,
  completedCount,
  totalLessons,
  earnedXP,
  totalXP,
  bookmarksCount,
  streak = 0,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pct = Math.round((completedCount / totalLessons) * 100) || 0;
  return (
    <div className="learn-profile-menu">
      <button
        type="button"
        className="learn-profile-btn"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Open learning profile"
      >
        <ProfileAvatar user={user} size="sm" />
      </button>

      {open && (
        <div className="learn-profile-popover">
          <div className="learn-profile-head">
            <div className="learn-profile-avatar">
              <ProfileAvatar user={user} size="sm" />
            </div>
            <div>
              <strong>{user?.username || "Guest learner"}</strong>
              <small>{trackTitle}</small>
            </div>
          </div>

          <div className="learn-profile-progress">
            <div>
              <span>Progress</span>
              <strong>{pct}%</strong>
            </div>
            <div className="learn-profile-track">
              <div style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="learn-profile-grid">
            <div>
              <span>Lessons</span>
              <strong>
                {completedCount}/{totalLessons}
              </strong>
            </div>
            <div>
              <span>XP</span>
              <strong>
                {earnedXP}/{totalXP}
              </strong>
            </div>
            <div>
              <span>Streak</span>
              <strong>{streak} days</strong>
            </div>
            <div>
              <span>Saved</span>
              <strong>{bookmarksCount}</strong>
            </div>
          </div>

          <div className="learn-profile-sync">{syncLabel}</div>
          <button
            type="button"
            className="learn-profile-view-btn"
            onClick={() => navigate(user?.username ? `/@${user.username}` : "/profile")}
          >
            View full profile
          </button>
        </div>
      )}
    </div>
  );
}
