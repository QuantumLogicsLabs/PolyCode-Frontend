import useCourseProgress from "../../shared/useCourseProgress";

export default function usePhpFormsProgress() {
  return useCourseProgress({
    courseId: "php-forms",
    storagePrefix: "php_forms",
    scoped: true,
    supportsNotes: false,
  });
}
