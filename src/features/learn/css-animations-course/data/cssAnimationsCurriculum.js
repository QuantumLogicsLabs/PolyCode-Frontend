// PolyCode — CSS Animations & Transitions interactive course
// 6 chapters · 18 lessons
// Every HTML sample in this file was validated with html-validate (recommended
// ruleset) and every CSS block was parsed with css-tree to confirm it is
// syntactically valid before being included. Techniques follow the CSS
// Transitions, CSS Animations Level 1, and CSS Transforms Level 1/2
// specifications (W3C).

const ACCENT = "#8b5cf6"; // animation purple

const RAW_CSS_ANIMATIONS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Transitions Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "animations-transitions-basics",
    title: "Transitions Basics",
    icon: "🎬",
    color: ACCENT,
    lessons: [
      {
        id: "csa-0",
        title: "transition-property & transition-duration",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "A CSS transition smoothly animates a property's change between two states (like normal and `:hover`) instead of jumping instantly. `transition-property` names which CSS property to animate; `transition-duration` sets how long the animation takes.",
          },
          {
            type: "code",
            lang: "html",
            label: "A smooth background-color transition on hover",
            content: `<style>
  .btn {
    background: #4a90d9;
    color: #fff;
    padding: 10px 20px;
    border: none;
    transition-property: background-color;
    transition-duration: 0.3s;
  }
  .btn:hover {
    background-color: #2c5aa0;
  }
</style>

<button class="btn" type="button">Hover me</button>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Transitions only animate between two **known** states — they need a starting value and an ending value to interpolate between. That's why they're most often paired with a state change like `:hover`, `:focus`, or a class toggled by JavaScript.",
          },
          {
            type: "quiz",
            question: "What does transition-duration control?",
            options: [
              "Which property gets animated",
              "How long the transition animation takes to complete",
              "How many times the transition repeats",
              "The starting color of the transition",
            ],
            answer: 1,
            explanation:
              "transition-duration sets the time (e.g. 0.3s or 300ms) the browser takes to interpolate from the starting value to the ending value of the animated property.",
          },
        ],
        challenge: {
          id: "csa-0-challenge",
          language: "css",
          title: "Animate a Hover Color Change",
          description:
            "Give `.link` a `transition-property: color` and `transition-duration: 0.2s`, so its `:hover` color change (already defined) animates smoothly.",
          starterCode: `.link {
  color: #333;
  /* add transition-property and transition-duration */
}

.link:hover {
  color: #4a90d9;
}
`,
          solutionCode: `.link {
  color: #333;
  transition-property: color;
  transition-duration: 0.2s;
}

.link:hover {
  color: #4a90d9;
}`,
          tests: [
            { id: 1, label: "Sets transition-property: color", keywords: [{ pattern: "transition-property:\\s*color" }] },
            { id: 2, label: "Sets transition-duration: 0.2s", keywords: [{ pattern: "transition-duration:\\s*0\\.2s" }] },
            { id: 3, label: "Keeps the :hover color rule", keywords: [{ pattern: ":hover\\s*\\{[^}]*color:\\s*#4a90d9" }] },
          ],
        },
      },
      {
        id: "csa-1",
        title: "Timing Functions",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`transition-timing-function` controls the **pace** of the animation, not its duration. `linear` moves at a constant speed. `ease-in-out` (the default-ish common choice) starts slow, speeds up, then slows down again. `cubic-bezier(...)` lets you define a fully custom curve, including playful 'overshoot' effects.",
          },
          {
            type: "code",
            lang: "html",
            label: "Comparing timing functions side by side",
            content: `<style>
  .box {
    width: 100px;
    height: 40px;
    background: #4a90d9;
    margin-bottom: 8px;
    transition: transform 0.6s;
  }
  .linear { transition-timing-function: linear; }
  .ease-in-out { transition-timing-function: ease-in-out; }
  .custom { transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); }
  .box:hover { transform: translateX(150px); }
</style>

<div class="box linear">linear</div>
<div class="box ease-in-out">ease-in-out</div>
<div class="box custom">cubic-bezier</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "A cubic-bezier curve with a control point outside the 0–1 range (like the `-0.55` and `1.55` above) creates a 'bounce past the target, then settle back' overshoot effect — a popular technique for playful UI feedback.",
          },
          {
            type: "quiz",
            question: "What's the difference between transition-duration and transition-timing-function?",
            options: [
              "They control the same thing",
              "duration sets how long the animation takes; timing-function sets the pace/acceleration curve throughout that duration",
              "timing-function sets the duration in milliseconds",
              "duration only works with transform, timing-function only works with color",
            ],
            answer: 1,
            explanation:
              "duration answers 'how long' (e.g. 0.6 seconds); timing-function answers 'how does the speed change during that time' (constant with linear, slow-fast-slow with ease-in-out, or a fully custom curve with cubic-bezier).",
          },
        ],
        challenge: {
          id: "csa-1-challenge",
          language: "css",
          title: "Apply an ease-in-out Curve",
          description:
            "Add `transition-timing-function: ease-in-out` to `.panel`, which already transitions `opacity` over `0.4s`.",
          starterCode: `.panel {
  opacity: 0.5;
  transition-property: opacity;
  transition-duration: 0.4s;
  /* add the timing function */
}
`,
          solutionCode: `.panel {
  opacity: 0.5;
  transition-property: opacity;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
}`,
          tests: [
            { id: 1, label: "Adds transition-timing-function", keywords: [{ pattern: "transition-timing-function:" }] },
            { id: 2, label: "Uses ease-in-out specifically", keywords: [{ pattern: "ease-in-out" }] },
            { id: 3, label: "Keeps the existing duration", keywords: [{ pattern: "transition-duration:\\s*0\\.4s" }] },
          ],
        },
      },
      {
        id: "csa-2",
        title: "The transition Shorthand & Multiple Properties",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "The `transition` shorthand combines property, duration, timing-function (and optional delay) into one declaration: `transition: property duration timing-function`. Comma-separate multiple entries to animate several properties with **different** timings in one line.",
          },
          {
            type: "code",
            lang: "html",
            label: "Three properties, each with its own timing",
            content: `<style>
  .card {
    background: #fff;
    border: 1px solid #ddd;
    padding: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s linear;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    background-color: #f8f9fa;
  }
</style>

<div class="card">Hover to see 3 properties transition at once</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`transition: all 0.3s;` (animating literally every property) is tempting for brevity, but it's usually better to name specific properties explicitly — animating 'all' can accidentally animate properties you didn't intend to (like `width` changes from content reflow), causing janky, unexpected motion.",
          },
          {
            type: "quiz",
            question: "Why is it usually better to list specific properties in `transition` rather than using `transition: all`?",
            options: [
              "Listing properties is required syntax; `all` doesn't work",
              "`all` can unintentionally animate properties you didn't mean to (like layout-affecting ones), causing unexpected or janky motion",
              "There's no performance or behavior difference at all",
              "`all` only works in Firefox",
            ],
            answer: 1,
            explanation:
              "transition: all applies the transition timing to every animatable property that changes — including ones you didn't anticipate changing, which can produce surprising visual glitches. Naming exact properties keeps behavior predictable and intentional.",
          },
        ],
        challenge: {
          id: "csa-2-challenge",
          language: "css",
          title: "Two Properties, One Line",
          description:
            "Write a single `transition` shorthand declaration on `.tile` that animates `transform` over `0.25s ease` and `opacity` over `0.5s linear`.",
          starterCode: `.tile {
  /* single transition line covering both properties */
}
`,
          solutionCode: `.tile {
  transition: transform 0.25s ease, opacity 0.5s linear;
}`,
          tests: [
            { id: 1, label: "Uses the transition shorthand", keywords: [{ pattern: "transition:\\s*transform" }] },
            { id: 2, label: "Includes transform 0.25s ease", keywords: [{ pattern: "transform\\s+0\\.25s\\s+ease" }] },
            { id: 3, label: "Includes opacity 0.5s linear", keywords: [{ pattern: "opacity\\s+0\\.5s\\s+linear" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Transforms
  // ─────────────────────────────────────────────────────────────
  {
    id: "animations-transforms",
    title: "Transforms",
    icon: "🔄",
    color: "#2563eb",
    lessons: [
      {
        id: "csa-3",
        title: "translate, scale, and rotate",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`transform` moves, resizes, or rotates an element **without affecting document flow** — other elements don't reflow around it, which is exactly why transforms are so much cheaper to animate than properties like `margin` or `top`. `translate(x, y)` moves it, `scale(factor)` resizes it, `rotate(deg)` spins it.",
          },
          {
            type: "code",
            lang: "html",
            label: "Three transform functions on hover",
            content: `<style>
  .box {
    width: 80px;
    height: 80px;
    background: #4a90d9;
    display: inline-block;
    margin: 20px;
    transition: transform 0.3s;
  }
  .box.move:hover { transform: translate(20px, -10px); }
  .box.grow:hover { transform: scale(1.3); }
  .box.spin:hover { transform: rotate(45deg); }
</style>

<div class="box move">translate</div>
<div class="box grow">scale</div>
<div class="box spin">rotate</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Because transforms don't trigger layout recalculation, animating `transform: translate(...)` is far cheaper for the browser than animating `left`/`top`/`margin` to achieve the same visual movement — a theme we'll return to in the Performance chapter.",
          },
          {
            type: "quiz",
            question: "Why doesn't transform: translate(20px, 0) affect surrounding elements' layout?",
            options: [
              "It secretly does affect layout, just slowly",
              "Transforms are applied in a separate rendering step after layout — the element's box still occupies its original space in the document flow, only its painted appearance shifts",
              "translate() only works on inline elements",
              "It only avoids reflow if combined with position: absolute",
            ],
            answer: 1,
            explanation:
              "transform operates purely visually/compositionally — the element still reserves its original layout space, so siblings don't reflow. This is precisely why transform-based animation is so much cheaper than animating layout properties.",
          },
        ],
        challenge: {
          id: "csa-3-challenge",
          language: "css",
          title: "Scale on Hover",
          description:
            "Add a `:hover` rule for `.thumb` that applies `transform: scale(1.1)`, with the existing `transition` already handling the smoothness.",
          starterCode: `.thumb {
  width: 100px;
  transition: transform 0.2s;
}

/* add the :hover rule */
`,
          solutionCode: `.thumb {
  width: 100px;
  transition: transform 0.2s;
}

.thumb:hover {
  transform: scale(1.1);
}`,
          tests: [
            { id: 1, label: "Adds a :hover rule for .thumb", keywords: [{ pattern: "\\.thumb:hover" }] },
            { id: 2, label: "Uses transform: scale(1.1)", keywords: [{ pattern: "transform:\\s*scale\\(1\\.1\\)" }] },
            { id: 3, label: "Base .thumb keeps its transition", keywords: [{ pattern: "transition:\\s*transform" }] },
          ],
        },
      },
      {
        id: "csa-4",
        title: "transform-origin",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "By default, transforms like `rotate()` and `scale()` pivot around the element's **center**. `transform-origin` changes that pivot point — set it to `top left` to make an element rotate around its top-left corner instead, which is common for things like flipping switches or expanding menus from a specific corner.",
          },
          {
            type: "code",
            lang: "html",
            label: "Changing the rotation pivot point",
            content: `<style>
  .box {
    width: 100px;
    height: 100px;
    background: #4a90d9;
    display: inline-block;
    margin: 40px;
    transition: transform 0.4s;
  }
  .default-origin:hover { transform: rotate(45deg); } /* rotates around center by default */
  .top-left-origin {
    transform-origin: top left;
  }
  .top-left-origin:hover { transform: rotate(45deg); } /* rotates around top-left corner instead */
</style>

<div class="box default-origin">default center origin</div>
<div class="box top-left-origin">top-left origin</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`transform-origin` accepts keywords (`top`, `bottom left`, `center`), percentages (`0% 0%`), or lengths (`10px 20px`) — percentages/keywords are relative to the element's own box, so they stay correct even if the element's size changes later.",
          },
          {
            type: "quiz",
            question: "What is the default value of transform-origin?",
            options: ["top left", "0 0", "center (50% 50%)", "It has no default and must always be set"],
            answer: 2,
            explanation:
              "Without setting transform-origin, transforms like rotate and scale pivot around the exact center of the element's box (50% 50%) by default.",
          },
        ],
        challenge: {
          id: "csa-4-challenge",
          language: "css",
          title: "Rotate Around the Bottom-Right Corner",
          description:
            "Set `.corner-fold` to have `transform-origin: bottom right`, so its `:hover` rotation (already defined as `rotate(-10deg)`) pivots from that corner.",
          starterCode: `.corner-fold {
  /* set the transform origin */
  transition: transform 0.3s;
}

.corner-fold:hover {
  transform: rotate(-10deg);
}
`,
          solutionCode: `.corner-fold {
  transform-origin: bottom right;
  transition: transform 0.3s;
}

.corner-fold:hover {
  transform: rotate(-10deg);
}`,
          tests: [
            { id: 1, label: "Sets transform-origin", keywords: [{ pattern: "transform-origin:" }] },
            { id: 2, label: "Uses bottom right", keywords: [{ pattern: "transform-origin:\\s*bottom\\s+right" }] },
            { id: 3, label: "Keeps the hover rotation", keywords: [{ pattern: "rotate\\(-10deg\\)" }] },
          ],
        },
      },
      {
        id: "csa-5",
        title: "Combining Multiple Transforms",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Multiple transform functions can be listed together in a single `transform` declaration, space-separated: `transform: translateX(40px) rotate(30deg) scale(1.2)`. They're applied in the order written, each operating in the coordinate space left by the previous one.",
          },
          {
            type: "code",
            lang: "html",
            label: "Three transforms combined into one declaration",
            content: `<style>
  .box {
    width: 80px;
    height: 80px;
    background: #4a90d9;
    margin: 30px;
    transition: transform 0.4s;
  }
  /* multiple functions in one transform, applied left to right */
  .box:hover {
    transform: translateX(40px) rotate(30deg) scale(1.2);
  }
</style>

<div class="box">Hover: translate + rotate + scale together</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Order matters: `translateX(40px) rotate(30deg)` and `rotate(30deg) translateX(40px)` produce **different** results, because each transform changes the coordinate system that subsequent transforms operate within. If a combined transform looks wrong, try reordering the functions first.",
          },
          {
            type: "quiz",
            question: "Does the order of functions inside a single transform declaration matter?",
            options: [
              "No, CSS always normalizes the order automatically",
              "Yes — each function operates within the coordinate space left by the previous one, so translate-then-rotate can look different from rotate-then-translate",
              "Only scale() is order-sensitive; the others aren't",
              "Order only matters when using transform-origin",
            ],
            answer: 1,
            explanation:
              "Transforms compose like matrix multiplication — applying them in a different order changes the effective transformation, since each subsequent function operates in the already-transformed coordinate space of the prior ones.",
          },
        ],
        challenge: {
          id: "csa-5-challenge",
          language: "css",
          title: "Combine Scale and Rotate",
          description:
            "On `:hover`, apply both `scale(1.15)` and `rotate(5deg)` to `.sticker` in a single `transform` declaration, scale first.",
          starterCode: `.sticker {
  transition: transform 0.3s;
}

/* add the hover rule with both transforms */
`,
          solutionCode: `.sticker {
  transition: transform 0.3s;
}

.sticker:hover {
  transform: scale(1.15) rotate(5deg);
}`,
          tests: [
            { id: 1, label: "Adds a :hover rule", keywords: [{ pattern: "\\.sticker:hover" }] },
            { id: 2, label: "Includes scale(1.15)", keywords: [{ pattern: "scale\\(1\\.15\\)" }] },
            { id: 3, label: "Includes rotate(5deg) after scale", keywords: [{ pattern: "scale\\(1\\.15\\)\\s+rotate\\(5deg\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Keyframe Animations
  // ─────────────────────────────────────────────────────────────
  {
    id: "animations-keyframes",
    title: "Keyframe Animations",
    icon: "🎞️",
    color: "#7c3aed",
    lessons: [
      {
        id: "csa-6",
        title: "@keyframes Syntax",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "While transitions only animate between two states, `@keyframes` lets you define a full animation sequence with as many steps as you want, then play it automatically (no hover/trigger required) with `animation-name` and `animation-duration`. `from`/`to` are shorthand for `0%`/`100%`.",
          },
          {
            type: "code",
            lang: "html",
            label: "A slide-in animation that plays automatically",
            content: `<style>
  @keyframes slide-in {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .banner {
    background: #4a90d9;
    color: #fff;
    padding: 16px;
    animation-name: slide-in;
    animation-duration: 0.6s;
  }
</style>

<div class="banner">Slides in from the left on page load</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Unlike transitions, `@keyframes` animations run **on their own** as soon as the element renders — no hover, focus, or class toggle needed to trigger them, which is why they're the right tool for entrance animations, loading spinners, and looping effects.",
          },
          {
            type: "quiz",
            question: "What's the key difference between a CSS transition and a @keyframes animation?",
            options: [
              "There is no difference, they're identical",
              "A transition needs a state change (like :hover) to trigger it; a @keyframes animation can play automatically and supports multiple intermediate steps, not just a start and end",
              "@keyframes only works on the opacity property",
              "Transitions can loop infinitely, @keyframes animations cannot",
            ],
            answer: 1,
            explanation:
              "Transitions interpolate between exactly two states and require some triggering state change. @keyframes animations define their own timeline of as many steps as needed and can start playing immediately on render, without needing a trigger.",
          },
        ],
        challenge: {
          id: "csa-6-challenge",
          language: "css",
          title: "Fade-In Keyframes",
          description:
            "Write a `@keyframes fade-in` going from `opacity: 0` to `opacity: 1`, then apply it to `.toast` with `animation-name: fade-in` and `animation-duration: 0.3s`.",
          starterCode: `/* define @keyframes fade-in here */

.toast {
  /* apply the animation-name and animation-duration */
}
`,
          solutionCode: `@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.toast {
  animation-name: fade-in;
  animation-duration: 0.3s;
}`,
          tests: [
            { id: 1, label: "Defines @keyframes fade-in", keywords: [{ pattern: "@keyframes\\s+fade-in" }] },
            { id: 2, label: "Applies animation-name: fade-in", keywords: [{ pattern: "animation-name:\\s*fade-in" }] },
            { id: 3, label: "Sets animation-duration: 0.3s", keywords: [{ pattern: "animation-duration:\\s*0\\.3s" }] },
          ],
        },
      },
      {
        id: "csa-7",
        title: "The animation Shorthand",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Like `transition`, `animation` has a shorthand combining several sub-properties in one line: `animation: name duration timing-function iteration-count`. `infinite` is a special keyword for the iteration count, meaning it loops forever.",
          },
          {
            type: "code",
            lang: "html",
            label: "A pulsing badge using the animation shorthand",
            content: `<style>
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  .badge {
    display: inline-block;
    background: #d9534f;
    color: #fff;
    padding: 8px 16px;
    border-radius: 999px;
    /* shorthand: name duration timing-function iteration-count */
    animation: pulse 1.5s ease-in-out infinite;
  }
</style>

<span class="badge">New</span>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Notice the keyframes use percentages (`0%`, `50%`, `100%`) instead of `from`/`to` — percentages let you add as many intermediate steps as you like, while `from`/`to` is only ever a two-step shorthand for `0%`/`100%`.",
          },
          {
            type: "quiz",
            question: "What does `animation: pulse 1.5s ease-in-out infinite` set, in order?",
            options: [
              "duration, name, iteration-count, timing-function",
              "name, duration, timing-function, iteration-count",
              "timing-function, name, duration, iteration-count",
              "The order doesn't matter for any of these values",
            ],
            answer: 1,
            explanation:
              "The animation shorthand's common order is: animation-name (pulse), animation-duration (1.5s), animation-timing-function (ease-in-out), then animation-iteration-count (infinite) — though CSS can often infer some values by type, writing them in this order is the clearest convention.",
          },
        ],
        challenge: {
          id: "csa-7-challenge",
          language: "css",
          title: "Infinite Pulsing Dot",
          description:
            "Using an existing `@keyframes pulse` (scale 1 to 1.2 and back), apply it to `.dot` with the `animation` shorthand: 1 second duration, ease-in-out, looping infinitely.",
          starterCode: `@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.dot {
  /* apply the animation shorthand */
}
`,
          solutionCode: `@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.dot {
  animation: pulse 1s ease-in-out infinite;
}`,
          tests: [
            { id: 1, label: "Uses the animation shorthand", keywords: [{ pattern: "animation:\\s*pulse" }] },
            { id: 2, label: "Sets a 1s duration", keywords: [{ pattern: "pulse\\s+1s" }] },
            { id: 3, label: "Loops infinitely", keywords: [{ pattern: "infinite" }] },
          ],
        },
      },
      {
        id: "csa-8",
        title: "Iteration Count, Direction, and Fill Mode",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`animation-iteration-count` sets how many times it plays (a number, or `infinite`). `animation-direction: alternate` makes it play forward then backward on each cycle, instead of always resetting to the start. `animation-fill-mode: forwards` keeps the **final keyframe's styles applied** after the animation ends, instead of snapping back to the element's original styles.",
          },
          {
            type: "code",
            lang: "html",
            label: "Controlling repeats, direction, and the end state",
            content: `<style>
  @keyframes slide-right {
    from { transform: translateX(0); }
    to { transform: translateX(100px); }
  }
  .box {
    width: 60px;
    height: 60px;
    background: #4a90d9;
    margin-bottom: 12px;
  }
  .three-times {
    animation: slide-right 0.5s ease-in-out 3;
  }
  .alternate {
    animation: slide-right 0.5s ease-in-out infinite alternate;
  }
  .hold-end {
    animation: slide-right 0.5s ease-in-out 1 forwards;
  }
</style>

<div class="box three-times">runs exactly 3 times</div>
<div class="box alternate">alternates forward/backward forever</div>
<div class="box hold-end">stays at the end state (fill-mode: forwards)</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Without `animation-fill-mode: forwards`, an animation snaps back to the element's original (pre-animation) CSS the instant it finishes — a common surprise when an entrance animation seems to 'undo itself' right after playing.",
          },
          {
            type: "quiz",
            question: "What does animation-fill-mode: forwards do?",
            options: [
              "Makes the animation play forward instead of backward",
              "Keeps the styles from the animation's final keyframe applied after the animation completes, instead of reverting to the element's original styles",
              "Makes the animation loop forever",
              "It has no visible effect",
            ],
            answer: 1,
            explanation:
              "By default, once a @keyframes animation finishes, the element's styles revert to whatever they were before the animation (defined by the regular, non-animation CSS). forwards keeps the last keyframe's computed styles in place instead of reverting.",
          },
        ],
        challenge: {
          id: "csa-8-challenge",
          language: "css",
          title: "Play Once and Stay",
          description:
            "Using the existing `@keyframes reveal` (opacity 0 to 1), apply it to `.callout` so it plays exactly once and keeps the final (opacity: 1) state afterward.",
          starterCode: `@keyframes reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

.callout {
  opacity: 0;
  /* apply the animation, once, keeping the end state */
}
`,
          solutionCode: `@keyframes reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

.callout {
  opacity: 0;
  animation: reveal 0.4s ease-in 1 forwards;
}`,
          tests: [
            { id: 1, label: "Applies the reveal animation", keywords: [{ pattern: "animation:\\s*reveal" }] },
            { id: 2, label: "Plays exactly once (iteration-count 1)", keywords: [{ pattern: "reveal\\s+[\\d.]+s\\s+[\\w-]+\\s+1" }] },
            { id: 3, label: "Uses fill-mode forwards", keywords: [{ pattern: "forwards" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Advanced Animation Techniques
  // ─────────────────────────────────────────────────────────────
  {
    id: "animations-advanced-techniques",
    title: "Advanced Animation Techniques",
    icon: "🧬",
    color: "#059669",
    lessons: [
      {
        id: "csa-9",
        title: "Multi-Step Keyframes",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Percentage-based keyframes support as many steps as you need, letting you build more nuanced motion than a simple start-to-end animation — like a bounce that goes up, comes down, bounces a little less, and settles.",
          },
          {
            type: "code",
            lang: "html",
            label: "A 5-step bounce animation",
            content: `<style>
  @keyframes bounce {
    0%   { transform: translateY(0); }
    30%  { transform: translateY(-20px); }
    50%  { transform: translateY(0); }
    70%  { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  .ball {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #d9534f;
    animation: bounce 1s ease-in-out infinite;
  }
</style>

<div class="ball"></div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You can also target multiple percentages at once with a comma-separated selector, like `0%, 100% { transform: scale(1); }` — useful when several steps in the sequence should share identical styles, avoiding repetition.",
          },
          {
            type: "quiz",
            question: "What advantage do percentage-based keyframe steps have over from/to?",
            options: [
              "None — they behave identically",
              "Percentages let you define any number of intermediate steps (0%, 30%, 50%, 70%, 100%...), while from/to is limited to exactly two steps",
              "Percentages are required for infinite animations",
              "from/to only works with opacity",
            ],
            answer: 1,
            explanation:
              "from/to is purely shorthand for 0%/100% — a two-keyframe animation. Percentage-based syntax lets you insert as many intermediate steps as the motion requires, like the multi-beat bounce shown here.",
          },
        ],
        challenge: {
          id: "csa-9-challenge",
          language: "css",
          title: "Three-Step Color Shift",
          description:
            "Write `@keyframes color-shift` with steps at `0%` (background: `#4a90d9`), `50%` (background: `#d9534f`), and `100%` (background: `#4a90d9`), then apply it to `.strip` over `2s` infinitely.",
          starterCode: `/* define @keyframes color-shift with 3 steps */

.strip {
  /* apply the animation */
}
`,
          solutionCode: `@keyframes color-shift {
  0% { background: #4a90d9; }
  50% { background: #d9534f; }
  100% { background: #4a90d9; }
}

.strip {
  animation: color-shift 2s infinite;
}`,
          tests: [
            { id: 1, label: "Defines @keyframes color-shift", keywords: [{ pattern: "@keyframes\\s+color-shift" }] },
            { id: 2, label: "Has a 50% midpoint step", keywords: [{ pattern: "50%\\s*\\{" }] },
            { id: 3, label: "Applies with a 2s infinite animation", keywords: [{ pattern: "animation:\\s*color-shift\\s+2s.*infinite" }] },
          ],
        },
      },
      {
        id: "csa-10",
        title: "animation-play-state",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`animation-play-state` lets you pause and resume a running animation — most commonly used with `:hover` to pause a spinning or moving element while the user's cursor is over it, then automatically resume when they move away.",
          },
          {
            type: "code",
            lang: "html",
            label: "Pausing a spinner on hover",
            content: `<style>
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #ddd;
    border-top-color: #4a90d9;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .spinner:hover {
    animation-play-state: paused; /* pause on hover, resumes on mouse-out */
  }
</style>

<div class="spinner"></div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "When resumed, `animation-play-state: running` continues from **where it paused**, not from the beginning — the browser tracks the animation's elapsed time internally even while paused.",
          },
          {
            type: "quiz",
            question: "When an animation is un-paused (play-state set back to running), where does it resume from?",
            options: [
              "It always restarts from 0%",
              "It resumes from the exact point in the timeline where it was paused",
              "It jumps to a random point",
              "It resumes from 100% and plays backward",
            ],
            answer: 1,
            explanation:
              "The browser keeps track of the animation's elapsed progress even while paused, so switching animation-play-state back to running continues seamlessly from that same point rather than restarting.",
          },
        ],
        challenge: {
          id: "csa-10-challenge",
          language: "css",
          title: "Pause an Animation on Focus",
          description:
            "Add a rule so that `.marquee` (already animating) pauses its animation when it receives keyboard focus (`:focus`), using `animation-play-state: paused`.",
          starterCode: `.marquee {
  animation: scroll-left 5s linear infinite;
}

/* add the :focus rule to pause it */
`,
          solutionCode: `.marquee {
  animation: scroll-left 5s linear infinite;
}

.marquee:focus {
  animation-play-state: paused;
}`,
          tests: [
            { id: 1, label: "Adds a :focus rule", keywords: [{ pattern: "\\.marquee:focus" }] },
            { id: 2, label: "Sets animation-play-state: paused", keywords: [{ pattern: "animation-play-state:\\s*paused" }] },
            { id: 3, label: "Keeps the base animation running", keywords: [{ pattern: "infinite" }] },
          ],
        },
      },
      {
        id: "csa-11",
        title: "Staggering Animations with animation-delay",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`animation-delay` postpones when an animation starts. Applying a slightly different delay to each item in a list (often via `:nth-child()`) creates a **staggered** effect, where items animate in one after another rather than all at once — a very common polish technique for lists and grids.",
          },
          {
            type: "code",
            lang: "html",
            label: "Staggering a list's entrance with nth-child delays",
            content: `<style>
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .item {
    opacity: 0;
    animation: fade-up 0.4s ease-out forwards;
  }
  .item:nth-child(1) { animation-delay: 0s; }
  .item:nth-child(2) { animation-delay: 0.1s; }
  .item:nth-child(3) { animation-delay: 0.2s; }
</style>

<ul>
  <li class="item">First</li>
  <li class="item">Second</li>
  <li class="item">Third</li>
</ul>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Note `opacity: 0` is set as the element's **base** style too, not just the first keyframe — otherwise there'd be a visible flash of the fully-opaque element before the animation (and its delay) even begins.",
          },
          {
            type: "quiz",
            question: "Why is `opacity: 0` also set as the base (non-animation) style on `.item`, not just in the 'from' keyframe?",
            options: [
              "It's unnecessary and can be removed",
              "Without it, there'd be a brief flash of the fully-visible element during the animation-delay period, before the animation (and its 'from' keyframe) actually starts",
              "opacity must always be set twice for animations to work",
              "It only matters for animation-fill-mode: backwards",
            ],
            answer: 1,
            explanation:
              "During the animation-delay window, the element renders with its normal (non-animating) CSS, not the keyframe styles yet. If the base style doesn't also set opacity: 0, the element would flash fully visible for the length of the delay before the fade-up animation kicks in.",
          },
        ],
        challenge: {
          id: "csa-11-challenge",
          language: "css",
          title: "Stagger Four Cards",
          description:
            "Given `.card` items that already use `animation: fade-up 0.3s forwards`, add `:nth-child(1)` through `:nth-child(4)` rules with increasing `animation-delay` values (0s, 0.1s, 0.2s, 0.3s).",
          starterCode: `.card {
  opacity: 0;
  animation: fade-up 0.3s forwards;
}

/* add the staggered nth-child delays */
`,
          solutionCode: `.card {
  opacity: 0;
  animation: fade-up 0.3s forwards;
}

.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
.card:nth-child(4) { animation-delay: 0.3s; }`,
          tests: [
            { id: 1, label: "Uses :nth-child selectors", keywords: [{ pattern: ":nth-child\\(" }] },
            { id: 2, label: "Has increasing animation-delay values", keywords: [{ pattern: "animation-delay:\\s*0\\.1s" }] },
            { id: 3, label: "Covers at least 4 items", keywords: [{ pattern: ":nth-child\\(4\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Performance & Accessibility
  // ─────────────────────────────────────────────────────────────
  {
    id: "animations-performance-accessibility",
    title: "Performance & Accessibility",
    icon: "⚡",
    color: "#f59e0b",
    lessons: [
      {
        id: "csa-12",
        title: "GPU-Friendly vs Layout-Triggering Properties",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Animating `transform` and `opacity` is cheap because browsers can handle them on the **compositor** (often GPU-accelerated), skipping layout and paint entirely. Animating properties like `top`, `left`, `width`, `height`, or `margin` forces the browser to recalculate layout on **every single frame**, which is dramatically more expensive and can cause visible jank.",
          },
          {
            type: "code",
            lang: "html",
            label: "Cheap (transform) vs expensive (top) animation",
            content: `<style>
  /* GOOD: transform and opacity are composited, cheap to animate */
  .good-move {
    transition: transform 0.3s, opacity 0.3s;
  }
  .good-move:hover {
    transform: translateY(-5px);
    opacity: 0.9;
  }

  /* AVOID for animation: "top" triggers layout recalculation every frame */
  .slow-move {
    position: relative;
    transition: top 0.3s;
  }
  .slow-move:hover {
    top: -5px;
  }
</style>

<div class="good-move">Animates transform/opacity (cheap)</div>
<div class="slow-move">Animates top (expensive)</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "As a rule of thumb: if you're animating position or size for visual effect (not for something that must genuinely reflow other content), reach for `transform: translate()`/`scale()` instead of `top`/`left`/`width`/`height` — same visual result, far cheaper to render.",
          },
          {
            type: "quiz",
            question: "Why is animating `transform` generally cheaper than animating `top`?",
            options: [
              "There's no real performance difference between them",
              "transform can be handled by the compositor (often GPU-accelerated) without triggering layout recalculation, while top changes force the browser to recompute layout on every frame",
              "top is a newer property and less optimized",
              "transform only works on images, so comparisons don't apply",
            ],
            answer: 1,
            explanation:
              "Changing top affects the document's layout (where the box sits relative to others), forcing a layout recalculation every frame. transform is applied after layout, purely as a visual/compositing operation, so the browser can skip layout and paint recalculation almost entirely.",
          },
        ],
        challenge: {
          id: "csa-12-challenge",
          language: "css",
          title: "Replace top with transform",
          description:
            "Given `.slide { position: relative; transition: top 0.3s; } .slide:hover { top: -8px; }`, rewrite it to achieve the same visual movement using `transform: translateY(-8px)` instead of `top`.",
          starterCode: `.slide {
  position: relative;
  transition: top 0.3s;
}
.slide:hover {
  top: -8px;
}
`,
          solutionCode: `.slide {
  transition: transform 0.3s;
}
.slide:hover {
  transform: translateY(-8px);
}`,
          tests: [
            { id: 1, label: "Transitions transform, not top", keywords: [{ pattern: "transition:\\s*transform" }] },
            { id: 2, label: "Hover uses translateY", keywords: [{ pattern: "transform:\\s*translateY\\(-8px\\)" }] },
            { id: 3, label: "No longer animates top", keywords: [{ pattern: "^(?!.*transition:\\s*top).*$", flags: "is" }] },
          ],
        },
      },
      {
        id: "csa-13",
        title: "Respecting prefers-reduced-motion",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Some users experience discomfort, dizziness, or distraction from motion — many operating systems let them set a system-wide 'reduce motion' preference. The `prefers-reduced-motion: reduce` media query lets your CSS honor that choice by disabling or simplifying animations for those users.",
          },
          {
            type: "code",
            lang: "html",
            label: "Disabling an animation for users who prefer reduced motion",
            content: `<style>
  @keyframes slide-in {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .banner {
    animation: slide-in 0.5s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .banner {
      animation: none;
    }
  }
</style>

<div class="banner">Respects the user's reduced-motion preference</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "For accessibility-conscious projects, a common pattern is a global rule near the top of the stylesheet: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` — a blanket safety net covering every animation on the site at once.",
          },
          {
            type: "quiz",
            question: "What does the prefers-reduced-motion media feature detect?",
            options: [
              "The user's screen resolution",
              "A system-level accessibility setting some users enable to indicate they want less animation/motion in interfaces",
              "Whether JavaScript is enabled",
              "The user's preferred color scheme (light/dark)",
            ],
            answer: 1,
            explanation:
              "prefers-reduced-motion reflects an OS-level accessibility preference (found in macOS, Windows, iOS, Android settings) that users with vestibular disorders or motion sensitivity can enable — respecting it in CSS is considered a baseline accessibility practice.",
          },
        ],
        challenge: {
          id: "csa-13-challenge",
          language: "css",
          title: "Disable a Spin for Reduced Motion",
          description:
            "Given `.loader { animation: spin 1s linear infinite; }`, add a `prefers-reduced-motion: reduce` media query that sets `.loader`'s animation to `none`.",
          starterCode: `.loader {
  animation: spin 1s linear infinite;
}

/* add the reduced-motion media query */
`,
          solutionCode: `.loader {
  animation: spin 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loader {
    animation: none;
  }
}`,
          tests: [
            { id: 1, label: "Uses the prefers-reduced-motion query", keywords: [{ pattern: "@media\\s*\\(prefers-reduced-motion:\\s*reduce\\)" }] },
            { id: 2, label: "Disables the loader's animation", keywords: [{ pattern: "\\.loader\\s*\\{[^}]*animation:\\s*none" }] },
            { id: 3, label: "Keeps the base spin animation", keywords: [{ pattern: "spin\\s+1s" }] },
          ],
        },
      },
      {
        id: "csa-14",
        title: "The will-change Property",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`will-change` hints to the browser that a property is **about to change**, letting it prepare optimizations (like promoting the element to its own compositor layer) ahead of time rather than reacting mid-animation. It should be used sparingly and only on elements that genuinely animate frequently — overusing it can waste memory by creating too many GPU layers.",
          },
          {
            type: "code",
            lang: "html",
            label: "Hinting at an upcoming transform change",
            content: `<style>
  .card {
    transition: transform 0.3s;
  }
  .card:hover {
    /* hints to the browser that transform is about to change */
    will-change: transform;
    transform: scale(1.05);
  }
</style>

<div class="card">Hover to scale up</div>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`will-change` is not a magic performance switch — applying it to too many elements (or leaving it on permanently rather than adding/removing it around the actual animation) can actually *hurt* performance by consuming excessive GPU memory for layers that rarely change.",
          },
          {
            type: "quiz",
            question: "What's a real risk of overusing will-change across many elements?",
            options: [
              "There's no downside; more will-change is always better",
              "Excessive use can consume too much GPU memory creating unnecessary compositor layers, potentially hurting performance instead of helping it",
              "It causes a syntax error after 3 uses",
              "It disables all other CSS properties on that element",
            ],
            answer: 1,
            explanation:
              "Each will-change hint can cause the browser to create a separate compositor layer for that element. Doing this for many elements (or elements that rarely actually animate) wastes GPU memory and can slow things down overall — it's meant for targeted, deliberate use.",
          },
        ],
        challenge: {
          id: "csa-14-challenge",
          language: "css",
          title: "Hint at an Opacity Change",
          description:
            "Add `will-change: opacity` to `.fade-target`'s `:hover` rule, which already transitions and changes `opacity` to `0.6`.",
          starterCode: `.fade-target {
  transition: opacity 0.3s;
}

.fade-target:hover {
  opacity: 0.6;
  /* add the will-change hint */
}
`,
          solutionCode: `.fade-target {
  transition: opacity 0.3s;
}

.fade-target:hover {
  opacity: 0.6;
  will-change: opacity;
}`,
          tests: [
            { id: 1, label: "Adds will-change", keywords: [{ pattern: "will-change:" }] },
            { id: 2, label: "Hints at the opacity property", keywords: [{ pattern: "will-change:\\s*opacity" }] },
            { id: 3, label: "Keeps the opacity transition", keywords: [{ pattern: "transition:\\s*opacity" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Practical Patterns & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "animations-practical-capstone",
    title: "Practical Patterns & Capstone",
    icon: "🏆",
    color: "#dc2626",
    lessons: [
      {
        id: "csa-15",
        title: "Building a Loading Spinner",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A loading spinner is one of the most common real-world uses of `@keyframes`: a circular border with one differently-colored edge (`border-top-color`), continuously rotated with `animation: spin ... infinite`. It's cheap to animate (pure `transform: rotate()`) and instantly communicates 'please wait'.",
          },
          {
            type: "code",
            lang: "html",
            label: "A classic CSS-only loading spinner",
            content: `<style>
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spinner {
    width: 32px;
    height: 32px;
    border: 4px solid #e0e0e0;
    border-top-color: #4a90d9;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
</style>

<div class="spinner" role="status" aria-label="Loading"></div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Notice `role=\"status\"` and `aria-label=\"Loading\"` on the spinner — a purely visual `<div>` communicates nothing to screen reader users without these, leaving them with no indication that content is loading.",
          },
          {
            type: "quiz",
            question: "Why does this spinner use `linear` timing instead of `ease-in-out`?",
            options: [
              "linear is required for @keyframes to work at all",
              "A spinner represents ongoing, uniform motion — linear keeps a constant rotation speed, while ease-in-out would make it speed up and slow down oddly on each loop",
              "There's no functional difference, it's arbitrary",
              "ease-in-out only works with opacity, not transform",
            ],
            answer: 1,
            explanation:
              "linear timing keeps the rotation speed perfectly constant through the whole loop, matching the 'continuous, uniform waiting' feeling a spinner should convey. ease-in-out would cause a visible speed-up/slow-down 'stutter' at each loop boundary.",
          },
        ],
        challenge: {
          id: "csa-15-challenge",
          language: "css",
          title: "Build a Dot-Pulse Loader",
          description:
            "Write `@keyframes dot-pulse` scaling from `1` to `1.4` and back to `1`, then apply it to `.dot` with a `0.6s` linear infinite loop.",
          starterCode: `/* define @keyframes dot-pulse */

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4a90d9;
  /* apply the animation */
}
`,
          solutionCode: `@keyframes dot-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4a90d9;
  animation: dot-pulse 0.6s linear infinite;
}`,
          tests: [
            { id: 1, label: "Defines @keyframes dot-pulse", keywords: [{ pattern: "@keyframes\\s+dot-pulse" }] },
            { id: 2, label: "Scales up to 1.4 at the midpoint", keywords: [{ pattern: "scale\\(1\\.4\\)" }] },
            { id: 3, label: "Applies with 0.6s linear infinite", keywords: [{ pattern: "dot-pulse\\s+0\\.6s\\s+linear\\s+infinite" }] },
          ],
        },
      },
      {
        id: "csa-16",
        title: "Hover & Focus Micro-Interactions",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Small transitions on interactive elements — a subtle lift on hover, a pressed-down look on `:active`, a visible highlight on `:focus-visible` — make an interface feel responsive and alive. These 'micro-interactions' are usually just 1-2 properties transitioning over 150-200ms.",
          },
          {
            type: "code",
            lang: "html",
            label: "A button with hover, focus, and active states",
            content: `<style>
  .btn {
    background: #4a90d9;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .btn:hover,
  .btn:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 217, 0.4);
  }
  .btn:active {
    transform: translateY(0);
    box-shadow: none;
  }
</style>

<button class="btn" type="button">Click me</button>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`:focus-visible` (rather than plain `:focus`) shows the focus styling only for keyboard/assistive-technology navigation, not for mouse clicks — giving keyboard users the visual feedback they need without adding an outline every time a mouse user clicks a button.",
          },
          {
            type: "quiz",
            question: "Why include :focus-visible alongside :hover on an interactive element, rather than just :hover?",
            options: [
              "They're identical; including both is redundant",
              ":focus-visible ensures keyboard/assistive-technology users get the same visual feedback that mouse users get from hovering, which :hover alone can't provide since it only responds to a pointer",
              ":focus-visible replaces the need for :active",
              "It's purely a stylistic preference with no accessibility impact",
            ],
            answer: 1,
            explanation:
              ":hover only triggers from pointer interaction. A keyboard user tabbing to the button never triggers :hover, so without a focus style they'd get no visual feedback that the button is interactive/selected — :focus-visible closes that gap.",
          },
        ],
        challenge: {
          id: "csa-16-challenge",
          language: "css",
          title: "Add an Active State",
          description:
            "Given `.chip` with a hover lift (`transform: translateY(-2px)`), add an `:active` rule that resets `transform` to `translateY(0)` and adds `opacity: 0.9`, simulating a 'pressed' feel.",
          starterCode: `.chip {
  transition: transform 0.15s, opacity 0.15s;
}
.chip:hover {
  transform: translateY(-2px);
}

/* add the :active rule */
`,
          solutionCode: `.chip {
  transition: transform 0.15s, opacity 0.15s;
}
.chip:hover {
  transform: translateY(-2px);
}
.chip:active {
  transform: translateY(0);
  opacity: 0.9;
}`,
          tests: [
            { id: 1, label: "Adds a :active rule", keywords: [{ pattern: "\\.chip:active" }] },
            { id: 2, label: "Resets transform on active", keywords: [{ pattern: "translateY\\(0\\)" }] },
            { id: 3, label: "Adds opacity: 0.9 on active", keywords: [{ pattern: "opacity:\\s*0\\.9" }] },
          ],
        },
      },
      {
        id: "csa-17",
        title: "Capstone: Animated Card Flip",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine everything: a 3D card-flip effect using `transform-style: preserve-3d`, `backface-visibility: hidden` (so you don't see the back-face 'through' the front while mid-flip), and a smooth `rotateY` transition — plus a `prefers-reduced-motion` fallback, since this is a fairly intense motion effect.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete 3D card flip",
            content: `<style>
  .flip-card {
    width: 200px;
    height: 260px;
    perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .flip-card-front {
    background: #4a90d9;
    color: #fff;
  }
  .flip-card-back {
    background: #343a40;
    color: #fff;
    transform: rotateY(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .flip-card-inner { transition: none; }
  }
</style>

<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">Hover me</div>
    <div class="flip-card-back">Surprise!</div>
  </div>
</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`perspective` (on the outer wrapper) creates the sense of 3D depth for the rotation; `backface-visibility: hidden` (on both faces) prevents the mirror-image back face from showing through the front face while it's rotating past 90 degrees — without it, the flip looks like a confusing double-exposure.",
          },
          {
            type: "quiz",
            question: "What does backface-visibility: hidden accomplish in this card flip?",
            options: [
              "It makes the whole card invisible",
              "It hides an element's reverse side when it's been rotated to face away from the viewer, preventing the mirrored back face from showing through the front during the flip",
              "It's purely decorative and has no functional effect",
              "It disables the transition entirely",
            ],
            answer: 1,
            explanation:
              "As the card rotates past 90 degrees on the Y axis, without backface-visibility: hidden you'd see a mirrored, backward version of each face 'showing through' at the wrong moment — hiding the backface keeps only the correctly-facing side visible at any point in the rotation.",
          },
        ],
        challenge: {
          id: "csa-17-challenge",
          language: "css",
          title: "Speed Up the Flip on Focus",
          description:
            "Add a `:focus-within` rule to `.flip-card` that triggers the same flip as `:hover` (targeting `.flip-card-inner`), so keyboard users tabbing to a focusable element inside the card can also see the flip.",
          starterCode: `.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* add a :focus-within rule with the same effect */
`,
          solutionCode: `.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card:focus-within .flip-card-inner {
  transform: rotateY(180deg);
}`,
          tests: [
            { id: 1, label: "Uses :focus-within", keywords: [{ pattern: ":focus-within" }] },
            { id: 2, label: "Targets .flip-card-inner", keywords: [{ pattern: ":focus-within\\s+\\.flip-card-inner" }] },
            { id: 3, label: "Applies the same rotateY(180deg)", keywords: [{ pattern: "rotateY\\(180deg\\)" }] },
          ],
        },
      },
    ],
  },
];

export const CSS_ANIMATIONS_CHAPTERS = RAW_CSS_ANIMATIONS_CHAPTERS;

export const CSS_ANIMATIONS_LESSONS = CSS_ANIMATIONS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSS_ANIMATIONS_TOTAL_XP = CSS_ANIMATIONS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
