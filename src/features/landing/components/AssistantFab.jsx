import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Minus,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Zap,
} from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";
import { useAssistant } from "../../assistant/context/AssistantContext";
import ProfileAvatar from "../../profile/components/ProfileAvatar";
import {
  getContextLabel,
  getQuickPrompts,
  getWelcomeMessage,
} from "../../assistant/lib/assistantPrompts";
import {
  clearAssistantSession,
  fetchAssistantSession,
  postAssistantChat,
  postAssistantFeedback,
} from "../lib/assistantApi";
import { ASSISTANT_CONFIG } from "../lib/assistantConfig";
import { useTypewriter } from "../lib/useTypewriter";
import AssistantAvatar from "./AssistantAvatar";

const MAX_STORED_MESSAGES = 20;
const DOCK_POSITION_KEY = "polycode_assistant_dock_position";
const DOCK_MARGIN = 12;
const DRAG_CLICK_THRESHOLD = 6;

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content: ASSISTANT_CONFIG.welcomeMessage,
};

function generateSessionId() {
  return `pm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(ASSISTANT_CONFIG.storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.sessionId && Array.isArray(parsed.messages)) {
        const hasWelcome = parsed.messages.some((m) => m.id === "welcome");
        return {
          ...parsed,
          messages: hasWelcome
            ? parsed.messages
            : [WELCOME_MESSAGE, ...parsed.messages],
        };
      }
    }
  } catch {
    /* ignore */
  }
  return { sessionId: generateSessionId(), messages: [WELCOME_MESSAGE] };
}

function loadDockPosition() {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(DOCK_POSITION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (Number.isFinite(parsed?.x) && Number.isFinite(parsed?.y)) {
      return parsed;
    }
  } catch {
    /* ignore */
  }

  return null;
}

function clampDockPosition(position, size = { width: 220, height: 76 }) {
  if (typeof window === "undefined") return position;

  return {
    x: Math.min(
      Math.max(DOCK_MARGIN, position.x),
      Math.max(DOCK_MARGIN, window.innerWidth - size.width - DOCK_MARGIN),
    ),
    y: Math.min(
      Math.max(DOCK_MARGIN, position.y),
      Math.max(DOCK_MARGIN, window.innerHeight - size.height - DOCK_MARGIN),
    ),
  };
}

function saveDockPosition(position) {
  try {
    localStorage.setItem(DOCK_POSITION_KEY, JSON.stringify(position));
  } catch {
    /* ignore */
  }
}

function saveSession(session) {
  try {
    const trimmed =
      session.messages.length > MAX_STORED_MESSAGES
        ? [
            WELCOME_MESSAGE,
            ...session.messages
              .filter((m) => m.id !== "welcome")
              .slice(-(MAX_STORED_MESSAGES - 1)),
          ]
        : session.messages;
    const messagesForStorage = trimmed.map(({ stream, ...message }) => message);
    localStorage.setItem(
      ASSISTANT_CONFIG.storageKey,
      JSON.stringify({ ...session, messages: messagesForStorage }),
    );
  } catch {
    /* ignore */
  }
}

function renderMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ fontWeight: 600, color: "var(--acid)" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    const lines = part.split("\n");
    return (
      <span key={i}>
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    );
  });
}

function ReplyFeedback({ feedback, onRate, disabled, required }) {
  return (
    <div
      className={`assistant-feedback${required && !feedback ? " assistant-feedback--required" : ""}`}
    >
      {required && !feedback ? (
        <span className="assistant-feedback-hint">Rate this answer to continue</span>
      ) : null}
      <button
        type="button"
        className={`assistant-feedback-btn${feedback === "like" ? " assistant-feedback-btn--active-like" : ""}`}
        onClick={() => onRate("like")}
        disabled={disabled}
        aria-label="Helpful reply"
        aria-pressed={feedback === "like"}
      >
        <ThumbsUp size={14} />
      </button>
      <button
        type="button"
        className={`assistant-feedback-btn${feedback === "dislike" ? " assistant-feedback-btn--active-dislike" : ""}`}
        onClick={() => onRate("dislike")}
        disabled={disabled}
        aria-label="Not helpful reply"
        aria-pressed={feedback === "dislike"}
      >
        <ThumbsDown size={14} />
      </button>
    </div>
  );
}

function MentorReply({
  msg,
  reduceMotion,
  showFeedback,
  onRate,
  feedbackSaving,
  onStreamComplete,
  feedbackRequired,
}) {
  const shouldStream = Boolean(msg.stream) && !reduceMotion;
  const { displayed, done } = useTypewriter(msg.content, shouldStream);
  const visible = shouldStream ? displayed : msg.content;
  const canRate = showFeedback && done && msg.content && msg.id !== "welcome";

  useEffect(() => {
    if (shouldStream && done && onStreamComplete) {
      onStreamComplete(msg.id);
    }
  }, [shouldStream, done, msg.id, onStreamComplete]);

  return (
    <article style={{ position: "relative", paddingLeft: "1.25rem" }}>
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: "0.75rem",
          height: "calc(100% - 12px)",
          width: 3,
          borderRadius: 999,
          background: "var(--acid)",
        }}
      />
      <div
        style={{
          borderRadius: "0.75rem",
          border: "1px solid var(--border)",
          background: "rgba(10,18,24,0.9)",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <AssistantAvatar size="sm" />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--acid)" }}>
            {ASSISTANT_CONFIG.name}
          </span>
        </div>
        <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#e2e8f0", margin: 0 }}>
          {renderMarkdown(visible)}
          {!done && shouldStream ? (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "1em",
                marginLeft: 2,
                background: "var(--acid)",
                verticalAlign: "middle",
                animation: "pulse 1s infinite",
              }}
            />
          ) : null}
        </p>
        {canRate ? (
          <ReplyFeedback
            feedback={msg.feedback}
            onRate={onRate}
            disabled={feedbackSaving}
            required={feedbackRequired}
          />
        ) : null}
      </div>
    </article>
  );
}

function ThinkingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        borderRadius: "0.75rem",
        border: "1px solid rgba(34,211,238,0.15)",
        background: "rgba(34,211,238,0.05)",
        padding: "0.75rem 1rem",
      }}
    >
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: "rgba(103,232,249,0.8)" }}>
        PolyMentor is thinking…
      </span>
    </div>
  );
}

function UserReply({ content, user }) {
  return (
    <div className="assistant-user-row">
      {user ? (
        <div className="assistant-user-avatar" aria-hidden>
          <ProfileAvatar user={user} size="sm" />
        </div>
      ) : null}
      <div className="assistant-user-bubble">
        <p>{content}</p>
      </div>
    </div>
  );
}

function getPendingFeedbackMessage(messages) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (
      message.role === "assistant" &&
      message.id !== "welcome" &&
      message.content?.trim()
    ) {
      return message.feedback ? null : message;
    }
  }
  return null;
}

export default function AssistantFab() {
  const { user } = useAuth();
  const { context: assistantContext } = useAssistant();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(() => loadSession());
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackSavingId, setFeedbackSavingId] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesScrollRef = useRef(null);
  const inputRef = useRef(null);
  const sessionRef = useRef(session);
  const dockRef = useRef(null);
  const dragStateRef = useRef(null);
  const suppressDockClickRef = useRef(false);
  const [dockPosition, setDockPosition] = useState(() => loadDockPosition());
  const [draggingDock, setDraggingDock] = useState(false);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (!dockPosition) return undefined;

    const onResize = () => {
      const rect = dockRef.current?.getBoundingClientRect();
      const nextPosition = clampDockPosition(dockPosition, {
        width: rect?.width || 220,
        height: rect?.height || 76,
      });
      setDockPosition(nextPosition);
      saveDockPosition(nextPosition);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dockPosition]);

  useEffect(() => {
    let cancelled = false;

    async function hydrateFromServer() {
      try {
        const current = loadSession();
        const data = await fetchAssistantSession(current.sessionId);
        if (cancelled || !data?.messages?.length) return;

        const serverMessages = data.messages.map((m, index) => ({
          id:
            m.clientMessageId ||
            `server-${index}-${m.createdAt || Date.now()}`,
          role: m.role,
          content: m.content,
          feedback: m.feedback || null,
        }));

        setSession({
          sessionId: current.sessionId,
          messages: [WELCOME_MESSAGE, ...serverMessages],
        });
      } catch {
        /* use local session from localStorage */
      }
    }

    hydrateFromServer();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    window.requestAnimationFrame(() => {
      const scrollNode = messagesScrollRef.current;
      if (scrollNode) {
        scrollNode.scrollTop = scrollNode.scrollHeight;
      }
    });
  }, [session.messages, open, sending]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    saveSession(session);
  }, [session]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-polycode-assistant", onOpen);
    return () => window.removeEventListener("open-polycode-assistant", onOpen);
  }, []);

  const clearSession = useCallback(() => {
    const previousSessionId = sessionRef.current.sessionId;
    const nextSession = {
      sessionId: generateSessionId(),
      messages: [WELCOME_MESSAGE],
    };
    setSession(nextSession);
    setError(null);
    clearAssistantSession(previousSessionId).catch(() => {});
  }, []);

  const handleFeedback = useCallback(
    async (messageId, rating, assistantContent) => {
      const msgs = sessionRef.current.messages;
      const msgIndex = msgs.findIndex((m) => m.id === messageId);
      if (msgIndex < 0) return;

      const userMsg = [...msgs.slice(0, msgIndex)]
        .reverse()
        .find((m) => m.role === "user" && m.content?.trim());
      if (!userMsg) return;

      const previousFeedback = msgs[msgIndex]?.feedback;
      setSession((prev) => ({
        ...prev,
        messages: prev.messages.map((m) =>
          m.id === messageId ? { ...m, feedback: rating } : m,
        ),
      }));
      setFeedbackSavingId(messageId);

      try {
        await postAssistantFeedback({
          session_id: sessionRef.current.sessionId,
          message_id: messageId,
          rating,
          user_message: userMsg.content,
          assistant_message: assistantContent,
          context: assistantContext,
        });
      } catch {
        setSession((prev) => ({
          ...prev,
          messages: prev.messages.map((m) =>
            m.id === messageId ? { ...m, feedback: previousFeedback || null } : m,
          ),
        }));
      } finally {
        setFeedbackSavingId(null);
      }
    },
    [assistantContext],
  );

  const handleStreamComplete = useCallback((messageId) => {
    setSession((prev) => ({
      ...prev,
      messages: prev.messages.map((message) =>
        message.id === messageId ? { ...message, stream: false } : message,
      ),
    }));
  }, []);

  const sendText = useCallback(
    async (text) => {
      if (!text.trim() || sending) return;
      if (getPendingFeedbackMessage(sessionRef.current.messages)) return;

      const userMsg = { id: `user-${Date.now()}`, role: "user", content: text };
      const assistantId = `assistant-${Date.now()}`;
      const pendingId = `pending-${Date.now()}`;
      const pendingMsg = { id: pendingId, role: "assistant", content: "" };
      setSession((prev) => ({
        ...prev,
        messages: [...prev.messages, userMsg, pendingMsg],
      }));
      setDraft("");
      setSending(true);
      setError(null);

      const currentSession = sessionRef.current;
      const history = currentSession.messages
        .filter((m) => m.id !== "welcome" && m.id !== pendingId)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const res = await postAssistantChat({
          message: text,
          history,
          session_id: currentSession.sessionId,
          context: assistantContext,
          assistant_message_id: assistantId,
        });
        const assistantMsg = {
          id: assistantId,
          role: "assistant",
          content: res.response,
          feedback: null,
          stream: true,
        };
        setSession((prev) => ({
          ...prev,
          messages: [...prev.messages.filter((m) => m.id !== pendingId), assistantMsg],
        }));
      } catch (err) {
        setSession((prev) => ({
          ...prev,
          messages: prev.messages.filter((m) => m.id !== pendingId),
        }));
        setError(err instanceof Error ? err.message : "Connection failed. Try again.");
      } finally {
        setSending(false);
      }
    },
    [sending, assistantContext],
  );

  const send = useCallback(async () => {
    await sendText(draft);
  }, [draft, sendText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const pendingFeedback = getPendingFeedbackMessage(session.messages);
  const inputLocked = sending || Boolean(pendingFeedback);

  const quickPrompts = getQuickPrompts(assistantContext);
  const contextLabel = getContextLabel(assistantContext);

  const showQuickPrompts =
    session.messages.length <= 1 &&
    !inputLocked &&
    session.messages.every((m) => m.id === "welcome");

  const messageContent = (msg) =>
    msg.id === "welcome" ? getWelcomeMessage(assistantContext) : msg.content;

  const handleDockPointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();

    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
      width: rect.width,
      height: rect.height,
    };
    suppressDockClickRef.current = false;

    dockRef.current?.setPointerCapture?.(event.pointerId);
  };

  const handleDockPointerMove = (event) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    if (!state.moved && Math.hypot(deltaX, deltaY) < DRAG_CLICK_THRESHOLD) {
      return;
    }

    event.preventDefault();
    state.moved = true;
    suppressDockClickRef.current = true;
    setDraggingDock(true);

    setDockPosition(
      clampDockPosition(
        {
          x: event.clientX - state.offsetX,
          y: event.clientY - state.offsetY,
        },
        { width: state.width, height: state.height },
      ),
    );
  };

  const handleDockPointerUp = (event) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    dragStateRef.current = null;
    dockRef.current?.releasePointerCapture?.(event.pointerId);
    setDraggingDock(false);

    if (state.moved) {
      const rect = dockRef.current?.getBoundingClientRect();
      const nextPosition = clampDockPosition(
        {
          x: event.clientX - state.offsetX,
          y: event.clientY - state.offsetY,
        },
        { width: rect?.width || state.width, height: rect?.height || state.height },
      );
      setDockPosition(nextPosition);
      saveDockPosition(nextPosition);
      return;
    }

    setOpen(true);
  };

  const handleDockPointerCancel = (event) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    dragStateRef.current = null;
    dockRef.current?.releasePointerCapture?.(event.pointerId);
    setDraggingDock(false);
  };

  const openFromDock = (event) => {
    if (suppressDockClickRef.current) {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      suppressDockClickRef.current = false;
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close PolyMentor"
            className="assistant-overlay"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="polym_mentor-title"
            initial={reduceMotion ? {} : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? {} : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="assistant-panel polym_mentor-panel"
          >
            <div
              style={{
                flexShrink: 0,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                  <AssistantAvatar size="md" alt={ASSISTANT_CONFIG.name} />
                  <div>
                    <p id="polym_mentor-title" style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>
                      {ASSISTANT_CONFIG.name}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>
                      {ASSISTANT_CONFIG.tagline}
                    </p>
                    {contextLabel ? (
                      <span className="assistant-context-badge" title={contextLabel}>
                        {contextLabel}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <button
                    type="button"
                    onClick={clearSession}
                    disabled={sending}
                    aria-label="Reset session"
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: "0.5rem" }}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Minimize"
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: "0.5rem" }}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={messagesScrollRef}
              className="polym_mentor-scroll"
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {session.messages.map((msg) => (
                <div key={msg.id}>
                  {msg.role === "assistant" && msg.content === "" ? (
                    <ThinkingIndicator />
                  ) : msg.role === "user" ? (
                    <UserReply
                      content={messageContent(msg)}
                      user={user}
                    />
                  ) : (
                    <MentorReply
                      msg={{ ...msg, content: messageContent(msg) }}
                      reduceMotion={reduceMotion}
                      showFeedback
                      feedbackSaving={feedbackSavingId === msg.id}
                      feedbackRequired={msg.id === pendingFeedback?.id}
                      onStreamComplete={handleStreamComplete}
                      onRate={(rating) =>
                        handleFeedback(msg.id, rating, messageContent(msg))
                      }
                    />
                  )}
                </div>
              ))}

              {showQuickPrompts ? (
                <div>
                  <p style={{ margin: "0 0 0.5rem", fontFamily: "ui-monospace, monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>
                    Quick prompts
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendText(prompt)}
                        style={{
                          borderRadius: "0.5rem",
                          border: "1px solid var(--border)",
                          background: "var(--glass)",
                          padding: "0.5rem 0.75rem",
                          fontSize: "0.75rem",
                          color: "rgba(167,243,208,0.9)",
                          cursor: "pointer",
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {error ? (
                <div
                  style={{
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(239,68,68,0.25)",
                    background: "rgba(239,68,68,0.1)",
                    padding: "0.75rem 1rem",
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "0.75rem",
                    color: "#fca5a5",
                  }}
                >
                  error: {error}
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            <div
              style={{
                flexShrink: 0,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "#04080d",
                padding: "1rem",
              }}
            >
              {pendingFeedback ? (
                <p className="assistant-feedback-lock-notice" role="status">
                  Like or dislike the last answer before sending another message.
                </p>
              ) : null}
              <div
                className={`assistant-composer${inputLocked && !sending ? " assistant-composer--locked" : ""}`}
                style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "#0a1018", padding: "0.5rem" }}
              >
                <span style={{ paddingBottom: "0.5rem", paddingLeft: "0.25rem", fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "var(--acid)" }}>
                  &gt;
                </span>
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    pendingFeedback
                      ? "Rate the reply above to continue…"
                      : ASSISTANT_CONFIG.inputPlaceholder
                  }
                  rows={1}
                  disabled={inputLocked}
                  aria-label="Ask PolyMentor"
                  style={{
                    flex: 1,
                    minHeight: "2rem",
                    maxHeight: "5rem",
                    resize: "none",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#f1f5f9",
                    fontSize: "0.875rem",
                    padding: "0.375rem 0",
                  }}
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!draft.trim() || inputLocked}
                  aria-label="Send"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "0.5rem",
                    border: "none",
                    background: "var(--acid)",
                    color: "#fff",
                    cursor: "pointer",
                    opacity: !draft.trim() || inputLocked ? 0.3 : 1,
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <p style={{ margin: "0.5rem 0 0", textAlign: "center", fontFamily: "ui-monospace, monospace", fontSize: "9px", color: "#475569" }}>
                {ASSISTANT_CONFIG.poweredByLabel}
              </p>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <motion.div
          ref={dockRef}
          role="button"
          tabIndex={0}
          className={`assistant-dock-btn polym_mentor-dock${draggingDock ? " assistant-dock-btn--dragging" : ""}`}
          onPointerDown={handleDockPointerDown}
          onPointerMove={handleDockPointerMove}
          onPointerUp={handleDockPointerUp}
          onPointerCancel={handleDockPointerCancel}
          onClick={openFromDock}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
          }}
          aria-label={`Open ${ASSISTANT_CONFIG.name}`}
          initial={reduceMotion ? {} : { x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 24 }}
          style={
            dockPosition
              ? {
                  left: dockPosition.x,
                  top: dockPosition.y,
                  right: "auto",
                  bottom: "auto",
                }
              : undefined
          }
        >
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              color: "inherit",
              cursor: draggingDock ? "grabbing" : "grab",
              padding: 0,
            }}
          >
            <AssistantAvatar size="lg" alt={ASSISTANT_CONFIG.name} />
            <span style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--acid)" }}>
                <Zap size={12} />
                {ASSISTANT_CONFIG.name}
              </span>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>Tap to open mentor</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "0.5rem", background: "var(--acid-dim)", color: "var(--acid)" }}>
              <Sparkles size={16} />
            </span>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
