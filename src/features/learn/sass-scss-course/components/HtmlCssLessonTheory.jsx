import React from "react";
import { AlertTriangle, Info, Lightbulb, Sparkles } from "lucide-react";
import RunnableCodeBlock from "../../shared/RunnableCodeBlock";
import LessonReadGate from "../../shared/LessonReadGate";
import LessonQuizSlider from "../../shared/LessonQuizSlider";
import LessonTopicOverview from "../../shared/LessonTopicOverview";
import { lessonUsesW3Overview } from "../../shared/buildAutoW3TopicOverview";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { mapTheoryWithQuizIndices } from "../../shared/lessonQuizUtils";
import useLessonQuizAttempts from "../../shared/useLessonQuizAttempts";

// This renders HTML/CSS lesson theory using the same shared, language-agnostic
// building blocks as the other courses (topic overview card, step cards,
// quiz slider, read gate) so every course looks and behaves consistently.

const CALLOUT_ICONS = {
  info: Info,
  tip: Sparkles,
  warning: AlertTriangle,
};

function InlineText({ text }) {
  const parts = String(text ?? "").split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="oops-inline-code">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

function HtmlCssTheoryBlock({ block, step, accentColor }) {
  if (block.type === "text") {
    return (
      <article className="numpy-step-card">
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            {step}
          </span>
          <span className="numpy-step-label">In simple words</span>
        </div>
        <p className="numpy-step-text">
          <InlineText text={block.content} />
        </p>
      </article>
    );
  }

  if (block.type === "code") {
    return (
      <div className="numpy-step-code">
        <RunnableCodeBlock
          block={block}
          accentColor={accentColor}
          language={block.lang || "html"}
        />
      </div>
    );
  }

  if (block.type === "callout") {
    const labels = {
      info: "Good to know",
      tip: "Helpful tip",
      warning: "Watch out",
    };
    const Icon = CALLOUT_ICONS[block.variant] || Lightbulb;
    return (
      <aside className={`numpy-tip-box numpy-tip-${block.variant}`}>
        <span className="numpy-tip-icon" aria-hidden="true">
          <Icon size={15} strokeWidth={2.25} />
        </span>
        <div>
          <strong>{labels[block.variant] || "Note"}</strong>
          <p>
            <InlineText text={block.content} />
          </p>
        </div>
      </aside>
    );
  }

  if (block.type === "diagram") {
    return (
      <article className="numpy-step-card numpy-diagram-card">
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            {step}
          </span>
          <span className="numpy-step-label">{block.title}</span>
        </div>
        <div className="numpy-diagram-grid">
          {(block.nodes || []).map((node) => (
            <div
              key={node.id}
              className="numpy-diagram-item"
              style={{ "--node-color": node.color || accentColor }}
            >
              <h4>{node.label}</h4>
              <ul>
                {(node.items || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
    );
  }

  return null;
}

export default function HtmlCssLessonTheory({
  lesson,
  quizStoragePrefix,
  confidence,
  onConfidenceChange,
  markedAsRead = false,
  onMarkAsRead = () => {},
  onGoChallenge,
  accentColor: accentColorProp,
  autoW3 = true,
}) {
  const {
    preparedLesson,
    quizCount,
    attemptedCount,
    recordAttempt,
    getSelection,
  } = useLessonQuizAttempts(quizStoragePrefix, lesson?.id, lesson);

  if (!lesson) return null;

  const activeLesson = preparedLesson || lesson;
  const accentColor = accentColorProp || activeLesson?.chapterColor || LEARN_ACCENT;
  const theoryBlocks = activeLesson.theory || [];
  const theoryWithQuizMeta = mapTheoryWithQuizIndices(theoryBlocks);
  const quizSlides = theoryWithQuizMeta
    .filter(({ block }) => block.type === "quiz")
    .map(({ block, quizIndex }) => ({ block, quizIndex }));
  const hasW3Overview = lessonUsesW3Overview(activeLesson, autoW3);
  let stepCounter = 0;
  let quizSliderRendered = false;

  return (
    <div className="numpy-intro-theory">
      <LessonTopicOverview
        lesson={activeLesson}
        accentColor={accentColor}
        variant="oops"
        autoW3={autoW3}
      />

      <div className="numpy-learn-path">
        <div className="numpy-path-label">
          <span>{hasW3Overview ? "Tutorial" : "Your learning path"}</span>
          <small>
            {hasW3Overview
              ? "Read each section, run the examples, then try the challenge"
              : "Read the idea, then run the code right below it"}
          </small>
        </div>

        {theoryWithQuizMeta.map(({ block, theoryIndex, quizIndex }) => {
          if (block.type === "quiz") {
            if (quizSliderRendered) return null;
            quizSliderRendered = true;
            return (
              <LessonQuizSlider
                key={`quiz-slider-${theoryIndex}`}
                quizzes={quizSlides}
                accentColor={accentColor}
                getSelection={getSelection}
                onQuizAnswer={recordAttempt}
                variant="oops"
              />
            );
          }

          stepCounter += 1;

          return (
            <HtmlCssTheoryBlock
              key={`${block.type}-${theoryIndex}`}
              block={block}
              step={stepCounter}
              accentColor={accentColor}
            />
          );
        })}
      </div>

      <LessonReadGate
        markedAsRead={markedAsRead}
        onMarkAsRead={onMarkAsRead}
        confidence={confidence}
        onConfidenceChange={onConfidenceChange}
        onGoChallenge={onGoChallenge}
        accentColor={accentColor}
        quizzesRequired={quizStoragePrefix ? quizCount : 0}
        quizzesAttempted={attemptedCount}
      />
    </div>
  );
}
