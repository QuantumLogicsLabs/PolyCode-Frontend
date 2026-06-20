const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const PROFILE_PATH_KEY = "profilePath";

/** JWT-shaped string (three base64url segments). */
export function isValidToken(value) {
  return (
    typeof value === "string" &&
    value.length > 20 &&
    /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value)
  );
}

export function getStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return isValidToken(token) ? token : null;
}

export function setStoredToken(token) {
  if (!isValidToken(token)) {
    throw new Error("Invalid auth token received from server");
  }
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PROFILE_PATH_KEY);
}

export function rememberSignedInUser(user) {
  if (user?.username) {
    localStorage.setItem(USERNAME_KEY, user.username);
    localStorage.setItem(PROFILE_PATH_KEY, `/@${user.username}`);
  }
}

export function getProfilePathForUser(user) {
  if (user?.username) return `/@${user.username}`;
  const stored = localStorage.getItem(PROFILE_PATH_KEY);
  return stored || "/hub";
}
