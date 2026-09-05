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
  quizIndex,
  accentColor,
  quizSelection,
  onQuizAnswer,
  variant = "numpy",
}) {
  const [localSelection, setLocalSelection] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const storedSelection =
    quizSelection !== null && quizSelection !== undefined
      ? quizSelection
      : localSelection;
  const selected = retrying ? null : storedSelection;
  const answered = selected !== null;
  const correct = selected === block.answer;
  const isNumpy = variant === "numpy";
  const questionClass = isNumpy ? "numpy-quiz-question" : "oops-interactive-head";
  const optionsClass = isNumpy ? "numpy-quiz-options" : "oops-quiz-options";
  const optionClass = isNumpy ? "numpy-quiz-option" : "oops-quiz-option";
  const feedbackClass = isNumpy ? "numpy-quiz-feedback" : "oops-quiz-feedback";

  function handleSelect(index) {
    const isCorrect = index === block.answer;
    setRetrying(false);
    if (typeof onQuizAnswer === "function" && quizIndex !== null) {
      onQuizAnswer(quizIndex, index, isCorrect);
    } else {
      setLocalSelection(index);
    }
  }

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
              onClick={() => handleSelect(index)}
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
            <button
              type="button"
              className="lesson-quiz-retry"
              onClick={() => setRetrying(true)}
            >
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
 * Carousel for lesson MCQs — one question visible at a time.
 */
export default function LessonQuizSlider({
  quizzes = [],
  accentColor,
  getSelection,
  onQuizAnswer,
  variant = "numpy",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = quizzes.length;

  if (!total) return null;
  if (!quizzes[activeIndex]?.block?.options) return null;

  const current = quizzes[activeIndex];
  const attemptedCount = quizzes.filter(
    ({ quizIndex }) => getSelection?.(quizIndex) !== null,
  ).length;

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
          {attemptedCount}/{total} answered
        </span>
      </div>

      <div className="lesson-quiz-slider-viewport">
        <QuizSlide
          key={current.quizIndex ?? activeIndex}
          block={current.block}
          quizIndex={current.quizIndex}
          accentColor={accentColor}
          quizSelection={getSelection?.(current.quizIndex) ?? null}
          onQuizAnswer={onQuizAnswer}
          variant={variant}
        />
      </div>

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
          {quizzes.map(({ quizIndex }, index) => {
            const attempted = getSelection?.(quizIndex) !== null;
            return (
              <button
                key={quizIndex ?? index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Question ${index + 1}${attempted ? ", answered" : ""}`}
                className={`lesson-quiz-slider-dot${
                  index === activeIndex ? " lesson-quiz-slider-dot--active" : ""
                }${attempted ? " lesson-quiz-slider-dot--done" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            );
          })}
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
