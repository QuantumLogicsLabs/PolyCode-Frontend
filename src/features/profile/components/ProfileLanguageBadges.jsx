import React from "react";
import {
  getProfileLanguageMeta,
  hexToRgba,
} from "../utils/profileLanguageMeta";

export default function ProfileLanguageBadges({ languages = [] }) {
  const selected = Array.isArray(languages)
    ? languages.filter(Boolean)
    : [];

  if (selected.length === 0) return null;

  return (
    <div className="profile-language-badges" aria-label="Preferred languages">
      {selected.map((language) => {
        const meta = getProfileLanguageMeta(language);
        return (
          <span
            key={language}
            className="profile-language-badge"
            style={{
              borderColor: hexToRgba(meta.color, 0.42),
              background: hexToRgba(meta.color, 0.16),
              boxShadow: `inset 0 0 0 1px ${hexToRgba(meta.color, 0.08)}`,
            }}
          >
            {meta.icon ? (
              <img
                src={meta.icon}
                alt=""
                className="profile-language-badge-icon"
                width={14}
                height={14}
                loading="lazy"
              />
            ) : null}
            <span>{language}</span>
          </span>
        );
      })}
    </div>
  );
}
