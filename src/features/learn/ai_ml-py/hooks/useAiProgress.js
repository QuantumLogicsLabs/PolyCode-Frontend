import useCourseProgress from "../../shared/useCourseProgress";

export default function useAiProgress() {
  return useCourseProgress({
    courseId: "ai-ml-py",
    storagePrefix: "ai_ml_py",
    scoped: false,
    supportsNotes: false,
  });
}
