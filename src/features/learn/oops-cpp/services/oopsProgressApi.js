import { apiFetch } from "../../../../lib/apiClient";

export function getOopsProgress(token) {
  return request("", token);
}

export function setLastOopsLesson(token, lessonId) {
  return request("/last-lesson", token, {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
}

export function completeOopsLesson(token, lesson) {
  return request("/complete", token, {
    method: "POST",
    body: JSON.stringify({ lesson }),
  });
}

export function saveOopsCode(token, lessonId, code) {
  return request("/code", token, {
    method: "POST",
    body: JSON.stringify({ lessonId, code }),
  });
}

export function saveOopsNote(token, lessonId, note) {
  return request("/note", token, {
    method: "POST",
    body: JSON.stringify({ lessonId, note }),
  });
}

export function toggleOopsBookmark(token, lessonId) {
  return request("/bookmark", token, {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
}

export function addOopsTime(token, minutes) {
  return request("/time", token, {
    method: "POST",
    body: JSON.stringify({ minutes }),
  });
}

async function request(path, token, options = {}) {
  const data = await apiFetch(`/auth/learn/oops-cpp/progress${path}`, {
    token,
    fallbackMessage: "Unable to sync OOP C++ progress",
    ...options,
  });
  return data.progress;
}

export function progressToMap(progress) {
  return (progress?.completedLessons || []).reduce((acc, item) => {
    acc[item.lessonId] = { xp: item.xp, at: item.completedAt };
    return acc;
  }, {});
}

export function savedCodeToMap(progress) {
  return (progress?.savedCode || []).reduce((acc, item) => {
    acc[item.lessonId] = item.code;
    return acc;
  }, {});
}

export function notesToMap(progress) {
  return (progress?.notes || []).reduce((acc, item) => {
    acc[item.lessonId] = item.note;
    return acc;
  }, {});
}
