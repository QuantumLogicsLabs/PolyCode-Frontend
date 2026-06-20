import { useCallback, useEffect, useState } from "react";

function readStorageKey(prefix, lessonId) {
  return `${prefix}_read_${lessonId}`;
}

function confidenceStorageKey(prefix, lessonId) {
  return `${prefix}_confidence_${lessonId}`;
}

/**
 * Shared read gate + confidence state for all learn courses.
 * @param {string} storagePrefix - e.g. "numpy_py", "oops", "pointers_cpp"
 * @param {string} lessonId
 */
export default function useLessonReadGate(storagePrefix, lessonId) {
  const [markedAsRead, setMarkedAsRead] = useState(false);
  const [confidence, setConfidence] = useState("");

  useEffect(() => {
    if (!lessonId || !storagePrefix) return;
    setMarkedAsRead(
      localStorage.getItem(readStorageKey(storagePrefix, lessonId)) === "true",
    );
    setConfidence(
      localStorage.getItem(confidenceStorageKey(storagePrefix, lessonId)) || "",
    );
  }, [lessonId, storagePrefix]);

  const markAsRead = useCallback(() => {
    if (!lessonId || !storagePrefix) return;
    setMarkedAsRead(true);
    localStorage.setItem(readStorageKey(storagePrefix, lessonId), "true");
  }, [lessonId, storagePrefix]);

  const handleConfidenceChange = useCallback(
    (value) => {
      if (!lessonId || !storagePrefix) return;
      setConfidence(value);
      localStorage.setItem(confidenceStorageKey(storagePrefix, lessonId), value);
    },
    [lessonId, storagePrefix],
  );

  const createGoToChallenge = useCallback(
    (setTab) => () => {
      if (!markedAsRead) return;
      setTab("challenge");
    },
    [markedAsRead],
  );

  const challengeTabLocked = !markedAsRead;

  return {
    markedAsRead,
    markAsRead,
    confidence,
    handleConfidenceChange,
    createGoToChallenge,
    challengeTabLocked,
  };
}
