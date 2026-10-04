import { COURSE_PROGRESS_REGISTRY, storageKeysForPrefix } from "./courseRegistry";

const LEARN_PROGRESS_BASE_KEYS = COURSE_PROGRESS_REGISTRY.flatMap((entry) => {
  const keys = storageKeysForPrefix(entry.storagePrefix);
  const list = [
    keys.progress,
    keys.savedCode,
    keys.bookmarks,
    keys.lastLesson,
  ];
  if (entry.notes) list.push(keys.notes);
  return list;
});

/** Account whose progress the shared (unscoped) learn keys currently hold. */
const LEARN_PROGRESS_OWNER_KEY = "polycode_learn_progress_owner";

const ANNOTATION_KEY_PREFIX = "polycode_annotations_";

// Per-lesson engagement keys: `${prefix}_read_<id>`, `_confidence_<id>`, `_quiz_attempts_<id>`.
const ENGAGEMENT_KEY_PREFIXES = COURSE_PROGRESS_REGISTRY.flatMap((entry) => [
  `${entry.storagePrefix}_read_`,
  `${entry.storagePrefix}_confidence_`,
  `${entry.storagePrefix}_quiz_attempts_`,
]);

function decodeUserIdFromToken(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const payload = JSON.parse(atob(segment.replace(/-/g, "+").replace(/_/g, "/")));
    const id = payload.id || payload.userId || payload.sub;
    return id ? String(id) : null;
  } catch {
    return null;
  }
}

/**
 * Returns a stable user id for learn progress keys.
 * - Signed-out visitors use "guest".
 * - Signed-in users must never share the guest bucket; when id is not ready yet, returns null.
 */
function resolveLearnUserScope(user, token) {
  const fromUser = user?._id || user?.id;
  if (fromUser) return String(fromUser);

  if (token) {
    const fromToken = decodeUserIdFromToken(token);
    return fromToken || null;
  }

  return "guest";
}

function getLearnUserScope(user, token) {
  return resolveLearnUserScope(user, token);
}

function scopedLearnKey(baseKey, user, token) {
  const scope = resolveLearnUserScope(user, token);
  if (!scope) return null;
  return `${baseKey}:${scope}`;
}

function readScopedJson(baseKey, user, fallback, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeScopedJson(baseKey, user, value, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function readScopedString(baseKey, user, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return null;
  return localStorage.getItem(key);
}

function writeScopedString(baseKey, user, value, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return;
  localStorage.setItem(key, value);
}

/**
 * Remove legacy unscoped keys and shared guest buckets so a new account
 * on the same browser cannot inherit another session's progress.
 */
function isolateLearnProgressForUser(userId) {
  if (!userId) return;

  LEARN_PROGRESS_BASE_KEYS.forEach((baseKey) => {
    localStorage.removeItem(baseKey);
    localStorage.removeItem(`${baseKey}:guest`);
  });
}

function getLearnProgressOwner() {
  return localStorage.getItem(LEARN_PROGRESS_OWNER_KEY);
}

/**
 * Remove every learn key that isn't scoped to a user: course progress, guest
 * buckets, read / confidence / quiz-attempt flags and annotations. Signed-in
 * learners get all of it back from the server, so this only drops the copy
 * the next person on this browser would otherwise see and upload.
 */
function clearSharedLearnProgress() {
  LEARN_PROGRESS_BASE_KEYS.forEach((baseKey) => {
    localStorage.removeItem(baseKey);
    localStorage.removeItem(`${baseKey}:guest`);
  });

  const keys = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key) keys.push(key);
  }
  keys
    .filter(
      (key) =>
        key.startsWith(ANNOTATION_KEY_PREFIX) ||
        ENGAGEMENT_KEY_PREFIXES.some((prefix) => key.startsWith(prefix)),
    )
    .forEach((key) => localStorage.removeItem(key));

  localStorage.removeItem(LEARN_PROGRESS_OWNER_KEY);
}

/**
 * Called when `userId` signs in, before local progress is uploaded. Shared
 * keys written while another account was signed in are dropped, not uploaded;
 * guest progress (no owner) is kept so the login merge can save it.
 */
function claimSharedLearnProgress(userId) {
  const owner = getLearnProgressOwner();
  if (owner && owner !== String(userId)) clearSharedLearnProgress();
  if (userId) localStorage.setItem(LEARN_PROGRESS_OWNER_KEY, String(userId));
}

export {
  LEARN_PROGRESS_BASE_KEYS,
  LEARN_PROGRESS_OWNER_KEY,
  getLearnProgressOwner,
  clearSharedLearnProgress,
  claimSharedLearnProgress,
  decodeUserIdFromToken,
  resolveLearnUserScope,
  getLearnUserScope,
  scopedLearnKey,
  readScopedJson,
  writeScopedJson,
  readScopedString,
  writeScopedString,
  isolateLearnProgressForUser,
};
