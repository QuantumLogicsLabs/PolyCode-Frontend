import useCourseProgress from "../../shared/useCourseProgress";

export default function useMatplotlibProgress() {
  return useCourseProgress({
    courseId: "matplotlib-py",
    storagePrefix: "matplotlib_py",
    scoped: false,
    supportsNotes: false,
  });
}
