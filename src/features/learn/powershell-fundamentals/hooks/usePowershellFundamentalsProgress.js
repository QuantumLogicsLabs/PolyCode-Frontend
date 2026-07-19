import useCourseProgress from "../../shared/useCourseProgress";

export default function usePowershellFundamentalsProgress() {
  return useCourseProgress({
    courseId: "powershell-fundamentals",
    storagePrefix: "powershellfundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
