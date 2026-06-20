import React, { useState } from "react";
import RunnableCodeBlock from "../../shared/RunnableCodeBlock";
import LessonReadGate from "../../shared/LessonReadGate";

function plainText(text = "") {
  return text.replace(/\*\*/g, "").replace(/`/g, "");
}

function InlineText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
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
        const valueColumns = `repeat(${colCount}, minmax(56px, 88px))`;
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
          <div key={`${row.label}-${rowIndex}`} className="numpy-array-row-block">
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
  const showTotals = block.showTotals !== false;

  return (
    <div className="numpy-visual-table-wrap">
      <table className="numpy-visual-table">
        <thead>
          <tr>
            <th className="numpy-vt-corner" />
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
              key={row.label}
              className={block.highlightRows?.includes(rowIndex) ? "numpy-vt-row-highlight" : ""}
            >
              <th className="numpy-vt-row-head">{row.label}</th>
              {row.values.map((value, colIndex) => (
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
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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
        <p className="numpy-step-text">
          <InlineText text={block.content} />
        </p>
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

  if (block.type === "callout") {
    const labels = {
      info: "Good to know",
      tip: "Helpful tip",
      warning: "Watch out",
    };
    const icons = { info: "💡", tip: "✨", warning: "⚠️" };
    return (
      <aside className={`numpy-tip-box numpy-tip-${block.variant}`}>
        <span className="numpy-tip-icon">{icons[block.variant] || "💡"}</span>
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
        <div className="numpy-step-head">
          <span
            className="numpy-step-num numpy-step-num-code"
            style={{ color: accentColor }}
          ></span>
        </div>
        {block.label && <p className="numpy-code-caption">{block.label}</p>}
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

  if (block.type === "quiz") {
    const answered = selectedQuiz !== null;
    const correct = selectedQuiz === block.answer;

    return (
      <article
        className={`numpy-quiz-card ${answered ? (correct ? "correct" : "wrong") : ""}`}
      >
        <div className="numpy-step-head">
          <span className="numpy-step-num" style={{ background: accentColor }}>
            ?
          </span>
          <span className="numpy-step-label">Quick check — no pressure!</span>
        </div>
        <p className="numpy-quiz-question">
          <InlineText text={block.question} />
        </p>
        <div className="numpy-quiz-options">
          {block.options.map((option, index) => {
            const isSelected = selectedQuiz === index;
            const isAnswer = block.answer === index;
            return (
              <button
                key={option}
                type="button"
                className={`numpy-quiz-option ${
                  answered && isAnswer ? "answer" : ""
                } ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedQuiz(index)}
              >
                {String.fromCharCode(65 + index)}. <InlineText text={option} />
              </button>
            );
          })}
        </div>
        {answered && (
          <p className="numpy-quiz-feedback">
            <strong>{correct ? "Nice!" : "Not quite — that's okay."}</strong>{" "}
            <InlineText text={block.explanation} />
          </p>
        )}
      </article>
    );
  }

  return null;
}

export default function NumpyIntroTheory({
  lesson,
  noteDraft,
  onNoteChange,
  onSaveNote,
  confidence,
  onConfidenceChange,
  markedAsRead = false,
  onMarkAsRead = () => {},
  onGoChallenge,
}) {
  const accentColor = lesson.chapterColor || "#4f46e5";
  const firstText = lesson.theory.find((block) => block.type === "text");
  let stepCounter = 0;

  return (
    <div className="numpy-intro-theory">
      <header
        className="numpy-lesson-hero"
        style={{ "--numpy-accent": accentColor }}
      >
        <span className="numpy-chapter-badge">{lesson.chapterTitle}</span>
        <h2 className="numpy-lesson-title" id="numpy-lesson-heading">
          {lesson.title}
        </h2>
        <p className="numpy-lesson-hook">
          {plainText(firstText?.content) ||
            "We'll explain this idea in plain English — no jargon overload."}
        </p>
      </header>

      <div className="numpy-learn-path">
        <div className="numpy-path-label">
          <span>Your learning path</span>
          <small>Read the idea, then run the code right below it</small>
        </div>

        {lesson.theory.map((block, index) => {
          const needsStep =
            block.type === "text" ||
            block.type === "array" ||
            block.type === "table" ||
            block.type === "matrices" ||
            block.type === "diagram" ||
            block.type === "quiz";
          const step = needsStep ? ++stepCounter : stepCounter;

          return (
            <NumpyTheoryBlock
              key={`${block.type}-${index}`}
              block={block}
              step={step || index + 1}
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
      />

      <div className="numpy-notes-panel">
        <h3>📝 Your notes</h3>
        <p className="numpy-notes-hint">
          Write anything you want to remember — in your own words.
        </p>
        <textarea
          value={noteDraft}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Example: ndarray = a neat row of numbers I can math on all at once..."
        />
        <button type="button" className="numpy-notes-save" onClick={onSaveNote}>
          Save note
        </button>
      </div>
    </div>
  );
}
