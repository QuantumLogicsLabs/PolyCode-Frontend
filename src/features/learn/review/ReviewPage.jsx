import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { InlineText } from "../shared/LessonQuizSlider";
import { networkErrorMessage } from "../../../lib/apiClient";
import {
  answerReview,
  dismissReview,
  getDueReviews,
  notifyReviewChanged,
} from "./reviewApi";
import { REVIEW_COURSE_IDS } from "./reviewCourseIds";
import { REVIEW_COURSES, resolveReviewItem } from "./reviewCourses";
import "./review.css";

function ReviewCard({ entry, result, onAnswer, onNext, isLast }) {
  const { block } = entry;
  const answered = result !== undefined;
  return (
    <article
      className={`lesson-quiz-slide review-card ${
        answered ? (result.correct ? "lesson-quiz-slide--correct" : "lesson-quiz-slide--wrong") : ""
      }`}
    >
      <p className="review-card-source">
        {entry.courseTitle} · {entry.lessonTitle}
      </p>
      <p className="numpy-quiz-question">
        <InlineText text={block.question} />
      </p>
      <div className="numpy-quiz-options">
        {block.options.map((option, index) => (
          <button
            key={`${index}-${String(option).slice(0, 24)}`}
            type="button"
            className={`numpy-quiz-option ${answered && block.answer === index ? "answer" : ""} ${
              answered && result.selected === index ? "selected" : ""
            }`}
            onClick={() => onAnswer(index)}
            disabled={answered}
          >
            {String.fromCharCode(65 + index)}. <InlineText text={option} />
          </button>
        ))}
      </div>
      {answered ? (
        <>
          <p className="numpy-quiz-feedback" role="status">
            <strong>
              {result.correct
                ? "Got it this time! It's off your list."
                : "Not quite yet. It will come back in 7 days."}
            </strong>{" "}
            <InlineText text={block.explanation} />
          </p>
          {result.error ? <p className="review-error">{result.error}</p> : null}
          <div className="review-card-actions">
            <Link to={entry.lessonPath} className="review-link">
              Re-read the lesson
            </Link>
            <button type="button" className="lesson-quiz-summary-btn" onClick={onNext}>
              {isLast ? "Finish" : "Next question →"}
            </button>
          </div>
        </>
      ) : null}
    </article>
  );
}

export default function ReviewPage() {
  const { token, isAuthenticated } = useAuth();
  const [entries, setEntries] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [position, setPosition] = useState(0);
  const [results, setResults] = useState({});

  useEffect(() => {
    if (!isAuthenticated || !token) return undefined;
    let cancelled = false;
    getDueReviews(token, REVIEW_COURSE_IDS)
      .then((items) => {
        if (cancelled) return;
        const resolved = [];
        const stale = [];
        items.forEach((item) => {
          const entry = resolveReviewItem(item);
          if (entry) resolved.push(entry);
          else stale.push(item);
        });
        setEntries(resolved);
        // The question changed or was removed: drop it so the count matches.
        if (stale.length) {
          Promise.allSettled(stale.map((item) => dismissReview(token, item.id))).then(
            notifyReviewChanged,
          );
        }
      })
      .catch((error) => {
        if (!cancelled) setLoadError(networkErrorMessage(error));
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token]);

  const courseOptions = useMemo(() => {
    const present = new Set((entries || []).map((entry) => entry.item.courseId));
    return REVIEW_COURSES.filter((course) => present.has(course.courseId));
  }, [entries]);

  const queue = useMemo(
    () =>
      (entries || []).filter(
        (entry) => !courseFilter || entry.item.courseId === courseFilter,
      ),
    [entries, courseFilter],
  );

  function handleFilterChange(event) {
    setCourseFilter(event.target.value);
    setPosition(0);
  }

  function handleAnswer(entry, selected) {
    const id = entry.item.id;
    if (results[id]) return;
    const correct = selected === entry.block.answer;
    setResults((prev) => ({ ...prev, [id]: { selected, correct } }));
    answerReview(token, id, correct)
      .then(notifyReviewChanged)
      .catch((error) => {
        setResults((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            error: `${networkErrorMessage(error)} It stays on your list for now.`,
          },
        }));
      });
  }

  if (!isAuthenticated) {
    return (
      <main className="review-page">
        <h1>Review my mistakes</h1>
        <p className="review-intro">
          Sign in to see the questions you got wrong, so you can try them again.
        </p>
        <Link to="/login" className="lesson-quiz-summary-btn review-link-btn">
          Sign in
        </Link>
      </main>
    );
  }

  const answeredHere = queue.filter((entry) => results[entry.item.id]);
  const rightHere = answeredHere.filter((entry) => results[entry.item.id].correct);
  const done = entries && position >= queue.length;
  const current = queue[position];

  return (
    <main className="review-page">
      <header className="review-head">
        <div>
          <h1>Review my mistakes</h1>
          <p className="review-intro">
            Questions you got wrong come back 7 days later. Get one right and
            it&apos;s off your list. Your lesson scores don&apos;t change.
          </p>
        </div>
        {courseOptions.length > 1 ? (
          <label className="review-filter">
            <span>Course</span>
            <select value={courseFilter} onChange={handleFilterChange}>
              <option value="">All courses</option>
              {courseOptions.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </header>

      {loadError ? <p className="review-error">{loadError}</p> : null}
      {!entries && !loadError ? <p className="review-intro">Loading your questions…</p> : null}

      {entries && queue.length === 0 ? (
        <section className="lesson-quiz-summary lesson-quiz-summary--perfect review-empty">
          <strong>Nothing to review today 🎉</strong>
          <p>
            When you get a lesson question wrong, it will show up here 7 days
            later.
          </p>
        </section>
      ) : null}

      {current ? (
        <section className="lesson-quiz-slider" aria-label="Review questions">
          <div className="lesson-quiz-slider-meta">
            <span className="lesson-quiz-slider-count">
              Question {position + 1} of {queue.length}
            </span>
          </div>
          <ReviewCard
            key={current.item.id}
            entry={current}
            result={results[current.item.id]}
            onAnswer={(selected) => handleAnswer(current, selected)}
            onNext={() => setPosition((value) => value + 1)}
            isLast={position === queue.length - 1}
          />
        </section>
      ) : null}

      {done && queue.length > 0 ? (
        <section className="lesson-quiz-summary review-empty" role="status">
          <strong>Review done for today</strong>
          <p>
            {rightHere.length} of {answeredHere.length} right.
            {answeredHere.length > rightHere.length
              ? " The others will come back in 7 days."
              : ""}
          </p>
        </section>
      ) : null}
    </main>
  );
}
