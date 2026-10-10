import { SQLFUNDAMENTALS_LESSONS } from "../sql-fundamentals/data/sqlFundamentalsCurriculum";
import { SQLQUERIES_LESSONS } from "../sql-queries/data/sqlQueriesCurriculum";
import { SQLJOINS_LESSONS } from "../sql-joins/data/sqlJoinsCurriculum";
import { SQLAGGREGATEFUNCTIONS_LESSONS } from "../sql-aggregate-functions/data/sqlAggregateFunctionsCurriculum";
import { SQLSUBQUERIES_LESSONS } from "../sql-subqueries/data/sqlSubqueriesCurriculum";
import { SQLVIEWS_LESSONS } from "../sql-views/data/sqlViewsCurriculum";
import { SQLINDEXES_LESSONS } from "../sql-indexes/data/sqlIndexesCurriculum";
import { SQLSTOREDPROCEDURES_LESSONS } from "../sql-stored-procedures/data/sqlStoredProceduresCurriculum";
import { SQLPROJECTS_LESSONS } from "../sql-projects/data/sqlProjectsCurriculum";
import { getLessonQuizBlocks, quizFingerprint } from "../shared/lessonQuizUtils";

/**
 * Lessons for each course in REVIEW_COURSE_IDS: the same lessons its lesson
 * page renders, so quiz indices point at the same questions.
 */
export const REVIEW_COURSES = [
  { courseId: "sql-fundamentals", title: "SQL Fundamentals", lessons: SQLFUNDAMENTALS_LESSONS },
  { courseId: "sql-queries", title: "SQL Queries", lessons: SQLQUERIES_LESSONS },
  { courseId: "sql-joins", title: "SQL Joins", lessons: SQLJOINS_LESSONS },
  { courseId: "sql-aggregate-functions", title: "SQL Aggregate Functions", lessons: SQLAGGREGATEFUNCTIONS_LESSONS },
  { courseId: "sql-subqueries", title: "SQL Subqueries", lessons: SQLSUBQUERIES_LESSONS },
  { courseId: "sql-views", title: "SQL Views", lessons: SQLVIEWS_LESSONS },
  { courseId: "sql-indexes", title: "SQL Indexes", lessons: SQLINDEXES_LESSONS },
  { courseId: "sql-stored-procedures", title: "SQL Stored Procedures", lessons: SQLSTOREDPROCEDURES_LESSONS },
  { courseId: "sql-projects", title: "SQL Projects", lessons: SQLPROJECTS_LESSONS },
];

/**
 * Finds the question a review item points at. Returns null when the lesson or
 * question is gone, or when the question was rewritten since it was missed
 * (fingerprint mismatch). Items saved before fingerprints existed have an
 * empty `questionHash` and are shown as long as the question exists.
 */
export function resolveReviewItem(item, courses = REVIEW_COURSES) {
  const course = courses.find((entry) => entry.courseId === item?.courseId);
  const lesson = course?.lessons.find((entry) => entry.id === item.lessonId);
  if (!lesson) return null;

  const block = getLessonQuizBlocks(lesson)[Number(item.quizIndex)];
  if (!block?.options?.length) return null;
  if (item.questionHash && item.questionHash !== quizFingerprint(block)) return null;

  return {
    item,
    block,
    courseTitle: course.title,
    lessonTitle: lesson.title,
    lessonPath: `/learn/${course.courseId}/lesson/${lesson.id}`,
  };
}
