export const PROFILE_LANGUAGE_OPTIONS = [
  "Python",
  "JavaScript",
  "Java",
  "C++",
  "C",
  "C#",
  "Go",
  "Rust",
];

const PROFILE_LANGUAGE_META = {
  Python: {
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  JavaScript: {
    color: "#f7df1e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  Java: {
    color: "#b07219",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  "C++": {
    color: "#f34b7d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  C: {
    color: "#a8b2c1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  },
  "C#": {
    color: "#239120",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  },
  Go: {
    color: "#00add8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  },
  Rust: {
    color: "#dea584",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
  },
};

export function getProfileLanguageMeta(language) {
  return (
    PROFILE_LANGUAGE_META[language] || {
      color: "#3794ff",
      icon: null,
    }
  );
}

export function hexToRgba(hex, alpha) {
  const normalized = String(hex || "#3794ff").replace("#", "");
  if (normalized.length !== 6) {
    return `rgba(55, 148, 255, ${alpha})`;
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
