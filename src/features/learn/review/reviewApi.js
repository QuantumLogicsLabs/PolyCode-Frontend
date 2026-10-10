import { apiFetch } from "../../../lib/apiClient";

/** Tells the navbar badge to refetch its count. */
export const REVIEW_CHANGED_EVENT = "polycode:review-changed";

export function notifyReviewChanged() {
  window.dispatchEvent(new Event(REVIEW_CHANGED_EVENT));
}

function courseQuery(courseIds = []) {
  const ids = courseIds.filter(Boolean);
  return ids.length ? `?courseId=${encodeURIComponent(ids.join(","))}` : "";
}

export async function getDueReviews(token, courseIds) {
  const data = await apiFetch(`/auth/learn/review/due${courseQuery(courseIds)}`, {
    token,
    fallbackMessage: "Unable to load your review questions",
  });
  return data.items || [];
}

export async function getDueReviewCount(token, courseIds) {
  const data = await apiFetch(`/auth/learn/review/count${courseQuery(courseIds)}`, {
    token,
    fallbackMessage: "Unable to load your review count",
  });
  return Number(data.count) || 0;
}

export function answerReview(token, itemId, correct) {
  return apiFetch(`/auth/learn/review/${encodeURIComponent(itemId)}/answer`, {
    token,
    method: "POST",
    body: JSON.stringify({ correct }),
    fallbackMessage: "Unable to save your review answer",
  });
}

export function dismissReview(token, itemId) {
  return apiFetch(`/auth/learn/review/${encodeURIComponent(itemId)}/dismiss`, {
    token,
    method: "POST",
    fallbackMessage: "Unable to update your review list",
  });
}
