import useCourseProgress from "../../shared/useCourseProgress";

export default function usePhpOopProgress() {
  return useCourseProgress({
    courseId: "php-oop",
    storagePrefix: "php_oop",
    scoped: true,
    supportsNotes: false,
  });
}
