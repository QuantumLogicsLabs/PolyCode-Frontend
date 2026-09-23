import useCourseProgress from "../../shared/useCourseProgress";

export default function useSassScssProgress() {
  return useCourseProgress({
    courseId: "sass-scss",
    storagePrefix: "sass-scss",
    scoped: false,
    supportsNotes: false,
  });
}
