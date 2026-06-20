import React, { useRef, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_LESSONS, TOTAL_XP } from "../data/oopsCurriculum";
import ConceptCard from "../components/ConceptCard";
import CodeChallenge from "../components/CodeChallenge";
import OopsSidebar from "../components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import LessonReadGate from "../../shared/LessonReadGate";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import useOopsProgress from "../hooks/useOopsProgress";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const READ_GATE_PREFIX = "oops";

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
  const intro = blocks[0] || `${lesson.title} is an important OOP idea in C++.`;
  const analogy = blocks[1] || lesson.challenge.description;

  return {
    plain: intro,
    why: `${lesson.title} helps you write code that is easier to change, test, and reuse as your program grows.`,
    analogy,
  };
}

function getKeyTerms(lesson) {
  const terms = new Set();
  const source = `${lesson.title} ${getLessonPlainBlocks(lesson).join(" ")} ${
    lesson.challenge.description
  }`;

  [
    "class",
    "object",
    "private",
    "public",
    "constructor",
    "inheritance",
    "encapsulation",
    "polymorphism",
    "abstraction",
    "virtual",
    "override",
    "pointer",
    "reference",
  ].forEach((term) => {
    if (source.toLowerCase().includes(term)) terms.add(term);
  });

  if (terms.size < 3) {
    lesson.title
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .forEach((word) => terms.add(word.toLowerCase()));
  }

  return [...terms].slice(0, 6);
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory"); // "theory" | "challenge"
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
    syncState,
    remoteProgress,
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
  } = useOopsProgress();
  const [noteDraft, setNoteDraft] = useState("");
  const codeSaveTimer = useRef(null);

  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
  const lessonIdx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  const prev = ALL_LESSONS[lessonIdx - 1];
  const next = ALL_LESSONS[lessonIdx + 1];
  const firstTextBlock = lesson?.theory.find((block) => block.type === "text");
  const firstCodeBlock = lesson?.theory.find((block) => block.type === "code");
  const firstCallout = lesson?.theory.find((block) => block.type === "callout");
  const practicePrompts = lesson?.challenge?.tests?.slice(0, 3) || [];
  const briefStepItems = [
    `Identify the problem ${lesson?.title || "this topic"} solves.`,
    "Read the smallest code example before the full explanation.",
    "Change one line in the challenge and run the tests to see the effect.",
  ];
  const lessonSummary = useMemo(
    () => (lesson ? getReadableSummary(lesson) : null),
    [lesson],
  );
  const keyTerms = useMemo(() => (lesson ? getKeyTerms(lesson) : []), [lesson]);

  useLessonAssistantContext({
    course: "OOP C++",
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
        <p>Lesson not found.</p>
        <button onClick={() => navigate("/learn/oops-cpp")}>
          ← Back to Hub
        </button>
      </div>
    );
  }

  const isCompleted = !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = ALL_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );
  const syncLabel =
    syncState === "synced"
      ? "Progress saved to MongoDB"
      : syncState === "syncing"
        ? "Syncing progress..."
        : user
          ? "Progress sync pending"
          : "Progress saved locally";

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
      {/* Sidebar */}
      <OopsSidebar currentLessonId={lessonId} progress={progress} />

      {/* Main */}
      <div className="oops-lesson-main">
        {/* Top bar */}
        <div className="oops-lesson-topbar">
          <button
            className="oops-back-btn"
            onClick={() => navigate("/learn/oops-cpp")}
          >
            ← OOP C++
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
            trackTitle="OOPs C++"
            syncLabel={syncLabel}
            completedCount={completedCount}
            totalLessons={ALL_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={remoteProgress?.currentStreak || 0}
          />
        </div>

        {/* Tab switcher — FCC style */}
        <div className="oops-tabs">
          <button
            className={`oops-tab ${tab === "theory" ? "active" : ""}`}
            onClick={() => setTab("theory")}
          >
            📖 Theory
          </button>
          <LessonChallengeTab
            active={tab === "challenge"}
            locked={challengeTabLocked}
            xp={lesson.xp}
            onClick={goToChallenge}
          />
        </div>

        <LessonContentShell
          storageKey={`oops-cpp:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — OOP C++`}
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
                      `This lesson introduces ${lesson.title} in practical C++ terms.`}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Analogy</span>
                  <h3>Real-life mental model</h3>
                  <p>
                    {plainLessonText(firstCallout?.content) ||
                      `Think of ${lesson.title} as a design decision you make before writing the class, like choosing the right tool before building.`}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Syntax</span>
                  <h3>What to look for</h3>
                  <p>
                    {firstCodeBlock
                      ? `Study the "${firstCodeBlock.label}" example, then trace which data belongs to the object and which functions form the public interface.`
                      : "Read the code slowly: identify the class name, private state, public methods, and the line where the object is used."}
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
                    <li>Making every field public instead of designing an interface.</li>
                    <li>Copying code without checking object lifetime and ownership.</li>
                    <li>Skipping the challenge before testing the concept in code.</li>
                  </ul>
                </div>
                <div className="oops-brief-card oops-brief-wide">
                  <span className="oops-interactive-label">Practice</span>
                  <h3>Before the challenge, answer these</h3>
                  <ul>
                    {practicePrompts.map((item) => (
                      <li key={item.id}>{item.label}</li>
                    ))}
                  </ul>
                </div>
                <div className="oops-brief-card oops-brief-wide">
                  <span className="oops-interactive-label">Mini Quiz</span>
                  <h3>Check yourself</h3>
                  <ul>
                    <li>What data should belong inside the object?</li>
                    <li>Which function is the safest public interface for that data?</li>
                    <li>What would break if this design grew to ten objects?</li>
                  </ul>
                </div>
              </div>
              {lesson.theory.map((block, i) => (
                <ConceptCard
                  key={i}
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
                  <h3>Capture your mental model</h3>
                </div>
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Write a short note, gotcha, or example you want to remember..."
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

        {/* Prev / Next nav */}
        <div className="oops-lesson-nav">
          {prev ? (
            <button
              className="oops-nav-btn"
              onClick={() => navigate(`/learn/oops-cpp/lesson/${prev.id}`)}
            >
              ← {prev.title}
            </button>
          ) : (
            <div />
          )}
          {next ? (
            <button
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(`/learn/oops-cpp/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate("/learn/oops-cpp")}
            >
              Finish Module →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
