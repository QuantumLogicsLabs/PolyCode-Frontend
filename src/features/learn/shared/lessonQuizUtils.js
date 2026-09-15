export const REQUIRED_QUIZ_COUNT = 2;

const OPTION_MAX_LEN = 110;
const MIN_OPTION_LEN = 14;
// Splits prose into sentences without breaking after "e.g." / "i.e." etc.
const SENTENCE_SPLIT = /(?<=[.!?])(?<!\b(?:e\.g|i\.e|etc|vs)\.)\s+/i;

export function quizAttemptsKey(storagePrefix, lessonId) {
  return `${storagePrefix}_quiz_attempts_${lessonId}`;
}

export function getSelectedIndex(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "object" && value.selectedIndex !== undefined) {
    return value.selectedIndex;
  }
  return null;
}

export function loadQuizAttempts(storagePrefix, lessonId) {
  if (!storagePrefix || !lessonId) return {};
  try {
    const raw = localStorage.getItem(quizAttemptsKey(storagePrefix, lessonId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function recordQuizAttempt(
  storagePrefix,
  lessonId,
  quizIndex,
  selectedOrPayload,
) {
  if (!storagePrefix || !lessonId) return;
  const key = quizAttemptsKey(storagePrefix, lessonId);
  const current = loadQuizAttempts(storagePrefix, lessonId);
  const payload =
    typeof selectedOrPayload === "object" && selectedOrPayload !== null
      ? selectedOrPayload
      : {
          selectedIndex: selectedOrPayload,
          correct: null,
          answeredAt: new Date().toISOString(),
        };
  current[String(quizIndex)] = payload;
  localStorage.setItem(key, JSON.stringify(current));
}

export function countAttemptedQuizzes(attempts = {}, quizCount = REQUIRED_QUIZ_COUNT) {
  let count = 0;
  for (let index = 0; index < quizCount; index += 1) {
    if (getSelectedIndex(attempts[String(index)]) !== null) count += 1;
  }
  return count;
}

export function countQuizBlocks(theory = []) {
  return theory.filter((block) => block.type === "quiz").length;
}

function stripMarkdown(text = "") {
  return String(text)
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Normalises whitespace but keeps `**` and backticks: LessonQuizSlider renders
// them as bold/code, and stripping them corrupts options like `int**` or
// `Dir['**/*']`. Use stripMarkdown only for comparisons and length checks.
function cleanOption(text = "") {
  return String(text).replace(/\s+/g, " ").trim();
}

// A cut can leave half a `code` or **bold** span behind; drop the dangling
// marker so the slider doesn't render a stray backtick or asterisks.
function dropDanglingMarkdown(text) {
  let out = text;
  if ((out.match(/`/g) || []).length % 2) {
    const last = out.lastIndexOf("`");
    out = out.slice(0, last) + out.slice(last + 1);
  }
  if ((out.match(/\*\*/g) || []).length % 2) {
    const last = out.lastIndexOf("**");
    out = out.slice(0, last) + out.slice(last + 2);
  }
  return out;
}

function truncateOption(text = "", max = OPTION_MAX_LEN) {
  const clean = cleanOption(text);
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1).trim();
  // Prefer ending on a sentence or clause break ("; " / dash) over a mid-phrase
  // "…" cut: a cut-off correct answer stands out next to short distractors and
  // gives the answer away. Abbreviations like "e.g." are not sentence ends.
  const boundaries = [
    ...[...slice.matchAll(/[.!?](?= )/g)]
      .filter((match) => !/\b(e\.g|i\.e|etc|vs|[A-Za-z])$/i.test(slice.slice(0, match.index)))
      .map((match) => slice.slice(0, match.index + 1)),
    ...[...slice.matchAll(/(;| [—–]) /g)].map((match) => slice.slice(0, match.index)),
  ].filter((text) => text.length >= max * 0.35);
  if (boundaries.length) {
    const longest = boundaries.reduce((a, b) => (b.length > a.length ? b : a));
    const sentence = dropDanglingMarkdown(longest.trim());
    if (stripMarkdown(sentence).length >= MIN_OPTION_LEN) return sentence;
  }
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > max * 0.6) {
    return `${dropDanglingMarkdown(slice.slice(0, lastSpace))}…`;
  }
  return `${dropDanglingMarkdown(slice)}…`;
}

function isUsableOption(text = "") {
  return stripMarkdown(text).length >= MIN_OPTION_LEN;
}

function hashString(value = "") {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

// mulberry32 PRNG — uses 32-bit integer math (Math.imul) so it never loses
// precision the way a plain `state * 1103515245` float product does.
function seededShuffle(items, seed) {
  const arr = [...items];
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let index = arr.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [arr[index], arr[swap]] = [arr[swap], arr[index]];
  }
  return arr;
}

function normalizeOption(text = "") {
  return stripMarkdown(text).toLowerCase();
}

function technicalDistractors(lang = "code") {
  const pools = {
    python: [
      "Raises a SyntaxError before the script runs",
      "Returns None and discards the computed result",
      "Converts every value to a string automatically",
      "Only works inside a Jupyter notebook, not in scripts",
    ],
    javascript: [
      "Throws before the event loop schedules the callback",
      "Mutates the DOM without selecting any element",
      "Returns undefined and stops the rest of the script",
      "Only runs in strict mode with a special compiler flag",
    ],
    cpp: [
      "Causes undefined behavior without a compile error",
      "Allocates on the stack but never initializes memory",
      "Deletes the object twice when scope ends",
      "Silently converts the pointer to an integer type",
    ],
    default: [
      "Produces no output and changes no program state",
      "Only works on the first line of the source file",
      "Requires a different library than the one in the lesson",
      "Fails at runtime because the symbol is undefined",
    ],
  };
  return pools[lang] || pools.default;
}
function genericDistractors(chapterTitle = "this topic") {
  return [
    `A technique that does not apply to ${chapterTitle}`,
    "Memorizing syntax without knowing when to use it",
    "Skipping the examples and going straight to the challenge",
    "Ignoring the warnings and edge cases from the lesson",
  ];
}

function inferLessonLang(ctx) {
  const langs = ctx.codeBlocks.map((block) => block.lang).filter(Boolean);
  if (langs.includes("python")) return "python";
  if (langs.includes("javascript")) return "javascript";
  if (langs.includes("cpp") || langs.includes("c")) return "cpp";
  return "default";
}

function getExistingQuizTexts(theory = []) {
  const texts = new Set();
  theory
    .filter((block) => block.type === "quiz")
    .forEach((block) => {
      if (block.question) texts.add(normalizeOption(block.question));
      const correct = block.options?.[block.answer];
      if (correct) texts.add(normalizeOption(correct));
    });
  return texts;
}

function buildShuffledQuiz({ question, correct, wrongPool, explanation, seed, lang }) {
  const cleanCorrect = truncateOption(correct);
  const techPool = technicalDistractors(lang);
  // Wrap truncateOption: passing it straight to map() would feed the array
  // index in as `max` and cut early pool entries down to a few characters.
  const wrong = [
    ...new Set(wrongPool.map((item) => truncateOption(item)).filter(isUsableOption)),
  ]
    .filter((option) => normalizeOption(option) !== normalizeOption(cleanCorrect))
    .slice(0, 6);

  let techIndex = 0;
  while (wrong.length < 3) {
    const filler = techPool[techIndex % techPool.length];
    techIndex += 1;
    if (isUsableOption(filler) && normalizeOption(filler) !== normalizeOption(cleanCorrect)) {
      wrong.push(filler);
      continue;
    }
    const generic = genericDistractors()[wrong.length % 4];
    if (isUsableOption(generic)) wrong.push(generic);
    else wrong.push("This option does not match the lesson content");
  }

  const options = seededShuffle([cleanCorrect, ...wrong.slice(0, 3)], seed);
  const answer = options.findIndex(
    (option) => normalizeOption(option) === normalizeOption(cleanCorrect),
  );

  return {
    question: question || "Quick check on this lesson",
    options: options.map((option) => option || "Review the lesson text"),
    answer: answer >= 0 ? answer : 0,
    explanation:
      explanation ||
      cleanCorrect ||
      "Review the lesson text above, then try the challenge.",
  };
}

function normalizeTableRow(row) {
  if (Array.isArray(row)) {
    return { label: row[0], values: row.slice(1) };
  }
  return {
    label: row?.label,
    values: row?.values || [],
  };
}

function sanitizeQuizBlock(quiz) {
  if (!quiz || quiz.type !== "quiz") return quiz;

  // Hand-written options are shown in full — cutting them with "…" made the
  // (usually longest) correct answer stand out. Generated options were already
  // shortened when they were built.
  const options = (Array.isArray(quiz.options) ? quiz.options : [])
    .map((option) => cleanOption(option) || "See the lesson above")
    .filter(Boolean);

  while (options.length < 4) {
    options.push(genericDistractors()[options.length % 4]);
  }

  let answer = Number.isInteger(quiz.answer) ? quiz.answer : 0;
  if (answer < 0 || answer >= options.length) answer = 0;

  let finalOptions = options.slice(0, 4);
  if (answer >= finalOptions.length) answer = 0;

  // Hand-written quizzes are authored with the answer in a predictable slot,
  // so shuffle them too. Generated quizzes are already shuffled. The seed is
  // derived from the question text so the order is stable across visits.
  if (!quiz._generated) {
    const order = seededShuffle(
      finalOptions.map((_, index) => index),
      hashString(`${quiz.question || ""}|${finalOptions.join("|")}`),
    );
    finalOptions = order.map((index) => finalOptions[index]);
    answer = order.indexOf(answer);
  }

  return {
    ...quiz,
    question: quiz.question || "Quick check on this lesson",
    options: finalOptions,
    answer,
    explanation:
      quiz.explanation ||
      finalOptions[answer] ||
      "Review the lesson text above, then try the challenge.",
  };
}

function extractCodeBlocks(theory = []) {
  const blocks = [];
  theory.forEach((block) => {
    if (block.type === "code" && block.content) {
      blocks.push({
        label: block.label || "code example",
        lang: block.lang || "code",
        content: block.content,
      });
    }
    if (block.type === "text" && block.code?.content) {
      blocks.push({
        label: block.code.label || "code example",
        lang: block.code.lang || "code",
        content: block.code.content,
      });
    }
  });
  return blocks;
}

// Keywords that are followed by "(" in some language (Go `import (`, C `if (`,
// PowerShell `foreach (` …) but are not function calls.
const NON_CALL_KEYWORDS = new Set([
  "if", "else", "elif", "for", "foreach", "while", "until", "do", "switch",
  "case", "catch", "return", "import", "func", "function", "typeof",
  "and", "or", "not", "in", "with", "using", "lock", "when", "match", "param",
  "unless", "select", "var", "const",
]);

function extractFunctionCalls(code = "") {
  const source = String(code);
  const matches = [...source.matchAll(/(\w+(?:\.\w+)*)\s*\(/g)];
  return [
    ...new Set(
      matches
        // A keyword called as a method (e.g. JS `promise.catch(`) is a real call.
        .filter(
          (match) =>
            source[match.index - 1] === "." ||
            !NON_CALL_KEYWORDS.has(match[1].toLowerCase()),
        )
        .map((match) => match[1]),
    ),
  ];
}

function extractImports(code = "") {
  const imports = [];
  
  // Handle "from X import Y" or "from X import Y as Z"
  const fromImportRe = /from\s+([\w.]+)\s+import\s+([^;\n]+)/g;
  let match = fromImportRe.exec(code);
  while (match) {
    const fromModule = match[1];
    const importList = match[2];
    const items = importList.split(",").map(s => s.trim());
    items.forEach(item => {
      const parts = item.split(/\s+as\s+/);
      const importedName = parts[0].trim();
      const alias = parts[1]?.trim() || importedName;
      imports.push({
        module: `${fromModule}.${importedName}`,
        alias: alias,
      });
    });
    match = fromImportRe.exec(code);
  }
  
  // Handle "import X" or "import X as Y"
  const importRe = /^import\s+([\w.]+)(?:\s+as\s+(\w+))?/gm;
  match = importRe.exec(code);
  while (match) {
    imports.push({
      module: match[1],
      alias: match[2] || match[1].split(".").pop(),
    });
    match = importRe.exec(code);
  }
  
  return imports;
}

function extractInlineCodes(theory = []) {
  const codes = new Set();
  const re = /`([^`\n]+)`/g;
  theory.forEach((block) => {
    const sources = [block.content, block.title].filter(Boolean);
    sources.forEach((source) => {
      let match = re.exec(source);
      while (match) {
        if (match[1].length >= 2) codes.add(match[1]);
        match = re.exec(source);
      }
    });
  });
  return [...codes];
}

function extractDefinitions(texts = []) {
  const defs = [];
  texts.forEach((text) => {
    const patterns = [
      /\*\*([^*]+)\*\*\s+is\s+(.+?)(?:[.!?]|$)/i,
      /\*\*([^*]+)\*\*\s+\([^)]+\)\s+is\s+(.+?)(?:[.!?]|$)/i,
      /The main thing\s+\*\*([^*]+)\*\*\s+gives you is\s+(.+?)(?:[.!?]|$)/i,
    ];
    patterns.forEach((pattern) => {
      const match = text.match(pattern);
      if (match) {
        defs.push({
          term: stripMarkdown(match[1]),
          definition: stripMarkdown(match[2]),
        });
      }
    });
  });
  return defs;
}

function describeApiCall(apiCall, corpus = "") {
  const hints = [
    {
      match: /\.show$/,
      description: "Display the current figure on screen",
    },
    {
      match: /\.plot$/,
      description: "Draw a line chart from x and y data",
    },
    {
      match: /\.scatter$/,
      description: "Plot individual points to examine correlation",
    },
    {
      match: /\.bar$/,
      description: "Draw bars for comparing categories",
    },
    {
      match: /\.hist$/,
      description: "Show the distribution of values in bins",
    },
    {
      match: /\.savefig$/,
      description: "Save the figure to an image file",
    },
    {
      match: /\.title$/,
      description: "Set the chart title",
    },
    {
      match: /\.xlabel$/,
      description: "Label the horizontal axis",
    },
    {
      match: /\.ylabel$/,
      description: "Label the vertical axis",
    },
    {
      match: /^np\.array$/,
      description: "Create a NumPy array from a sequence",
    },
    {
      match: /\.shape$/,
      description: "Return the dimensions of the array",
    },
    {
      match: /\.reshape$/,
      description: "Change the array shape without changing data",
    },
    {
      match: /\.read_csv$/,
      description: "Load a CSV file into a DataFrame",
    },
    {
      match: /\.head$/,
      description: "Return the first rows of a DataFrame",
    },
    {
      match: /console\.log$/,
      description: "Print a value to the console",
    },
    {
      match: /document\.querySelector$/,
      description: "Select the first matching element in the DOM",
    },
    {
      match: /addEventListener$/,
      description: "Attach an event handler to an element",
    },
    {
      match: /new\s+Promise|Promise$/,
      description: "Handle asynchronous operations",
    },
    {
      match: /malloc$/,
      description: "Allocate memory on the heap",
    },
    {
      match: /free$/,
      description: "Release previously allocated heap memory",
    },
    {
      match: /->/,
      description: "Access a member through a pointer",
    },
  ];

  const hint = hints.find((item) => item.match.test(apiCall));
  if (hint) return hint.description;

  // Only use a sentence of prose — a raw code line like `print(x())` is not a
  // description of what the call does.
  const corpusLine = corpus
    .split(/\n/)
    .find((line) => {
      const text = stripMarkdown(line);
      return (
        text.includes(apiCall) &&
        text.split(" ").length >= 5 &&
        !/^(#|\/\/|--|::|rem\b)/i.test(text) &&
        !/[;{}=]/.test(text) &&
        !/^[\w.$]+\s*\(/.test(text)
      );
    });
  if (corpusLine) return truncateOption(stripMarkdown(corpusLine), 96);

  // No real description available. Callers skip the call rather than use a
  // tautological "Calls x() as shown in the lesson" answer.
  return null;
}

function collectCorpusText(theory = []) {
  return theory
    .map((block) => {
      if (block.type === "text" && block.content) return block.content;
      if (block.type === "callout" && block.content) return block.content;
      if (block.type === "code" && block.content) return block.content;
      if (block.type === "diagram") {
        return (block.nodes || [])
          .flatMap((node) => [node.label, ...(node.items || [])])
          .join(" ");
      }
      return "";
    })
    .join("\n");
}

function extractLessonContext(lesson = {}, theory = []) {
  const objectivesBlock = theory.find((block) => block.type === "objectives");
  const objectives =
    lesson.outcomes?.length > 0
      ? lesson.outcomes
      : objectivesBlock?.items || [];

  const callouts = theory
    .filter((block) => block.type === "callout")
    .map((block) => ({
      variant: block.variant || "info",
      content: stripMarkdown(block.content),
      raw: block.content || "",
    }))
    .filter((block) => block.content);

  const texts = theory
    .filter((block) => block.type === "text" && block.content)
    .map((block) => stripMarkdown(block.content))
    .filter(Boolean);

  const rawTexts = theory
    .filter((block) => block.type === "text" && block.content)
    .map((block) => block.content);

  const tables = theory.filter((block) => block.type === "table");

  const diagrams = theory
    .filter((block) => block.type === "diagram" && block.nodes?.length)
    .map((block) => ({
      title: block.title || "diagram",
      nodes: block.nodes.map((node) => ({
        label: node.label,
        items: (node.items || []).map(stripMarkdown).filter(Boolean),
      })),
    }));

  const codeBlocks = extractCodeBlocks(theory);
  const imports = codeBlocks.flatMap((block) =>
    extractImports(block.content).map((item) => ({
      ...item,
      label: block.label,
    })),
  );
  const apiCalls = [
    ...new Set(codeBlocks.flatMap((block) => extractFunctionCalls(block.content))),
  ];
  const inlineCodes = extractInlineCodes(theory);
  const definitions = extractDefinitions([...texts, ...rawTexts.map(stripMarkdown)]);
  const corpus = collectCorpusText(theory);

  const challenge = lesson.challenge
    ? {
        title: lesson.challenge.title || "coding challenge",
        description: stripMarkdown(lesson.challenge.description || ""),
        tests: (lesson.challenge.tests || [])
          .map((test) => test.label)
          .filter(Boolean),
      }
    : null;

  return {
    title: lesson.title || "this lesson",
    chapter: lesson.chapterTitle || "this chapter",
    lessonId: lesson.id || lesson.title || "lesson",
    objectives,
    callouts,
    texts,
    tables,
    diagrams,
    codeBlocks,
    imports,
    apiCalls,
    inlineCodes,
    definitions,
    challenge,
    corpus,
  };
}

function quizOverlapsExisting(quiz, existingTexts) {
  if (!quiz) return true;
  const correct = quiz.options?.[quiz.answer];
  if (correct && existingTexts.has(normalizeOption(correct))) return true;
  if (quiz.question && existingTexts.has(normalizeOption(quiz.question))) return true;
  return false;
}

function buildFromDefinition(ctx, seed) {
  const def = ctx.definitions[seed % ctx.definitions.length];
  if (!def) return null;

  const wrongPool = [
    ...ctx.definitions
      .filter((item) => item.term !== def.term)
      .map((item) => item.definition),
    ...ctx.texts
      .filter((text) => !text.toLowerCase().includes(def.term.toLowerCase()))
      .map((text) => truncateOption(text.split(SENTENCE_SPLIT)[0], 96)),
    `A library unrelated to ${ctx.chapter}`,
  ];

  return buildShuffledQuiz({
    question: `According to **${ctx.title}**, what is **${def.term}**?`,
    correct: def.definition,
    wrongPool,
    explanation: `**${def.term}** — ${def.definition}`,
    seed,
  });
}

function buildFromImport(ctx, seed) {
  const imp = ctx.imports[seed % ctx.imports.length];
  if (!imp) return null;

  const wrongPool = [
    ...ctx.imports
      .filter((item) => item.alias !== imp.alias)
      .map((item) => item.module),
    "The standard library's root package only",
    "A random variable name with no module behind it",
    "An optional nickname that changes every run",
  ];

  return buildShuffledQuiz({
    question: `In the **${imp.label}** example, what does the alias \`${imp.alias}\` refer to?`,
    correct: imp.module,
    wrongPool,
    explanation: `\`${imp.alias}\` is shorthand for \`${imp.module}\` in this lesson.`,
    seed: seed + 1,
  });
}

function buildFromApiCall(ctx, seed) {
  const apiCall = ctx.apiCalls[seed % ctx.apiCalls.length];
  if (!apiCall) return null;

  const correct = describeApiCall(apiCall, ctx.corpus);
  if (!correct) return null;
  const wrongPool = [
    ...ctx.apiCalls
      .filter((call) => call !== apiCall)
      .map((call) => describeApiCall(call, ctx.corpus))
      .filter(Boolean),
    ...technicalDistractors(inferLessonLang(ctx)),
  ];

  return buildShuffledQuiz({
    question: `In **${ctx.title}**, what does \`${apiCall}()\` do?`,
    correct,
    wrongPool,
    explanation: `\`${apiCall}()\` — ${correct}`,
    seed: seed + 2,
    lang: inferLessonLang(ctx),
  });
}

function buildFromCodePresence(ctx, seed) {
  const block = ctx.codeBlocks[seed % ctx.codeBlocks.length];
  if (!block) return null;

  const calls = extractFunctionCalls(block.content);
  const target = calls[seed % (calls.length || 1)];
  if (!target) return null;

  const wrongPool = [
    ...calls.filter((call) => call !== target),
    ...ctx.apiCalls.filter((call) => call !== target),
    "A comment line the program ignores",
    "A variable assignment with no function call",
  ];

  return buildShuffledQuiz({
    question: `Which function call appears in the **${block.label}** example?`,
    correct: `${target}()`,
    // Only bare call names get "()" — not the sentence-style distractors.
    wrongPool: wrongPool.map((item) => (/^[\w.]+$/.test(item) ? `${item}()` : item)),
    explanation: `The **${block.label}** snippet uses \`${target}()\`.`,
    seed: seed + 3,
  });
}

function buildFromDiagram(ctx, seed) {
  const diagram = ctx.diagrams[seed % ctx.diagrams.length];
  if (!diagram) return null;

  const node = diagram.nodes[seed % diagram.nodes.length];
  if (!node?.items?.length) return null;

  const correct = node.items[seed % node.items.length];
  const wrongPool = [
    ...diagram.nodes
      .filter((item) => item.label !== node.label)
      .flatMap((item) => item.items),
    ...node.items.filter((item) => item !== correct),
    "None of the above — this node is not part of the lesson",
  ];

  return buildShuffledQuiz({
    question: `In **${diagram.title}**, which point belongs under **${node.label}**?`,
    correct,
    wrongPool,
    explanation: `**${node.label}** is tied to: ${correct}`,
    seed: seed + 4,
  });
}

function buildFromChallenge(ctx, seed) {
  if (!ctx.challenge?.tests?.length) return null;

  const test = ctx.challenge.tests[seed % ctx.challenge.tests.length];
  const wrongPool = [
    ...ctx.challenge.tests.filter((item) => item !== test),
    "Submit code that never uses what the lesson taught",
    "Skip the required function and only print a message",
    "Hard-code the expected output without using the lesson API",
  ];

  return buildShuffledQuiz({
    question: `For the **${ctx.challenge.title}** challenge, which requirement must your code satisfy?`,
    correct: test,
    wrongPool,
    explanation: `Your solution is checked for: **${test}**.`,
    seed: seed + 5,
  });
}

function buildFromInlineCode(ctx, seed) {
  const token = ctx.inlineCodes[seed % ctx.inlineCodes.length];
  if (!token || token.length < 2) return null;

  const corpusHit = ctx.corpus
    .split(/\n|\. /)
    .map(stripMarkdown)
    .find(
      (line) =>
        line.includes(token) &&
        line.length > token.length + 12 &&
        line.length < 160,
    );

  if (!corpusHit) return null;

  return buildShuffledQuiz({
    question: `What does the lesson say about \`${token}\`?`,
    correct: corpusHit,
    wrongPool: [
      ...ctx.texts
        .filter((text) => !text.includes(token))
        .map((text) => truncateOption(text.split(SENTENCE_SPLIT)[0], 96)),
      `\`${token}\` is never mentioned in this lesson`,
      `\`${token}\` is only used in the challenge, not in theory`,
    ],
    explanation: corpusHit,
    seed: seed + 6,
  });
}

function buildFromObjectives(ctx, seed) {
  if (!ctx.objectives.length) return null;

  const correct = ctx.objectives[seed % ctx.objectives.length];
  const wrongPool = [
    ...ctx.objectives.filter((item) => item !== correct),
    ...genericDistractors(ctx.chapter),
  ];

  return buildShuffledQuiz({
    question: `After **${ctx.title}**, which skill should you be able to demonstrate?`,
    correct,
    wrongPool,
    explanation: `This lesson targets: **${truncateOption(correct, 120)}**`,
    seed: seed + 7,
  });
}

function buildFromCallout(ctx, seed) {
  const callout = ctx.callouts[seed % ctx.callouts.length];
  if (!callout) return null;

  const labels = {
    warning: "Which caution does this lesson raise",
    tip: "Which best practice does this lesson recommend",
    info: "Which fact does this lesson highlight",
    success: "Which outcome does this lesson emphasize",
  };
  const lead = labels[callout.variant] || "Which key point does this lesson make";

  return buildShuffledQuiz({
    question: `${lead} about **${ctx.title}**?`,
    correct: callout.content,
    wrongPool: [
      ...ctx.callouts
        .filter((item) => item.content !== callout.content)
        .map((item) => item.content),
      ...genericDistractors(ctx.chapter),
    ],
    explanation: callout.content,
    seed: seed + 8,
  });
}

function buildFromTable(ctx, seed) {
  const table = ctx.tables[seed % ctx.tables.length];
  const rawRows = table?.rows || [];
  const rows = rawRows.map(normalizeTableRow).filter((row) => row.label);
  const row = rows[seed % (rows.length || 1)];
  if (!table || !row) return null;

  const correct = truncateOption(row.values?.[0] || row.label);
  const wrongPool = [
    ...rows
      .filter((item) => item !== row)
      .map((item) => item.values?.[0] || item.label),
    ...genericDistractors(ctx.chapter),
  ];

  return buildShuffledQuiz({
    question: `In **${ctx.title}**, what is associated with **${row.label}**?`,
    correct,
    wrongPool,
    explanation: `The lesson table links **${row.label}** to **${correct}**.`,
    seed: seed + 9,
  });
}

function buildFromConceptSentence(ctx, seed) {
  const candidates = ctx.texts
    .map((text) => {
      const sentence =
        text.split(SENTENCE_SPLIT).find((part) => part.length >= 40) || text;
      return truncateOption(sentence, 96);
    })
    .filter(isUsableOption);

  const correct = candidates[seed % candidates.length];
  if (!correct) return null;

  const wrongPool = [
    ...candidates.filter((item) => item !== correct),
    `This topic is unrelated to ${ctx.chapter}`,
    "You only need syntax recall, not the underlying idea",
    "The lesson does not define any concrete concept",
  ];

  return buildShuffledQuiz({
    question: `Which statement accurately describes a concept from **${ctx.title}**?`,
    correct,
    wrongPool,
    explanation: correct,
    seed: seed + 10,
  });
}

function buildTechnicalLastResort(ctx, slot, seed) {
  if (ctx.challenge?.description) {
    return buildShuffledQuiz({
      question: `What is the main task in the **${ctx.challenge.title}** challenge?`,
      correct: truncateOption(ctx.challenge.description, 96),
      wrongPool: [
        "Rewrite the lesson without using any code",
        "Memorize quiz answers without running examples",
        "Skip the required setup and hope the grader passes it",
      ],
      explanation: ctx.challenge.description,
      seed: seed + slot,
    });
  }

  if (ctx.codeBlocks.length) {
    const block = ctx.codeBlocks[slot % ctx.codeBlocks.length];
    const calls = extractFunctionCalls(block.content);
    if (calls.length) {
      return buildFromCodePresence(ctx, seed + slot);
    }
  }

  return buildFromConceptSentence(ctx, seed + slot);
}

function buildFallbackQuiz(lesson, theoryBlocks, slot) {
  const ctx = extractLessonContext(lesson, theoryBlocks);
  const existingTexts = getExistingQuizTexts(theoryBlocks);
  const seed = hashString(`${ctx.lessonId}:${slot}:${ctx.title}`);

  const builders = [
    () => buildFromDefinition(ctx, seed + slot),
    () => buildFromImport(ctx, seed + slot),
    () => buildFromApiCall(ctx, seed + slot),
    () => buildFromCodePresence(ctx, seed + slot),
    () => buildFromDiagram(ctx, seed + slot),
    () => buildFromChallenge(ctx, seed + slot),
    () => buildFromInlineCode(ctx, seed + slot),
    () => buildFromObjectives(ctx, seed + slot),
    () => buildFromCallout(ctx, seed + slot),
    () => buildFromTable(ctx, seed + slot),
    () => buildFromConceptSentence(ctx, seed + slot),
  ];

  const start = (seed + slot) % builders.length;
  for (let index = 0; index < builders.length; index += 1) {
    const quiz = builders[(start + index) % builders.length]();
    if (!quizOverlapsExisting(quiz, existingTexts)) {
      return sanitizeQuizBlock({ ...quiz, type: "quiz", _generated: true });
    }
  }

  return sanitizeQuizBlock({
    ...buildTechnicalLastResort(ctx, slot, seed),
    type: "quiz",
    _generated: true,
  });
}

/**
 * Ensures every lesson has at least `minCount` MCQ blocks (appends topic-aware fallbacks).
 */
export function ensureMinimumQuizzes(theory = [], lesson = {}, minCount = REQUIRED_QUIZ_COUNT) {
  const blocks = theory.map((block) =>
    block.type === "quiz" ? sanitizeQuizBlock(block) : block,
  );
  const existing = countQuizBlocks(blocks);
  if (existing >= minCount) return blocks;

  let slot = 0;
  while (countQuizBlocks(blocks) < minCount) {
    blocks.push(buildFallbackQuiz(lesson, blocks, slot));
    slot += 1;
  }
  return blocks;
}

export function prepareLessonQuizzes(lesson) {
  if (!lesson) return null;
  return {
    ...lesson,
    theory: ensureMinimumQuizzes(lesson.theory || [], lesson),
  };
}

export function mapTheoryWithQuizIndices(theory = []) {
  let quizIndex = -1;
  return theory.map((block, theoryIndex) => {
    if (block.type === "quiz") {
      quizIndex += 1;
      return { block, theoryIndex, quizIndex };
    }
    return { block, theoryIndex, quizIndex: null };
  });
}
