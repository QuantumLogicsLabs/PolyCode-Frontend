import useCourseProgress from "../../shared/useCourseProgress";

export default function usePowershellProjectsProgress() {
  return useCourseProgress({
    courseId: "powershell-projects",
    storagePrefix: "powershellprojects",
    scoped: false,
    supportsNotes: false,
  });
}
