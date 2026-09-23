#!/usr/bin/env node
/**
 * Audit every learn course for registry/hook/complete/xp/cert wiring.
 * Usage: node scripts/audit-learn-courses.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const learnRoot = path.join(frontendRoot, "src", "features", "learn");
const registryPath = path.join(learnRoot, "shared", "courseRegistry.js");
const backendCourseIdsCandidates = ["PolyCode-Backend", "backend"].map((dir) =>
  path.resolve(
    frontendRoot,
    "..",
    dir,
    "src",
    "modules",
    "auth",
    "constants",
    "courseIds.js",
  ),
);
const backendCourseIdsPath =
  backendCourseIdsCandidates.find((candidate) => fs.existsSync(candidate)) ??
  backendCourseIdsCandidates[0];

const PROFILE_FEATURED_TRACKS = [
  "oops-cpp",
  "pointers-cpp",
  "numpy-py",
  "pandas-py",
  "fastapi-py",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "shared" || entry.name === "node_modules") continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

function extractRegistryIds(src) {
  const ids = [];
  const re = /courseId:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) ids.push(m[1]);
  return ids;
}

function extractBackendIds(src) {
  const ids = [];
  const re = /"([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    if (
      m[1].includes("-") ||
      ["oops", "pointers"].some((p) => m[1].startsWith(p))
    ) {
      ids.push(m[1]);
    }
  }
  // Prefer COURSE_IDS array contents if present
  const block = src.match(/COURSE_IDS\s*=\s*\[([\s\S]*?)\]/);
  if (block) {
    const fromBlock = [];
    const idRe = /"([^"]+)"/g;
    let im;
    while ((im = idRe.exec(block[1]))) fromBlock.push(im[1]);
    if (fromBlock.length) return fromBlock;
  }
  return [...new Set(ids)];
}

function findCourseFolders() {
  const skip = new Set(["shared", "scripts", "node_modules"]);
  return fs
    .readdirSync(learnRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !skip.has(d.name))
    .map((d) => d.name)
    .sort();
}

function findHub(courseDir) {
  const pagesDirs = ["pages", "Pages"];
  for (const pd of pagesDirs) {
    const dir = path.join(courseDir, pd);
    if (!fs.existsSync(dir)) continue;
    const hubs = fs
      .readdirSync(dir)
      .filter((f) => /Hub\.jsx$/i.test(f))
      .map((f) => path.join(dir, f));
    if (hubs.length) return hubs[0];
  }
  return null;
}

function findHook(courseDir) {
  const hooksDirs = ["hooks", "Hooks"];
  for (const hd of hooksDirs) {
    const dir = path.join(courseDir, hd);
    if (!fs.existsSync(dir)) continue;
    const files = walk(dir).filter((f) => /\.(js|jsx)$/.test(f));
    for (const f of files) {
      const src = read(f);
      if (src.includes("useCourseProgress")) return f;
    }
  }
  return null;
}

function findLessonPages(courseDir) {
  const pagesDirs = ["pages", "Pages"];
  const out = [];
  for (const pd of pagesDirs) {
    const dir = path.join(courseDir, pd);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (/Lesson.*\.jsx$/i.test(f) || /LessonPage\.jsx$/i.test(f)) {
        out.push(path.join(dir, f));
      }
    }
  }
  return out;
}

function findCurriculum(courseDir) {
  const dataDir = path.join(courseDir, "data");
  if (!fs.existsSync(dataDir)) return null;
  const files = fs.readdirSync(dataDir).filter((f) => /Curriculum\.js$/i.test(f));
  return files.length ? path.join(dataDir, files[0]) : null;
}

function courseIdFromFolder(folderName, registryIds, hookSrc) {
  const fromHook = hookSrc?.match(/courseId:\s*"([^"]+)"/);
  if (fromHook) return fromHook[1];
  const normalized = folderName
    .replace(/^Js-Oops$/i, "js-oops")
    .replace(/^ai_ml-py$/i, "ai-ml-py")
    .toLowerCase()
    .replace(/_/g, "-");
  if (registryIds.includes(normalized)) return normalized;
  if (registryIds.includes(folderName)) return folderName;
  return normalized;
}

function analyzeXp(curriculumSrc) {
  if (!curriculumSrc) return { lessonCount: 0, zeroXp: 0, hasXp: false };
  const xpMatches = [...curriculumSrc.matchAll(/\bxp:\s*(\d+)/g)];
  const factoryXpMatches = [...curriculumSrc.matchAll(
    /lesson\([^\n]*?,\s*\d+,\s*\n?\s*\"/g,
  )];
  const definitionXpMatches = [...curriculumSrc.matchAll(
    /^\s*\["[a-z0-9-]+",\s*"[^"]+",\s*(\d+),/gm,
  )];
  const detectedXpMatches = definitionXpMatches.length > xpMatches.length
    ? definitionXpMatches
    : xpMatches;
  if (factoryXpMatches.length > xpMatches.length) {
    return {
      lessonCount: factoryXpMatches.length,
      zeroXp: 0,
      hasXp: true,
    };
  }
  const lessonCount = detectedXpMatches.length;
  const zeroXp = detectedXpMatches.filter((m) => Number(m[1]) === 0).length;
  return {
    lessonCount,
    zeroXp,
    hasXp: lessonCount > 0 && zeroXp < lessonCount,
  };
}

const registrySrc = read(registryPath);
const registryIds = extractRegistryIds(registrySrc);
const backendIds = fs.existsSync(backendCourseIdsPath)
  ? extractBackendIds(read(backendCourseIdsPath))
  : [];

const folders = findCourseFolders();
const rows = [];
let failCount = 0;

for (const folder of folders) {
  const courseDir = path.join(learnRoot, folder);
  const hub = findHub(courseDir);
  const hook = findHook(courseDir);
  const hookSrc = hook ? read(hook) : "";
  const lessonPages = findLessonPages(courseDir);
  const curriculum = findCurriculum(courseDir);
  const curriculumSrc = curriculum ? read(curriculum) : "";
  const courseId = courseIdFromFolder(folder, registryIds, hookSrc);
  const hubSrc = hub ? read(hub) : "";

  const checks = {
    inRegistry: registryIds.includes(courseId),
    inBackend: !backendIds.length || backendIds.includes(courseId),
    hookUsesShared: Boolean(
      hookSrc &&
        hookSrc.includes("useCourseProgress") &&
        hookSrc.includes(`courseId: "${courseId}"`),
    ),
    completeWired:
      lessonPages.some((p) => {
        const src = read(p);
        return (
          src.includes("completeLesson") ||
          src.includes("onComplete") ||
          src.includes("markComplete")
        );
      }) ||
      walk(courseDir).some((f) => {
        if (!/\.(jsx|js)$/.test(f)) return false;
        if (/node_modules|Curriculum/i.test(f)) return false;
        const src = read(f);
        return (
          src.includes("completeLesson(") ||
          /onComplete=\{[^}]*completeLesson/.test(src) ||
          src.includes("completeLesson(lesson)")
        );
      }),
    curriculumXp: analyzeXp(curriculumSrc).hasXp,
    hubXpUi: Boolean(
      hubSrc &&
        (hubSrc.includes("earnedXP") || hubSrc.includes("earnedXp")) &&
        (hubSrc.includes("completedMap") ||
          hubSrc.includes("progress") ||
          hubSrc.includes("completedCount")),
    ),
    hubCertificate: Boolean(hubSrc && hubSrc.includes("CourseCertificate")),
    profileFeatured: PROFILE_FEATURED_TRACKS.includes(courseId),
  };

  const issues = [];
  if (!checks.inRegistry) issues.push("not in courseRegistry");
  if (!checks.inBackend) issues.push("not in backend COURSE_IDS");
  if (!hook) issues.push("missing progress hook");
  else if (!checks.hookUsesShared) issues.push("hook missing useCourseProgress/courseId");
  if (!checks.completeWired) issues.push("completeLesson not wired");
  if (!checks.curriculumXp) issues.push("curriculum xp missing/zero");
  if (!checks.hubXpUi) issues.push("hub XP UI missing");
  if (!checks.hubCertificate) issues.push("hub CourseCertificate missing");

  if (issues.length) failCount += 1;
  rows.push({ folder, courseId, checks, issues, hub, hook });
}

const width = 78;
console.log("=".repeat(width));
console.log("Learn courses audit");
console.log("=".repeat(width));
console.log(`Registry courses: ${registryIds.length}`);
console.log(`Backend COURSE_IDS: ${backendIds.length || "(not found)"}`);
console.log(`Course folders: ${folders.length}`);
console.log("");

for (const row of rows) {
  const status = row.issues.length === 0 ? "PASS" : "FAIL";
  console.log(
    `${status.padEnd(4)}  ${row.courseId.padEnd(28)}  ${
      row.issues.length ? row.issues.join("; ") : "ok"
    }`,
  );
}

console.log("");
console.log("-".repeat(width));
const missingCert = rows.filter((r) => !r.checks.hubCertificate);
const featured = rows.filter((r) => r.checks.profileFeatured);
console.log(`PASS: ${rows.length - failCount}`);
console.log(`FAIL: ${failCount}`);
console.log(`Missing hub certificate: ${missingCert.length}`);
console.log(
  `Profile featured tracks: ${featured.map((r) => r.courseId).join(", ")}`,
);

const registryOnly = registryIds.filter(
  (id) => !rows.some((r) => r.courseId === id),
);
const folderOnly = rows
  .map((r) => r.courseId)
  .filter((id) => !registryIds.includes(id));
if (registryOnly.length) {
  console.log(`Registry without folder match: ${registryOnly.join(", ")}`);
}
if (folderOnly.length) {
  console.log(`Folders without registry match: ${folderOnly.join(", ")}`);
}

process.exit(failCount ? 1 : 0);
