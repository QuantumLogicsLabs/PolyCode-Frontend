import React from "react";
import { Info, Lightbulb, Zap } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { buildAutoW3TopicOverview } from "./buildAutoW3TopicOverview";
import { buildLessonTopicOverview } from "./lessonTopicOverviewUtils";
import { THEME_OVERVIEW_ACCENT } from "./learnAccent";

function normalizeSyntaxLang(lang = "python") {
  const value = String(lang).toLowerCase();
  if (value === "c++" || value === "cpp") return "cpp";
  if (value === "c#") return "csharp";
  if (value === "js") return "javascript";
  if (value === "ts") return "typescript";
  if (value === "shell" || value === "bash" || value === "powershell") {
    return "powershell";
  }
  return value || "python";
}

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

function W3SyntaxBlock({ code, language = "python" }) {
  return (
    <div className="lesson-topic-w3-syntax lesson-topic-w3-syntax--highlighted">
      <SyntaxHighlighter
        language={normalizeSyntaxLang(language)}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "14px 16px",
          background: "transparent",
          fontSize: "0.92rem",
          lineHeight: 1.6,
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono, Consolas, Monaco, monospace)",
          },
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function W3ReferenceTable({ rows, codeClass }) {
  if (!rows?.length) return null;
  return (
    <div className="lesson-topic-w3-reference">
      <h3 className="lesson-topic-w3-section-title">Reference</h3>
      <table className="lesson-topic-w3-table">
        <thead>
          <tr>
            <th>Term / Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.term}>
              <td>
                <code className={codeClass}>{row.term}</code>
              </td>
              <td>
                <InlineText text={row.description} codeClassName={codeClass} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function W3StyleOverview({ overview, codeClass, onPracticeClick, practiceUnlocked }) {
  return (
    <section
      className="lesson-topic-overview lesson-topic-overview--w3"
      style={{ "--lesson-overview-accent": THEME_OVERVIEW_ACCENT }}
      aria-labelledby="lesson-topic-overview-heading"
    >
      <header className="lesson-topic-w3-header">
        <div>
          {overview.chapterTitle ? (
            <span className="lesson-topic-w3-chapter">{overview.chapterTitle}</span>
          ) : null}
          <h2 id="lesson-topic-overview-heading" className="lesson-topic-w3-title">
            {overview.title}
          </h2>
        </div>
        {overview.xp ? (
          <span className="lesson-topic-w3-xp">
            <Zap size={13} strokeWidth={2.4} aria-hidden />
            {overview.xp} XP
          </span>
        ) : null}
      </header>

      {overview.definition ? (
        <div className="lesson-topic-w3-block">
          <h3 className="lesson-topic-w3-section-title">Definition</h3>
          <p className="lesson-topic-w3-definition">
            <InlineText text={overview.definition} codeClassName={codeClass} />
          </p>
        </div>
      ) : null}

      {overview.syntax ? (
        <div className="lesson-topic-w3-block">
          <h3 className="lesson-topic-w3-section-title">
            {overview.syntaxLabel || "Syntax"}
          </h3>
          <W3SyntaxBlock
            code={overview.syntax}
            language={overview.syntaxLang || "python"}
          />
          {overview.cliExample && overview.cliExample !== overview.syntax ? (
            <p className="lesson-topic-w3-cli">
              <span className="lesson-topic-w3-cli-label">Example</span>
              <code className={codeClass}>{overview.cliExample}</code>
            </p>
          ) : null}
          {overview.exampleNote ? (
            <p className="lesson-topic-w3-example-note">
              <InlineText text={overview.exampleNote} codeClassName={codeClass} />
            </p>
          ) : null}
        </div>
      ) : null}

      {overview.essentials?.length > 0 ? (
        <div className="lesson-topic-w3-block">
          <h3 className="lesson-topic-w3-section-title">Key points</h3>
          <ul className="lesson-topic-w3-list">
            {overview.essentials.map((item) => (
              <li key={item}>
                <InlineText text={item} codeClassName={codeClass} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <W3ReferenceTable rows={overview.reference} codeClass={codeClass} />

      {overview.note ? (
        <aside className="lesson-topic-w3-note" role="note">
          <span className="lesson-topic-w3-callout-icon" aria-hidden>
            <Info size={15} strokeWidth={2.25} />
          </span>
          <div>
            <strong>Note:</strong>{" "}
            <InlineText text={overview.note} codeClassName={codeClass} />
          </div>
        </aside>
      ) : null}

      {overview.tip ? (
        <aside className="lesson-topic-w3-tip" role="note">
          <span className="lesson-topic-w3-callout-icon" aria-hidden>
            <Lightbulb size={15} strokeWidth={2.25} />
          </span>
          <div>
            <strong>Tip:</strong>{" "}
            <InlineText text={overview.tip} codeClassName={codeClass} />
          </div>
        </aside>
      ) : null}

      {overview.practiceTitle && onPracticeClick ? (
        // Opt-in: a working link once the challenge is unlocked, plain text
        // before that so it doesn't look clickable.
        practiceUnlocked ? (
          <p className="lesson-topic-w3-practice">
            <button
              type="button"
              className="lesson-topic-w3-practice-link"
              onClick={onPracticeClick}
            >
              <strong>Try it yourself →</strong>{" "}
              <InlineText text={overview.practiceTitle} codeClassName={codeClass} />
            </button>
          </p>
        ) : (
          <p className="lesson-topic-w3-practice">
            <strong>Practice (unlocks once you mark this lesson as read):</strong>{" "}
            <InlineText text={overview.practiceTitle} codeClassName={codeClass} />
          </p>
        )
      ) : overview.practiceTitle ? (
        <p className="lesson-topic-w3-practice">
          <strong>Try it yourself →</strong>{" "}
          <InlineText text={overview.practiceTitle} codeClassName={codeClass} />
        </p>
      ) : null}
    </section>
  );
}

/**
 * Top-of-lesson overview — W3Schools-style reference when lesson.topicOverview.style === "w3".
 */
export default function LessonTopicOverview({
  lesson,
  accentColor,
  variant = "numpy",
  autoW3 = true,
  onPracticeClick,
  practiceUnlocked = false,
}) {
  if (!lesson) return null;

  const built = buildLessonTopicOverview(lesson);
  const custom = lesson.topicOverview || {};
  const codeClass =
    variant === "oops" ? "oops-inline-code" : "numpy-inline-code";

  const hasCustomW3 = custom.style === "w3" || Boolean(custom.definition);
  const autoGenerated =
    autoW3 && !hasCustomW3 ? buildAutoW3TopicOverview(lesson) : null;

  const overview = {
    ...built,
    ...(autoGenerated || {}),
    ...custom,
    title: lesson.title || built.title,
    chapterTitle: lesson.chapterTitle || built.chapterTitle,
    practiceTitle:
      custom.practiceTitle || lesson.challenge?.title || built.practiceTitle,
    xp: lesson.xp || built.xp,
    essentials: custom.essentials?.length
      ? custom.essentials
      : autoGenerated?.essentials?.length
        ? autoGenerated.essentials
        : built.essentials,
    syntaxLang:
      custom.syntaxLang ||
      autoGenerated?.syntaxLang ||
      built.syntaxLang ||
      "python",
  };

  if (hasCustomW3 || autoGenerated) {
    return (
      <W3StyleOverview
        overview={overview}
        codeClass={codeClass}
        onPracticeClick={onPracticeClick}
        practiceUnlocked={practiceUnlocked}
      />
    );
  }

  return (
    <section
      className={`lesson-topic-overview lesson-topic-overview--${variant}`}
      style={{ "--lesson-overview-accent": accentColor }}
      aria-labelledby="lesson-topic-overview-heading"
    >
      <div className="lesson-topic-overview-head">
        <div className="lesson-topic-overview-meta">
          <span className="lesson-topic-overview-eyebrow">Topic overview</span>
          {overview.chapterTitle ? (
            <span className="lesson-topic-overview-chapter">
              {overview.chapterTitle}
            </span>
          ) : null}
        </div>
        {overview.xp ? (
          <span className="lesson-topic-overview-xp">
            <Zap size={13} strokeWidth={2.4} aria-hidden />
            {overview.xp} XP
          </span>
        ) : null}
      </div>

      <h2
        id="lesson-topic-overview-heading"
        className="lesson-topic-overview-title"
      >
        {overview.title}
      </h2>

      <p className="lesson-topic-overview-summary">
        <InlineText text={overview.summary} codeClassName={codeClass} />
      </p>

      {overview.essentials.length > 0 ? (
        <div className="lesson-topic-overview-essentials">
          <h3 className="lesson-topic-overview-essentials-title">
            Essential information
          </h3>
          <ul className="lesson-topic-overview-essentials-list">
            {overview.essentials.map((item) => (
              <li key={item}>
                <InlineText text={item} codeClassName={codeClass} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {overview.practiceTitle ? (
        <p className="lesson-topic-overview-practice">
          <strong>Practice:</strong>{" "}
          <InlineText text={overview.practiceTitle} codeClassName={codeClass} />
        </p>
      ) : null}
    </section>
  );
}
