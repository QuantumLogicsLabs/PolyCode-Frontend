import useCourseProgress from "../../shared/useCourseProgress";

export default function usePytorchProgress() {
  return useCourseProgress({
    courseId: "pytorch-py",
    storagePrefix: "pytorch_py",
    scoped: true,
    supportsNotes: false,
  });
}
