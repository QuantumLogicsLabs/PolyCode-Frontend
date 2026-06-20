import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAssistant } from "../context/AssistantContext";

const COURSE_BY_PREFIX = [
  { prefix: "/learn/numpy-py", course: "NumPy", language: "Python" },
  { prefix: "/learn/pandas-py", course: "Pandas", language: "Python" },
  { prefix: "/learn/js-fundamentals", course: "JavaScript Fundamentals", language: "JavaScript" },
  { prefix: "/learn/oops-cpp", course: "OOP C++", language: "C++" },
  { prefix: "/learn/pointers-cpp", course: "Pointers C++", language: "C++" },
];

function resolveRouteContext(pathname) {
  if (pathname === "/select-language") {
    return { page: "landing", route: pathname };
  }

  for (const entry of COURSE_BY_PREFIX) {
    if (pathname.startsWith(entry.prefix)) {
      const isLesson = /\/lesson\/|\/[^/]+$/.test(
        pathname.replace(entry.prefix, ""),
      );
      return {
        page: isLesson && pathname !== entry.prefix ? "lesson-route" : "course-hub",
        route: pathname,
        course: entry.course,
        language: entry.language,
      };
    }
  }

  if (pathname.startsWith("/playground")) {
    return { page: "playground", route: pathname, language: null, course: null };
  }
  if (pathname.startsWith("/daily-challenge")) {
    return {
      page: "daily-challenge",
      route: pathname,
      language: null,
      course: null,
    };
  }
  if (pathname.startsWith("/hub") || pathname.startsWith("/docs")) {
    return { page: "docs", route: pathname, language: null, course: null };
  }
  if (pathname.startsWith("/profile") || /^\/@[^/]+$/.test(pathname)) {
    return { page: "profile", route: pathname, language: null, course: null };
  }
  if (pathname.startsWith("/language/")) {
    return { page: "language-hub", route: pathname, language: null, course: null };
  }

  return { page: "general", route: pathname, language: null, course: null };
}

/** Syncs URL → assistant route context on every navigation. */
export function useRouteAssistantContext() {
  const { pathname } = useLocation();
  const { setRouteContext } = useAssistant();

  useEffect(() => {
    setRouteContext(resolveRouteContext(pathname));
  }, [pathname, setRouteContext]);
}
