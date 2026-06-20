import { languageCourses } from "../../language/courseCatalog";

/** Flattens every course across all languages into one list,
 *  de-duplicated by href, for use in Navbar + landing slider.
 *  Add a new course only in courseCatalog.js -> it appears here automatically. */
export const ALL_COURSES = Object.values(languageCourses)
  .flat()
  .reduce((acc, course) => {
    if (!acc.some((c) => c.href === course.href)) acc.push(course);
    return acc;
  }, []);
