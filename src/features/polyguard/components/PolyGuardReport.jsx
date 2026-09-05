import React, { useEffect, useId, useState } from "react";
import { getPolyGuardAnalysisModeLabel } from "../config";
import "../polyguard.css";

function scoreTone(score) {
  const value = Number(score);
  if (Number.isNaN(value)) return "neutral";
  if (value >= 8) return "pass";
  if (value >= 5) return "review";
  return "fail";
}

const PASS_LINE = 8; // scoreTone() calls anything from here up a pass

/** Honours the OS "reduce motion" setting for the score reveal. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Counts up to `target` so the score lands instead of just appearing. */
function useCountUp(target, animate, duration = 700) {
  const [value, setValue] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate) {
      setValue(target);
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const step = (now) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, animate, duration]);

  return value;
}

function ScoreRing({ score, tone, label, small = false }) {
  // useId can contain ":", which is not safe inside an SVG url(#...) reference.
  const gradientId = `pg-score-grad-${useId().replace(/:/g, "")}`;
  const reduceMotion = usePrefersReducedMotion();

  const hasScore = score != null && !Number.isNaN(Number(score));
  const target = hasScore ? Math.min(10, Math.max(0, Number(score))) : 0;
  const shown = useCountUp(target, hasScore && !reduceMotion);

  const radius = small ? 30 : 46;
  const stroke = small ? 6 : 8;
  const size = (radius + stroke) * 2;
  const center = radius + stroke;
  const circumference = 2 * Math.PI * radius;

  // Sweep the arc in from empty on mount, and again whenever the score moves.
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (reduceMotion) {
      setDrawn(true);
      return undefined;
    }
    setDrawn(false);
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [target, reduceMotion]);

  const offset = circumference * (1 - (drawn ? target / 10 : 0));

  // A notch on the track showing the score you have to reach to pass.
  const passAngle = ((-90 + 360 * (PASS_LINE / 10)) * Math.PI) / 180;
  const tickFrom = radius - stroke / 2 - 1;
  const tickTo = radius + stroke / 2 + 1;

  return (
    <div
      className={`pg-score-ring pg-tone-${tone}${small ? " is-small" : ""}`}
      role="img"
      aria-label={
        hasScore
          ? `Score ${target.toFixed(1)} out of 10 — ${label}. Pass line is ${PASS_LINE.toFixed(1)}.`
          : "Score unavailable"
      }
      title={`Pass line: ${PASS_LINE.toFixed(1)} / 10`}
    >
      <div className="pg-score-ring-dial">
        <svg
          className="pg-score-ring-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop className="pg-score-ring-stop-a" offset="0%" />
              <stop className="pg-score-ring-stop-b" offset="100%" />
            </linearGradient>
          </defs>
          <circle
            className="pg-score-ring-disc"
            cx={center}
            cy={center}
            r={Math.max(0, radius - stroke / 2)}
          />
          <circle
            className="pg-score-ring-track"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={stroke}
          />
          <circle
            className="pg-score-ring-progress"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
          <line
            className="pg-score-ring-tick"
            x1={center + Math.cos(passAngle) * tickFrom}
            y1={center + Math.sin(passAngle) * tickFrom}
            x2={center + Math.cos(passAngle) * tickTo}
            y2={center + Math.sin(passAngle) * tickTo}
          />
        </svg>
        <div className="pg-score-ring-center">
          <strong>{hasScore ? shown.toFixed(1) : "—"}</strong>
          <span>/ 10</span>
        </div>
      </div>
      <span className="pg-score-ring-label">
        <span className="pg-score-ring-label-dot" aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

function MetricBar({ label, value, tone = "pass" }) {
  const pct = Math.min(100, Math.max(0, Number(value) || 0));
  return (
    <div className="pg-metric-row">
      <div className="pg-metric-row-head">
        <span className="pg-metric-label">{label}</span>
        <span className={`pg-metric-value pg-tone-text-${tone}`}>
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="pg-metric-bar-track">
        <div
          className={`pg-metric-bar-fill pg-tone-fill-${tone}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RawJsonSection({ data, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`pg-raw-json${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="pg-raw-json-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>RAW JSON</span>
        <span className="pg-raw-json-actions">
          <span
            role="button"
            tabIndex={0}
            className="pg-raw-json-copy"
            onClick={(event) => {
              event.stopPropagation();
              handleCopy();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                handleCopy();
              }
            }}
          >
            {copied ? "COPIED" : "COPY"}
          </span>
          <span className={`pg-raw-json-chevron${open ? " is-open" : ""}`} />
        </span>
      </button>
      {open ? <pre className="pg-raw-json-body">{json}</pre> : null}
    </div>
  );
}

function LoadingState({ compact = false }) {
  return (
    <div
      className={`pg-report pg-report-loading${compact ? " is-compact" : ""}`}
      aria-live="polite"
    >
      <div className="pg-loading-ring" />
      <p>Analyzing…</p>
    </div>
  );
}

function TipsSection({ passed, actions, headline, compact = false, coachMode = false }) {
  const [open, setOpen] = useState(true);
  const count = passed ? 0 : actions.length;
  const sectionTitle = coachMode ? "HOW TO FIX" : "IMPROVEMENT TIPS";

  return (
    <div className={`pg-tips-card${compact ? " is-compact" : ""}`}>
      <button
        type="button"
        className="pg-tips-header pg-tips-header-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="pg-tips-header-left">
          <span className="pg-tips-icon" aria-hidden="true" />
          <span>{sectionTitle}</span>
          {count > 0 ? <span className="pg-tips-count">{count}</span> : null}
        </span>
        <span className={`pg-tips-chevron${open ? " is-open" : ""}`} />
      </button>
      {open ? (
        passed ? (
          <div className="pg-tip-item pg-tip-item-pass">
            <span className="pg-tip-arrow" aria-hidden="true" />
            <p>
              {coachMode
                ? "Your code meets the lesson requirements — nice work."
                : "No fixes needed — your code meets the lesson requirements."}
            </p>
          </div>
        ) : actions.length > 0 ? (
          <div className="pg-tips-list">
            {actions.map((action) => (
              <div key={action} className="pg-tip-item">
                <span className="pg-tip-arrow" aria-hidden="true" />
                <p>{action}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="pg-tip-item">
            <span className="pg-tip-arrow" aria-hidden="true" />
            <p>{headline || "Review your code against the lesson objective."}</p>
          </div>
        )
      ) : null}
    </div>
  );
}

export default function PolyGuardReport({
  result,
  error = "",
  loading = false,
  compact = false,
  showRawJson = false,
}) {
  if (loading) return <LoadingState compact={compact} />;

  if (error) {
    return (
      <div className={`pg-report pg-report-error${compact ? " is-compact" : ""}`}>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  const enriched = result.enriched || {};
  const metrics = enriched.metrics || {};
  const actions = enriched.actions || [];
  const tone = scoreTone(metrics.score);
  const passed = metrics.score >= 8 && actions.length === 0;
  const securityLabel = enriched.securityLabel || "REVIEW";
  const modeLabel = getPolyGuardAnalysisModeLabel(
    result.analysisMode,
    result.analysisFallback,
  );
  const coachMode = result.analysisMode === "code-coach";
  const modeClass =
    result.analysisMode === "code-coach"
      ? "pg-mode-coach"
      : result.analysisMode === "hybrid-ml"
        ? "pg-mode-ml"
        : "pg-mode-local";

  return (
    <div className={`pg-report pg-report-dashboard${compact ? " is-compact" : ""}`}>
      <div
        className={`pg-analysis-mode ${modeClass}`}
        title={result.analysisSource || modeLabel}
      >
        <span className="pg-analysis-mode-dot" aria-hidden="true" />
        <span>{modeLabel}</span>
        {result.analysisFallback && result.analysisSource ? (
          <span className="pg-analysis-mode-hint">{result.analysisSource}</span>
        ) : null}
        {result.mlSecurityNote ? (
          <span className="pg-analysis-mode-hint">{result.mlSecurityNote}</span>
        ) : null}
      </div>
      <div className={`pg-overview-card pg-tone-${tone}`}>
        <ScoreRing
          score={metrics.score}
          tone={tone}
          label={securityLabel}
          small={compact}
        />
        <div className="pg-overview-metrics">
          <div className="pg-overview-stat">
            <span className="pg-metric-label">VERDICT</span>
            <span className={`pg-overview-stat-value pg-tone-text-${tone}`}>
              {enriched.verdict || "—"}
            </span>
          </div>
          <div className="pg-overview-stat">
            <span className="pg-metric-label">RISK LEVEL</span>
            <span className={`pg-overview-stat-value pg-tone-text-${tone}`}>
              {metrics.riskLevel || enriched.risk || "—"}
            </span>
          </div>
          {!compact && !coachMode ? (
            <>
              <MetricBar
                label="CLEAN CONFIDENCE"
                value={metrics.cleanConfidence ?? metrics.score * 10}
                tone="pass"
              />
              <MetricBar
                label="VULN CONFIDENCE"
                value={metrics.vulnConfidence ?? 100 - metrics.score * 10}
                tone="fail"
              />
            </>
          ) : null}
        </div>
      </div>

      <TipsSection
        passed={passed}
        actions={actions}
        headline={enriched.headline || enriched.summary}
        compact={compact}
        coachMode={coachMode}
      />

      {showRawJson ? <RawJsonSection data={result} /> : null}
    </div>
  );
}
