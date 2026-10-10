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
            <code key={index} className="numpy-inline-code">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

/** Renders theory copy with paragraphs and bullet lists (• / - / *). */
function FormattedTheoryText({ text, className = "numpy-step-text" }) {
  const paragraphs = String(text ?? "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!paragraphs.length) return null;

  return (
    <div className={`numpy-formatted-text${className ? ` ${className}` : ""}`}>
      {paragraphs.map((paragraph, index) => {
        const lines = paragraph
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        const isList =
          lines.length > 0 && lines.every((line) => /^[•\-*]\s+/.test(line));

        if (isList) {
          return (
            <ul key={index} className="numpy-theory-bullets">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>
                  <InlineText text={line.replace(/^[•\-*]\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="numpy-theory-paragraph">
            <InlineText text={lines.join(" ")} />
          </p>
        );
      })}
    </div>
  );
}

function NumpyMatrixGrid({
  label,
  data = [],
  accentColor,
  rowLabels,
  colLabels,
  footnote,
}) {
  const colCount = Math.max(...data.map((row) => row.length), 1);
  const hasRowLabels = Array.isArray(rowLabels) && rowLabels.length > 0;
  const hasColLabels = Array.isArray(colLabels) && colLabels.length > 0;

  return (
    <div className="numpy-matrix-panel">
      <span className="numpy-matrix-label" style={{ color: accentColor }}>
        {label}
      </span>
      <div className="numpy-matrix-table">
        {hasColLabels ? (
          <div
            className="numpy-matrix-col-labels"
            style={{
              gridTemplateColumns: `${hasRowLabels ? "52px " : ""}repeat(${colCount}, minmax(44px, 1fr))`,
            }}
          >
            {hasRowLabels ? <span className="numpy-matrix-corner" /> : null}
            {colLabels.map((colLabel) => (
              <span key={colLabel} className="numpy-matrix-col-label">
                {colLabel}
              </span>
            ))}
          </div>
        ) : null}
        {data.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="numpy-matrix-data-row"
            style={{
              gridTemplateColumns: `${hasRowLabels ? "52px " : ""}repeat(${colCount}, minmax(44px, 1fr))`,
            }}
          >
            {hasRowLabels ? (
              <span className="numpy-matrix-row-label">
                {rowLabels[rowIndex]}
              </span>
            ) : null}
            {row.map((cell, colIndex) => (
              <span
                key={`${rowIndex}-${colIndex}`}
                className="numpy-matrix-cell"
                style={{
                  borderColor: `${accentColor}55`,
                  background: `${accentColor}12`,
                }}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
      {footnote ? (
        <p className="numpy-matrix-footnote">
          <InlineText text={footnote} />
        </p>
      ) : null}
    </div>
  );
}

function NumpyMatrixOpVisual({ block, accentColor }) {
  const leftAccent = block.leftAccent || accentColor;
  const rightAccent = block.rightAccent || "#f472b6";
  const resultAccent = block.resultAccent || "#db2777";

  return (
    <div className="numpy-matrix-op-wrap">
      <div className="numpy-matrix-op-row">
        <NumpyMatrixGrid
          label={block.left.label}
          data={block.left.data}
          accentColor={leftAccent}
          rowLabels={block.left.rowLabels}
          colLabels={block.left.colLabels}
          footnote={block.left.footnote}
        />
        <span className="numpy-matrix-operator" style={{ color: accentColor }}>
          {block.operator || "@"}
        </span>
        <NumpyMatrixGrid
          label={block.right.label}
          data={block.right.data}
          accentColor={rightAccent}
          rowLabels={block.right.rowLabels}
          colLabels={block.right.colLabels}
          footnote={block.right.footnote}
        />
        {block.result ? (
          <>
            <span
              className="numpy-matrix-operator"
              style={{ color: accentColor }}
            >
              =
            </span>
            <NumpyMatrixGrid
              label={block.result.label}
              data={block.result.data}
              accentColor={resultAccent}
              rowLabels={block.result.rowLabels}
              colLabels={block.result.colLabels}
              footnote={block.result.footnote}
            />
          </>
        ) : null}
      </div>
      {block.caption ? (
        <p className="numpy-matrix-caption">
          <InlineText text={block.caption} />
        </p>
      ) : null}
      {block.steps?.length > 0 ? (
        <div className="numpy-matrix-steps">
          <p className="numpy-matrix-steps-title">
            How every result cell is built
          </p>
          <div className="numpy-matrix-steps-grid">
            {block.steps.map((step) => (
              <div key={step.position} className="numpy-matrix-step-card">
                <span className="numpy-matrix-step-pos">{step.position}</span>
                <p className="numpy-matrix-step-line">
                  <strong>Row from A:</strong> {step.row}
                </p>
                <p className="numpy-matrix-step-line">
                  <strong>Col from B:</strong> {step.col}
                </p>
                <p className="numpy-matrix-step-formula">
                  {step.formula} = <strong>{step.value}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NumpyArrayVisual({ block, accentColor }) {
  const accent = block.accentColor || accentColor;
  const missingAccent = block.missingAccent || "#f43f5e";
  const okAccent = block.okAccent || "#22c55e";
  const rows = block.rows?.length
    ? block.rows
    : [
        {
          label: block.label,
          values: block.values || [],
          colLabels: block.colLabels,
          missingIndexes: block.missingIndexes,
          okIndexes: block.okIndexes,
        },
      ];

  return (
    <div className="numpy-array-visual-wrap">
      {rows.map((row, rowIndex) => {
        const missing = new Set(row.missingIndexes || []);
        const ok = new Set(row.okIndexes || []);
        const colCount = row.values.length;
        const isCompact = Boolean(row.label) && colCount === 1;
        const valueColumns =
          colCount > 8
            ? `repeat(${colCount}, minmax(40px, 56px))`
            : `repeat(${colCount}, minmax(56px, 88px))`;
        const gridTemplateColumns = row.label
          ? `72px ${valueColumns}`
          : valueColumns;

        if (isCompact) {
          const value = row.values[0];
          const isMissing = missing.has(0);
          const isOk = ok.has(0);
          const cellAccent = isMissing
            ? missingAccent
            : isOk
              ? okAccent
              : accent;

          return (
            <div
              key={`${row.label}-${rowIndex}`}
              className="numpy-array-row-block numpy-array-row-compact"
            >
              <div className="numpy-array-compact-row">
                <span className="numpy-array-row-label">{row.label}</span>
                <div className="numpy-array-value-col">
                  {row.colLabels?.[0] ? (
                    <span className="numpy-array-col-label">
                      {row.colLabels[0]}
                    </span>
                  ) : null}
                  <span
                    className={`numpy-array-cell${isMissing ? " numpy-array-cell-missing" : ""}${isOk ? " numpy-array-cell-ok" : ""}`}
                    style={{
                      borderColor: `${cellAccent}66`,
                      background: `${cellAccent}18`,
                      color: isMissing ? missingAccent : undefined,
                    }}
                  >
                    {value}
                  </span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={`${row.label}-${rowIndex}`}
            className={`numpy-array-row-block${colCount > 8 ? " numpy-array-row-block-wide" : ""}`}
          >
            <div className="numpy-array-scroll">
              {row.colLabels?.length > 0 ? (
                <div
                  className="numpy-array-col-labels"
                  style={{ gridTemplateColumns }}
                >
                  {row.label ? <span className="numpy-array-corner" /> : null}
                  {row.colLabels.map((colLabel) => (
                    <span key={colLabel} className="numpy-array-col-label">
                      {colLabel}
                    </span>
                  ))}
                </div>
              ) : null}
              <div
                className="numpy-array-data-row"
                style={{ gridTemplateColumns }}
              >
                {row.label ? (
                  <span className="numpy-array-row-label">{row.label}</span>
                ) : null}
                {row.values.map((value, index) => {
                  const isMissing = missing.has(index);
                  const isOk = ok.has(index);
                  const cellAccent = isMissing
                    ? missingAccent
                    : isOk
                      ? okAccent
                      : accent;

                  return (
                    <span
                      key={`${row.label}-${index}`}
                      className={`numpy-array-cell${isMissing ? " numpy-array-cell-missing" : ""}${isOk ? " numpy-array-cell-ok" : ""}`}
                      style={{
                        borderColor: `${cellAccent}66`,
                        background: `${cellAccent}18`,
                        color: isMissing ? missingAccent : undefined,
                      }}
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      {block.footnote ? (
        <p className="numpy-array-footnote">
          <InlineText text={block.footnote} />
        </p>
      ) : null}
    </div>
  );
}

function NumpyVisualTable({ block }) {
  const rowAccent = block.rowAccent || "#a855f7";
  const colAccent = block.colAccent || "#6366f1";
  const hasTotals =
    Array.isArray(block.rowTotals) && Array.isArray(block.colTotals);
  const showTotals = block.showTotals !== false && hasTotals;

  return (
    <div className="numpy-visual-table-wrap">
      <table className="numpy-visual-table">
        <thead>
          <tr>
            <th className="numpy-vt-corner">
              {block.rowLabelHeader || ""}
            </th>
            {block.columns.map((col) => (
              <th key={col} className="numpy-vt-col-head">
                {col}
              </th>
            ))}
            {showTotals ? (
              <th
                className="numpy-vt-row-total-head"
                style={{ color: rowAccent }}
              >
                {block.rowTotalHeader || "Total"}
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr
              key={row.label || rowIndex}
              className={block.highlightRows?.includes(rowIndex) ? "numpy-vt-row-highlight" : ""}
            >
              <th className="numpy-vt-row-head">{row.label}</th>
              {(row.values || []).map((value, colIndex) => (
                <td key={`${row.label}-${colIndex}`} className="numpy-vt-cell">
                  {value}
                </td>
              ))}
              {showTotals ? (
                <td
                  className="numpy-vt-row-total"
                  style={{
                    background: `${rowAccent}22`,
                    borderColor: `${rowAccent}55`,
                  }}
                >
                  {block.rowTotals[rowIndex]}
                </td>
              ) : null}
            </tr>
          ))}
          {showTotals ? (
            <tr className="numpy-vt-col-total-row">
              <th
                className="numpy-vt-col-total-head"
                style={{ color: colAccent }}
              >
                {block.colTotalHeader || "Total"}
              </th>
              {block.colTotals.map((total, colIndex) => (
                <td
                  key={`col-total-${colIndex}`}
                  className="numpy-vt-col-total"
                  style={{
                    background: `${colAccent}22`,
                    borderColor: `${colAccent}55`,
                  }}
                >
                  {total}
                </td>
              ))}
              <td className="numpy-vt-corner-total" />
            </tr>
          ) : null}
        </tbody>
      </table>
      {showTotals ? (
        <div className="numpy-vt-legend">
          <span className="numpy-vt-legend-item" style={{ color: rowAccent }}>
            <span
              className="numpy-vt-legend-swatch"
              style={{ background: rowAccent }}
            />
            {block.rowTotalLabel || "axis=1 → add across each row"}
          </span>
          <span className="numpy-vt-legend-item" style={{ color: colAccent }}>
            <span
              className="numpy-vt-legend-swatch"
              style={{ background: colAccent }}
            />
            {block.colTotalLabel || "axis=0 ↓ add down each column"}
          </span>
        </div>
      ) : null}
      {block.footnote ? (
        <p className="numpy-vt-footnote">
          <InlineText text={block.footnote} />
        </p>
      ) : null}
    </div>
  );
}

function NumpyTheoryBlock({ block, step, accentColor }) {

  if (block.type === "text") {
    return (
      <article
        className={`numpy-step-card ${block.code ? "numpy-concept-card" : ""}`}
      >
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            {step}
          </span>
          <span className="numpy-step-label">
            {block.code ? "Learn & try" : "In simple words"}
          </span>
        </div>
        <FormattedTheoryText text={block.content} className="numpy-step-text" />
        {block.code && (
          <div className="numpy-concept-code">
            {block.code.label && (
              <p className="numpy-code-caption">{block.code.label}</p>
            )}
            <RunnableCodeBlock
              block={block.code}
              accentColor={accentColor}
              language={block.code.lang || "python"}
            />
          </div>
        )}
      </article>
    );
  }

  if (block.type === "objectives") {
    return (
      <aside
        className="lesson-objectives"
        style={{ "--lesson-accent": accentColor }}
      >
        <span className="lesson-objectives-icon" aria-hidden>
          🎯
        </span>
        <div>
          <strong>After this lesson you can…</strong>
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <InlineText text={item} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }

  if (block.type === "scenario") {
    return (
      <aside
        className="lesson-scenario"
        style={{ "--lesson-accent": accentColor }}
      >
        <span className="lesson-scenario-icon" aria-hidden>
          📋
        </span>
        <div>
          <strong>{block.title || "Real scenario"}</strong>
          <p>
            <InlineText text={block.content} />
          </p>
        </div>
      </aside>
    );
  }

  if (block.type === "callout") {
    const labels = {
      info: "Good to know",
      tip: "Helpful tip",
      warning: "Watch out",
      success: "Learning outcome check",
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

  if (block.type === "code") {
    return (
      <div className="numpy-step-code">
        <RunnableCodeBlock
          block={block}
          accentColor={accentColor}
          language={block.lang || "python"}
        />
      </div>
    );
  }

  if (block.type === "array") {
    return (
      <article className="numpy-step-card numpy-array-card">
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            {step}
          </span>
          <span className="numpy-step-label">{block.title}</span>
        </div>
        <NumpyArrayVisual block={block} accentColor={accentColor} />
      </article>
    );
  }

  if (block.type === "table") {
    return (
      <article className="numpy-step-card numpy-table-card">
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            {step}
          </span>
          <span className="numpy-step-label">{block.title}</span>
        </div>
        <NumpyVisualTable block={block} />
      </article>
    );
  }

  if (block.type === "matrices") {
    return (
      <article className="numpy-step-card numpy-matrices-card">
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            {step}
          </span>
          <span className="numpy-step-label">{block.title}</span>
        </div>
        <NumpyMatrixOpVisual block={block} accentColor={accentColor} />
      </article>
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
          {block.nodes.map((node) => (
            <div
              key={node.id}
              className="numpy-diagram-item"
              style={{ "--node-color": node.color || accentColor }}
            >
              <h4>{node.label}</h4>
              <ul>
                {node.items.map((item) => (
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

export default function NumpyIntroTheory({
  lesson,
  quizStoragePrefix,
  confidence,
  onConfidenceChange,
  markedAsRead = false,
  onMarkAsRead = () => {},
  onGoChallenge,
  // Opt-in: makes the overview's "Try it yourself" open the challenge.
  practiceLink = false,
  introVariant = "default",
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
  const activeLesson = preparedLesson || lesson;
  const isCourseStart = introVariant === "course-start";
  const accentColor =
    accentColorProp || activeLesson?.chapterColor || LEARN_ACCENT;
  const theoryBase = isCourseStart
    ? activeLesson.theory
    : activeLesson.theory.filter((block) => block.type !== "objectives");
  const introText = theoryBase.find(
    (block) => block.type === "text" && !block.code,
  );
  const introTextIndex = theoryBase.findIndex(
    (block) => block.type === "text" && !block.code,
  );
  const theoryBlocksRaw =
    introTextIndex >= 0
      ? theoryBase.filter((_, index) => index !== introTextIndex)
      : theoryBase;
  const hasCustomW3 =
    activeLesson?.topicOverview?.style === "w3" ||
    Boolean(activeLesson?.topicOverview?.definition);
  const usesAutoOverview = !isCourseStart && autoW3 && !hasCustomW3;
  // The auto-generated W3 overview (buildAutoW3TopicOverview) already lifts
  // the lesson's first "tip" callout and first "warning"/"info" callout up
  // into its own Key Points summary — drop those same blocks here so they
  // don't render a second time further down the page.
  let autoTipDropped = false;
  let autoNoteDropped = false;
  const theoryBlocks = usesAutoOverview
    ? theoryBlocksRaw.filter((block) => {
        if (block.type !== "callout") return true;
        if (!autoTipDropped && block.variant === "tip") {
          autoTipDropped = true;
          return false;
        }
        if (
          !autoNoteDropped &&
          (block.variant === "warning" || block.variant === "info")
        ) {
          autoNoteDropped = true;
          return false;
        }
        return true;
      })
    : theoryBlocksRaw;
  const theoryWithQuizMeta = mapTheoryWithQuizIndices(theoryBlocks);
  const quizSlides = theoryWithQuizMeta
    .filter(({ block }) => block.type === "quiz")
    .map(({ block, quizIndex }) => ({ block, quizIndex }));
  let stepCounter = 0;
  let quizSliderRendered = false;

  const showTopicOverview =
    !isCourseStart && (autoW3 || hasCustomW3);
  const hasW3Overview =
    !isCourseStart && lessonUsesW3Overview(activeLesson, autoW3);

  return (
    <div
      className={`numpy-intro-theory${isCourseStart ? " numpy-intro-theory--course-start" : ""}${hasW3Overview ? " numpy-intro-theory--w3" : ""}`}
    >
      {showTopicOverview ? (
        <LessonTopicOverview
          lesson={activeLesson}
          accentColor={accentColor}
          autoW3={autoW3}
          onPracticeClick={practiceLink ? onGoChallenge : undefined}
          practiceUnlocked={markedAsRead}
        />
      ) : null}

      {!isCourseStart && !hasW3Overview ? (
        <header
          className="numpy-lesson-hero"
          style={{ "--numpy-accent": accentColor }}
        >
          <span className="numpy-chapter-badge">{activeLesson.chapterTitle}</span>
          <h2 className="numpy-lesson-title" id="numpy-lesson-heading">
            {activeLesson.title}
          </h2>
          <p className="numpy-lesson-intro-label">Introduction</p>
          {introText?.content ? (
            <FormattedTheoryText
              text={introText.content}
              className="numpy-lesson-hook"
            />
          ) : (
            <p className="numpy-lesson-hook">
              We'll explain this idea in plain English — no jargon overload.
            </p>
          )}
        </header>
      ) : null}

      <div className="numpy-learn-path">
        <div className="numpy-path-label">
          <span>{hasW3Overview ? "Tutorial" : "Your learning path"}</span>
          {!isCourseStart && (
            <small>
              {hasW3Overview
                ? "Read each section, run the examples, then try the challenge"
                : "Read the idea, then run the code right below it"}
            </small>
          )}
        </div>

        {theoryWithQuizMeta.map(({ block, theoryIndex, quizIndex }) => {
          if (block.type === "quiz") {
            if (quizSliderRendered) return null;
            quizSliderRendered = true;
            stepCounter += 1;
            return (
              <LessonQuizSlider
                key={`quiz-slider-${theoryIndex}`}
                quizzes={quizSlides}
                accentColor={accentColor}
                getSelection={getSelection}
                onQuizAnswer={recordAttempt}
              />
            );
          }

          const needsStep =
            block.type === "text" ||
            block.type === "array" ||
            block.type === "table" ||
            block.type === "matrices" ||
            block.type === "diagram";
          const step = needsStep ? ++stepCounter : stepCounter;

          return (
            <NumpyTheoryBlock
              key={`${block.type}-${theoryIndex}`}
              block={block}
              step={step || theoryIndex + 1}
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
