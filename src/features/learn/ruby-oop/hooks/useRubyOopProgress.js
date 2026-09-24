import useCourseProgress from "../../shared/useCourseProgress";

export default function useRubyOopProgress() {
  return useCourseProgress({
    courseId: "ruby-oop",
    storagePrefix: "ruby_oop",
    scoped: false,
    supportsNotes: false,
  });
}
