import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import HtmlCssCodeChallenge from "../../shared/HtmlCssCodeChallenge";
import {
  HTML_CSS_FOUNDATION_CHAPTERS,
  HTML_CSS_FOUNDATION_LESSONS,
  HTML_CSS_FOUNDATION_TOTAL_XP,
} from "../data/htmlCssFoundationCurriculum";
import useHtmlCssFoundationProgress from "../hooks/useHtmlCssFoundationProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/html-css-foundation";
const READ_GATE_PREFIX = "html_css_foundation";

export default function HtmlCssFoundationLessonPage() {
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
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
  } = useHtmlCssFoundationProgress();
  const codeSaveTimer = useRef(null);

  const lesson = HTML_CSS_FOUNDATION_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = HTML_CSS_FOUNDATION_LESSONS.findIndex(
    (item) => item.id === lessonId,
  );
  const prev = HTML_CSS_FOUNDATION_LESSONS[lessonIdx - 1];
  const next = HTML_CSS_FOUNDATION_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "HTML & CSS Foundation",
    language: "HTML & CSS",
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

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>HTML & CSS lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to HTML & CSS Foundation
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const courseFullyDone =
    completedCount >= HTML_CSS_FOUNDATION_LESSONS.length &&
    HTML_CSS_FOUNDATION_LESSONS.length > 0;
  const earnedXP = HTML_CSS_FOUNDATION_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );

  async function handleChallengeComplete() {
    await completeLesson(lesson);
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
        chapters={HTML_CSS_FOUNDATION_CHAPTERS}
        basePath={BASE_PATH}
        title="HTML & CSS"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← HTML & CSS Foundation
          </button>
          <div className="oops-lesson-breadcrumb">
            <span style={{ color: lesson.chapterColor }}>
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
            trackTitle="HTML & CSS"
            syncLabel={
              isAuthenticated
                ? "Progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={HTML_CSS_FOUNDATION_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={HTML_CSS_FOUNDATION_TOTAL_XP}
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
          tab={tab}
          storageKey={`html-css-foundation:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — HTML & CSS Foundation`}
        >
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={goToChallenge}
            />
          ) : (
            <HtmlCssCodeChallenge
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
              onClick={() =>
                navigate(
                  courseFullyDone
                    ? `${BASE_PATH}#course-certificate`
                    : BASE_PATH,
                )
              }
            >
              Finish Course →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
