import useCourseProgress from "../../shared/useCourseProgress";

export default function usePowershellAdministrationProgress() {
  return useCourseProgress({
    courseId: "powershell-administration",
    storagePrefix: "powershelladministration",
    scoped: false,
    supportsNotes: false,
  });
}
