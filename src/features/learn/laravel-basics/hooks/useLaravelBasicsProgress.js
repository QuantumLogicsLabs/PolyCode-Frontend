import useCourseProgress from "../../shared/useCourseProgress";

export default function useLaravelBasicsProgress() {
  return useCourseProgress({
    courseId: "laravel-basics",
    storagePrefix: "laravel_basics",
    scoped: true,
    supportsNotes: false,
  });
}
