import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RUBY_BLOCKS_MODULES_CHAPTERS,
  RUBY_BLOCKS_MODULES_LESSONS,
  RUBY_BLOCKS_MODULES_TOTAL_XP,
} from "../data/rubyBlocksModulesCurriculum";
import useRubyBlocksModulesProgress from "../hooks/useRubyBlocksModulesProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/ruby-blocks-modules";

// Learning path definition mirroring the Ruby OOP course style
const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: RUBY_BLOCKS_MODULES_CHAPTERS.filter((ch) => ch.stage === "beginner").map((ch) => ch.id),
    color: "#22c55e",
    summary: "Blocks, procs, lambdas, and module basics.",
  },
  {
    level: "Intermediate",
    chapters: RUBY_BLOCKS_MODULES_CHAPTERS.filter((ch) => ch.stage === "intermediate").map((ch) => ch.id),
    color: "#3b82f6",
    summary: "Modules, mixins, closures, and enumerables.",
  },
  {
    level: "Advanced",
    chapters: RUBY_BLOCKS_MODULES_CHAPTERS.filter((ch) => ch.stage === "advanced").map((ch) => ch.id),
    color: "#a855f7",
    summary: "Advanced patterns, resource management, and builders.",
  },
  {
    level: "Pro",
    chapters: RUBY_BLOCKS_MODULES_CHAPTERS.filter((ch) => ch.stage === "pro").map((ch) => ch.id),
    color: "#f59e0b",
    summary: "Refinements, fibers, lazy evaluation, and metaprogramming.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function RubyBlocksModulesHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("beginner");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } = useRubyBlocksModulesProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = RUBY_BLOCKS_MODULES_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct = Math.round((completedCount / RUBY_BLOCKS_MODULES_LESSONS.length) * 100) || 0;
  const nextLesson = RUBY_BLOCKS_MODULES_LESSONS.find((lesson) => !progress[lesson.id]) || RUBY_BLOCKS_MODULES_LESSONS[0];
  const resumeLesson = RUBY_BLOCKS_MODULES_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const chaptersForStage = RUBY_BLOCKS_MODULES_CHAPTERS.filter((c) => (c.stage || "beginner") === stage);

  // Get all chapters for the chapter grid (not filtered by stage)
  const allChapters = RUBY_BLOCKS_MODULES_CHAPTERS;
  const completedChapters = chaptersForStage.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => RUBY_BLOCKS_MODULES_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return RUBY_BLOCKS_MODULES_LESSONS.filter((lesson) => {
      const ch = RUBY_BLOCKS_MODULES_CHAPTERS.find((c) => c.id === lesson.chapterId);
      if (((ch && (ch.stage || "beginner")) || "beginner") !== stage) return false;

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
  }, [bookmarks, filter, progress, search, stage]);

  return (
    <div className="oops-hub ruby-blocks-modules-hub">
      <div className="oops-hero ruby-blocks-modules-hero">
        <Link to="/language/Ruby" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          ← Ruby courses
        </Link>
        <div className="oops-hero-badge">Ruby · BLOCKS & MODULES</div>
        <h1 className="oops-hero-title">
          Ruby
          <br />
          <span className="oops-hero-accent">Blocks &amp; Modules</span>
        </h1>
        <p className="oops-hero-sub">
          Master Ruby blocks, procs, lambdas, modules, and mixins with hands‑on challenges and runnable code.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${RUBY_BLOCKS_MODULES_LESSONS.length} lessons · ${earnedXP}/${RUBY_BLOCKS_MODULES_TOTAL_XP} XP`
                  : `Sign in to track progress · ${RUBY_BLOCKS_MODULES_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div className="oops-xp-fill" style={{ width: isAuthenticated ? `${pct}%` : "0%" }} />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run Ruby challenges, earn XP, and save your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">Sign in</Link>
                <Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link>
              </div>
            </div>
          )}

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">
              {isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}
            </span>
            <h2>{resumeLesson.title}</h2>
            <p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p>
            <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>
              {completedCount > 0 ? "Resume Blocks & Modules" : "Start Blocks & Modules"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>
        {[ ["beginner","Beginner"], ["intermediate","Intermediate"], ["advanced","Advanced"], ["pro","Pro"] ].map(([id,label])=> (
          <button key={id} type="button" className={stage===id?"active stage-tab":"stage-tab"} onClick={()=>setStage(id)} style={{ marginRight: 8 }}>
            {label}
          </button>
        ))}
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Pro</span>
          <small>
            {RUBY_BLOCKS_MODULES_CHAPTERS.length} chapters ·{" "}
            {RUBY_BLOCKS_MODULES_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = RUBY_BLOCKS_MODULES_CHAPTERS.filter((ch) =>
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

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a topic</span>
          <div className="oops-search-row">
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blocks, modules, mixins..." aria-label="Search Ruby Blocks & Modules lessons" />
            <div className="oops-filter-tabs" aria-label="Filter Ruby Blocks & Modules lessons">
              {[ ["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"] ].map(([value, label]) => (
                <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button key={lesson.id} type="button" className="oops-search-result" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
                <span>{progress[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.chapterTitle}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && <p className="oops-empty-copy">No lessons match that search.</p>}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p>
          <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}>Open next lesson</button>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button key={lesson.id} type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
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
        <div className="oops-stat-tile"><span>Lessons</span><strong>{completedCount}/{RUBY_BLOCKS_MODULES_LESSONS.length}</strong></div>
        <div className="oops-stat-tile"><span>Chapters</span><strong>{completedChapters}/{RUBY_BLOCKS_MODULES_CHAPTERS.length}</strong></div>
        <div className="oops-stat-tile"><span>XP</span><strong>{earnedXP}/{RUBY_BLOCKS_MODULES_TOTAL_XP}</strong></div>
        <div className="oops-stat-tile"><span>Bookmarks</span><strong>{bookmarks.length}</strong></div>
      </div>

      <LearnChapterPathOverview chapters={allChapters} progress={progress} onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)} />

      <LearnChapterGrid chapters={allChapters} progress={progress} basePath={BASE_PATH} navigate={navigate} />

      {completedCount === RUBY_BLOCKS_MODULES_LESSONS.length && RUBY_BLOCKS_MODULES_LESSONS.length > 0 && (
        <CourseCertificate
          courseName="Ruby Blocks & Modules"
          totalLessons={RUBY_BLOCKS_MODULES_LESSONS.length}
          completedCount={completedCount}
          earnedXP={earnedXP}
        />
      )}
    </div>
  );
}
