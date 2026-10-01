import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { recordLessonXp } from "./recordLessonXp";
import {
  readScopedJson,
  readScopedString,
  resolveLearnUserScope,
  writeScopedJson,
  writeScopedString,
} from "./scopedProgressStorage";
import {
  addCourseTime,
  completeCourseLesson,
  getCourseProgress,
  notesToMap,
  progressToMap,
  saveCourseCode,
  saveCourseNote,
  savedCodeToMap,
  setLastCourseLesson,
  toggleCourseBookmark,
  upsertLessonEngagement,
} from "./courseProgressApi";
import { storageKeysForPrefix } from "./courseRegistry";
import useLessonTimeTracking from "./useLessonTimeTracking";

function readUnscopedJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeUnscopedJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function remoteCompletionCount(progress) {
  return (progress?.completedLessons || []).length;
}

function mergeCompletionMaps(localMap = {}, remoteMap = {}) {
  return { ...localMap, ...remoteMap };
}

/**
 * Shared course progress hook: MongoDB when signed in, localStorage for guests.
 */
export default function useCourseProgress({
  courseId,
  storagePrefix,
  scoped = false,
  supportsNotes = false,
}) {
  const { user, isAuthenticated, token, loading } = useAuth();
  const [remoteProgress, setRemoteProgress] = useState(null);
  const [syncState, setSyncState] = useState(token ? "syncing" : "local");
  const [localVersion, setLocalVersion] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);
  const scopeReady = scoped
    ? Boolean(resolveLearnUserScope(user, token))
    : true;
  const keys = useMemo(
    () => storageKeysForPrefix(storagePrefix),
    [storagePrefix],
  );

  const readProgressLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return {};
      return readScopedJson(keys.progress, user, {}, token);
    }
    return readUnscopedJson(keys.progress, {});
  }, [keys.progress, scopeReady, scoped, token, user]);

  const readCodeLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return {};
      return readScopedJson(keys.savedCode, user, {}, token);
    }
    return readUnscopedJson(keys.savedCode, {});
  }, [keys.savedCode, scopeReady, scoped, token, user]);

  const readBookmarksLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return [];
      return readScopedJson(keys.bookmarks, user, [], token);
    }
    return readUnscopedJson(keys.bookmarks, []);
  }, [keys.bookmarks, scopeReady, scoped, token, user]);

  const readNotesLocal = useCallback(() => {
    if (!supportsNotes) return {};
    if (scoped) {
      if (!scopeReady) return {};
      return readScopedJson(keys.notes, user, {}, token);
    }
    return readUnscopedJson(keys.notes, {});
  }, [keys.notes, scopeReady, scoped, supportsNotes, token, user]);

  const readLastLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return null;
      return readScopedString(keys.lastLesson, user, token);
    }
    return localStorage.getItem(keys.lastLesson);
  }, [keys.lastLesson, scopeReady, scoped, token, user]);

  const writeProgressLocal = useCallback(
    (value) => {
      if (scoped) writeScopedJson(keys.progress, user, value, token);
      else writeUnscopedJson(keys.progress, value);
    },
    [keys.progress, scoped, token, user],
  );

  const writeCodeLocal = useCallback(
    (value) => {
      if (scoped) writeScopedJson(keys.savedCode, user, value, token);
      else writeUnscopedJson(keys.savedCode, value);
    },
    [keys.savedCode, scoped, token, user],
  );

  const writeBookmarksLocal = useCallback(
    (value) => {
      if (scoped) writeScopedJson(keys.bookmarks, user, value, token);
      else writeUnscopedJson(keys.bookmarks, value);
    },
    [keys.bookmarks, scoped, token, user],
  );

  const writeNotesLocal = useCallback(
    (value) => {
      if (!supportsNotes) return;
      if (scoped) writeScopedJson(keys.notes, user, value, token);
      else writeUnscopedJson(keys.notes, value);
    },
    [keys.notes, scoped, supportsNotes, token, user],
  );

  const writeLastLocal = useCallback(
    (lessonId) => {
      if (scoped) writeScopedString(keys.lastLesson, user, lessonId, token);
      else localStorage.setItem(keys.lastLesson, lessonId);
    },
    [keys.lastLesson, scoped, token, user],
  );

  const mirrorRemoteToLocal = useCallback(
    (progress, { allowEmptyWipe = false, replaceCompletions = false } = {}) => {
      if (!progress || !token) return;
      const remoteMap = progressToMap(progress);
      const localMap = readProgressLocal();
      if (
        !allowEmptyWipe &&
        Object.keys(remoteMap).length === 0 &&
        Object.keys(localMap).length > 0
      ) {
        // Empty GET shell must not erase local completions before first DB write.
        return;
      }
      // Save responses can arrive out of order, or come from a save that ran
      // before /complete landed, so they must never remove a local tick. Only
      // the initial course load replaces the list (unscoped storage is shared
      // between accounts on the same browser).
      writeProgressLocal(
        replaceCompletions ? remoteMap : mergeCompletionMaps(localMap, remoteMap),
      );
      writeCodeLocal(savedCodeToMap(progress));
      writeBookmarksLocal(progress.bookmarks || []);
      if (supportsNotes) writeNotesLocal(notesToMap(progress));
      if (progress.lastLessonId) writeLastLocal(progress.lastLessonId);
    },
    [
      readProgressLocal,
      supportsNotes,
      token,
      writeBookmarksLocal,
      writeCodeLocal,
      writeLastLocal,
      writeNotesLocal,
      writeProgressLocal,
    ],
  );

  const adoptRemoteProgress = useCallback(
    (progress, { allowEmptyWipe = false } = {}) => {
      if (!progress) return;
      const remoteMap = progressToMap(progress);
      const localMap = readProgressLocal();
      if (
        !allowEmptyWipe &&
        Object.keys(remoteMap).length === 0 &&
        (Object.keys(localMap).length > 0 ||
          remoteCompletionCount(remoteProgress) > 0)
      ) {
        return;
      }
      setRemoteProgress(progress);
      mirrorRemoteToLocal(progress, { allowEmptyWipe });
      setSyncState("synced");
    },
    [mirrorRemoteToLocal, readProgressLocal, remoteProgress],
  );

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setRemoteProgress(null);
      setSyncState("guest");
      return undefined;
    }

    setSyncState("syncing");
    getCourseProgress(token, courseId)
      .then((progress) => {
        if (cancelled) return;
        const remoteMap = progressToMap(progress);
        const localMap = readProgressLocal();
        if (
          Object.keys(remoteMap).length === 0 &&
          Object.keys(localMap).length > 0
        ) {
          setRemoteProgress(progress);
          setSyncState("synced");
          return;
        }
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress, {
          allowEmptyWipe: true,
          replaceCompletions: true,
        });
        setSyncState("synced");
      })
      .catch(() => {
        if (cancelled) return;
        setRemoteProgress(null);
        setSyncState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [courseId, token]); // eslint-disable-line react-hooks/exhaustive-deps -- load once per course/session

  const completedMap = useMemo(() => {
    void localVersion;
    const localMap =
      scoped && !scopeReady
        ? {}
        : !isAuthenticated && scoped
          ? {}
          : !isAuthenticated
            ? {}
            : readProgressLocal();

    if (remoteProgress) {
      const remoteMap = progressToMap(remoteProgress);
      if (Object.keys(remoteMap).length > 0) {
        return mergeCompletionMaps(localMap, remoteMap);
      }
      if (Object.keys(localMap).length > 0) return localMap;
      return remoteMap;
    }
    if (token && (loading || (scoped && !scopeReady))) return {};
    return localMap;
  }, [
    remoteProgress,
    localVersion,
    token,
    loading,
    scoped,
    scopeReady,
    isAuthenticated,
    readProgressLocal,
  ]);

  const savedCodeMap = useMemo(() => {
    void localVersion;
    if (remoteProgress) return savedCodeToMap(remoteProgress);
    if (token && (loading || (scoped && !scopeReady))) return {};
    if (!isAuthenticated) return {};
    return readCodeLocal();
  }, [
    remoteProgress,
    localVersion,
    token,
    loading,
    scoped,
    scopeReady,
    isAuthenticated,
    readCodeLocal,
  ]);

  const notesMap = useMemo(() => {
    void localVersion;
    if (!supportsNotes) return {};
    if (remoteProgress) return notesToMap(remoteProgress);
    return readNotesLocal();
  }, [remoteProgress, localVersion, supportsNotes, readNotesLocal]);

  const bookmarks = useMemo(() => {
    void localVersion;
    if (remoteProgress) return remoteProgress.bookmarks || [];
    if (scoped && !scopeReady) return [];
    return readBookmarksLocal();
  }, [remoteProgress, localVersion, scoped, scopeReady, readBookmarksLocal]);

  const lastLessonId =
    remoteProgress?.lastLessonId ||
    (scoped && !scopeReady ? null : readLastLocal());

  const completeLesson = useCallback(
    async (lesson) => {
      const lessonId = lesson.id || lesson.lessonId;
      if (!lessonId) return;

      const applyLocalComplete = () => {
        const current = readProgressLocal();
        current[lessonId] = { xp: lesson.xp || 0, at: Date.now() };
        writeProgressLocal(current);
        writeLastLocal(lessonId);
        refreshLocal();
      };

      if (token) {
        applyLocalComplete();
        try {
          const progress = await completeCourseLesson(token, courseId, {
            lessonId,
            title: lesson.title || "",
            chapterId: lesson.chapterId || "",
            chapterTitle: lesson.chapterTitle || "",
            xp: lesson.xp || 0,
          });
          setRemoteProgress(progress);
          mirrorRemoteToLocal(progress, { allowEmptyWipe: true });
          setSyncState("synced");
          recordLessonXp(token, courseId, lesson);
          upsertLessonEngagement(token, courseId, {
            lessonId,
            challengeLastResult: "pass",
          }).catch(() => {});
        } catch (error) {
          setSyncState("error");
          const status = error?.status || error?.statusCode;
          if (status === 401) {
            throw error;
          }
          console.error(
            `Unable to sync ${courseId} lesson completion to server:`,
            error?.message || error,
          );
        }
        return;
      }

      if (scoped && !scopeReady) return;
      applyLocalComplete();
      recordLessonXp(token, courseId, lesson);
    },
    [
      courseId,
      mirrorRemoteToLocal,
      readProgressLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeLastLocal,
      writeProgressLocal,
    ],
  );

  const rememberLesson = useCallback(
    async (lessonId) => {
      setActiveLessonId(lessonId || null);
      if (token) {
        try {
          const progress = await setLastCourseLesson(token, courseId, lessonId);
          adoptRemoteProgress(progress);
          writeLastLocal(lessonId);
          refreshLocal();
        } catch {
          setSyncState("error");
          writeLastLocal(lessonId);
          refreshLocal();
        }
        return;
      }
      if (scoped && !scopeReady) return;
      writeLastLocal(lessonId);
      refreshLocal();
    },
    [
      adoptRemoteProgress,
      courseId,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeLastLocal,
    ],
  );

  const saveCode = useCallback(
    async (lessonId, code) => {
      if (token) {
        try {
          const progress = await saveCourseCode(token, courseId, lessonId, code);
          setRemoteProgress(progress);
          mirrorRemoteToLocal(progress, { allowEmptyWipe: true });
          setSyncState("synced");
        } catch (error) {
          setSyncState("error");
          console.error("Unable to save lesson code:", error?.message || error);
        }
        return;
      }
      if (!isAuthenticated) return;
      if (scoped && !scopeReady) return;
      const current = readCodeLocal();
      current[lessonId] = code;
      writeCodeLocal(current);
      refreshLocal();
    },
    [
      courseId,
      isAuthenticated,
      mirrorRemoteToLocal,
      readCodeLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeCodeLocal,
    ],
  );

  const saveNote = useCallback(
    async (lessonId, note) => {
      if (!supportsNotes) return;
      if (token) {
        try {
          const progress = await saveCourseNote(token, courseId, lessonId, note);
          setRemoteProgress(progress);
          mirrorRemoteToLocal(progress, { allowEmptyWipe: true });
          setSyncState("synced");
        } catch (error) {
          setSyncState("error");
          console.error("Unable to save lesson note:", error?.message || error);
        }
        return;
      }
      if (scoped && !scopeReady) return;
      const current = readNotesLocal();
      current[lessonId] = note;
      writeNotesLocal(current);
      refreshLocal();
    },
    [
      courseId,
      mirrorRemoteToLocal,
      readNotesLocal,
      refreshLocal,
      scopeReady,
      scoped,
      supportsNotes,
      token,
      writeNotesLocal,
    ],
  );

  const getLessonNote = useCallback(
    (lessonId) => {
      if (!supportsNotes || !lessonId) return "";
      return notesMap[lessonId] || "";
    },
    [notesMap, supportsNotes],
  );

  const toggleBookmark = useCallback(
    async (lessonId) => {
      if (token) {
        try {
          const progress = await toggleCourseBookmark(
            token,
            courseId,
            lessonId,
          );
          setRemoteProgress(progress);
          mirrorRemoteToLocal(progress, { allowEmptyWipe: true });
          setSyncState("synced");
        } catch (error) {
          setSyncState("error");
          console.error(
            "Unable to sync bookmark:",
            error?.message || error,
          );
        }
        return;
      }
      if (scoped && !scopeReady) return;
      const current = readBookmarksLocal();
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      writeBookmarksLocal(next);
      refreshLocal();
    },
    [
      courseId,
      mirrorRemoteToLocal,
      readBookmarksLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeBookmarksLocal,
    ],
  );

  const addTime = useCallback(
    async (minutes) => {
      if (!token) return;
      try {
        const progress = await addCourseTime(token, courseId, minutes);
        adoptRemoteProgress(progress);
      } catch {
        setSyncState("error");
      }
    },
    [adoptRemoteProgress, courseId, token],
  );

  useLessonTimeTracking(addTime, activeLessonId);

  const recordChallengeResult = useCallback(
    async (lessonId, passed) => {
      if (!lessonId) return;
      if (!token) return;
      try {
        const progress = await upsertLessonEngagement(token, courseId, {
          lessonId,
          challengeLastResult: passed ? "pass" : "fail",
          incrementChallengeAttempts: !passed,
        });
        adoptRemoteProgress(progress);
      } catch (error) {
        console.warn("Challenge engagement sync failed:", error.message);
      }
    },
    [adoptRemoteProgress, courseId, token],
  );

  const recordLastTab = useCallback(
    async (lessonId, lastTab) => {
      if (!lessonId || !lastTab || !token) return;
      try {
        const progress = await upsertLessonEngagement(token, courseId, {
          lessonId,
          lastTab,
        });
        adoptRemoteProgress(progress);
      } catch {
        /* non-blocking */
      }
    },
    [adoptRemoteProgress, courseId, token],
  );

  return {
    user,
    isAuthenticated,
    syncState,
    remoteProgress,
    completedMap,
    savedCodeMap,
    notesMap,
    bookmarks,
    lastLessonId,
    completeLesson,
    rememberLesson,
    saveCode,
    saveNote,
    getLessonNote,
    toggleBookmark,
    addTime,
    recordChallengeResult,
    recordLastTab,
  };
}
