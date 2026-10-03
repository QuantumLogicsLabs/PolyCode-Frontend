import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../features/auth/context/AuthContext";
import { getStoredToken, getStoredUser } from "../../lib/authSession";

jest.mock("../../features/learn/shared/mergeLearnProgressOnLogin", () => ({
  mergeLearnProgressOnLogin: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../../features/learn/shared/scopedProgressStorage", () => ({
  isolateLearnProgressForUser: jest.fn(),
  clearSharedLearnProgress: jest.fn(),
  getLearnProgressOwner: jest.fn(() => null),
}));
jest.mock("../../features/profile/services/profileApi", () => ({
  updateProfile: jest.fn(),
  uploadProfileAvatar: jest.fn(),
}));

/** Build a JWT-shaped token that expires `days` from now. */
function makeToken(days = 30) {
  const now = Math.floor(Date.now() / 1000);
  const body = { id: "u1", iat: now, exp: now + days * 24 * 60 * 60 };
  const encode = (value) =>
    btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${encode({ alg: "HS256", typ: "JWT" })}.${encode(body)}.sig-nature-placeholder`;
}

const USER = { _id: "u1", username: "ada", email: "ada@example.com" };

function Probe() {
  const { user, isAuthenticated, loading } = useAuth();
  return (
    <div>
      <span data-testid="state">
        {loading ? "loading" : isAuthenticated ? `in:${user.username}` : "out"}
      </span>
    </div>
  );
}

function seedSession(token = makeToken()) {
  localStorage.setItem("token", token);
  localStorage.setItem("authUser", JSON.stringify(USER));
  return token;
}

function jsonResponse(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.resolve(JSON.stringify(body)),
  });
}

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("restores the signed-in user from storage without waiting on the network", async () => {
  seedSession();
  let resolveMe;
  global.fetch = jest.fn(() => new Promise((resolve) => { resolveMe = resolve; }));

  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );

  // Signed in on the first paint — no logged-out flash while /auth/me is in flight.
  expect(screen.getByTestId("state")).toHaveTextContent("in:ada");

  await act(async () => {
    resolveMe(await jsonResponse(200, { user: USER }));
  });
  expect(screen.getByTestId("state")).toHaveTextContent("in:ada");
});

test("keeps the session when /auth/me fails with a server or network error", async () => {
  seedSession();
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      jsonResponse(503, { error: "unavailable", code: "SESSION_UNAVAILABLE" }),
    )
    .mockImplementation(() => Promise.reject(new TypeError("Failed to fetch")));

  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );

  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  expect(screen.getByTestId("state")).toHaveTextContent("in:ada");
  expect(getStoredToken()).not.toBeNull();
});

test("signs out only when the server rejects the token", async () => {
  seedSession();
  global.fetch = jest.fn(() =>
    jsonResponse(401, { error: "Invalid or expired token" }),
  );

  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );

  await waitFor(() =>
    expect(screen.getByTestId("state")).toHaveTextContent("out"),
  );
  expect(getStoredToken()).toBeNull();
  expect(getStoredUser()).toBeNull();
});

test("adopts a renewed token handed back by /auth/me", async () => {
  const original = seedSession(makeToken(2));
  const renewed = makeToken(30);
  global.fetch = jest.fn(() => jsonResponse(200, { user: USER, token: renewed }));

  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );

  await waitFor(() => expect(getStoredToken()).toBe(renewed));
  expect(renewed).not.toBe(original);
  expect(screen.getByTestId("state")).toHaveTextContent("in:ada");
});

test("drops a session whose token has already expired", async () => {
  seedSession(makeToken(-1));
  global.fetch = jest.fn(() => jsonResponse(200, { user: USER }));

  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );

  await waitFor(() =>
    expect(screen.getByTestId("state")).toHaveTextContent("out"),
  );
  expect(global.fetch).not.toHaveBeenCalled();
});
