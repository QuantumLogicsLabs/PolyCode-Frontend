import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  C_FUNDAMENTALS_CHAPTERS,
  C_FUNDAMENTALS_LESSONS,
  C_FUNDAMENTALS_TOTAL_XP,
} from "../data/c_fundamentalsCurriculum";
import useCFundamentalsProgress from "../hooks/useCFundamentalsProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/c-fundamentals";
const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["welcome-c"],
    color: "#659ad2",
    summary: "What C is, your first program, and how compilation works.",
  },
  {
    level: "Intermediate",
    chapters: ["variables-types", "operators"],
    color: "#4a86c8",
    summary: "Variables, data types, constants, operators, and bitwise ops.",
  },
  {
    level: "Advanced",
    chapters: ["control-flow"],
    color: "#2e6da4",
    summary: "if/else, switch, while, for loops, break and continue.",
  },
  {
    level: "Pro",
    chapters: ["input-output"],
    color: "#1a4f7a",
    summary: "printf, scanf, format specifiers, and capstone calculator.",
  },
];
function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function CFundamentalsHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useCFundamentalsProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = C_FUNDAMENTALS_LESSONS.filter((l) => progress[l.id]).reduce(
    (sum, l) => sum + l.xp,
    0,
  );
  const pct =
    Math.round((completedCount / C_FUNDAMENTALS_LESSONS.length) * 100) || 0;
  const nextLesson =
    C_FUNDAMENTALS_LESSONS.find((l) => !progress[l.id]) || C_FUNDAMENTALS_LESSONS[0];
  const resumeLesson =
    C_FUNDAMENTALS_LESSONS.find((l) => l.id === lastLessonId) || nextLesson;
  const completedChapters = C_FUNDAMENTALS_CHAPTERS.filter((ch) =>
    ch.lessons.every((l) => progress[l.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => C_FUNDAMENTALS_LESSONS.find((l) => l.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return C_FUNDAMENTALS_LESSONS.filter((lesson) => {
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
    <div className="oops-hub c-hub">
      <div className="oops-hero c-hero" style={{ borderColor: "#659ad2" }}>
        <Link
          to="/language/C"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← C courses
        </Link>
        <div className="oops-hero-badge">C · CORE TRACK</div>
        <h1 className="oops-hero-title">
          C
          <br />
          <span className="oops-hero-accent" style={{ color: "#659ad2" }}>
            Fundamentals
          </span>
        </h1>
        <p className="oops-hero-sub">Variables, data types, operators, control flow, and I/O — the solid foundation every C programmer needs.</p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${C_FUNDAMENTALS_LESSONS.length} lessons · ${earnedXP}/${C_FUNDAMENTALS_TOTAL_XP} XP`
                  : `Sign in to track progress · ${C_FUNDAMENTALS_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{ width: isAuthenticated ? `${pct}%` : "0%", backgroundColor: "#659ad2" }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run C challenges, earn XP, and save
                your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">Sign in</Link>
                <Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">
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
            <p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p>
            <button
              type="button"
              onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}
              style={{ backgroundColor: "#659ad2" }}
            >
              {completedCount > 0 ? "Resume C Fundamentals" : "Start C Fundamentals"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a C topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search variables, loops, printf..."
              aria-label="Search C Fundamentals lessons"
            />
            <div className="oops-filter-tabs">
              {[["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={filter === value ? "active" : ""}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ),
              )}
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
          <p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p>
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
          <strong>{completedCount}/{C_FUNDAMENTALS_LESSONS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>{completedChapters}/{C_FUNDAMENTALS_CHAPTERS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>{earnedXP}/{C_FUNDAMENTALS_TOTAL_XP}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>
       <section className="matplotlib-learn-path" aria-label="Learning path">
  <div className="matplotlib-path-label">
    <span>Your path · Beginner to Pro</span>
    <small>
      {C_FUNDAMENTALS_CHAPTERS.length} chapters ·{" "}
      {C_FUNDAMENTALS_LESSONS.length} lessons
    </small>
  </div>
  <div className="matplotlib-path-grid">
    {LEARNING_PATH.map((stage) => {
      const stageChapters = C_FUNDAMENTALS_CHAPTERS.filter((ch) =>
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
                stageLessons.find((l) => !progress[l.id]) || stageLessons[0];
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
        chapters={C_FUNDAMENTALS_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={C_FUNDAMENTALS_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />
      <CourseCertificate
        courseName="C Fundamentals"
        totalLessons={C_FUNDAMENTALS_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={C_FUNDAMENTALS_TOTAL_XP}
      />
    </div>
  );
}