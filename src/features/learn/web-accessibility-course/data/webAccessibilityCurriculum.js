// PolyCode — Web Accessibility (a11y) interactive course
// 6 chapters · 18 lessons
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
            variant: "warning",
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
            variant: "warning",
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
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Meaningful Content
  // ─────────────────────────────────────────────────────────────
  {
    id: "a11y-meaningful-content",
    title: "Meaningful Content",
    icon: "🧭",
    color: "#0891b2",
    lessons: [
      {
        id: "a11y-12",
        title: "Descriptive Link Text & Page Titles",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Screen reader users often pull up a **list of every link on the page** and jump straight to one. In that list, \"Click here\", \"Read more\" and \"here\" are meaningless — link text should say where the link goes on its own. The same goes for the page's `<title>`: it's the first thing announced when a page loads, so make it unique and specific, like \"Pricing – Acme\". In a nav bar, mark the link for the page you're on with `aria-current=\"page\"` so it's announced as the current page.",
          },
          {
            type: "code",
            lang: "html",
            label: "Links that make sense out of context",
            content: `<title>Pricing – Acme</title>

<nav aria-label="Main">
  <a href="/">Home</a>
  <a href="/pricing" aria-current="page">Pricing</a>
</nav>

<!-- Vague: a links list just says "Click here" -->
<p>New plans are out. <a href="/pricing">Click here</a>.</p>

<!-- Descriptive: the link text alone explains the destination -->
<p>New plans are out. <a href="/pricing">Compare our pricing plans</a>.</p>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "aria-current=\"page\" also gives you a styling hook: a selector like a[aria-current=\"page\"] can highlight the current nav item without needing a separate .active class.",
          },
          {
            type: "quiz",
            question: "Why is \"Click here\" poor link text for accessibility?",
            options: [
              "Screen readers can't read the word \"click\"",
              "Links are often read as a list out of context, where \"Click here\" gives no clue about the destination",
              "It's too short to be clickable on mobile",
              "Search engines penalize the word \"here\"",
            ],
            answer: 1,
            explanation:
              "WCAG's Link Purpose criterion asks that a link's purpose be clear from its text (or its immediate context). In a screen reader's links list, five \"Click here\" links are indistinguishable.",
          },
        ],
        challenge: {
          id: "a11y-12-challenge",
          language: "html",
          title: "Fix Vague Links",
          description:
            "The learner is on the Pricing page. Mark the Pricing nav link with `aria-current=\"page\"`, and replace the \"Click here\" link text with text that describes where it goes.",
          starterCode: `<nav aria-label="Main">
  <a href="/">Home</a>
  <a href="/pricing">Pricing</a>
</nav>

<p>Our new plans are out. <a href="/pricing">Click here</a> to compare them.</p>`,
          solutionCode: `<nav aria-label="Main">
  <a href="/">Home</a>
  <a href="/pricing" aria-current="page">Pricing</a>
</nav>

<p>Our new plans are out. <a href="/pricing">Compare our pricing plans</a>.</p>`,
          tests: [
            { id: 1, label: "Pricing nav link has aria-current=\"page\"", keywords: [{ pattern: "<a[^>]*href=\"/pricing\"[^>]*aria-current=\"page\"[^>]*>\\s*Pricing|<a[^>]*aria-current=\"page\"[^>]*href=\"/pricing\"[^>]*>\\s*Pricing" }] },
            { id: 2, label: "No \"click here\" link text", keywords: [{ pattern: "^(?![\\s\\S]*>\\s*click here\\s*<)" }] },
            { id: 3, label: "Paragraph link text describes the destination", keywords: [{ pattern: "<p>[\\s\\S]*<a[^>]*href=\"/pricing\"[^>]*>[^<]{12,}</a>" }] },
          ],
        },
      },
      {
        id: "a11y-13",
        title: "Accessible Data Tables",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A sighted user reads a table by glancing up to the column header. A screen reader can do the same — announcing \"Price, $12\" as you move between cells — but only if the markup says which cells are headers. Use `<th>` for header cells with `scope=\"col\"` or `scope=\"row\"`, and give the table a `<caption>` (the first element inside `<table>`) that names what it shows. Use tables for tabular data only, never for page layout.",
          },
          {
            type: "code",
            lang: "html",
            label: "Header cells with scope, plus a caption",
            content: `<table>
  <caption>Monthly plans compared</caption>
  <thead>
    <tr>
      <th scope="col">Plan</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Basic</th>
      <td>$5</td>
    </tr>
  </tbody>
</table>`,
          },
          {
            type: "quiz",
            question: "What does scope=\"row\" on a <th> tell assistive technology?",
            options: [
              "The cell spans the whole row visually",
              "The cell should be read before the caption",
              "The cell is the header for the other cells in its row",
              "The row can be sorted",
            ],
            answer: 2,
            explanation:
              "scope links a header to the cells it describes: scope=\"col\" for everything below it, scope=\"row\" for everything beside it. Screen readers then announce the right header with each data cell.",
          },
        ],
        challenge: {
          id: "a11y-13-challenge",
          language: "html",
          title: "Give a Table Real Headers",
          description:
            "This pricing table uses only `<td>`. Add a `<caption>` as the first child of the table, turn the first row into `<th scope=\"col\">` headers, and make each plan name a `<th scope=\"row\">`.",
          starterCode: `<table>
  <tr>
    <td>Plan</td>
    <td>Price</td>
    <td>Storage</td>
  </tr>
  <tr>
    <td>Basic</td>
    <td>$5</td>
    <td>10 GB</td>
  </tr>
  <tr>
    <td>Pro</td>
    <td>$12</td>
    <td>100 GB</td>
  </tr>
</table>`,
          solutionCode: `<table>
  <caption>Monthly plans compared</caption>
  <thead>
    <tr>
      <th scope="col">Plan</th>
      <th scope="col">Price</th>
      <th scope="col">Storage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Basic</th>
      <td>$5</td>
      <td>10 GB</td>
    </tr>
    <tr>
      <th scope="row">Pro</th>
      <td>$12</td>
      <td>100 GB</td>
    </tr>
  </tbody>
</table>`,
          tests: [
            { id: 1, label: "Caption is the first element in the table", keywords: [{ pattern: "<table[^>]*>\\s*<caption>[^<]+</caption>" }] },
            { id: 2, label: "Three column headers with scope=\"col\"", keywords: [{ pattern: "(<th[^>]*scope=\"col\"[\\s\\S]*){3}" }] },
            { id: 3, label: "Plan names are row headers with scope=\"row\"", keywords: [{ pattern: "<th[^>]*scope=\"row\"[^>]*>\\s*Basic" }, { pattern: "<th[^>]*scope=\"row\"[^>]*>\\s*Pro" }] },
          ],
        },
      },
      {
        id: "a11y-14",
        title: "Visually Hidden Text vs aria-hidden",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Sometimes screen readers need text sighted users don't — like \"Rated 4 out of 5\" next to a row of star icons. `display: none` won't work: it hides content from **everyone**, screen readers included. Instead, use a **visually hidden** utility class that shrinks the text to a 1px clipped box. The opposite tool is `aria-hidden=\"true\"`, which hides something from assistive technology but leaves it on screen — right for decorative icons whose meaning is already given in text.",
          },
          {
            type: "code",
            lang: "html",
            label: "Hidden from eyes vs hidden from screen readers",
            content: `<p>
  <span aria-hidden="true">★★★★☆</span>
  <span class="visually-hidden">Rated 4 out of 5</span>
</p>

<style>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Never put aria-hidden=\"true\" on a focusable element such as a link or button. Keyboard users can still Tab to it, but screen readers announce nothing — a silent, confusing stop.",
          },
          {
            type: "quiz",
            question: "You want text that screen readers announce but sighted users don't see. What should you use?",
            options: [
              "display: none",
              "aria-hidden=\"true\"",
              "visibility: hidden",
              "A visually hidden class that clips the text to a 1px box",
            ],
            answer: 3,
            explanation:
              "display: none and visibility: hidden remove content from the accessibility tree too, and aria-hidden hides it from screen readers specifically. The clipped 1px technique keeps the text readable by assistive technology while hiding it visually.",
          },
        ],
        challenge: {
          id: "a11y-14-challenge",
          language: "css",
          title: "Write a Visually Hidden Utility",
          description:
            "This `.visually-hidden` class uses `display: none`, which hides the text from screen readers too. Rewrite it with the clipping technique: absolute positioning, a 1px × 1px box, `overflow: hidden` and `clip`.",
          starterCode: `/* Should hide text visually but keep it for screen readers */
.visually-hidden {
  display: none;
}`,
          solutionCode: `/* Should hide text visually but keep it for screen readers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`,
          tests: [
            { id: 1, label: "No longer uses display: none", keywords: [{ pattern: "^(?![\\s\\S]*display:\\s*none)" }] },
            { id: 2, label: "Positioned absolutely in a 1px box", keywords: [{ pattern: "position:\\s*absolute" }, { pattern: "width:\\s*1px" }, { pattern: "height:\\s*1px" }] },
            { id: 3, label: "Clips the overflow", keywords: [{ pattern: "overflow:\\s*hidden" }, { pattern: "clip(-path)?:" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Accessible Interactive Components
  // ─────────────────────────────────────────────────────────────
  {
    id: "a11y-interactive-components",
    title: "Accessible Interactive Components",
    icon: "🧩",
    color: "#db2777",
    lessons: [
      {
        id: "a11y-15",
        title: "Accessible Modal Dialogs",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A modal built from a plain `<div>` is one of the hardest things to make accessible: focus has to move into it, stay trapped inside, close on Escape, and return to the button that opened it. The native `<dialog>` element opened with `showModal()` handles most of that for you — the rest of the page becomes inert, focus moves to the first focusable element inside, and Escape closes it. You still add the parts only you know: an accessible name via `aria-labelledby` pointing at its heading, and a close button with a clear label. Then test it with the keyboard, including where focus lands after the dialog closes.",
          },
          {
            type: "code",
            lang: "html",
            label: "A native modal dialog",
            content: `<button type="button" id="open-settings">Settings</button>

<dialog id="settings-dialog" aria-labelledby="settings-title">
  <h2 id="settings-title">Settings</h2>
  <p>Choose your notification preferences.</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>

<script>
  const dialog = document.getElementById("settings-dialog");
  document.getElementById("open-settings")
    .addEventListener("click", () => dialog.showModal());
</script>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A button inside <form method=\"dialog\"> closes the dialog without any JavaScript. Use show() only for non-modal dialogs — it doesn't make the rest of the page inert.",
          },
          {
            type: "quiz",
            question: "What does showModal() give you that a styled <div> doesn't?",
            options: [
              "A default blue border",
              "An inert background, focus moved into the dialog, and Escape to close — built in",
              "Automatic translation of the dialog text",
              "Nothing — they behave the same",
            ],
            answer: 1,
            explanation:
              "showModal() makes everything outside the dialog inert, moves focus inside and wires up Escape. Recreating that on a <div> takes careful focus-trapping code that's easy to get wrong.",
          },
        ],
        challenge: {
          id: "a11y-15-challenge",
          language: "html",
          title: "Turn a Div into a Dialog",
          description:
            "Replace the `<div class=\"modal\">` with a `<dialog>` whose `aria-labelledby` points at the heading (give the `<h2>` the id `settings-title`), and give the \"X\" close button an accessible name with `aria-label`.",
          starterCode: `<button type="button" id="open-settings">Settings</button>

<div class="modal">
  <h2>Settings</h2>
  <p>Choose your notification preferences.</p>
  <button type="button">X</button>
</div>`,
          solutionCode: `<button type="button" id="open-settings">Settings</button>

<dialog id="settings-dialog" aria-labelledby="settings-title">
  <h2 id="settings-title">Settings</h2>
  <p>Choose your notification preferences.</p>
  <form method="dialog">
    <button aria-label="Close settings">X</button>
  </form>
</dialog>`,
          tests: [
            { id: 1, label: "Uses a <dialog> instead of the div", keywords: [{ pattern: "<dialog" }, { pattern: "^(?![\\s\\S]*class=\"modal\")" }] },
            { id: 2, label: "Dialog is labelled by its heading", keywords: [{ pattern: "<dialog[^>]*aria-labelledby=\"settings-title\"" }, { pattern: "<h2[^>]*id=\"settings-title\"" }] },
            { id: 3, label: "Close button has an accessible name", keywords: [{ pattern: "<button[^>]*aria-label=\"[^\"]+\"[^>]*>\\s*X\\s*</button>" }] },
          ],
        },
      },
      {
        id: "a11y-16",
        title: "Disclosure Buttons with aria-expanded",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **disclosure** is a button that shows and hides a section — FAQ answers, \"Show more\" panels, mobile menus. Sighted users see the panel open; screen reader users need to *hear* it. Put `aria-expanded` on the button (`\"false\"` when collapsed, `\"true\"` when open), point `aria-controls` at the panel's `id`, and hide the collapsed panel with the `hidden` attribute. When the button is clicked, update both together. If you don't need custom styling or behaviour, the native `<details>`/`<summary>` pair (covered in Forms & Semantic HTML) does all of this for you.",
          },
          {
            type: "code",
            lang: "html",
            label: "A disclosure button that stays in sync",
            content: `<button type="button" aria-expanded="false" aria-controls="shipping-info">
  Shipping details
</button>
<div id="shipping-info" hidden>
  Orders ship within 2 business days.
</div>

<script>
  const toggle = document.querySelector("[aria-controls='shipping-info']");
  const panel = document.getElementById("shipping-info");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
</script>`,
          },
          {
            type: "quiz",
            question: "A screen reader announces a button as \"Shipping details, collapsed\". Which attribute produced \"collapsed\"?",
            options: [
              "aria-controls=\"shipping-info\"",
              "aria-expanded=\"false\"",
              "hidden on the panel",
              "type=\"button\"",
            ],
            answer: 1,
            explanation:
              "aria-expanded exposes the open/closed state. \"false\" is announced as collapsed and \"true\" as expanded, which is why it must be updated every time the panel is toggled.",
          },
        ],
        challenge: {
          id: "a11y-16-challenge",
          language: "html",
          title: "Mark Up a Collapsed FAQ",
          description:
            "Make this FAQ start collapsed: give the button `aria-expanded=\"false\"` and `aria-controls=\"faq-refund\"`, and give the answer `id=\"faq-refund\"` plus the `hidden` attribute.",
          starterCode: `<button type="button" class="faq-question">
  What is your refund policy?
</button>
<div class="faq-answer">
  Full refunds within 30 days of purchase.
</div>`,
          solutionCode: `<button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-refund">
  What is your refund policy?
</button>
<div class="faq-answer" id="faq-refund" hidden>
  Full refunds within 30 days of purchase.
</div>`,
          tests: [
            { id: 1, label: "Button has aria-expanded=\"false\"", keywords: [{ pattern: "<button[^>]*aria-expanded=\"false\"" }] },
            { id: 2, label: "Button points at the answer with aria-controls", keywords: [{ pattern: "<button[^>]*aria-controls=\"faq-refund\"" }] },
            { id: 3, label: "Answer has the matching id and is hidden", keywords: [{ pattern: "<div[^>]*id=\"faq-refund\"" }, { pattern: "<div[^>]*\\shidden[\\s>]" }] },
          ],
        },
      },
      {
        id: "a11y-17",
        title: "Captions & Transcripts for Media",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Video with speech needs **captions** for people who are deaf or hard of hearing — and for anyone watching with the sound off. Captions are a text track, usually a WebVTT (`.vtt`) file, added with `<track kind=\"captions\">`. Unlike subtitles, captions also describe meaningful sounds and who is speaking. A **transcript** (the full text of the audio, linked next to the player) helps people who use braille displays or prefer to read. Always include `controls`, and don't autoplay media with sound: audio that starts on its own talks over screen readers.",
          },
          {
            type: "code",
            lang: "html",
            label: "A captioned video with a transcript",
            content: `<video src="intro-talk.mp4" controls>
  <track kind="captions" src="intro-talk.en.vtt" srclang="en" label="English" default>
</video>
<p><a href="intro-talk-transcript.html">Read the transcript of the intro talk</a></p>

<!-- intro-talk.en.vtt
WEBVTT

00:00.000 --> 00:03.500
[upbeat music]

00:03.500 --> 00:07.000
MAYA: Welcome to the accessibility workshop!
-->`,
          },
          {
            type: "quiz",
            question: "What's the difference between captions and subtitles?",
            options: [
              "There is no difference",
              "Captions also describe meaningful sounds and speakers, for viewers who can't hear the audio",
              "Subtitles are only for live video",
              "Captions must be burned into the video image",
            ],
            answer: 1,
            explanation:
              "Subtitles translate the dialogue for viewers who can hear. Captions assume the viewer can't hear, so they include sound cues like [door slams] and speaker names.",
          },
        ],
        challenge: {
          id: "a11y-17-challenge",
          language: "html",
          title: "Caption a Video",
          description:
            "Remove `autoplay` and add `controls` to the video, add an English captions track (`kind=\"captions\"`, `srclang=\"en\"`, `src=\"intro-talk.en.vtt\"`), and add a link to a transcript page below the player.",
          starterCode: `<video src="intro-talk.mp4" autoplay></video>`,
          solutionCode: `<video src="intro-talk.mp4" controls>
  <track kind="captions" src="intro-talk.en.vtt" srclang="en" label="English" default>
</video>
<p><a href="intro-talk-transcript.html">Read the transcript of the intro talk</a></p>`,
          tests: [
            { id: 1, label: "Video has controls and no autoplay", keywords: [{ pattern: "<video[^>]*\\scontrols" }, { pattern: "^(?![\\s\\S]*autoplay)" }] },
            { id: 2, label: "Adds an English captions track", keywords: [{ pattern: "<track[^>]*kind=\"captions\"" }, { pattern: "<track[^>]*srclang=\"en\"" }, { pattern: "<track[^>]*src=\"intro-talk\\.en\\.vtt\"" }] },
            { id: 3, label: "Links to a transcript", keywords: [{ pattern: "<a[^>]*href=\"[^\"]*transcript[^\"]*\"" }] },
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
