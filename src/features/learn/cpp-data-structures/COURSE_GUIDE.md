# C++ Data Structures — Course Guide

## What is this course?

**C++ Data Structures** teaches data structures from the machine up: the
complexity budgets (time, space) and the CPU fetch–decode–execute–write-back
cycle behind "one operation", the linear vs non-linear taxonomy, then every
core structure implemented in C++ — arrays and dynamic arrays, all four
linked-list variants plus skip lists, stacks / queues / deques, hash tables
with collisions and indexing, binary trees / BST / AVL, min & max heaps,
graphs (directed/undirected, weighted/unweighted), and data compression
ending with Huffman encoding.

**Live URL:** `/learn/cpp-data-structures`

**Format:** every lesson has theory + quizzes **and** an in-browser C++
challenge with auto-checked tests. Most challenges are real compiled code;
a few concept lessons (linear vs non-linear, picking an adapter, index
choice, map choice) use `compileOptional` keyword checks. The Challenge tab
unlocks after **Mark as read** (which needs every quiz attempted); the
lesson completes when the challenge passes.

**Who it's for:** learners who know basic C++ (variables, functions,
pointers, `std::vector`) and want the structures and the reasons behind
them, not just the API.

---

## Chapters (9 chapters · 43 lessons)

1. **Complexity & the Machine Model** — time/space budgets, Big-O by
   reading loops, exact operation counts (f(n) → Big-O, triangular
   sums, verifying a derivation with a run-time counter), where
   log n / n log n come from (merge sort), the instruction cycle,
   memory hierarchy & locality, amortised cost.
2. **Linear vs Non-Linear · Arrays & Lists** — the taxonomy map, the List
   ADT & static arrays, heap pointer discipline (null / dangling / wild,
   pointer arithmetic), jagged `T**` arrays and the Rule of Three,
   dynamic arrays / `vector` / amortised growth, choosing the backbone,
   templates for generic structures.
3. **Linked Lists** — nodes & `new`/`delete`, singly, doubly, circular,
   skip lists.
4. **Stacks, Queues, Deques** — LIFO stack, FIFO queue & ring buffer,
   deque, picking the adapter.
5. **Hashing: Tables, Maps, Collisions, Indexing** — hash functions,
   chaining vs open addressing, load factor & rehashing, hash vs ordered
   indexes, failure modes.
6. **Non-Linear: Trees** — binary trees & traversals, BST, AVL rotations,
   tree vs hash map.
7. **Non-Linear: Heaps & Priority Queues** — array-backed heap, sift
   up/down & build-heap, heapsort & top-k.
8. **Graphs** — vocabulary, adjacency list vs matrix, BFS & DFS, weights
   and Dijkstra.
9. **Data Compression & Huffman Encoding** — entropy & redundancy, RLE /
   LZ / delta, Huffman with a min-heap, decoding & the whole toolbox.

---

## Folder structure

```
cpp-data-structures/
├── COURSE_GUIDE.md
├── data/
│   ├── cppDataStructuresCurriculum.js   ← chapters, lessons, theory, quizzes, challenges
│   └── cppDataStructuresVideoLinks.js   ← YouTube URLs keyed by lesson id (currently empty)
├── hooks/
│   └── useCppDataStructuresProgress.js  ← wraps shared useCourseProgress
└── pages/
    ├── CppDataStructuresHub.jsx         ← course home page
    └── CppDataStructuresLessonPage.jsx  ← single lesson (Theory tab always; Challenge tab when the lesson has one)
```

There is no `components/` folder — the Challenge tab reuses
`../../oops-cpp/components/CodeChallenge`, exactly as `dsa-cpp` does.

---

## Quick tips for editors

1. Lesson ids follow `cpp-ds-<chapter>-<lesson>` (e.g. `cpp-ds-0-0`;
   lessons inserted later take a trailing letter, e.g. `cpp-ds-0-1b`) and
   must stay globally unique across all learn courses.
2. Edit lesson content in `data/cppDataStructuresCurriculum.js`. Every
   lesson object has `id`, `title`, `xp`, `chapterTitle`, `theory[]`, and
   optionally `challenge`.
3. `theory` block types in use: `objectives`, `text` (supports `**bold**`,
   `` `code` ``, `- ` bullet lists, and an attached `code` block),
   `callout` (`info` / `tip` / `warning` / `success`), `diagram`, `quiz`.
4. Adding a `challenge` to a lesson automatically shows the Challenge tab —
   no page change needed. Removing every `challenge` from a chapter is
   fine; the tab just hides.
5. Add YouTube URLs in `data/cppDataStructuresVideoLinks.js` keyed by
   lesson id — never edit the curriculum file for that.

---

## Wired up outside this folder

Listed here for reference if the course is renamed or moved:

1. **Routes** — `App.js` `LEARN_COURSE_ROUTES` array (`slug:
   "cpp-data-structures"`), which generates `/learn/cpp-data-structures`,
   `/learn/cpp-data-structures/lesson/:lessonId`, and the `/:lessonId`
   alias.
2. **Progress sync** — `frontend/src/features/learn/shared/courseRegistry.js`
   and `backend/src/modules/auth/constants/courseIds.js`
   (courseId `cpp-data-structures`, storagePrefix `cpp_data_structures`).
3. **Navigation & catalog** — `frontend/src/features/language/courseCatalog.js`:
   a card in `languageCourses.cpp` and `languageCourses["c++"]`, a link in
   `learnNavByLanguage.cpp` / `["c++"]`, and a `startsWith` line in
   `inferLanguageFromLearnPath`.

Run `node frontend/scripts/audit-learn-courses.mjs` — it must report
`PASS  cpp-data-structures`.
