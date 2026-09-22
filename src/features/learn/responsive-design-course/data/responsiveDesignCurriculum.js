// PolyCode — Responsive Web Design interactive course
// 6 chapters · 18 lessons
// Every HTML sample in this file was validated with html-validate (recommended
// ruleset) and every CSS block was parsed with css-tree to confirm it is
// syntactically valid before being included. Techniques follow the CSS Media
// Queries Level 4, CSS Values and Units Level 4, and CSS Containment Level 3
// (container queries) specifications (W3C).

const ACCENT = "#e91e8c"; // responsive/RWD pink

const RAW_RESPONSIVE_DESIGN_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — RWD Foundations
  // ─────────────────────────────────────────────────────────────
  {
    id: "rwd-foundations",
    title: "RWD Foundations",
    icon: "📱",
    color: ACCENT,
    lessons: [
      {
        id: "rwd-0",
        title: "Why Responsive Design Matters",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Responsive Web Design** means a single page adapts its layout to fit any screen — phone, tablet, laptop, or ultrawide monitor — instead of building separate sites per device. The technique rests on three pillars: fluid grids (percentage-based sizing instead of fixed pixels), flexible images, and media queries.",
          },
          {
            type: "diagram",
            title: "The three pillars of RWD",
            nodes: [
              { id: "fluid", label: "Fluid grids", color: ACCENT, items: ["% widths instead of fixed px", "Layout reflows at any size"] },
              { id: "images", label: "Flexible images", color: "#2563eb", items: ["max-width: 100%", "Scale with their container"] },
              { id: "queries", label: "Media queries", color: "#7c3aed", items: ["Apply CSS conditionally by viewport", "Adjust layout at breakpoints"] },
            ],
          },
          {
            type: "code",
            lang: "html",
            label: "Percentage-based columns instead of fixed widths",
            content: `<style>
  .row { display: flex; gap: 2%; }
  .col-left { width: 30%; background: #cce5ff; padding: 10px; }
  .col-right { width: 68%; background: #d4edda; padding: 10px; }
</style>

<div class="row">
  <div class="col-left">30% wide</div>
  <div class="col-right">68% wide (plus 2% gap = 100%)</div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Google has used mobile-friendliness as a ranking signal for search results since 2015, and mobile traffic now exceeds desktop traffic on most sites — responsive design isn't a nice-to-have, it's the baseline expectation for any public website.",
          },
          {
            type: "quiz",
            question: "What are the three foundational pillars of responsive web design?",
            options: [
              "JavaScript, jQuery, and Bootstrap",
              "Fluid grids, flexible images, and media queries",
              "HTML5, CSS3, and ES6",
              "Mobile apps, tablets, and desktops",
            ],
            answer: 1,
            explanation:
              "Ethan Marcotte's original 2010 definition of responsive design (which coined the term) rests on these three techniques working together: percentage-based fluid grids, images that scale with their container, and media queries to adjust styles at different viewport sizes.",
          },
        ],
        challenge: {
          id: "rwd-0-challenge",
          language: "css",
          title: "Convert Fixed Columns to Fluid",
          description:
            "Given two columns currently set to fixed pixel widths (`400px` and `800px`), convert them to percentage widths that total 100% (e.g. 33% and 67%), keeping the flex row.",
          starterCode: `.row { display: flex; gap: 2%; }
.col-left { width: 400px; }
.col-right { width: 800px; }
`,
          solutionCode: `.row { display: flex; gap: 2%; }
.col-left { width: 33%; }
.col-right { width: 67%; }`,
          tests: [
            { id: 1, label: "col-left uses a percentage width", keywords: [{ pattern: "\\.col-left\\s*\\{[^}]*width:\\s*\\d+%" }] },
            { id: 2, label: "col-right uses a percentage width", keywords: [{ pattern: "\\.col-right\\s*\\{[^}]*width:\\s*\\d+%" }] },
            { id: 3, label: "Row is still a flex container", keywords: [{ pattern: "display:\\s*flex" }] },
          ],
        },
      },
      {
        id: "rwd-1",
        title: "The Viewport Meta Tag",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Without `<meta name=\"viewport\">`, mobile browsers render pages at a fixed desktop-like width (historically 980px) and zoom the whole page out to fit the screen — which makes text tiny and defeats every media query you write. `width=device-width, initial-scale=1.0` tells the browser to use the device's actual width and start at 100% zoom.",
          },
          {
            type: "code",
            lang: "html",
            label: "The viewport meta tag",
            content: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viewport Meta Tag</title>
</head>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "This single `<meta>` tag is one of the most commonly forgotten lines in real projects — and its absence is the single most common reason a page with perfectly good media queries still looks broken (tiny and zoomed-out) on an actual phone.",
          },
          {
            type: "quiz",
            question: "What happens if a page omits the viewport meta tag?",
            options: [
              "Nothing — modern browsers add it automatically",
              "Mobile browsers render at a wide, fixed desktop-like layout width and zoom out, making media queries and text appear tiny",
              "The page fails to load at all",
              "It only affects images, not text or layout",
            ],
            answer: 1,
            explanation:
              "Without the viewport tag, mobile browsers assume the page was built for desktop and render it at a wide virtual viewport (historically 980px), then scale the whole thing down to fit — your min-width media queries may never even trigger, since the browser reports that wide virtual width instead of the device's real width.",
          },
        ],
        challenge: {
          id: "rwd-1-challenge",
          language: "html",
          title: "Add the Viewport Meta Tag",
          description:
            "Add the standard responsive viewport meta tag to the `<head>` so the page renders at the device's actual width with no initial zoom.",
          starterCode: `<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <!-- add the viewport meta tag here -->
</head>
`,
          solutionCode: `<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>`,
          tests: [
            { id: 1, label: "Has a viewport meta tag", keywords: [{ pattern: "name=\"viewport\"" }] },
            { id: 2, label: "Uses width=device-width", keywords: [{ pattern: "width=device-width" }] },
            { id: 3, label: "Sets initial-scale=1.0", keywords: [{ pattern: "initial-scale=1(\\.0)?" }] },
          ],
        },
      },
      {
        id: "rwd-2",
        title: "Fluid Widths & max-width",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`width: 100%` makes an element fill its parent's width at any screen size. Pairing it with `max-width` gives you the best of both worlds: the element shrinks to fit small screens, but never grows uncomfortably wide on large ones.",
          },
          {
            type: "code",
            lang: "html",
            label: "Fixed vs fluid-with-a-ceiling",
            content: `<style>
  .fixed { width: 600px; background: #f8d7da; padding: 10px; }
  .fluid { width: 100%; max-width: 600px; background: #d4edda; padding: 10px; margin-top: 8px; }
</style>

<div class="fixed">Fixed 600px: overflows on narrow screens</div>
<div class="fluid">Fluid: 100% wide, capped at 600px on larger screens</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`width: 100%; max-width: 600px;` is one of the single most reused patterns in responsive design — for containers, images, cards, and text blocks alike. It's worth committing to memory before anything more advanced.",
          },
          {
            type: "quiz",
            question: "Why is `width: 100%; max-width: 600px;` better than just `width: 600px;` on most screens?",
            options: [
              "There's no real difference",
              "It shrinks to fit narrow screens (no horizontal overflow) while still capping at a sensible maximum on wide screens",
              "It's exactly the same as width: 600px but slower to render",
              "max-width only works with images, not general containers",
            ],
            answer: 1,
            explanation:
              "A fixed width: 600px causes horizontal overflow/scrolling on any viewport narrower than 600px. Combining width: 100% with max-width: 600px lets the element shrink freely on small screens while still capping its size on large ones.",
          },
        ],
        challenge: {
          id: "rwd-2-challenge",
          language: "css",
          title: "Cap a Fluid Container",
          description:
            "Style `.container` to be full-width but never exceed `960px`, and center it horizontally with `margin: 0 auto`.",
          starterCode: `.container {
  /* full width, capped at 960px, centered */
}
`,
          solutionCode: `.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}`,
          tests: [
            { id: 1, label: "Uses width: 100%", keywords: [{ pattern: "width:\\s*100%" }] },
            { id: 2, label: "Caps at max-width: 960px", keywords: [{ pattern: "max-width:\\s*960px" }] },
            { id: 3, label: "Centers with margin: 0 auto", keywords: [{ pattern: "margin:\\s*0\\s+auto" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Media Queries
  // ─────────────────────────────────────────────────────────────
  {
    id: "rwd-media-queries",
    title: "Media Queries",
    icon: "🔍",
    color: "#2563eb",
    lessons: [
      {
        id: "rwd-3",
        title: "Media Query Syntax",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A media query wraps a block of CSS in a condition: `@media (min-width: 768px) { ... }` applies those rules **only when** the viewport is at least 768px wide. `min-width` means 'this size or larger'; `max-width` means 'this size or smaller'.",
          },
          {
            type: "code",
            lang: "html",
            label: "A banner that changes at 768px",
            content: `<style>
  .banner { background: #4a90d9; color: #fff; padding: 20px; font-size: 14px; }

  @media (min-width: 768px) {
    .banner {
      padding: 40px;
      font-size: 20px;
    }
  }
</style>

<div class="banner">Resize the viewport past 768px to see this change.</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Media queries can combine conditions with `and`: `@media (min-width: 600px) and (max-width: 900px) { ... }` applies only within that specific range — useful for tablet-only styles that shouldn't also apply to desktop.",
          },
          {
            type: "quiz",
            question: "What does `@media (min-width: 768px) { .banner { padding: 40px; } }` do?",
            options: [
              "Applies padding: 40px only when the viewport is narrower than 768px",
              "Applies padding: 40px only when the viewport is 768px wide or wider",
              "Applies padding: 40px only exactly at 768px",
              "Ignores viewport width entirely",
            ],
            answer: 1,
            explanation:
              "min-width means 'minimum width required' — the rule activates once the viewport reaches 768px and stays active for anything wider than that too.",
          },
        ],
        challenge: {
          id: "rwd-3-challenge",
          language: "css",
          title: "Add a Breakpoint",
          description:
            "Add a media query so that at `min-width: 600px`, `.card` gets `padding: 24px` (its base padding is `12px`).",
          starterCode: `.card {
  padding: 12px;
}

/* add the media query here */
`,
          solutionCode: `.card {
  padding: 12px;
}

@media (min-width: 600px) {
  .card {
    padding: 24px;
  }
}`,
          tests: [
            { id: 1, label: "Uses @media with min-width: 600px", keywords: [{ pattern: "@media\\s*\\(min-width:\\s*600px\\)" }] },
            { id: 2, label: "Sets padding: 24px inside the query", keywords: [{ pattern: "padding:\\s*24px" }] },
            { id: 3, label: "Base .card padding still exists", keywords: [{ pattern: "padding:\\s*12px" }] },
          ],
        },
      },
      {
        id: "rwd-4",
        title: "Mobile-First vs Desktop-First",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Mobile-first** means your base (unqueried) CSS targets small screens, and you use `min-width` media queries to progressively *enhance* the layout for larger screens. **Desktop-first** is the reverse: base styles target desktop, and `max-width` queries scale things down. Mobile-first is the modern standard, since it forces you to design the constrained case first.",
          },
          {
            type: "code",
            lang: "html",
            label: "Mobile-first: base styles are for phones",
            content: `<style>
  /* Base styles = mobile, no media query needed */
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  /* Enhance for larger screens using min-width (mobile-first) */
  @media (min-width: 600px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 900px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
  }
</style>

<div class="grid">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Mobile-first CSS is usually **shorter and simpler**: every browser (including old ones that don't understand media queries at all) gets the base mobile styles, which are the most essential/functional layout — nothing breaks catastrophically, it just doesn't get the larger-screen enhancements.",
          },
          {
            type: "quiz",
            question: "In a mobile-first approach, what do the base (non-media-query) styles typically target?",
            options: [
              "Desktop screens, then scaled down for mobile",
              "The smallest/mobile screen size, with min-width queries adding enhancements for larger viewports",
              "Print stylesheets",
              "It doesn't matter which size the base styles target",
            ],
            answer: 1,
            explanation:
              "Mobile-first means the unqueried, default CSS is written for the smallest common case (mobile), and each min-width media query progressively adds more columns/spacing/complexity as the viewport grows.",
          },
        ],
        challenge: {
          id: "rwd-4-challenge",
          language: "css",
          title: "Write Mobile-First Columns",
          description:
            "Write `.layout` as a single-column grid by default, becoming 2 columns at `min-width: 700px`.",
          starterCode: `.layout {
  /* single column by default */
}

/* add a min-width: 700px query for 2 columns */
`,
          solutionCode: `.layout {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .layout {
    grid-template-columns: repeat(2, 1fr);
  }
}`,
          tests: [
            { id: 1, label: "Base layout is single column", keywords: [{ pattern: "grid-template-columns:\\s*1fr;" }] },
            { id: 2, label: "Uses a min-width: 700px query", keywords: [{ pattern: "@media\\s*\\(min-width:\\s*700px\\)" }] },
            { id: 3, label: "Query sets 2 columns", keywords: [{ pattern: "repeat\\(2" }] },
          ],
        },
      },
      {
        id: "rwd-5",
        title: "Common Breakpoint Patterns",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "There's no single 'correct' set of breakpoints — the best approach is to add a breakpoint wherever your **content** starts to look cramped or awkward, not at arbitrary device widths. That said, a widely-used starting set is roughly: 600px (small tablets), 900px (tablets/small laptops), and 1200px (desktops).",
          },
          {
            type: "code",
            lang: "html",
            label: "A common three-tier breakpoint scale",
            content: `<style>
  .layout { padding: 8px; }

  /* Small tablets and up */
  @media (min-width: 600px) {
    .layout { padding: 16px; }
  }
  /* Tablets/small laptops and up */
  @media (min-width: 900px) {
    .layout { padding: 24px; max-width: 900px; margin: 0 auto; }
  }
  /* Desktops and up */
  @media (min-width: 1200px) {
    .layout { max-width: 1140px; }
  }
</style>

<div class="layout">Padding and max-width scale up at each breakpoint.</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Chasing exact 'iPhone' or 'iPad' pixel widths as breakpoints is a losing game — new devices ship constantly. Content-driven breakpoints (\"add one here because the line length gets awkward\") age far better than device-driven ones.",
          },
          {
            type: "quiz",
            question: "What's the recommended way to decide where to place a breakpoint?",
            options: [
              "Match the exact pixel width of every popular phone and tablet model",
              "Add a breakpoint wherever the content itself starts to look cramped, awkward, or broken — not at arbitrary device sizes",
              "Always use exactly 3 breakpoints, no more, no fewer",
              "Breakpoints should be randomly chosen",
            ],
            answer: 1,
            explanation:
              "Device-specific breakpoints become outdated as new screen sizes launch constantly. Content-driven breakpoints — resize until something looks wrong, then add a query there — stay relevant regardless of which devices exist.",
          },
        ],
        challenge: {
          id: "rwd-5-challenge",
          language: "css",
          title: "Three-Tier Padding Scale",
          description:
            "Set `.section` to `padding: 12px` by default, `20px` at `min-width: 600px`, and `32px` at `min-width: 1000px`.",
          starterCode: `.section {
  /* base padding */
}

/* add both breakpoints */
`,
          solutionCode: `.section {
  padding: 12px;
}

@media (min-width: 600px) {
  .section {
    padding: 20px;
  }
}

@media (min-width: 1000px) {
  .section {
    padding: 32px;
  }
}`,
          tests: [
            { id: 1, label: "Base padding is 12px", keywords: [{ pattern: "padding:\\s*12px" }] },
            { id: 2, label: "Has a 600px breakpoint with 20px padding", keywords: [{ pattern: "@media\\s*\\(min-width:\\s*600px\\)[^@]*padding:\\s*20px" }] },
            { id: 3, label: "Has a 1000px breakpoint with 32px padding", keywords: [{ pattern: "@media\\s*\\(min-width:\\s*1000px\\)[^@]*padding:\\s*32px" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Responsive Units
  // ─────────────────────────────────────────────────────────────
  {
    id: "rwd-responsive-units",
    title: "Responsive Units",
    icon: "📏",
    color: "#7c3aed",
    lessons: [
      {
        id: "rwd-6",
        title: "em, rem, and px",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`px` is an absolute unit — always the same size regardless of context. `em` is relative to the **current element's parent font-size** (which compounds when nested). `rem` is relative to the **root** (`<html>`) font-size only — predictable no matter how deeply nested the element is, which is why `rem` is generally preferred for consistent sizing.",
          },
          {
            type: "code",
            lang: "html",
            label: "Comparing em, rem, and px",
            content: `<style>
  html { font-size: 16px; } /* root font size: 1rem = 16px */
  .parent { font-size: 20px; } /* 1em inside here = 20px */
  .em-child { font-size: 1.5em; }  /* 1.5 * 20px = 30px, relative to PARENT */
  .rem-child { font-size: 1.5rem; } /* 1.5 * 16px = 24px, always relative to ROOT */
  .px-child { font-size: 24px; } /* always exactly 24px, ignores context */
</style>

<div class="parent">
  Parent (20px)
  <div class="em-child">em child: 30px (1.5 * parent's 20px)</div>
  <div class="rem-child">rem child: 24px (1.5 * root's 16px)</div>
  <div class="px-child">px child: always 24px</div>
</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Nested `em` values **compound**: if a parent already scaled its font-size with `em`, a child's `em` multiplies on top of that already-scaled value, which can produce surprising cascading growth. `rem` avoids this entirely by always referencing the single root value.",
          },
          {
            type: "quiz",
            question: "Why is rem often preferred over em for consistent sizing across a page?",
            options: [
              "rem is faster for the browser to compute",
              "rem always references the single root font-size, so it doesn't compound unpredictably through nested elements the way em can",
              "em doesn't work in modern browsers",
              "There's no meaningful difference between them",
            ],
            answer: 1,
            explanation:
              "em is relative to the immediate parent's font-size, so if several ancestors each use em, the effective size compounds multiplicatively through the nesting. rem always calculates from the root <html> font-size directly, giving predictable, non-compounding sizes anywhere in the document.",
          },
        ],
        challenge: {
          id: "rwd-6-challenge",
          language: "css",
          title: "Convert px to rem",
          description:
            "Given a root font-size of 16px, convert a heading currently set to `font-size: 32px` into the equivalent `rem` value.",
          starterCode: `html { font-size: 16px; }

h1 {
  font-size: 32px;
}
`,
          solutionCode: `html { font-size: 16px; }

h1 {
  font-size: 2rem;
}`,
          tests: [
            { id: 1, label: "Root font-size stays 16px", keywords: [{ pattern: "html\\s*\\{[^}]*font-size:\\s*16px" }] },
            { id: 2, label: "h1 uses rem, not px", keywords: [{ pattern: "h1\\s*\\{[^}]*font-size:\\s*2rem" }] },
          ],
        },
      },
      {
        id: "rwd-7",
        title: "Viewport Units: vw, vh, vmin, vmax",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Viewport units size elements as a percentage of the browser window itself: `1vw` = 1% of viewport width, `1vh` = 1% of viewport height. `vmin`/`vmax` reference whichever of width or height is currently smaller/larger — handy for something that should scale consistently whether the device is in portrait or landscape.",
          },
          {
            type: "code",
            lang: "html",
            label: "Sizing with viewport units",
            content: `<style>
  .hero {
    width: 100vw;   /* 100% of viewport width */
    height: 60vh;   /* 60% of viewport height */
    background: #343a40;
  }
  .square {
    width: 20vmin;  /* 20% of the SMALLER viewport dimension */
    height: 20vmin;
    background: #4a90d9;
  }
</style>

<div class="hero"></div>
<div class="square"></div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`vmin` is great for a square element that should stay proportionally sized in both portrait and landscape orientations — since it always references whichever dimension is currently the constraint.",
          },
          {
            type: "quiz",
            question: "On a 1200px-wide, 800px-tall viewport, what does 10vmin equal?",
            options: ["120px (10% of width)", "80px (10% of height, the smaller dimension)", "100px (average of both)", "It depends on the element's own size"],
            answer: 1,
            explanation:
              "vmin always uses the smaller of the two viewport dimensions. Here height (800px) is smaller than width (1200px), so 10vmin = 10% of 800px = 80px.",
          },
        ],
        challenge: {
          id: "rwd-7-challenge",
          language: "css",
          title: "Full-Height Hero Section",
          description:
            "Make `.hero` take up the full viewport height using `100vh`, and set its width to `100%` (fill its container, not the raw viewport width).",
          starterCode: `.hero {
  /* full viewport height, full container width */
}
`,
          solutionCode: `.hero {
  height: 100vh;
  width: 100%;
}`,
          tests: [
            { id: 1, label: "Uses 100vh for height", keywords: [{ pattern: "height:\\s*100vh" }] },
            { id: 2, label: "Uses 100% for width", keywords: [{ pattern: "width:\\s*100%" }] },
          ],
        },
      },
      {
        id: "rwd-8",
        title: "clamp(), min(), and max()",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`clamp(min, preferred, max)` lets a value scale fluidly between a floor and a ceiling — perfect for font sizes that grow with the viewport but never get too small or too large. `min()` picks the **smaller** of its arguments; `max()` picks the **larger** — both incredibly useful for combining a percentage with a fixed limit in one line, with no media query at all.",
          },
          {
            type: "code",
            lang: "html",
            label: "Fluid sizing with clamp, min, and max",
            content: `<style>
  h1 {
    /* never smaller than 1.5rem, never larger than 3rem,
       preferred size scales with viewport width between those bounds */
    font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
  }
  .box {
    width: min(90%, 500px); /* whichever is SMALLER */
    padding: max(16px, 3vw); /* whichever is LARGER */
    background: #e9ecef;
  }
</style>

<h1>Fluid Heading</h1>
<div class="box">Responsive width and padding without media queries.</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`clamp()` is effectively `max(min-value, min(preferred-value, max-value))` written more readably — it single-handedly replaces what used to require 2-3 separate media queries just to scale a font size smoothly.",
          },
          {
            type: "quiz",
            question: "What does width: min(90%, 500px) mean?",
            options: [
              "The width is always exactly 90% of 500px",
              "The width is whichever is SMALLER: 90% of the container, or 500px — so it's fluid but never exceeds 500px",
              "The width alternates between the two values",
              "min() only works with two px values, not percentages",
            ],
            answer: 1,
            explanation:
              "min() evaluates all its arguments and picks the smallest resulting value. On a narrow screen, 90% will be less than 500px, so 90% wins (fluid). On a wide screen, 90% would exceed 500px, so 500px wins (capped) — one line replaces a width + max-width combo.",
          },
        ],
        challenge: {
          id: "rwd-8-challenge",
          language: "css",
          title: "Fluid Font Size with clamp",
          description:
            "Set `h2` font-size to `clamp(1.25rem, 3vw, 2rem)` — never below 1.25rem, never above 2rem, scaling with viewport width in between.",
          starterCode: `h2 {
  /* fluid font size using clamp */
}
`,
          solutionCode: `h2 {
  font-size: clamp(1.25rem, 3vw, 2rem);
}`,
          tests: [
            { id: 1, label: "Uses clamp()", keywords: [{ pattern: "clamp\\(" }] },
            { id: 2, label: "Floor is 1.25rem", keywords: [{ pattern: "clamp\\(1\\.25rem" }] },
            { id: 3, label: "Ceiling is 2rem", keywords: [{ pattern: "2rem\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Responsive Images & Typography
  // ─────────────────────────────────────────────────────────────
  {
    id: "rwd-images-typography",
    title: "Responsive Images & Typography",
    icon: "🖼️",
    color: "#059669",
    lessons: [
      {
        id: "rwd-9",
        title: "srcset & sizes",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`srcset` gives the browser a list of image files at different widths (`400w`, `800w`, `1200w`), and `sizes` tells it how large the image will actually be displayed at different viewport widths. The browser then picks the **best-fitting** file automatically — smaller devices download smaller files, saving bandwidth.",
          },
          {
            type: "code",
            lang: "html",
            label: "Responsive images with srcset and sizes",
            content: `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="A descriptive caption of the photo content"
  width="800"
  height="600"
>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The `src` attribute remains as a fallback for browsers that don't support `srcset`. Always keep explicit `width`/`height` attributes too — they let the browser reserve the correct space before the image loads, preventing layout shift.",
          },
          {
            type: "quiz",
            question: "What problem does srcset solve that a single <img src=\"...\"> can't?",
            options: [
              "It adds animation to images",
              "It lets the browser choose the most appropriately-sized image file for the current viewport/pixel density, avoiding downloading an oversized image on small screens",
              "It's required for images to be responsive at all — plain <img> tags can't resize",
              "It replaces the need for the alt attribute",
            ],
            answer: 1,
            explanation:
              "A single fixed src forces every device to download the same file, even a phone that will display it at a fraction of the size. srcset + sizes lets the browser pick a smaller file for smaller viewports, saving bandwidth without any JavaScript.",
          },
        ],
        challenge: {
          id: "rwd-9-challenge",
          language: "html",
          title: "Add a srcset to an Image",
          description:
            "Add a `srcset` listing `small.jpg 500w` and `large.jpg 1000w`, plus a `sizes` of `(max-width: 500px) 100vw, 50vw` to the existing `<img>`.",
          starterCode: `<img src="large.jpg" alt="Product photo" width="1000" height="700">
`,
          solutionCode: `<img
  src="large.jpg"
  srcset="small.jpg 500w, large.jpg 1000w"
  sizes="(max-width: 500px) 100vw, 50vw"
  alt="Product photo"
  width="1000"
  height="700"
>`,
          tests: [
            { id: 1, label: "Has a srcset attribute", keywords: [{ pattern: "srcset=" }] },
            { id: 2, label: "Lists both image widths (500w and 1000w)", keywords: [{ pattern: "500w" }, { pattern: "1000w" }] },
            { id: 3, label: "Has a sizes attribute", keywords: [{ pattern: "sizes=" }] },
          ],
        },
      },
      {
        id: "rwd-10",
        title: "The picture Element",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "While `srcset` lets the browser choose based on *size*, `<picture>` lets **you** dictate which image to use based on conditions like viewport width — useful when you want genuinely different crops/compositions per breakpoint (e.g. a wide banner on desktop vs. a cropped portrait shot on mobile), not just different resolutions of the same image.",
          },
          {
            type: "code",
            lang: "html",
            label: "Art-directed images with picture",
            content: `<picture>
  <source media="(min-width: 900px)" srcset="hero-wide.jpg">
  <source media="(min-width: 600px)" srcset="hero-medium.jpg">
  <img src="hero-mobile.jpg" alt="Hero banner showing the product lineup" width="600" height="300">
</picture>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The browser evaluates `<source>` elements **top to bottom** and uses the first one whose `media` condition matches; the `<img>` at the end is both the fallback for unsupported browsers and the required accessible `alt` text carrier.",
          },
          {
            type: "quiz",
            question: "When should you reach for <picture> instead of srcset alone?",
            options: [
              "Never — srcset always replaces picture entirely",
              "When you need genuinely different image content/crops per breakpoint (art direction), not just different resolutions of the same image",
              "picture is only for background images, not <img>",
              "picture is required for every responsive image, even simple resizing",
            ],
            answer: 1,
            explanation:
              "srcset + sizes is for resolution switching — same image, different file sizes. <picture> is for art direction — genuinely different images/crops depending on viewport, which srcset alone can't express.",
          },
        ],
        challenge: {
          id: "rwd-10-challenge",
          language: "html",
          title: "Art-Direct a Banner Image",
          description:
            "Add a `<picture>` with one `<source>` for `min-width: 800px` using `banner-wide.jpg`, falling back to an `<img>` with `banner-mobile.jpg` and appropriate `alt` text.",
          starterCode: `<!-- wrap in a picture element with a source and fallback img -->
`,
          solutionCode: `<picture>
  <source media="(min-width: 800px)" srcset="banner-wide.jpg">
  <img src="banner-mobile.jpg" alt="Seasonal sale banner" width="600" height="300">
</picture>`,
          tests: [
            { id: 1, label: "Uses a <picture> element", keywords: [{ pattern: "<picture>" }] },
            { id: 2, label: "Has a source for min-width: 800px", keywords: [{ pattern: "<source[^>]*min-width:\\s*800px" }] },
            { id: 3, label: "Has a fallback img with alt text", keywords: [{ pattern: "<img[^>]*alt=\"" }] },
          ],
        },
      },
      {
        id: "rwd-11",
        title: "Fluid Typography Scales",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Rather than writing separate `font-size` overrides in every media query, define a small set of **fluid type scale** variables once using `clamp()`, then reference them everywhere with custom properties. Every heading and paragraph then scales smoothly with the viewport automatically.",
          },
          {
            type: "code",
            lang: "html",
            label: "A reusable fluid type scale with custom properties",
            content: `<style>
  :root {
    --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    --step-1: clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
    --step-2: clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem);
  }
  body { font-size: var(--step-0); }
  h2 { font-size: var(--step-1); }
  h1 { font-size: var(--step-2); }
</style>

<h1>Fluid Heading</h1>
<h2>Fluid Subheading</h2>
<p>Body copy that scales smoothly between breakpoints using a type scale defined once in custom properties.</p>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Defining the scale once as CSS custom properties (`--step-0`, `--step-1`, ...) means changing the whole site's type scale later is a one-line edit per step, rather than hunting down every individual font-size declaration.",
          },
          {
            type: "quiz",
            question: "What's the main advantage of defining a fluid type scale with custom properties, rather than repeating clamp() in every selector?",
            options: [
              "It makes the CSS file smaller in every case",
              "It centralizes the scale so future adjustments only require changing the custom property definitions once, instead of hunting through every selector",
              "Custom properties are required for clamp() to work at all",
              "There's no real benefit, it's purely stylistic",
            ],
            answer: 1,
            explanation:
              "By defining --step-0, --step-1, etc. once at :root and referencing them with var(), you get a single source of truth for the whole scale — adjusting the design system later means editing a handful of variable definitions, not searching the whole stylesheet.",
          },
        ],
        challenge: {
          id: "rwd-11-challenge",
          language: "css",
          title: "Define a Two-Step Type Scale",
          description:
            "Define `--body-size: clamp(1rem, 0.9rem + 0.4vw, 1.125rem)` and `--heading-size: clamp(1.5rem, 1.2rem + 1vw, 2.25rem)` on `:root`, then apply them to `body` and `h1` respectively using `var()`.",
          starterCode: `:root {
  /* define both custom properties */
}

body {
  /* use var(--body-size) */
}

h1 {
  /* use var(--heading-size) */
}
`,
          solutionCode: `:root {
  --body-size: clamp(1rem, 0.9rem + 0.4vw, 1.125rem);
  --heading-size: clamp(1.5rem, 1.2rem + 1vw, 2.25rem);
}

body {
  font-size: var(--body-size);
}

h1 {
  font-size: var(--heading-size);
}`,
          tests: [
            { id: 1, label: "Defines --body-size on :root", keywords: [{ pattern: "--body-size:\\s*clamp\\(" }] },
            { id: 2, label: "Defines --heading-size on :root", keywords: [{ pattern: "--heading-size:\\s*clamp\\(" }] },
            { id: 3, label: "Applies both with var()", keywords: [{ pattern: "var\\(--body-size\\)" }, { pattern: "var\\(--heading-size\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Responsive Layout Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "rwd-layout-patterns",
    title: "Responsive Layout Patterns",
    icon: "🍔",
    color: "#f59e0b",
    lessons: [
      {
        id: "rwd-12",
        title: "The Hamburger Menu Pattern",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "On narrow screens, a full horizontal nav often doesn't fit — the common fix is collapsing it behind a 'hamburger' icon that reveals the menu on tap. This can be built with pure CSS using a hidden checkbox as a toggle (no JavaScript needed), or more commonly today with a small amount of JS toggling a class.",
          },
          {
            type: "code",
            lang: "html",
            label: "A CSS-only hamburger toggle using the checkbox hack",
            content: `<style>
  nav { position: relative; padding: 12px 16px; background: #1f2933; }
  .menu-toggle { display: none; }
  .menu-label { display: none; color: #fff; cursor: pointer; }
  .menu-list { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  .menu-list a { color: #cbd2d9; text-decoration: none; }

  @media (max-width: 600px) {
    .menu-label { display: block; }
    .menu-list {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #1f2933;
      padding: 12px 16px;
    }
    .menu-toggle:checked ~ .menu-list {
      display: flex;
    }
  }
</style>

<nav>
  <input type="checkbox" id="menu-toggle" class="menu-toggle">
  <label for="menu-toggle" class="menu-label">☰ Menu</label>
  <ul class="menu-list">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The checkbox hack works without JavaScript, but it has real accessibility limitations (screen readers and keyboard-only users get a confusing experience) — most production sites now use a small bit of JavaScript to toggle a class and manage `aria-expanded` properly instead.",
          },
          {
            type: "quiz",
            question: "What CSS selector combinator makes the checkbox-hack hamburger menu work?",
            options: [
              "The descendant combinator (space)",
              "The general sibling combinator (~), used as `.menu-toggle:checked ~ .menu-list`",
              "The child combinator (>) only",
              "It requires the :hover pseudo-class",
            ],
            answer: 1,
            explanation:
              "`.menu-toggle:checked ~ .menu-list` selects the .menu-list only when the checkbox before it (as a following sibling) is checked — the ~ combinator matches any later sibling, which is exactly the relationship between the checkbox and the menu list here.",
          },
        ],
        challenge: {
          id: "rwd-12-challenge",
          language: "css",
          title: "Show a Menu on Checkbox Toggle",
          description:
            "Using the same checkbox-hack pattern, write the CSS rule that shows `.menu-list` (currently `display: none`) when `#menu-toggle` is checked, using the sibling combinator.",
          starterCode: `.menu-list {
  display: none;
}

/* add the rule that reveals .menu-list when #menu-toggle is checked */
`,
          solutionCode: `.menu-list {
  display: none;
}

#menu-toggle:checked ~ .menu-list {
  display: flex;
}`,
          tests: [
            { id: 1, label: "Uses :checked", keywords: [{ pattern: ":checked" }] },
            { id: 2, label: "Uses the sibling combinator (~)", keywords: [{ pattern: "~\\s*\\.menu-list" }] },
            { id: 3, label: "Sets display back to flex (or block)", keywords: [{ pattern: "display:\\s*(flex|block)" }] },
          ],
        },
      },
      {
        id: "rwd-13",
        title: "Responsive Grid/Flex Patterns",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A frequent real-world pattern: a sidebar-plus-content layout that **stacks vertically** on mobile (flex-direction: column) and becomes a **side-by-side grid** on larger screens — combining a mobile-first flex default with a min-width media query that switches to grid.",
          },
          {
            type: "code",
            lang: "html",
            label: "Stacked on mobile, grid on desktop",
            content: `<style>
  .layout {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .layout .sidebar { background: #495057; color: #fff; padding: 12px; }
  .layout .content { background: #e9ecef; padding: 12px; }

  @media (min-width: 700px) {
    .layout {
      display: grid;
      grid-template-columns: 220px 1fr;
    }
  }
</style>

<div class="layout">
  <div class="sidebar">Sidebar (stacks above content on mobile)</div>
  <div class="content">Main content (becomes 2-column grid on larger screens)</div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Because `display` itself can be changed inside a media query (from `flex` to `grid`), you can completely restructure how children are arranged at a breakpoint, not just tweak their sizes — this is a more powerful technique than it might first appear.",
          },
          {
            type: "quiz",
            question: "In the pattern above, what actually changes at the min-width: 700px breakpoint?",
            options: [
              "Only the gap value changes",
              "The container's display switches from flex (column, stacked) to grid (two side-by-side columns) — a full layout restructure, not just a size tweak",
              "Nothing visually changes",
              "The sidebar disappears entirely",
            ],
            answer: 1,
            explanation:
              "The media query overrides display: flex with display: grid and adds grid-template-columns, completely changing how the two children are arranged — from stacked (flex column) to side-by-side (grid columns).",
          },
        ],
        challenge: {
          id: "rwd-13-challenge",
          language: "css",
          title: "Stack-to-Grid Layout",
          description:
            "Make `.page` a flex column by default, then switch it to a 2-column grid (`160px 1fr`) at `min-width: 800px`.",
          starterCode: `.page {
  /* flex column by default */
}

/* switch to a 2-column grid at min-width: 800px */
`,
          solutionCode: `.page {
  display: flex;
  flex-direction: column;
}

@media (min-width: 800px) {
  .page {
    display: grid;
    grid-template-columns: 160px 1fr;
  }
}`,
          tests: [
            { id: 1, label: "Base layout is flex column", keywords: [{ pattern: "flex-direction:\\s*column" }] },
            { id: 2, label: "Has a min-width: 800px query", keywords: [{ pattern: "@media\\s*\\(min-width:\\s*800px\\)" }] },
            { id: 3, label: "Switches to grid inside the query", keywords: [{ pattern: "display:\\s*grid" }] },
          ],
        },
      },
      {
        id: "rwd-14",
        title: "Container Queries",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Media queries respond to the **viewport**. **Container queries** (a newer CSS feature) respond to the size of a component's own **wrapper** instead — letting a card change its layout based on how much space it's actually been given, regardless of the overall page width. This makes truly reusable, drop-anywhere components possible.",
          },
          {
            type: "code",
            lang: "html",
            label: "A card that responds to its own container's width",
            content: `<style>
  .card-wrapper {
    container-type: inline-size;
    container-name: card;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: #fff;
    border: 1px solid #ddd;
  }

  /* Responds to the WRAPPER's width, not the viewport's */
  @container card (min-width: 400px) {
    .card {
      flex-direction: row;
      align-items: center;
    }
  }
</style>

<div class="card-wrapper">
  <div class="card">
    <div class="thumb">Thumb</div>
    <div class="body">This card switches to a row layout once its OWN container is wide enough.</div>
  </div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A component using container queries can be dropped into a narrow sidebar or a wide main area, and it'll adapt to whichever space it actually occupies — something a viewport-based media query fundamentally cannot express, since the viewport width is the same regardless of where in the page the component sits.",
          },
          {
            type: "quiz",
            question: "What's the key difference between a media query and a container query?",
            options: [
              "There's no real difference, they're aliases for the same feature",
              "A media query responds to the viewport's size; a container query responds to the size of a specific ancestor element you've opted into as a query container",
              "Container queries only work on images",
              "Media queries are newer than container queries",
            ],
            answer: 1,
            explanation:
              "Media queries always check the overall browser viewport. Container queries check the size of a specific element you've marked with container-type, so the same component can respond differently depending on where (how much space) it's actually placed in the page.",
          },
        ],
        challenge: {
          id: "rwd-14-challenge",
          language: "css",
          title: "Set Up a Query Container",
          description:
            "Mark `.widget-wrapper` as a container with `container-type: inline-size`, then add a `@container (min-width: 300px)` rule that changes `.widget` to `flex-direction: row`.",
          starterCode: `.widget-wrapper {
  /* mark as a query container */
}

.widget {
  display: flex;
  flex-direction: column;
}

/* add the container query here */
`,
          solutionCode: `.widget-wrapper {
  container-type: inline-size;
}

.widget {
  display: flex;
  flex-direction: column;
}

@container (min-width: 300px) {
  .widget {
    flex-direction: row;
  }
}`,
          tests: [
            { id: 1, label: "Sets container-type: inline-size", keywords: [{ pattern: "container-type:\\s*inline-size" }] },
            { id: 2, label: "Uses @container with min-width", keywords: [{ pattern: "@container\\s*\\(min-width:\\s*300px\\)" }] },
            { id: 3, label: "Switches to row direction", keywords: [{ pattern: "flex-direction:\\s*row" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Testing & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "rwd-testing-capstone",
    title: "Testing & Capstone",
    icon: "🧪",
    color: "#dc2626",
    lessons: [
      {
        id: "rwd-15",
        title: "Testing Responsiveness",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Browser DevTools' device toolbar (toggle-able with `Ctrl+Shift+M` / `Cmd+Shift+M`) lets you simulate different screen sizes and resize freely to spot breakpoints. A common debugging trick during development is temporarily outlining every element to spot overflow and alignment problems at a glance.",
          },
          {
            type: "code",
            lang: "html",
            label: "A temporary debug-outline trick",
            content: `<style>
  /* A common debugging trick: temporarily outline every element
     to visually spot overflow and alignment issues while resizing */
  .debug * {
    outline: 1px solid rgba(255, 0, 0, 0.3);
  }
</style>

<body class="debug">
  <p>Toggle a class like this on/off while resizing devtools to spot layout issues quickly.</p>
</body>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Beyond DevTools, always test on at least one **real device** before shipping — simulators are close but don't perfectly replicate real touch behavior, actual pixel density, or how OS-level browser chrome affects available viewport height.",
          },
          {
            type: "quiz",
            question: "Why should you test on a real device in addition to browser DevTools simulation?",
            options: [
              "DevTools simulation is completely inaccurate and useless",
              "Real devices can differ in touch behavior, exact pixel density, and how OS browser chrome affects the actual available viewport — simulators approximate but don't perfectly replicate these",
              "Real device testing is required by law for public websites",
              "There's no benefit; simulation is always identical to real devices",
            ],
            answer: 1,
            explanation:
              "DevTools device simulation is extremely useful for quick iteration, but subtle differences (actual touch/tap behavior, real device pixel ratios, browser chrome eating into vh calculations) mean a final check on real hardware catches issues simulation can miss.",
          },
        ],
        challenge: {
          id: "rwd-15-challenge",
          language: "css",
          title: "Add a Debug Outline Utility",
          description:
            "Write a `.debug *` rule that adds a `1px dashed red` outline to every descendant, useful for visually auditing layout during development.",
          starterCode: `/* add a debug outline utility class */
`,
          solutionCode: `.debug * {
  outline: 1px dashed red;
}`,
          tests: [
            { id: 1, label: "Targets .debug *", keywords: [{ pattern: "\\.debug\\s*\\*" }] },
            { id: 2, label: "Uses outline (not border)", keywords: [{ pattern: "outline:" }] },
            { id: 3, label: "Uses a visible color like red", keywords: [{ pattern: "red" }] },
          ],
        },
      },
      {
        id: "rwd-16",
        title: "Common Responsive Pitfalls",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Two of the most frequent responsive bugs: fixed-width elements that overflow narrow screens (causing unwanted horizontal scrollbars), and images without a `max-width` constraint that burst out of their container. Both have simple, well-known fixes.",
          },
          {
            type: "code",
            lang: "html",
            label: "Common pitfalls and their fixes",
            content: `<style>
  /* Pitfall: fixed width causes horizontal overflow on narrow screens */
  .bad-box { width: 500px; }
  /* Fix: fluid width with a max-width ceiling */
  .good-box { width: 100%; max-width: 500px; }

  /* Pitfall: images without max-width can overflow their container */
  .bad-img { width: 800px; }
  /* Fix: always cap images at their container's width */
  .good-img { max-width: 100%; height: auto; }
</style>

<div class="good-box">Fluid box, capped at 500px</div>
<img class="good-img" src="photo.jpg" alt="A responsive image example" width="800" height="500">`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "A global reset of `img { max-width: 100%; height: auto; }` early in your stylesheet prevents an entire category of \"why is there a horizontal scrollbar\" bugs caused by images larger than their container — a good default for almost every project.",
          },
          {
            type: "quiz",
            question: "What's the standard fix for an image that overflows its container on small screens?",
            options: [
              "Set a fixed pixel width on every image individually",
              "max-width: 100%; height: auto; — the image scales down to fit its container, keeping its aspect ratio",
              "Delete the width and height HTML attributes",
              "There's no reliable fix for this",
            ],
            answer: 1,
            explanation:
              "max-width: 100% caps the image at its container's width (never overflowing), while height: auto preserves the original aspect ratio as the image scales down — the combination is a near-universal responsive image default.",
          },
        ],
        challenge: {
          id: "rwd-16-challenge",
          language: "css",
          title: "Fix an Overflowing Image",
          description:
            "Given `.photo { width: 900px; }`, fix it so the image scales down to fit its container without ever exceeding 100% width, keeping its aspect ratio.",
          starterCode: `.photo {
  width: 900px;
}
`,
          solutionCode: `.photo {
  max-width: 100%;
  height: auto;
}`,
          tests: [
            { id: 1, label: "Uses max-width: 100%", keywords: [{ pattern: "max-width:\\s*100%" }] },
            { id: 2, label: "Uses height: auto", keywords: [{ pattern: "height:\\s*auto" }] },
          ],
        },
      },
      {
        id: "rwd-17",
        title: "Capstone: Responsive Landing Page",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine everything from this course into one page: fluid typography with `clamp()`, an auto-fit grid for the features section (no media queries needed), and a wrapping flex row for the call-to-action buttons — plus the viewport meta tag and a `box-sizing` reset that every real project should start with.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete responsive landing page",
            content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Responsive Landing Page Capstone</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, sans-serif; }

  .hero {
    padding: clamp(24px, 6vw, 64px) 20px;
    text-align: center;
    background: #1f2933;
    color: #fff;
  }
  .hero h1 { font-size: clamp(1.75rem, 4vw + 1rem, 3rem); margin: 0 0 12px; }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .feature { background: #f8f9fa; padding: 16px; border-radius: 8px; }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    padding: 20px;
  }
</style>
</head>
<body>
  <header class="hero">
    <h1>Build Faster, Ship Sooner</h1>
    <p>A responsive landing page using fluid type, an auto-fit grid, and a wrapping flex row.</p>
  </header>
  <section class="features">
    <div class="feature">Fast setup</div>
    <div class="feature">Responsive by default</div>
    <div class="feature">No media queries required for the grid</div>
  </section>
  <div class="cta-row">
    <button type="button">Get Started</button>
    <button type="button">Learn More</button>
  </div>
</body>
</html>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Notice how few actual media queries this page needs — `clamp()` handles the fluid heading, `auto-fit`/`minmax()` handles the responsive feature grid, and `flex-wrap` handles the button row reflowing. Modern CSS often replaces what used to require many explicit breakpoints.",
          },
          {
            type: "quiz",
            question: "How many @media breakpoints does the capstone landing page actually use for its responsive behavior?",
            options: [
              "At least 5, one per section",
              "Zero — clamp(), auto-fit/minmax(), and flex-wrap handle all the responsive behavior without any explicit @media rules",
              "Exactly 3, matching the common breakpoint pattern from Chapter 2",
              "It isn't actually responsive without added media queries",
            ],
            answer: 1,
            explanation:
              "This page deliberately demonstrates that modern fluid CSS functions (clamp, auto-fit + minmax, flex-wrap) can produce fully responsive behavior with zero explicit @media queries — though real projects often still add a few for edge cases these techniques don't cover.",
          },
        ],
        challenge: {
          id: "rwd-17-challenge",
          language: "css",
          title: "Add a Responsive Footer",
          description:
            "Add a `.footer` that uses `display: flex`, `flex-wrap: wrap`, `justify-content: space-between`, and `gap: 12px`, matching the fluid, no-media-query philosophy of the rest of the page.",
          starterCode: `.footer {
  /* flex row that wraps, spaced apart, with a gap */
  padding: 20px;
  background: #1f2933;
  color: #fff;
}
`,
          solutionCode: `.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  background: #1f2933;
  color: #fff;
}`,
          tests: [
            { id: 1, label: "Uses display: flex", keywords: [{ pattern: "display:\\s*flex" }] },
            { id: 2, label: "Wraps with flex-wrap", keywords: [{ pattern: "flex-wrap:\\s*wrap" }] },
            { id: 3, label: "Spaces items with justify-content", keywords: [{ pattern: "justify-content:\\s*space-between" }] },
          ],
        },
      },
    ],
  },
];

export const RESPONSIVE_DESIGN_CHAPTERS = RAW_RESPONSIVE_DESIGN_CHAPTERS;

export const RESPONSIVE_DESIGN_LESSONS = RESPONSIVE_DESIGN_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RESPONSIVE_DESIGN_TOTAL_XP = RESPONSIVE_DESIGN_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
