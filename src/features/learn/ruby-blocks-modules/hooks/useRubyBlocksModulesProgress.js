import useCourseProgress from "../../shared/useCourseProgress";

export default function useRubyBlocksModulesProgress() {
  return useCourseProgress({
    courseId: "ruby-blocks-modules",
    storagePrefix: "ruby_blocks_modules",
    scoped: true,
    supportsNotes: false,
  });
}
