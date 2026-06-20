import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Moon, Sun } from "lucide-react";
import { getLanguages } from "../../docs/services/api";
import { ALL_COURSES as COURSES } from "../../learn/shared/allCourses";

const NAV_LINKS = [
  { href: "#modules", label: "Features" },
  { href: "/hub", label: "Docs" },
];

export default function Navbar({ theme = "dark", onToggleTheme }) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const coursesRef = useRef(null);
  const langRef = useRef(null);
  const navigate = useNavigate();

  // Frosted glass on scroll
  useEffect(() => {
    const nav = document.querySelector(".landing-navbar");
    const onScroll = () =>
      nav?.classList.toggle("landing-navbar--scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch languages from API
  useEffect(() => {
    getLanguages()
      .then(({ data }) => {
        setLanguages(Array.isArray(data.languages) ? data.languages : []);
      })
      .catch(() => setLanguages([]));
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!coursesRef.current?.contains(e.target)) setCoursesOpen(false);
      if (!langRef.current?.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (href) => {
    setCoursesOpen(false);
    setLangOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <header className="landing-navbar">
      <div className="landing-container">
        <div className="landing-navbar-inner">
          {/* Brand */}
          <a href="#top" className="landing-brand">
            <div className="landing-brand-mark">
              <img
                src="/images/polycode-logo.png"
                alt="PolyCode Logo"
                className="landing-logo"
              />
            </div>
            <div className="landing-brand-text">
              <span className="landing-logo-text">PolyCode</span>
              <span className="landing-logo-sub">AI Learning Platform</span>
            </div>
          </a>

          {/* Nav */}
          <nav className="landing-nav-links">
            {/* Static links */}
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                className="landing-nav-link"
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </button>
            ))}

            {/* Courses dropdown */}
            <div className="ln-dropdown-wrap" ref={coursesRef}>
              <button
                className={`landing-nav-link ln-dropdown-trigger${coursesOpen ? " ln-dropdown-trigger--open" : ""}`}
                onClick={() => {
                  setCoursesOpen((o) => !o);
                  setLangOpen(false);
                }}
                aria-expanded={coursesOpen}
              >
                Courses
                <ChevronDown size={13} className="ln-chevron" />
              </button>

              {coursesOpen && (
                <div className="ln-dropdown">
                  <p className="ln-dropdown-label">Available Courses</p>
                  {COURSES.map((course) => {
                    const Icon = course.icon;
                    return (
                      <button
                        key={course.label}
                        className="ln-dropdown-item"
                        style={{ "--lang-accent": course.accent }}
                        onClick={() => handleNav(course.href)}
                      >
                        <div className="ln-dropdown-icon">
                          <Icon size={16} />
                        </div>
                        <div className="ln-dropdown-text">
                          <span className="ln-dropdown-name">
                            {course.title}
                          </span>
                        </div>
                        <ArrowRight size={13} className="ln-dropdown-arrow" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Languages dropdown */}
            <div className="ln-dropdown-wrap" ref={langRef}>
              <button
                className={`landing-nav-link ln-dropdown-trigger${langOpen ? " ln-dropdown-trigger--open" : ""}`}
                onClick={() => {
                  setLangOpen((o) => !o);
                  setCoursesOpen(false);
                }}
                aria-expanded={langOpen}
              >
                Languages
                <ChevronDown size={13} className="ln-chevron" />
              </button>

              {langOpen && (
                <div className="ln-dropdown ln-dropdown--languages">
                  <p className="ln-dropdown-label">Pick a Language</p>
                  {languages.length === 0 ? (
                    <p className="ln-dropdown-empty">Loading…</p>
                  ) : (
                    <div className="ln-lang-grid">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          className="ln-lang-item"
                          onClick={() =>
                            handleNav(`/language/${encodeURIComponent(lang)}`)
                          }
                        >
                          <span className="ln-lang-name">{lang}</span>
                          <ArrowRight size={11} className="ln-lang-arrow" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Theme + CTA */}
          <div className="landing-navbar-actions">
            {onToggleTheme ? (
              <button
                type="button"
                className="landing-theme-toggle"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun size={16} aria-hidden />
                ) : (
                  <Moon size={16} aria-hidden />
                )}
                <span className="landing-theme-toggle-label">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </button>
            ) : null}
            <a href="#get-started" className="landing-btn-primary">
              Start Learning
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
