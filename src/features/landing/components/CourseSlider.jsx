import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Course data ───────────────────────────────────────────────
   Add new courses here — they appear in the slider automatically.
   Pull from courseCatalog.js values so it's one source of truth.
──────────────────────────────────────────────────────────────── */
import { ALL_COURSES as COURSES } from "../../learn/shared/allCourses";
const CARD_WIDTH = 300; // px — keep in sync with CSS
const GAP = 20;
const AUTO_SCROLL_INTERVAL = 3500; // ms

export default function CoursesSlider() {
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = COURSES.length;

  /* ── scroll helpers ── */
  const scrollTo = useCallback(
    (index) => {
      if (!trackRef.current) return;
      const clamped = Math.max(0, Math.min(index, total - 1));
      trackRef.current.scrollTo({
        left: clamped * (CARD_WIDTH + GAP),
        behavior: "smooth",
      });
      setActiveIndex(clamped);
    },
    [total],
  );

  const prev = () => scrollTo(activeIndex === 0 ? total - 1 : activeIndex - 1);
  const next = useCallback(
    () => scrollTo(activeIndex === total - 1 ? 0 : activeIndex + 1),
    [activeIndex, scrollTo, total],
  );

  /* ── auto-scroll ── */
  useEffect(() => {
    if (isPaused) return;
    autoRef.current = setInterval(next, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(autoRef.current);
  }, [next, isPaused]);

  /* ── sync dot indicator on manual scroll ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const index = Math.round(track.scrollLeft / (CARD_WIDTH + GAP));
      setActiveIndex(index);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="courses"
      className="cs-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="landing-container">
        {/* Header */}
        <div className="cs-header">
          <div>
            <p className="landing-sec-label">Courses &amp; Resources</p>
            <h2 className="cs-title">Pick Something. Start Today.</h2>
          </div>
          <div className="cs-controls">
            <button className="cs-btn" aria-label="Previous" onClick={prev}>
              <ChevronLeft size={18} />
            </button>
            <button className="cs-btn" aria-label="Next" onClick={next}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="cs-track" ref={trackRef}>
          {COURSES.map((course, i) => {
            const Icon = course.icon;
            const isActive = i === activeIndex;
            return (
              <article
                key={course.title}
                className={`cs-card${isActive ? " cs-card--active" : ""}`}
                style={{ "--accent": course.accent }}
                onClick={() => navigate(course.href)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(course.href)}
                aria-label={`Open ${course.title}`}
              >
                <div className="cs-card-top">
                  <div className="cs-icon">
                    <Icon size={20} aria-hidden />
                  </div>
                  <span className="cs-level">{course.level}</span>
                </div>
                <span className="cs-tag">{course.tag}</span>
                <h3 className="cs-card-title">{course.title}</h3>
                <p className="cs-card-desc">{course.description}</p>
                <div className="cs-card-footer">
                  <span className="cs-cta">Start now →</span>
                </div>
                <div className="cs-card-glow" aria-hidden />
              </article>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="cs-dots" role="tablist" aria-label="Course slides">
          {COURSES.map((course, i) => (
            <button
              key={course.title}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${course.title}`}
              className={`cs-dot${i === activeIndex ? " cs-dot--active" : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
