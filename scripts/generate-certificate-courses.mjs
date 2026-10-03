/**
 * Generate the per-course lesson lists the backend uses to decide whether a
 * learner has completed a course and may be issued a certificate.
 *
 * Usage:
 *   node scripts/generate-certificate-courses.mjs [--backend <PolyCode-Backend dir>]
 *
 * Every course hub that renders <CourseCertificate> (directly, or through
 * QuantumLanguageHub) is read to find:
 *   - courseId:  from the hub's progress hook (the id sent to the backend)
 *   - name:      the courseName shown on the certificate
 *   - basePath:  the hub's route
 *   - lessonIds: ids of the *_LESSONS array the hub counts towards completion
 *   - totalXp:   sum of those lessons' xp (the XP printed on the certificate)
 *
 * Writes scripts/certificates/courseLessons.json, and with --backend the same
 * file to <backend>/src/modules/certificates/data/courseLessons.json.
 * Also writes src/features/learn/shared/certificateCourseRoutes.json (hub route
 * → courseId), which CourseCertificate uses to know which course it is on.
 * Anything it cannot parse is an error, so a new hub never silently drops out.
 */
import fs from "fs";
import path from "path";
import { register } from "module";
import { fileURLToPath, pathToFileURL } from "url";

register("./certificates/resolve-extensions.mjs", import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LEARN_DIR = path.join(ROOT, "src", "features", "learn");
const OUT_FILE = path.join(__dirname, "certificates", "courseLessons.json");
const ROUTES_FILE = path.join(LEARN_DIR, "shared", "certificateCourseRoutes.json");
const BACKEND_REL = path.join("src", "modules", "certificates", "data", "courseLessons.json");
const SHARED_HUB_FILES = new Set(["CourseCertificate.jsx", "QuantumLanguageHub.jsx"]);

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return /\.jsx?$/.test(entry.name) ? [full] : [];
  });
}

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function fail(file, message) {
  throw new Error(`${rel(file)}: ${message}`);
}

function resolveSource(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  for (const suffix of ["", ".js", ".jsx", "/index.js"]) {
    const candidate = base + suffix;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** Find where `name` is imported from: { file, exportName } (exportName "default" for default imports). */
function findImport(file, src, name) {
  for (const m of src.matchAll(/import\s+([\s\S]*?)\s+from\s+["']([^"']+)["']/g)) {
    const clause = m[1];
    const named = clause.match(/\{([\s\S]*)\}/);
    if (named) {
      for (const part of named[1].split(",")) {
        const [exported, local = exported] = part.trim().split(/\s+as\s+/);
        if (local === name) return { file: resolveSource(file, m[2]), exportName: exported };
      }
    }
    const defaultName = clause.replace(/\{[\s\S]*\}/, "").replace(/,/g, "").trim();
    if (defaultName === name) return { file: resolveSource(file, m[2]), exportName: "default" };
  }
  fail(file, `cannot find the import for ${name}`);
}

/** The course id a progress hook sends to the backend. */
function readHookCourseId(hookFile) {
  const src = fs.readFileSync(hookFile, "utf8");
  const ids = new Set([
    ...[...src.matchAll(/courseId:\s*["']([^"']+)["']/g)].map((m) => m[1]),
    ...[...src.matchAll(/recordLessonXp\(\s*\w+\s*,\s*["']([^"']+)["']/g)].map((m) => m[1]),
  ]);
  if (ids.size !== 1) fail(hookFile, `expected one course id, found ${JSON.stringify([...ids])}`);
  return [...ids][0];
}

function hookCourseId(file, src, hookName) {
  const hook = findImport(file, src, hookName);
  if (!hook.file) fail(file, `cannot resolve the file for ${hookName}`);
  return readHookCourseId(hook.file);
}

/** A hub that renders <CourseCertificate courseName="…" totalLessons={X_LESSONS.length} />. */
function parseCertificateHub(file, src) {
  const tag = src.slice(src.indexOf("<CourseCertificate"));
  const name = tag.match(/courseName="([^"]+)"/)?.[1];
  const lessonsVar = tag.match(/totalLessons=\{(\w+)\.length\}/)?.[1];
  const basePath = src.match(/BASE_PATH\s*=\s*["']([^"']+)["']/)?.[1];
  const hookName = src.match(/\b(use\w+Progress)\(\)/)?.[1];
  if (!name) fail(file, "courseName is not a string literal");
  if (!lessonsVar) fail(file, "totalLessons is not {X_LESSONS.length}");
  if (!basePath) fail(file, "no BASE_PATH constant");
  if (!hookName) fail(file, "no use…Progress() hook call");
  return { name, basePath, lessonsVar, courseId: hookCourseId(file, src, hookName) };
}

/** A hub that renders <QuantumLanguageHub config={{ title, basePath, lessons, useProgress }} />. */
function parseQuantumHub(file, src) {
  const config = src.match(/const config\s*=\s*\{([\s\S]*?)\};/)?.[1] || "";
  const name = config.match(/title:\s*"([^"]+)"/)?.[1];
  const basePath = config.match(/basePath:\s*"([^"]+)"/)?.[1];
  const lessonsVar = config.match(/lessons:\s*(\w+)/)?.[1];
  const hookName = config.match(/useProgress:\s*(\w+)/)?.[1];
  if (!name || !basePath || !lessonsVar || !hookName) {
    fail(file, "config needs literal title and basePath, plus lessons and useProgress");
  }
  return { name, basePath, lessonsVar, courseId: hookCourseId(file, src, hookName) };
}

async function readLessons(file, src, lessonsVar) {
  const source = findImport(file, src, lessonsVar);
  if (!source.file) fail(file, `cannot resolve the file for ${lessonsVar}`);
  const mod = await import(pathToFileURL(source.file).href);
  const lessons = mod[source.exportName];
  if (!Array.isArray(lessons) || !lessons.length) {
    fail(source.file, `${source.exportName} is not a non-empty array`);
  }
  const ids = lessons.map((lesson) => lesson?.id);
  if (ids.some((id) => typeof id !== "string" || !id)) fail(source.file, "a lesson has no string id");
  if (new Set(ids).size !== ids.length) fail(source.file, "duplicate lesson ids");
  const badXp = lessons.find((lesson) => !(Number.isFinite(lesson.xp) && lesson.xp >= 0));
  if (badXp) fail(source.file, `lesson ${badXp.id} has no numeric xp`);
  return {
    ids,
    totalXp: lessons.reduce((sum, lesson) => sum + lesson.xp, 0),
    source: `${rel(source.file)}#${source.exportName}`,
  };
}

export async function collectCertificateCourses() {
  const courses = {};
  for (const file of listFiles(LEARN_DIR)) {
    if (SHARED_HUB_FILES.has(path.basename(file))) continue;
    const src = fs.readFileSync(file, "utf8");
    let hub;
    if (src.includes("<CourseCertificate")) hub = parseCertificateHub(file, src);
    else if (src.includes("<QuantumLanguageHub")) hub = parseQuantumHub(file, src);
    else continue;

    if (courses[hub.courseId]) fail(file, `course id ${hub.courseId} is used by another hub too`);
    const { ids, totalXp, source } = await readLessons(file, src, hub.lessonsVar);
    courses[hub.courseId] = {
      name: hub.name,
      basePath: hub.basePath,
      hub: rel(file),
      source,
      totalXp,
      lessonIds: ids,
    };
  }

  const sorted = {};
  for (const id of Object.keys(courses).sort()) sorted[id] = courses[id];
  return sorted;
}

/** Hub route → courseId, for the routes CourseCertificate is rendered on. */
export function courseRoutes(courses) {
  const routes = {};
  for (const [courseId, course] of Object.entries(courses)) {
    if (routes[course.basePath]) {
      throw new Error(`${course.basePath} is the route of ${routes[course.basePath]} and ${courseId}`);
    }
    routes[course.basePath] = courseId;
  }
  return routes;
}

async function main() {
  const args = process.argv.slice(2);
  const backendIndex = args.indexOf("--backend");
  const backendDir = backendIndex >= 0 ? args[backendIndex + 1] : null;
  if (backendIndex >= 0 && !backendDir) throw new Error("--backend needs a directory");

  const courses = await collectCertificateCourses();
  const json = `${JSON.stringify(courses, null, 2)}\n`;
  const targets = [
    [OUT_FILE, json],
    [ROUTES_FILE, `${JSON.stringify(courseRoutes(courses), null, 2)}\n`],
  ];
  if (backendDir) targets.push([path.resolve(backendDir, BACKEND_REL), json]);
  for (const [target, content] of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
    console.log(`Wrote ${target}`);
  }
  const lessonCount = Object.values(courses).reduce((n, c) => n + c.lessonIds.length, 0);
  console.log(`${Object.keys(courses).length} courses, ${lessonCount} lessons`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
