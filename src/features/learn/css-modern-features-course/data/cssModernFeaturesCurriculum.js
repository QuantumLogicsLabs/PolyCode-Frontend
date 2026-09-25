// PolyCode — CSS Variables & Modern CSS interactive course
// 6 chapters · 18 lessons
// Content follows the CSS specifications and MDN reference docs for custom
// properties, math functions, selectors, cascade layers, nesting, feature
// queries, container queries, logical properties, and color functions.
//
// Every challenge is an HTML document with a <style> block, so the live
// preview renders exactly the markup the learner's CSS targets.

const ACCENT = "#f97316"; // modern CSS orange

const RAW_CSS_MODERN_FEATURES_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Custom Properties in Depth
  // ─────────────────────────────────────────────────────────────
  {
    id: "cmf-custom-properties",
    title: "Custom Properties in Depth",
    icon: "🎛️",
    color: ACCENT,
    lessons: [
      {
        id: "cmf-0",
        title: "Scope & Inheritance",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A custom property is an ordinary CSS property whose name starts with `--`, so it follows the normal rules: it applies to the element you declare it on and is **inherited** by that element's descendants. Declaring it on `:root` makes it available everywhere, but you can also declare it on a component. That lets a variant change one variable instead of repeating every declaration that uses it.",
          },
          {
            type: "code",
            lang: "css",
            label: "One variable, overridden by a variant",
            content: `.alert {
  --alert-color: #2563eb;
  border-left: 4px solid var(--alert-color);
  color: var(--alert-color);
}

/* The variant only changes the variable */
.alert-error {
  --alert-color: #dc2626;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Custom property names are case-sensitive: --Accent and --accent are two different variables. Regular property names like color are not.",
          },
          {
            type: "quiz",
            question: "A variable is declared as --gap: 2rem on .grid. Which elements can read it with var(--gap)?",
            options: [
              "Every element on the page",
              "Only .grid itself",
              ".grid and all of its descendants",
              "Only the direct children of .grid",
            ],
            answer: 2,
            explanation:
              "Custom properties inherit by default, so the value declared on .grid is visible on .grid and on everything nested inside it — but not on its siblings or ancestors.",
          },
        ],
        challenge: {
          id: "cmf-0-challenge",
          language: "html",
          title: "Drive a Button Variant with One Variable",
          description:
            "Declare `--btn-color: #2563eb` on `.btn` and use `var(--btn-color)` for both its background and its border. Then make `.btn-danger` set only `--btn-color: #dc2626`, with no background or border declarations of its own.",
          starterCode: `<style>
  .btn {
    padding: 0.6rem 1.2rem;
    color: white;
    background: #2563eb;
    border: 2px solid #2563eb;
    border-radius: 6px;
  }
  .btn-danger {
    background: #dc2626;
    border-color: #dc2626;
  }
</style>

<button class="btn">Save</button>
<button class="btn btn-danger">Delete</button>`,
          solutionCode: `<style>
  .btn {
    --btn-color: #2563eb;
    padding: 0.6rem 1.2rem;
    color: white;
    background: var(--btn-color);
    border: 2px solid var(--btn-color);
    border-radius: 6px;
  }
  .btn-danger {
    --btn-color: #dc2626;
  }
</style>

<button class="btn">Save</button>
<button class="btn btn-danger">Delete</button>`,
          tests: [
            { id: 1, label: ".btn declares --btn-color", keywords: [{ pattern: "\\.btn\\s*\\{[^}]*--btn-color\\s*:\\s*#2563eb" }] },
            { id: 2, label: "Background and border read var(--btn-color)", keywords: [{ pattern: "\\.btn\\s*\\{[^}]*background(-color)?\\s*:\\s*var\\(\\s*--btn-color\\s*\\)" }, { pattern: "\\.btn\\s*\\{[^}]*border(-color)?\\s*:[^;]*var\\(\\s*--btn-color\\s*\\)" }] },
            { id: 3, label: ".btn-danger only overrides the variable", keywords: [{ pattern: "\\.btn-danger\\s*\\{[^}]*--btn-color\\s*:\\s*#dc2626" }, { pattern: "^(?![\\s\\S]*\\.btn-danger\\s*\\{[^}]*(background|border))" }] },
          ],
        },
      },
      {
        id: "cmf-1",
        title: "Fallbacks & var() Chains",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`var()` takes an optional second argument: a **fallback** used when the variable isn't defined. The fallback can itself be another `var()`, so you can chain them: `var(--card-padding, var(--space, 1rem))` means \"use the card's own value, else the site-wide spacing, else 1rem\". This lets a component expose a setting without forcing every page to define it.",
          },
          {
            type: "code",
            lang: "css",
            label: "Component setting → global token → hard default",
            content: `.card {
  padding: var(--card-padding, var(--space, 1rem));
  color: var(--card-text, #1f2937);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The fallback only kicks in when the variable is missing. If the variable exists but holds the wrong kind of value — say --space: red used for padding — the fallback is ignored and the property is treated as if it was never set.",
          },
          {
            type: "quiz",
            question: "With --space: 1.5rem defined and --card-padding undefined, what padding does var(--card-padding, var(--space, 1rem)) give?",
            options: ["1rem", "1.5rem", "0", "The declaration is invalid"],
            answer: 1,
            explanation:
              "--card-padding is missing, so CSS uses the fallback var(--space, 1rem). --space exists, so its value 1.5rem wins and the inner 1rem is never reached.",
          },
        ],
        challenge: {
          id: "cmf-1-challenge",
          language: "html",
          title: "Add Fallbacks to a Card",
          description:
            "Nothing defines `--card-padding` or `--card-text`, so the card loses its padding and colour. Don't define them — add fallbacks instead: padding should fall back to `var(--space, 1rem)`, and colour to `#1f2937`.",
          starterCode: `<style>
  :root {
    --space: 1.25rem;
  }
  .card {
    padding: var(--card-padding);
    color: var(--card-text);
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }
</style>

<div class="card">A card that should still look right when its own variables are missing.</div>`,
          solutionCode: `<style>
  :root {
    --space: 1.25rem;
  }
  .card {
    padding: var(--card-padding, var(--space, 1rem));
    color: var(--card-text, #1f2937);
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }
</style>

<div class="card">A card that should still look right when its own variables are missing.</div>`,
          tests: [
            { id: 1, label: "Padding chains to var(--space, 1rem)", keywords: [{ pattern: "padding\\s*:\\s*var\\(\\s*--card-padding\\s*,\\s*var\\(\\s*--space\\s*,\\s*1rem\\s*\\)\\s*\\)" }] },
            { id: 2, label: "Colour falls back to #1f2937", keywords: [{ pattern: "color\\s*:\\s*var\\(\\s*--card-text\\s*,\\s*#1f2937\\s*\\)" }] },
            { id: 3, label: "--card-padding and --card-text are not defined", keywords: [{ pattern: "^(?![\\s\\S]*--card-(padding|text)\\s*:)" }] },
          ],
        },
      },
      {
        id: "cmf-2",
        title: "Theming with Custom Properties",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A theme is just a set of variables. Put the default **tokens** on `:root`, have components use only `var()` — never hard-coded colours — and redefine the tokens under a selector such as `[data-theme=\"dark\"]`. Because variables inherit, every component inside that element switches automatically. Setting the attribute on `<html>` themes the whole page; setting it on one section themes just that section.",
          },
          {
            type: "code",
            lang: "css",
            label: "Tokens on :root, overridden by a theme attribute",
            content: `:root {
  --bg: #ffffff;
  --text: #111827;
}

[data-theme="dark"] {
  --bg: #111827;
  --text: #f9fafb;
}

body {
  background: var(--bg);
  color: var(--text);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "To follow the user's system setting as well, redefine the same tokens inside @media (prefers-color-scheme: dark) { :root { ... } }. The components don't change at all.",
          },
          {
            type: "quiz",
            question: "Why does the dark theme break if a component uses color: #111827 instead of color: var(--text)?",
            options: [
              "Hex colours aren't allowed alongside custom properties",
              "The theme only redefines variables, so a hard-coded value never changes",
              "[data-theme] selectors can't override :root",
              "var() is slower than hex colours",
            ],
            answer: 1,
            explanation:
              "The theme block swaps token values. Anything that reads a token follows along; anything with a literal colour keeps that colour in every theme.",
          },
        ],
        challenge: {
          id: "cmf-2-challenge",
          language: "html",
          title: "Add a Dark Theme",
          description:
            "Add a `[data-theme=\"dark\"]` rule that redefines `--bg`, `--text` and `--surface` — and contains nothing but custom properties. Then fix `.panel h2`, whose hard-coded colour stays dark in the dark panel, so it uses `var(--text)`.",
          starterCode: `<style>
  :root {
    --bg: #ffffff;
    --surface: #f3f4f6;
    --text: #111827;
  }
  .panel {
    background: var(--bg);
    color: var(--text);
    padding: 1rem;
  }
  .panel h2 {
    color: #111827;
  }
  .panel p {
    background: var(--surface);
    padding: 0.5rem;
  }
</style>

<section class="panel">
  <h2>Light panel</h2>
  <p>Uses the default tokens.</p>
</section>
<section class="panel" data-theme="dark">
  <h2>Dark panel</h2>
  <p>Should switch colours by overriding tokens only.</p>
</section>`,
          solutionCode: `<style>
  :root {
    --bg: #ffffff;
    --surface: #f3f4f6;
    --text: #111827;
  }
  [data-theme="dark"] {
    --bg: #111827;
    --surface: #1f2937;
    --text: #f9fafb;
  }
  .panel {
    background: var(--bg);
    color: var(--text);
    padding: 1rem;
  }
  .panel h2 {
    color: var(--text);
  }
  .panel p {
    background: var(--surface);
    padding: 0.5rem;
  }
</style>

<section class="panel">
  <h2>Light panel</h2>
  <p>Uses the default tokens.</p>
</section>
<section class="panel" data-theme="dark">
  <h2>Dark panel</h2>
  <p>Should switch colours by overriding tokens only.</p>
</section>`,
          tests: [
            { id: 1, label: "Dark theme redefines --bg, --text and --surface", keywords: [{ pattern: "\\[data-theme=[\"']dark[\"']\\]\\s*\\{[^}]*--bg\\s*:" }, { pattern: "\\[data-theme=[\"']dark[\"']\\]\\s*\\{[^}]*--text\\s*:" }, { pattern: "\\[data-theme=[\"']dark[\"']\\]\\s*\\{[^}]*--surface\\s*:" }] },
            { id: 2, label: "Dark theme block contains only custom properties", keywords: [{ pattern: "\\[data-theme=[\"']dark[\"']\\]\\s*\\{(\\s*--[\\w-]+\\s*:[^;{}]+;)+\\s*\\}" }] },
            { id: 3, label: ".panel h2 uses var(--text)", keywords: [{ pattern: "\\.panel\\s+h2\\s*\\{[^}]*color\\s*:\\s*var\\(\\s*--text\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — CSS Math & Design Tokens
  // ─────────────────────────────────────────────────────────────
  {
    id: "cmf-math",
    title: "CSS Math & Design Tokens",
    icon: "🧮",
    color: "#eab308",
    lessons: [
      {
        id: "cmf-3",
        title: "calc() with Mixed Units",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`calc()` does arithmetic at layout time, so it can mix units the browser only knows then: `calc(100% - 2rem)` is \"the full width minus 2rem\", whatever the width turns out to be. You can add, subtract, multiply and divide, and you can use variables inside it: `calc(var(--space) * 2)`. Multiplying a variable is the standard way to build spacing from a single base value.",
          },
          {
            type: "code",
            lang: "css",
            label: "Percentages, rems and variables together",
            content: `:root {
  --sidebar: 200px;
  --space: 0.75rem;
}

.content {
  width: calc(100% - var(--sidebar));
  padding: calc(var(--space) * 2);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The + and - operators need a space on both sides. calc(100% -2rem) is invalid, because -2rem reads as a negative number with no operator. * and / don't need the spaces, but using them everywhere keeps things readable.",
          },
          {
            type: "quiz",
            question: "Which of these is a valid calc() expression?",
            options: [
              "calc(100%-2rem)",
              "calc(100% -2rem)",
              "calc(100% - 2rem)",
              "calc(100% minus 2rem)",
            ],
            answer: 2,
            explanation:
              "Only calc(100% - 2rem) has whitespace on both sides of the minus sign. Without it, the parser sees -2rem as a single negative value.",
          },
        ],
        challenge: {
          id: "cmf-3-challenge",
          language: "html",
          title: "Size Content Next to a Sidebar",
          description:
            "The content column is a guessed `75%`, so it never lines up with the 200px sidebar. Set `.content`'s width to `calc(100% - var(--sidebar))`, and its padding to double the `--space` token using `calc()`.",
          starterCode: `<style>
  :root {
    --sidebar: 200px;
    --space: 0.75rem;
  }
  .layout {
    display: flex;
  }
  .sidebar {
    width: var(--sidebar);
    background: #e0e7ff;
  }
  .content {
    width: 75%;
    padding: 12px;
    background: #f3f4f6;
  }
</style>

<div class="layout">
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Content fills exactly what the sidebar leaves.</main>
</div>`,
          solutionCode: `<style>
  :root {
    --sidebar: 200px;
    --space: 0.75rem;
  }
  .layout {
    display: flex;
  }
  .sidebar {
    width: var(--sidebar);
    background: #e0e7ff;
  }
  .content {
    width: calc(100% - var(--sidebar));
    padding: calc(var(--space) * 2);
    background: #f3f4f6;
  }
</style>

<div class="layout">
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Content fills exactly what the sidebar leaves.</main>
</div>`,
          tests: [
            { id: 1, label: "Width is calc(100% - var(--sidebar))", keywords: [{ pattern: "\\.content\\s*\\{[^}]*width\\s*:\\s*calc\\(\\s*100%\\s+-\\s+var\\(\\s*--sidebar\\s*\\)\\s*\\)" }] },
            { id: 2, label: "Padding doubles --space with calc()", keywords: [{ pattern: "\\.content\\s*\\{[^}]*padding\\s*:\\s*calc\\(\\s*(var\\(\\s*--space\\s*\\)\\s*\\*\\s*2|2\\s*\\*\\s*var\\(\\s*--space\\s*\\))\\s*\\)" }] },
            { id: 3, label: "The guessed 75% width is gone", keywords: [{ pattern: "^(?![\\s\\S]*width\\s*:\\s*75%)" }] },
          ],
        },
      },
      {
        id: "cmf-4",
        title: "Building a Scale from One Token",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Variables can be defined in terms of other variables. Start with a base size and a **ratio**, then build each step by multiplying the step below it: `--size-1: calc(var(--base) * var(--ratio))`, `--size-2: calc(var(--size-1) * var(--ratio))`, and so on. Change the ratio and every size on the site updates together, which is how design systems keep type and spacing consistent.",
          },
          {
            type: "code",
            lang: "css",
            label: "A modular type scale",
            content: `:root {
  --base: 1rem;
  --ratio: 1.25;
  --size-1: calc(var(--base) * var(--ratio));
  --size-2: calc(var(--size-1) * var(--ratio));
  --size-3: calc(var(--size-2) * var(--ratio));
}

h1 { font-size: var(--size-3); }`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "--ratio is a plain number with no unit. Multiplying a length by a number gives a length, so calc(1rem * 1.25) is 1.25rem. Multiplying two lengths together is not allowed.",
          },
          {
            type: "quiz",
            question: "With --base: 1rem and --ratio: 1.5, what is --size-2 in the scale above?",
            options: ["1.5rem", "2rem", "2.25rem", "3rem"],
            answer: 2,
            explanation:
              "--size-1 is 1rem × 1.5 = 1.5rem, and --size-2 is 1.5rem × 1.5 = 2.25rem.",
          },
        ],
        challenge: {
          id: "cmf-4-challenge",
          language: "html",
          title: "Replace Magic Numbers with a Scale",
          description:
            "The headings use hand-calculated sizes. Add `--ratio: 1.25` to `:root`, define `--size-1`, `--size-2` and `--size-3` with `calc()` (each step multiplies the one below by `var(--ratio)`, starting from `var(--base)`), and set h3, h2 and h1 to size 1, 2 and 3.",
          starterCode: `<style>
  :root {
    --base: 1rem;
  }
  h1 { font-size: 1.953rem; }
  h2 { font-size: 1.563rem; }
  h3 { font-size: 1.25rem; }
</style>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>`,
          solutionCode: `<style>
  :root {
    --base: 1rem;
    --ratio: 1.25;
    --size-1: calc(var(--base) * var(--ratio));
    --size-2: calc(var(--size-1) * var(--ratio));
    --size-3: calc(var(--size-2) * var(--ratio));
  }
  h1 { font-size: var(--size-3); }
  h2 { font-size: var(--size-2); }
  h3 { font-size: var(--size-1); }
</style>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>`,
          tests: [
            { id: 1, label: "Defines --ratio: 1.25", keywords: [{ pattern: "--ratio\\s*:\\s*1\\.25\\s*;" }] },
            { id: 2, label: "Each size multiplies the step below by the ratio", keywords: [{ pattern: "--size-1\\s*:\\s*calc\\(\\s*var\\(\\s*--base\\s*\\)\\s*\\*\\s*var\\(\\s*--ratio\\s*\\)\\s*\\)" }, { pattern: "--size-2\\s*:\\s*calc\\(\\s*var\\(\\s*--size-1\\s*\\)\\s*\\*\\s*var\\(\\s*--ratio\\s*\\)\\s*\\)" }, { pattern: "--size-3\\s*:\\s*calc\\(\\s*var\\(\\s*--size-2\\s*\\)\\s*\\*\\s*var\\(\\s*--ratio\\s*\\)\\s*\\)" }] },
            { id: 3, label: "h1, h2 and h3 use --size-3, --size-2 and --size-1", keywords: [{ pattern: "h1\\s*\\{[^}]*font-size\\s*:\\s*var\\(\\s*--size-3\\s*\\)" }, { pattern: "h2\\s*\\{[^}]*font-size\\s*:\\s*var\\(\\s*--size-2\\s*\\)" }, { pattern: "h3\\s*\\{[^}]*font-size\\s*:\\s*var\\(\\s*--size-1\\s*\\)" }] },
          ],
        },
      },
      {
        id: "cmf-5",
        title: "min() and max() for Layout",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "You may have used `min()`, `max()` and `clamp()` for fluid font sizes. They're just as useful for **layout**. `width: min(100% - 2rem, 60rem)` means \"as wide as the screen minus a 2rem gutter, but never more than 60rem\" — one line that replaces a fixed width plus a media query. `max()` does the opposite: `padding: max(2rem, 8vh)` never goes below 2rem, but grows on tall screens.",
          },
          {
            type: "code",
            lang: "css",
            label: "A container with a built-in gutter — no media query",
            content: `.container {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You don't need calc() inside min(), max() or clamp(). Each argument can already be a maths expression, so min(100% - 2rem, 60rem) is valid as written.",
          },
          {
            type: "quiz",
            question: "On a 500px-wide screen (1rem = 16px), how wide is an element with width: min(100% - 2rem, 60rem)?",
            options: ["960px", "500px", "468px", "32px"],
            answer: 2,
            explanation:
              "100% - 2rem is 500px - 32px = 468px, and 60rem is 960px. min() picks the smaller one: 468px.",
          },
        ],
        challenge: {
          id: "cmf-5-challenge",
          language: "html",
          title: "Replace a Breakpoint with min()",
          description:
            "Set `.container`'s width to `min(100% - 2rem, 60rem)` and delete the `@media` rule it no longer needs. Then give `.hero` `padding: max(2rem, 8vh) 1rem` so its top and bottom padding grows on tall screens.",
          starterCode: `<style>
  .container {
    width: 60rem;
    margin-inline: auto;
    background: #fef3c7;
  }
  @media (max-width: 62rem) {
    .container {
      width: calc(100% - 2rem);
    }
  }
  .hero {
    padding: 2rem 1rem;
    background: #fde68a;
  }
</style>

<div class="container">
  <section class="hero">Hero section</section>
  <p>Page content.</p>
</div>`,
          solutionCode: `<style>
  .container {
    width: min(100% - 2rem, 60rem);
    margin-inline: auto;
    background: #fef3c7;
  }
  .hero {
    padding: max(2rem, 8vh) 1rem;
    background: #fde68a;
  }
</style>

<div class="container">
  <section class="hero">Hero section</section>
  <p>Page content.</p>
</div>`,
          tests: [
            { id: 1, label: "Container width uses min(100% - 2rem, 60rem)", keywords: [{ pattern: "\\.container\\s*\\{[^}]*width\\s*:\\s*min\\(\\s*(100%\\s*-\\s*2rem\\s*,\\s*60rem|60rem\\s*,\\s*100%\\s*-\\s*2rem)\\s*\\)" }] },
            { id: 2, label: "The media query is gone", keywords: [{ pattern: "^(?![\\s\\S]*@media)" }] },
            { id: 3, label: "Hero padding uses max(2rem, 8vh)", keywords: [{ pattern: "\\.hero\\s*\\{[^}]*padding\\s*:\\s*max\\(\\s*(2rem\\s*,\\s*8vh|8vh\\s*,\\s*2rem)\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Modern Selectors
  // ─────────────────────────────────────────────────────────────
  {
    id: "cmf-selectors",
    title: "Modern Selectors",
    icon: "🎯",
    color: "#8b5cf6",
    lessons: [
      {
        id: "cmf-6",
        title: ":is() and :where()",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`:is()` and `:where()` both take a list of selectors and match any of them, so `:is(article, aside) :is(h1, h2, h3)` replaces six comma-separated selectors. The difference is **specificity**. `:is()` counts as its most specific argument. `:where()` always counts as **zero**, so rules written with it are easy for any later rule to override — ideal for defaults and resets.",
          },
          {
            type: "code",
            lang: "css",
            label: "Same match, different specificity",
            content: `/* Specificity of #main (1,0,0) — hard to override */
:is(#main, .sidebar) a { color: gray; }

/* Specificity 0 for the list — any class beats it */
:where(#main, .sidebar) a { color: gray; }`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Both are forgiving: if one selector in the list is invalid, the others still work. In an ordinary comma list, one invalid selector throws away the whole rule.",
          },
          {
            type: "quiz",
            question: "What is the specificity of :where(.site nav) a?",
            options: [
              "(0,1,2) — the same as .site nav a",
              "(0,0,1) — only the a counts",
              "(0,1,0) — only .site counts",
              "(0,0,0) — the whole selector counts as zero",
            ],
            answer: 1,
            explanation:
              ":where() contributes nothing, but the a outside it still counts as one type selector: (0,0,1).",
          },
        ],
        challenge: {
          id: "cmf-6-challenge",
          language: "html",
          title: "Group Selectors and Lower Specificity",
          description:
            "Rewrite the six heading selectors as `:is(article, aside) :is(h1, h2, h3)`. The \"Sign up\" link should be red, but `.site nav a` out-specifies `.cta` — rewrite that default as `:where(.site nav, .site footer) a` so `.cta` wins.",
          starterCode: `<style>
  article h1, article h2, article h3,
  aside h1, aside h2, aside h3 {
    font-family: Georgia, serif;
    color: #1e3a8a;
  }
  .site nav a, .site footer a {
    color: #374151;
  }
  .cta {
    color: #dc2626;
  }
</style>

<div class="site">
  <nav><a href="#">Home</a> <a class="cta" href="#">Sign up</a></nav>
  <article><h2>Article title</h2></article>
  <aside><h3>Related</h3></aside>
  <footer><a href="#">Contact</a></footer>
</div>`,
          solutionCode: `<style>
  :is(article, aside) :is(h1, h2, h3) {
    font-family: Georgia, serif;
    color: #1e3a8a;
  }
  :where(.site nav, .site footer) a {
    color: #374151;
  }
  .cta {
    color: #dc2626;
  }
</style>

<div class="site">
  <nav><a href="#">Home</a> <a class="cta" href="#">Sign up</a></nav>
  <article><h2>Article title</h2></article>
  <aside><h3>Related</h3></aside>
  <footer><a href="#">Contact</a></footer>
</div>`,
          tests: [
            { id: 1, label: "Headings use :is() for the containers and the levels", keywords: [{ pattern: ":is\\([^)]*\\barticle\\b[^)]*\\)" }, { pattern: ":is\\([^)]*\\baside\\b[^)]*\\)" }, { pattern: ":is\\([^)]*\\bh1\\b[^)]*\\bh3\\b[^)]*\\)" }, { pattern: "^(?![\\s\\S]*aside\\s+h3\\s*[,{])" }] },
            { id: 2, label: "Link default uses :where()", keywords: [{ pattern: ":where\\([^)]*\\.site\\s+nav[^)]*\\)\\s*a\\s*\\{" }, { pattern: "^(?![\\s\\S]*\\.site\\s+nav\\s+a\\s*[,{])" }] },
            { id: 3, label: ".cta keeps its red colour", keywords: [{ pattern: "\\.cta\\s*\\{[^}]*color\\s*:\\s*#dc2626" }] },
          ],
        },
      },
      {
        id: "cmf-7",
        title: ":has() — the Relational Selector",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Selectors used to only look **down** the tree. `:has()` lets a selector look at what an element contains: `.card:has(img)` matches cards that contain an image, and `label:has(:checked)` matches a label whose radio button is selected. Styling that used to need JavaScript to toggle a class — \"this card has a picture\", \"this option is chosen\" — can now be pure CSS, and it updates live as the page changes.",
          },
          {
            type: "code",
            lang: "css",
            label: "Styling a parent by its contents",
            content: `/* Cards with an image get two columns */
.card:has(img) {
  display: grid;
  grid-template-columns: 120px 1fr;
}

/* Highlight the field whose input is invalid */
.field:has(input:invalid) {
  border-color: #dc2626;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              ":has() takes relative selectors too: .card:has(> img) only matches an image that's a direct child, and h2:has(+ p) matches an h2 immediately followed by a paragraph.",
          },
          {
            type: "quiz",
            question: "What does form:has(input:invalid) select?",
            options: [
              "Every invalid input inside a form",
              "Any form that contains at least one invalid input",
              "Inputs that have a form attribute",
              "Only forms whose first input is invalid",
            ],
            answer: 1,
            explanation:
              "The element being styled is the one before :has() — the form. The argument is the condition it must meet: it contains an invalid input somewhere inside it.",
          },
        ],
        challenge: {
          id: "cmf-7-challenge",
          language: "html",
          title: "Drop the Helper Classes",
          description:
            "The helper classes `card--with-image` and `option--selected` would need JavaScript to keep them up to date. Replace them with `.card:has(img)` and `.option:has(:checked)`, and remove both classes from the HTML. Pick \"Yearly\" in the preview to see the highlight follow your choice.",
          starterCode: `<style>
  .card {
    border: 1px solid #d1d5db;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .card--with-image {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1rem;
  }
  .option {
    display: block;
    padding: 0.5rem;
    border: 2px solid #e5e7eb;
  }
  .option--selected {
    border-color: #2563eb;
    background: #eff6ff;
  }
</style>

<div class="card card--with-image">
  <img src="lake.jpg" alt="Lake at sunrise" width="120" height="80">
  <p>Cards with an image get a two-column layout.</p>
</div>
<div class="card">
  <p>Cards without one stay single-column.</p>
</div>

<label class="option option--selected"><input type="radio" name="plan" checked> Monthly</label>
<label class="option"><input type="radio" name="plan"> Yearly</label>`,
          solutionCode: `<style>
  .card {
    border: 1px solid #d1d5db;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .card:has(img) {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1rem;
  }
  .option {
    display: block;
    padding: 0.5rem;
    border: 2px solid #e5e7eb;
  }
  .option:has(:checked) {
    border-color: #2563eb;
    background: #eff6ff;
  }
</style>

<div class="card">
  <img src="lake.jpg" alt="Lake at sunrise" width="120" height="80">
  <p>Cards with an image get a two-column layout.</p>
</div>
<div class="card">
  <p>Cards without one stay single-column.</p>
</div>

<label class="option"><input type="radio" name="plan" checked> Monthly</label>
<label class="option"><input type="radio" name="plan"> Yearly</label>`,
          tests: [
            { id: 1, label: "Cards with an image use .card:has(img)", keywords: [{ pattern: "\\.card:has\\(\\s*>?\\s*img\\s*\\)\\s*\\{[^}]*display\\s*:\\s*grid" }] },
            { id: 2, label: "Selected option uses .option:has(:checked)", keywords: [{ pattern: "\\.option:has\\(\\s*(input)?:checked\\s*\\)\\s*\\{[^}]*border-color" }] },
            { id: 3, label: "Helper classes are removed", keywords: [{ pattern: "^(?![\\s\\S]*(card--with-image|option--selected))" }] },
          ],
        },
      },
      {
        id: "cmf-8",
        title: ":not() with Selector Lists",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`:not()` accepts a whole list of selectors, and matches elements that match **none** of them: `input:not([type=\"checkbox\"], [type=\"radio\"])` is every input that isn't a checkbox or radio. That lets you write a rule once for the elements you mean, instead of styling everything and then writing a second rule to undo it. A common example is `li:not(:last-child)` for separators between list items.",
          },
          {
            type: "code",
            lang: "css",
            label: "Style what you mean instead of undoing it",
            content: `/* Before: style all, then undo */
.menu li { border-bottom: 1px solid #d1d5db; }
.menu li:last-child { border-bottom: none; }

/* After: one rule */
.menu li:not(:last-child) {
  border-bottom: 1px solid #d1d5db;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Like :is(), :not() takes the specificity of its most specific argument. The keyboard-only :focus-visible pseudo-class is covered in the Web Accessibility and CSS Animations courses.",
          },
          {
            type: "quiz",
            question: "Which elements does p:not(.intro, .note) match?",
            options: [
              "Paragraphs with both .intro and .note",
              "Paragraphs with .intro or .note",
              "Paragraphs with neither .intro nor .note",
              "Every element except paragraphs",
            ],
            answer: 2,
            explanation:
              "An element matches :not(A, B) only if it matches neither A nor B, so a paragraph with either class is excluded.",
          },
        ],
        challenge: {
          id: "cmf-8-challenge",
          language: "html",
          title: "Remove the Undo Rules",
          description:
            "Rewrite the menu rule as `.menu li:not(:last-child)` and the input rule as `input:not([type=\"checkbox\"], [type=\"radio\"])`. Then delete the two rules that only existed to undo them.",
          starterCode: `<style>
  .menu li {
    border-bottom: 1px solid #d1d5db;
    padding: 0.5rem 0;
  }
  .menu li:last-child {
    border-bottom: none;
  }
  input {
    display: block;
    width: 100%;
    padding: 0.5rem;
  }
  input[type="checkbox"],
  input[type="radio"] {
    display: inline;
    width: auto;
    padding: 0;
  }
</style>

<ul class="menu">
  <li>Profile</li>
  <li>Billing</li>
  <li>Sign out</li>
</ul>

<label for="name">Name</label>
<input id="name" type="text">
<label><input type="checkbox"> Remember me</label>`,
          solutionCode: `<style>
  .menu li {
    padding: 0.5rem 0;
  }
  .menu li:not(:last-child) {
    border-bottom: 1px solid #d1d5db;
  }
  input:not([type="checkbox"], [type="radio"]) {
    display: block;
    width: 100%;
    padding: 0.5rem;
  }
</style>

<ul class="menu">
  <li>Profile</li>
  <li>Billing</li>
  <li>Sign out</li>
</ul>

<label for="name">Name</label>
<input id="name" type="text">
<label><input type="checkbox"> Remember me</label>`,
          tests: [
            { id: 1, label: "Menu separators use li:not(:last-child)", keywords: [{ pattern: "\\.menu\\s+li:not\\(\\s*:last-child\\s*\\)\\s*\\{[^}]*border-bottom" }] },
            { id: 2, label: "Text inputs use :not() with both types", keywords: [{ pattern: "input:not\\(\\s*\\[type=[\"']?(checkbox|radio)[\"']?\\]\\s*,\\s*\\[type=[\"']?(checkbox|radio)[\"']?\\]\\s*\\)" }] },
            { id: 3, label: "The undo rules are gone", keywords: [{ pattern: "^(?![\\s\\S]*(border-bottom\\s*:\\s*none|width\\s*:\\s*auto))" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Cascade Control
  // ─────────────────────────────────────────────────────────────
  {
    id: "cmf-cascade",
    title: "Cascade Control",
    icon: "🧱",
    color: "#0ea5e9",
    lessons: [
      {
        id: "cmf-9",
        title: "Cascade Layers with @layer",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Specificity battles happen when a very specific rule — often from a reset or a library — beats the class you actually wanted. **Cascade layers** fix this. Declare the layer order once, e.g. `@layer base, components;`, then put rules inside `@layer base { ... }` and `@layer components { ... }`. When two layers disagree, the **later layer wins**, no matter how specific the selector in the earlier layer is.",
          },
          {
            type: "code",
            lang: "css",
            label: "The components layer beats base, even with a weaker selector",
            content: `@layer base, components;

@layer base {
  nav#main-nav ul li a { color: #6b7280; }
}

@layer components {
  .link-active { color: #2563eb; }  /* wins */
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Specificity still matters inside a single layer. Layers only decide between rules that live in different layers.",
          },
          {
            type: "quiz",
            question: "With @layer base, components; declared, a rule in base has specificity (1,1,3) and a rule in components has (0,1,0). Which wins?",
            options: [
              "The base rule, because its specificity is higher",
              "The components rule, because its layer comes later",
              "Whichever rule appears last in the file",
              "Neither — the property is left unset",
            ],
            answer: 1,
            explanation:
              "The cascade compares layers before specificity. components is declared after base, so its rule wins regardless of specificity.",
          },
        ],
        challenge: {
          id: "cmf-9-challenge",
          language: "html",
          title: "End a Specificity Battle",
          description:
            "The active \"Docs\" link should be blue, but the ID selector beats `.link-active`. Declare `@layer base, components;`, wrap the nav rule in `@layer base { }` and the `.link-active` rule in `@layer components { }`. Don't change either selector.",
          starterCode: `<style>
  nav#main-nav ul li a {
    color: #6b7280;
    text-decoration: none;
  }
  .link-active {
    color: #2563eb;
    font-weight: bold;
  }
</style>

<nav id="main-nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a class="link-active" href="#">Docs</a></li>
  </ul>
</nav>`,
          solutionCode: `<style>
  @layer base, components;

  @layer base {
    nav#main-nav ul li a {
      color: #6b7280;
      text-decoration: none;
    }
  }

  @layer components {
    .link-active {
      color: #2563eb;
      font-weight: bold;
    }
  }
</style>

<nav id="main-nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a class="link-active" href="#">Docs</a></li>
  </ul>
</nav>`,
          tests: [
            { id: 1, label: "Declares @layer base, components;", keywords: [{ pattern: "@layer\\s+base\\s*,\\s*components\\s*;" }] },
            { id: 2, label: "The nav rule is in the base layer, selector unchanged", keywords: [{ pattern: "@layer\\s+base\\s*\\{[^@]*nav#main-nav\\s+ul\\s+li\\s+a\\s*\\{" }] },
            { id: 3, label: ".link-active is in the components layer", keywords: [{ pattern: "@layer\\s+components\\s*\\{[^@]*\\.link-active\\s*\\{" }] },
          ],
        },
      },
      {
        id: "cmf-10",
        title: "Layer Order & Unlayered Styles",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Two rules trip people up. First, layer order is fixed by the **first** time each name appears, so write the order statement (`@layer reset, base, components;`) at the very top. Second, styles **outside any layer** beat every layered style. That's handy for quick overrides, but a forgotten unlayered rule will silently win over your whole layer system.",
          },
          {
            type: "code",
            lang: "css",
            label: "Order is set by the first mention",
            content: `@layer base, components;   /* order fixed here */

@layer components { .btn { color: white; } }
@layer base { .btn { color: black; } }

/* Unlayered: beats both layers */
.btn { color: red; }`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "!important flips layer order: an !important declaration in an earlier layer beats one in a later layer. It's one more reason to avoid !important once you use layers.",
          },
          {
            type: "quiz",
            question: "A page declares @layer base, components; and also has an unlayered rule. Which normal (not !important) rule wins a conflict?",
            options: ["The base layer", "The components layer", "The unlayered rule", "The most specific selector"],
            answer: 2,
            explanation:
              "Unlayered styles are treated as coming after every layer, so they beat all layered normal declarations.",
          },
        ],
        challenge: {
          id: "cmf-10-challenge",
          language: "html",
          title: "Fix the Layer Order",
          description:
            "The featured card should be yellow, but it isn't. Two things are wrong: the order statement puts `components` before `base`, and the unlayered `.card` rule beats every layer. Change the order to `@layer base, components;` and move the `.card` rule into the base layer.",
          starterCode: `<style>
  @layer components, base;

  @layer base {
    body {
      font-family: system-ui, sans-serif;
    }
  }

  @layer components {
    .card--featured {
      background: #fef3c7;
      border-color: #f59e0b;
    }
  }

  .card {
    background: white;
    border: 2px solid #d1d5db;
    padding: 1rem;
  }
</style>

<div class="card">Regular card</div>
<div class="card card--featured">Featured card</div>`,
          solutionCode: `<style>
  @layer base, components;

  @layer base {
    body {
      font-family: system-ui, sans-serif;
    }
    .card {
      background: white;
      border: 2px solid #d1d5db;
      padding: 1rem;
    }
  }

  @layer components {
    .card--featured {
      background: #fef3c7;
      border-color: #f59e0b;
    }
  }
</style>

<div class="card">Regular card</div>
<div class="card card--featured">Featured card</div>`,
          tests: [
            { id: 1, label: "Order statement is base, then components", keywords: [{ pattern: "@layer\\s+base\\s*,\\s*components\\s*;" }, { pattern: "^(?![\\s\\S]*@layer\\s+components\\s*,\\s*base)" }] },
            { id: 2, label: ".card is inside the base layer", keywords: [{ pattern: "@layer\\s+base\\s*\\{[^@]*\\.card\\s*\\{[^}]*background\\s*:\\s*white" }] },
            { id: 3, label: ".card--featured stays in the components layer", keywords: [{ pattern: "@layer\\s+components\\s*\\{[^@]*\\.card--featured\\s*\\{" }] },
          ],
        },
      },
      {
        id: "cmf-11",
        title: "inherit, initial, unset & revert",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Every property accepts four global keywords. `inherit` takes the parent's value. `initial` uses the property's default from the spec — for `display` that's `inline`, even on a div. `unset` inherits if the property normally inherits (like `color`), otherwise acts like `initial`. `revert` rolls back to the **browser's** default style, which is usually what you want after a reset removed list bullets or button styling. `all: unset` applies `unset` to almost every property at once.",
          },
          {
            type: "code",
            lang: "css",
            label: "Choosing the right keyword",
            content: `.plain-link { color: inherit; }        /* match surrounding text */

.prose ul {
  list-style: revert;                   /* browser bullets back */
  padding-left: revert;
}

.icon-btn { all: unset; cursor: pointer; }`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "all: unset also removes the focus outline, so keyboard users lose track of the button. Add a visible :focus-visible style back whenever you use it.",
          },
          {
            type: "quiz",
            question: "A reset sets ul { list-style: none; padding: 0; }. Which declaration brings back the browser's default bullets?",
            options: ["list-style: initial", "list-style: revert", "list-style: inherit", "list-style: unset"],
            answer: 1,
            explanation:
              "revert goes back to the browser's own stylesheet, which gives lists disc bullets. initial is the spec default — also disc for list-style, but for many properties (display, padding on buttons) initial is very different from what the browser shows.",
          },
        ],
        challenge: {
          id: "cmf-11-challenge",
          language: "html",
          title: "Use the Global Keywords",
          description:
            "Make three fixes with keywords instead of copied values: give `.panel .plain-link` `color: inherit`, give `.prose ul` `list-style: revert` and `padding-left: revert`, and replace the icon button's resets with `all: unset` plus `cursor: pointer`. Then add a `.icon-btn:focus-visible` rule with an outline.",
          starterCode: `<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .panel {
    color: #f9fafb;
    background: #1f2937;
    padding: 1rem;
  }
  .panel a {
    color: #93c5fd;
  }
  .panel .plain-link {
    color: #f9fafb;
  }
  .prose ul {
    list-style: disc;
    padding-left: 40px;
  }
  .icon-btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
</style>

<div class="panel">
  <p>Read the <a href="#">docs</a> or <a class="plain-link" href="#">skip ahead</a>.</p>
  <div class="prose">
    <ul>
      <li>First point</li>
      <li>Second point</li>
    </ul>
  </div>
  <button class="icon-btn" aria-label="Close">✕</button>
</div>`,
          solutionCode: `<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .panel {
    color: #f9fafb;
    background: #1f2937;
    padding: 1rem;
  }
  .panel a {
    color: #93c5fd;
  }
  .panel .plain-link {
    color: inherit;
  }
  .prose ul {
    list-style: revert;
    padding-left: revert;
  }
  .icon-btn {
    all: unset;
    cursor: pointer;
  }
  .icon-btn:focus-visible {
    outline: 2px solid #93c5fd;
  }
</style>

<div class="panel">
  <p>Read the <a href="#">docs</a> or <a class="plain-link" href="#">skip ahead</a>.</p>
  <div class="prose">
    <ul>
      <li>First point</li>
      <li>Second point</li>
    </ul>
  </div>
  <button class="icon-btn" aria-label="Close">✕</button>
</div>`,
          tests: [
            { id: 1, label: ".plain-link inherits its colour", keywords: [{ pattern: "\\.plain-link\\s*\\{[^}]*color\\s*:\\s*inherit" }] },
            { id: 2, label: ".prose ul reverts list-style and padding", keywords: [{ pattern: "\\.prose\\s+ul\\s*\\{[^}]*list-style\\s*:\\s*revert" }, { pattern: "\\.prose\\s+ul\\s*\\{[^}]*padding(-left|-inline-start)?\\s*:\\s*revert" }] },
            { id: 3, label: "Icon button uses all: unset and keeps a focus outline", keywords: [{ pattern: "\\.icon-btn\\s*\\{[^}]*all\\s*:\\s*unset" }, { pattern: "\\.icon-btn:focus-visible\\s*\\{[^}]*outline\\s*:" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Native Nesting & Feature Queries
  // ─────────────────────────────────────────────────────────────
  {
    id: "cmf-nesting-supports",
    title: "Native Nesting & Feature Queries",
    icon: "🪆",
    color: "#ec4899",
    lessons: [
      {
        id: "cmf-12",
        title: "Native CSS Nesting",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Plain CSS now supports nesting, with no preprocessor. Put child rules inside their parent: `.card { h3 { ... } }` means `.card h3`. Use `&` to refer to the parent itself — `&:hover` is `.card:hover` and `&.is-featured` is `.card.is-featured`. Media queries can be nested too, keeping everything about one component in one block.",
          },
          {
            type: "code",
            lang: "css",
            label: "One component, one block",
            content: `.card {
  padding: 1rem;

  h3 { margin-top: 0; }          /* .card h3 */
  &:hover { border-color: #2563eb; } /* .card:hover */

  @media (min-width: 40rem) {
    padding: 2rem;
  }
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Unlike Sass, native CSS can't join text onto &. &__title does not produce .card__title — the & stands for the whole selector, not a string. Write BEM element classes out in full.",
          },
          {
            type: "quiz",
            question: "Inside .card { ... }, what does &.is-featured select?",
            options: [
              ".card .is-featured — a descendant with the class",
              ".card.is-featured — the card itself when it also has the class",
              ".card-is-featured — a joined class name",
              "Nothing; & can't be followed by a class",
            ],
            answer: 1,
            explanation:
              "& stands for the parent selector, and writing .is-featured straight after it with no space makes a compound selector: an element that is both .card and .is-featured.",
          },
        ],
        challenge: {
          id: "cmf-12-challenge",
          language: "html",
          title: "Nest a Component's Rules",
          description:
            "Move the three `.card ...` rules inside the `.card` block using native nesting: a nested `h3`, `&:hover` and `&.is-featured`. When you're done, the selectors `.card h3`, `.card:hover` and `.card.is-featured` shouldn't appear anywhere.",
          starterCode: `<style>
  .card {
    padding: 1rem;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .card h3 {
    margin-top: 0;
  }
  .card:hover {
    border-color: #2563eb;
  }
  .card.is-featured {
    background: #eff6ff;
  }
</style>

<div class="card">
  <h3>Regular card</h3>
  <p>Hover me.</p>
</div>
<div class="card is-featured">
  <h3>Featured card</h3>
  <p>Has a tinted background.</p>
</div>`,
          solutionCode: `<style>
  .card {
    padding: 1rem;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    margin-bottom: 1rem;

    h3 {
      margin-top: 0;
    }
    &:hover {
      border-color: #2563eb;
    }
    &.is-featured {
      background: #eff6ff;
    }
  }
</style>

<div class="card">
  <h3>Regular card</h3>
  <p>Hover me.</p>
</div>
<div class="card is-featured">
  <h3>Featured card</h3>
  <p>Has a tinted background.</p>
</div>`,
          tests: [
            { id: 1, label: "h3 is nested (no .card h3 selector)", keywords: [{ pattern: "(^|[;{}\\s])&?\\s*h3\\s*\\{" }, { pattern: "^(?![\\s\\S]*\\.card\\s+h3)" }] },
            { id: 2, label: "Hover uses &:hover", keywords: [{ pattern: "&:hover\\s*\\{" }, { pattern: "^(?![\\s\\S]*\\.card:hover)" }] },
            { id: 3, label: "Featured variant uses &.is-featured", keywords: [{ pattern: "&\\.is-featured\\s*\\{" }, { pattern: "^(?![\\s\\S]*\\.card\\.is-featured)" }] },
          ],
        },
      },
      {
        id: "cmf-13",
        title: "@supports Feature Queries",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`@supports` applies rules only if the browser understands something. `@supports (backdrop-filter: blur(8px))` tests a property and value, `@supports not (...)` tests the opposite, and `@supports selector(:has(*))` tests a selector. This is **progressive enhancement**: write styles that work everywhere, then add extras only where they're supported — or add a fallback only where they're not.",
          },
          {
            type: "code",
            lang: "css",
            label: "Enhance only when the selector is supported",
            content: `/* Everyone sees the error text... */
.field .error { color: #b91c1c; }

/* ...but browsers with :has() hide it until it's needed */
@supports selector(:has(*)) {
  .field .error { display: none; }
  .field:has(input:invalid) .error { display: block; }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Why guard :has() at all? A browser without it would drop the second rule but still apply display: none — hiding the error forever. Wrapping both rules means older browsers keep the always-visible message.",
          },
          {
            type: "quiz",
            question: "When does the block inside @supports not (backdrop-filter: blur(8px)) apply?",
            options: [
              "Always",
              "Only in browsers that support backdrop-filter",
              "Only in browsers that don't support backdrop-filter",
              "Only when the user has reduced transparency turned on",
            ],
            answer: 2,
            explanation:
              "not negates the test, so the block is a fallback that only runs where backdrop-filter isn't understood.",
          },
        ],
        challenge: {
          id: "cmf-13-challenge",
          language: "html",
          title: "Add a Fallback and an Enhancement",
          description:
            "Add `@supports not (backdrop-filter: blur(8px))` that gives `.toolbar` a solid `background: #ffffff`. Then add `@supports selector(:has(*))` that hides `.form-row .error` by default and shows it with `.form-row:has(input:invalid) .error { display: block; }`. Type a valid email in the preview to watch the error hide.",
          starterCode: `<style>
  .toolbar {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    padding: 0.75rem;
    border-bottom: 1px solid #d1d5db;
  }
  .form-row .error {
    color: #b91c1c;
    font-size: 0.875rem;
  }
</style>

<div class="toolbar">Toolbar</div>
<div class="form-row">
  <label for="email">Email</label>
  <input id="email" type="email" value="not-an-email">
  <p class="error">Enter a valid email address.</p>
</div>`,
          solutionCode: `<style>
  .toolbar {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    padding: 0.75rem;
    border-bottom: 1px solid #d1d5db;
  }
  @supports not (backdrop-filter: blur(8px)) {
    .toolbar {
      background: #ffffff;
    }
  }
  .form-row .error {
    color: #b91c1c;
    font-size: 0.875rem;
  }
  @supports selector(:has(*)) {
    .form-row .error {
      display: none;
    }
    .form-row:has(input:invalid) .error {
      display: block;
    }
  }
</style>

<div class="toolbar">Toolbar</div>
<div class="form-row">
  <label for="email">Email</label>
  <input id="email" type="email" value="not-an-email">
  <p class="error">Enter a valid email address.</p>
</div>`,
          tests: [
            { id: 1, label: "Solid toolbar fallback inside @supports not", keywords: [{ pattern: "@supports\\s+not\\s*\\(\\s*backdrop-filter\\s*:[^)]*\\)\\s*\\)?\\s*\\{[^@]*\\.toolbar\\s*\\{[^}]*background(-color)?\\s*:\\s*#fff(fff)?" }] },
            { id: 2, label: "Errors hidden by default inside @supports selector(:has())", keywords: [{ pattern: "@supports\\s+selector\\(\\s*:has\\([^)]*\\)\\s*\\)\\s*\\{[^@]*\\.form-row\\s+\\.error\\s*\\{[^}]*display\\s*:\\s*none" }] },
            { id: 3, label: "Error shown when the row has an invalid input", keywords: [{ pattern: "@supports\\s+selector\\([^@]*\\.form-row:has\\(\\s*input:invalid\\s*\\)\\s+\\.error\\s*\\{[^}]*display\\s*:\\s*block" }] },
          ],
        },
      },
      {
        id: "cmf-14",
        title: "Typed Custom Properties with @property",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "To the browser, an ordinary custom property is just text, so it can't animate between two values — it jumps. `@property` **registers** a custom property with a type (`syntax`), whether it inherits, and an `initial-value`. Once the browser knows `--angle` is an `<angle>`, it can interpolate it, which makes effects like a rotating gradient possible with CSS alone.",
          },
          {
            type: "code",
            lang: "css",
            label: "Registering --angle so it can animate",
            content: `@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.ring {
  background: conic-gradient(from var(--angle), #6366f1, #ec4899, #6366f1);
  animation: spin 4s linear infinite;
}

@keyframes spin {
  to { --angle: 360deg; }
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "A registered property also validates its value: if something sets --angle: blue, the browser ignores it and uses initial-value instead of breaking the gradient.",
          },
          {
            type: "quiz",
            question: "Why does an unregistered --angle jump instead of animating smoothly?",
            options: [
              "Keyframes can't contain custom properties",
              "The browser treats it as plain text, so it has no way to calculate in-between values",
              "conic-gradient() doesn't accept var()",
              "Custom properties only change on hover",
            ],
            answer: 1,
            explanation:
              "Without a registered type, there's no way to interpolate between 0deg and 360deg — they're just two strings, so the value flips halfway through.",
          },
        ],
        challenge: {
          id: "cmf-14-challenge",
          language: "html",
          title: "Make a Gradient Spin",
          description:
            "The badge's gradient should rotate, but `--angle` isn't registered so it only jumps. Add an `@property --angle` rule with `syntax: \"<angle>\"`, `inherits: false` and `initial-value: 0deg`.",
          starterCode: `<style>
  .badge {
    --angle: 0deg;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: conic-gradient(from var(--angle), #6366f1, #ec4899, #6366f1);
    animation: spin 4s linear infinite;
  }
  @keyframes spin {
    to { --angle: 360deg; }
  }
  @media (prefers-reduced-motion: reduce) {
    .badge { animation: none; }
  }
</style>

<div class="badge"></div>`,
          solutionCode: `<style>
  @property --angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }
  .badge {
    --angle: 0deg;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: conic-gradient(from var(--angle), #6366f1, #ec4899, #6366f1);
    animation: spin 4s linear infinite;
  }
  @keyframes spin {
    to { --angle: 360deg; }
  }
  @media (prefers-reduced-motion: reduce) {
    .badge { animation: none; }
  }
</style>

<div class="badge"></div>`,
          tests: [
            { id: 1, label: "Registers --angle with @property", keywords: [{ pattern: "@property\\s+--angle\\s*\\{" }] },
            { id: 2, label: "syntax is \"<angle>\"", keywords: [{ pattern: "@property\\s+--angle\\s*\\{[^}]*syntax\\s*:\\s*[\"']<angle>[\"']" }] },
            { id: 3, label: "inherits: false and initial-value: 0deg", keywords: [{ pattern: "@property\\s+--angle\\s*\\{[^}]*inherits\\s*:\\s*false" }, { pattern: "@property\\s+--angle\\s*\\{[^}]*initial-value\\s*:\\s*0deg" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Modern Layout & Color
  // ─────────────────────────────────────────────────────────────
  {
    id: "cmf-layout-color",
    title: "Modern Layout & Color",
    icon: "🎨",
    color: "#10b981",
    lessons: [
      {
        id: "cmf-15",
        title: "Container Queries in Depth",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A media query asks how wide the **screen** is; a container query asks how wide the component's **container** is, so the same card can be compact in a sidebar and wide in the main column. Beyond the basics, two tools make them practical: a **name** (`container: product / inline-size` is shorthand for a name plus a type), so `@container product (...)` targets that exact ancestor; and **container units** like `cqi` — 1% of the container's inline size — for sizing text and spacing to the component.",
          },
          {
            type: "code",
            lang: "css",
            label: "A named container with container units",
            content: `.product-wrap {
  container: product / inline-size;
}

@container product (min-width: 30rem) {
  .product {
    display: grid;
    grid-template-columns: 8rem 1fr;
  }
}

.product h2 {
  font-size: clamp(1rem, 5cqi, 1.75rem);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Without a name, @container queries the nearest ancestor that has a container type. Names matter once containers are nested — say, a card inside a sidebar inside a page layout.",
          },
          {
            type: "quiz",
            question: "An element's container is 400px wide. What is 5cqi?",
            options: ["5px", "20px", "5% of the screen width", "400px"],
            answer: 1,
            explanation:
              "1cqi is 1% of the container's inline size — 4px here — so 5cqi is 20px, whatever the screen size.",
          },
        ],
        challenge: {
          id: "cmf-15-challenge",
          language: "html",
          title: "Switch a Media Query to a Container Query",
          description:
            "The narrow product box goes two-column on wide screens, even though it's too cramped. Make `.product-wrap` a container named `product` with `inline-size`, replace the `@media` rule with `@container product (min-width: 30rem)`, and size `.product h2` in `cqi` units.",
          starterCode: `<style>
  .narrow {
    max-width: 18rem;
  }
  .product {
    border: 1px solid #d1d5db;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .product h2 {
    font-size: 1.25rem;
    margin-top: 0;
  }
  @media (min-width: 40rem) {
    .product {
      display: grid;
      grid-template-columns: 8rem 1fr;
      gap: 1rem;
    }
  }
</style>

<div class="product-wrap">
  <div class="product">
    <img src="lamp.jpg" alt="Desk lamp" width="128" height="96">
    <div><h2>Desk lamp</h2><p>Wide slot: two columns.</p></div>
  </div>
</div>
<div class="product-wrap narrow">
  <div class="product">
    <img src="lamp.jpg" alt="Desk lamp" width="128" height="96">
    <div><h2>Desk lamp</h2><p>Narrow slot: should stay stacked.</p></div>
  </div>
</div>`,
          solutionCode: `<style>
  .narrow {
    max-width: 18rem;
  }
  .product-wrap {
    container: product / inline-size;
  }
  .product {
    border: 1px solid #d1d5db;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .product h2 {
    font-size: clamp(1rem, 5cqi, 1.75rem);
    margin-top: 0;
  }
  @container product (min-width: 30rem) {
    .product {
      display: grid;
      grid-template-columns: 8rem 1fr;
      gap: 1rem;
    }
  }
</style>

<div class="product-wrap">
  <div class="product">
    <img src="lamp.jpg" alt="Desk lamp" width="128" height="96">
    <div><h2>Desk lamp</h2><p>Wide slot: two columns.</p></div>
  </div>
</div>
<div class="product-wrap narrow">
  <div class="product">
    <img src="lamp.jpg" alt="Desk lamp" width="128" height="96">
    <div><h2>Desk lamp</h2><p>Narrow slot: should stay stacked.</p></div>
  </div>
</div>`,
          tests: [
            { id: 1, label: ".product-wrap is a container named product", keywords: [{ pattern: "\\.product-wrap\\s*\\{[^}]*(container\\s*:\\s*product\\s*\\/\\s*inline-size|container-name\\s*:\\s*product[^}]*container-type\\s*:\\s*inline-size|container-type\\s*:\\s*inline-size[^}]*container-name\\s*:\\s*product)" }] },
            { id: 2, label: "Two-column layout uses @container product, not @media", keywords: [{ pattern: "@container\\s+product\\s*\\([^)]*\\)\\s*\\{[^@]*\\.product\\s*\\{[^}]*display\\s*:\\s*grid" }, { pattern: "^(?![\\s\\S]*@media)" }] },
            { id: 3, label: "Heading size uses cqi units", keywords: [{ pattern: "\\.product\\s+h2\\s*\\{[^}]*font-size\\s*:[^;]*\\d(\\.\\d+)?cqi" }] },
          ],
        },
      },
      {
        id: "cmf-16",
        title: "Logical Properties & aspect-ratio",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`margin-left` always means the left side, but in right-to-left languages like Arabic and Hebrew the text starts on the **right**. **Logical properties** follow the text direction instead: `inline` is the direction text runs, `block` is the direction lines stack, and `start`/`end` flip with the language. So `border-inline-start` is a left border in English and a right border in Arabic, with no extra CSS. Alongside them, `aspect-ratio: 16 / 9` keeps a box's shape without the old padding-top percentage trick.",
          },
          {
            type: "code",
            lang: "css",
            label: "Physical → logical",
            content: `/* margin-left / margin-right      → margin-inline      */
/* padding-top / padding-bottom     → padding-block      */
/* border-left (in left-to-right)   → border-inline-start */

.quote {
  border-inline-start: 4px solid #0d9488;
  padding-inline-start: 1rem;
  margin-inline: auto;
}

.video {
  aspect-ratio: 16 / 9;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "aspect-ratio only takes effect when at least one dimension is automatic. If the old trick left height: 0 behind, the box stays 0 tall — remove it along with the padding-top.",
          },
          {
            type: "quiz",
            question: "On an element with dir=\"rtl\", which side does padding-inline-start pad?",
            options: ["Left", "Right", "Top", "Bottom"],
            answer: 1,
            explanation:
              "In right-to-left text, lines start on the right, so the inline-start side is the right side.",
          },
        ],
        challenge: {
          id: "cmf-16-challenge",
          language: "html",
          title: "Make a Quote Direction-Aware",
          description:
            "In the Arabic quote the accent border is on the wrong side. Replace the physical properties with `border-inline-start`, `padding-inline-start` and `margin-inline: auto`. Then replace the video's `height: 0` + `padding-top: 56.25%` trick with `aspect-ratio: 16 / 9`.",
          starterCode: `<style>
  .quote {
    border-left: 4px solid #0d9488;
    padding-left: 1rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 30rem;
  }
  .video {
    height: 0;
    padding-top: 56.25%;
    background: #111827;
  }
</style>

<blockquote class="quote">Logical properties follow the direction of the text.</blockquote>
<blockquote class="quote" dir="rtl" lang="ar">الخصائص المنطقية تتبع اتجاه النص.</blockquote>
<div class="video"></div>`,
          solutionCode: `<style>
  .quote {
    border-inline-start: 4px solid #0d9488;
    padding-inline-start: 1rem;
    margin-inline: auto;
    max-width: 30rem;
  }
  .video {
    aspect-ratio: 16 / 9;
    background: #111827;
  }
</style>

<blockquote class="quote">Logical properties follow the direction of the text.</blockquote>
<blockquote class="quote" dir="rtl" lang="ar">الخصائص المنطقية تتبع اتجاه النص.</blockquote>
<div class="video"></div>`,
          tests: [
            { id: 1, label: "Border and padding use inline-start", keywords: [{ pattern: "border-inline-start\\s*:\\s*4px" }, { pattern: "padding-inline-start\\s*:\\s*1rem" }] },
            { id: 2, label: "margin-inline: auto, and no left/right properties remain", keywords: [{ pattern: "margin-inline\\s*:\\s*auto" }, { pattern: "^(?![\\s\\S]*(border|padding|margin)-(left|right)\\s*:)" }] },
            { id: 3, label: "Video uses aspect-ratio: 16 / 9 instead of the padding trick", keywords: [{ pattern: "aspect-ratio\\s*:\\s*16\\s*\\/\\s*9" }, { pattern: "^(?![\\s\\S]*(padding-top\\s*:\\s*56\\.25%|height\\s*:\\s*0\\s*;))" }] },
          ],
        },
      },
      {
        id: "cmf-17",
        title: "color-mix() and light-dark()",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`color-mix()` blends two colours in a colour space you choose: `color-mix(in oklch, var(--brand), black 20%)` is the brand colour with 20% black mixed in — a hover shade computed from one token. Mixing with `white` gives tints. `light-dark(#ffffff, #1f2937)` picks the first colour in light mode and the second in dark mode, but only once you opt in with `color-scheme: light dark`.",
          },
          {
            type: "code",
            lang: "css",
            label: "Shades, tints and dark mode from one brand colour",
            content: `:root {
  --brand: #2563eb;
  color-scheme: light dark;
}

.btn:hover {
  background: color-mix(in oklch, var(--brand), black 20%);
}

.tag {
  background: color-mix(in srgb, var(--brand) 15%, white);
}

.card {
  background: light-dark(#ffffff, #1f2937);
  color: light-dark(#111827, #f9fafb);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "oklch mixes in a way that matches how bright colours look to people, so shades stay even across different brand hues. srgb is the familiar RGB space and is fine for simple tints.",
          },
          {
            type: "quiz",
            question: "What must be set for light-dark() to return its dark value?",
            options: [
              "A [data-theme=\"dark\"] attribute",
              "color-scheme must include dark, and the user must prefer dark mode",
              "An @media (prefers-color-scheme: dark) wrapper around the rule",
              "Nothing — it always uses the second value at night",
            ],
            answer: 1,
            explanation:
              "light-dark() follows the element's used colour scheme. That needs color-scheme: light dark (or dark), and with light dark it then follows the user's preference.",
          },
        ],
        challenge: {
          id: "cmf-17-challenge",
          language: "html",
          title: "Derive Colours from One Token",
          description:
            "Replace the hand-picked colours: make `.btn:hover` a `color-mix()` of `var(--brand)` with `black`, and `.tag`'s background a `color-mix()` of `var(--brand)` with `white`. Then add `color-scheme: light dark` to `:root` and give `.card` `light-dark()` values for both `background` and `color`.",
          starterCode: `<style>
  :root {
    --brand: #2563eb;
  }
  .btn {
    background: var(--brand);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
  }
  .btn:hover {
    background: #1d4ed8;
  }
  .tag {
    background: #dbeafe;
    color: var(--brand);
    padding: 0.2rem 0.6rem;
  }
  .card {
    background: #ffffff;
    color: #111827;
    padding: 1rem;
  }
</style>

<div class="card">
  <span class="tag">New</span>
  <p>Hover the button to see the shade.</p>
  <button class="btn">Get started</button>
</div>`,
          solutionCode: `<style>
  :root {
    --brand: #2563eb;
    color-scheme: light dark;
  }
  .btn {
    background: var(--brand);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
  }
  .btn:hover {
    background: color-mix(in oklch, var(--brand), black 20%);
  }
  .tag {
    background: color-mix(in srgb, var(--brand) 15%, white);
    color: var(--brand);
    padding: 0.2rem 0.6rem;
  }
  .card {
    background: light-dark(#ffffff, #1f2937);
    color: light-dark(#111827, #f9fafb);
    padding: 1rem;
  }
</style>

<div class="card">
  <span class="tag">New</span>
  <p>Hover the button to see the shade.</p>
  <button class="btn">Get started</button>
</div>`,
          tests: [
            { id: 1, label: "Hover shade mixes --brand with black", keywords: [{ pattern: "\\.btn:hover\\s*\\{[^}]*background(-color)?\\s*:\\s*color-mix\\(\\s*in\\s+[\\w-]+\\s*,[^;]*var\\(\\s*--brand\\s*\\)[^;]*black" }] },
            { id: 2, label: "Tag tint mixes --brand with white", keywords: [{ pattern: "\\.tag\\s*\\{[^}]*background(-color)?\\s*:\\s*color-mix\\(\\s*in\\s+[\\w-]+\\s*,[^;]*var\\(\\s*--brand\\s*\\)[^;]*white" }] },
            { id: 3, label: "color-scheme is set and .card uses light-dark() twice", keywords: [{ pattern: ":root\\s*\\{[^}]*color-scheme\\s*:\\s*light\\s+dark" }, { pattern: "\\.card\\s*\\{[^}]*background(-color)?\\s*:\\s*light-dark\\(" }, { pattern: "\\.card\\s*\\{[^}]*[\\s;{]color\\s*:\\s*light-dark\\(" }] },
          ],
        },
      },
    ],
  },
];

export const CSS_MODERN_FEATURES_CHAPTERS = RAW_CSS_MODERN_FEATURES_CHAPTERS;

export const CSS_MODERN_FEATURES_LESSONS = CSS_MODERN_FEATURES_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSS_MODERN_FEATURES_TOTAL_XP = CSS_MODERN_FEATURES_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
