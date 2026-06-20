import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Eraser,
  GripVertical,
  MousePointer2,
  Pencil,
  PenLine,
  Trash2,
  Type,
  X,
  Zap,
} from "lucide-react";
import {
  DEFAULT_PENCIL_COLOR,
  getPencilCursor,
  loadAnnotationPrefs,
  MAIN_COLOR_PRESETS,
  saveAnnotationPrefs,
  TOOL_CURSORS,
} from "./annotationCursors";

const STAGE_INTERACTIVE_SELECTOR =
  ".lesson-annotator-text-input, .lesson-annotator-label, .lesson-annotator-fab-wrap, .numpy-notes-panel, .oops-notes-panel, .numpy-confidence-panel, .numpy-mark-read-panel, .numpy-theory-actions, .lesson-read-gate, .lesson-confidence-panel, .lesson-read-actions, textarea, input, select, button, a";

const TOOLS = {
  POINTER: "pointer",
  PENCIL: "pencil",
  LASER: "laser",
  TEXT: "text",
  ERASER: "eraser",
};

const TOOL_ITEMS = [
  { id: TOOLS.POINTER, label: "Pointer", Icon: MousePointer2 },
  { id: TOOLS.PENCIL, label: "Pencil", Icon: Pencil },
  { id: TOOLS.LASER, label: "Laser", Icon: Zap },
  { id: TOOLS.TEXT, label: "Text", Icon: Type },
  { id: TOOLS.ERASER, label: "Eraser", Icon: Eraser },
];

const STROKE_WIDTH = 3;
const ERASER_RADIUS = 14;
const DRAG_THRESHOLD = 4;

function loadAnnotations(storageKey) {
  if (!storageKey) return { strokes: [], labels: [] };
  try {
    const raw = localStorage.getItem(`polycode_annotations_${storageKey}`);
    if (!raw) return { strokes: [], labels: [] };
    const parsed = JSON.parse(raw);
    return {
      strokes: Array.isArray(parsed.strokes) ? parsed.strokes : [],
      labels: Array.isArray(parsed.labels) ? parsed.labels : [],
    };
  } catch {
    return { strokes: [], labels: [] };
  }
}

function saveAnnotations(storageKey, data) {
  if (!storageKey) return;
  localStorage.setItem(
    `polycode_annotations_${storageKey}`,
    JSON.stringify(data),
  );
}

function getPoint(event, stage) {
  const rect = stage.getBoundingClientRect();
  const clientX = event.touches?.[0]?.clientX ?? event.clientX;
  const clientY = event.touches?.[0]?.clientY ?? event.clientY;
  return {
    x: clientX - rect.left + stage.scrollLeft,
    y: clientY - rect.top + stage.scrollTop,
  };
}

function drawStroke(ctx, stroke) {
  if (!stroke.points?.length) return;
  ctx.strokeStyle = stroke.color || DEFAULT_PENCIL_COLOR;
  ctx.lineWidth = stroke.width || STROKE_WIDTH;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(stroke.points[0][0], stroke.points[0][1]);
  stroke.points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.stroke();
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }
  const t = Math.max(
    0,
    Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)),
  );
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function strokeNearPoint(stroke, point, radius) {
  const points = stroke.points || [];
  for (let i = 1; i < points.length; i += 1) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    if (distanceToSegment(point.x, point.y, x1, y1, x2, y2) <= radius) {
      return true;
    }
  }
  return false;
}

function normalizeHex(color = "") {
  return color.trim().toLowerCase();
}

function ColorPicker({ label, value, onChange, compact }) {
  const paletteInputRef = useRef(null);
  const isCustomColor = !MAIN_COLOR_PRESETS.some(
    (preset) => normalizeHex(preset) === normalizeHex(value),
  );

  return (
    <div
      className={`lesson-annotator-color-picker${compact ? " lesson-annotator-color-picker--compact" : ""}`}
      aria-label={`${label} color`}
    >
      {MAIN_COLOR_PRESETS.map((color) => (
        <button
          key={color}
          type="button"
          className={`lesson-annotator-swatch${
            normalizeHex(value) === normalizeHex(color) ? " active" : ""
          }`}
          style={{ "--swatch": color }}
          onClick={() => onChange(color)}
          title={`${label}: ${color}`}
          aria-label={`${label} color ${color}`}
        />
      ))}
      <button
        type="button"
        className={`lesson-annotator-palette-btn${isCustomColor ? " active" : ""}`}
        style={isCustomColor ? { "--picked-color": value } : undefined}
        onClick={() => paletteInputRef.current?.click()}
        title="Choose any color"
        aria-label={`${label} custom color palette`}
      />
      <input
        ref={paletteInputRef}
        type="color"
        className="lesson-annotator-palette-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        aria-hidden
      />
    </div>
  );
}

function AnnotationLabel({
  label,
  canAdjust,
  isEditing,
  onStartEdit,
  onSave,
  onDelete,
  onMove,
  stageRef,
}) {
  const [draft, setDraft] = useState(label.text);
  const [livePos, setLivePos] = useState(null);
  const dragState = useRef(null);

  useEffect(() => {
    if (isEditing) setDraft(label.text);
  }, [isEditing, label.text]);

  const finishDrag = useCallback(
    (event) => {
      const state = dragState.current;
      dragState.current = null;
      setLivePos(null);

      if (!state?.moved) return;

      const stage = stageRef.current;
      if (!stage) return;
      const point = getPoint(event, stage);
      onMove(label.id, {
        x: state.originX + (point.x - state.startX),
        y: state.originY + (point.y - state.startY),
      });
    },
    [label.id, onMove, stageRef],
  );

  useEffect(() => {
    const onMoveEvent = (event) => {
      const state = dragState.current;
      if (!state) return;

      const stage = stageRef.current;
      if (!stage) return;
      const point = getPoint(event, stage);
      const dx = point.x - state.startX;
      const dy = point.y - state.startY;

      if (!state.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
        state.moved = true;
      }

      if (state.moved) {
        setLivePos({
          x: state.originX + dx,
          y: state.originY + dy,
        });
      }
    };

    const onUp = (event) => finishDrag(event);

    window.addEventListener("mousemove", onMoveEvent);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMoveEvent);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMoveEvent);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMoveEvent);
      window.removeEventListener("touchend", onUp);
    };
  }, [finishDrag, stageRef]);

  const handleDragStart = (event) => {
    if (!canAdjust || isEditing) return;
    if (event.target.closest(".lesson-annotator-label-edit")) return;
    event.stopPropagation();
    event.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;
    const point = getPoint(event, stage);
    dragState.current = {
      startX: point.x,
      startY: point.y,
      originX: label.x,
      originY: label.y,
      moved: false,
    };
  };

  const position = livePos || { x: label.x, y: label.y };

  if (isEditing) {
    return (
      <div
        className="lesson-annotator-label lesson-annotator-label--editing"
        style={{ left: position.x, top: position.y }}
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          autoFocus
          aria-label="Edit note"
        />
        <div className="lesson-annotator-label-actions">
          <button
            type="button"
            onClick={() => onSave(label.id, draft)}
            disabled={!draft.trim()}
          >
            Save
          </button>
          <button type="button" onClick={() => onStartEdit(null)}>
            Cancel
          </button>
          <button
            type="button"
            className="lesson-annotator-label-delete"
            onClick={() => onDelete(label.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`lesson-annotator-label${canAdjust ? " lesson-annotator-label--interactive" : ""}${livePos ? " lesson-annotator-label--dragging" : ""}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onDoubleClick={(event) => {
        if (!canAdjust) return;
        event.stopPropagation();
        onStartEdit(label.id);
      }}
    >
      {canAdjust ? (
        <span className="lesson-annotator-label-grip" aria-hidden>
          <GripVertical size={12} />
        </span>
      ) : null}
      <span className="lesson-annotator-label-text">{label.text}</span>
      {canAdjust ? (
        <button
          type="button"
          className="lesson-annotator-label-edit"
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onStartEdit(label.id);
          }}
          aria-label="Edit note"
        >
          <PenLine size={12} />
        </button>
      ) : null}
    </div>
  );
}

export default function LessonAnnotator({ storageKey, children }) {
  const stageRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const fabRef = useRef(null);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef(null);
  const prefsRef = useRef(loadAnnotationPrefs());

  const [tool, setTool] = useState(TOOLS.POINTER);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pencilColor, setPencilColor] = useState(prefsRef.current.pencilColor);
  const [laserColor, setLaserColor] = useState(prefsRef.current.laserColor);
  const [strokes, setStrokes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [textDraft, setTextDraft] = useState("");
  const [pendingTextPoint, setPendingTextPoint] = useState(null);
  const [laserPoint, setLaserPoint] = useState(null);
  const [editingLabelId, setEditingLabelId] = useState(null);

  const redrawCanvas = useCallback((nextStrokes) => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextStrokes.forEach((stroke) => drawStroke(ctx, stroke));
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!canvas || !stage || !content) return;

    const width = stage.clientWidth;
    const height = content.offsetHeight;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    redrawCanvas(strokes);
  }, [redrawCanvas, strokes]);

  useEffect(() => {
    const saved = loadAnnotations(storageKey);
    setStrokes(saved.strokes);
    setLabels(saved.labels);
  }, [storageKey]);

  useEffect(() => {
    saveAnnotations(storageKey, { strokes, labels });
  }, [storageKey, strokes, labels]);

  useEffect(() => {
    saveAnnotationPrefs({ pencilColor, laserColor });
  }, [pencilColor, laserColor]);

  useEffect(() => {
    redrawCanvas(strokes);
  }, [strokes, redrawCanvas]);

  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return undefined;

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(content);
    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, [resizeCanvas]);

  useEffect(() => {
    setPendingTextPoint(null);
    setTextDraft("");
    setLaserPoint(null);
    setEditingLabelId(null);
  }, [tool, storageKey]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleOutside = (event) => {
      if (fabRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [menuOpen]);

  const eraseAt = useCallback((point) => {
    setStrokes((prev) =>
      prev.filter((stroke) => !strokeNearPoint(stroke, point, ERASER_RADIUS)),
    );
    setLabels((prev) =>
      prev.filter(
        (label) => Math.hypot(label.x - point.x, label.y - point.y) > 24,
      ),
    );
  }, []);

  const isMarkupTool = tool !== TOOLS.POINTER;
  const canAdjustLabels = tool === TOOLS.POINTER;

  const stageCursor = useMemo(() => {
    if (tool === TOOLS.PENCIL) return getPencilCursor(pencilColor);
    if (tool === TOOLS.LASER) return undefined;
    if (tool === TOOLS.ERASER || tool === TOOLS.TEXT) return TOOL_CURSORS[tool];
    return undefined;
  }, [tool, pencilColor]);

  const activeToolItem =
    TOOL_ITEMS.find((item) => item.id === tool) || TOOL_ITEMS[0];
  const ActiveIcon = activeToolItem.Icon;

  const selectTool = (nextTool) => {
    setTool(nextTool);
    setMenuOpen(false);
  };

  const handleStageMove = (event) => {
    if (event.target.closest(STAGE_INTERACTIVE_SELECTOR)) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    if (tool === TOOLS.LASER) {
      setLaserPoint(getPoint(event, stage));
    }
  };

  const handleStageLeave = () => {
    setLaserPoint(null);
    handlePointerUp();
  };

  const handlePointerDown = (event) => {
    if (tool === TOOLS.POINTER) return;
    if (event.target.closest(STAGE_INTERACTIVE_SELECTOR)) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    event.preventDefault();
    const point = getPoint(event, stage);

    if (tool === TOOLS.LASER) {
      setLaserPoint(point);
      return;
    }

    if (tool === TOOLS.PENCIL) {
      drawingRef.current = true;
      currentStrokeRef.current = {
        color: pencilColor,
        width: STROKE_WIDTH,
        points: [[point.x, point.y]],
      };
      return;
    }

    if (tool === TOOLS.ERASER) {
      eraseAt(point);
      drawingRef.current = true;
      return;
    }

    if (tool === TOOLS.TEXT) {
      setPendingTextPoint(point);
      setTextDraft("");
      setEditingLabelId(null);
    }
  };

  const handlePointerMove = (event) => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage) return;

    if (tool === TOOLS.LASER) {
      setLaserPoint(getPoint(event, stage));
      return;
    }

    if (!canvas || !drawingRef.current) return;

    event.preventDefault();
    const point = getPoint(event, stage);

    if (tool === TOOLS.PENCIL && currentStrokeRef.current) {
      currentStrokeRef.current.points.push([point.x, point.y]);
      const ctx = canvas.getContext("2d");
      const pts = currentStrokeRef.current.points;
      const [x1, y1] = pts[pts.length - 2];
      const [x2, y2] = pts[pts.length - 1];
      drawStroke(ctx, {
        color: pencilColor,
        width: STROKE_WIDTH,
        points: [
          [x1, y1],
          [x2, y2],
        ],
      });
      return;
    }

    if (tool === TOOLS.ERASER) {
      eraseAt(point);
    }
  };

  const handlePointerUp = () => {
    if (tool === TOOLS.PENCIL && currentStrokeRef.current) {
      const finished = currentStrokeRef.current;
      if (finished.points.length > 1) {
        setStrokes((prev) => [...prev, finished]);
      }
    }
    drawingRef.current = false;
    currentStrokeRef.current = null;
  };

  const handleAddLabel = () => {
    const text = textDraft.trim();
    if (!text || !pendingTextPoint) return;

    const newId = `${Date.now()}`;
    setLabels((prev) => [
      ...prev,
      {
        id: newId,
        x: pendingTextPoint.x,
        y: pendingTextPoint.y,
        text,
      },
    ]);
    setPendingTextPoint(null);
    setTextDraft("");
    setTool(TOOLS.POINTER);
    setEditingLabelId(newId);
  };

  const handleSaveLabel = (labelId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, text: trimmed } : label,
      ),
    );
    setEditingLabelId(null);
  };

  const handleMoveLabel = (labelId, position) => {
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, ...position } : label,
      ),
    );
  };

  const handleDeleteLabel = (labelId) => {
    setLabels((prev) => prev.filter((label) => label.id !== labelId));
    setEditingLabelId(null);
  };

  const handleClearAll = () => {
    setStrokes([]);
    setLabels([]);
    setPendingTextPoint(null);
    setTextDraft("");
    setLaserPoint(null);
    setEditingLabelId(null);
  };

  return (
    <div
      className={`lesson-annotator lesson-annotator--tool-${tool}${
        isMarkupTool ? " lesson-annotator--active" : ""
      }`}
    >
      <div
        ref={stageRef}
        className="lesson-annotator-stage"
        style={stageCursor ? { cursor: stageCursor } : undefined}
        onMouseDown={handlePointerDown}
        onMouseMove={(event) => {
          handleStageMove(event);
          handlePointerMove(event);
        }}
        onMouseUp={handlePointerUp}
        onMouseLeave={handleStageLeave}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div ref={contentRef} className="lesson-annotator-content">
          {children}
        </div>

        <canvas
          ref={canvasRef}
          className={`lesson-annotator-canvas${isMarkupTool && tool !== TOOLS.LASER ? " is-active" : ""}`}
          style={stageCursor ? { cursor: stageCursor } : undefined}
          aria-hidden
        />

        {tool === TOOLS.LASER && laserPoint ? (
          <div
            className="lesson-annotator-laser-dot"
            style={{
              left: laserPoint.x,
              top: laserPoint.y,
              "--laser-color": laserColor,
            }}
            aria-hidden
          />
        ) : null}

        <div
          className={`lesson-annotator-labels${canAdjustLabels ? " lesson-annotator-labels--interactive" : ""}`}
        >
          {labels.map((label) => (
            <AnnotationLabel
              key={label.id}
              label={label}
              canAdjust={canAdjustLabels}
              isEditing={editingLabelId === label.id}
              onStartEdit={setEditingLabelId}
              onSave={handleSaveLabel}
              onDelete={handleDeleteLabel}
              onMove={handleMoveLabel}
              stageRef={stageRef}
            />
          ))}
        </div>

        {pendingTextPoint ? (
          <div
            className="lesson-annotator-text-input"
            style={{ left: pendingTextPoint.x, top: pendingTextPoint.y }}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <textarea
              value={textDraft}
              onChange={(event) => setTextDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleAddLabel();
                }
                if (event.key === "Escape") setPendingTextPoint(null);
              }}
              placeholder="Type a note..."
              rows={3}
              autoFocus
            />
            <div className="lesson-annotator-label-actions">
              <button
                type="button"
                onClick={handleAddLabel}
                disabled={!textDraft.trim()}
              >
                Add
              </button>
              <button type="button" onClick={() => setPendingTextPoint(null)}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div ref={fabRef} className="lesson-annotator-fab-wrap">
        <button
          type="button"
          className={`lesson-annotator-fab${menuOpen ? " lesson-annotator-fab--open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close markup tools" : "Open markup tools"}
          aria-expanded={menuOpen}
        >
          <ActiveIcon size={18} aria-hidden />
        </button>

        {menuOpen ? (
          <div
            className="lesson-annotator-fab-menu"
            role="menu"
            aria-label="Markup tools"
          >
            <div className="lesson-annotator-fab-menu-head">
              <span>Markup</span>
              <button
                type="button"
                className="lesson-annotator-fab-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close tools"
              >
                <X size={14} />
              </button>
            </div>

            <div className="lesson-annotator-fab-tools">
              {TOOL_ITEMS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  className={tool === id ? "active" : ""}
                  onClick={() => selectTool(id)}
                  title={label}
                >
                  <Icon size={16} aria-hidden />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {tool === TOOLS.PENCIL || tool === TOOLS.LASER ? (
              <div className="lesson-annotator-fab-colors">
                <span>
                  {tool === TOOLS.PENCIL ? "Pencil color" : "Laser color"}
                </span>
                <ColorPicker
                  label={tool === TOOLS.PENCIL ? "Pencil" : "Laser"}
                  value={tool === TOOLS.PENCIL ? pencilColor : laserColor}
                  onChange={
                    tool === TOOLS.PENCIL ? setPencilColor : setLaserColor
                  }
                  compact
                />
              </div>
            ) : null}

            <button
              type="button"
              className="lesson-annotator-fab-clear"
              onClick={handleClearAll}
            >
              <Trash2 size={14} aria-hidden />
              Clear all markup
            </button>

            {canAdjustLabels ? (
              <p className="lesson-annotator-fab-hint">
                Drag notes to move · double-click or ✎ to edit
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
