import {
  COURSE_PROGRESS_REGISTRY,
  getCourseIdByStoragePrefix,
  getCourseRegistryEntry,
  storageKeysForPrefix,
} from "./courseRegistry";
import {
  mergeLocalAnnotations,
  mergeLocalCourseProgress,
} from "./courseProgressApi";
import {
  claimSharedLearnProgress,
  decodeUserIdFromToken,
  readScopedJson,
  readScopedString,
} from "./scopedProgressStorage";
import { loadQuizAttempts } from "./lessonQuizUtils";

function readUnscopedJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Scan localStorage for read / confidence / quiz keys for a storage prefix.
 * @returns {{ [lessonId]: { read?, confidence?, quizAttempts? } }}
 */
export function collectLocalEngagementMap(storagePrefix) {
  const engagementMap = {};
  if (!storagePrefix || typeof localStorage === "undefined") {
    return engagementMap;
  }

  const readRe = new RegExp(`^${escapeRegex(storagePrefix)}_read_(.+)$`);
  const confRe = new RegExp(`^${escapeRegex(storagePrefix)}_confidence_(.+)$`);
  const quizRe = new RegExp(
    `^${escapeRegex(storagePrefix)}_quiz_attempts_(.+)$`,
  );

  const ensure = (lessonId) => {
    if (!engagementMap[lessonId]) {
      engagementMap[lessonId] = {};
    }
    return engagementMap[lessonId];
  };

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key) continue;

    let match = key.match(readRe);
    if (match) {
      const lessonId = match[1];
      if (localStorage.getItem(key) === "true") {
        ensure(lessonId).read = true;
      }
      continue;
    }

    match = key.match(confRe);
    if (match) {
      const lessonId = match[1];
      const value = localStorage.getItem(key) || "";
      if (value) ensure(lessonId).confidence = value;
      continue;
    }

    match = key.match(quizRe);
    if (match) {
      const lessonId = match[1];
      const attempts = loadQuizAttempts(storagePrefix, lessonId);
      if (Object.keys(attempts).length > 0) {
        ensure(lessonId).quizAttempts = attempts;
      }
    }
  }

  return engagementMap;
}

function resolveAnnotationCourseId(scope) {
  return (
    getCourseRegistryEntry(scope)?.courseId ||
    getCourseIdByStoragePrefix(scope) ||
    null
  );
}

/**
 * Collect local annotation payloads for login merge.
 */
export function collectLocalAnnotations() {
  const items = [];
  if (typeof localStorage === "undefined") return items;

  const prefix = "polycode_annotations_";
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key || !key.startsWith(prefix)) continue;
    const storageKey = key.slice(prefix.length);
    const parts = storageKey.split(":").filter(Boolean);
    if (parts.length < 2) continue;

    let courseScope = parts[0];
    let lessonId = parts[1];
    let tab = "theory";
    if (parts.length >= 3) {
      tab = parts[2] === "challenge" ? "challenge" : "theory";
    }

    const courseId = resolveAnnotationCourseId(courseScope);
    if (!courseId || !lessonId) continue;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const strokes = Array.isArray(parsed.strokes) ? parsed.strokes : [];
      const labels = Array.isArray(parsed.labels) ? parsed.labels : [];
      if (!strokes.length && !labels.length) continue;
      items.push({ courseId, lessonId, tab, strokes, labels });
    } catch {
      // skip bad payloads
    }
  }

  return items;
}

function hasLocalPayload(payload) {
  return (
    Object.keys(payload.completedMap || {}).length > 0 ||
    Object.keys(payload.savedCodeMap || {}).length > 0 ||
    Object.keys(payload.notesMap || {}).length > 0 ||
    Object.keys(payload.engagementMap || {}).length > 0 ||
    (payload.bookmarks || []).length > 0 ||
    Boolean(payload.lastLessonId)
  );
}

/**
 * Collect localStorage progress for all registered courses and merge into Mongo.
 * Safe to call after login/register; errors are swallowed.
 */
export async function mergeLearnProgressOnLogin(token, user) {
  if (!token) return;

  const userId =
    user?._id || user?.id || decodeUserIdFromToken(token) || null;
  // Drop shared keys left by another account so they aren't uploaded to this one.
  claimSharedLearnProgress(userId);
  const courses = {};

  for (const entry of COURSE_PROGRESS_REGISTRY) {
    const keys = storageKeysForPrefix(entry.storagePrefix);
    let completedMap = {};
    let savedCodeMap = {};
    let notesMap = {};
    let bookmarks = [];
    let lastLessonId = null;

    if (entry.scoped && userId) {
      completedMap = readScopedJson(keys.progress, user, {}, token);
      savedCodeMap = readScopedJson(keys.savedCode, user, {}, token);
      bookmarks = readScopedJson(keys.bookmarks, user, [], token);
      lastLessonId = readScopedString(keys.lastLesson, user, token);
      if (entry.notes) {
        notesMap = readScopedJson(keys.notes, user, {}, token);
      }
    }

    // Also pick up unscoped / legacy keys (common on older courses)
    const unscopedCompleted = readUnscopedJson(keys.progress, {});
    const unscopedCode = readUnscopedJson(keys.savedCode, {});
    const unscopedBookmarks = readUnscopedJson(keys.bookmarks, []);
    const unscopedLast = localStorage.getItem(keys.lastLesson);
    const unscopedNotes = entry.notes
      ? readUnscopedJson(keys.notes, {})
      : {};

    completedMap = { ...unscopedCompleted, ...completedMap };
    savedCodeMap = { ...unscopedCode, ...savedCodeMap };
    notesMap = { ...unscopedNotes, ...notesMap };
    bookmarks = Array.from(
      new Set([...(unscopedBookmarks || []), ...(bookmarks || [])]),
    );
    lastLessonId = lastLessonId || unscopedLast || null;

    const engagementMap = collectLocalEngagementMap(entry.storagePrefix);

    const payload = {
      completedMap,
      savedCodeMap,
      notesMap,
      bookmarks,
      lastLessonId,
      engagementMap,
    };

    if (hasLocalPayload(payload)) {
      courses[entry.courseId] = payload;
    }
  }

  if (Object.keys(courses).length > 0) {
    try {
      await mergeLocalCourseProgress(token, courses);
    } catch (error) {
      console.warn("Learn progress merge failed:", error.message);
    }
  }

  const annotations = collectLocalAnnotations();
  if (annotations.length > 0) {
    try {
      await mergeLocalAnnotations(token, annotations);
    } catch (error) {
      console.warn("Annotation merge failed:", error.message);
    }
  }
}
