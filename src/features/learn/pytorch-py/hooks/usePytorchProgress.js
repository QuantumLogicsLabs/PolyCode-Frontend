import useCourseProgress from "../../shared/useCourseProgress";

export default function usePytorchProgress() {
  return useCourseProgress({
    courseId: "pytorch",
    storagePrefix: "pytorch",
    scoped: false,
    supportsNotes: false,
  });
}
