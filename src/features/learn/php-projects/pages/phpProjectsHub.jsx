import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PHP_PROJECTS_CHAPTERS,
  PHP_PROJECTS_LESSONS,
  PHP_PROJECTS_TOTAL_XP,
} from "../data/phpProjectsCurriculum";
import usePhpProjectsProgress from "../hooks/usePhpProjectsProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/php-projects";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["contact-book"],
    color: "#06b6d4",
    summary: "Build a console Contact Book — classes, searching, sorting, and removal.",
  },
  {
    level: "Intermediate",
    chapters: ["blog-with-sessions"],
    color: "#3b82f6",
    summary: "Build a session-backed blog — login-gated publishing and comments.",
  },
  {
    level: "Advanced",
    chapters: ["task-tracker-mysql"],
    color: "#f59e0b",
    summary: "Build a MySQL-backed Task Tracker — repository pattern and statistics.",
  },
  {
    level: "Pro",
    chapters: ["mini-laravel-api"],
    color: "#8b5cf6",
    summary: "Build a mini Laravel-style API — routing, validation, and middleware.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function PhpProjectsHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = usePhpProjectsProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = PHP_PROJECTS_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct =
    Math.round((completedCount / PHP_PROJECTS_LESSONS.length) * 100) || 0;
  const nextLesson =
    PHP_PROJECTS_LESSONS.find((lesson) => !progress[lesson.id]) ||
    PHP_PROJECTS_LESSONS[0];
  const resumeLesson =
    PHP_PROJECTS_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = PHP_PROJECTS_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => PHP_PROJECTS_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PHP_PROJECTS_LESSONS.filter((lesson) => {
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
    <div className="oops-hub php-projects-hub">
      <div className="oops-hero php-projects-hero">
        <Link
          to="/language/PHP"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← PHP courses
        </Link>
        <div className="oops-hero-badge">PHP · PROJECTS</div>
        <h1 className="oops-hero-title">
          PHP
          <br />
          <span className="oops-hero-accent" style={{ color: "#8b5cf6" }}>Projects</span>
        </h1>
        <p className="oops-hero-sub">
          From your first `echo` to associative arrays, OOP architecture, superglobals, and REST APIs —
          simple theory, real-life examples, diagrams, and hands-on PHP challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${PHP_PROJECTS_LESSONS.length} lessons · ${earnedXP}/${PHP_PROJECTS_TOTAL_XP} XP`
                  : `Sign in to track progress · ${PHP_PROJECTS_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{ width: isAuthenticated ? `${pct}%` : "0%", backgroundColor: "#8b5cf6" }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run PHP challenges, earn XP, and save
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
                  Sign up
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
              onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}
            >
              {completedCount > 0 ? "Resume PHP" : "Start PHP"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a PHP Projects topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts, tasks, routing..."
              aria-label="Search PHP lessons"
            />
            <div
              className="oops-filter-tabs"
              aria-label="Filter PHP lessons"
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
                className="oops-search-result"                onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}
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
            {completedCount}/{PHP_PROJECTS_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{PHP_PROJECTS_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{PHP_PROJECTS_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      {/* ── Beginner → Pro path ── */}
      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Pro</span>
          <small>
            {PHP_PROJECTS_CHAPTERS.length} chapters ·{" "}
            {PHP_PROJECTS_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = PHP_PROJECTS_CHAPTERS.filter((ch) =>
              stage.chapters.includes(ch.id),
            );
            const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
            const stageDone = stageLessons.filter((l) => progress[l.id]).length;
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
                      <span aria-hidden>{ch.icon}</span>
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
                    if (firstOpen) navigate(`${BASE_PATH}/lesson/${firstOpen.id}`);
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
        chapters={PHP_PROJECTS_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={PHP_PROJECTS_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      <CourseCertificate
        courseName="PHP Projects"
        totalLessons={PHP_PROJECTS_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={PHP_PROJECTS_TOTAL_XP}
      />

      {/* ── Track Complete Banner ── */}
      {completedCount === PHP_PROJECTS_LESSONS.length && (
        <div className="oops-next-course-banner">
          <div className="oops-next-course-content">
            <span className="oops-next-course-emoji">🎉</span>
            <div>
              <h3>PHP Track Complete!</h3>
              <p>
                You've gone from your first echo to building a full,
                Laravel-style API. Incredible work.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="oops-next-course-btn"
            onClick={() => navigate("/language/PHP")}
          >
            Explore All PHP Courses →
          </button>
        </div>
      )}
    </div>
  );
}