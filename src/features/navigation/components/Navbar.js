import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { getLearnNavLinks } from "../../language/courseCatalog";
import ProfileAvatar from "../../profile/components/ProfileAvatar";

export default function Navbar({
  toggleSidebar,
  showMobileMenu = true,
  mobileMenuOpen = false,
  theme = "dark",
  onToggleTheme,
  onGoToStackPicker,
  selectedLanguage,
}) {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Bug fix: use startsWith for prefix-based routes (e.g. /learn/oops-cpp/lesson/*)
  // so sub-pages correctly highlight the parent nav link.
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/")
      ? "active"
      : "";

  const learnNavLinks = useMemo(
    () => getLearnNavLinks(selectedLanguage, location.pathname),
    [selectedLanguage, location.pathname],
  );

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const canToggleMobileMenu =
    showMobileMenu && typeof toggleSidebar === "function";

  return (
    <nav className="navbar">
      {canToggleMobileMenu ? (
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Open lesson menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      ) : (
        <span className="mobile-menu-spacer" aria-hidden="true" />
      )}

      <button
        type="button"
        className="navbar-brand"
        onClick={onGoToStackPicker}
        title="Back to all languages"
      >
        <img src="/images/polycode-logo.png" alt="PolyCode Logo" className="navbar-logo" />
        <div className="navbar-brand-text">
          <span className="logo-text">PolyCode</span>
          <span className="logo-sub">v2.0 docs</span>
        </div>
      </button>

      <form className="navbar-search" onSubmit={handleSearch}>
        <span className="search-icon-left" aria-hidden="true">
          ⌕
        </span>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search docs, topics, code…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
        <span className="search-kbd" aria-hidden="true">
          ⌘K
        </span>
      </form>

      <div className="navbar-links">
        <button
          type="button"
          className={`navbar-link-btn ${location.pathname === "/select-language" ? "active" : ""}`}
          onClick={onGoToStackPicker}
          title="Choose a programming language"
        >
          Home
        </button>
        <Link to="/hub" className={isActive("/hub")}>
          Docs hub
        </Link>
        <Link to="/search" className={isActive("/search")}>
          Search
        </Link>
        {learnNavLinks.map((item) => (
          <Link key={item.to} to={item.to} className={isActive(item.to)}>
            {item.label}
          </Link>
        ))}
        <NavLink
          to="/playground"
          className={({ isActive: a }) =>
            `navbar-playground-link ${a ? "active" : ""}`
          }
        >
          ▶ Playground
        </NavLink>
      </div>

      <div className="navbar-actions">
        <Link
          to="/search"
          className={`navbar-icon-btn navbar-mobile-search ${isActive("/search")}`}
          aria-label="Search"
          title="Search"
        >
          ⌕
        </Link>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === "dark" ? "☀" : "🌙"}
          </span>
          <span className="theme-toggle-label">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        {user ? (
          <div className="navbar-user" ref={dropdownRef}>
            <button
              type="button"
              className="navbar-avatar-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-label="User menu"
              title={user.username}
            >
              <ProfileAvatar user={user} size="sm" className="navbar-avatar-inner" />
            </button>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <strong>{user.username}</strong>
                  <span>{user.email}</span>
                </div>
                <Link
                  to={user?.username ? `/@${user.username}` : "/profile"}
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  View profile
                </Link>
                <button
                  type="button"
                  className="navbar-dropdown-item navbar-dropdown-logout"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-auth-btns">
            <Link
              to="/login"
              className="navbar-login-btn navbar-login-btn--compact"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="navbar-signup-btn navbar-signup-btn--compact"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
