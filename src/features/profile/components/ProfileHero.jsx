import React, { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import {
  getDisplayBio,
  getDisplayName,
  getDisplayUsername,
} from "../utils/profileDisplayUtils";

export default function ProfileHero({
  user,
  isAuthenticated,
  canEdit = false,
  totalStreak,
  editOpen,
  onToggleEdit,
  isFollowing = false,
  followSaving = false,
  onToggleFollow,
}) {
  const [socialNotice, setSocialNotice] = useState("");

  const displayName = getDisplayName(user);
  const username = getDisplayUsername(user);
  const bio = getDisplayBio(user);
  const following = user?.followingCount ?? 0;
  const followers = user?.followersCount ?? 0;

  function showComingSoon(label) {
    setSocialNotice(`${label} — coming soon.`);
    window.setTimeout(() => setSocialNotice(""), 2800);
  }

  return (
    <section className="profile-hero">
      <div className="profile-hero-main">
        <div className="profile-hero-avatar profile-hero-avatar--lg">
          <ProfileAvatar user={user} size="lg" />
        </div>

        <div className="profile-hero-identity">
          <h1>{displayName}</h1>
          {username && <p className="profile-hero-username">{username}</p>}
          {bio ? (
            <p className="profile-hero-bio">{bio}</p>
          ) : canEdit ? (
            <p className="profile-hero-bio profile-hero-bio--empty">
              Add a bio in Edit profile.
            </p>
          ) : null}

          <div className="profile-hero-social">
            <div className="profile-hero-stats">
              <button
                type="button"
                className="profile-hero-stat"
                onClick={() => showComingSoon("Following list")}
              >
                <strong>{following}</strong>
                <span>Following</span>
              </button>
              <button
                type="button"
                className="profile-hero-stat"
                onClick={() => showComingSoon("Followers list")}
              >
                <strong>{followers}</strong>
                <span>Followers</span>
              </button>
            </div>
            {canEdit ? (
              <button
                type="button"
                className="profile-hero-message-btn"
                onClick={() => showComingSoon("Messages")}
              >
                Message
              </button>
            ) : isAuthenticated ? (
              <button
                type="button"
                className="profile-hero-message-btn"
                onClick={onToggleFollow}
                disabled={followSaving}
              >
                {followSaving
                  ? "Saving..."
                  : isFollowing
                    ? "Unfollow"
                    : "Follow"}
              </button>
            ) : null}
          </div>

          {socialNotice && (
            <p className="profile-hero-notice" role="status">
              {socialNotice}
            </p>
          )}
        </div>

        <div className="profile-hero-side">
          <div className="profile-total-progress">
            <span>Current Streak</span>
            <strong>{totalStreak} days</strong>
          </div>
          {canEdit && (
            <button
              type="button"
              className="profile-hero-edit-btn"
              onClick={onToggleEdit}
              aria-expanded={editOpen}
            >
              {editOpen ? "Close edit" : "Edit profile"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
