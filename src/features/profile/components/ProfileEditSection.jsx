import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import ProfileAvatar from "./ProfileAvatar";
import ProfilePictureCropper from "./ProfilePictureCropper";
import {
  PROFILE_LANGUAGE_OPTIONS,
  getProfileLanguageMeta,
  hexToRgba,
} from "../utils/profileLanguageMeta";

export default function ProfileEditSection({ open, onClose }) {
  const { user, token, updateProfile, uploadAvatar, avatarPreview } = useAuth();
  const [showCropper, setShowCropper] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    preferredLanguages: [],
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
      preferredLanguages: user.preferredLanguages || [],
    });
  }, [user]);

  useEffect(() => {
    if (!open) {
      setShowCropper(false);
      setError("");
      setMessage("");
    }
  }, [open]);

  if (!open) return null;

  if (!user || !token) {
    return (
      <section className="profile-edit-card profile-edit-card--below-hero">
        <p>Sign in to edit your profile and upload a picture.</p>
      </section>
    );
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleLanguage(language) {
    setForm((prev) => {
      const has = prev.preferredLanguages.includes(language);
      return {
        ...prev,
        preferredLanguages: has
          ? prev.preferredLanguages.filter((l) => l !== language)
          : [...prev.preferredLanguages, language],
      };
    });
  }

  async function handleSaveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateProfile({
        username: form.username.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        bio: form.bio.trim(),
        preferredLanguages: form.preferredLanguages,
      });
      setMessage("Profile saved.");
      onClose?.();
    } catch (err) {
      setError(err.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveAvatar(imageBase64) {
    setShowCropper(false);
    setUploading(true);
    setError("");
    setMessage("Uploading photo…");

    try {
      await uploadAvatar(imageBase64);
      setMessage("Profile picture updated.");
    } catch (err) {
      setError(err.message || "Could not upload picture.");
      setMessage("");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <section className="profile-edit-card profile-edit-card--below-hero">
        <div className="profile-edit-head">
          <h2>Edit profile</h2>
          <button
            type="button"
            className="profile-edit-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="profile-edit-avatar-row">
          <div className="profile-edit-avatar-wrap">
            <ProfileAvatar user={user} size="lg" />
            {uploading && (
              <span className="profile-avatar-uploading" aria-live="polite">
                Uploading…
              </span>
            )}
          </div>
          <div>
            <button
              type="button"
              className="profile-edit-btn"
              onClick={() => setShowCropper(true)}
              disabled={uploading}
            >
              {user.profilePicture || avatarPreview
                ? "Change photo"
                : "Upload photo"}
            </button>
          </div>
        </div>

        <form className="profile-edit-form" onSubmit={handleSaveProfile}>
          <label>
            Email
            <input type="email" value={user.email} disabled readOnly />
            <small>Email cannot be changed.</small>
          </label>

          <label>
            Username
            <input
              type="text"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              minLength={3}
              maxLength={30}
              required
            />
          </label>

          <div className="profile-edit-row">
            <label>
              First name
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                maxLength={50}
              />
            </label>
            <label>
              Last name
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                maxLength={50}
              />
            </label>
          </div>

          <label>
            Bio
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Tell other learners about yourself…"
            />
          </label>

          <fieldset className="profile-edit-languages">
            <legend>Preferred languages</legend>
            <div className="profile-edit-lang-grid">
              {PROFILE_LANGUAGE_OPTIONS.map((lang) => {
                const selected = form.preferredLanguages.includes(lang);
                const meta = getProfileLanguageMeta(lang);
                return (
                  <label
                    key={lang}
                    className={`profile-edit-lang-chip${selected ? " is-selected" : ""}`}
                    style={
                      selected
                        ? {
                            borderColor: hexToRgba(meta.color, 0.55),
                            background: hexToRgba(meta.color, 0.14),
                          }
                        : undefined
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleLanguage(lang)}
                    />
                    {meta.icon ? (
                      <img
                        src={meta.icon}
                        alt=""
                        className="profile-edit-lang-icon"
                        width={18}
                        height={18}
                        loading="lazy"
                      />
                    ) : null}
                    <span>{lang}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="profile-edit-actions">
            <button type="button" className="profile-edit-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="profile-edit-btn profile-edit-btn-primary"
              disabled={saving || uploading}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>

        {message && <p className="profile-edit-message">{message}</p>}
        {error && <p className="profile-edit-error">{error}</p>}
      </section>

      {showCropper && (
        <ProfilePictureCropper
          saving={uploading}
          onCancel={() => setShowCropper(false)}
          onSave={handleSaveAvatar}
        />
      )}
    </>
  );
}
