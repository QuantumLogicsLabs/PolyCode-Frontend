import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { getActiveLearnNavGroup } from "../../language/courseCatalog";
import LearnNavDropdown from "./LearnNavDropdown";
import ReviewNavLink from "../../learn/review/ReviewNavLink";
import ProfileAvatar from "../../profile/components/ProfileAvatar";
import ThemeSettingsMenu from "../../../shared/theme/ThemeSettingsMenu";
import { THEMES } from "../../../shared/theme/themes";

export default function Navbar({
  toggleSidebar,
  showMobileMenu = true,
  mobileMenuOpen = false,
  theme = "dark",
  onThemeChange,
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

  const learnNavGroup = useMemo(
    () => getActiveLearnNavGroup(selectedLanguage, location.pathname),
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
        <Link
          to="/playground"
          className={`navbar-playground-link ${isActive("/playground")}`}
        >
          Playground
        </Link>
        <Link to="/search" className={isActive("/search")}>
          Search
        </Link>
        <ReviewNavLink className={isActive("/review")} />
        <LearnNavDropdown group={learnNavGroup} pathname={location.pathname} />
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

        <ThemeSettingsMenu
          theme={theme}
          onThemeChange={onThemeChange}
          buttonClassName="theme-settings-btn"
          panelClassName="theme-settings-panel"
        />

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
                <div className="navbar-dropdown-theme">
                  <p className="theme-settings-dropdown-label">Theme</p>
                  <div className="theme-settings-list">
                    {THEMES.map((item) => {
                      const active = item.id === theme;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`theme-settings-option${active ? " theme-settings-option--active" : ""}`}
                          onClick={() => {
                            onThemeChange?.(item.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <span
                            className="theme-settings-swatch"
                            style={{ background: item.swatch }}
                            aria-hidden
                          />
                          <span className="theme-settings-copy">
                            <strong>{item.label}</strong>
                            <small>{item.description}</small>
                          </span>
                          {active ? (
                            <span className="theme-settings-check" aria-hidden>
                              ✓
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
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
