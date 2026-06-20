import { getApiBase } from "../../../config/apiBase";

async function readResponse(res, fallbackMessage) {
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
    throw new Error(data.error || data.message || fallbackMessage);
  }
  return data;
}

export async function updateProfile(token, userId, payload) {
  const res = await fetch(`${getApiBase()}/auth/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return readResponse(res, "Could not update profile");
}

export async function getProfileByUsername(username) {
  const cleanUsername = String(username || "").replace(/^@/, "").trim();
  const res = await fetch(
    `${getApiBase()}/auth/username/${encodeURIComponent(cleanUsername)}`,
  );
  return readResponse(res, "Could not load profile");
}

export async function getFollowStatus(token, username) {
  const cleanUsername = String(username || "").replace(/^@/, "").trim();
  const res = await fetch(
    `${getApiBase()}/auth/username/${encodeURIComponent(cleanUsername)}/follow-status`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return readResponse(res, "Could not load follow status");
}

export async function setFollowStatus(token, username, shouldFollow) {
  const cleanUsername = String(username || "").replace(/^@/, "").trim();
  const res = await fetch(
    `${getApiBase()}/auth/username/${encodeURIComponent(cleanUsername)}/follow`,
    {
      method: shouldFollow ? "POST" : "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return readResponse(res, shouldFollow ? "Could not follow user" : "Could not unfollow user");
}

export async function uploadProfileAvatar(token, userId, imageBase64) {
  const res = await fetch(`${getApiBase()}/auth/user/${userId}/avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ imageBase64 }),
  });
  return readResponse(res, "Could not upload profile picture");
}
