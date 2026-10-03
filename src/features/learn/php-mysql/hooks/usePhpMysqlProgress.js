import useCourseProgress from "../../shared/useCourseProgress";

export default function usePhpMysqlProgress() {
  return useCourseProgress({
    courseId: "php-mysql",
    storagePrefix: "php_mysql",
    scoped: true,
    supportsNotes: false,
  });
}
