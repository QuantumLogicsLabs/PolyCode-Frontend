/**
 * Append an explicit second MCQ when a lesson has fewer than two quiz blocks.
 */
export function applySecondQuizzes(lessons, quizMap) {
  return lessons.map((lesson) => {
    const extra = quizMap[lesson.id];
    if (!extra) return lesson;

    const theory = lesson.theory || [];
    const quizCount = theory.filter((block) => block.type === "quiz").length;
    if (quizCount >= 2) return lesson;

    return {
      ...lesson,
      theory: [...theory, extra],
    };
  });
}
