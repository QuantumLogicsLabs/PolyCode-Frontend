import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";

// Sandboxed LocalStorage keys for C# Progress tracking
const LOCAL_KEY = "csharp_progress";
const LOCAL_CODE_KEY = "csharp_saved_code";
const LOCAL_NOTES_KEY = "csharp_notes";
const LOCAL_BOOKMARKS_KEY = "csharp_bookmarks";
const LOCAL_LAST_KEY = "csharp_last_lesson";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export default function useCsharpProgress() {
  const { user, isAuthenticated } = useAuth();
  const [localVersion, setLocalVersion] = useState(0);
  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);

  const localSnapshot = useMemo(() => {
    void localVersion;
    return {
      completed: readJson(LOCAL_KEY, {}),
      savedCode: readJson(LOCAL_CODE_KEY, {}),
      notes: readJson(LOCAL_NOTES_KEY, {}),
      bookmarks: readJson(LOCAL_BOOKMARKS_KEY, []),
    };
  }, [localVersion]);

  const completedMap = isAuthenticated ? localSnapshot.completed : {};
  const savedCodeMap = isAuthenticated ? localSnapshot.savedCode : {};
  const notesMap = localSnapshot.notes;
  const bookmarks = localSnapshot.bookmarks;
  const lastLessonId = localStorage.getItem(LOCAL_LAST_KEY);

  const getLessonNote = useCallback(
    (id) => localSnapshot.notes[id] || "",
    [localSnapshot],
  );

  const completeLesson = useCallback(
    async (lesson) => {
      if (!isAuthenticated) return;
      const current = readJson(LOCAL_KEY, {});
      current[lesson.id] = { xp: lesson.xp, at: Date.now() };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(current));
      localStorage.setItem(LOCAL_LAST_KEY, lesson.id);
      refreshLocal();
    },
    [isAuthenticated, refreshLocal],
  );

  const rememberLesson = useCallback(
    async (lessonId) => {
      localStorage.setItem(LOCAL_LAST_KEY, lessonId);
      refreshLocal();
    },
    [refreshLocal],
  );

  const saveCode = useCallback(
    async (lessonId, code) => {
      if (!isAuthenticated) return;
      const current = readJson(LOCAL_CODE_KEY, {});
      current[lessonId] = code;
      localStorage.setItem(LOCAL_CODE_KEY, JSON.stringify(current));
      refreshLocal();
    },
    [isAuthenticated, refreshLocal],
  );

  const saveNote = useCallback(
    async (lessonId, note) => {
      const current = readJson(LOCAL_NOTES_KEY, {});
      current[lessonId] = note;
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(current));
      refreshLocal();
    },
    [refreshLocal],
  );

  const toggleBookmark = useCallback(
    async (lessonId) => {
      const current = readJson(LOCAL_BOOKMARKS_KEY, []);
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(next));
      refreshLocal();
    },
    [refreshLocal],
  );

  const addTime = useCallback(async () => {}, []);

  return {
    user,
    isAuthenticated,
    syncState: isAuthenticated ? "local" : "guest",
    remoteProgress: null,
    completedMap,
    savedCodeMap,
    notesMap,
    bookmarks,
    lastLessonId,
    completeLesson,
    rememberLesson,
    saveCode,
    saveNote,
    toggleBookmark,
    addTime,
    getLessonNote,
  };
}