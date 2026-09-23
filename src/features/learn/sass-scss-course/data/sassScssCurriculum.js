// PolyCode — Sass & SCSS interactive course
// 6 chapters · 18 lessons
// Content follows the official Sass documentation (sass-lang.com) and uses the
// module system (@use / @forward, sass:math, sass:color, sass:map). Deprecated
// features — @import, global colour functions like darken(), and "/" for
// division — are only mentioned so learners recognise them in older code.
//
// Challenges are `language: "scss"`. The learner's SCSS is compiled in the
// browser by Dart Sass, applied to the challenge's `previewHtml`, and shown as
// compiled CSS. Tests with `target: "css"` check the compiled output; the rest
// check the SCSS source. `modules` supplies partials for @use.

const ACCENT = "#cf649a"; // Sass pink

const RAW_SASS_SCSS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Variables, Nesting & Interpolation
  // ─────────────────────────────────────────────────────────────
  {
    id: "scss-foundations",
    title: "Variables, Nesting & Interpolation",
    icon: "🧩",
    color: ACCENT,
    lessons: [
      {
        id: "scss-0",
        title: "Sass Variables vs CSS Variables",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A Sass variable like `$brand: #cf649a;` only exists while Sass compiles. Sass swaps every `$brand` for its value, and the browser never sees the variable at all. A CSS custom property like `--brand` is the opposite: it's sent to the browser and can change at runtime, for a theme or from JavaScript. Use Sass variables for build-time constants. One place they win outright is media queries — `@media (min-width: var(--md))` doesn't work in CSS, but `@media (min-width: $md)` does, because Sass writes in the number before the browser reads it.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Build-time values, gone after compiling",
            content: `$brand: #cf649a;
$bp-md: 48rem;
$radius: 8px !default;

.card {
  border: 2px solid $brand;
  border-radius: $radius;

  @media (min-width: $bp-md) {
    padding: 2rem;
  }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "!default means \"use this value unless one was already set\". It does nothing on its own, but it lets other code configure a file before loading it — you'll use that in the Modules chapter. A variable declared inside a { } block is local to that block.",
          },
          {
            type: "quiz",
            question: "Why does @media (min-width: $bp-md) work when @media (min-width: var(--bp-md)) doesn't?",
            options: [
              "Sass variables are faster than custom properties",
              "Sass replaces $bp-md with its value before the browser reads the media query; browsers don't allow var() in media queries",
              "Custom properties can only hold colours",
              "Media queries must be written in Sass",
            ],
            answer: 1,
            explanation:
              "Custom properties are resolved on elements, and a media query isn't attached to any element, so var() isn't allowed there. The Sass variable has already been turned into 48rem by the time the browser sees the CSS.",
          },
        ],
        challenge: {
          id: "scss-0-challenge",
          language: "scss",
          title: "Name the Repeated Values",
          description:
            "The brand colour #cf649a and the 48rem breakpoint are typed out again and again. Define `$brand: #cf649a;` and `$bp-md: 48rem;` at the top, then use the variables everywhere so each raw value appears only once.",
          previewHtml: `<button class="btn">Buy now</button>
<p><a class="link" href="#">See details</a></p>
<div class="panel">A panel that gets roomier on wider screens.</div>`,
          starterCode: `.btn {
  background: #cf649a;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;

  @media (min-width: 48rem) {
    padding: 0.8rem 1.6rem;
  }
}

.link {
  color: #cf649a;
}

.panel {
  border: 2px solid #cf649a;
  padding: 1rem;
  margin-top: 1rem;

  @media (min-width: 48rem) {
    padding: 2rem;
  }
}`,
          solutionCode: `$brand: #cf649a;
$bp-md: 48rem;

.btn {
  background: $brand;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;

  @media (min-width: $bp-md) {
    padding: 0.8rem 1.6rem;
  }
}

.link {
  color: $brand;
}

.panel {
  border: 2px solid $brand;
  padding: 1rem;
  margin-top: 1rem;

  @media (min-width: $bp-md) {
    padding: 2rem;
  }
}`,
          tests: [
            { id: 1, label: "Defines $brand and $bp-md", keywords: [{ pattern: "\\$brand\\s*:\\s*#cf649a\\s*;" }, { pattern: "\\$bp-md\\s*:\\s*48rem\\s*;" }] },
            { id: 2, label: "Each raw value is written only once", keywords: [{ pattern: "^(?![\\s\\S]*#cf649a[\\s\\S]*#cf649a)" }, { pattern: "^(?![\\s\\S]*48rem[\\s\\S]*48rem)" }] },
            { id: 3, label: "Compiled CSS still has the colour and the 48rem breakpoint", keywords: [{ target: "css", pattern: "\\.link\\s*\\{[^}]*color:\\s*#cf649a" }, { target: "css", pattern: "@media \\(min-width: 48rem\\)" }] },
          ],
        },
      },
      {
        id: "scss-1",
        title: "Nesting & the Parent Selector",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "In Sass, `&` is replaced by the parent selector **as text**, so you can glue things onto it. Inside `.card`, `&__title` becomes `.card__title` and `&--featured` becomes `.card--featured` — perfect for BEM class names. Native CSS nesting can't do this. You can also put `&` at the end: `.theme-dark &` becomes `.theme-dark .card`, which styles the card when it sits inside a dark-themed section.",
          },
          {
            type: "code",
            lang: "scss",
            label: "One block for a whole BEM component",
            content: `.card {
  padding: 1rem;

  &__title { font-weight: 700; }        // .card__title
  &--featured { border-color: gold; }   // .card--featured
  &:hover { box-shadow: 0 2px 8px #0002; } // .card:hover
  .theme-dark & { background: #111827; }  // .theme-dark .card
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Nesting that copies your HTML structure — .page { .main { .list { .item { a { ... } } } } } — compiles to long, very specific selectors that are hard to override. Try to stay within about three levels.",
          },
          {
            type: "quiz",
            question: "Inside .btn { ... }, what does &-icon { ... } compile to?",
            options: [".btn .icon", ".btn.icon", ".btn-icon", "&-icon"],
            answer: 2,
            explanation:
              "Sass replaces & with the parent selector text and keeps what follows it, so .btn plus -icon gives the new class .btn-icon.",
          },
        ],
        challenge: {
          id: "scss-1-challenge",
          language: "scss",
          title: "Nest a BEM Component",
          description:
            "Move every alert rule inside the `.alert` block: use `&__title`, `&__close` and `&--error`, and `.theme-dark &` for the dark version. When you're done, `.alert__`, `.alert--` and `.theme-dark .alert` shouldn't appear in your SCSS — only in the compiled CSS.",
          previewHtml: `<div class="alert">
  <p class="alert__title">Changes saved</p>
  <button class="alert__close" aria-label="Dismiss">×</button>
</div>
<div class="alert alert--error">
  <p class="alert__title">Upload failed</p>
  <button class="alert__close" aria-label="Dismiss">×</button>
</div>
<div class="theme-dark">
  <div class="alert"><p class="alert__title">Dark theme alert</p></div>
</div>`,
          starterCode: `.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #16a34a;
  background: #f0fdf4;
}

.alert__title {
  margin: 0;
  font-weight: 700;
}

.alert__close {
  border: none;
  background: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.alert--error {
  border-left-color: #dc2626;
  background: #fef2f2;
}

.theme-dark .alert {
  background: #1f2937;
  color: #f9fafb;
}`,
          solutionCode: `.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #16a34a;
  background: #f0fdf4;

  &__title {
    margin: 0;
    font-weight: 700;
  }

  &__close {
    border: none;
    background: none;
    font-size: 1.25rem;
    cursor: pointer;
  }

  &--error {
    border-left-color: #dc2626;
    background: #fef2f2;
  }

  .theme-dark & {
    background: #1f2937;
    color: #f9fafb;
  }
}`,
          tests: [
            { id: 1, label: "Uses &__title, &__close and &--error", keywords: [{ pattern: "&__title\\s*\\{" }, { pattern: "&__close\\s*\\{" }, { pattern: "&--error\\s*\\{" }] },
            { id: 2, label: "Dark version uses .theme-dark &, and no flat selectors remain", keywords: [{ pattern: "\\.theme-dark\\s+&\\s*\\{" }, { pattern: "^(?![\\s\\S]*\\.alert(__|--))" }, { pattern: "^(?![\\s\\S]*\\.theme-dark\\s+\\.alert)" }] },
            { id: 3, label: "Compiled CSS has the full BEM selectors", keywords: [{ target: "css", pattern: "\\.alert__title\\s*\\{" }, { target: "css", pattern: "\\.alert--error\\s*\\{" }, { target: "css", pattern: "\\.theme-dark \\.alert\\s*\\{" }] },
          ],
        },
      },
      {
        id: "scss-2",
        title: "Interpolation with #{}",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Sass variables work wherever CSS expects a **value**. To put a value somewhere else — inside a selector, a property name or a string — wrap it in `#{}`. That's **interpolation**. `.btn-#{$name}` builds a class name and `margin-#{$side}` builds a property name. You also need it for custom properties: Sass copies a custom property's value exactly as written, so `--brand: $brand;` outputs the text `$brand`, while `--brand: #{$brand};` outputs the colour.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Values in names, and in custom properties",
            content: `$name: "primary";
$side: "left";
$brand: #2563eb;

.btn-#{$name} { color: $brand; }  // .btn-primary
.box { margin-#{$side}: 1rem; }   // margin-left
:root { --brand: #{$brand}; }     // --brand: #2563eb`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Forgetting #{} in a custom property doesn't cause an error — Sass happily outputs --brand: $brand; and the browser gets a value it can't use. Check the compiled CSS whenever you set a custom property from Sass.",
          },
          {
            type: "quiz",
            question: "With $gap: 1rem, what does :root { --gap: $gap; } compile to?",
            options: [":root { --gap: 1rem; }", ":root { --gap: $gap; }", "A compile error", ":root { }"],
            answer: 1,
            explanation:
              "Sass leaves custom property values alone except for #{} interpolation, so the literal text $gap ends up in the CSS. Write --gap: #{$gap}; instead.",
          },
        ],
        challenge: {
          id: "scss-2-challenge",
          language: "scss",
          title: "Build Names from Variables",
          description:
            "Use interpolation three times: make the selector `.banner-#{$theme}`, the property `border-#{$edge}`, and set `--accent` to `#{$accent}`. The compiled CSS should contain `.banner-ocean`, `border-top` and `--accent: #0ea5e9`.",
          previewHtml: `<div class="banner-ocean">Ocean banner — its top border comes from Sass.</div>
<p style="color: var(--accent)">This text reads the --accent custom property.</p>`,
          starterCode: `$theme: "ocean";
$edge: "top";
$accent: #0ea5e9;

.banner-theme {
  padding: 1rem;
  background: #f0f9ff;
  border-edge: 4px solid $accent;
}

:root {
  --accent: $accent;
}`,
          solutionCode: `$theme: "ocean";
$edge: "top";
$accent: #0ea5e9;

.banner-#{$theme} {
  padding: 1rem;
  background: #f0f9ff;
  border-#{$edge}: 4px solid $accent;
}

:root {
  --accent: #{$accent};
}`,
          tests: [
            { id: 1, label: "Selector is built with #{$theme}", keywords: [{ pattern: "\\.banner-#\\{\\s*\\$theme\\s*\\}" }, { target: "css", pattern: "\\.banner-ocean\\s*\\{" }] },
            { id: 2, label: "Property name is built with #{$edge}", keywords: [{ pattern: "border-#\\{\\s*\\$edge\\s*\\}\\s*:" }, { target: "css", pattern: "border-top:\\s*4px solid #0ea5e9" }] },
            { id: 3, label: "--accent outputs the real colour", keywords: [{ target: "css", pattern: "--accent:\\s*#0ea5e9" }, { target: "css", pattern: "^(?![\\s\\S]*--accent:\\s*\\$accent)" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Mixins & @extend
  // ─────────────────────────────────────────────────────────────
  {
    id: "scss-mixins",
    title: "Mixins & @extend",
    icon: "🧰",
    color: "#8b5cf6",
    lessons: [
      {
        id: "scss-3",
        title: "Mixins with Arguments",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **mixin** is a reusable group of declarations. Define it with `@mixin name($arg) { ... }` and use it with `@include name(value);`. Arguments can have defaults — `$color: white` — so callers only pass what's different. You can also pass arguments by name: `@include button(#fff, $color: #2563eb)` skips straight to `$color`, which keeps calls readable when a mixin has several options.",
          },
          {
            type: "code",
            lang: "scss",
            label: "One mixin, several buttons",
            content: `@mixin button($bg, $color: white, $radius: 6px) {
  background: $bg;
  color: $color;
  border-radius: $radius;
  border: none;
  padding: 0.6rem 1.2rem;
}

.btn-primary { @include button(#2563eb); }
.btn-ghost { @include button(transparent, $color: #2563eb); }`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A mixin's declarations are copied into every rule that includes it. That's what makes arguments possible, but it also means ten buttons produce ten copies in the compiled CSS. The @extend lesson shows the alternative.",
          },
          {
            type: "quiz",
            question: "Using the mixin above, what colour does @include button(red, $radius: 0) give the text?",
            options: ["red", "white", "#2563eb", "None — it's an error"],
            answer: 1,
            explanation:
              "Only $bg and $radius were passed. $color wasn't, so it keeps its default value, white.",
          },
        ],
        challenge: {
          id: "scss-3-challenge",
          language: "scss",
          title: "Turn Repeated Buttons into a Mixin",
          description:
            "Write `@mixin button($bg, $color: white)` containing the shared declarations, and rebuild all three buttons with `@include button(...)`. The Cancel button needs dark text, so pass it by name: `$color: #111827`.",
          previewHtml: `<button class="btn-save">Save</button>
<button class="btn-delete">Delete</button>
<button class="btn-cancel">Cancel</button>`,
          starterCode: `.btn-save {
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
}

.btn-delete {
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
}

.btn-cancel {
  background: #e5e7eb;
  color: #111827;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
}`,
          solutionCode: `@mixin button($bg, $color: white) {
  background: $bg;
  color: $color;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
}

.btn-save {
  @include button(#16a34a);
}

.btn-delete {
  @include button(#dc2626);
}

.btn-cancel {
  @include button(#e5e7eb, $color: #111827);
}`,
          tests: [
            { id: 1, label: "Defines button($bg, $color: white)", keywords: [{ pattern: "@mixin\\s+button\\s*\\(\\s*\\$bg\\s*,\\s*\\$color\\s*:\\s*white\\s*\\)" }] },
            { id: 2, label: "All three buttons include it, and the shared padding is written once", keywords: [{ pattern: "(@include\\s+button\\s*\\([\\s\\S]*){3}" }, { pattern: "^(?![\\s\\S]*padding[\\s\\S]*padding)" }] },
            { id: 3, label: "Cancel passes $color by name and compiles to dark text", keywords: [{ pattern: "@include\\s+button\\s*\\([^)]*\\$color\\s*:\\s*#111827" }, { target: "css", pattern: "\\.btn-cancel\\s*\\{[^}]*background:\\s*#e5e7eb" }, { target: "css", pattern: "\\.btn-cancel\\s*\\{[^}]*color:\\s*#111827" }] },
          ],
        },
      },
      {
        id: "scss-4",
        title: "@content and a Breakpoint Mixin",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Arguments pass **values** into a mixin; `@content` passes a whole **block of styles**. Wherever the mixin writes `@content`, Sass drops in the block that followed `@include`. The classic use is a breakpoint mixin: write the media query once, then say `@include from(48rem) { ... }` inside any rule. If you ever change how breakpoints work, you change one mixin.",
          },
          {
            type: "code",
            lang: "scss",
            label: "A media query written once",
            content: `@mixin from($bp) {
  @media (min-width: $bp) {
    @content;
  }
}

.sidebar {
  display: none;

  @include from(48rem) {
    display: block;
  }
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "In the Maps chapter you'll upgrade this mixin to take a name like md instead of a raw number, so the breakpoint values live in one place.",
          },
          {
            type: "quiz",
            question: "What ends up where @content is written inside the mixin?",
            options: [
              "The mixin's arguments",
              "The block of styles written after @include from(...)",
              "Every rule in the stylesheet",
              "Nothing — @content is a comment",
            ],
            answer: 1,
            explanation:
              "@content is a placeholder for the block the caller passes in braces after the @include.",
          },
        ],
        challenge: {
          id: "scss-4-challenge",
          language: "scss",
          title: "Write a Breakpoint Mixin",
          description:
            "Write `@mixin from($bp)` that wraps `@content` in `@media (min-width: $bp)`. Then replace all three media queries with `@include from(40rem)` or `@include from(64rem)`, so `@media` appears only once — inside the mixin.",
          previewHtml: `<h1 class="title">Gallery</h1>
<div class="grid">
  <div>One</div><div>Two</div><div>Three</div><div>Four</div>
</div>`,
          starterCode: `.title {
  font-size: 1.5rem;

  @media (min-width: 64rem) {
    font-size: 2.25rem;
  }
}

.grid {
  display: grid;
  gap: 1rem;

  > div {
    background: #fce7f3;
    padding: 1rem;
  }

  @media (min-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
}`,
          solutionCode: `@mixin from($bp) {
  @media (min-width: $bp) {
    @content;
  }
}

.title {
  font-size: 1.5rem;

  @include from(64rem) {
    font-size: 2.25rem;
  }
}

.grid {
  display: grid;
  gap: 1rem;

  > div {
    background: #fce7f3;
    padding: 1rem;
  }

  @include from(40rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include from(64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
}`,
          tests: [
            { id: 1, label: "from($bp) wraps @content in a min-width media query", keywords: [{ pattern: "@mixin\\s+from\\s*\\(\\s*\\$bp\\s*\\)\\s*\\{\\s*@media\\s*\\(\\s*min-width\\s*:\\s*\\$bp\\s*\\)\\s*\\{\\s*@content\\s*;?\\s*\\}" }] },
            { id: 2, label: "Rules use @include from(...) and @media appears once", keywords: [{ pattern: "@include\\s+from\\s*\\(\\s*40rem\\s*\\)" }, { pattern: "@include\\s+from\\s*\\(\\s*64rem\\s*\\)" }, { pattern: "^(?![\\s\\S]*@media[\\s\\S]*@media)" }] },
            { id: 3, label: "Compiled CSS has both breakpoints", keywords: [{ target: "css", pattern: "@media \\(min-width: 40rem\\)\\s*\\{\\s*\\.grid\\s*\\{\\s*grid-template-columns:\\s*repeat\\(2,\\s*1fr\\)" }, { target: "css", pattern: "@media \\(min-width: 64rem\\)\\s*\\{\\s*\\.title\\s*\\{\\s*font-size:\\s*2\\.25rem" }] },
          ],
        },
      },
      {
        id: "scss-5",
        title: "@extend and Placeholder Selectors",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **placeholder selector** starts with `%` — `%message { ... }` — and never appears in the CSS by itself. When a rule says `@extend %message;`, Sass adds that rule's selector to the placeholder's rule. Three rules extending `%message` compile to **one** grouped rule, `.success, .error, .info { ... }`, instead of three copies. Mixins copy; `@extend` groups.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Shared styles, written out once",
            content: `%message {
  padding: 0.75rem 1rem;
  border-radius: 6px;
}

.success { @extend %message; background: #dcfce7; }
.error { @extend %message; background: #fee2e2; }

/* Compiles to:
.success, .error { padding: ...; border-radius: 6px; }
.success { background: #dcfce7; }
.error { background: #fee2e2; } */`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Extend placeholders, not ordinary classes. Extending a class like .btn also copies every other selector that mentions .btn, which can create surprising rules. And @extend can't take arguments — when styles need to vary, use a mixin.",
          },
          {
            type: "quiz",
            question: "Two rules each @extend %card. What does the compiled CSS contain for the placeholder's styles?",
            options: [
              "Two identical copies of the styles",
              "A rule named %card",
              "One rule whose selector lists both classes",
              "Nothing — placeholders are never output",
            ],
            answer: 2,
            explanation:
              "The placeholder's name disappears, but its rule is output once with every extending selector grouped in front of it.",
          },
        ],
        challenge: {
          id: "scss-5-challenge",
          language: "scss",
          title: "Group Toast Styles with a Placeholder",
          description:
            "Create a `%toast` placeholder holding the four shared declarations, and have `.toast-success`, `.toast-error` and `.toast-info` each `@extend %toast;` and keep only their own background. The compiled CSS should have one grouped rule for the shared styles.",
          previewHtml: `<div class="toast-success">Saved</div>
<div class="toast-error">Something went wrong</div>
<div class="toast-info">New version available</div>`,
          starterCode: `.toast-success {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  background: #dcfce7;
}

.toast-error {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  background: #fee2e2;
}

.toast-info {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  background: #dbeafe;
}`,
          solutionCode: `%toast {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
}

.toast-success {
  @extend %toast;
  background: #dcfce7;
}

.toast-error {
  @extend %toast;
  background: #fee2e2;
}

.toast-info {
  @extend %toast;
  background: #dbeafe;
}`,
          tests: [
            { id: 1, label: "Defines a %toast placeholder", keywords: [{ pattern: "%toast\\s*\\{" }, { pattern: "^(?![\\s\\S]*padding[\\s\\S]*padding)" }] },
            { id: 2, label: "All three toasts @extend %toast", keywords: [{ pattern: "(@extend\\s+%toast\\s*;[\\s\\S]*){3}" }] },
            { id: 3, label: "Compiled CSS groups the three selectors in one rule", keywords: [{ target: "css", pattern: "(\\.toast-(success|error|info),\\s*){2}\\.toast-(success|error|info)\\s*\\{[^}]*padding" }, { target: "css", pattern: "^(?![\\s\\S]*%toast)" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Modules: @use & @forward
  // ─────────────────────────────────────────────────────────────
  {
    id: "scss-modules",
    title: "Modules: @use & @forward",
    icon: "📦",
    color: "#0ea5e9",
    lessons: [
      {
        id: "scss-6",
        title: "Partials and @use",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Real projects split Sass into **partials** — files whose names start with `_`, like `_tokens.scss`, which are never compiled on their own. `@use \"tokens\";` loads one (no underscore or extension needed). Everything it defines is reached through a **namespace**: `tokens.$brand`, `@include tokens.focus-ring;`. Add `as t` to shorten it to `t.$brand`. Namespaces make it obvious where each variable comes from, and two files can both have a `$brand` without clashing.",
          },
          {
            type: "code",
            lang: "scss",
            label: "styles.scss loading _tokens.scss",
            modules: {
              "_tokens.scss": `$brand: #cf649a;
$space: 1rem;`,
            },
            content: `// _tokens.scss contains:
//   $brand: #cf649a;
//   $space: 1rem;

@use "tokens" as t;

.card {
  padding: t.$space;
  color: t.$brand;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Older code uses @import instead. It makes everything global, loads a file again every time it's imported, and is deprecated — Dart Sass 3 removes it. Use @use in new code; you'll see Sass warn about @import in the compiled output.",
          },
          {
            type: "quiz",
            question: "After @use \"tokens\" as t;, how do you read the $brand variable from _tokens.scss?",
            options: ["$brand", "tokens.$brand", "t.$brand", "$t.brand"],
            answer: 2,
            explanation:
              "as t renames the namespace, so members are reached as t.$brand. Without as, it would be tokens.$brand.",
          },
        ],
        challenge: {
          id: "scss-6-challenge",
          language: "scss",
          title: "Switch from @import to @use",
          description:
            "This file loads `_tokens.scss` with the deprecated `@import` (run it to see Sass's warning). Replace it with `@use \"tokens\" as t;` and reach every member through the namespace: `t.$brand`, `t.$space` and `@include t.focus-ring;`.",
          modules: {
            "_tokens.scss": `$brand: #cf649a;
$space: 1rem;

@mixin focus-ring {
  outline: 3px solid $brand;
  outline-offset: 2px;
}`,
          },
          previewHtml: `<div class="card">
  <p>Press Tab to focus the button.</p>
  <button class="btn">Continue</button>
</div>`,
          starterCode: `// _tokens.scss (already in the project) contains:
//   $brand: #cf649a;
//   $space: 1rem;
//   @mixin focus-ring { outline: 3px solid $brand; outline-offset: 2px; }

@import "tokens";

.card {
  padding: $space;
  border: 2px solid $brand;
}

.btn {
  background: $brand;
  color: white;
  border: none;
  padding: 0.5rem 1rem;

  &:focus-visible {
    @include focus-ring;
  }
}`,
          solutionCode: `// _tokens.scss (already in the project) contains:
//   $brand: #cf649a;
//   $space: 1rem;
//   @mixin focus-ring { outline: 3px solid $brand; outline-offset: 2px; }

@use "tokens" as t;

.card {
  padding: t.$space;
  border: 2px solid t.$brand;
}

.btn {
  background: t.$brand;
  color: white;
  border: none;
  padding: 0.5rem 1rem;

  &:focus-visible {
    @include t.focus-ring;
  }
}`,
          tests: [
            { id: 1, label: "Loads the partial with @use \"tokens\" as t", keywords: [{ pattern: "@use\\s+[\"']tokens[\"']\\s+as\\s+t\\s*;" }, { pattern: "^(?![\\s\\S]*@import)" }] },
            { id: 2, label: "Variables and the mixin use the t. namespace", keywords: [{ pattern: "t\\.\\$brand" }, { pattern: "t\\.\\$space" }, { pattern: "@include\\s+t\\.focus-ring" }] },
            { id: 3, label: "Compiled CSS has the token values", keywords: [{ target: "css", pattern: "\\.card\\s*\\{[^}]*padding:\\s*1rem" }, { target: "css", pattern: "\\.btn:focus-visible\\s*\\{[^}]*outline:\\s*3px solid #cf649a" }] },
          ],
        },
      },
      {
        id: "scss-7",
        title: "@forward, Index Files & Configuration",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`@forward \"buttons\";` passes a module's members **through** to whoever loads the current file. That's how index files work: `components/_index.scss` forwards each component, and `@use \"components\";` loads the whole folder at once. Modules can also be **configured** when they're first loaded: `@use \"theme\" with ($brand: #16a34a);` overrides `$brand` — as long as the module declared it with `!default`. This is how libraries like Bootstrap let you change their colours.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Configure first, then load the components",
            modules: {
              "_theme.scss": `$brand: #cf649a !default;`,
              "components/_buttons.scss": `@use "../theme";
.btn { background: theme.$brand; }`,
              "components/_index.scss": `@forward "buttons";`,
            },
            content: `// _theme.scss:             $brand: #cf649a !default;
// components/_buttons.scss: @use "../theme";
//                           .btn { background: theme.$brand; }
// components/_index.scss:   @forward "buttons";

@use "theme" with ($brand: #16a34a);
@use "components";`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A module runs only once per compile, and the first @use decides its configuration. So configure theme before loading anything that uses it. Trying to configure a variable that wasn't declared with !default is a compile error.",
          },
          {
            type: "quiz",
            question: "What does @use \"components\"; load when there's a components/ folder?",
            options: [
              "Every .scss file in the folder",
              "components/_index.scss",
              "Nothing — you must name each file",
              "components.css",
            ],
            answer: 1,
            explanation:
              "When the URL points at a folder, Sass loads its _index.scss, which usually @forwards the files inside.",
          },
        ],
        challenge: {
          id: "scss-7-challenge",
          language: "scss",
          title: "Configure a Theme and Load Its Components",
          description:
            "The project has a `theme` module and a `components` folder with an index file (their contents are in the comment). Replace the two separate `@use` lines with: `@use \"theme\" with (...)` setting `$brand: #16a34a` and `$radius: 0`, followed by a single `@use \"components\";`.",
          modules: {
            "_theme.scss": `$brand: #cf649a !default;
$radius: 8px !default;`,
            "components/_buttons.scss": `@use "../theme";

.btn {
  background: theme.$brand;
  border-radius: theme.$radius;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
}`,
            "components/_cards.scss": `@use "../theme";

.card {
  border: 2px solid theme.$brand;
  border-radius: theme.$radius;
  padding: 1rem;
  margin-bottom: 1rem;
}`,
            "components/_index.scss": `@forward "buttons";
@forward "cards";`,
          },
          previewHtml: `<div class="card">A themed card</div>
<button class="btn">A themed button</button>`,
          starterCode: `// Project files:
//   _theme.scss               $brand: #cf649a !default;  $radius: 8px !default;
//   components/_buttons.scss  .btn uses theme.$brand and theme.$radius
//   components/_cards.scss    .card uses theme.$brand and theme.$radius
//   components/_index.scss    @forward "buttons"; @forward "cards";

@use "components/buttons";
@use "components/cards";`,
          solutionCode: `// Project files:
//   _theme.scss               $brand: #cf649a !default;  $radius: 8px !default;
//   components/_buttons.scss  .btn uses theme.$brand and theme.$radius
//   components/_cards.scss    .card uses theme.$brand and theme.$radius
//   components/_index.scss    @forward "buttons"; @forward "cards";

@use "theme" with (
  $brand: #16a34a,
  $radius: 0
);
@use "components";`,
          tests: [
            { id: 1, label: "Configures theme with $brand and $radius", keywords: [{ pattern: "@use\\s+[\"']theme[\"']\\s+with\\s*\\([^)]*\\$brand\\s*:\\s*#16a34a" }, { pattern: "@use\\s+[\"']theme[\"']\\s+with\\s*\\([^)]*\\$radius\\s*:\\s*0" }] },
            { id: 2, label: "Loads the folder with one @use \"components\"", keywords: [{ pattern: "@use\\s+[\"']components[\"']\\s*;" }, { pattern: "^(?![\\s\\S]*@use\\s+[\"']components/)" }] },
            { id: 3, label: "Compiled button and card use the new theme", keywords: [{ target: "css", pattern: "\\.btn\\s*\\{[^}]*background:\\s*#16a34a[^}]*border-radius:\\s*0" }, { target: "css", pattern: "\\.card\\s*\\{[^}]*border:\\s*2px solid #16a34a" }] },
          ],
        },
      },
      {
        id: "scss-8",
        title: "Built-in Modules: math and color",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Sass's own functions live in built-in modules you load with `@use`. From `sass:math`: `math.div(24px, 2)` divides — the old `24px / 2` is deprecated because `/` also means \"separator\" in CSS (`grid-area: 1 / 3`). From `sass:color`: `color.adjust($c, $lightness: -10%)` shifts a colour by a fixed amount, and `color.scale($c, $lightness: 40%)` moves it a percentage of the way towards white or black — which gives more even tints across different colours.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Modern replacements for old habits",
            content: `@use "sass:math";
@use "sass:color";

$gutter: 24px;
$brand: #cf649a;

.col { padding: math.div($gutter, 2); }                   // 12px
.btn:hover { background: color.scale($brand, $lightness: -20%); }
.tag { background: color.scale($brand, $lightness: 80%); }`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "darken(), lighten() and the other global colour functions are deprecated too. They still compile for now, but Sass prints a warning — this course's compiled output panel shows those warnings so you can spot them.",
          },
          {
            type: "quiz",
            question: "Why is math.div($a, $b) preferred over $a / $b?",
            options: [
              "math.div is faster",
              "/ already means a separator in CSS, so Sass is removing it as division",
              "/ only works with pixels",
              "math.div rounds the result",
            ],
            answer: 1,
            explanation:
              "Values like font: 16px/1.5 and grid-area: 1 / 3 use / as a separator. To stop the ambiguity, Sass is phasing out / as division in favour of math.div().",
          },
        ],
        challenge: {
          id: "scss-8-challenge",
          language: "scss",
          title: "Fix the Deprecation Warnings",
          description:
            "Run this first and read Sass's warnings. Then load `sass:math` and `sass:color`, replace `$gutter / 2` with `math.div($gutter, 2)`, and replace `darken()` and `lighten()` with `color.scale()` (use `$lightness: -20%` for the hover and `$lightness: 80%` for the tag).",
          previewHtml: `<div class="col">A column with half-gutter padding <span class="tag">New</span></div>
<button class="btn">Hover me</button>`,
          starterCode: `$gutter: 24px;
$brand: #cf649a;

.col {
  padding: $gutter / 2;
  background: #fdf2f8;
}

.btn {
  background: $brand;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;

  &:hover {
    background: darken($brand, 15%);
  }
}

.tag {
  background: lighten($brand, 30%);
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
}`,
          solutionCode: `@use "sass:math";
@use "sass:color";

$gutter: 24px;
$brand: #cf649a;

.col {
  padding: math.div($gutter, 2);
  background: #fdf2f8;
}

.btn {
  background: $brand;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;

  &:hover {
    background: color.scale($brand, $lightness: -20%);
  }
}

.tag {
  background: color.scale($brand, $lightness: 80%);
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
}`,
          tests: [
            { id: 1, label: "Loads sass:math and sass:color", keywords: [{ pattern: "@use\\s+[\"']sass:math[\"']" }, { pattern: "@use\\s+[\"']sass:color[\"']" }] },
            { id: 2, label: "Divides with math.div()", keywords: [{ pattern: "math\\.div\\(\\s*\\$gutter\\s*,\\s*2\\s*\\)" }, { pattern: "^(?![\\s\\S]*\\$gutter\\s*/)" }, { target: "css", pattern: "\\.col\\s*\\{[^}]*padding:\\s*12px" }] },
            { id: 3, label: "Colours use color.scale(), not darken() or lighten()", keywords: [{ pattern: "&:hover\\s*\\{[^}]*color\\.scale\\(\\s*\\$brand\\s*,\\s*\\$lightness\\s*:\\s*-20%\\s*\\)" }, { pattern: "\\.tag\\s*\\{[^}]*color\\.scale\\(\\s*\\$brand\\s*,\\s*\\$lightness\\s*:\\s*80%\\s*\\)" }, { pattern: "^(?![\\s\\S]*(darken|lighten)\\()" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Lists, Maps & Loops
  // ─────────────────────────────────────────────────────────────
  {
    id: "scss-data",
    title: "Lists, Maps & Loops",
    icon: "🗂️",
    color: "#f59e0b",
    lessons: [
      {
        id: "scss-9",
        title: "Lists and @each",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A Sass **list** is several values separated by spaces or commas: `$sizes: sm, md, lg;`. `@each $size in $sizes { ... }` runs its block once per item, and with interpolation it can generate a class for each. Items can themselves be lists, and `@each` can unpack them: `@each $name, $color in $tags` gives you both halves of each `name color` pair.",
          },
          {
            type: "code",
            lang: "scss",
            label: "One loop, one class per item",
            content: `$tags: html #e34c26, css #264de4;

@each $name, $color in $tags {
  .tag-#{$name} {
    background: $color;
  }
}
// .tag-html { background: #e34c26; }
// .tag-css { background: #264de4; }`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Commas separate the pairs and spaces separate the two halves of each pair. The sass:list module (list.length, list.nth) helps when you need an item's position.",
          },
          {
            type: "quiz",
            question: "With $sizes: sm, md, lg;, how many rules does @each $s in $sizes { .text-#{$s} { ... } } create?",
            options: ["1", "3", "6", "It depends on the HTML"],
            answer: 1,
            explanation:
              "The loop runs once per item — three items, three rules: .text-sm, .text-md and .text-lg.",
          },
        ],
        challenge: {
          id: "scss-9-challenge",
          language: "scss",
          title: "Generate Tag Classes from a List",
          description:
            "Replace the hand-written tag rules with a list and a loop. Define `$tags` as name/colour pairs for html `#e34c26`, css `#264de4`, js `#f0db4f` and a new one, sass `#cf649a`. Then use `@each $name, $color in $tags` to generate `.tag-#{$name}` rules that set the background.",
          previewHtml: `<span class="tag tag-html">HTML</span>
<span class="tag tag-css">CSS</span>
<span class="tag tag-js">JS</span>
<span class="tag tag-sass">Sass</span>`,
          starterCode: `.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  color: #111827;
}

.tag-html {
  background: #e34c26;
}

.tag-css {
  background: #264de4;
}

.tag-js {
  background: #f0db4f;
}`,
          solutionCode: `$tags: html #e34c26, css #264de4, js #f0db4f, sass #cf649a;

.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  color: #111827;
}

@each $name, $color in $tags {
  .tag-#{$name} {
    background: $color;
  }
}`,
          tests: [
            { id: 1, label: "Defines a $tags list and loops over it", keywords: [{ pattern: "\\$tags\\s*:" }, { pattern: "@each\\s+\\$name\\s*,\\s*\\$color\\s+in\\s+\\$tags" }] },
            { id: 2, label: "Class names come from interpolation, not hand-written rules", keywords: [{ pattern: "\\.tag-#\\{\\s*\\$name\\s*\\}" }, { pattern: "^(?![\\s\\S]*\\.tag-(html|css|js|sass))" }] },
            { id: 3, label: "Compiled CSS has all four tags, including sass", keywords: [{ target: "css", pattern: "\\.tag-html\\s*\\{\\s*background:\\s*#e34c26" }, { target: "css", pattern: "\\.tag-js\\s*\\{\\s*background:\\s*#f0db4f" }, { target: "css", pattern: "\\.tag-sass\\s*\\{\\s*background:\\s*#cf649a" }] },
          ],
        },
      },
      {
        id: "scss-10",
        title: "Maps and the sass:map Module",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A **map** stores named values: `$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);`. Load `sass:map` to work with it: `map.get($breakpoints, md)` returns `48rem`, `map.has-key()` checks a name exists, and `map.merge()` combines two maps. Maps are the natural home for design tokens, because code can ask for a value **by name** instead of repeating the number.",
          },
          {
            type: "code",
            lang: "scss",
            label: "A breakpoint mixin that takes a name",
            content: `@use "sass:map";

$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);

@mixin from($name) {
  @media (min-width: map.get($breakpoints, $name)) {
    @content;
  }
}

.nav {
  @include from(md) { display: flex; }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Maps can also be looped over: @each $name, $value in $breakpoints { ... } gives you each key and value in turn. The next lesson uses that to generate utility classes.",
          },
          {
            type: "quiz",
            question: "What does map.get((sm: 36rem, md: 48rem), md) return?",
            options: ["md", "36rem", "48rem", "(md: 48rem)"],
            answer: 2,
            explanation: "map.get looks up the key and returns its value: 48rem.",
          },
        ],
        challenge: {
          id: "scss-10-challenge",
          language: "scss",
          title: "Look Up Breakpoints by Name",
          description:
            "Load `sass:map` and add `$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);`. Change the mixin to `from($name)` and look the width up with `map.get($breakpoints, $name)`. Then call it as `@include from(md)` and `@include from(lg)`.",
          previewHtml: `<nav class="nav"><a href="#">Home</a> <a href="#">Docs</a> <a href="#">Blog</a></nav>
<main class="content">Main content</main>`,
          starterCode: `@mixin from($bp) {
  @media (min-width: $bp) {
    @content;
  }
}

.nav {
  display: grid;
  gap: 0.5rem;

  @include from(48rem) {
    display: flex;
  }
}

.content {
  padding: 1rem;

  @include from(64rem) {
    padding: 2rem;
  }
}`,
          solutionCode: `@use "sass:map";

$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);

@mixin from($name) {
  @media (min-width: map.get($breakpoints, $name)) {
    @content;
  }
}

.nav {
  display: grid;
  gap: 0.5rem;

  @include from(md) {
    display: flex;
  }
}

.content {
  padding: 1rem;

  @include from(lg) {
    padding: 2rem;
  }
}`,
          tests: [
            { id: 1, label: "Loads sass:map and defines the $breakpoints map", keywords: [{ pattern: "@use\\s+[\"']sass:map[\"']" }, { pattern: "\\$breakpoints\\s*:\\s*\\(\\s*sm\\s*:\\s*36rem\\s*,\\s*md\\s*:\\s*48rem\\s*,\\s*lg\\s*:\\s*64rem\\s*,?\\s*\\)" }] },
            { id: 2, label: "The mixin looks up $name with map.get()", keywords: [{ pattern: "@mixin\\s+from\\s*\\(\\s*\\$name\\s*\\)" }, { pattern: "map\\.get\\(\\s*\\$breakpoints\\s*,\\s*\\$name\\s*\\)" }] },
            { id: 3, label: "Rules call from(md) and from(lg)", keywords: [{ pattern: "@include\\s+from\\(\\s*md\\s*\\)" }, { pattern: "@include\\s+from\\(\\s*lg\\s*\\)" }, { target: "css", pattern: "@media \\(min-width: 48rem\\)" }, { target: "css", pattern: "@media \\(min-width: 64rem\\)" }] },
          ],
        },
      },
      {
        id: "scss-11",
        title: "Generating Utility Classes",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Put a map, a loop and interpolation together and you can generate a whole family of classes from one scale. `@each $key, $value in $space` over `(1: 0.25rem, 2: 0.5rem, 3: 1rem)` can output `.mt-1`, `.mt-2`, `.mt-3`. Add a key to the map and a new class appears everywhere — the same idea utility frameworks are built on.",
          },
          {
            type: "code",
            lang: "scss",
            label: "A spacing scale → utility classes",
            content: `$space: (1: 0.25rem, 2: 0.5rem, 3: 1rem);

@each $key, $value in $space {
  .mt-#{$key} { margin-top: $value; }
  .p-#{$key} { padding: $value; }
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Every combination ends up in the CSS whether you use it or not. Five sizes × ten properties is fifty rules. Generate only the utilities your project actually needs.",
          },
          {
            type: "quiz",
            question: "The loop above runs over a map with 3 keys and writes 2 rules each time. How many rules does it output?",
            options: ["2", "3", "5", "6"],
            answer: 3,
            explanation: "Three iterations × two rules per iteration = six rules: .mt-1 to .mt-3 and .p-1 to .p-3.",
          },
        ],
        challenge: {
          id: "scss-11-challenge",
          language: "scss",
          title: "Generate Spacing Utilities",
          description:
            "Add `5: 4rem` to the `$space` map. Then delete the hand-written classes and use `@each` over the map to generate `.mt-#{$key}` (margin-top) and `.p-#{$key}` (padding) for every key.",
          previewHtml: `<div class="p-3" style="background:#fce7f3">.p-3</div>
<div class="mt-4 p-5" style="background:#e0f2fe">.mt-4 .p-5</div>`,
          starterCode: `$space: (1: 0.25rem, 2: 0.5rem, 3: 1rem, 4: 2rem);

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }`,
          solutionCode: `$space: (1: 0.25rem, 2: 0.5rem, 3: 1rem, 4: 2rem, 5: 4rem);

@each $key, $value in $space {
  .mt-#{$key} {
    margin-top: $value;
  }
  .p-#{$key} {
    padding: $value;
  }
}`,
          tests: [
            { id: 1, label: "The scale has a 5: 4rem step", keywords: [{ pattern: "\\$space\\s*:\\s*\\([^)]*5\\s*:\\s*4rem" }] },
            { id: 2, label: "@each loops over $space, with no hand-written utilities", keywords: [{ pattern: "@each\\s+\\$[\\w-]+\\s*,\\s*\\$[\\w-]+\\s+in\\s+\\$space" }, { pattern: "^(?![\\s\\S]*\\.(mt|p)-\\d)" }] },
            { id: 3, label: "Compiled CSS has .mt-1 through .p-5", keywords: [{ target: "css", pattern: "\\.mt-1\\s*\\{\\s*margin-top:\\s*0\\.25rem" }, { target: "css", pattern: "\\.mt-4\\s*\\{\\s*margin-top:\\s*2rem" }, { target: "css", pattern: "\\.p-5\\s*\\{\\s*padding:\\s*4rem" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Control Flow & Functions
  // ─────────────────────────────────────────────────────────────
  {
    id: "scss-logic",
    title: "Control Flow & Functions",
    icon: "🔀",
    color: "#10b981",
    lessons: [
      {
        id: "scss-12",
        title: "@if and @else",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`@if` lets Sass make decisions while compiling: `@if condition { ... } @else if other { ... } @else { ... }`. Conditions use `==`, `!=`, `<`, `>`, `and`, `or` and `not`. A practical example is choosing readable text for any background: `color.channel($bg, \"lightness\", $space: hsl)` returns how light a colour is as a percentage, so a mixin can pick dark text on light backgrounds and white text on dark ones.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Text colour chosen from the background",
            content: `@use "sass:color";

@mixin on-color($bg) {
  background: $bg;

  @if color.channel($bg, "lightness", $space: hsl) > 55% {
    color: #111827;
  } @else {
    color: white;
  }
}

.badge-warning { @include on-color(#fde047); } // dark text
.badge-danger { @include on-color(#b91c1c); }  // white text`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Lightness is only a rough guide to contrast. It's a good default for generated variants, but check the final colours with a contrast checker — the Web Accessibility course covers the WCAG ratios.",
          },
          {
            type: "quiz",
            question: "Which values count as false in a Sass @if?",
            options: [
              "0 and empty strings",
              "Only false and null",
              "false, null, 0 and \"\"",
              "Any value that isn't a number",
            ],
            answer: 1,
            explanation:
              "Unlike JavaScript, Sass treats only false and null as falsey. 0, empty strings and empty lists all count as true.",
          },
        ],
        challenge: {
          id: "scss-12-challenge",
          language: "scss",
          title: "Pick Readable Text Automatically",
          description:
            "The warning badge is yellow, so white text is unreadable. Load `sass:color` and add an `@if` / `@else` to the mixin: if `color.channel($bg, \"lightness\", $space: hsl)` is above 55%, use `color: #111827`; otherwise use `color: white`.",
          previewHtml: `<span class="badge-info">Info</span>
<span class="badge-warning">Warning</span>
<span class="badge-danger">Danger</span>`,
          starterCode: `@mixin badge($bg) {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: $bg;
  color: white;
}

.badge-info {
  @include badge(#1d4ed8);
}

.badge-warning {
  @include badge(#fde047);
}

.badge-danger {
  @include badge(#b91c1c);
}`,
          solutionCode: `@use "sass:color";

@mixin badge($bg) {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: $bg;

  @if color.channel($bg, "lightness", $space: hsl) > 55% {
    color: #111827;
  } @else {
    color: white;
  }
}

.badge-info {
  @include badge(#1d4ed8);
}

.badge-warning {
  @include badge(#fde047);
}

.badge-danger {
  @include badge(#b91c1c);
}`,
          tests: [
            { id: 1, label: "Checks lightness with color.channel() in an @if", keywords: [{ pattern: "@use\\s+[\"']sass:color[\"']" }, { pattern: "@if[^{]*color\\.channel\\([^)]*lightness" }] },
            { id: 2, label: "Has an @else branch", keywords: [{ pattern: "\\}\\s*@else\\s*\\{" }] },
            { id: 3, label: "Warning gets dark text; info and danger get white", keywords: [{ target: "css", pattern: "\\.badge-warning\\s*\\{[^}]*color:\\s*#111827" }, { target: "css", pattern: "\\.badge-info\\s*\\{[^}]*color:\\s*white" }, { target: "css", pattern: "\\.badge-danger\\s*\\{[^}]*color:\\s*white" }] },
          ],
        },
      },
      {
        id: "scss-13",
        title: "@for Loops",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`@for $i from 1 through 12 { ... }` counts from 1 up to **and including** 12; `from 1 to 12` stops **before** 12. It's useful when the output depends on a number rather than a list — like grid column classes, where `.col-#{$i}` gets `width: math.percentage(math.div($i, 12))`. (There's also `@while`, but `@for` and `@each` cover almost every real case.)",
          },
          {
            type: "code",
            lang: "scss",
            label: "Column widths from a count",
            content: `@use "sass:math";

$columns: 4;

@for $i from 1 through $columns {
  .col-#{$i} {
    width: math.percentage(math.div($i, $columns));
  }
}
// .col-1 { width: 25%; } … .col-4 { width: 100%; }`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "math.percentage(0.5) gives 50%. It multiplies a unitless number by 100 and adds the % unit.",
          },
          {
            type: "quiz",
            question: "How many times does @for $i from 1 to 5 run?",
            options: ["4", "5", "6", "It never runs"],
            answer: 0,
            explanation: "to excludes the end value, so $i is 1, 2, 3 and 4. Use through to include 5.",
          },
        ],
        challenge: {
          id: "scss-13-challenge",
          language: "scss",
          title: "Generate Grid Columns",
          description:
            "Replace the hand-written columns with `@for $i from 1 through 6` that generates `.col-#{$i}` with `width: math.percentage(math.div($i, 6))`. Remember to load `sass:math`. All six classes should appear in the compiled CSS.",
          previewHtml: `<div class="row">
  <div class="col-2">col-2</div><div class="col-4">col-4</div>
</div>
<div class="row">
  <div class="col-3">col-3</div><div class="col-3">col-3</div>
</div>`,
          starterCode: `.row {
  display: flex;
  margin-bottom: 0.5rem;

  > * {
    background: #fce7f3;
    outline: 1px solid white;
    padding: 0.5rem;
  }
}

.col-1 { width: 16.6666666667%; }
.col-2 { width: 33.3333333333%; }
.col-3 { width: 50%; }`,
          solutionCode: `@use "sass:math";

.row {
  display: flex;
  margin-bottom: 0.5rem;

  > * {
    background: #fce7f3;
    outline: 1px solid white;
    padding: 0.5rem;
  }
}

@for $i from 1 through 6 {
  .col-#{$i} {
    width: math.percentage(math.div($i, 6));
  }
}`,
          tests: [
            { id: 1, label: "Uses @for $i from 1 through 6", keywords: [{ pattern: "@for\\s+\\$i\\s+from\\s+1\\s+through\\s+6" }] },
            { id: 2, label: "Width uses math.percentage(math.div($i, 6))", keywords: [{ pattern: "@use\\s+[\"']sass:math[\"']" }, { pattern: "math\\.percentage\\(\\s*math\\.div\\(\\s*\\$i\\s*,\\s*6\\s*\\)\\s*\\)" }, { pattern: "^(?![\\s\\S]*\\.col-\\d)" }] },
            { id: 3, label: "Compiled CSS has .col-1 to .col-6", keywords: [{ target: "css", pattern: "\\.col-1\\s*\\{\\s*width:\\s*16\\.66" }, { target: "css", pattern: "\\.col-3\\s*\\{\\s*width:\\s*50%" }, { target: "css", pattern: "\\.col-6\\s*\\{\\s*width:\\s*100%" }] },
          ],
        },
      },
      {
        id: "scss-14",
        title: "Writing Functions with @function",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A mixin outputs **declarations**; a function returns a **value**. Write one with `@function name($args) { @return ...; }` and call it anywhere a value goes: `font-size: rem(18px);`. A common example converts pixel sizes from a design into rems: `math.div($px, 16px) * 1rem` — dividing px by px cancels the unit, and multiplying by `1rem` adds the new one.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Pixels from the design, rems in the CSS",
            content: `@use "sass:math";

@function rem($px, $base: 16px) {
  @return math.div($px, $base) * 1rem;
}

h2 { font-size: rem(24px); }   // 1.5rem
.card { padding: rem(20px); }  // 1.25rem`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Don't name your function after a CSS function such as min, max or clamp — Sass has to decide which one you meant, and the result can surprise you.",
          },
          {
            type: "quiz",
            question: "What's the key difference between @mixin and @function?",
            options: [
              "Functions can't take arguments",
              "A mixin outputs declarations with @include; a function returns one value with @return",
              "Functions only work with colours",
              "Mixins must be in a separate file",
            ],
            answer: 1,
            explanation:
              "@include a mixin to paste in declarations; call a function inside a value to compute something and get it back.",
          },
        ],
        challenge: {
          id: "scss-14-challenge",
          language: "scss",
          title: "Convert Pixels to rem",
          description:
            "Write `@function rem($px, $base: 16px)` that returns `math.div($px, $base) * 1rem` (load `sass:math`). Then change every pixel size to use it — `rem(14px)`, `rem(18px)`, `rem(32px)` and `rem(24px)` — so no `px` sizes remain outside the function.",
          previewHtml: `<section class="section">
  <h1>Page title</h1>
  <p class="lead">A slightly larger introduction.</p>
  <p class="body-text">Regular body text.</p>
</section>`,
          starterCode: `h1 {
  font-size: 32px;
}

.lead {
  font-size: 18px;
}

.body-text {
  font-size: 14px;
}

.section {
  padding: 24px;
  background: #fdf2f8;
}`,
          solutionCode: `@use "sass:math";

@function rem($px, $base: 16px) {
  @return math.div($px, $base) * 1rem;
}

h1 {
  font-size: rem(32px);
}

.lead {
  font-size: rem(18px);
}

.body-text {
  font-size: rem(14px);
}

.section {
  padding: rem(24px);
  background: #fdf2f8;
}`,
          tests: [
            { id: 1, label: "Defines rem($px, $base: 16px) with math.div()", keywords: [{ pattern: "@function\\s+rem\\s*\\(\\s*\\$px\\s*,\\s*\\$base\\s*:\\s*16px\\s*\\)" }, { pattern: "@return\\s+math\\.div\\(\\s*\\$px\\s*,\\s*\\$base\\s*\\)\\s*\\*\\s*1rem" }] },
            { id: 2, label: "Sizes call rem(), with no raw px left", keywords: [{ pattern: "font-size:\\s*rem\\(\\s*32px\\s*\\)" }, { pattern: "padding:\\s*rem\\(\\s*24px\\s*\\)" }, { pattern: "^(?![\\s\\S]*(font-size|padding):\\s*\\d+px)" }] },
            { id: 3, label: "Compiled CSS has the rem values", keywords: [{ target: "css", pattern: "h1\\s*\\{\\s*font-size:\\s*2rem" }, { target: "css", pattern: "\\.lead\\s*\\{\\s*font-size:\\s*1\\.125rem" }, { target: "css", pattern: "\\.body-text\\s*\\{\\s*font-size:\\s*0\\.875rem" }, { target: "css", pattern: "\\.section\\s*\\{[^}]*padding:\\s*1\\.5rem" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Real-World Sass
  // ─────────────────────────────────────────────────────────────
  {
    id: "scss-real-world",
    title: "Real-World Sass",
    icon: "🏗️",
    color: "#ef4444",
    lessons: [
      {
        id: "scss-15",
        title: "Sass Maps to CSS Custom Properties",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Sass and CSS variables work best together. Keep your tokens in Sass maps, where loops and functions can work with them, then **output** them as CSS custom properties so the browser can switch themes at runtime. A small mixin does the conversion: loop over the map and write `--#{$name}: #{$value};` for each entry. Remember the `#{}` around the value — custom properties need it.",
          },
          {
            type: "code",
            lang: "scss",
            label: "One mixin, any number of themes",
            content: `$light: (bg: #ffffff, text: #111827);
$dark: (bg: #111827, text: #f9fafb);

@mixin theme($tokens) {
  @each $name, $value in $tokens {
    --#{$name}: #{$value};
  }
}

:root { @include theme($light); }
[data-theme="dark"] { @include theme($dark); }`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The CSS Variables & Modern CSS course covers the browser side of this: components read var(--bg) and var(--text), and switching data-theme swaps every value at once.",
          },
          {
            type: "quiz",
            question: "Why output tokens as custom properties instead of using the Sass variables directly in each component?",
            options: [
              "Sass variables can't hold colours",
              "Custom properties can change in the browser at runtime — for example, switching themes — while Sass values are fixed at compile time",
              "Custom properties compile faster",
              "Browsers can't read Sass variables' values",
            ],
            answer: 1,
            explanation:
              "Once compiled, a Sass value is just a fixed piece of CSS. Custom properties stay live, so a data-theme attribute or JavaScript can change them without recompiling.",
          },
        ],
        challenge: {
          id: "scss-15-challenge",
          language: "scss",
          title: "Output Themes from Maps",
          description:
            "Delete the hand-written custom properties. Write `@mixin theme($tokens)` that loops over the map and outputs `--#{$name}: #{$value};`, then use `@include theme($light);` in `:root` and `@include theme($dark);` in `[data-theme=\"dark\"]`.",
          previewHtml: `<section class="panel">
  <h2>Light panel</h2>
  <a href="#">Accent link</a>
</section>
<section class="panel" data-theme="dark">
  <h2>Dark panel</h2>
  <a href="#">Accent link</a>
</section>`,
          starterCode: `$light: (bg: #ffffff, text: #111827, accent: #cf649a);
$dark: (bg: #111827, text: #f9fafb, accent: #f472b6);

:root {
  --bg: #ffffff;
  --text: #111827;
  --accent: #cf649a;
}

[data-theme="dark"] {
  --bg: #111827;
  --text: #f9fafb;
  --accent: #f472b6;
}

.panel {
  background: var(--bg);
  color: var(--text);
  padding: 1rem;

  a {
    color: var(--accent);
  }
}`,
          solutionCode: `$light: (bg: #ffffff, text: #111827, accent: #cf649a);
$dark: (bg: #111827, text: #f9fafb, accent: #f472b6);

@mixin theme($tokens) {
  @each $name, $value in $tokens {
    --#{$name}: #{$value};
  }
}

:root {
  @include theme($light);
}

[data-theme="dark"] {
  @include theme($dark);
}

.panel {
  background: var(--bg);
  color: var(--text);
  padding: 1rem;

  a {
    color: var(--accent);
  }
}`,
          tests: [
            { id: 1, label: "theme() loops and writes --#{$name}: #{$value}", keywords: [{ pattern: "@mixin\\s+theme\\s*\\(\\s*\\$[\\w-]+\\s*\\)" }, { pattern: "@each\\s+\\$[\\w-]+\\s*,\\s*\\$[\\w-]+\\s+in" }, { pattern: "--#\\{\\s*\\$[\\w-]+\\s*\\}\\s*:\\s*#\\{\\s*\\$[\\w-]+\\s*\\}" }] },
            { id: 2, label: "Both themes use the mixin, with no hand-written properties", keywords: [{ pattern: "@include\\s+theme\\(\\s*\\$light\\s*\\)" }, { pattern: "@include\\s+theme\\(\\s*\\$dark\\s*\\)" }, { pattern: "^(?![\\s\\S]*--(bg|text|accent)\\s*:)" }] },
            { id: 3, label: "Compiled CSS has real values in both themes", keywords: [{ target: "css", pattern: ":root\\s*\\{[^}]*--bg:\\s*#ffffff" }, { target: "css", pattern: "\\[data-theme=[\"']?dark[\"']?\\]\\s*\\{[^}]*--accent:\\s*#f472b6" }] },
          ],
        },
      },
      {
        id: "scss-16",
        title: "@debug, @warn and @error",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Sass has three ways to talk back while it compiles. `@debug $value;` prints a value, which is handy when a calculation looks wrong. `@warn \"message\";` prints a warning but keeps compiling — good for telling people an option is deprecated. `@error \"message\";` **stops** compiling with your message. Use it to guard mixins and functions: if someone asks for a breakpoint that doesn't exist, a clear error beats a broken media query.",
          },
          {
            type: "code",
            lang: "scss",
            label: "Fail early with a helpful message",
            content: `@use "sass:map";

$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);

@mixin from($name) {
  @if not map.has-key($breakpoints, $name) {
    @error "Unknown breakpoint '#{$name}'. Use one of: #{map.keys($breakpoints)}.";
  }
  @media (min-width: map.get($breakpoints, $name)) {
    @content;
  }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "In this course, @debug and @warn messages appear above the compiled CSS in the output panel, and an @error shows up as a failed run with your message.",
          },
          {
            type: "quiz",
            question: "Which directive stops compilation?",
            options: ["@debug", "@warn", "@error", "All three"],
            answer: 2,
            explanation:
              "@debug and @warn only print; @error halts the compile and reports its message, pointing at the line that triggered it.",
          },
        ],
        challenge: {
          id: "scss-16-challenge",
          language: "scss",
          title: "Guard a Mixin with @error",
          description:
            "Add a check at the start of the mixin: `@if not map.has-key($breakpoints, $name)` then `@error` with a message that includes `#{$name}`. Also add `@debug map.get($breakpoints, $name);` so each call prints its width. To test the guard, change a call to `from(tablet)` and run — then change it back to `md` before submitting.",
          previewHtml: `<nav class="nav"><a href="#">Home</a> <a href="#">Docs</a></nav>`,
          starterCode: `@use "sass:map";

$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);

@mixin from($name) {
  @media (min-width: map.get($breakpoints, $name)) {
    @content;
  }
}

.nav {
  display: grid;

  @include from(md) {
    display: flex;
    gap: 1rem;
  }
}`,
          solutionCode: `@use "sass:map";

$breakpoints: (sm: 36rem, md: 48rem, lg: 64rem);

@mixin from($name) {
  @if not map.has-key($breakpoints, $name) {
    @error "Unknown breakpoint '#{$name}'. Use one of: #{map.keys($breakpoints)}.";
  }
  @debug map.get($breakpoints, $name);
  @media (min-width: map.get($breakpoints, $name)) {
    @content;
  }
}

.nav {
  display: grid;

  @include from(md) {
    display: flex;
    gap: 1rem;
  }
}`,
          tests: [
            { id: 1, label: "Checks the name with map.has-key()", keywords: [{ pattern: "@if\\s+not\\s+map\\.has-key\\(\\s*\\$breakpoints\\s*,\\s*\\$name\\s*\\)" }] },
            { id: 2, label: "@error message includes #{$name}, and @debug prints the width", keywords: [{ pattern: "@error\\s+(\"[^\"]*|'[^']*)#\\{\\s*\\$name\\s*\\}" }, { pattern: "@debug\\s+map\\.get\\(\\s*\\$breakpoints\\s*,\\s*\\$name\\s*\\)" }] },
            { id: 3, label: "Calls a real breakpoint, so it still compiles", keywords: [{ target: "css", pattern: "@media \\(min-width: 48rem\\)\\s*\\{\\s*\\.nav\\s*\\{[^}]*display:\\s*flex" }] },
          ],
        },
      },
      {
        id: "scss-17",
        title: "Capstone: A Button System",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Time to combine the course. A small design system needs: a **map** of variants, a **placeholder** for shared button styles, a **mixin** that takes a colour, picks readable text with `@if`, and builds a hover shade with `sass:color` — and an **`@each` loop** that generates one class per variant. Adding a new button then means adding one line to the map.",
          },
          {
            type: "code",
            lang: "scss",
            label: "The shape of the system",
            content: `@use "sass:color";

$variants: (primary: #2563eb, success: #16a34a);

%btn-base { padding: 0.6rem 1.2rem; border: none; }

@mixin btn-variant($bg) {
  @extend %btn-base;
  background: $bg;
  color: white;

  &:hover { background: color.scale($bg, $lightness: -15%); }
}

@each $name, $bg in $variants {
  .btn--#{$name} { @include btn-variant($bg); }
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Look at the compiled CSS when you're done: the placeholder gives one shared rule for every variant, while the mixin gives each variant its own colours.",
          },
          {
            type: "quiz",
            question: "In this system, what do you change to add a danger button?",
            options: [
              "Write a new .btn--danger rule by hand",
              "Add danger: #dc2626 to the $variants map",
              "Copy the mixin and rename it",
              "Add a new placeholder",
            ],
            answer: 1,
            explanation:
              "The @each loop generates a class for every entry in the map, so one new entry gives you .btn--danger and its hover style.",
          },
        ],
        challenge: {
          id: "scss-17-challenge",
          language: "scss",
          title: "Build the Button System",
          description:
            "Write `@mixin btn-variant($bg)` that extends `%btn-base`, sets the background, uses `@if` with `color.channel($bg, \"lightness\", $space: hsl) > 55%` to choose `#111827` or `white` text, and adds `&:hover` with `color.scale($bg, $lightness: -15%)`. Then replace `.btn--primary` with an `@each` loop over `$variants` that generates `.btn--#{$name}`.",
          previewHtml: `<button class="btn--primary">Primary</button>
<button class="btn--success">Success</button>
<button class="btn--warning">Warning</button>`,
          starterCode: `@use "sass:color";

$variants: (primary: #2563eb, success: #16a34a, warning: #fde047);

%btn-base {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font: inherit;
  cursor: pointer;
}

.btn--primary {
  @extend %btn-base;
  background: #2563eb;
  color: white;
}`,
          solutionCode: `@use "sass:color";

$variants: (primary: #2563eb, success: #16a34a, warning: #fde047);

%btn-base {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font: inherit;
  cursor: pointer;
}

@mixin btn-variant($bg) {
  @extend %btn-base;
  background: $bg;

  @if color.channel($bg, "lightness", $space: hsl) > 55% {
    color: #111827;
  } @else {
    color: white;
  }

  &:hover {
    background: color.scale($bg, $lightness: -15%);
  }
}

@each $name, $bg in $variants {
  .btn--#{$name} {
    @include btn-variant($bg);
  }
}`,
          tests: [
            { id: 1, label: "btn-variant($bg) extends the base, picks text colour with @if, and scales the hover", keywords: [{ pattern: "@mixin\\s+btn-variant\\s*\\(\\s*\\$bg\\s*\\)" }, { pattern: "@extend\\s+%btn-base" }, { pattern: "@if[^{]*color\\.channel\\([^)]*lightness" }, { pattern: "&:hover\\s*\\{[^}]*color\\.scale\\(\\s*\\$bg\\s*,\\s*\\$lightness\\s*:\\s*-15%\\s*\\)" }] },
            { id: 2, label: "@each over $variants generates .btn--#{$name}", keywords: [{ pattern: "@each\\s+\\$[\\w-]+\\s*,\\s*\\$[\\w-]+\\s+in\\s+\\$variants" }, { pattern: "\\.btn--#\\{\\s*\\$[\\w-]+\\s*\\}" }, { pattern: "^(?![\\s\\S]*\\.btn--primary)" }] },
            { id: 3, label: "Compiled CSS has all three variants with the right text colour", keywords: [{ target: "css", pattern: "\\.btn--warning\\s*\\{[^}]*color:\\s*#111827" }, { target: "css", pattern: "\\.btn--success\\s*\\{[^}]*color:\\s*white" }, { target: "css", pattern: "\\.btn--primary:hover\\s*\\{\\s*background:" }, { target: "css", pattern: "(\\.btn--(primary|success|warning),\\s*){2}\\.btn--(primary|success|warning)\\s*\\{[^}]*padding" }] },
          ],
        },
      },
    ],
  },
];

export const SASS_SCSS_CHAPTERS = RAW_SASS_SCSS_CHAPTERS;

export const SASS_SCSS_LESSONS = SASS_SCSS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const SASS_SCSS_TOTAL_XP = SASS_SCSS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
