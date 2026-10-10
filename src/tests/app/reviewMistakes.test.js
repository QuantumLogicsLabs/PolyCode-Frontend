import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReviewPage from "../../features/learn/review/ReviewPage";
import { resolveReviewItem } from "../../features/learn/review/reviewCourses";
import { REVIEW_COURSE_IDS } from "../../features/learn/review/reviewCourseIds";
import useLessonQuizAttempts from "../../features/learn/shared/useLessonQuizAttempts";
import {
  getLessonQuizBlocks,
  quizFingerprint,
} from "../../features/learn/shared/lessonQuizUtils";
import { SQLJOINS_LESSONS } from "../../features/learn/sql-joins/data/sqlJoinsCurriculum";

// Jest 27 cannot resolve react-router-dom 7 (package "exports" only).
jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ to, children, ...rest }) => (
      <a href={to} {...rest}>
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/review" }),
  }),
  { virtual: true },
);

let mockAuth = { token: null, isAuthenticated: false };
jest.mock("../../features/auth/context/AuthContext", () => ({
  useAuth: () => mockAuth,
}));

const mockUpsert = jest.fn();
jest.mock("../../features/learn/shared/courseProgressApi", () => ({
  ...jest.requireActual("../../features/learn/shared/courseProgressApi"),
  getCourseProgress: () => Promise.resolve({ lessonEngagement: [] }),
  upsertLessonEngagement: (...args) => mockUpsert(...args),
}));

const LESSON = SQLJOINS_LESSONS[0];
const QUIZ_0 = getLessonQuizBlocks(LESSON)[0];

function item(overrides = {}) {
  return {
    id: "a".repeat(24),
    courseId: "sql-joins",
    lessonId: LESSON.id,
    quizIndex: "0",
    questionHash: quizFingerprint(QUIZ_0),
    ...overrides,
  };
}

function respond(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.resolve(JSON.stringify(body)),
  });
}

const calls = (method) =>
  global.fetch.mock.calls
    .filter(([, options]) => (options?.method || "GET") === method)
    .map(([url, options]) => ({
      path: new URL(url).pathname,
      search: new URL(url).search,
      body: options?.body ? JSON.parse(options.body) : null,
    }));

afterEach(() => {
  localStorage.clear();
  mockAuth = { token: null, isAuthenticated: false };
});

describe("quizFingerprint", () => {
  it("is stable for the same question and changes when it is rewritten", () => {
    expect(quizFingerprint(QUIZ_0)).toBe(quizFingerprint({ ...QUIZ_0 }));
    expect(quizFingerprint({ ...QUIZ_0, question: "Something else?" })).not.toBe(
      quizFingerprint(QUIZ_0),
    );
    expect(quizFingerprint(null)).toBeNull();
  });
});

describe("resolveReviewItem", () => {
  it("finds the question the lesson page shows at that index", () => {
    const entry = resolveReviewItem(item());
    expect(entry.block).toEqual(QUIZ_0);
    expect(entry.courseTitle).toBe("SQL Joins");
    expect(entry.lessonPath).toBe(`/learn/sql-joins/lesson/${LESSON.id}`);
  });

  it("shows older items saved without a fingerprint", () => {
    expect(resolveReviewItem(item({ questionHash: "" }))?.block).toEqual(QUIZ_0);
  });

  it("drops items whose question changed or no longer exists", () => {
    expect(resolveReviewItem(item({ questionHash: "qchanged" }))).toBeNull();
    expect(resolveReviewItem(item({ lessonId: "no-such-lesson" }))).toBeNull();
    expect(resolveReviewItem(item({ quizIndex: "99" }))).toBeNull();
    expect(resolveReviewItem(item({ courseId: "numpy-py" }))).toBeNull();
  });
});

describe("ReviewPage", () => {
  it("asks signed-out learners to sign in", () => {
    global.fetch = jest.fn();
    render(<ReviewPage />);
    expect(screen.getByText(/Sign in to see the questions/)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows due questions, records the answer and drops changed ones", async () => {
    mockAuth = { token: "tok", isAuthenticated: true };
    const stale = item({ id: "b".repeat(24), questionHash: "qchanged" });
    global.fetch = jest.fn((url) => {
      const path = new URL(url).pathname;
      if (path.endsWith("/review/due")) return respond(200, { items: [item(), stale] });
      return respond(200, { accepted: true, item: {} });
    });

    render(<ReviewPage />);
    expect(await screen.findByText(/Question 1 of 1/)).toBeInTheDocument();
    expect(calls("GET")[0].search).toBe(
      `?courseId=${encodeURIComponent(REVIEW_COURSE_IDS.join(","))}`,
    );
    await waitFor(() =>
      expect(calls("POST").map((c) => c.path)).toContain(
        `/api/auth/learn/review/${stale.id}/dismiss`,
      ),
    );

    const wrongIndex = QUIZ_0.answer === 0 ? 1 : 0;
    const wrongLabel = `${String.fromCharCode(65 + wrongIndex)}.`;
    fireEvent.click(
      screen.getAllByRole("button").find((b) => b.textContent.startsWith(wrongLabel)),
    );

    expect(await screen.findByText(/come back in 7 days/)).toBeInTheDocument();
    await waitFor(() =>
      expect(calls("POST")).toContainEqual({
        path: `/api/auth/learn/review/${item().id}/answer`,
        search: "",
        body: { correct: false },
      }),
    );
    expect(screen.getByText("Re-read the lesson")).toHaveAttribute(
      "href",
      `/learn/sql-joins/lesson/${LESSON.id}`,
    );

    fireEvent.click(screen.getByText("Finish"));
    expect(screen.getByText("Review done for today")).toBeInTheDocument();
    expect(screen.getByText(/0 of 1 right/)).toBeInTheDocument();
  });

  it("shows an empty state when nothing is due", async () => {
    mockAuth = { token: "tok", isAuthenticated: true };
    global.fetch = jest.fn(() => respond(200, { items: [] }));
    render(<ReviewPage />);
    expect(await screen.findByText(/Nothing to review today/)).toBeInTheDocument();
  });
});

describe("useLessonQuizAttempts", () => {
  let record;
  function Probe() {
    record = useLessonQuizAttempts("sqljoins", LESSON.id, LESSON).recordAttempt;
    return null;
  }

  it("saves the question fingerprint with the answer", async () => {
    mockAuth = { token: "tok", isAuthenticated: true };
    // CRA resets mock implementations before each test.
    mockUpsert.mockImplementation(() => Promise.resolve({}));
    render(<Probe />);
    act(() => record(0, 1, false));
    await waitFor(() => expect(mockUpsert).toHaveBeenCalled());
    const [, courseId, payload] = mockUpsert.mock.calls[0];
    expect(courseId).toBe("sql-joins");
    expect(payload.quizAttempts["0"]).toMatchObject({
      selectedIndex: 1,
      correct: false,
      questionHash: quizFingerprint(QUIZ_0),
    });
  });
});
