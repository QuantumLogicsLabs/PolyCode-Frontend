import React, { useState } from "react";

function InlineText({ text, codeClassName = "numpy-inline-code" }) {
  const parts = String(text ?? "").split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className={codeClassName}>
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

function QuizSlide({
  block,
  selected,
  answered,
  correct,
  retrying,
  onSelect,
  onRetry,
  variant = "numpy",
}) {
  const isNumpy = variant === "numpy";
  const questionClass = isNumpy ? "numpy-quiz-question" : "oops-interactive-head";
  const optionsClass = isNumpy ? "numpy-quiz-options" : "oops-quiz-options";
  const optionClass = isNumpy ? "numpy-quiz-option" : "oops-quiz-option";
  const feedbackClass = isNumpy ? "numpy-quiz-feedback" : "oops-quiz-feedback";

  return (
    <article
      className={`lesson-quiz-slide ${
        answered ? (correct ? "lesson-quiz-slide--correct" : "lesson-quiz-slide--wrong") : ""
      }`}
    >
      {isNumpy ? (
        <p className={questionClass}>
          <InlineText text={block.question} />
        </p>
      ) : (
        <div className={questionClass}>
          <h3>
            <InlineText text={block.question} codeClassName="oops-inline-code" />
          </h3>
        </div>
      )}
      <div className={optionsClass}>
        {block.options?.map((option, index) => {
          const isSelected = selected === index;
          const isAnswer = block.answer === index;
          return (
            <button
              key={`${index}-${String(option).slice(0, 24)}`}
              type="button"
              className={`${optionClass} ${
                answered && isAnswer ? "answer" : ""
              } ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(index)}
            >
              {isNumpy ? (
                <>
                  {String.fromCharCode(65 + index)}.{" "}
                  <InlineText text={option} />
                </>
              ) : (
                <>
                  <span>{String.fromCharCode(65 + index)}</span>
                  <InlineText text={option} codeClassName="oops-inline-code" />
                </>
              )}
            </button>
          );
        })}
      </div>
      {answered ? (
        <>
          <p className={feedbackClass}>
            <strong>{correct ? "Nice!" : "Not quite — that's okay."}</strong>{" "}
            <InlineText
              text={block.explanation}
              codeClassName={isNumpy ? "numpy-inline-code" : "oops-inline-code"}
            />
          </p>
          <div className="lesson-quiz-retry-row">
            <button type="button" className="lesson-quiz-retry" onClick={onRetry}>
              ↻ Solve again
            </button>
          </div>
        </>
      ) : null}
      {!answered && retrying ? (
        <p className="lesson-quiz-retry-hint">
          Give it another go — pick an answer.
        </p>
      ) : null}
    </article>
  );
}

/**
 * Carousel for lesson MCQs — one question visible at a time, with a score
 * summary once every question has been answered.
 *
 * Retries are tracked here rather than inside a slide so they survive
 * navigation between questions. A retry only clears the *on-screen* answer;
 * the recorded attempt stays put, so lesson progress and the read gate are
 * never rolled back.
 */
export default function LessonQuizSlider({
  quizzes = [],
  accentColor,
  getSelection,
  onQuizAnswer,
  variant = "numpy",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [retrying, setRetrying] = useState({});
  const [localSelections, setLocalSelections] = useState({});
  const total = quizzes.length;

  if (!total) return null;
  if (!quizzes[activeIndex]?.block?.options) return null;

  const slides = quizzes.map(({ block, quizIndex }, index) => {
    const key = String(quizIndex ?? index);
    const recorded = getSelection?.(quizIndex);
    const stored =
      recorded !== null && recorded !== undefined
        ? recorded
        : localSelections[key] ?? null;
    const isRetrying = Boolean(retrying[key]);
    const selected = isRetrying ? null : stored;
    return {
      key,
      index,
      block,
      quizIndex,
      selected,
      isRetrying,
      answered: selected !== null,
      correct: selected !== null && selected === block.answer,
    };
  });

  const answeredCount = slides.filter((slide) => slide.answered).length;
  const correctCount = slides.filter((slide) => slide.correct).length;
  const wrongCount = answeredCount - correctCount;
  const complete = answeredCount === total;
  const allCorrect = complete && wrongCount === 0;
  const current = slides[activeIndex];

  function handleSelect(slide, optionIndex) {
    setRetrying((prev) => {
      if (!prev[slide.key]) return prev;
      const next = { ...prev };
      delete next[slide.key];
      return next;
    });

    const isCorrect = optionIndex === slide.block.answer;
    if (
      typeof onQuizAnswer === "function" &&
      slide.quizIndex !== null &&
      slide.quizIndex !== undefined
    ) {
      onQuizAnswer(slide.quizIndex, optionIndex, isCorrect);
    } else {
      setLocalSelections((prev) => ({ ...prev, [slide.key]: optionIndex }));
    }
  }

  function handleRetry(slide) {
    setRetrying((prev) => ({ ...prev, [slide.key]: true }));
  }

  function startOver() {
    const all = {};
    slides.forEach((slide) => {
      all[slide.key] = true;
    });
    setRetrying(all);
    setActiveIndex(0);
  }

  function reviewMissed() {
    const firstWrong = slides.find((slide) => slide.answered && !slide.correct);
    if (firstWrong) setActiveIndex(firstWrong.index);
  }

  function goPrev() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function goNext() {
    setActiveIndex((index) => Math.min(total - 1, index + 1));
  }

  return (
    <section
      className={`lesson-quiz-slider lesson-quiz-slider--${variant}`}
      style={{ "--lesson-quiz-accent": accentColor }}
      aria-label="Lesson quick checks"
    >
      <div className="numpy-step-head lesson-quiz-slider-head">
        <span className="numpy-step-num" style={{ background: accentColor }}>
          ?
        </span>
        <span className="numpy-step-label">Quick check — no pressure!</span>
      </div>

      <div className="lesson-quiz-slider-meta">
        <span className="lesson-quiz-slider-count">
          Question {activeIndex + 1} of {total}
        </span>
        <span className="lesson-quiz-slider-progress">
          {answeredCount}/{total} answered
        </span>
      </div>

      <div className="lesson-quiz-slider-viewport">
        <QuizSlide
          key={current.key}
          block={current.block}
          selected={current.selected}
          answered={current.answered}
          correct={current.correct}
          retrying={current.isRetrying}
          onSelect={(optionIndex) => handleSelect(current, optionIndex)}
          onRetry={() => handleRetry(current)}
          variant={variant}
        />
      </div>

      {complete ? (
        <div
          className={`lesson-quiz-summary${
            allCorrect ? " lesson-quiz-summary--perfect" : ""
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="lesson-quiz-summary-head">
            <span className="lesson-quiz-summary-badge" aria-hidden>
              {allCorrect ? "🎉" : "✅"}
            </span>
            <div className="lesson-quiz-summary-text">
              <strong>
                {allCorrect
                  ? "Perfect — every answer correct!"
                  : "Quick check complete"}
              </strong>
              <p>
                {correctCount} correct
                {wrongCount > 0 ? ` · ${wrongCount} to review` : ""} out of{" "}
                {total}
              </p>
            </div>
            <span className="lesson-quiz-summary-score">
              {correctCount}
              <small>/{total}</small>
            </span>
          </div>

          <div className="lesson-quiz-summary-bar" aria-hidden>
            <span style={{ width: `${(correctCount / total) * 100}%` }} />
          </div>

          <div className="lesson-quiz-summary-actions">
            {wrongCount > 0 ? (
              <button
                type="button"
                className="lesson-quiz-summary-btn"
                onClick={reviewMissed}
              >
                Review what I missed
              </button>
            ) : null}
            <button
              type="button"
              className="lesson-quiz-summary-btn"
              onClick={startOver}
            >
              ↻ Start over
            </button>
          </div>
        </div>
      ) : null}

      <div className="lesson-quiz-slider-controls">
        <button
          type="button"
          className="lesson-quiz-slider-nav"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous question"
        >
          ← Prev
        </button>

        <div className="lesson-quiz-slider-dots" role="tablist" aria-label="Questions">
          {slides.map((slide) => (
            <button
              key={slide.key}
              type="button"
              role="tab"
              aria-selected={slide.index === activeIndex}
              aria-label={`Question ${slide.index + 1}${
                slide.answered ? (slide.correct ? ", correct" : ", incorrect") : ""
              }`}
              className={`lesson-quiz-slider-dot${
                slide.index === activeIndex ? " lesson-quiz-slider-dot--active" : ""
              }${slide.answered ? " lesson-quiz-slider-dot--done" : ""}${
                slide.answered
                  ? slide.correct
                    ? " lesson-quiz-slider-dot--right"
                    : " lesson-quiz-slider-dot--wrong"
                  : ""
              }`}
              onClick={() => setActiveIndex(slide.index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="lesson-quiz-slider-nav"
          onClick={goNext}
          disabled={activeIndex === total - 1}
          aria-label="Next question"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
