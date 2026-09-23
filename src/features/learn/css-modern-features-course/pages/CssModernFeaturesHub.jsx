import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CSS_MODERN_FEATURES_CHAPTERS,
  CSS_MODERN_FEATURES_LESSONS,
  CSS_MODERN_FEATURES_TOTAL_XP,
} from "../data/cssModernFeaturesCurriculum";
import useCssModernFeaturesProgress from "../hooks/useCssModernFeaturesProgress";
import CourseCertificate from "../../shared/CourseCertificate";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";

const BASE_PATH = "/learn/css-modern-features";
const ACCENT = "#f97316";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["cmf-custom-properties"],
    color: "#f97316",
    summary: "Custom property scope, fallbacks, and theming with design tokens.",
  },
  {
    level: "Intermediate",
    chapters: ["cmf-math", "cmf-selectors"],
    color: "#eab308",
    summary: "calc(), min() and max() for layout, plus :is(), :where(), :has() and :not().",
  },
  {
    level: "Advanced",
    chapters: ["cmf-cascade", "cmf-nesting-supports"],
    color: "#7c3aed",
    summary: "Cascade layers, global keywords, native nesting, @supports and @property.",
  },
  {
    level: "Expert",
    chapters: ["cmf-layout-color"],
    color: "#dc2626",
    summary: "Named container queries, logical properties, color-mix() and light-dark().",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => (block.content || "").replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function CssModernFeaturesHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useCssModernFeaturesProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = CSS_MODERN_FEATURES_LESSONS.filter(
    (lesson) => progress[lesson.id],
  ).reduce((sum, lesson) => sum + lesson.xp, 0);
  const pct =
    Math.round((completedCount / CSS_MODERN_FEATURES_LESSONS.length) * 100) || 0;

  const nextLesson =
    CSS_MODERN_FEATURES_LESSONS.find((lesson) => !progress[lesson.id]) ||
    CSS_MODERN_FEATURES_LESSONS[0];
  const resumeLesson =
    CSS_MODERN_FEATURES_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = CSS_MODERN_FEATURES_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => CSS_MODERN_FEATURES_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CSS_MODERN_FEATURES_LESSONS.filter((lesson) => {
      const matchesQuery =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.chapterTitle.toLowerCase().includes(query) ||
        lessonPlainText(lesson).toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "todo" && !progress[lesson.id]) ||
        (filter === "done" && progress[lesson.id]) ||
        (filter === "bookmarked" && bookmarks.includes(lesson.id));
      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, filter, progress, search]);

  return (
    <div className="oops-hub matplotlib-hub">
      <div className="oops-hero matplotlib-hero">
        <Link
          to="/language/HTML%20%26%20CSS"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← HTML & CSS courses
        </Link>
        <div className="oops-hero-badge">CSS · ADVANCED COURSE</div>
        <h1 className="oops-hero-title">
          CSS Variables
          <br />
          <span className="oops-hero-accent" style={{ color: ACCENT }}>
            & Modern CSS
          </span>
        </h1>
        <p className="oops-hero-sub">
          Custom properties, CSS math, modern selectors, cascade layers, nesting and container queries — the features shipping in every browser today. {CSS_MODERN_FEATURES_CHAPTERS.length}{" "}
          chapters, {CSS_MODERN_FEATURES_LESSONS.length} lessons, hands-on challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${CSS_MODERN_FEATURES_LESSONS.length} lessons · ${earnedXP}/${CSS_MODERN_FEATURES_TOTAL_XP} XP`
                  : `Sign in to track progress · ${CSS_MODERN_FEATURES_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{
                  width: isAuthenticated ? `${pct}%` : "0%",
                  background: ACCENT,
                }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run challenges, earn XP, and save
                your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="oops-auth-gate-btn oops-auth-gate-btn-primary"
                >
                  Sign up free
                </Link>
              </div>
            </div>
          )}

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">
              {isAuthenticated
                ? "Progress saved to your account"
                : "Browse lessons — sign in to save progress"}
            </span>
            <h2>{resumeLesson.title}</h2>
            <p>
              {resumeLesson.chapterTitle} · {resumeLesson.xp} XP
            </p>
            <button
              type="button"
              onClick={() =>
                navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)
              }
            >
              {completedCount > 0 ? "Resume Course" : "Start Course"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a Modern CSS topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search :has(), @layer, container queries..."
              aria-label="Search CSS Modern Features lessons"
            />
            <div
              className="oops-filter-tabs"
              aria-label="Filter CSS Modern Features lessons"
            >
              {[
                ["all", "All"],
                ["todo", "To do"],
                ["done", "Done"],
                ["bookmarked", "Saved"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={filter === value ? "active" : ""}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button
                key={lesson.id}
                type="button"
                className="oops-search-result"
                onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}
              >
                <span>{progress[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.chapterTitle}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && (
              <p className="oops-empty-copy">No lessons match that search.</p>
            )}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>
            Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.
          </p>
          <button
            type="button"
            onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}
          >
            Open next lesson
          </button>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}
                >
                  <strong>{lesson.title}</strong>
                  <small>{lesson.chapterTitle}</small>
                </button>
              ))}
            </div>
          ) : (
            <p>Bookmark lessons to review them here.</p>
          )}
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{CSS_MODERN_FEATURES_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{CSS_MODERN_FEATURES_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{CSS_MODERN_FEATURES_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Expert</span>
          <small>
            {CSS_MODERN_FEATURES_CHAPTERS.length} chapters ·{" "}
            {CSS_MODERN_FEATURES_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = CSS_MODERN_FEATURES_CHAPTERS.filter((ch) =>
              stage.chapters.includes(ch.id),
            );
            const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
            const stageDone = stageLessons.filter(
              (l) => progress[l.id],
            ).length;
            const stagePct =
              stageLessons.length > 0
                ? Math.round((stageDone / stageLessons.length) * 100)
                : 0;

            return (
              <article
                key={stage.level}
                className="matplotlib-path-card"
                style={{ "--stage-color": stage.color }}
              >
                <header className="matplotlib-path-card-head">
                  <span className="matplotlib-path-level">{stage.level}</span>
                  <span className="matplotlib-path-pct">{stagePct}%</span>
                </header>
                <p className="matplotlib-path-summary">{stage.summary}</p>
                <ul className="matplotlib-path-chapters">
                  {stageChapters.map((ch) => (
                    <li key={ch.id}>
                      <span className="oops-chapter-icon-wrap" aria-hidden>
                        <LearnChapterIcon icon={ch.icon} size={14} />
                      </span>
                      {ch.title}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="matplotlib-path-cta"
                  onClick={() => {
                    const firstOpen =
                      stageLessons.find((l) => !progress[l.id]) ||
                      stageLessons[0];
                    if (firstOpen) {
                      navigate(`${BASE_PATH}/lesson/${firstOpen.id}`);
                    }
                  }}
                >
                  {stageDone === stageLessons.length && stageLessons.length > 0
                    ? "Review stage →"
                    : stageDone > 0
                      ? "Continue stage →"
                      : "Start stage →"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <LearnChapterPathOverview
        chapters={CSS_MODERN_FEATURES_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={CSS_MODERN_FEATURES_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      <CourseCertificate
        courseName="CSS Variables & Modern CSS"
        totalLessons={CSS_MODERN_FEATURES_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={CSS_MODERN_FEATURES_TOTAL_XP}
      />
    </div>
  );
}
