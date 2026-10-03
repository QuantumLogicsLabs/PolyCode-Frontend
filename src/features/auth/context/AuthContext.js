import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  AUTH_STORAGE_KEYS,
  clearStoredSession,
  getStoredToken,
  getStoredUser,
  isTokenExpired,
  rememberSignedInUser,
  setStoredToken,
} from "../../../lib/authSession";
import {
  apiFetch,
  ApiError,
  networkErrorMessage,
} from "../../../lib/apiClient";
import {
  updateProfile as updateProfileApi,
  uploadProfileAvatar,
} from "../../profile/services/profileApi";
import {
  clearSharedLearnProgress,
  getLearnProgressOwner,
  isolateLearnProgressForUser,
} from "../../learn/shared/scopedProgressStorage";
import { mergeLearnProgressOnLogin } from "../../learn/shared/mergeLearnProgressOnLogin";

const AuthContext = createContext(null);

/** Backoff for /auth/me retries — cold starts and flaky networks, not logouts. */
const REVALIDATE_RETRY_DELAYS_MS = [2000, 5000, 15000, 30000, 60000];

/**
 * Only a definitive "this token is not valid" answer ends the session.
 * Network failures, 5xx, cold starts and DB hiccups keep the user signed in.
 */
function isSessionRejected(error) {
  if (!(error instanceof ApiError)) return false;
  return error.status === 401 || error.status === 403;
}

/**
 * Push local (guest/legacy) learn progress to Mongo, then drop the shared keys.
 * Never blocks auth state — a slow or failing merge must not delay sign-in.
 */
function syncLearnProgressInBackground(token, user) {
  const userId = user?._id || user?.id;
  Promise.resolve()
    .then(() => mergeLearnProgressOnLogin(token, user))
    .catch(() => {})
    .then(() => {
      if (userId) isolateLearnProgressForUser(String(userId));
    });
}

async function applySession(setToken, setUser, token, user) {
  setStoredToken(token);
  rememberSignedInUser(user);
  // Upload browser progress to Mongo before clearing legacy/guest keys.
  await mergeLearnProgressOnLogin(token, user);
  const userId = user?._id || user?.id;
  if (userId) {
    isolateLearnProgressForUser(String(userId));
  }
  setToken(token);
  setUser(user);
}

function clearSession(setToken, setUser, { signedOut = false } = {}) {
  clearStoredSession();
  // Shared learn keys still hold the last account's progress; clear them so the
  // next person on this browser doesn't see it or upload it on login. Guest
  // progress (no owner) is left alone.
  if (signedOut || getLearnProgressOwner()) clearSharedLearnProgress();
  setToken(null);
  setUser(null);
}

export function AuthProvider({ children }) {
  // Restore from storage synchronously so a reload never flashes a signed-out
  // shell, and a failed /auth/me never silently drops the session.
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() =>
    getStoredToken() ? getStoredUser() : null,
  );
  const [loading, setLoading] = useState(
    () => Boolean(getStoredToken()) && !getStoredUser(),
  );
  const [avatarPreview, setAvatarPreview] = useState(null);
  const bootstrapRequestId = useRef(0);
  const retryTimerRef = useRef(null);
  const retryAttemptRef = useRef(0);
  const revalidateRef = useRef(null);

  const cancelScheduledRetry = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const bootstrapSession = useCallback(
    async (storedToken) => {
      const requestId = ++bootstrapRequestId.current;
      cancelScheduledRetry();

      if (!storedToken) {
        // No usable token (missing, malformed, or expired) — drop the cached
        // user too so no part of the UI keeps rendering a signed-in shell.
        clearSession(setToken, setUser);
        setLoading(false);
        return;
      }

      // Show the cached user while we confirm the token in the background.
      const cachedUser = getStoredUser();
      setLoading(!cachedUser);

      try {
        const data = await apiFetch("/auth/me", {
          token: storedToken,
          fallbackMessage: "Could not restore session",
        });

        if (requestId !== bootstrapRequestId.current) return;

        retryAttemptRef.current = 0;

        // Sliding session: the server hands back a fresh token as the old one
        // ages, so an active user is never expired out of their session.
        let activeToken = storedToken;
        if (data.token && data.token !== storedToken) {
          try {
            setStoredToken(data.token);
            activeToken = data.token;
          } catch {
            // Keep the working token if the server sent something malformed.
          }
        }

        rememberSignedInUser(data.user);
        syncLearnProgressInBackground(activeToken, data.user);
        setToken(activeToken);
        setUser(data.user);
      } catch (error) {
        if (requestId !== bootstrapRequestId.current) return;

        if (isSessionRejected(error)) {
          // The token really is dead — this is the only path that signs out.
          clearSession(setToken, setUser, { signedOut: true });
          retryAttemptRef.current = 0;
          return;
        }

        // Offline / 5xx / cold start: keep the session and try again later.
        const attempt = retryAttemptRef.current;
        const delay =
          REVALIDATE_RETRY_DELAYS_MS[
            Math.min(attempt, REVALIDATE_RETRY_DELAYS_MS.length - 1)
          ];
        retryAttemptRef.current = attempt + 1;
        cancelScheduledRetry();
        retryTimerRef.current = setTimeout(() => {
          retryTimerRef.current = null;
          revalidateRef.current?.();
        }, delay);
      } finally {
        if (requestId === bootstrapRequestId.current) {
          setLoading(false);
        }
      }
    },
    [cancelScheduledRetry],
  );

  useEffect(() => {
    revalidateRef.current = () => bootstrapSession(getStoredToken());
  }, [bootstrapSession]);

  useEffect(() => {
    bootstrapSession(getStoredToken());
    return cancelScheduledRetry;
  }, [bootstrapSession, cancelScheduledRetry]);

  // Retry as soon as the browser is usable again instead of waiting out the backoff.
  useEffect(() => {
    const retryIfPending = () => {
      if (retryTimerRef.current || retryAttemptRef.current > 0) {
        cancelScheduledRetry();
        revalidateRef.current?.();
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") retryIfPending();
    };

    window.addEventListener("online", retryIfPending);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("online", retryIfPending);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [cancelScheduledRetry]);

  // Keep tabs in sync: signing out in one tab signs out the rest, and signing
  // in elsewhere adopts that session instead of leaving this tab stale.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key && event.key !== AUTH_STORAGE_KEYS.TOKEN_KEY) return;

      const nextToken = getStoredToken();
      if (!nextToken) {
        bootstrapRequestId.current += 1;
        cancelScheduledRetry();
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }

      setToken(nextToken);
      const cachedUser = getStoredUser();
      if (cachedUser) setUser(cachedUser);
      bootstrapSession(nextToken);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [bootstrapSession, cancelScheduledRetry]);

  // A token that expires while the tab sits open ends the session on its own.
  useEffect(() => {
    if (!token) return undefined;
    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        bootstrapRequestId.current += 1;
        cancelScheduledRetry();
        clearSession(setToken, setUser, { signedOut: true });
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [token, cancelScheduledRetry]);

  const login = useCallback(
    async (email, password) => {
      try {
        const data = await apiFetch("/auth/login", {
          method: "POST",
          auth: false,
          body: JSON.stringify({ email, password }),
          fallbackMessage: "Login failed",
        });

        bootstrapRequestId.current += 1;
        retryAttemptRef.current = 0;
        cancelScheduledRetry();
        await applySession(setToken, setUser, data.token, data.user);
        setLoading(false);
        return data.user;
      } catch (error) {
        throw new Error(networkErrorMessage(error));
      }
    },
    [cancelScheduledRetry],
  );

  const loginWithGoogle = useCallback(
    async (idToken) => {
      try {
        const data = await apiFetch("/auth/google", {
          method: "POST",
          auth: false,
          body: JSON.stringify({ idToken }),
          fallbackMessage: "Google sign-in failed",
        });

        bootstrapRequestId.current += 1;
        retryAttemptRef.current = 0;
        cancelScheduledRetry();
        await applySession(setToken, setUser, data.token, data.user);
        setLoading(false);
        return data.user;
      } catch (error) {
        throw new Error(networkErrorMessage(error));
      }
    },
    [cancelScheduledRetry],
  );

  const register = useCallback(
    async ({
      email,
      username,
      password,
      name,
      firstName,
      middleName,
      lastName,
    }) => {
      try {
        const data = await apiFetch("/auth/register", {
          method: "POST",
          auth: false,
          body: JSON.stringify({
            email,
            username,
            password,
            name,
            firstName,
            middleName,
            lastName,
          }),
          fallbackMessage: "Registration failed",
        });

        bootstrapRequestId.current += 1;
        retryAttemptRef.current = 0;
        cancelScheduledRetry();
        await applySession(setToken, setUser, data.token, data.user);
        setLoading(false);
        return data.user;
      } catch (error) {
        throw new Error(networkErrorMessage(error));
      }
    },
    [cancelScheduledRetry],
  );

  const logout = useCallback(() => {
    bootstrapRequestId.current += 1;
    retryAttemptRef.current = 0;
    cancelScheduledRetry();
    clearSession(setToken, setUser, { signedOut: true });
    setLoading(false);
  }, [cancelScheduledRetry]);

  const updateProfile = useCallback(
    async (payload) => {
      const userId = user?._id || user?.id;
      if (!token || !userId) {
        throw new Error("You must be signed in to update your profile");
      }
      const data = await updateProfileApi(token, userId, payload);
      rememberSignedInUser(data.user);
      setUser(data.user);
      return data.user;
    },
    [token, user],
  );

  const uploadAvatar = useCallback(
    async (imageBase64) => {
      const userId = user?._id || user?.id;
      if (!token || !userId) {
        throw new Error("You must be signed in to upload a profile picture");
      }
      setAvatarPreview(imageBase64);
      try {
        const data = await uploadProfileAvatar(token, userId, imageBase64);
        rememberSignedInUser(data.user);
        setUser(data.user);
        return data.user;
      } finally {
        setAvatarPreview(null);
      }
    },
    [token, user],
  );

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        uploadAvatar,
        avatarPreview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
