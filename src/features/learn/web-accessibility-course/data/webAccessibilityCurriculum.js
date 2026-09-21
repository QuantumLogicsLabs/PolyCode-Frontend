// PolyCode — Web Accessibility (a11y) interactive course
// 4 chapters · 12 lessons
// Content follows WCAG 2.1/2.2 (W3C) guidance for semantics, keyboard access,
// ARIA, and color contrast.

const ACCENT = "#0d9488"; // accessibility teal

const RAW_WEB_ACCESSIBILITY_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Accessibility Foundations
  // ─────────────────────────────────────────────────────────────
  {
    id: "a11y-foundations",
    title: "Accessibility Foundations",
    icon: "♿",
    color: ACCENT,
    lessons: [
      {
        id: "a11y-0",
        title: "Why Accessibility Matters",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Web accessibility (a11y) means building sites that people with disabilities — visual, auditory, motor, or cognitive — can actually use. The **Web Content Accessibility Guidelines (WCAG)** organize this work around four principles, remembered as **POUR**: Perceivable, Operable, Understandable, and Robust.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Accessibility isn't a niche feature — it benefits everyone. Captions help in noisy rooms, good contrast helps in bright sunlight, and keyboard support helps power users move faster.",
          },
          {
            type: "quiz",
            question: "What does the 'P' in the WCAG POUR principles stand for?",
            options: ["Portable", "Perceivable", "Progressive", "Practical"],
            answer: 1,
            explanation:
              "POUR stands for Perceivable, Operable, Understandable, and Robust — the four core principles WCAG is organized around.",
          },
        ],
        challenge: {
          id: "a11y-0-challenge",
          language: "html",
          title: "Add a Language Attribute",
          description:
            "Screen readers use `lang` to choose the right pronunciation rules. Add `lang=\"en\"` to the `<html>` tag below.",
          starterCode: `<html>
  <head><title>My Page</title></head>
  <body>Hello world</body>
</html>`,
          solutionCode: `<html lang="en">
  <head><title>My Page</title></head>
  <body>Hello world</body>
</html>`,
          tests: [
            { id: 1, label: "html tag has lang attribute", keywords: [{ pattern: "<html[^>]*lang=" }] },
            { id: 2, label: "lang is set to \"en\"", keywords: [{ pattern: "lang=\"en\"" }] },
          ],
        },
      },
      {
        id: "a11y-1",
        title: "Semantic HTML as the Accessibility Foundation",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Semantic elements like `<nav>`, `<main>`, `<button>`, and `<header>` come with built-in accessibility behavior — a `<button>` is automatically keyboard-focusable and announced as 'button' by screen readers. A `<div onclick=...>` gets none of that for free.",
          },
          {
            type: "code",
            lang: "html",
            label: "Semantic vs. non-semantic markup",
            content: `<!-- Screen readers announce this as a button, focusable by default -->
<button type="button">Submit</button>

<!-- This div needs manual role, tabindex, and key handling to match -->
<div class="btn-look" onclick="submit()">Submit</div>`,
          },
          {
            type: "quiz",
            question: "Why is <button> preferred over a clickable <div> for accessibility?",
            options: [
              "It renders faster",
              "It's automatically keyboard-focusable and announced correctly by screen readers, with no extra code",
              "It looks better by default",
              "There is no real difference",
            ],
            answer: 1,
            explanation:
              "Native interactive elements ship with correct keyboard behavior and semantics for free; recreating that on a <div> requires manual role, tabindex, and keydown handling — and it's easy to miss a case.",
          },
        ],
        challenge: {
          id: "a11y-1-challenge",
          language: "html",
          title: "Replace a Div with a Real Button",
          description:
            "Convert the clickable `<div>` into a real `<button>` element so it's keyboard-accessible by default.",
          starterCode: `<div class="btn-look" onclick="submitForm()">Submit</div>`,
          solutionCode: `<button type="button" class="btn-look" onclick="submitForm()">Submit</button>`,
          tests: [
            { id: 1, label: "Uses a <button> element", keywords: [{ pattern: "<button" }] },
            { id: 2, label: "Keeps the onclick handler", keywords: [{ pattern: "onclick=\"submitForm\\(\\)\"" }] },
          ],
        },
      },
      {
        id: "a11y-2",
        title: "Alt Text for Images",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Every meaningful `<img>` needs an `alt` attribute describing what it conveys — screen readers read it aloud, and browsers show it if the image fails to load. Purely decorative images (a background flourish that adds no information) should use `alt=\"\"` so screen readers skip them instead of reading a distracting filename.",
          },
          {
            type: "code",
            lang: "html",
            label: "Meaningful vs. decorative images",
            content: `<!-- Meaningful: describes the content -->
<img src="chart.png" alt="Bar chart showing sales rising 20% in Q3" />

<!-- Decorative: empty alt so screen readers skip it -->
<img src="divider-swirl.png" alt="" />`,
          },
          {
            type: "callout",
            variant: "warn",
            content:
              "Avoid writing alt text like \"image123.jpg\" or \"picture of a thing\" — it must describe what the image communicates, not just that it exists.",
          },
          {
            type: "quiz",
            question: "What should alt=\"\" (empty) be used for?",
            options: [
              "Every image, always",
              "Purely decorative images that add no information",
              "Images that failed to load",
              "It should never be empty",
            ],
            answer: 1,
            explanation:
              "An empty alt tells assistive technology to skip the image entirely — appropriate only for purely decorative images, not meaningful content.",
          },
        ],
        challenge: {
          id: "a11y-2-challenge",
          language: "html",
          title: "Fix the Alt Text",
          description:
            "This product image has no alt text. Add a meaningful description.",
          starterCode: `<img src="red-sneaker.jpg">`,
          solutionCode: `<img src="red-sneaker.jpg" alt="Red running sneaker, side view">`,
          tests: [
            { id: 1, label: "Has an alt attribute", keywords: [{ pattern: "alt=\"[^\"]+\"" }] },
            { id: 2, label: "Alt text isn't empty or generic", keywords: [{ pattern: "alt=\"(?!\\s*\")(?!image)(?!picture)[^\"]{6,}\"" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Keyboard & Focus
  // ─────────────────────────────────────────────────────────────
  {
    id: "a11y-keyboard-focus",
    title: "Keyboard & Focus",
    icon: "⌨️",
    color: "#f59e0b",
    lessons: [
      {
        id: "a11y-3",
        title: "Keyboard Navigation & Tab Order",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Many people can't use a mouse — they navigate entirely with the Tab, Shift+Tab, Enter, and arrow keys. Every interactive control (links, buttons, form fields) must be reachable and operable this way. Tab order follows the DOM order of the HTML by default, which is usually correct if your markup reads in a logical sequence.",
          },
          {
            type: "callout",
            variant: "warn",
            content:
              "Avoid `tabindex` values greater than 0 — they force a custom tab order that's easy to get wrong and hard to maintain. Use `tabindex=\"0\"` to make a normally non-focusable element focusable, and `tabindex=\"-1\"` to remove something from the tab order while still allowing it to be focused programmatically.",
          },
          {
            type: "quiz",
            question: "What determines tab order by default, before any tabindex is added?",
            options: [
              "Alphabetical order of element IDs",
              "The order elements appear in the DOM/HTML",
              "CSS z-index",
              "Screen position, left to right",
            ],
            answer: 1,
            explanation:
              "Without a positive tabindex, the browser tabs through focusable elements in the order they appear in the document.",
          },
        ],
        challenge: {
          id: "a11y-3-challenge",
          language: "html",
          title: "Make a Custom Widget Focusable",
          description:
            "This custom dropdown trigger is a `<span>`, so it's not keyboard-reachable. Add `tabindex=\"0\"` to include it in the tab order.",
          starterCode: `<span class="dropdown-trigger" role="button">Options</span>`,
          solutionCode: `<span class="dropdown-trigger" role="button" tabindex="0">Options</span>`,
          tests: [
            { id: 1, label: "Adds tabindex=\"0\"", keywords: [{ pattern: "tabindex=\"0\"" }] },
            { id: 2, label: "Keeps role=\"button\"", keywords: [{ pattern: "role=\"button\"" }] },
          ],
        },
      },
      {
        id: "a11y-4",
        title: "Visible Focus Indicators",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "When you Tab to a control, the browser shows a focus ring so keyboard users know where they are. Removing it with `outline: none` and not replacing it with anything is one of the most common accessibility failures — it leaves keyboard users with no idea what's focused.",
          },
          {
            type: "code",
            lang: "html",
            label: "Replacing the default outline instead of removing it",
            content: `<style>
  /* Bad: removes focus visibility entirely */
  .btn:focus { outline: none; }

  /* Good: custom but still clearly visible */
  .btn:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
  }
</style>`,
          },
          {
            type: "quiz",
            question: "What's wrong with `.btn:focus { outline: none; }` on its own?",
            options: [
              "Nothing, it's a common performance optimization",
              "It removes the only visual indicator of keyboard focus, with nothing to replace it",
              "It breaks mouse clicks",
              "It only affects Safari",
            ],
            answer: 1,
            explanation:
              "Removing the outline without providing an equally visible replacement leaves keyboard-only users unable to tell which element is currently focused.",
          },
        ],
        challenge: {
          id: "a11y-4-challenge",
          language: "css",
          title: "Restore a Visible Focus Style",
          description:
            "This button removes its outline on focus without replacing it. Add a `:focus-visible` rule with a clearly visible outline.",
          starterCode: `.btn:focus {
  outline: none;
}`,
          solutionCode: `.btn:focus {
  outline: none;
}

.btn:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}`,
          tests: [
            { id: 1, label: "Adds a :focus-visible rule", keywords: [{ pattern: ":focus-visible" }] },
            { id: 2, label: "Sets a visible outline", keywords: [{ pattern: "outline:\\s*[1-9][^;]*solid" }] },
          ],
        },
      },
      {
        id: "a11y-5",
        title: "Skip Links",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Keyboard users tabbing through a page have to pass every navbar link before reaching the main content — on every single page. A **skip link** is a hidden link, the very first focusable element on the page, that jumps straight to `<main>` when activated.",
          },
          {
            type: "code",
            lang: "html",
            label: "A skip link, visible only when focused",
            content: `<a href="#main-content" class="skip-link">Skip to main content</a>

<nav>...many nav links...</nav>

<main id="main-content">
  <h1>Page content starts here</h1>
</main>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
  }
  .skip-link:focus {
    top: 0; /* becomes visible when tabbed to */
  }
</style>`,
          },
          {
            type: "quiz",
            question: "Why is a skip link normally hidden but shown on focus?",
            options: [
              "To save space in the layout for everyone",
              "So sighted keyboard users see it appear right when they need it, without cluttering the visual design for mouse users",
              "It's a decorative animation",
              "Screen readers require it to be hidden",
            ],
            answer: 1,
            explanation:
              "Skip links are only useful to people tabbing through the page, so they stay visually hidden until they receive keyboard focus — then they appear exactly when needed.",
          },
        ],
        challenge: {
          id: "a11y-5-challenge",
          language: "html",
          title: "Add a Skip Link",
          description:
            "Add a skip link before the nav that jumps to `#main-content` when clicked or activated.",
          starterCode: `<nav>...</nav>
<main id="main-content">
  <h1>Welcome</h1>
</main>`,
          solutionCode: `<a href="#main-content" class="skip-link">Skip to main content</a>
<nav>...</nav>
<main id="main-content">
  <h1>Welcome</h1>
</main>`,
          tests: [
            { id: 1, label: "Adds an <a> link before <nav>", keywords: [{ pattern: "<a[^>]*href=\"#main-content\"[\\s\\S]*<nav>" }] },
            { id: 2, label: "Links to #main-content", keywords: [{ pattern: "href=\"#main-content\"" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — ARIA & Screen Readers
  // ─────────────────────────────────────────────────────────────
  {
    id: "a11y-aria-screen-readers",
    title: "ARIA & Screen Readers",
    icon: "🔊",
    color: "#7c3aed",
    lessons: [
      {
        id: "a11y-6",
        title: "Introduction to ARIA Roles",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "ARIA (Accessible Rich Internet Applications) adds roles and states to elements that don't have native semantics — like a `<div>` acting as a tab panel. The first rule of ARIA: **don't use ARIA if a native HTML element already does the job**. Reach for `role` only when you're building a custom widget HTML has no equivalent for.",
          },
          {
            type: "code",
            lang: "html",
            label: "A custom tab widget needs ARIA roles",
            content: `<div role="tablist">
  <button role="tab" aria-selected="true">Profile</button>
  <button role="tab" aria-selected="false">Settings</button>
</div>
<div role="tabpanel">Profile content...</div>`,
          },
          {
            type: "quiz",
            question: "What is the 'first rule of ARIA'?",
            options: [
              "Always add as many ARIA attributes as possible",
              "Don't use ARIA if a native HTML element already provides the same behavior",
              "ARIA should only be used on <div> elements",
              "ARIA replaces the need for alt text",
            ],
            answer: 1,
            explanation:
              "Native elements come with built-in accessibility for free — ARIA is for filling gaps where no native element exists, not for replacing native semantics.",
          },
        ],
        challenge: {
          id: "a11y-6-challenge",
          language: "html",
          title: "Mark Up a Tab as Selected",
          description:
            "The 'Settings' tab is currently active, but `aria-selected` still says false on it. Fix it so the correct tab is marked selected.",
          starterCode: `<div role="tablist">
  <button role="tab" aria-selected="true">Profile</button>
  <button role="tab" aria-selected="false">Settings</button>
</div>`,
          solutionCode: `<div role="tablist">
  <button role="tab" aria-selected="false">Profile</button>
  <button role="tab" aria-selected="true">Settings</button>
</div>`,
          tests: [
            { id: 1, label: "Settings tab has aria-selected=\"true\"", keywords: [{ pattern: "Settings</button>" }, { pattern: "aria-selected=\"true\">Settings" }] },
            { id: 2, label: "Profile tab has aria-selected=\"false\"", keywords: [{ pattern: "aria-selected=\"false\">Profile" }] },
          ],
        },
      },
      {
        id: "a11y-7",
        title: "aria-label vs aria-labelledby vs aria-describedby",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`aria-label` gives an element an accessible name directly as a string — useful for an icon-only button. `aria-labelledby` points to the `id` of another element whose text becomes the name — useful when visible text elsewhere already labels something. `aria-describedby` adds extra descriptive detail, read *after* the name, without replacing it.",
          },
          {
            type: "code",
            lang: "html",
            label: "Icon-only button labeled for screen readers",
            content: `<button aria-label="Close dialog">
  <svg><!-- X icon, no visible text --></svg>
</button>

<h2 id="billing-heading">Billing Address</h2>
<section aria-labelledby="billing-heading">...</section>`,
          },
          {
            type: "quiz",
            question: "When is aria-label the right choice?",
            options: [
              "Always, on every element",
              "When an element (like an icon-only button) has no visible text to serve as its accessible name",
              "Only on <div> elements",
              "It should replace all alt text",
            ],
            answer: 1,
            explanation:
              "aria-label supplies an accessible name directly when there's no visible text to use — the classic case is an icon-only button.",
          },
        ],
        challenge: {
          id: "a11y-7-challenge",
          language: "html",
          title: "Label an Icon Button",
          description:
            "This icon-only search button has no accessible name. Add an `aria-label`.",
          starterCode: `<button class="icon-btn">
  <svg><!-- magnifying glass icon --></svg>
</button>`,
          solutionCode: `<button class="icon-btn" aria-label="Search">
  <svg><!-- magnifying glass icon --></svg>
</button>`,
          tests: [
            { id: 1, label: "Adds aria-label", keywords: [{ pattern: "aria-label=\"[^\"]+\"" }] },
          ],
        },
      },
      {
        id: "a11y-8",
        title: "Live Regions (aria-live)",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "When content updates dynamically — a form error, a 'message sent' toast, a cart counter — screen reader users won't notice unless it's inside an **aria-live region**. `aria-live=\"polite\"` announces the update after the user's current action finishes; `aria-live=\"assertive\"` interrupts immediately (reserve this for urgent, time-critical messages).",
          },
          {
            type: "code",
            lang: "html",
            label: "Announcing a form validation error",
            content: `<div aria-live="polite" class="form-status"></div>

<script>
  function showError(msg) {
    document.querySelector('.form-status').textContent = msg;
  }
</script>`,
          },
          {
            type: "quiz",
            question: "When should aria-live=\"assertive\" be used instead of \"polite\"?",
            options: [
              "For every dynamic update, to be safe",
              "Only for urgent, time-critical messages that should interrupt the user immediately",
              "Never — it's deprecated",
              "Only inside <table> elements",
            ],
            answer: 1,
            explanation:
              "assertive interrupts whatever the screen reader is currently saying, which is disruptive — reserve it for genuinely urgent alerts, and use polite for everything else.",
          },
        ],
        challenge: {
          id: "a11y-8-challenge",
          language: "html",
          title: "Announce a Cart Update Politely",
          description:
            "Add `aria-live=\"polite\"` to this cart-count element so screen reader users hear it change.",
          starterCode: `<span id="cart-count">0 items</span>`,
          solutionCode: `<span id="cart-count" aria-live="polite">0 items</span>`,
          tests: [
            { id: 1, label: "Adds aria-live=\"polite\"", keywords: [{ pattern: "aria-live=\"polite\"" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Color, Contrast & Forms
  // ─────────────────────────────────────────────────────────────
  {
    id: "a11y-color-forms",
    title: "Color, Contrast & Forms",
    icon: "🎨",
    color: "#dc2626",
    lessons: [
      {
        id: "a11y-9",
        title: "Color Contrast Requirements (WCAG AA/AAA)",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "WCAG 2.1 Level AA requires a contrast ratio of at least **4.5:1** for normal text and **3:1** for large text (18pt+, or 14pt+ bold) against its background. Level AAA raises that to 7:1 for normal text. Low-contrast gray-on-white text is a top accessibility failure across the web.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use a contrast checker (like the WebAIM Contrast Checker) during design, not after — it's far cheaper to pick an accessible palette upfront than to retrofit one.",
          },
          {
            type: "quiz",
            question: "What is the minimum WCAG AA contrast ratio for normal-sized body text?",
            options: ["1.5:1", "3:1", "4.5:1", "10:1"],
            answer: 2,
            explanation:
              "WCAG 2.1 Level AA requires at least 4.5:1 contrast for normal text; large text (18pt+/14pt bold) only needs 3:1.",
          },
        ],
        challenge: {
          id: "a11y-9-challenge",
          language: "css",
          title: "Fix Low-Contrast Text",
          description:
            "This light-gray text on white background fails contrast requirements. Change the color to a darker gray that passes.",
          starterCode: `.body-text {
  color: #cccccc;
  background: #ffffff;
}`,
          solutionCode: `.body-text {
  color: #595959;
  background: #ffffff;
}`,
          tests: [
            { id: 1, label: "Uses a darker text color (not #cccccc)", keywords: [{ pattern: "color:\\s*#(?!cccccc)" }] },
            { id: 2, label: "Keeps a white background", keywords: [{ pattern: "background:\\s*#ffffff" }] },
          ],
        },
      },
      {
        id: "a11y-10",
        title: "Don't Rely on Color Alone",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "WCAG's 'Use of Color' criterion says color can't be the *only* way to convey information — around 1 in 12 men have some form of color blindness. A red vs. green form field border is invisible to many users unless it's paired with an icon, text label, or pattern.",
          },
          {
            type: "code",
            lang: "html",
            label: "Pairing color with an icon and text",
            content: `<!-- Bad: color is the only signal -->
<input class="error-border" />

<!-- Good: icon + text message reinforce the color -->
<input class="error-border" aria-describedby="email-error" />
<p id="email-error">⚠ Please enter a valid email address</p>`,
          },
          {
            type: "quiz",
            question: "Why shouldn't a form only use a red border to indicate an error?",
            options: [
              "Red borders are against CSS best practices",
              "Users with color blindness may not perceive the red vs. normal border difference at all",
              "Red is a copyrighted color",
              "It slows down page rendering",
            ],
            answer: 1,
            explanation:
              "Color-only indicators are invisible or ambiguous to color-blind users — pairing color with text or an icon ensures everyone gets the same information.",
          },
        ],
        challenge: {
          id: "a11y-10-challenge",
          language: "html",
          title: "Add a Text Cue to an Error Field",
          description:
            "This error field only signals via a red border. Add a visible error message paired with it.",
          starterCode: `<input class="error-border" type="email" />`,
          solutionCode: `<input class="error-border" type="email" aria-describedby="email-error" />
<p id="email-error">Please enter a valid email address</p>`,
          tests: [
            { id: 1, label: "Adds a visible message referencing the error", keywords: [{ pattern: "<p[^>]*id=\"email-error\"" }] },
            { id: 2, label: "Links input to the message with aria-describedby", keywords: [{ pattern: "aria-describedby=\"email-error\"" }] },
          ],
        },
      },
      {
        id: "a11y-11",
        title: "Accessible Forms & Error Messages",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Every form input needs a `<label>` connected via `for`/`id` (or wrapping the input) — placeholder text is not a substitute, since it disappears once typing starts and many screen readers don't announce it reliably. Required fields should be marked with `required` and/or `aria-required=\"true\"`.",
          },
          {
            type: "code",
            lang: "html",
            label: "A properly labeled, required field",
            content: `<label for="email">Email address</label>
<input id="email" name="email" type="email" required />`,
          },
          {
            type: "quiz",
            question: "Why is placeholder text not a substitute for a <label>?",
            options: [
              "Placeholders are purely a visual style with no functional issue",
              "Placeholder text disappears once the user starts typing and isn't reliably announced by all screen readers",
              "Labels are required by law in every country",
              "Placeholders can't contain any text at all",
            ],
            answer: 1,
            explanation:
              "A placeholder vanishes as soon as text is entered, leaving no persistent cue for what the field is — and support for announcing it varies across assistive technology.",
          },
        ],
        challenge: {
          id: "a11y-11-challenge",
          language: "html",
          title: "Add a Real Label",
          description:
            "This input relies only on a placeholder. Add a proper `<label>` connected to it via `for`/`id`.",
          starterCode: `<input type="text" placeholder="Full name" />`,
          solutionCode: `<label for="full-name">Full name</label>
<input id="full-name" type="text" placeholder="Full name" />`,
          tests: [
            { id: 1, label: "Adds a <label> element", keywords: [{ pattern: "<label[^>]*for=\"[^\"]+\"" }] },
            { id: 2, label: "Input id matches the label's for", keywords: [{ pattern: "for=\"full-name\"[\\s\\S]*id=\"full-name\"" }] },
          ],
        },
      },
    ],
  },
];

export const WEB_ACCESSIBILITY_CHAPTERS = RAW_WEB_ACCESSIBILITY_CHAPTERS;

export const WEB_ACCESSIBILITY_LESSONS = WEB_ACCESSIBILITY_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const WEB_ACCESSIBILITY_TOTAL_XP = WEB_ACCESSIBILITY_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
