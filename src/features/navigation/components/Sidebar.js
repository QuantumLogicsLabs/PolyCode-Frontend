import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getTree, getLanguages } from "../../docs/services/api";
import { formatName } from "../../../shared/utils/format";

const FolderIcon = ({ color = "currentColor" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const FileIcon = ({ color = "currentColor" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);

const DocIcon = ({ color = "currentColor" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const languageLogos = {
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "c++":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  rust: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  powershell:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg",
  r: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
  csharp:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  "c#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
};

export default function Sidebar({
  isOpen,
  onClose,
  selectedLanguage,
  onLanguageSelect,
}) {
    const [tree, setTree] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = selectedLanguage ? { language: selectedLanguage } : {};
    getTree(params)
      .then((r) => setTree(r.data.tree || []))
      .catch(() => {});
    getLanguages()
      .then((r) => setLanguages(r.data))
      .catch(() => {});
  }, [selectedLanguage]);

  const isActive = (p) => location.pathname === p;

  // ── Auto-close on file click (works on all screen sizes) ──
  const handleItemClick = () => {
    onClose();
  };

  const handleSelectLanguage = (lang) => {
    setShowLangMenu(false);
    onLanguageSelect(lang);
    navigate("/hub");
    onClose(); // close after language switch too
  };

  const currentLogo = languageLogos[selectedLanguage?.toLowerCase()];

  const getFileIcon = (ext, fileName) => {
    const e = ext.toLowerCase();
    if (e === ".py")
      return (
        <img src={languageLogos.python} alt="" className="tree-logo-icon" />
      );
    if (e === ".go")
      return <img src={languageLogos.go} alt="" className="tree-logo-icon" />;
    if (e === ".js" || e === ".jsx")
      return (
        <img src={languageLogos.javascript} alt="" className="tree-logo-icon" />
      );
    if (e === ".java")
      return <img src={languageLogos.java} alt="" className="tree-logo-icon" />;
    if (e === ".rs")
      return <img src={languageLogos.rust} alt="" className="tree-logo-icon" />;
    if (e === ".cpp" || e === ".c++")
      return <img src={languageLogos.cpp} alt="" className="tree-logo-icon" />;
    if (e === ".c")
      return <img src={languageLogos.c} alt="" className="tree-logo-icon" />;
    if (e === ".php")
      return <img src={languageLogos.php} alt="" className="tree-logo-icon" />;
    if (e === ".rb")
      return <img src={languageLogos.ruby} alt="" className="tree-logo-icon" />;
    if (e === ".sql")
      return <img src={languageLogos.sql} alt="" className="tree-logo-icon" />;
    if (e === ".cs")
      return (
        <img src={languageLogos.csharp} alt="" className="tree-logo-icon" />
      );
    if (e === ".md")
      return (
        <span className="tree-icon">
          <DocIcon color="var(--cyan)" />
        </span>
      );
    if (e === ".html") return <span className="tree-icon">🌐</span>;
    if (e === ".css") return <span className="tree-icon">🎨</span>;
    return (
      <span className="tree-icon">
        <FileIcon color="var(--txt-3)" />
      </span>
    );
  };

  const SidebarTreeNode = ({ node, depth = 0 }) => {
    const [expanded, setExpanded] = useState(depth === 0);

    if (node.type === "folder") {
      const hasChildren = node.children && node.children.length > 0;
      return (
        <div className="tree-folder">
          <button
            className="tree-folder-btn"
            style={{ paddingLeft: `${16 + depth * 14}px` }}
            onClick={() => setExpanded((e) => !e)}
          >
            <span className="tree-caret">{expanded ? "▾" : "▸"}</span>
            <span className="tree-icon">
              <FolderIcon color="var(--violet)" />
            </span>
            <span className="tree-label">{formatName(node.name)}</span>
          </button>
          {expanded && hasChildren && (
            <div className="tree-children">
              {node.children.map((child, i) => (
                <SidebarTreeNode key={i} node={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      );
    }

    const to = `/doc/${node.path}${selectedLanguage ? `?language=${selectedLanguage}` : ""}`;
    const active = location.pathname === `/doc/${node.path}`;

    return (
      <Link
        to={to}
        className={`tree-file ${active ? "active" : ""}`}
        style={{ paddingLeft: `${16 + depth * 14}px` }}
        onClick={handleItemClick} // ← closes sidebar on any file click
      >
        {getFileIcon(node.ext, node.name)}
        <span className="tree-label">{formatName(node.name)}</span>
      </Link>
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? "active" : ""}`}>
      {/* Close button */}
      <button className="sidebar-close" onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Language selector */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Current Stack</div>
        <div className="sidebar-language-box">
          <button
            className="language-display-btn"
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            <div className="current-lang-info">
              {currentLogo && (
                <img src={currentLogo} alt="" className="lang-icon-mini" />
              )}
              <span className="current-language-name">{selectedLanguage}</span>
            </div>
            <span className="chevron">{showLangMenu ? "▴" : "▾"}</span>
          </button>

          {showLangMenu && (
            <div className="language-dropdown-menu">
              {languages.map((lang) => {
                const logo = languageLogos[lang.toLowerCase()];
                return (
                  <button
                    key={lang}
                    className={`lang-option ${lang === selectedLanguage ? "active" : ""}`}
                    onClick={() => handleSelectLanguage(lang)}
                  >
                    {logo && (
                      <img src={logo} alt="" className="lang-icon-tiny" />
                    )}
                    <span>{lang}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-sep" />

      {/* Quick nav */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Navigate</div>
        <Link
          to="/hub"
          className={`sidebar-item ${isActive("/hub") ? "active" : ""}`}
          onClick={handleItemClick}
        >
          <span className="icon">⌂</span>
          <span className="sidebar-text">Home</span>
        </Link>
        <Link
          to="/search"
          className={`sidebar-item ${isActive("/search") ? "active" : ""}`}
          onClick={handleItemClick}
        >
          <span className="icon">⌕</span>
          <span className="sidebar-text">Search</span>
        </Link>
        {/* Playground shortcut inside sidebar */}
        <Link
          to="/playground"
          className={`sidebar-item ${isActive("/playground") ? "active" : ""}`}
          onClick={handleItemClick}
        >
          <span className="icon">▶</span>
          <span className="sidebar-text">Playground</span>
        </Link>
      </div>

      <div className="sidebar-sep" />

      {/* File tree */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Files</div>
        <div className="sidebar-tree">
          {tree.length === 0 && (
            <div className="tree-empty">No files found</div>
          )}
          {tree.map((node, i) => (
            <SidebarTreeNode key={i} node={node} depth={0} />
          ))}
        </div>
      </div>
    </aside>
  );
}
