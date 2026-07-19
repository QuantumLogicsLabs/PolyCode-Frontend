/**
 * Registry of learn courses that sync progress to MongoDB.
 * storagePrefix → localStorage keys: `${prefix}_progress`, `_saved_code`, etc.
 */
export const COURSE_PROGRESS_REGISTRY = [
  { courseId: "oops-cpp", storagePrefix: "oops", scoped: true, notes: false },
  { courseId: "pointers-cpp", storagePrefix: "pointers_cpp", scoped: true, notes: false },
  { courseId: "numpy-py", storagePrefix: "numpy_py", scoped: true, notes: false },
  { courseId: "pandas-py", storagePrefix: "pandas_py", scoped: true, notes: false },
  { courseId: "fastapi-py", storagePrefix: "fastapi_py", scoped: true, notes: false },
  { courseId: "pytorch-py", storagePrefix: "pytorch_py", scoped: true, notes: false },
  { courseId: "python-fundamentals", storagePrefix: "python_fundamentals", scoped: false, notes: false },
  { courseId: "python-oop-py", storagePrefix: "python_oop_py", scoped: false, notes: false },
  { courseId: "python-file-handling-py", storagePrefix: "python_file_handling_py", scoped: false, notes: false },
  { courseId: "matplotlib-py", storagePrefix: "matplotlib_py", scoped: false, notes: false },
  { courseId: "ai-ml-py", storagePrefix: "ai_ml_py", scoped: false, notes: false },
  { courseId: "cpp-fundamentals", storagePrefix: "cpp_fundamentals", scoped: false, notes: false },
  { courseId: "dsa-cpp", storagePrefix: "dsa_cpp", scoped: false, notes: false },
  { courseId: "c-fundamentals", storagePrefix: "c_fundamentals", scoped: false, notes: false },
  { courseId: "c-functions", storagePrefix: "c_functions", scoped: false, notes: false },
  { courseId: "c-pointers", storagePrefix: "c_pointers", scoped: false, notes: false },
  { courseId: "c-data-structures", storagePrefix: "c_data_structures", scoped: false, notes: false },
  { courseId: "c-memory-management", storagePrefix: "c_memory_management", scoped: false, notes: false },
  { courseId: "c-file-handling", storagePrefix: "c_file_handling", scoped: false, notes: false },
  { courseId: "c-projects", storagePrefix: "c_projects", scoped: false, notes: false },
  { courseId: "js-fundamentals", storagePrefix: "js_fundamentals", scoped: false, notes: false },
  { courseId: "js-dom", storagePrefix: "js_dom", scoped: false, notes: false },
  { courseId: "js-web-dev", storagePrefix: "js_web_dev", scoped: false, notes: false },
  { courseId: "js-oops", storagePrefix: "js_oops", scoped: false, notes: true },
  { courseId: "node-npm", storagePrefix: "node_npm", scoped: false, notes: false },
  { courseId: "html-css-foundation", storagePrefix: "html_css_foundation", scoped: false, notes: false },
  { courseId: "php-fundamentals", storagePrefix: "php_fundamentals", scoped: false, notes: false },
  { courseId: "ruby-fundamentals", storagePrefix: "ruby_fundamentals", scoped: false, notes: false },
  { courseId: "ruby-gems", storagePrefix: "ruby_gems", scoped: false, notes: false },
  { courseId: "csharp-fundamentals", storagePrefix: "csharp", scoped: false, notes: false },
  { courseId: "sql-fundamentals", storagePrefix: "sqlfundamentals", scoped: false, notes: false },
  { courseId: "sql-queries", storagePrefix: "sqlqueries", scoped: false, notes: false },
  { courseId: "sql-joins", storagePrefix: "sqljoins", scoped: false, notes: false },
  { courseId: "sql-subqueries", storagePrefix: "sqlsubqueries", scoped: false, notes: false },
  { courseId: "sql-aggregate-functions", storagePrefix: "sqlaggregatefunctions", scoped: false, notes: false },
  { courseId: "sql-views", storagePrefix: "sqlviews", scoped: false, notes: false },
  { courseId: "sql-indexes", storagePrefix: "sqlindexes", scoped: false, notes: false },
  { courseId: "sql-stored-procedures", storagePrefix: "sqlstoredprocedures", scoped: false, notes: false },
  { courseId: "sql-projects", storagePrefix: "sqlprojects", scoped: false, notes: false },
  { courseId: "go-fundamentals", storagePrefix: "go_fundamentals", scoped: false, notes: true },
  { courseId: "rust-fundamentals", storagePrefix: "rust_fundamentals", scoped: false, notes: true },
  { courseId: "java-fundamentals", storagePrefix: "java_fundamentals", scoped: false, notes: true },
  { courseId: "java-intermediate", storagePrefix: "java_intermediate", scoped: false, notes: true },
  { courseId: "java-advanced", storagePrefix: "java_advanced", scoped: false, notes: true },
  { courseId: "java-collections", storagePrefix: "java_collections", scoped: false, notes: true },
  { courseId: "java-exception", storagePrefix: "java_exception", scoped: false, notes: true },
  { courseId: "java-multithreading", storagePrefix: "java_multithreading", scoped: false, notes: true },
  { courseId: "java-jdbc", storagePrefix: "java_jdbc", scoped: false, notes: true },
  { courseId: "java-spring-boot", storagePrefix: "java_spring_boot", scoped: false, notes: true },
  { courseId: "java-projects", storagePrefix: "java_projects", scoped: false, notes: true },
  // ─── ADD QUANTUM COURSES ────────────────────────────────────────────────────
  { courseId: "quantum-computing-fundamentals", storagePrefix: "quantum_computing_fundamentals", scoped: false, notes: false },
  { courseId: "quantum-mechanics-for-programmers", storagePrefix: "quantum_mechanics_for_programmers", scoped: false, notes: false },
  { courseId: "quantum-algorithms", storagePrefix: "quantum_algorithms", scoped: false, notes: false },
  { courseId: "quantum-programming-projects", storagePrefix: "quantum_programming_projects", scoped: false, notes: false },
];

export function getCourseRegistryEntry(courseId) {
  return COURSE_PROGRESS_REGISTRY.find((c) => c.courseId === courseId) || null;
}

export function getCourseIdByStoragePrefix(storagePrefix) {
  const entry = COURSE_PROGRESS_REGISTRY.find(
    (c) => c.storagePrefix === storagePrefix,
  );
  return entry?.courseId || null;
}

export function storageKeysForPrefix(prefix) {
  return {
    progress: `${prefix}_progress`,
    savedCode: `${prefix}_saved_code`,
    bookmarks: `${prefix}_bookmarks`,
    lastLesson: `${prefix}_last_lesson`,
    notes: `${prefix}_notes`,
  };
}
