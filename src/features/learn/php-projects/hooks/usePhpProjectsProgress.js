import useCourseProgress from "../../shared/useCourseProgress";

export default function usePhpProjectsProgress() {
  return useCourseProgress({
    courseId: "php-projects",
    storagePrefix: "php_projects",
    scoped: true,
    supportsNotes: false,
  });
}
