import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeChallenge from "../../oops-cpp/components/CodeChallenge";
import ConceptCard from "../../oops-cpp/components/ConceptCard";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import LessonReadGate from "../../shared/LessonReadGate";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import {
  POINTER_CHAPTERS,
  POINTER_LESSONS,
  POINTER_TOTAL_XP,
} from "../data/pointersCurriculum";
import usePointersProgress from "../hooks/usePointersProgress";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/pointers-cpp";
const READ_GATE_PREFIX = "pointers_cpp";

function plainLessonText(text = "") {
  return text.replace(/\*\*/g, "").replace(/`/g, "");
}

function getLessonPlainBlocks(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => plainLessonText(block.content));
}

function getReadableSummary(lesson) {
  const blocks = getLessonPlainBlocks(lesson);
  return {
    plain:
      blocks[0] ||
      `${lesson.title} is a core pointer concept in practical C++.`,
    why: `${lesson.title} helps you reason about memory, ownership, and safe access instead of guessing what your program is doing.`,
    analogy:
      blocks[1] ||
      "Think of a pointer as a precise address label: useful when you need to find, share, or manage an object without copying it.",
  };
}

function getKeyTerms(lesson) {
  const terms = new Set();
  const source = `${lesson.title} ${getLessonPlainBlocks(lesson).join(" ")} ${
    lesson.challenge.description
  }`.toLowerCase();

  [
    "pointer",
    "address",
    "dereference",
    "nullptr",
    "array",
    "reference",
    "new",
    "delete",
    "unique_ptr",
    "shared_ptr",
    "ownership",
    "callback",
    "lifetime",
  ].forEach((term) => {
    if (source.includes(term.toLowerCase())) terms.add(term);
  });

  return [...terms].slice(0, 6);
}

export default function PointersLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const {
    markedAsRead,
    markAsRead,
    confidence,
    handleConfidenceChange,
    createGoToChallenge,
    challengeTabLocked,
  } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const {
    user,
    completedMap: progress,
    savedCodeMap,
    getLessonNote,
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    saveNote,
    toggleBookmark,
    addTime,
  } = usePointersProgress();
  const [noteDraft, setNoteDraft] = useState("");
  const codeSaveTimer = useRef(null);

  const lesson = POINTER_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = POINTER_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = POINTER_LESSONS[lessonIdx - 1];
  const next = POINTER_LESSONS[lessonIdx + 1];
  const firstTextBlock = lesson?.theory.find((block) => block.type === "text");
  const firstCodeBlock = lesson?.theory.find((block) => block.type === "code");
  const firstCallout = lesson?.theory.find((block) => block.type === "callout");
  const practicePrompts = lesson?.challenge?.tests?.slice(0, 3) || [];
  const lessonSummary = useMemo(
    () => (lesson ? getReadableSummary(lesson) : null),
    [lesson],
  );
  const keyTerms = useMemo(() => (lesson ? getKeyTerms(lesson) : []), [lesson]);
  const briefStepItems = [
    `Name the memory problem ${lesson?.title || "this lesson"} solves.`,
    "Trace every `&`, `*`, and owner before reading the full code.",
    "Run the challenge, then change one pointer line and run again.",
  ];

  useLessonAssistantContext({
    course: "Pointers C++",
    language: "C++",
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
    code: savedCodeMap[lessonId] || "",
  });

  useEffect(() => {
    setTab("theory");
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  useEffect(() => {
    setNoteDraft(getLessonNote(lessonId));
  }, [lessonId, getLessonNote]);

  useEffect(() => {
    if (!lessonId) return undefined;
    const id = setInterval(() => addTime(1), 60000);
    return () => clearInterval(id);
  }, [addTime, lessonId]);

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Pointer lesson not found.</p>
        <button onClick={() => navigate(BASE_PATH)}>← Back to Pointers</button>
      </div>
    );
  }

  const isCompleted = !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = POINTER_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );

  async function handleChallengeComplete() {
    await completeLesson(lesson);
  }

  function handleSaveNote() {
    saveNote(lessonId, noteDraft);
  }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => {
      saveCode(lessonId, code).catch(() => {});
    }, 700);
  }

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={POINTER_CHAPTERS}
        basePath={BASE_PATH}
        title="Pointers in C++"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>
            ← Pointers C++
          </button>
          <div className="oops-lesson-breadcrumb">
            <span style={{ color: `var(--ch-color, ${lesson.chapterColor})` }}>
              {lesson.chapterTitle}
            </span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && (
            <span className="oops-completed-badge">✓ Completed</span>
          )}
          <button
            type="button"
            className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`}
            onClick={() => toggleBookmark(lessonId)}
            title={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
          >
            {isBookmarked ? "★" : "☆"}
          </button>
          <button
            type="button"
            className={`oops-focus-btn ${focusMode ? "active" : ""}`}
            onClick={() => setFocusMode((value) => !value)}
          >
            {focusMode ? "Exit Focus" : "Focus"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle="Pointers C++"
            syncLabel="Pointer progress saved locally"
            completedCount={completedCount}
            totalLessons={POINTER_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={POINTER_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        <div className="oops-tabs">
          <button
            className={`oops-tab ${tab === "theory" ? "active" : ""}`}
            onClick={() => setTab("theory")}
          >
            Theory
          </button>
          <LessonChallengeTab
            active={tab === "challenge"}
            locked={challengeTabLocked}
            xp={lesson.xp}
            onClick={goToChallenge}
          />
        </div>

        <LessonContentShell
          storageKey={`pointers-cpp:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — Pointers C++`}
        >
          {tab === "theory" ? (
            <div className="oops-theory-pane">
              <div className="oops-lesson-title-row">
                <div>
                  <span className="oops-interactive-label">Plain English</span>
                  <h2 className="oops-lesson-heading">{lesson.title}</h2>
                </div>
                <div className="oops-term-cloud" aria-label="Key terms">
                  {keyTerms.map((term) => (
                    <span key={term}>{term}</span>
                  ))}
                </div>
              </div>

              <div className="oops-easy-summary">
                <div>
                  <span className="oops-summary-kicker">What it means</span>
                  <p>{lessonSummary.plain}</p>
                </div>
                <div>
                  <span className="oops-summary-kicker">Why it matters</span>
                  <p>{lessonSummary.why}</p>
                </div>
                <div>
                  <span className="oops-summary-kicker">Mental model</span>
                  <p>{lessonSummary.analogy}</p>
                </div>
              </div>

              <div className="oops-learning-brief">
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Start Here</span>
                  <h3>Simple explanation</h3>
                  <p>
                    {plainLessonText(firstTextBlock?.content) ||
                      `This lesson explains ${lesson.title} in practical C++ terms.`}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Mental Model</span>
                  <h3>What to picture</h3>
                  <p>
                    {plainLessonText(firstCallout?.content) ||
                      "Picture boxes in memory and address labels pointing at those boxes."}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Syntax</span>
                  <h3>What to look for</h3>
                  <p>
                    {firstCodeBlock
                      ? `Study the "${firstCodeBlock.label}" example. Track each address, dereference, and ownership decision.`
                      : "Read the code slowly: find the pointer declaration, the address assignment, and every dereference."}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Steps</span>
                  <h3>How to learn it</h3>
                  <ol>
                    {briefStepItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Mistakes</span>
                  <h3>Common traps</h3>
                  <ul>
                    <li>Dereferencing before checking for a valid target.</li>
                    <li>Confusing an address with the value stored there.</li>
                    <li>Using raw owning pointers when smart pointers are clearer.</li>
                  </ul>
                </div>
                <div className="oops-brief-card oops-brief-wide">
                  <span className="oops-interactive-label">Practice</span>
                  <h3>Before the challenge, verify these</h3>
                  <ul>
                    {practicePrompts.map((item) => (
                      <li key={item.id}>{item.label}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {lesson.theory.map((block, index) => (
                <ConceptCard
                  key={index}
                  block={block}
                  accentColor={lesson.chapterColor}
                  runnableCodeLangs={["cpp", "c++"]}
                />
              ))}

              <LessonReadGate
                markedAsRead={markedAsRead}
                onMarkAsRead={markAsRead}
                confidence={confidence}
                onConfidenceChange={handleConfidenceChange}
                onGoChallenge={goToChallenge}
                accentColor={lesson.chapterColor}
                challengeLabel="Ready? Take the Challenge →"
              />

              <div className="oops-notes-panel">
                <div>
                  <span className="oops-interactive-label">Lesson Notes</span>
                  <h3>Capture your pointer rule</h3>
                </div>
                <textarea
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="Write a pointer rule, gotcha, address trace, or safety note..."
                />
                <button type="button" onClick={handleSaveNote}>
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            <CodeChallenge
              challenge={lesson.challenge}
              accentColor={lesson.chapterColor}
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          )}
        </LessonContentShell>

        <div className="oops-lesson-nav">
          {prev ? (
            <button
              className="oops-nav-btn"
              onClick={() => navigate(`${BASE_PATH}/lesson/${prev.id}`)}
            >
              ← {prev.title}
            </button>
          ) : (
            <div />
          )}
          {next ? (
            <button
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(BASE_PATH)}
            >
              Finish Module →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
