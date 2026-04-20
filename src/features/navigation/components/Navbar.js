import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({
  toggleSidebar,
  theme = "dark",
  onToggleTheme,
}) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      {/* ── Hamburger / sidebar toggle ── */}
      <button className="mobile-menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* ── Brand ── */}
      <Link to="/hub" className="navbar-brand">
        <img src="/logo.png" alt="PolyCode Logo" className="navbar-logo" />
        <div className="navbar-brand-text">
          <span className="logo-text">PolyCode</span>
          <span className="logo-sub">v2.0 docs</span>
        </div>
      </Link>

      {/* ── Search ── */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <span className="search-icon-left">⌕</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search docs, topics, code…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search"
        />
        <span className="search-kbd">⌘K</span>
      </form>

      {/* ── Links ── */}
      <div className="navbar-links">
        <Link to="/hub" className={isActive('/hub')}>Home</Link>
        <Link to="/search" className={isActive('/search')}>Search</Link>
        {/* Playground link */}
        <NavLink
          to="/playground"
          className={({ isActive: a }) =>
            `navbar-playground-link ${a ? 'active' : ''}`
          }
        >
          ▶ Playground
        </NavLink>
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}