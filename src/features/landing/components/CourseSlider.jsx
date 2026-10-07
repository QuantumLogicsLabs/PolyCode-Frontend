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
const getCardsPerView = () => {
  if (window.innerWidth <= 560) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
};

export default function CoursesSlider() {
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);
  const [isPaused, setIsPaused] = useState(false);
  const total = COURSES.length;
  useEffect(() => {
  const handleResize = () => {
    setCardsPerView(getCardsPerView());
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
const totalPages = Math.ceil(total / cardsPerView);

const visibleDotIndex =
  totalPages <= 5
    ? activeIndex
    : Math.round((activeIndex / (totalPages - 1)) * 4);

  /* ── scroll helpers ── */
  const scrollTo = useCallback(
    (index, instant = false) => {
      if (!trackRef.current) return;
      const clamped = Math.max(0, Math.min(index, totalPages - 1));
      const cardIndex = clamped * cardsPerView;
      const track = trackRef.current;
      const firstCard = track.querySelector(".cs-card");
      const step = firstCard ? firstCard.offsetWidth + GAP : CARD_WIDTH + GAP;

      if (instant) {
        track.style.scrollSnapType = "none";
        track.scrollTo({ left: cardIndex * step, behavior: "auto" });
        setActiveIndex(clamped);
        requestAnimationFrame(() => {
          track.style.scrollSnapType = "";
        });
        return;
      }

      track.scrollTo({ left: cardIndex * step, behavior: "smooth" });
      setActiveIndex(clamped);
    },
    [totalPages, cardsPerView],
  );

  const prev = () => {
    if (activeIndex === 0) {
      scrollTo(totalPages - 1, true);
    } else {
      scrollTo(activeIndex - 1);
    }
  };

  const next = useCallback(() => {
    if (activeIndex === totalPages - 1) {
      scrollTo(0, true);
    } else {
      scrollTo(activeIndex + 1);
    }
  }, [activeIndex, scrollTo, totalPages]);

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
      const firstCard = track.querySelector(".cs-card");
      const step = firstCard 
        ? firstCard.offsetWidth + GAP 
        : CARD_WIDTH + GAP;
      const cardIndex = Math.round(track.scrollLeft / step);
      const pageIndex = Math.floor(cardIndex / cardsPerView);
      const newIndex = Math.max(
        0,
        Math.min(pageIndex, totalPages - 1)
      );
      setActiveIndex(newIndex);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [cardsPerView, totalPages]);

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
          {COURSES.map((course) => {
            const Icon = course.icon;
           
            return (
              <article
                key={course.title}
                className="cs-card"
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
          {Array.from(
            { length: Math.min(5, totalPages) }, 
            (_, i) => (
              <button
                  key={i}
                  type ="button"
                  role="tab"
                  aria-selected={i === visibleDotIndex}
                  aria-label={`Go to course group ${i+1}`}
                  className={`cs-dot${
                    i === visibleDotIndex ? " cs-dot--active" : ""
                  }`}
                  onClick={() => {
                    const pageIndex = 
                      totalPages <= 5
                        ? i
                        : Math.round((i/4)* (totalPages-1));
                    scrollTo(pageIndex);
                  }}
                />
            ))}
        </div>
      </div>
    </section>
  );
}
