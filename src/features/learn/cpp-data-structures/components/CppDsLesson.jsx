import React from "react";
import LessonQuizSlider from "../../shared/LessonQuizSlider";
import LessonReadGate from "../../shared/LessonReadGate";
import useLessonQuizAttempts from "../../shared/useLessonQuizAttempts";
import { mapTheoryWithQuizIndices } from "../../shared/lessonQuizUtils";
import CppDsCodeBlock from "./CppDsCodeBlock";
import "./cppds-lesson.css";

const ACCENT = "#8b5cf6";

const NOTE_META = {
  info: ["ℹ️", "Good to know"],
  tip: ["💡", "Handy tip"],
  warning: ["⚠️", "Watch out"],
  success: ["✅", "You've got this"],
};

/** Inline **bold** and `code` inside a run of text. */
function Inline({ text }) {
  const parts = String(text ?? "").split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="cppds-code-inline">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

/** Paragraphs (blank-line separated) and bullet lists (every line starts - / * / •). */
function Prose({ text }) {
  const paragraphs = String(text ?? "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!paragraphs.length) return null;

  return (
    <div className="cppds-prose">
      {paragraphs.map((paragraph, index) => {
        const lines = paragraph
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        const isList =
          lines.length > 0 && lines.every((line) => /^[-*•]\s+/.test(line));

        if (isList) {
          return (
            <ul key={index}>
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>
                  <Inline text={line.replace(/^[-*•]\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index}>
            <Inline text={lines.join(" ")} />
          </p>
        );
      })}
    </div>
  );
}

function Step({ n, children }) {
  return (
    <div className="cppds-step">
      <span className="cppds-step-num">{n}</span>
      <div className="cppds-step-body">{children}</div>
    </div>
  );
}

function Block({ block, step }) {
  switch (block.type) {
    case "text":
      return (
        <Step n={step}>
          <Prose text={block.content} />
          {block.code ? (
            <CppDsCodeBlock
              code={block.code.content}
              label={block.code.label}
              output={block.code.output}
            />
          ) : null}
        </Step>
      );

    case "code":
      return (
        <Step n={step}>
          <CppDsCodeBlock
            code={block.content}
            label={block.label}
            output={block.output}
          />
        </Step>
      );

    case "callout": {
      const [icon, label] = NOTE_META[block.variant] || NOTE_META.info;
      return (
        <div className={`cppds-note cppds-note--${block.variant || "info"}`}>
          <span className="cppds-note-icon" aria-hidden>
            {icon}
          </span>
          <div>
            <strong>{label}</strong>
            <p>
              <Inline text={block.content} />
            </p>
          </div>
        </div>
      );
    }

    case "diagram":
      return (
        <Step n={step}>
          <div className="cppds-figure-title">{block.title}</div>
          <div className="cppds-cards">
            {(block.nodes || []).map((node) => (
              <div
                key={node.id}
                className="cppds-card"
                style={{ "--card-color": node.color || ACCENT }}
              >
                <h4>
                  <Inline text={node.label} />
                </h4>
                <ul>
                  {(node.items || []).map((item, index) => (
                    <li key={index}>
                      <Inline text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Step>
      );

    case "table":
      return (
        <Step n={step}>
          <div className="cppds-table-wrap">
            <table className="cppds-table">
              <caption>{block.title}</caption>
              <thead>
                <tr>
                  <th>{block.rowLabelHeader || ""}</th>
                  {(block.columns || []).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(block.rows || []).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      block.highlightRows?.includes(rowIndex)
                        ? "cppds-row-hl"
                        : ""
                    }
                  >
                    <th>{row.label}</th>
                    {(row.values || []).map((value, valueIndex) => (
                      <td key={valueIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.footnote ? (
            <p className="cppds-fignote">
              <Inline text={block.footnote} />
            </p>
          ) : null}
        </Step>
      );

    case "array":
      return (
        <Step n={step}>
          <div className="cppds-figure-title">{block.title}</div>
          {(block.rows || []).map((row, rowIndex) => {
            const ok = new Set(row.okIndexes || []);
            const miss = new Set(row.missingIndexes || []);
            return (
              <div className="cppds-cells" key={rowIndex}>
                {row.label ? (
                  <span className="cppds-cells-label">{row.label}</span>
                ) : null}
                {(row.values || []).map((value, valueIndex) => (
                  <span
                    key={valueIndex}
                    className={`cppds-cell${ok.has(valueIndex) ? " cppds-cell--ok" : ""}${
                      miss.has(valueIndex) ? " cppds-cell--miss" : ""
                    }`}
                  >
                    {row.colLabels?.[valueIndex] != null ? (
                      <small>{row.colLabels[valueIndex]}</small>
                    ) : null}
                    {value}
                  </span>
                ))}
              </div>
            );
          })}
          {block.footnote ? (
            <p className="cppds-fignote">
              <Inline text={block.footnote} />
            </p>
          ) : null}
        </Step>
      );

    default:
      return null;
  }
}

/**
 * Bespoke theory renderer for the C++ Data Structures course. Same block
 * vocabulary as the shared renderer, but a calmer, article-style layout and
 * a friendlier code panel. Only the hand-written quizzes are shown (no
 * auto-generated filler), and the read gate asks for exactly those.
 */
export default function CppDsLesson({
  lesson,
  quizStoragePrefix,
  confidence,
  onConfidenceChange,
  markedAsRead = false,
  onMarkAsRead = () => {},
  onGoChallenge,
}) {
  const { recordAttempt, getSelection } = useLessonQuizAttempts(
    quizStoragePrefix,
    lesson?.id,
    lesson,
  );

  const theory = lesson?.theory || [];
  const objectivesBlock = theory.find((block) => block.type === "objectives");
  const leadBlock = theory.find(
    (block) => block.type === "text" && !block.code && block.content,
  );
  const bodyBlocks = theory.filter(
    (block) => block !== objectivesBlock && block !== leadBlock,
  );

  const mapped = mapTheoryWithQuizIndices(bodyBlocks);
  const quizSlides = mapped
    .filter(({ block }) => block.type === "quiz")
    .map(({ block, quizIndex }) => ({ block, quizIndex }));
  const quizCount = quizSlides.length;
  const attemptedCount = quizSlides.filter(
    ({ quizIndex }) => getSelection(quizIndex) != null,
  ).length;

  let step = 0;
  let quizRendered = false;

  return (
    <div className="cppds-lesson">
      <header className="cppds-hero">
        <span className="cppds-kicker">{lesson.chapterTitle}</span>
        <h2 className="cppds-title" id="numpy-lesson-heading">
          {lesson.title}
        </h2>
        {leadBlock ? (
          <div className="cppds-lead">
            <Prose text={leadBlock.content} />
          </div>
        ) : null}
      </header>

      {objectivesBlock?.items?.length ? (
        <div className="cppds-goals">
          <h3>
            <span aria-hidden>🎯</span> By the end of this lesson you can…
          </h3>
          <ul>
            {objectivesBlock.items.map((item, index) => (
              <li key={index}>
                <Inline text={item} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="cppds-flow">
        {mapped.map(({ block, theoryIndex }) => {
          if (block.type === "quiz") {
            if (quizRendered) return null;
            quizRendered = true;
            return (
              <LessonQuizSlider
                key="cppds-quiz"
                quizzes={quizSlides}
                accentColor={ACCENT}
                getSelection={getSelection}
                onQuizAnswer={recordAttempt}
              />
            );
          }
          const needsStep = [
            "text",
            "code",
            "diagram",
            "table",
            "array",
          ].includes(block.type);
          const n = needsStep ? ++step : step;
          return <Block key={theoryIndex} block={block} step={n} />;
        })}
      </div>

      <LessonReadGate
        markedAsRead={markedAsRead}
        onMarkAsRead={onMarkAsRead}
        confidence={confidence}
        onConfidenceChange={onConfidenceChange}
        onGoChallenge={onGoChallenge}
        accentColor={ACCENT}
        quizzesRequired={quizStoragePrefix ? quizCount : 0}
        quizzesAttempted={attemptedCount}
      />
    </div>
  );
}
