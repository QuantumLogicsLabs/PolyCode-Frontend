/**
 * The backend issues a certificate only when every lesson listed for the course
 * in scripts/certificates/courseLessons.json is complete. That file (and its
 * copy in PolyCode-Backend) is generated from the curriculum files, so this test
 * fails when a curriculum or hub changes without regenerating it:
 *
 *   node scripts/generate-certificate-courses.mjs --backend ../PolyCode-Backend
 */
import fs from "fs";
import path from "path";
import COURSE_LESSONS from "../../../scripts/certificates/courseLessons.json";
import COURSE_ROUTES from "../../features/learn/shared/certificateCourseRoutes.json";

const ROOT = path.resolve(__dirname, "..", "..", "..");
const LEARN_DIR = path.join(ROOT, "src", "features", "learn");
const SHARED_HUB_FILES = new Set(["CourseCertificate.jsx", "QuantumLanguageHub.jsx"]);
const REGENERATE =
  "regenerate with: node scripts/generate-certificate-courses.mjs --backend ../PolyCode-Backend";

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return /\.jsx?$/.test(entry.name) ? [full] : [];
  });
}

const rel = (file) => path.relative(ROOT, file).split(path.sep).join("/");
const courses = Object.entries(COURSE_LESSONS);

describe("certificate course lesson lists", () => {
  it("covers every hub that shows a certificate", () => {
    const hubs = listFiles(LEARN_DIR)
      .filter((file) => !SHARED_HUB_FILES.has(path.basename(file)))
      .filter((file) => {
        const src = fs.readFileSync(file, "utf8");
        return src.includes("<CourseCertificate") || src.includes("<QuantumLanguageHub");
      })
      .map(rel)
      .sort();
    const listed = courses.map(([, course]) => course.hub).sort();
    expect({ hubs: listed, hint: REGENERATE }).toEqual({ hubs, hint: REGENERATE });
  });

  it.each(courses)("%s matches its curriculum", (courseId, course) => {
    const [file, exportName] = course.source.split("#");
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const lessons = require(path.join(ROOT, file))[exportName];
    const actual = {
      lessonIds: lessons.map((lesson) => lesson.id),
      totalXp: lessons.reduce((sum, lesson) => sum + lesson.xp, 0),
    };
    expect({ ...actual, hint: REGENERATE }).toEqual({
      lessonIds: course.lessonIds,
      totalXp: course.totalXp,
      hint: REGENERATE,
    });

    const hubSource = fs.readFileSync(path.join(ROOT, course.hub), "utf8");
    expect(hubSource).toContain(`"${course.basePath}"`);
    expect(hubSource).toContain(exportName);

    // The hub's progress hook must report progress under this courseId.
    const hookDir = path.join(path.dirname(path.dirname(path.join(ROOT, course.hub))), "hooks");
    const hookSources = fs.existsSync(hookDir)
      ? fs.readdirSync(hookDir).map((name) => fs.readFileSync(path.join(hookDir, name), "utf8"))
      : [];
    expect(hookSources.some((src) => src.includes(`"${courseId}"`))).toBe(true);
  });

  it("maps each hub route to its course", () => {
    const expected = Object.fromEntries(
      courses.map(([courseId, course]) => [course.basePath, courseId]),
    );
    expect(COURSE_ROUTES).toEqual(expected);
  });
});
