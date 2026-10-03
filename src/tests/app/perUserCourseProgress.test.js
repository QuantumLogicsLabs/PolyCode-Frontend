import { useEffect } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
  addCourseTime,
  completeCourseLesson,
  getCourseProgress,
  setLastCourseLesson,
  upsertLessonEngagement,
} from "../../features/learn/shared/courseProgressApi";
import { getCourseRegistryEntry } from "../../features/learn/shared/courseRegistry";
import { clearSharedLearnProgress } from "../../features/learn/shared/scopedProgressStorage";
import usePythonFundamentalsProgress from "../../features/learn/python-fundamentals/hooks/usePythonFundamentalsProgress";
import useLaravelBasicsProgress from "../../features/learn/laravel-basics/hooks/useLaravelBasicsProgress";
import usePhpFormsProgress from "../../features/learn/php-forms/hooks/usePhpFormsProgress";
import usePhpMysqlProgress from "../../features/learn/php-mysql/hooks/usePhpMysqlProgress";
import usePhpOopProgress from "../../features/learn/php-oop/hooks/usePhpOopProgress";
import usePhpProjectsProgress from "../../features/learn/php-projects/hooks/usePhpProjectsProgress";
import usePhpSessionsProgress from "../../features/learn/php-sessions/hooks/usePhpSessionsProgress";
import useRubyBlocksModulesProgress from "../../features/learn/ruby-blocks-modules/hooks/useRubyBlocksModulesProgress";

const SIGNED_IN = { user: { _id: "userA" }, isAuthenticated: true, token: "token-a", loading: false };
const SIGNED_OUT = { user: null, isAuthenticated: false, token: null, loading: false };
let mockAuth = SIGNED_IN;
jest.mock("../../features/auth/context/AuthContext", () => ({
  useAuth: () => mockAuth,
}));
jest.mock("../../features/learn/shared/recordLessonXp", () => ({
  recordLessonXp: jest.fn(),
}));
jest.mock("../../features/learn/shared/courseProgressApi", () => ({
  ...jest.requireActual("../../features/learn/shared/courseProgressApi"),
  getCourseProgress: jest.fn(),
  completeCourseLesson: jest.fn(),
  upsertLessonEngagement: jest.fn(),
  setLastCourseLesson: jest.fn(),
  addCourseTime: jest.fn(),
}));

const EMPTY = { completedLessons: [], savedCode: [], bookmarks: [], notes: [] };

// These courses used to keep ticks and code only in shared browser keys.
const COURSES = [
  ["laravel-basics", "laravel_basics", useLaravelBasicsProgress],
  ["php-forms", "php_forms", usePhpFormsProgress],
  ["php-mysql", "php_mysql", usePhpMysqlProgress],
  ["php-oop", "php_oop", usePhpOopProgress],
  ["php-projects", "php_projects", usePhpProjectsProgress],
  ["php-sessions", "php_sessions", usePhpSessionsProgress],
  ["ruby-blocks-modules", "ruby_blocks_modules", useRubyBlocksModulesProgress],
];

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("token", "token-a");
  mockAuth = SIGNED_IN;
  // Keep the initial load pending so only completeLesson's response is applied.
  getCourseProgress.mockReturnValue(new Promise(() => {}));
  completeCourseLesson.mockImplementation((token, courseId, lesson) =>
    Promise.resolve({
      ...EMPTY,
      completedLessons: [{ lessonId: lesson.lessonId, xp: lesson.xp }],
      lastLessonId: lesson.lessonId,
    }),
  );
  upsertLessonEngagement.mockResolvedValue({});
  setLastCourseLesson.mockResolvedValue(EMPTY);
  addCourseTime.mockResolvedValue(EMPTY);
});

test.each(COURSES)(
  "%s saves progress to the server and under the signed-in user's own key",
  async (courseId, prefix, useProgress) => {
    expect(getCourseRegistryEntry(courseId)).toMatchObject({ storagePrefix: prefix, scoped: true });

    const { result } = renderHook(() => useProgress());
    await act(async () => {
      await result.current.completeLesson({ id: "lesson-1", xp: 10 });
    });

    expect(completeCourseLesson).toHaveBeenCalledWith(
      "token-a",
      courseId,
      expect.objectContaining({ lessonId: "lesson-1" }),
    );
    expect(JSON.parse(localStorage.getItem(`${prefix}_progress:userA`))).toHaveProperty("lesson-1");
    expect(localStorage.getItem(`${prefix}_progress`)).toBeNull();
    expect(result.current.completedMap).toHaveProperty("lesson-1");
  },
);

describe("useCourseProgress after sign-out", () => {
  test("ignores a save response that lands after the learner signed out", async () => {
    let resolveSave;
    completeCourseLesson.mockReturnValue(new Promise((resolve) => { resolveSave = resolve; }));
    const { result } = renderHook(() => usePythonFundamentalsProgress());

    let pending;
    act(() => {
      pending = result.current.completeLesson({ id: "py-0", xp: 10 });
    });
    // Sign out while /complete is still in flight.
    localStorage.removeItem("token");
    clearSharedLearnProgress();
    await act(async () => {
      resolveSave({ ...EMPTY, completedLessons: [{ lessonId: "py-0" }], savedCode: [{ lessonId: "py-0", code: "secret" }] });
      await pending;
    });

    expect(localStorage.getItem("python_fundamentals_progress")).toBeNull();
    expect(localStorage.getItem("python_fundamentals_saved_code")).toBeNull();
  });

  test("ignores a last-lesson response that lands after the learner signed out", async () => {
    let resolveLast;
    setLastCourseLesson.mockReturnValue(new Promise((resolve) => { resolveLast = resolve; }));
    const { result } = renderHook(() => usePythonFundamentalsProgress());

    let pending;
    act(() => {
      pending = result.current.rememberLesson("py-1");
    });
    localStorage.removeItem("token");
    clearSharedLearnProgress();
    await act(async () => {
      resolveLast({ ...EMPTY, lastLessonId: "py-1" });
      await pending;
    });

    expect(localStorage.getItem("python_fundamentals_last_lesson")).toBeNull();
  });

  test("does not save the previous account's last lesson as guest progress", () => {
    const { rerender } = renderHook(() => {
      const { rememberLesson } = usePythonFundamentalsProgress();
      useEffect(() => { rememberLesson("py-1"); }, [rememberLesson]);
    });
    localStorage.clear();
    mockAuth = SIGNED_OUT;
    rerender();

    expect(localStorage.getItem("python_fundamentals_last_lesson")).toBeNull();
  });
});

test("opening a lesson saves last-lesson once, not in a loop", async () => {
  setLastCourseLesson.mockImplementation(() =>
    Promise.resolve({ ...EMPTY, completedLessons: [{ lessonId: "py-0" }], lastLessonId: "py-1" }),
  );
  renderHook(() => {
    const { rememberLesson } = usePythonFundamentalsProgress();
    useEffect(() => { rememberLesson("py-1"); }, [rememberLesson]);
  });

  await waitFor(() => expect(setLastCourseLesson).toHaveBeenCalled());
  await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
  expect(setLastCourseLesson).toHaveBeenCalledTimes(1);
});
