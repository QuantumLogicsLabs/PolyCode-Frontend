import useCourseProgress from "../../shared/useCourseProgress";

export default function usePowershellScriptingProgress() {
  return useCourseProgress({
    courseId: "powershell-scripting",
    storagePrefix: "powershellscripting",
    scoped: false,
    supportsNotes: false,
  });
}
