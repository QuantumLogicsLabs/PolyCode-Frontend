import React from "react";
import { act, render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../features/auth/context/AuthContext";
import {
  LEARN_PROGRESS_OWNER_KEY,
  clearSharedLearnProgress,
} from "../../features/learn/shared/scopedProgressStorage";
import { mergeLearnProgressOnLogin } from "../../features/learn/shared/mergeLearnProgressOnLogin";
import {
  mergeLocalAnnotations,
  mergeLocalCourseProgress,
} from "../../features/learn/shared/courseProgressApi";

jest.mock("../../features/learn/shared/courseProgressApi", () => ({
  ...jest.requireActual("../../features/learn/shared/courseProgressApi"),
  mergeLocalCourseProgress: jest.fn().mockResolvedValue({}),
  mergeLocalAnnotations: jest.fn().mockResolvedValue({}),
}));
jest.mock("../../features/profile/services/profileApi", () => ({
  updateProfile: jest.fn(),
  uploadProfileAvatar: jest.fn(),
}));

// modern-cpp keeps its local copy in shared (unscoped) keys; oops-cpp is scoped.
const PROGRESS = "modern_cpp_progress";
const CODE = "modern_cpp_saved_code";
const READ = "modern_cpp_read_lesson-1";
const QUIZ = "oops_quiz_attempts_lesson-1";
const ANNOTATION = "polycode_annotations_modern_cpp:lesson-1";
const SCOPED_A = "oops_progress:userA";

/** Learner A's leftovers after using the site on this browser. */
function seedAccountA() {
  localStorage.setItem(LEARN_PROGRESS_OWNER_KEY, "userA");
  localStorage.setItem(PROGRESS, JSON.stringify({ "lesson-1": { xp: 10 } }));
  localStorage.setItem(CODE, JSON.stringify({ "lesson-1": "// A's code" }));
  localStorage.setItem(READ, "true");
  localStorage.setItem(QUIZ, JSON.stringify({ 0: { selectedIndex: 1 } }));
  localStorage.setItem(
    ANNOTATION,
    JSON.stringify({ strokes: [{ points: [0, 0, 1, 1] }], labels: [] }),
  );
  localStorage.setItem(SCOPED_A, JSON.stringify({ "lesson-1": { xp: 10 } }));
}

function makeToken(id) {
  const now = Math.floor(Date.now() / 1000);
  const encode = (value) =>
    btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${encode({ alg: "HS256" })}.${encode({ id, iat: now, exp: now + 86400 })}.sig`;
}

const uploadedCourses = () => mergeLocalCourseProgress.mock.calls[0]?.[1] || {};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("clearSharedLearnProgress", () => {
  test("removes shared progress, engagement, annotations and the owner, but keeps scoped keys", () => {
    seedAccountA();
    localStorage.setItem("modern_cpp_progress:guest", "{}");
    localStorage.setItem("theme", "dark");

    clearSharedLearnProgress();

    [PROGRESS, CODE, READ, QUIZ, ANNOTATION, "modern_cpp_progress:guest", LEARN_PROGRESS_OWNER_KEY]
      .forEach((key) => expect(localStorage.getItem(key)).toBeNull());
    expect(localStorage.getItem(SCOPED_A)).not.toBeNull();
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

describe("mergeLearnProgressOnLogin", () => {
  test("does not upload progress another account left on this browser", async () => {
    seedAccountA();

    await mergeLearnProgressOnLogin(makeToken("userB"), { _id: "userB" });

    expect(uploadedCourses()["modern-cpp"]).toBeUndefined();
    expect(uploadedCourses()["oops-cpp"]).toBeUndefined();
    expect(mergeLocalAnnotations).not.toHaveBeenCalled();
    expect(localStorage.getItem(PROGRESS)).toBeNull();
    expect(localStorage.getItem(LEARN_PROGRESS_OWNER_KEY)).toBe("userB");
  });

  test("still uploads guest progress to the account that logs in", async () => {
    localStorage.setItem(PROGRESS, JSON.stringify({ "lesson-1": { xp: 10 } }));
    localStorage.setItem(ANNOTATION, JSON.stringify({ strokes: [{ points: [0, 0] }], labels: [] }));

    await mergeLearnProgressOnLogin(makeToken("userB"), { _id: "userB" });

    expect(uploadedCourses()["modern-cpp"].completedMap).toEqual({ "lesson-1": { xp: 10 } });
    expect(mergeLocalAnnotations).toHaveBeenCalled();
    expect(localStorage.getItem(LEARN_PROGRESS_OWNER_KEY)).toBe("userB");
  });

  test("uploads the same account's own shared copy when it signs back in", async () => {
    seedAccountA();

    await mergeLearnProgressOnLogin(makeToken("userA"), { _id: "userA" });

    expect(uploadedCourses()["modern-cpp"].savedCodeMap).toEqual({ "lesson-1": "// A's code" });
  });
});

describe("AuthProvider", () => {
  function LogoutButton() {
    const { logout, isAuthenticated } = useAuth();
    return (
      <button type="button" onClick={logout}>
        {isAuthenticated ? "signed-in" : "signed-out"}
      </button>
    );
  }

  test("logout clears the shared progress so the next learner starts clean", async () => {
    const user = { _id: "userA", username: "ada" };
    localStorage.setItem("token", makeToken("userA"));
    localStorage.setItem("authUser", JSON.stringify(user));
    seedAccountA();
    global.fetch = jest.fn(() => new Promise(() => {}));

    render(
      <AuthProvider>
        <LogoutButton />
      </AuthProvider>,
    );
    await act(async () => {
      screen.getByRole("button").click();
    });

    expect(screen.getByRole("button")).toHaveTextContent("signed-out");
    [PROGRESS, CODE, READ, QUIZ, ANNOTATION, LEARN_PROGRESS_OWNER_KEY]
      .forEach((key) => expect(localStorage.getItem(key)).toBeNull());
    expect(localStorage.getItem(SCOPED_A)).not.toBeNull();
  });

  test("a guest's progress survives page loads while signed out", () => {
    localStorage.setItem(PROGRESS, JSON.stringify({ "lesson-1": { xp: 10 } }));

    render(
      <AuthProvider>
        <LogoutButton />
      </AuthProvider>,
    );

    expect(screen.getByRole("button")).toHaveTextContent("signed-out");
    expect(localStorage.getItem(PROGRESS)).not.toBeNull();
  });
});
