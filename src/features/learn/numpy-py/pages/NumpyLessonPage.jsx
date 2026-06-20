import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConceptCard from "../../oops-cpp/components/ConceptCard";
import NumpyIntroTheory from "../components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import PythonCodeChallenge from "../components/PythonCodeChallenge";
import {
  NUMPY_CHAPTERS,
  NUMPY_LESSONS,
  NUMPY_TOTAL_XP,
} from "../data/numpyCurriculum";
import useNumpyProgress from "../hooks/useNumpyProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/numpy-py";
const READ_GATE_PREFIX = "numpy_py";

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
      `${lesson.title} is a core NumPy idea for numeric Python.`,
    why: `${lesson.title} helps you write faster, clearer data code without slow Python loops.`,
    analogy:
      blocks[1] ||
      "Think of an ndarray as a spreadsheet column stored efficiently in memory.",
  };
}

function getKeyTerms(lesson) {
  const terms = new Set();
  const source = `${lesson.title} ${getLessonPlainBlocks(lesson).join(" ")} ${
    lesson.challenge.description
  }`.toLowerCase();

  ["numpy", "ndarray", "array", "shape", "dtype", "vector", "broadcast"].forEach(
    (term) => {
      if (source.includes(term)) terms.add(term);
    },
  );

  return [...terms].slice(0, 6);
}

export default function NumpyLessonPage() {
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
    isAuthenticated,
    completedMap: progress,
    savedCodeMap,
    getLessonNote,
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    saveNote,
    toggleBookmark,
  } = useNumpyProgress();
  const [noteDraft, setNoteDraft] = useState("");
  const codeSaveTimer = useRef(null);

  const lesson = NUMPY_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = NUMPY_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = NUMPY_LESSONS[lessonIdx - 1];
  const next = NUMPY_LESSONS[lessonIdx + 1];
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
    "Read the list vs ndarray comparison.",
    "Run each code sample in the Playground or challenge.",
    "Change one value in the array and predict the output before running.",
  ];

  useLessonAssistantContext({
    course: "NumPy",
    language: "Python",
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

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>NumPy lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to NumPy
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  // All NumPy lessons use NumpyIntroTheory (text+code blocks, visual tables, diagrams).
  const useFriendlyTheory = true;
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = NUMPY_LESSONS.filter((item) => progress[item.id]).reduce(
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
        chapters={NUMPY_CHAPTERS}
        basePath={BASE_PATH}
        title="NumPy · py"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← NumPy · Python
          </button>
          <div className="oops-lesson-breadcrumb">
            <span style={{ color: lesson.chapterColor }}>{lesson.chapterTitle}</span>
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
          >
            {isBookmarked ? "★" : "☆"}
          </button>
          <button
            type="button"
            className={`oops-focus-btn ${focusMode ? "active" : ""}`}
            onClick={() => setFocusMode((v) => !v)}
          >
            {focusMode ? "Exit Focus" : "Focus"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle="NumPy · py"
            syncLabel={
              isAuthenticated
                ? "NumPy progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={NUMPY_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={NUMPY_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        <div className="oops-tabs">
          <button
            type="button"
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
          storageKey={`numpy-py:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — NumPy`}
        >
          {tab === "theory" ? (
            useFriendlyTheory ? (
              <NumpyIntroTheory
                lesson={lesson}
                noteDraft={noteDraft}
                onNoteChange={setNoteDraft}
                onSaveNote={handleSaveNote}
                confidence={confidence}
                onConfidenceChange={handleConfidenceChange}
                markedAsRead={markedAsRead}
                onMarkAsRead={markAsRead}
                onGoChallenge={goToChallenge}
              />
            ) : (
            <div className="oops-theory-pane">
              <div className="oops-lesson-title-row">
                <div>
                  <span className="oops-interactive-label">Plain English</span>
                  <h2 className="oops-lesson-heading">{lesson.title}</h2>
                </div>
                <div className="oops-term-cloud">
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
                      `This lesson covers ${lesson.title}.`}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Tip</span>
                  <h3>Remember</h3>
                  <p>
                    {plainLessonText(firstCallout?.content) ||
                      "NumPy arrays are homogeneous — one dtype per array."}
                  </p>
                </div>
                <div className="oops-brief-card">
                  <span className="oops-interactive-label">Code</span>
                  <h3>Study the examples</h3>
                  <p>
                    {firstCodeBlock
                      ? `Read "${firstCodeBlock.label}" and type it yourself.`
                      : "Run the challenge after reading the theory blocks below."}
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
                  runnableCodeLangs={["python"]}
                />
              ))}

              <div className="oops-notes-panel">
                <div>
                  <span className="oops-interactive-label">Lesson Notes</span>
                  <h3>Your notes</h3>
                </div>
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Write a NumPy rule or gotcha..."
                />
                <button type="button" onClick={handleSaveNote}>
                  Save Note
                </button>
              </div>

              <div className="oops-confidence-panel">
                <div>
                  <span className="oops-interactive-label">Confidence</span>
                  <h3>Ready for the challenge?</h3>
                </div>
                <div className="oops-confidence-options">
                  {[
                    ["review", "Need review"],
                    ["almost", "Almost there"],
                    ["ready", "Ready to code"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className={confidence === value ? "active" : ""}
                      onClick={() => handleConfidenceChange(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="oops-theory-footer">
                <button
                  type="button"
                  className="oops-cta-btn"
                  onClick={() => setTab("challenge")}
                >
                  Ready? Take the Challenge →
                </button>
              </div>
            </div>
            )
          ) : (
            <PythonCodeChallenge
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
              type="button"
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
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(BASE_PATH)}
            >
              Finish Chapter →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
