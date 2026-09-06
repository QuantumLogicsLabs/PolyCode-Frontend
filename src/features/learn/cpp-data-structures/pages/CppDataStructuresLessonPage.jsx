import React, { useEffect, useRef, useState } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useNavigate, useParams } from "react-router-dom";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import CppDsLesson from "../components/CppDsLesson";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import CppDsChallenge from "../components/CppDsChallenge";
import {
  CPP_DATA_STRUCTURES_CHAPTERS,
  CPP_DATA_STRUCTURES_LESSONS,
  CPP_DATA_STRUCTURES_TOTAL_XP,
} from "../data/cppDataStructuresCurriculum";
import useCppDataStructuresProgress from "../hooks/useCppDataStructuresProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

// HYBRID LESSON PAGE — every lesson has theory + quizzes; only lessons that
// carry a `challenge` object show the Challenge tab. Theory-only lessons
// complete (and award XP) on "Mark as read", same as the theory-only courses.

const BASE_PATH = "/learn/cpp-data-structures";
const READ_GATE_PREFIX = "cpp_data_structures";

export default function CppDataStructuresLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const codeSaveTimer = useRef(null);

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
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
  } = useCppDataStructuresProgress();

  useEffect(() => {
    setTab("theory");
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  const lesson = CPP_DATA_STRUCTURES_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = CPP_DATA_STRUCTURES_LESSONS.findIndex(
    (item) => item.id === lessonId,
  );
  const prev = CPP_DATA_STRUCTURES_LESSONS[lessonIdx - 1];
  const next = CPP_DATA_STRUCTURES_LESSONS[lessonIdx + 1];

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  useLessonAssistantContext({
    course: "C++ Data Structures",
    language: "C++",
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
    code: savedCodeMap[lessonId] || "",
  });

  if (!lesson)
    return (
      <div className="oops-not-found">
        <p>C++ Data Structures lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to C++ Data Structures
        </button>
      </div>
    );

  const hasChallenge = Boolean(lesson.challenge);
  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = CPP_DATA_STRUCTURES_LESSONS.filter(
    (item) => progress[item.id],
  ).reduce((sum, item) => sum + item.xp, 0);

  async function handleChallengeComplete() {
    if (!isCompleted) await completeLesson(lesson);
  }

  // Theory-only lessons have no challenge step to gate behind, so "Mark as
  // read" is the completion action (awards XP directly).
  async function handleMarkAsRead() {
    markAsRead();
    if (!hasChallenge && !isCompleted) {
      await completeLesson(lesson);
    }
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
        chapters={CPP_DATA_STRUCTURES_CHAPTERS}
        basePath={BASE_PATH}
        title="C++ Data Structures"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← C++ Data Structures
          </button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">
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
            trackTitle="C++ Data Structures"
            syncLabel={
              isAuthenticated
                ? "C++ Data Structures progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={CPP_DATA_STRUCTURES_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={CPP_DATA_STRUCTURES_TOTAL_XP}
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
          {hasChallenge && (
            <LessonChallengeTab
              active={tab === "challenge"}
              locked={challengeTabLocked}
              xp={lesson.xp}
              onClick={goToChallenge}
            />
          )}
        </div>

        <LessonContentShell
          tab={tab}
          storageKey={`cpp-data-structures:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — C++ Data Structures`}
        >
          {tab === "challenge" && hasChallenge ? (
            <CppDsChallenge
              challenge={{ id: lessonId, ...lesson.challenge }}
              accentColor={LEARN_ACCENT}
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          ) : (
            <CppDsLesson
              lesson={lesson}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={handleMarkAsRead}
              onGoChallenge={hasChallenge ? goToChallenge : undefined}
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
              Finish Course →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
