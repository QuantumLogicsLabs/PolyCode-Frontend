import useCourseProgress from "../../shared/useCourseProgress";

export default function useCssModernFeaturesProgress() {
  return useCourseProgress({
    courseId: "css-modern-features",
    storagePrefix: "css-modern-features",
    scoped: false,
    supportsNotes: false,
  });
}
