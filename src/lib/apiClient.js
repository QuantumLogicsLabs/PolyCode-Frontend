import { getApiBase } from "../config/apiBase";
import { getStoredToken } from "./authSession";

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function readApiResponse(res, fallbackMessage) {
  const text = await res.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!res.ok) {
    throw new ApiError(data.error || data.message || fallbackMessage, {
      status: res.status,
      data,
    });
  }

  return data;
}

/**
 * Authenticated fetch wrapper used across the app.
 * Pass `token` explicitly or omit to read from localStorage.
 */
export async function apiFetch(path, options = {}) {
  const {
    token = getStoredToken(),
    auth = true,
    fallbackMessage = "Request failed",
    headers: extraHeaders,
    ...fetchOptions
  } = options;

  const headers = {
    ...(extraHeaders || {}),
  };

  if (
    fetchOptions.body &&
    !headers["Content-Type"] &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
  }

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getApiBase()}${path}`, {
    ...fetchOptions,
    headers,
  });

  return readApiResponse(res, fallbackMessage);
}

export function networkErrorMessage(error) {
  if (error?.message === "Failed to fetch") {
    return "Cannot reach the server. Check your internet connection or try again in a moment.";
  }
  return error?.message || "Request failed";
}
