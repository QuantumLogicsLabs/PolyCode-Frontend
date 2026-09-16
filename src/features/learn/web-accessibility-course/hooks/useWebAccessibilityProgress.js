import useCourseProgress from "../../shared/useCourseProgress";

export default function useWebAccessibilityProgress() {
  return useCourseProgress({
    courseId: "web-accessibility",
    storagePrefix: "web-accessibility",
    scoped: false,
    supportsNotes: false,
  });
}
