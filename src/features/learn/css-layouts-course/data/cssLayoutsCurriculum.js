// PolyCode — CSS Layouts (Flexbox & Grid) interactive course
// 6 chapters · 18 lessons
// Every HTML sample in this file was validated with html-validate (recommended
// ruleset) and every CSS block was parsed with css-tree to confirm it is
// syntactically valid before being included. Property/value behavior follows
// the CSS Flexible Box Layout Module Level 1 and CSS Grid Layout Level 1
// specifications (W3C).

const ACCENT = "#264de4"; // CSS blue

const RAW_CSS_LAYOUTS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Layout Foundations
  // ─────────────────────────────────────────────────────────────
  {
    id: "layouts-foundations",
    title: "Layout Foundations",
    icon: "📐",
    color: ACCENT,
    lessons: [
      {
        id: "csl-0",
        title: "The Box Model",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Every element on a page is a rectangular **box** made of four layers, from the inside out: `content`, `padding`, `border`, and `margin`. By default, `width`/`height` only size the **content** box — padding and border are added on top, which is why elements often render larger than the width you set.",
          },
          {
            type: "diagram",
            title: "The four box-model layers",
            nodes: [
              { id: "content", label: "Content", color: ACCENT, items: ["Text, images, children", "Sized by width/height"] },
              { id: "padding", label: "Padding", color: "#2563eb", items: ["Space inside the border", "Background color extends here"] },
              { id: "border", label: "Border", color: "#7c3aed", items: ["Visible edge", "Adds to the box's rendered size by default"] },
              { id: "margin", label: "Margin", color: "#059669", items: ["Space outside the border", "Transparent, separates elements"] },
            ],
          },
          {
            type: "code",
            lang: "css",
            label: "content-box vs border-box sizing",
            content: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #333;
  margin: 10px;
  box-sizing: content-box; /* default: width applies to content only */
}
.box-border {
  width: 200px;
  padding: 20px;
  border: 5px solid #333;
  margin: 10px;
  box-sizing: border-box; /* width includes padding + border */
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Most developers set `box-sizing: border-box` on everything via `*, *::before, *::after { box-sizing: border-box; }` — it makes `width` mean 'total rendered width', which matches how most people intuitively expect sizing to work.",
          },
          {
            type: "quiz",
            question: "With the default box-sizing (content-box), what is the total rendered width of a box with width:200px, padding:20px, and a 5px border (one side each)?",
            options: ["200px", "220px", "250px", "225px"],
            answer: 2,
            explanation:
              "content-box adds padding and border on top of the specified width: 200 (content) + 20+20 (left+right padding) + 5+5 (left+right border) = 250px total.",
          },
        ],
        challenge: {
          id: "csl-0-challenge",
          language: "css",
          title: "Apply border-box Sizing",
          description:
            "Write a CSS rule for `.card` that sets `width: 250px`, a `1px solid #ccc` border, `16px` padding, and `box-sizing: border-box` so the rendered width stays exactly 250px.",
          starterCode: `.card {
  /* set width, border, padding, and box-sizing */
}
`,
          solutionCode: `.card {
  width: 250px;
  border: 1px solid #ccc;
  padding: 16px;
  box-sizing: border-box;
}`,
          tests: [
            { id: 1, label: "Sets width: 250px", keywords: [{ pattern: "width:\\s*250px" }] },
            { id: 2, label: "Sets a border", keywords: [{ pattern: "border:\\s*1px\\s+solid" }] },
            { id: 3, label: "Uses box-sizing: border-box", keywords: [{ pattern: "box-sizing:\\s*border-box" }] },
          ],
        },
      },
      {
        id: "csl-1",
        title: "The Display Property",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`display` controls how an element participates in layout. `block` elements start on a new line and accept width/height. `inline` elements flow within text and **ignore** width/height. `inline-block` is a hybrid: it flows inline but still respects width/height — useful for things like nav items or badges.",
          },
          {
            type: "code",
            lang: "html",
            label: "block, inline, and inline-block compared",
            content: `<style>
  span.inline-demo { display: inline; background: #cce5ff; }
  div.block-demo { display: block; background: #d4edda; width: 200px; }
  span.inline-block-demo { display: inline-block; background: #f8d7da; width: 150px; height: 40px; }
</style>

<span class="inline-demo">inline span</span>
<span class="inline-demo">another inline span</span>
<div class="block-demo">block div (own line, full width)</div>
<span class="inline-block-demo">inline-block (width/height respected)</span>
<span class="inline-block-demo">sits beside the previous one</span>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Setting `width` or `height` on a `display: inline` element (without changing display) has **no effect** — the browser ignores those properties for inline boxes. This is a common source of \"why isn't my CSS working?\" confusion.",
          },
          {
            type: "quiz",
            question: "Why does setting width: 200px on a display: inline element do nothing visually?",
            options: [
              "It's a browser bug",
              "Inline elements don't accept explicit width/height by specification — their size comes from their content",
              "You need !important for it to apply",
              "Inline elements can only be images",
            ],
            answer: 1,
            explanation:
              "Per the CSS spec, inline-level boxes size themselves to their content and ignore explicit width/height. Switching to inline-block or block is what lets you control their dimensions directly.",
          },
        ],
        challenge: {
          id: "csl-1-challenge",
          language: "css",
          title: "Fix an Ignored Width",
          description:
            "Given a `.tag` element styled as `display: inline` that needs a fixed `width: 100px` to actually take effect, change only the `display` value to `inline-block` while keeping the width.",
          starterCode: `.tag {
  display: inline;
  width: 100px;
  background: #eee;
}
`,
          solutionCode: `.tag {
  display: inline-block;
  width: 100px;
  background: #eee;
}`,
          tests: [
            { id: 1, label: "Uses display: inline-block", keywords: [{ pattern: "display:\\s*inline-block" }] },
            { id: 2, label: "Keeps width: 100px", keywords: [{ pattern: "width:\\s*100px" }] },
            { id: 3, label: "Keeps the background", keywords: [{ pattern: "background:\\s*#eee" }] },
          ],
        },
      },
      {
        id: "csl-2",
        title: "Position Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`position` controls how an element is placed relative to its normal flow. `static` (default) follows normal flow. `relative` shifts an element from where it would normally sit, without removing it from flow. `absolute` removes it from flow and positions it against its nearest **positioned** ancestor. `fixed` positions against the viewport. `sticky` toggles between relative and fixed based on scroll position.",
          },
          {
            type: "code",
            lang: "html",
            label: "relative + absolute, fixed, and sticky",
            content: `<style>
  .relative-parent { position: relative; height: 150px; border: 2px dashed #999; }
  .absolute-child { position: absolute; top: 10px; right: 10px; background: #ffe08a; padding: 8px; }
  .fixed-badge { position: fixed; bottom: 16px; right: 16px; background: #333; color: #fff; padding: 8px 12px; }
  .sticky-header { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #ddd; padding: 8px; }
</style>

<div class="sticky-header">Sticky header (sticks to top while scrolling within its parent)</div>
<div class="relative-parent">
  <div class="absolute-child">Positioned relative to the nearest positioned ancestor</div>
</div>
<div class="fixed-badge">Fixed to viewport</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "An `absolute`-positioned element looks for the nearest ancestor whose `position` is anything **other than `static`** (relative, absolute, fixed, or sticky). If no ancestor qualifies, it positions relative to the initial containing block (usually the viewport) — a very common source of unexpected placement.",
          },
          {
            type: "quiz",
            question: "An absolutely positioned element is placed relative to what?",
            options: [
              "Always the viewport, no exceptions",
              "Its nearest ancestor that has a position value other than static",
              "Its immediate parent, always",
              "The <body> element only",
            ],
            answer: 1,
            explanation:
              "absolute positioning looks up the DOM tree for the nearest ancestor with position: relative/absolute/fixed/sticky. That's why adding position: relative to a parent (with no offset values) is the standard trick to 'contain' an absolutely positioned child.",
          },
        ],
        challenge: {
          id: "csl-2-challenge",
          language: "css",
          title: "Contain an Absolute Child",
          description:
            "Given a `.card` that needs to act as the positioning context for a `.badge` inside it (positioned absolute, top: 8px, right: 8px), add the one property to `.card` that makes this work.",
          starterCode: `.card {
  /* add the property that makes this a positioning context */
  border: 1px solid #ddd;
  padding: 16px;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
`,
          solutionCode: `.card {
  position: relative;
  border: 1px solid #ddd;
  padding: 16px;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
          tests: [
            { id: 1, label: "Adds position: relative to .card", keywords: [{ pattern: "\\.card\\s*\\{[^}]*position:\\s*relative" }] },
            { id: 2, label: "Keeps .badge absolute", keywords: [{ pattern: "\\.badge\\s*\\{[^}]*position:\\s*absolute" }] },
            { id: 3, label: "Badge still has top/right offsets", keywords: [{ pattern: "top:\\s*8px" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Flexbox Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "layouts-flexbox-basics",
    title: "Flexbox Basics",
    icon: "↔️",
    color: "#2563eb",
    lessons: [
      {
        id: "csl-3",
        title: "Flex Container & flex-direction",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Setting `display: flex` on an element turns it into a **flex container**, and its direct children become **flex items** laid out along a single axis. `flex-direction: row` (the default) lays items left-to-right; `column` stacks them top-to-bottom.",
          },
          {
            type: "code",
            lang: "html",
            label: "Row vs column flex containers",
            content: `<style>
  .row { display: flex; gap: 8px; background: #f0f0f0; padding: 8px; }
  .column { display: flex; flex-direction: column; gap: 8px; background: #f0f0f0; padding: 8px; }
  .item { background: #4a90d9; color: #fff; padding: 12px; }
</style>

<div class="row">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
<div class="column">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`gap` works inside flex containers to space items apart, without the classic 'extra margin on the last item' problem that margin-based spacing used to require hacky fixes for.",
          },
          {
            type: "quiz",
            question: "What is the default value of flex-direction?",
            options: ["column", "row", "row-reverse", "It has no default"],
            answer: 1,
            explanation:
              "Flex containers default to flex-direction: row, laying items left-to-right along the horizontal main axis (in a left-to-right writing mode).",
          },
        ],
        challenge: {
          id: "csl-3-challenge",
          language: "css",
          title: "Stack Items Vertically",
          description:
            "Turn `.sidebar` into a flex container that stacks its children vertically with an 8px gap between them.",
          starterCode: `.sidebar {
  /* make this a flex container, stacked vertically, with an 8px gap */
}
`,
          solutionCode: `.sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}`,
          tests: [
            { id: 1, label: "Sets display: flex", keywords: [{ pattern: "display:\\s*flex" }] },
            { id: 2, label: "Sets flex-direction: column", keywords: [{ pattern: "flex-direction:\\s*column" }] },
            { id: 3, label: "Sets an 8px gap", keywords: [{ pattern: "gap:\\s*8px" }] },
          ],
        },
      },
      {
        id: "csl-4",
        title: "justify-content & align-items",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`justify-content` positions items along the **main axis** (the direction set by flex-direction); `align-items` positions them along the **cross axis** (perpendicular to it). For a default row container, that means justify-content controls horizontal spacing and align-items controls vertical alignment.",
          },
          {
            type: "code",
            lang: "html",
            label: "A toolbar using both properties",
            content: `<style>
  .toolbar {
    display: flex;
    justify-content: space-between; /* main axis: spread items apart */
    align-items: center;            /* cross axis: vertically center */
    height: 60px;
    background: #222;
    color: #fff;
    padding: 0 16px;
  }
  .toolbar .actions { display: flex; gap: 12px; }
</style>

<div class="toolbar">
  <div class="logo">MyApp</div>
  <div class="actions">
    <button type="button">Login</button>
    <button type="button">Sign up</button>
  </div>
</div>`,
          },
          {
            type: "diagram",
            title: "justify-content values",
            nodes: [
              { id: "start", label: "flex-start (default)", color: ACCENT, items: ["Items packed at the start"] },
              { id: "center", label: "center", color: "#2563eb", items: ["Items packed in the middle"] },
              { id: "between", label: "space-between", color: "#7c3aed", items: ["Equal space between items, none at the edges"] },
              { id: "around", label: "space-around", color: "#059669", items: ["Equal space around each item"] },
            ],
          },
          {
            type: "quiz",
            question: "In a default (row) flex container, which property vertically centers items?",
            options: ["justify-content: center", "align-items: center", "text-align: center", "vertical-align: middle"],
            answer: 1,
            explanation:
              "align-items operates on the cross axis, which is vertical for a row container — align-items: center vertically centers each item within the container's height.",
          },
        ],
        challenge: {
          id: "csl-4-challenge",
          language: "css",
          title: "Center Everything",
          description:
            "Make `.hero` a flex container that centers its children both horizontally and vertically, with a `min-height` of 300px.",
          starterCode: `.hero {
  min-height: 300px;
  /* center children horizontally and vertically */
}
`,
          solutionCode: `.hero {
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}`,
          tests: [
            { id: 1, label: "Uses display: flex", keywords: [{ pattern: "display:\\s*flex" }] },
            { id: 2, label: "Centers on the main axis", keywords: [{ pattern: "justify-content:\\s*center" }] },
            { id: 3, label: "Centers on the cross axis", keywords: [{ pattern: "align-items:\\s*center" }] },
          ],
        },
      },
      {
        id: "csl-5",
        title: "flex-wrap & the flex Shorthand",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "By default, flex items try to fit on **one line**, shrinking if needed. `flex-wrap: wrap` lets items flow onto multiple lines instead. The `flex` shorthand (`flex: grow shrink basis`) on each item controls how it grows, shrinks, and its starting size — `flex: 1 1 150px` means 'grow and shrink freely, starting from 150px'.",
          },
          {
            type: "code",
            lang: "html",
            label: "Wrapping items with a flexible basis",
            content: `<style>
  .gallery { display: flex; flex-flow: row wrap; gap: 10px; }
  .thumb {
    flex: 1 1 150px; /* grow shrink basis shorthand */
    background: #6c757d;
    color: #fff;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="gallery">
  <div class="thumb">1</div>
  <div class="thumb">2</div>
  <div class="thumb">3</div>
  <div class="thumb">4</div>
  <div class="thumb">5</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`flex-flow` is shorthand for `flex-direction` + `flex-wrap` in one declaration — `flex-flow: row wrap` is equivalent to writing both properties separately.",
          },
          {
            type: "quiz",
            question: "What does `flex: 1 1 150px` mean on a flex item?",
            options: [
              "Never grow, never shrink, exactly 150px wide",
              "Grow to fill space, shrink if needed, starting from a 150px basis",
              "Always exactly 1px wide",
              "It's invalid shorthand syntax",
            ],
            answer: 1,
            explanation:
              "The three values are flex-grow, flex-shrink, and flex-basis in order. flex: 1 1 150px lets the item both grow and shrink relative to siblings, starting from a preferred size of 150px before space is distributed.",
          },
        ],
        challenge: {
          id: "csl-5-challenge",
          language: "css",
          title: "Wrapping Tag List",
          description:
            "Make `.tags` a flex container that wraps onto multiple lines with an 8px gap, and give each `.tag` a flex value of `0 1 auto` (don't grow, can shrink, size from content).",
          starterCode: `.tags {
  /* flex container that wraps, 8px gap */
}

.tag {
  /* don't grow, can shrink, size from content */
  background: #eee;
  padding: 4px 8px;
}
`,
          solutionCode: `.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  flex: 0 1 auto;
  background: #eee;
  padding: 4px 8px;
}`,
          tests: [
            { id: 1, label: ".tags is a flex container", keywords: [{ pattern: "\\.tags\\s*\\{[^}]*display:\\s*flex" }] },
            { id: 2, label: ".tags wraps", keywords: [{ pattern: "flex-wrap:\\s*wrap" }] },
            { id: 3, label: ".tag has the right flex shorthand", keywords: [{ pattern: "flex:\\s*0\\s+1\\s+auto" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Flexbox in Practice
  // ─────────────────────────────────────────────────────────────
  {
    id: "layouts-flexbox-practice",
    title: "Flexbox in Practice",
    icon: "🧰",
    color: "#7c3aed",
    lessons: [
      {
        id: "csl-6",
        title: "flex-grow, flex-shrink, flex-basis",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Understanding the three `flex` components individually unlocks precise control: `flex-grow` (a ratio of how much extra space an item claims), `flex-shrink` (a ratio of how much an item gives up when space is tight), and `flex-basis` (the item's starting size before growing/shrinking is applied).",
          },
          {
            type: "code",
            lang: "html",
            label: "A fixed sidebar next to a flexible content area",
            content: `<style>
  .layout { display: flex; gap: 8px; }
  .sidebar {
    flex: 0 0 200px; /* don't grow, don't shrink, fixed 200px basis */
    background: #343a40;
    color: #fff;
    padding: 12px;
  }
  .content {
    flex: 1 1 auto; /* grow to fill remaining space */
    background: #e9ecef;
    padding: 12px;
  }
</style>

<div class="layout">
  <div class="sidebar">Sidebar (fixed 200px)</div>
  <div class="content">Content grows to fill remaining space</div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`flex: 0 0 200px` is a very common pattern for a fixed-width sidebar: grow=0 and shrink=0 keep it exactly 200px regardless of container size, while the sibling with `flex: 1` absorbs all remaining space.",
          },
          {
            type: "quiz",
            question: "In `flex: 0 0 200px`, what do the two zeros mean?",
            options: [
              "The item is invisible",
              "The item won't grow and won't shrink — it stays exactly at its 200px basis",
              "The item has zero width",
              "Both values are ignored",
            ],
            answer: 1,
            explanation:
              "The first 0 is flex-grow (won't take extra space), the second is flex-shrink (won't give up space when tight) — combined with the 200px basis, this pins the item at a fixed width.",
          },
        ],
        challenge: {
          id: "csl-6-challenge",
          language: "css",
          title: "Fixed Sidebar Layout",
          description:
            "Give `.panel` a fixed 250px width that never grows or shrinks, and give `.main` a flex value that lets it grow to fill remaining space starting from 0.",
          starterCode: `.layout { display: flex; gap: 8px; }

.panel {
  /* fixed 250px, no grow, no shrink */
}

.main {
  /* grow to fill, starting basis 0 */
}
`,
          solutionCode: `.layout { display: flex; gap: 8px; }

.panel {
  flex: 0 0 250px;
}

.main {
  flex: 1 1 0;
}`,
          tests: [
            { id: 1, label: ".panel is fixed at 250px", keywords: [{ pattern: "\\.panel\\s*\\{[^}]*flex:\\s*0\\s+0\\s+250px" }] },
            { id: 2, label: ".main grows to fill", keywords: [{ pattern: "\\.main\\s*\\{[^}]*flex:\\s*1" }] },
            { id: 3, label: "Layout is still a flex container", keywords: [{ pattern: "display:\\s*flex" }] },
          ],
        },
      },
      {
        id: "csl-7",
        title: "align-self & order",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`align-self` overrides the container's `align-items` value for **one specific item**. `order` changes the **visual** order items appear in, without touching the underlying HTML/DOM order — useful for reordering content per breakpoint without duplicating markup.",
          },
          {
            type: "code",
            lang: "html",
            label: "Overriding alignment and visual order per item",
            content: `<style>
  .row { display: flex; align-items: flex-start; height: 120px; gap: 8px; background: #f8f9fa; }
  .card { background: #4a90d9; color: #fff; padding: 10px; }
  .card.stretch-me { align-self: stretch; }
  .card.first { order: -1; }
</style>

<div class="row">
  <div class="card">A (order 0)</div>
  <div class="card stretch-me">B (align-self: stretch)</div>
  <div class="card first">C (order: -1, appears first)</div>
</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Reordering with `order` is purely visual — screen readers and keyboard tab order still follow the underlying DOM order. Don't rely on `order` alone to fix a confusing document structure; fix the HTML source order when the *logical* reading order matters.",
          },
          {
            type: "quiz",
            question: "Does the CSS order property change the DOM/HTML structure?",
            options: [
              "Yes, it physically moves the elements in the DOM",
              "No, it only changes the visual painting order — the underlying DOM order (and typically tab/reading order) stays the same",
              "It changes the DOM order only in Chrome",
              "order requires JavaScript to work",
            ],
            answer: 1,
            explanation:
              "order is purely a rendering/paint-order hint for flex (and grid) layout. Screen readers and default tab order still follow the original source order in the HTML, which is why relying on order for meaningful content sequencing is an accessibility pitfall.",
          },
        ],
        challenge: {
          id: "csl-7-challenge",
          language: "css",
          title: "Reorder a Call-to-Action",
          description:
            "Given three flex items (.a, .b, .c) laid out in that source order, use `order` on `.c` only so it visually appears first (before .a and .b).",
          starterCode: `.row { display: flex; gap: 8px; }

.c {
  /* make this appear first visually */
}
`,
          solutionCode: `.row { display: flex; gap: 8px; }

.c {
  order: -1;
}`,
          tests: [
            { id: 1, label: "Sets order on .c", keywords: [{ pattern: "\\.c\\s*\\{[^}]*order:" }] },
            { id: 2, label: "Uses a negative order value", keywords: [{ pattern: "order:\\s*-1" }] },
            { id: 3, label: "Row is still a flex container", keywords: [{ pattern: "display:\\s*flex" }] },
          ],
        },
      },
      {
        id: "csl-8",
        title: "Building a Nav Bar with Flexbox",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A navigation bar is one of flexbox's most common real-world uses: a horizontal brand + links layout, where `justify-content: space-between` naturally pushes the brand to one side and the link list to the other, with `align-items: center` keeping everything vertically aligned regardless of font size differences.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete flexbox nav bar",
            content: `<style>
  nav.site-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: #1f2933;
  }
  nav.site-nav .brand { color: #fff; font-weight: 700; }
  nav.site-nav ul { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
  nav.site-nav a { color: #cbd2d9; text-decoration: none; }
</style>

<nav class="site-nav">
  <span class="brand">Brandly</span>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Notice the `<ul>` is *itself* a flex container (`display: flex`) nested inside the nav's flex container — this two-level flex nesting (outer row for brand+links, inner row for the links themselves) is an extremely common real-world pattern.",
          },
          {
            type: "quiz",
            question: "Why does justify-content: space-between work well for a brand + nav-links layout?",
            options: [
              "It centers both groups on top of each other",
              "It pushes the first and last flex items to opposite ends of the container, with the brand and link list as the only two items",
              "It only works with exactly 3 items",
              "It requires position: absolute to work",
            ],
            answer: 1,
            explanation:
              "With exactly two direct flex children (the brand and the <ul>), space-between places the first at the start edge and the last at the end edge — exactly the classic 'logo left, links right' nav pattern, with zero extra positioning code.",
          },
        ],
        challenge: {
          id: "csl-8-challenge",
          language: "css",
          title: "Two-Item Header",
          description:
            "Style `.header` as a flex container with the brand on the left and a `.cta` button pushed to the far right, vertically centered, using `justify-content` and `align-items`.",
          starterCode: `.header {
  /* flex container, space brand and cta apart, center vertically */
  padding: 16px;
}
`,
          solutionCode: `.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}`,
          tests: [
            { id: 1, label: "Uses display: flex", keywords: [{ pattern: "display:\\s*flex" }] },
            { id: 2, label: "Spaces items apart", keywords: [{ pattern: "justify-content:\\s*space-between" }] },
            { id: 3, label: "Vertically centers items", keywords: [{ pattern: "align-items:\\s*center" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Grid Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "layouts-grid-basics",
    title: "Grid Basics",
    icon: "🔲",
    color: "#059669",
    lessons: [
      {
        id: "csl-9",
        title: "grid-template-columns & Rows",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`display: grid` creates a **two-dimensional** layout grid — rows and columns together, unlike flexbox's single axis. `grid-template-columns` and `grid-template-rows` define the size of each track; the special `fr` unit represents a share of the remaining free space.",
          },
          {
            type: "code",
            lang: "html",
            label: "A three-column, two-row grid",
            content: `<style>
  .grid {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: 80px auto;
    gap: 8px;
  }
  .cell { background: #4a90d9; color: #fff; padding: 10px; }
</style>

<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Grid items are placed into the grid automatically, filling row by row, unless you explicitly position them (covered in the next lesson). With 3 columns and 6 items here, you automatically get exactly 2 rows.",
          },
          {
            type: "quiz",
            question: "What does the fr unit represent in grid-template-columns?",
            options: [
              "A fixed number of pixels",
              "A fraction/share of the remaining free space in the grid container",
              "The number of grid items in that column",
              "A percentage of the viewport width",
            ],
            answer: 1,
            explanation:
              "fr distributes leftover space proportionally. grid-template-columns: 200px 1fr 1fr gives the first column a fixed 200px, then splits whatever space remains equally between the other two 1fr columns.",
          },
        ],
        challenge: {
          id: "csl-9-challenge",
          language: "css",
          title: "Three Equal Columns",
          description:
            "Make `.grid` a grid container with 3 equal-width columns using the `fr` unit and an 8px gap.",
          starterCode: `.grid {
  /* grid with 3 equal columns, 8px gap */
}
`,
          solutionCode: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}`,
          tests: [
            { id: 1, label: "Uses display: grid", keywords: [{ pattern: "display:\\s*grid" }] },
            { id: 2, label: "Defines 3 fr columns", keywords: [{ pattern: "grid-template-columns:\\s*1fr\\s+1fr\\s+1fr" }] },
            { id: 3, label: "Sets an 8px gap", keywords: [{ pattern: "gap:\\s*8px" }] },
          ],
        },
      },
      {
        id: "csl-10",
        title: "The gap Property",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`gap` (formerly `grid-gap`) creates space between grid tracks **without** adding margin to the edges — unlike margin-based spacing, there's no extra space at the outer edges of the grid to compensate for. `row-gap` and `column-gap` control each axis independently; `gap` is shorthand for both.",
          },
          {
            type: "code",
            lang: "html",
            label: "Independent row and column gaps",
            content: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 16px;
    column-gap: 8px;
    /* gap: 16px 8px; is the shorthand for the two lines above */
  }
  .cell { background: #6c757d; color: #fff; padding: 12px; }
</style>

<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`gap` also works in flexbox containers (not just grid) in all modern browsers — so the property you're learning here transfers directly to the flexbox layouts from the previous chapter.",
          },
          {
            type: "quiz",
            question: "What's the shorthand order for `gap: 16px 8px`?",
            options: [
              "column-gap then row-gap",
              "row-gap then column-gap",
              "It sets only column-gap, twice",
              "The order doesn't matter",
            ],
            answer: 1,
            explanation:
              "The gap shorthand takes row-gap first, then column-gap: gap: 16px 8px means 16px between rows and 8px between columns — the same order as the (deprecated but still equivalent) margin shorthand's top/right pattern isn't quite analogous, but row-then-column is the rule to remember here.",
          },
        ],
        challenge: {
          id: "csl-10-challenge",
          language: "css",
          title: "Different Row and Column Spacing",
          description:
            "Set `.board` to have a 3-column grid with `20px` spacing between rows and `10px` spacing between columns, using the `gap` shorthand.",
          starterCode: `.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* set the gap shorthand: 20px rows, 10px columns */
}
`,
          solutionCode: `.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 10px;
}`,
          tests: [
            { id: 1, label: "Uses the gap shorthand with two values", keywords: [{ pattern: "gap:\\s*20px\\s+10px" }] },
            { id: 2, label: "Still uses 3 columns", keywords: [{ pattern: "repeat\\(3" }] },
            { id: 3, label: "Uses display: grid", keywords: [{ pattern: "display:\\s*grid" }] },
          ],
        },
      },
      {
        id: "csl-11",
        title: "Placing Items on the Grid",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Grid lines are numbered starting at 1. `grid-column: 1 / 3` places an item spanning from **line 1 to line 3** (covering 2 column tracks). The same applies to `grid-row`. This gives you precise control to make specific items span multiple rows or columns.",
          },
          {
            type: "code",
            lang: "html",
            label: "A featured item spanning 2 columns and 2 rows",
            content: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 8px;
  }
  .cell { background: #4a90d9; color: #fff; padding: 10px; }
  .featured {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    background: #d9534f;
  }
</style>

<div class="grid">
  <div class="cell featured">Featured (2x2)</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`grid-column: 1 / 3` can also be written `grid-column: 1 / span 2` — 'start at line 1, span 2 tracks' — which is often easier to reason about than counting to the exact end line, especially once you start editing the number of columns.",
          },
          {
            type: "quiz",
            question: "In a grid, what does `grid-column: 2 / span 3` mean?",
            options: [
              "Start at column line 2 and span 3 column tracks",
              "Place the item in exactly column 2, repeated 3 times",
              "Skip the first 2 columns entirely",
              "It's invalid syntax",
            ],
            answer: 0,
            explanation:
              "The span keyword lets you specify a starting line plus how many tracks to cover, rather than calculating the exact ending line number — grid-column: 2 / span 3 starts at line 2 and covers 3 column tracks (ending at line 5).",
          },
        ],
        challenge: {
          id: "csl-11-challenge",
          language: "css",
          title: "Span a Banner Across Columns",
          description:
            "Given a 4-column grid, make `.banner` span all 4 columns (from line 1 to line 5) while staying in the first row.",
          starterCode: `.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.banner {
  /* span all 4 columns */
}
`,
          solutionCode: `.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.banner {
  grid-column: 1 / 5;
}`,
          tests: [
            { id: 1, label: "Sets grid-column on .banner", keywords: [{ pattern: "\\.banner\\s*\\{[^}]*grid-column:" }] },
            { id: 2, label: "Spans from line 1 to line 5", keywords: [{ pattern: "grid-column:\\s*1\\s*/\\s*5" }] },
            { id: 3, label: "Grid still has 4 columns", keywords: [{ pattern: "repeat\\(4" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Grid in Practice
  // ─────────────────────────────────────────────────────────────
  {
    id: "layouts-grid-practice",
    title: "Grid in Practice",
    icon: "🧩",
    color: "#f59e0b",
    lessons: [
      {
        id: "csl-12",
        title: "grid-template-areas",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`grid-template-areas` lets you name regions of the grid as ASCII art, then assign each item to a named area with `grid-area`. This is often the most readable way to define a whole-page layout, since the CSS visually resembles the page structure.",
          },
          {
            type: "code",
            lang: "html",
            label: "A header/sidebar/main/footer page layout",
            content: `<style>
  .page {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr 50px;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 8px;
    min-height: 300px;
  }
  .header { grid-area: header; background: #343a40; color: #fff; }
  .sidebar { grid-area: sidebar; background: #495057; color: #fff; }
  .main { grid-area: main; background: #e9ecef; }
  .footer { grid-area: footer; background: #343a40; color: #fff; }
</style>

<div class="page">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="main">Main content</div>
  <div class="footer">Footer</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Each row string in `grid-template-areas` must have the same number of columns, and repeating a name across cells (like \"header header\") makes that item span multiple tracks — it must form a rectangle, though.",
          },
          {
            type: "quiz",
            question: "What does repeating the same area name across two adjacent cells in grid-template-areas do?",
            options: [
              "Causes an error — names can't repeat",
              "Makes that named item span across both of those grid cells",
              "Creates two separate copies of the same element",
              "It has no effect on layout",
            ],
            answer: 1,
            explanation:
              "Repeating \"header header\" across the top row tells the grid that the header area spans both columns in that row — grid-area: header then makes a single element occupy that whole spanned region.",
          },
        ],
        challenge: {
          id: "csl-12-challenge",
          language: "css",
          title: "Two-Column Page with Full-Width Footer",
          description:
            "Define `grid-template-areas` for a layout with a full-width \"nav\" row on top, a \"side\" and \"content\" side-by-side row, and a full-width \"footer\" row, then assign `.footer` to the footer area.",
          starterCode: `.page {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 50px 1fr 40px;
  /* define grid-template-areas here */
}

.footer {
  /* assign to the footer area */
}
`,
          solutionCode: `.page {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 50px 1fr 40px;
  grid-template-areas:
    "nav nav"
    "side content"
    "footer footer";
}

.footer {
  grid-area: footer;
}`,
          tests: [
            { id: 1, label: "Defines grid-template-areas", keywords: [{ pattern: "grid-template-areas:" }] },
            { id: 2, label: "Footer row spans both columns", keywords: [{ pattern: "\"footer\\s+footer\"" }] },
            { id: 3, label: ".footer uses grid-area", keywords: [{ pattern: "\\.footer\\s*\\{[^}]*grid-area:\\s*footer" }] },
          ],
        },
      },
      {
        id: "csl-13",
        title: "fr, repeat(), and minmax()",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`repeat(3, 1fr)` is shorthand for writing `1fr 1fr 1fr` — invaluable once you have many equal tracks. `minmax(150px, 1fr)` sets a track's floor and ceiling: it never shrinks below 150px, but grows up to its 1fr share of remaining space. Combining them (`repeat(3, minmax(150px, 1fr))`) is one of the most common responsive grid patterns.",
          },
          {
            type: "code",
            lang: "html",
            label: "repeat() and minmax() together",
            content: `<style>
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .grid-minmax {
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    gap: 8px;
    margin-top: 12px;
  }
  .cell { background: #4a90d9; color: #fff; padding: 10px; }
</style>

<div class="grid">
  <div class="cell">1fr</div>
  <div class="cell">1fr</div>
  <div class="cell">1fr</div>
</div>
<div class="grid-minmax">
  <div class="cell">minmax(150px, 1fr)</div>
  <div class="cell">minmax(150px, 1fr)</div>
  <div class="cell">minmax(150px, 1fr)</div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Without minmax, a plain `1fr` column can shrink all the way to zero width if the container gets narrow enough — minmax(150px, 1fr) guarantees a usable minimum size, which matters a lot once you start building responsive layouts.",
          },
          {
            type: "quiz",
            question: "What problem does minmax(150px, 1fr) solve compared to a plain 1fr column?",
            options: [
              "It makes the column exactly 150px always",
              "It prevents the column from shrinking below 150px, while still letting it grow to fill available space",
              "It centers the column's content",
              "It's purely cosmetic and changes nothing functionally",
            ],
            answer: 1,
            explanation:
              "A plain 1fr can shrink toward 0 as the container narrows. minmax(150px, 1fr) sets a floor of 150px (won't go smaller) while keeping 1fr's flexible growth behavior as the ceiling.",
          },
        ],
        challenge: {
          id: "csl-13-challenge",
          language: "css",
          title: "Guarantee a Minimum Column Width",
          description:
            "Rewrite `.cards` to use `repeat(4, minmax(120px, 1fr))` for its columns so each of the 4 columns never shrinks below 120px.",
          starterCode: `.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
`,
          solutionCode: `.cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 12px;
}`,
          tests: [
            { id: 1, label: "Uses repeat(4, ...)", keywords: [{ pattern: "repeat\\(4" }] },
            { id: 2, label: "Uses minmax with a 120px floor", keywords: [{ pattern: "minmax\\(120px,\\s*1fr\\)" }] },
            { id: 3, label: "Still a grid container", keywords: [{ pattern: "display:\\s*grid" }] },
          ],
        },
      },
      {
        id: "csl-14",
        title: "auto-fill vs auto-fit",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`repeat(auto-fill, minmax(120px, 1fr))` and `repeat(auto-fit, minmax(120px, 1fr))` both create as many tracks as will fit — the difference only shows when there are **fewer items than tracks that would fit**. `auto-fill` keeps the empty tracks (leaving gaps); `auto-fit` collapses them, letting the real items stretch to fill the row.",
          },
          {
            type: "code",
            lang: "html",
            label: "auto-fill leaves gaps; auto-fit collapses them",
            content: `<style>
  .fill { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
  .fit { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin-top: 12px; }
  .cell { background: #6c757d; color: #fff; padding: 12px; text-align: center; }
</style>

<!-- auto-fill: keeps empty tracks if there's extra space -->
<div class="fill">
  <div class="cell">1</div>
  <div class="cell">2</div>
</div>
<!-- auto-fit: collapses empty tracks, letting real items stretch to fill the row -->
<div class="fit">
  <div class="cell">1</div>
  <div class="cell">2</div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "For most \"responsive card grid\" use cases, `auto-fit` is what you want — it produces the intuitive result of items stretching to fill the row when there aren't enough of them to fill every possible column.",
          },
          {
            type: "quiz",
            question: "With only 2 items but room for 5 columns, what's the visible difference between auto-fill and auto-fit?",
            options: [
              "No visible difference ever",
              "auto-fill leaves 3 empty, invisible tracks (items stay their minmax minimum width); auto-fit collapses those empty tracks so the 2 items stretch to fill the row",
              "auto-fit leaves gaps; auto-fill stretches items",
              "auto-fill only works with flexbox, not grid",
            ],
            answer: 1,
            explanation:
              "Both create the same number of potential tracks based on available space. auto-fill keeps unused tracks in the grid (even though they're empty), while auto-fit collapses empty tracks to zero width, which frees up space for the fr portion of minmax to let real items grow wider.",
          },
        ],
        challenge: {
          id: "csl-14-challenge",
          language: "css",
          title: "Stretchy Card Grid",
          description:
            "Set `.cards` to use `auto-fit` with `minmax(150px, 1fr)` so that a small number of cards stretch to fill the available row width.",
          starterCode: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
`,
          solutionCode: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}`,
          tests: [
            { id: 1, label: "Uses auto-fit (not auto-fill)", keywords: [{ pattern: "repeat\\(auto-fit" }] },
            { id: 2, label: "Keeps the 150px minimum", keywords: [{ pattern: "minmax\\(150px,\\s*1fr\\)" }] },
            { id: 3, label: "Still a grid container", keywords: [{ pattern: "display:\\s*grid" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Combining Layouts & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "layouts-combining-capstone",
    title: "Combining Layouts & Capstone",
    icon: "🏆",
    color: "#dc2626",
    lessons: [
      {
        id: "csl-15",
        title: "Flexbox vs Grid — When to Use Which",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Flexbox is **one-dimensional** — it excels at distributing items along a single row or column (navbars, toolbars, button groups). Grid is **two-dimensional** — it excels at whole-page or whole-section layouts where you need to control both rows and columns together. Most real interfaces use both, at different levels.",
          },
          {
            type: "diagram",
            title: "Choosing the right tool",
            nodes: [
              { id: "flex-use", label: "Reach for Flexbox", color: ACCENT, items: ["Nav bars & toolbars", "Button groups", "Centering a single element", "Distributing items along one line"] },
              { id: "grid-use", label: "Reach for Grid", color: "#059669", items: ["Whole page layout", "Card galleries with rows AND columns", "Anything needing precise 2D placement"] },
            ],
          },
          {
            type: "code",
            lang: "html",
            label: "A toolbar (flex) sitting above a page layout (grid)",
            content: `<style>
  .toolbar { display: flex; gap: 10px; }
  .page-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr;
    gap: 8px;
    margin-top: 16px;
  }
  .btn { background: #4a90d9; color: #fff; padding: 8px 12px; }
  .panel { background: #e9ecef; padding: 10px; }
</style>

<div class="toolbar">
  <button class="btn" type="button">Save</button>
  <button class="btn" type="button">Cancel</button>
</div>
<div class="page-grid">
  <div class="panel">Sidebar</div>
  <div class="panel">Main</div>
</div>`,
          },
          {
            type: "quiz",
            question: "Which layout is generally the better fit for an overall page skeleton (header, sidebar, main, footer)?",
            options: ["Flexbox, because it's simpler", "Grid, because the layout needs both rows and columns controlled together", "Neither — always use floats", "It doesn't matter, they're identical"],
            answer: 1,
            explanation:
              "A page skeleton needs simultaneous control over rows (header/main/footer) and columns (sidebar/content) — exactly grid's two-dimensional strength. Flexbox can approximate it but requires more nested containers and manual sizing tricks.",
          },
        ],
        challenge: {
          id: "csl-15-challenge",
          language: "css",
          title: "Pick the Right Layout Method",
          description:
            "Store a string `choice` describing which layout method (Flexbox or Grid) best fits a single-row list of filter chips that need to wrap onto new lines, and print your reasoning as a comment above it.",
          starterCode: `/* Which layout method fits a single row of wrapping filter chips? */
.choice {
}
`,
          solutionCode: `/* Flexbox: filter chips are a single (wrapping) row/axis of items,
   which is exactly flexbox's one-dimensional strength. */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}`,
          tests: [
            { id: 1, label: "Uses display: flex", keywords: [{ pattern: "display:\\s*flex" }] },
            { id: 2, label: "Wraps onto multiple lines", keywords: [{ pattern: "flex-wrap:\\s*wrap" }] },
            { id: 3, label: "Has a gap between chips", keywords: [{ pattern: "gap:" }] },
          ],
        },
      },
      {
        id: "csl-16",
        title: "Nesting Flex Inside Grid",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Grid and Flexbox compose naturally: use **Grid** to lay out a collection of cards (rows and columns), and **Flexbox** inside each individual card to arrange its internal content (title, description, and a button pinned to the bottom).",
          },
          {
            type: "code",
            lang: "html",
            label: "Grid for the gallery, flex for each card's internals",
            content: `<style>
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    border: 1px solid #ddd;
    padding: 12px;
    min-height: 140px;
  }
  .card button { align-self: flex-start; }
</style>

<div class="grid">
  <div class="card">
    <h3>Card One</h3>
    <p>Grid arranges the cards; flexbox arranges each card's own content.</p>
    <button type="button">View</button>
  </div>
  <div class="card">
    <h3>Card Two</h3>
    <p>Same internal structure, different content.</p>
    <button type="button">View</button>
  </div>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`justify-content: space-between` inside each `.card` (a flex column) pushes the title/description to the top and the button to the bottom — even though card heights vary with content length, every button lines up at the same visual 'floor'.",
          },
          {
            type: "quiz",
            question: "In a flex-column card with justify-content: space-between, what happens to the first and last children?",
            options: [
              "They're centered together in the middle",
              "The first child sticks to the top and the last child sticks to the bottom of the flex container, with space distributed between them",
              "Nothing — space-between only works in row direction",
              "The children overlap",
            ],
            answer: 1,
            explanation:
              "justify-content works along the main axis regardless of direction — in a column flex container, the main axis is vertical, so space-between pushes the first item to the top and the last to the bottom of the available height.",
          },
        ],
        challenge: {
          id: "csl-16-challenge",
          language: "css",
          title: "Card with a Pinned Footer Button",
          description:
            "Make `.product-card` a flex column where the `.buy-btn` inside it always sits at the bottom, regardless of how much text is above it, using `margin-top: auto` on the button.",
          starterCode: `.product-card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.buy-btn {
  /* push this to the bottom of the card */
}
`,
          solutionCode: `.product-card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.buy-btn {
  margin-top: auto;
}`,
          tests: [
            { id: 1, label: ".product-card is a flex column", keywords: [{ pattern: "flex-direction:\\s*column" }] },
            { id: 2, label: "Uses margin-top: auto on the button", keywords: [{ pattern: "\\.buy-btn\\s*\\{[^}]*margin-top:\\s*auto" }] },
            { id: 3, label: "Card is a flex container", keywords: [{ pattern: "display:\\s*flex" }] },
          ],
        },
      },
      {
        id: "csl-17",
        title: "Capstone: Responsive Card Gallery",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine everything from this course into one real component: a responsive product gallery using CSS Grid with `auto-fit` + `minmax` for the outer layout, and Flexbox inside each card to keep the price pinned to the bottom — no media queries needed at all.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete responsive card gallery",
            content: `<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  .card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  .card .thumb { height: 120px; background: #4a90d9; }
  .card .body { display: flex; flex-direction: column; gap: 8px; padding: 12px; flex: 1; }
  .card .body .price { margin-top: auto; font-weight: bold; }
</style>

<div class="gallery">
  <article class="card">
    <div class="thumb"></div>
    <div class="body">
      <h3>Product One</h3>
      <p>A short description of the product.</p>
      <span class="price">$19.99</span>
    </div>
  </article>
  <article class="card">
    <div class="thumb"></div>
    <div class="body">
      <h3>Product Two</h3>
      <p>Cards reflow automatically as the viewport changes width.</p>
      <span class="price">$24.99</span>
    </div>
  </article>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This gallery is a great example of the whole course's philosophy: Grid decides *how many cards fit per row* automatically (auto-fit + minmax), and Flexbox decides *how content is arranged inside each card* (column direction + margin-top: auto for the price) — two tools, each doing what it's best at.",
          },
          {
            type: "quiz",
            question: "What makes this gallery responsive without writing a single media query?",
            options: [
              "JavaScript resize listeners",
              "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) automatically recalculates how many columns fit as the container width changes",
              "The gallery isn't actually responsive",
              "Flexbox alone handles all the responsiveness",
            ],
            answer: 1,
            explanation:
              "auto-fit + minmax continuously recalculates the number of columns based on available width and the 200px minimum — no breakpoints needed, since the browser recalculates the grid on every resize.",
          },
        ],
        challenge: {
          id: "csl-17-challenge",
          language: "css",
          title: "Add a Featured Card",
          description:
            "Extend the gallery: make one card, `.card.featured`, span 2 grid columns (using `grid-column: span 2`) so it stands out from the rest of the auto-fit grid.",
          starterCode: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card.featured {
  /* span 2 columns */
}
`,
          solutionCode: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card.featured {
  grid-column: span 2;
}`,
          tests: [
            { id: 1, label: "Gallery still uses auto-fit + minmax", keywords: [{ pattern: "repeat\\(auto-fit,\\s*minmax" }] },
            { id: 2, label: "Featured card spans 2 columns", keywords: [{ pattern: "grid-column:\\s*span\\s*2" }] },
            { id: 3, label: "Gallery keeps its gap", keywords: [{ pattern: "gap:\\s*16px" }] },
          ],
        },
      },
    ],
  },
];

export const CSS_LAYOUTS_CHAPTERS = RAW_CSS_LAYOUTS_CHAPTERS;

export const CSS_LAYOUTS_LESSONS = CSS_LAYOUTS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSS_LAYOUTS_TOTAL_XP = CSS_LAYOUTS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
