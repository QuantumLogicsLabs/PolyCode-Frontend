import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  clearStoredSession,
  getStoredToken,
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

const AuthContext = createContext(null);

function applySession(setToken, setUser, token, user) {
  setStoredToken(token);
  rememberSignedInUser(user);
  setToken(token);
  setUser(user);
}

function clearSession(setToken, setUser) {
  clearStoredSession();
  setToken(null);
  setUser(null);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const bootstrapRequestId = useRef(0);

  const bootstrapSession = useCallback(async (storedToken) => {
    const requestId = ++bootstrapRequestId.current;

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/auth/me", {
        token: storedToken,
        fallbackMessage: "Could not restore session",
      });

      if (requestId !== bootstrapRequestId.current) return;

      rememberSignedInUser(data.user);
      setToken(storedToken);
      setUser(data.user);
    } catch (error) {
      if (requestId !== bootstrapRequestId.current) return;

      if (error instanceof ApiError && error.status === 401) {
        clearSession(setToken, setUser);
      }
      // Network / 5xx: keep token in storage; user stays signed out until /me succeeds.
    } finally {
      if (requestId === bootstrapRequestId.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    bootstrapSession(getStoredToken());
  }, [bootstrapSession]);

  const login = useCallback(async (email, password) => {
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        auth: false,
        body: JSON.stringify({ email, password }),
        fallbackMessage: "Login failed",
      });

      bootstrapRequestId.current += 1;
      applySession(setToken, setUser, data.token, data.user);
      setLoading(false);
      return data.user;
    } catch (error) {
      throw new Error(networkErrorMessage(error));
    }
  }, []);

  const register = useCallback(
    async ({ email, username, password, firstName, lastName }) => {
      try {
        const data = await apiFetch("/auth/register", {
          method: "POST",
          auth: false,
          body: JSON.stringify({
            email,
            username,
            password,
            firstName,
            lastName,
          }),
          fallbackMessage: "Registration failed",
        });

        bootstrapRequestId.current += 1;
        applySession(setToken, setUser, data.token, data.user);
        setLoading(false);
        return data.user;
      } catch (error) {
        throw new Error(networkErrorMessage(error));
      }
    },
    [],
  );

  const logout = useCallback(() => {
    bootstrapRequestId.current += 1;
    clearSession(setToken, setUser);
    setLoading(false);
  }, []);

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
