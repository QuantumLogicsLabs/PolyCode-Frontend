import useCourseProgress from "../../shared/useCourseProgress";

export default function usePhpSessionsProgress() {
  return useCourseProgress({
    courseId: "php-sessions",
    storagePrefix: "php_sessions",
    scoped: true,
    supportsNotes: false,
  });
}
