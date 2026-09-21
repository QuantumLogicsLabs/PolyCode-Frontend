// PolyCode — Forms & Semantic HTML interactive course
// 6 chapters · 18 lessons
// Every HTML sample in this file was validated with html-validate (recommended
// ruleset, with form-dup-name and prefer-button relaxed only where the lesson
// deliberately contrasts patterns — e.g. checkbox groups sharing a name, or
// <button> vs <input type="submit">). Content follows WHATWG HTML Living
// Standard semantics and WAI-ARIA Authoring Practices for form accessibility.

const ACCENT = "#0d9488"; // semantic teal

const RAW_FORMS_SEMANTIC_HTML_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Semantic HTML Foundations
  // ─────────────────────────────────────────────────────────────
  {
    id: "semantic-html-foundations",
    title: "Semantic HTML Foundations",
    icon: "🏷️",
    color: ACCENT,
    lessons: [
      {
        id: "fsh-0",
        title: "Why Semantics Matter",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Semantic HTML** means choosing elements based on their *meaning*, not just their default appearance. A page built entirely from `<div>`s ('div soup') looks fine visually but conveys **zero structure** to screen readers, search engines, or browser extensions — they all have to guess what each div actually represents.",
          },
          {
            type: "code",
            lang: "html",
            label: "Div soup: visually fine, semantically empty",
            content: `<!-- "div soup": no meaning conveyed to screen readers or search engines -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">...</div>
<div class="footer">...</div>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Screen reader users often navigate by **landmark** (jumping directly to \"navigation\", \"main content\", or \"footer\") rather than reading top to bottom — that navigation shortcut only exists if you actually use `<nav>`, `<main>`, and `<footer>` instead of generic `<div>`s.",
          },
          {
            type: "quiz",
            question: "What's the main problem with building an entire page out of <div> elements only?",
            options: [
              "Divs are slower to render than other elements",
              "Divs carry no inherent meaning, so screen readers, search engines, and browser tools can't understand the page's structure without extra work",
              "Browsers don't support more than 100 divs per page",
              "CSS can't style divs as flexibly as semantic elements",
            ],
            answer: 1,
            explanation:
              "A <div> is a generic, meaningless container by design. Screen reader landmark navigation, SEO structured understanding, and browser reader-mode features all rely on semantic elements (nav, main, article, etc.) to understand what each part of the page actually represents.",
          },
        ],
        challenge: {
          id: "fsh-0-challenge",
          language: "html",
          title: "Spot the Semantic Opportunity",
          description:
            "Replace the generic `<div class=\"footer\">` wrapper with the correct semantic element that conveys the same meaning natively.",
          starterCode: `<div class="footer">
  <p>&copy; 2026 My Company</p>
</div>
`,
          solutionCode: `<footer>
  <p>&copy; 2026 My Company</p>
</footer>`,
          tests: [
            { id: 1, label: "Uses <footer> instead of a div", keywords: [{ pattern: "<footer>" }] },
            { id: 2, label: "Keeps the copyright paragraph", keywords: [{ pattern: "&copy;" }] },
            { id: 3, label: "Closes the footer tag properly", keywords: [{ pattern: "</footer>" }] },
          ],
        },
      },
      {
        id: "fsh-1",
        title: "Landmark Elements: header, nav, main, footer",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "HTML5 provides purpose-built **landmark** elements: `<header>` for introductory content, `<nav>` for primary navigation links, `<main>` for the page's unique central content (only one per page), and `<footer>` for closing/meta content. Using them correctly gives assistive technology an instant map of the page.",
          },
          {
            type: "code",
            lang: "html",
            label: "A page built from semantic landmarks",
            content: `<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>
<main>
  <section>
    <h1>Welcome</h1>
    <article>
      <h2>Blog Post Title</h2>
      <p>Article content goes here.</p>
    </article>
  </section>
</main>
<footer>
  <p>&copy; 2026 My Site</p>
</footer>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "There should be exactly **one** `<main>` per page, containing the content unique to that page (not repeated across every page, like a sidebar or nav) — screen reader users often jump straight to `<main>` to skip repeated boilerplate.",
          },
          {
            type: "quiz",
            question: "How many <main> elements should a single page typically have?",
            options: ["As many as needed", "Exactly one, containing the page's unique central content", "Zero — main is deprecated", "One per section"],
            answer: 1,
            explanation:
              "main is meant to mark the one region of unique, page-specific content, letting assistive technology users skip past repeated header/nav/sidebar content that's the same on every page. Having more than one main is invalid and defeats this purpose.",
          },
        ],
        challenge: {
          id: "fsh-1-challenge",
          language: "html",
          title: "Wrap Page Content in Landmarks",
          description:
            "Given a plain nav list and a content paragraph, wrap the nav in `<header><nav>...</nav></header>` and the paragraph in `<main>...</main>`.",
          starterCode: `<ul>
  <li><a href="#a">A</a></li>
  <li><a href="#b">B</a></li>
</ul>
<p>Page content here.</p>
`,
          solutionCode: `<header>
  <nav>
    <ul>
      <li><a href="#a">A</a></li>
      <li><a href="#b">B</a></li>
    </ul>
  </nav>
</header>
<main>
  <p>Page content here.</p>
</main>`,
          tests: [
            { id: 1, label: "Wraps nav in <header>", keywords: [{ pattern: "<header>\\s*<nav>" }] },
            { id: 2, label: "Wraps the paragraph in <main>", keywords: [{ pattern: "<main>[\\s\\S]*<p>" }] },
            { id: 3, label: "Uses <nav> for the link list", keywords: [{ pattern: "<nav>" }] },
          ],
        },
      },
      {
        id: "fsh-2",
        title: "section vs article vs div",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`<article>` marks content that could stand **independently** — a blog post, a news story, a forum comment — something that would still make sense if syndicated elsewhere on its own. `<section>` groups related content **thematically**, usually under its own heading, without necessarily standing alone. `<div>` remains the right choice when you need a wrapper with **no semantic meaning at all**, purely for styling or scripting hooks.",
          },
          {
            type: "code",
            lang: "html",
            label: "Choosing between article, section, and div",
            content: `<!-- article: independently distributable/reusable content -->
<article>
  <h2>How to Bake Bread</h2>
  <p>A self-contained piece of content that would make sense on its own.</p>
</article>

<!-- section: a thematic grouping, usually with its own heading -->
<section>
  <h2>Ingredients</h2>
  <p>Flour, water, yeast, salt.</p>
</section>

<!-- div: no semantic meaning, purely a styling/layout hook -->
<div class="two-column-wrapper">
  <p>Just a generic container for CSS layout purposes.</p>
</div>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "A quick test: if you'd be comfortable pulling the content out and dropping it into an RSS feed or a different page entirely, unchanged, it's probably `<article>`. If it's more like 'this heading plus its related paragraphs, as part of a bigger page', it's probably `<section>`.",
          },
          {
            type: "quiz",
            question: "What distinguishes <article> from <section>?",
            options: [
              "There's no real difference; they're interchangeable",
              "<article> is for content that could stand alone/be independently distributed (like a blog post); <section> is for thematically grouping related content within a larger page, without necessarily standing alone",
              "<section> can only contain text, <article> can contain anything",
              "<article> is deprecated in favor of <section>",
            ],
            answer: 1,
            explanation:
              "The HTML spec defines article as self-contained, independently distributable content, while section is a generic thematic grouping — often used to break up a long article or page into labeled parts that don't necessarily make sense removed from their context.",
          },
        ],
        challenge: {
          id: "fsh-2-challenge",
          language: "html",
          title: "Choose the Right Wrapper",
          description:
            "Given a self-contained product review that could be shared/syndicated on its own, wrap it in the correct semantic element (not `<div>` or `<section>`).",
          starterCode: `<div>
  <h2>Review: Wireless Headphones</h2>
  <p>These headphones have excellent battery life and sound quality.</p>
</div>
`,
          solutionCode: `<article>
  <h2>Review: Wireless Headphones</h2>
  <p>These headphones have excellent battery life and sound quality.</p>
</article>`,
          tests: [
            { id: 1, label: "Uses <article>", keywords: [{ pattern: "<article>" }] },
            { id: 2, label: "Closes the article tag", keywords: [{ pattern: "</article>" }] },
            { id: 3, label: "Keeps the heading and paragraph", keywords: [{ pattern: "<h2>" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — More Semantic Elements
  // ─────────────────────────────────────────────────────────────
  {
    id: "more-semantic-elements",
    title: "More Semantic Elements",
    icon: "🧩",
    color: "#2563eb",
    lessons: [
      {
        id: "fsh-3",
        title: "figure & figcaption",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`<figure>` wraps self-contained content (usually an image, diagram, or code snippet) along with an optional `<figcaption>` that captions/describes it. The pairing keeps the caption **semantically linked** to its content, unlike a plain image followed by a nearby paragraph.",
          },
          {
            type: "code",
            lang: "html",
            label: "An image with a properly linked caption",
            content: `<figure>
  <img src="chart.png" alt="Bar chart showing quarterly revenue growth" width="400" height="250">
  <figcaption>Figure 1: Quarterly revenue, 2024–2026</figcaption>
</figure>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The `alt` text and the `<figcaption>` serve **different** purposes: `alt` describes what the image visually shows (for when it can't be seen), while `figcaption` provides context or commentary about it (like a citation, source, or explanation) — both are useful, and neither should just duplicate the other.",
          },
          {
            type: "quiz",
            question: "What's the difference in purpose between an image's alt text and a figcaption?",
            options: [
              "They serve the exact same purpose and either can be omitted",
              "alt describes what the image visually depicts (for when it can't be seen); figcaption provides caption/context about the figure as a whole, and both can coexist",
              "figcaption replaces the need for alt text entirely",
              "alt is for SEO only, figcaption is for screen readers only",
            ],
            answer: 1,
            explanation:
              "alt is the accessible replacement for the image content itself (what a sighted user would see). figcaption is visible caption text describing/contextualizing the figure — like a photo credit or explanatory note — and is read by everyone, sighted or not.",
          },
        ],
        challenge: {
          id: "fsh-3-challenge",
          language: "html",
          title: "Caption an Image Properly",
          description:
            "Wrap an existing `<img>` in a `<figure>` and add a `<figcaption>` reading \"Diagram of the water cycle\".",
          starterCode: `<img src="water-cycle.png" alt="Diagram showing evaporation, condensation, and precipitation" width="500" height="300">
`,
          solutionCode: `<figure>
  <img src="water-cycle.png" alt="Diagram showing evaporation, condensation, and precipitation" width="500" height="300">
  <figcaption>Diagram of the water cycle</figcaption>
</figure>`,
          tests: [
            { id: 1, label: "Wraps the image in <figure>", keywords: [{ pattern: "<figure>" }] },
            { id: 2, label: "Adds a <figcaption>", keywords: [{ pattern: "<figcaption>" }] },
            { id: 3, label: "Keeps the original alt text", keywords: [{ pattern: "alt=\"Diagram" }] },
          ],
        },
      },
      {
        id: "fsh-4",
        title: "time, mark, and details/summary",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`<time datetime=\"...\">` marks a machine-readable date/time while still displaying human-friendly text. `<mark>` highlights text for reference or relevance (like a search-result match). `<details>`/`<summary>` creates a native, no-JavaScript-required expand/collapse disclosure widget.",
          },
          {
            type: "code",
            lang: "html",
            label: "time, mark, and a native disclosure widget",
            content: `<p>Published on <time datetime="2026-08-05">August 5, 2026</time>.</p>
<p>The most important word is <mark>highlighted</mark> for emphasis.</p>

<details>
  <summary>Click to see more details</summary>
  <p>This content is hidden until the user expands the disclosure widget — no JavaScript required.</p>
</details>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The `datetime` attribute on `<time>` should be in a machine-parseable format (like ISO 8601: `2026-08-05`), even though the visible text can be written however you like for humans — search engines and calendar-integration browser features rely on that machine-readable value.",
          },
          {
            type: "quiz",
            question: "What does <details>/<summary> provide without any JavaScript?",
            options: [
              "A styled tooltip on hover",
              "A native expand/collapse disclosure widget — the content inside <details> is hidden until the user clicks the <summary>, then toggles open",
              "An animated modal dialog",
              "A form validation message",
            ],
            answer: 1,
            explanation:
              "details/summary is a built-in, browser-native disclosure widget: the summary text is always visible and clickable, and clicking it toggles the visibility of the rest of the details content — with zero custom JavaScript required.",
          },
        ],
        challenge: {
          id: "fsh-4-challenge",
          language: "html",
          title: "Build a Native FAQ Toggle",
          description:
            "Use `<details>` and `<summary>` to create a collapsible FAQ item: summary text \"What is your return policy?\", with a hidden paragraph explaining a 30-day return window.",
          starterCode: `<!-- build a details/summary disclosure widget -->
`,
          solutionCode: `<details>
  <summary>What is your return policy?</summary>
  <p>We offer a 30-day return window on all unused items.</p>
</details>`,
          tests: [
            { id: 1, label: "Uses <details>", keywords: [{ pattern: "<details>" }] },
            { id: 2, label: "Uses <summary>", keywords: [{ pattern: "<summary>" }] },
            { id: 3, label: "Includes the return policy text", keywords: [{ pattern: "30-day" }] },
          ],
        },
      },
      {
        id: "fsh-5",
        title: "aside & Heading Hierarchy",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`<aside>` marks content that's **tangentially related** to the surrounding content, like a sidebar, pull quote, or related-links widget. Meanwhile, heading levels (`h1`-`h6`) should form a logical **outline** of the page — don't skip levels (like jumping from `h1` straight to `h3`) purely to get a smaller font size; use CSS for that instead.",
          },
          {
            type: "code",
            lang: "html",
            label: "An aside alongside a properly nested heading hierarchy",
            content: `<main>
  <h1>Main Article Title</h1>
  <p>Main content here.</p>
  <h2>A Subsection</h2>
  <p>More content.</p>

  <aside>
    <h2>Related Links</h2>
    <ul>
      <li><a href="#one">Related article one</a></li>
      <li><a href="#two">Related article two</a></li>
    </ul>
  </aside>
</main>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Screen reader users can jump between headings the same way sighted users skim a page visually — if your headings skip levels or are chosen for visual size rather than logical structure, that navigation becomes confusing or misleading. Use CSS to adjust font size, and headings purely to reflect outline structure.",
          },
          {
            type: "quiz",
            question: "What should determine which heading level (h1-h6) an element uses?",
            options: [
              "Whatever font size looks best visually",
              "Its logical position in the page's outline/content hierarchy — not its visual appearance, which should be controlled with CSS instead",
              "Headings should always alternate between h1 and h2 only",
              "It doesn't matter as long as text is bold",
            ],
            answer: 1,
            explanation:
              "Heading levels should reflect the actual logical structure/outline of the content (h1 = main topic, h2 = major subsections, h3 = subsections of those, etc.), regardless of how large or small they're styled to appear — visual size is a separate CSS concern.",
          },
        ],
        challenge: {
          id: "fsh-5-challenge",
          language: "html",
          title: "Fix a Skipped Heading Level",
          description:
            "Given a page with `<h1>` followed directly by `<h3>` (skipping `h2`), fix the heading level to be a proper `<h2>` instead.",
          starterCode: `<h1>Article Title</h1>
<h3>First Subsection</h3>
<p>Content...</p>
`,
          solutionCode: `<h1>Article Title</h1>
<h2>First Subsection</h2>
<p>Content...</p>`,
          tests: [
            { id: 1, label: "Keeps the h1", keywords: [{ pattern: "<h1>" }] },
            { id: 2, label: "Uses h2 instead of h3", keywords: [{ pattern: "<h2>First Subsection</h2>" }] },
            { id: 3, label: "No longer skips to h3", keywords: [{ pattern: "^(?!.*<h3>).*$", flags: "is" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Form Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "form-basics",
    title: "Form Basics",
    icon: "📝",
    color: "#7c3aed",
    lessons: [
      {
        id: "fsh-6",
        title: "The form Element & Input Types",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`<form>` wraps a set of controls that submit data together, with `action` (where to send it) and `method` (`get` or `post`) attributes. HTML5 added many specialized `<input>` types beyond plain text — `email`, `password`, `number`, `date`, and more — each giving browsers a chance to provide the right keyboard, built-in validation, or native UI on mobile.",
          },
          {
            type: "code",
            lang: "html",
            label: "A form with several specialized input types",
            content: `<form action="/submit" method="post">
  <input type="text" name="username" placeholder="Username">
  <input type="email" name="email" placeholder="you@example.com">
  <input type="password" name="password" autocomplete="new-password">
  <input type="number" name="age" min="0" max="120">
  <input type="date" name="birthday">
  <button type="submit">Sign Up</button>
</form>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Using `type=\"email\"` instead of `type=\"text\"` gives mobile users an `@`-optimized keyboard automatically, and gives the browser free built-in format validation — a small attribute change with a real, tangible usability benefit.",
          },
          {
            type: "quiz",
            question: "Why use type=\"email\" instead of type=\"text\" for an email field?",
            options: [
              "There's no functional difference, it's purely cosmetic",
              "It gives mobile users an appropriate keyboard layout and provides built-in browser validation for email format, at no extra code cost",
              "type=\"email\" is required for forms to submit at all",
              "type=\"text\" doesn't allow the @ symbol to be typed",
            ],
            answer: 1,
            explanation:
              "Specialized input types like email trigger mobile browsers to show an optimized virtual keyboard (with @ and .com shortcuts readily available) and give you free client-side format validation, without writing any custom validation logic.",
          },
        ],
        challenge: {
          id: "fsh-6-challenge",
          language: "html",
          title: "Use the Right Input Types",
          description:
            "Given generic `type=\"text\"` inputs for an email and a numeric quantity (1-10), change them to the more appropriate `email` and `number` types (with `min`/`max` on quantity).",
          starterCode: `<input type="text" name="email" placeholder="Email">
<input type="text" name="quantity" placeholder="Quantity">
`,
          solutionCode: `<input type="email" name="email" placeholder="Email">
<input type="number" name="quantity" placeholder="Quantity" min="1" max="10">`,
          tests: [
            { id: 1, label: "Uses type=\"email\"", keywords: [{ pattern: "type=\"email\"" }] },
            { id: 2, label: "Uses type=\"number\" for quantity", keywords: [{ pattern: "type=\"number\"" }] },
            { id: 3, label: "Sets min and max on quantity", keywords: [{ pattern: "min=\"1\"" }, { pattern: "max=\"10\"" }] },
          ],
        },
      },
      {
        id: "fsh-7",
        title: "label & the for/id Relationship",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A `<label>`'s `for` attribute must match the `id` of its associated input, creating a programmatic link. This does more than look nice: it makes the **entire label text clickable** to focus the input, and it gives screen reader users an announced name for the field — without it, many users have no idea what a bare input is asking for.",
          },
          {
            type: "code",
            lang: "html",
            label: "A properly linked label and input",
            content: `<form action="/submit" method="post">
  <label for="email-input">Email address</label>
  <input type="email" id="email-input" name="email">
  <button type="submit">Subscribe</button>
</form>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "A visually-adjacent label with **no** `for`/`id` link provides zero accessible benefit — screen readers announce the input with no name at all unless the association is explicit (via `for`/`id`, or by wrapping the input inside the `<label>` itself).",
          },
          {
            type: "quiz",
            question: "What does linking a label's `for` attribute to an input's `id` actually accomplish?",
            options: [
              "It's purely a styling hook with no functional effect",
              "It makes the whole label text clickable to focus the input, and gives screen readers an announced accessible name for that field",
              "It's required for the input to submit any value at all",
              "It automatically validates the input's value",
            ],
            answer: 1,
            explanation:
              "The for/id link creates a programmatic association: clicking anywhere on the label text focuses/activates the input (helpful for checkboxes/radios especially), and assistive technology announces the label text as the input's accessible name when it receives focus.",
          },
        ],
        challenge: {
          id: "fsh-7-challenge",
          language: "html",
          title: "Link a Label to Its Input",
          description:
            "Given a `<label>` and `<input>` with no connection, add matching `for` and `id` attributes to link them (\"phone-input\").",
          starterCode: `<label>Phone number</label>
<input type="tel" name="phone">
`,
          solutionCode: `<label for="phone-input">Phone number</label>
<input type="tel" id="phone-input" name="phone">`,
          tests: [
            { id: 1, label: "Label has a for attribute", keywords: [{ pattern: "<label\\s+for=\"phone-input\"" }] },
            { id: 2, label: "Input has a matching id", keywords: [{ pattern: "id=\"phone-input\"" }] },
            { id: 3, label: "Input type stays tel", keywords: [{ pattern: "type=\"tel\"" }] },
          ],
        },
      },
      {
        id: "fsh-8",
        title: "placeholder vs label",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`placeholder` text disappears the moment a user starts typing, has historically poor color-contrast, and isn't announced consistently by all screen readers as a substitute for a real label. A `<label>` stays visible and reliably announced throughout the whole interaction — `placeholder` should supplement a label with a format hint, never replace it.",
          },
          {
            type: "code",
            lang: "html",
            label: "Placeholder-only (bad) vs label + placeholder hint (good)",
            content: `<!-- BAD: placeholder-only, disappears once typing starts, not a real accessible name -->
<form>
  <input type="text" name="name-bad" placeholder="Full name">
  <button type="submit">Submit</button>
</form>

<!-- GOOD: a real, persistent label; placeholder supplements it with a format hint -->
<form>
  <label for="name-good">Full name</label>
  <input type="text" id="name-good" name="name-good" placeholder="e.g. Jane Doe">
  <button type="submit">Submit</button>
</form>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "By the time a user has typed a few characters into a placeholder-only field, they've often forgotten exactly what it was asking for (especially on a long form) — and if they need to review the form before submitting, an empty-looking field with no persistent label reads as confusing or broken.",
          },
          {
            type: "quiz",
            question: "Why shouldn't placeholder text be used as a replacement for a real <label>?",
            options: [
              "Placeholder text is purely decorative and never displays",
              "Placeholder text disappears once the user starts typing and isn't reliably treated as an accessible name — a persistent <label> is needed for that",
              "Browsers don't support the placeholder attribute anymore",
              "There's no difference; placeholder is a complete substitute for label",
            ],
            answer: 1,
            explanation:
              "Placeholder text vanishes as soon as typing begins, leaving no persistent visible name for the field, and inconsistent browser/AT support means it can't be relied upon as the field's only accessible name — a real <label> should always be present, with placeholder used only as a supplementary hint.",
          },
        ],
        challenge: {
          id: "fsh-8-challenge",
          language: "html",
          title: "Add a Missing Label",
          description:
            "Given an input with only a `placeholder` (no label), add a proper `<label>` linked via `for`/`id`, keeping the placeholder as a supplementary hint.",
          starterCode: `<input type="text" id="city-input" name="city" placeholder="e.g. Lahore">
`,
          solutionCode: `<label for="city-input">City</label>
<input type="text" id="city-input" name="city" placeholder="e.g. Lahore">`,
          tests: [
            { id: 1, label: "Adds a <label>", keywords: [{ pattern: "<label" }] },
            { id: 2, label: "Label's for matches the input's id", keywords: [{ pattern: "for=\"city-input\"" }] },
            { id: 3, label: "Keeps the placeholder hint", keywords: [{ pattern: "placeholder=\"e\\.g\\. Lahore\"" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Form Controls
  // ─────────────────────────────────────────────────────────────
  {
    id: "form-controls",
    title: "Form Controls",
    icon: "🎛️",
    color: "#059669",
    lessons: [
      {
        id: "fsh-9",
        title: "select & textarea",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`<select>` provides a dropdown of `<option>`s for choosing one value from a fixed list. `<textarea>` provides a multi-line free-text input, with `rows`/`cols` suggesting its initial size. Both need the same `<label for>` treatment as any other input to stay accessible.",
          },
          {
            type: "code",
            lang: "html",
            label: "A dropdown and a multi-line text field",
            content: `<form action="/submit" method="post">
  <label for="country">Country</label>
  <select id="country" name="country">
    <option value="">Choose a country</option>
    <option value="pk">Pakistan</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>

  <label for="bio">Bio</label>
  <textarea id="bio" name="bio" rows="4" cols="40"></textarea>

  <button type="submit">Save</button>
</form>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "A first `<option value=\"\">Choose a country</option>` with an empty value acts as a placeholder-like prompt — combined with `required` on the select, it forces the user to make an actual selection rather than silently submitting whatever the first real option happens to be.",
          },
          {
            type: "quiz",
            question: "What's the purpose of giving the first <option> an empty value attribute?",
            options: [
              "It's required syntax for <select> to work at all",
              "It acts as a non-selectable-feeling placeholder prompt (like 'Choose a country'), and combined with required, prevents accidentally submitting a real option as the default",
              "It disables the dropdown entirely",
              "Empty values are invalid HTML",
            ],
            answer: 1,
            explanation:
              "Without an empty first option, a select defaults to its first real option being pre-selected — a user who never touches the dropdown would silently submit that value. An empty-value placeholder option paired with required forces a deliberate choice.",
          },
        ],
        challenge: {
          id: "fsh-9-challenge",
          language: "html",
          title: "Build a Labeled Dropdown",
          description:
            "Create a `<select>` for \"Favorite season\" with options for Spring, Summer, Fall, and Winter, properly linked to a `<label>`.",
          starterCode: `<!-- build a labeled select with 4 season options -->
`,
          solutionCode: `<label for="season">Favorite season</label>
<select id="season" name="season">
  <option value="">Choose a season</option>
  <option value="spring">Spring</option>
  <option value="summer">Summer</option>
  <option value="fall">Fall</option>
  <option value="winter">Winter</option>
</select>`,
          tests: [
            { id: 1, label: "Uses a <select>", keywords: [{ pattern: "<select" }] },
            { id: 2, label: "Label is linked via for/id", keywords: [{ pattern: "for=\"season\"" }] },
            { id: 3, label: "Has at least 4 season options", keywords: [{ pattern: "Spring" }, { pattern: "Winter" }] },
          ],
        },
      },
      {
        id: "fsh-10",
        title: "Checkboxes, Radio Buttons, fieldset & legend",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Checkboxes allow **multiple** selections (sharing the same `name` so they submit as a group); radio buttons allow exactly **one** selection from a group (also sharing `name`, with only one ever checked at a time). `<fieldset>` groups related controls visually and semantically, with `<legend>` providing the group's accessible label — like a label, but for the whole group.",
          },
          {
            type: "code",
            lang: "html",
            label: "A checkbox group and a radio group, each in a fieldset",
            content: `<form action="/submit" method="post">
  <fieldset>
    <legend>Notification preferences</legend>
    <label><input type="checkbox" name="notify" value="email"> Email</label>
    <label><input type="checkbox" name="notify" value="sms"> SMS</label>
  </fieldset>

  <fieldset>
    <legend>Preferred contact method</legend>
    <label><input type="radio" name="contact" value="email" checked> Email</label>
    <label><input type="radio" name="contact" value="phone"> Phone</label>
  </fieldset>

  <button type="submit">Save Preferences</button>
</form>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Wrapping each `<input>` directly inside its `<label>` (as shown here) is a valid alternative to the `for`/`id` pattern — it works because the label's implicit association covers whatever form control is nested inside it, no explicit `id` needed.",
          },
          {
            type: "quiz",
            question: "Why do radio buttons in the same group share the same name attribute?",
            options: [
              "It's a stylistic convention with no functional effect",
              "Sharing the same name tells the browser they belong to one mutually-exclusive group, so selecting one automatically deselects any other with that same name",
              "Radio buttons require unique names, not shared ones",
              "It only matters for checkboxes, not radio buttons",
            ],
            answer: 1,
            explanation:
              "The browser uses the shared name attribute to know which radio buttons belong to the same exclusive-choice group — selecting one automatically unchecks any other radio button sharing that name, enforcing 'choose exactly one'.",
          },
        ],
        challenge: {
          id: "fsh-10-challenge",
          language: "html",
          title: "Group Radio Buttons in a Fieldset",
          description:
            "Wrap two radio buttons (name=\"size\", values \"small\" and \"large\") in a `<fieldset>` with a `<legend>` reading \"Choose a size\".",
          starterCode: `<label><input type="radio" name="size" value="small"> Small</label>
<label><input type="radio" name="size" value="large"> Large</label>
`,
          solutionCode: `<fieldset>
  <legend>Choose a size</legend>
  <label><input type="radio" name="size" value="small"> Small</label>
  <label><input type="radio" name="size" value="large"> Large</label>
</fieldset>`,
          tests: [
            { id: 1, label: "Uses a <fieldset>", keywords: [{ pattern: "<fieldset>" }] },
            { id: 2, label: "Includes a <legend>", keywords: [{ pattern: "<legend>Choose a size</legend>" }] },
            { id: 3, label: "Both radios still share name=\"size\"", keywords: [{ pattern: "name=\"size\"" }] },
          ],
        },
      },
      {
        id: "fsh-11",
        title: "button vs input type=submit",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Both `<button type=\"submit\">` and `<input type=\"submit\">` submit their enclosing form, but `<button>` can contain **rich markup** (icons, nested `<span>`s, multiple lines) while `<input type=\"submit\">` can only display plain text via its `value` attribute. For this reason, `<button>` is generally the more flexible, modern choice.",
          },
          {
            type: "code",
            lang: "html",
            label: "Comparing button and input type=submit",
            content: `<form action="/submit" method="post">
  <!-- <button> can contain rich markup (icons, nested spans) -->
  <button type="submit">
    <span aria-hidden="true">✓</span> Confirm Order
  </button>

  <!-- input type="submit" only supports plain text via its "value" attribute -->
  <input type="submit" value="Confirm Order (plain text only)">
</form>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Always specify `type=\"submit\"`, `type=\"button\"`, or `type=\"reset\"` explicitly on every `<button>` — its default type inside a `<form>` is `submit`, which causes many accidental form submissions when developers add a `<button>` intended only to trigger some JavaScript.",
          },
          {
            type: "quiz",
            question: "What can <button> contain that <input type=\"submit\"> cannot?",
            options: [
              "Nothing — they're functionally and structurally identical",
              "Rich inner markup like icons, nested <span> elements, or multiple lines of content — input's submit text is limited to its plain-text value attribute",
              "input type=submit can contain rich markup but button can't",
              "Neither can contain anything other than plain text",
            ],
            answer: 1,
            explanation:
              "<button> is a container element that can hold arbitrary child markup (icons, styled spans, etc.), while <input> is a void element whose displayed text comes only from its value attribute — a plain string, with no nested markup possible.",
          },
        ],
        challenge: {
          id: "fsh-11-challenge",
          language: "html",
          title: "Add an Explicit Button Type",
          description:
            "Given a `<button>` with no `type` attribute inside a form (which defaults to submitting), add an explicit `type=\"button\"` so it does NOT submit the form (since it's meant to just toggle a preview, not submit).",
          starterCode: `<form>
  <button>Toggle Preview</button>
</form>
`,
          solutionCode: `<form>
  <button type="button">Toggle Preview</button>
</form>`,
          tests: [
            { id: 1, label: "Adds an explicit type attribute", keywords: [{ pattern: "type=\"button\"" }] },
            { id: 2, label: "Does not use type=\"submit\"", keywords: [{ pattern: "^(?!.*type=\"submit\").*$", flags: "is" }] },
            { id: 3, label: "Keeps the button text", keywords: [{ pattern: "Toggle Preview" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Form Validation & Accessibility
  // ─────────────────────────────────────────────────────────────
  {
    id: "form-validation-accessibility",
    title: "Form Validation & Accessibility",
    icon: "✅",
    color: "#f59e0b",
    lessons: [
      {
        id: "fsh-12",
        title: "required, pattern, min, max",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "HTML provides built-in validation attributes with **zero JavaScript**: `required` (must have a value), `pattern` (must match a regular expression), `minlength`/`maxlength` (text length bounds), and `min`/`max` (numeric or date bounds). Browsers block submission and show a native error message when these constraints aren't met.",
          },
          {
            type: "code",
            lang: "html",
            label: "Built-in HTML5 validation attributes",
            content: `<form action="/submit" method="post">
  <label for="username">Username (required)</label>
  <input type="text" id="username" name="username" required minlength="3">

  <label for="zip">US ZIP code</label>
  <input type="text" id="zip" name="zip" pattern="[0-9]{5}" title="Five digit ZIP code">

  <label for="quantity">Quantity (1-10)</label>
  <input type="number" id="quantity" name="quantity" min="1" max="10">

  <button type="submit">Submit</button>
</form>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The `title` attribute on a `pattern`-constrained input is shown by many browsers as part of the native validation error message — always include it to explain what format is actually expected, since a raw regex means nothing to the person filling out the form.",
          },
          {
            type: "quiz",
            question: "What does the pattern attribute do on an <input>?",
            options: [
              "Sets a background image pattern for styling",
              "Requires the input's value to match a given regular expression before the form can be submitted",
              "Automatically formats the input as the user types",
              "It only works with type=\"email\"",
            ],
            answer: 1,
            explanation:
              "pattern takes a regular expression; the browser's native form validation blocks submission (and shows an error, ideally using the title attribute's text) if the input's current value doesn't match that pattern.",
          },
        ],
        challenge: {
          id: "fsh-12-challenge",
          language: "html",
          title: "Add Built-in Validation",
          description:
            "Add `required` and `min=\"18\"` `max=\"100\"` to an age input so users must enter a value between 18 and 100.",
          starterCode: `<label for="age">Age</label>
<input type="number" id="age" name="age">
`,
          solutionCode: `<label for="age">Age</label>
<input type="number" id="age" name="age" required min="18" max="100">`,
          tests: [
            { id: 1, label: "Adds required", keywords: [{ pattern: "required" }] },
            { id: 2, label: "Sets min=\"18\"", keywords: [{ pattern: "min=\"18\"" }] },
            { id: 3, label: "Sets max=\"100\"", keywords: [{ pattern: "max=\"100\"" }] },
          ],
        },
      },
      {
        id: "fsh-13",
        title: "ARIA for Form Errors",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "When a field fails validation, `aria-invalid=\"true\"` tells assistive technology the field is currently in an error state, and `aria-describedby` links the input to the id(s) of hint/error text elsewhere on the page — so screen readers announce that context automatically when the field receives focus.",
          },
          {
            type: "code",
            lang: "html",
            label: "Linking a password field to its hint and error text",
            content: `<form action="/submit" method="post">
  <label for="pwd">Password</label>
  <input
    type="password"
    id="pwd"
    name="pwd"
    autocomplete="new-password"
    aria-describedby="pwd-hint pwd-error"
    aria-invalid="true"
  >
  <span id="pwd-hint">Must be at least 8 characters</span>
  <span id="pwd-error" role="alert">Password is too short</span>

  <button type="submit">Create Account</button>
</form>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`aria-describedby` accepts a **space-separated list** of multiple ids, as shown here (`\"pwd-hint pwd-error\"`) — the screen reader announces all of them, in order, giving the user both the general hint and the specific current error.",
          },
          {
            type: "quiz",
            question: "What does aria-describedby=\"pwd-hint pwd-error\" do?",
            options: [
              "It's invalid — aria-describedby can only reference one id",
              "It links the input to both referenced elements, so a screen reader announces both pieces of text (the hint and the error) when the input receives focus",
              "It only works if both ids are on the same element",
              "It visually styles the input with two colors",
            ],
            answer: 1,
            explanation:
              "aria-describedby accepts a space-separated list of element ids. The referenced elements' text content all gets announced together as additional description for the input, which is exactly how a hint and a validation error can both be communicated.",
          },
        ],
        challenge: {
          id: "fsh-13-challenge",
          language: "html",
          title: "Link an Error Message with ARIA",
          description:
            "Given an email input and an error `<span id=\"email-err\">`, add `aria-describedby=\"email-err\"` and `aria-invalid=\"true\"` to the input.",
          starterCode: `<label for="email3">Email</label>
<input type="email" id="email3" name="email3">
<span id="email-err" role="alert">Please enter a valid email</span>
`,
          solutionCode: `<label for="email3">Email</label>
<input type="email" id="email3" name="email3" aria-describedby="email-err" aria-invalid="true">
<span id="email-err" role="alert">Please enter a valid email</span>`,
          tests: [
            { id: 1, label: "Adds aria-describedby referencing email-err", keywords: [{ pattern: "aria-describedby=\"email-err\"" }] },
            { id: 2, label: "Adds aria-invalid=\"true\"", keywords: [{ pattern: "aria-invalid=\"true\"" }] },
            { id: 3, label: "Keeps the error span with role=alert", keywords: [{ pattern: "role=\"alert\"" }] },
          ],
        },
      },
      {
        id: "fsh-14",
        title: ":valid and :invalid Pseudo-Classes",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "CSS can style form fields based on their **current validation state** using the `:valid` and `:invalid` pseudo-classes — no JavaScript needed to visually flag a bad email format, for instance. Combining `:invalid` with `:not(:placeholder-shown)` avoids showing an error style before the user has even had a chance to type anything.",
          },
          {
            type: "code",
            lang: "html",
            label: "Styling based on live validation state",
            content: `<style>
  input:invalid {
    border-color: #d9534f;
  }
  input:valid {
    border-color: #5cb85c;
  }
  /* Only show red styling after the user has interacted */
  input:invalid:not(:placeholder-shown) {
    background-color: #fdf2f2;
  }
</style>

<form action="/submit" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="you@example.com" required>
  <button type="submit">Submit</button>
</form>`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Without the `:not(:placeholder-shown)` guard, an empty `required` field would show as `:invalid` (and thus red) the instant the page loads — before the user has done anything wrong. That's a jarring, unfriendly first impression; gating on placeholder-shown avoids it.",
          },
          {
            type: "quiz",
            question: "Why combine :invalid with :not(:placeholder-shown) rather than using :invalid alone?",
            options: [
              "There's no reason; they're functionally identical",
              "A required, empty field is :invalid by default from page load — without the guard, the error styling would show immediately before the user has even interacted with the field",
              ":not(:placeholder-shown) is required syntax for :invalid to work at all",
              "It only matters for checkboxes",
            ],
            answer: 1,
            explanation:
              "An empty required field technically fails validation (is :invalid) as soon as the page loads, before any user interaction. :not(:placeholder-shown) only matches once the placeholder is no longer showing (i.e., the user has typed something and then possibly cleared or left it invalid), avoiding a premature error appearance.",
          },
        ],
        challenge: {
          id: "fsh-14-challenge",
          language: "css",
          title: "Style Valid and Invalid States",
          description:
            "Add CSS so any `input:valid` gets a `2px solid green` border and any `input:invalid:not(:placeholder-shown)` gets a `2px solid red` border.",
          starterCode: `/* add the :valid and guarded :invalid rules */
`,
          solutionCode: `input:valid {
  border: 2px solid green;
}

input:invalid:not(:placeholder-shown) {
  border: 2px solid red;
}`,
          tests: [
            { id: 1, label: "Styles input:valid", keywords: [{ pattern: "input:valid" }] },
            { id: 2, label: "Uses the placeholder-shown guard on invalid", keywords: [{ pattern: "input:invalid:not\\(:placeholder-shown\\)" }] },
            { id: 3, label: "Uses green and red borders", keywords: [{ pattern: "green" }, { pattern: "red" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Practical Patterns & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "forms-practical-capstone",
    title: "Practical Patterns & Capstone",
    icon: "🏆",
    color: "#dc2626",
    lessons: [
      {
        id: "fsh-15",
        title: "Accessible Error Messaging",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A robust error-messaging pattern combines several pieces: `novalidate` on the form (to run custom JS validation instead of relying only on the browser's default popups), a visible error message with `role=\"alert\"` (so screen readers announce it immediately when it appears), and `aria-invalid`/`aria-describedby` on the input itself.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete accessible error pattern",
            content: `<form action="/submit" method="post" novalidate>
  <label for="email2">Email</label>
  <input
    type="email"
    id="email2"
    name="email2"
    required
    aria-describedby="email2-error"
    aria-invalid="true"
  >
  <p id="email2-error" role="alert">
    Please enter a valid email address, like name@example.com.
  </p>

  <button type="submit">Submit</button>
</form>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`role=\"alert\"` on the error message causes screen readers to announce it **immediately and automatically** as soon as it's added to the page (or becomes visible) — no focus change required, which matters a lot for errors that appear dynamically after a failed JavaScript-driven submission attempt.",
          },
          {
            type: "quiz",
            question: "Why does the error message use role=\"alert\" rather than a plain <p>?",
            options: [
              "role=\"alert\" is purely decorative and changes nothing",
              "role=\"alert\" causes assistive technology to announce the content immediately and automatically when it appears, without requiring the user to navigate to it manually",
              "It's required for the paragraph to display at all",
              "It only affects visual styling, not screen readers",
            ],
            answer: 1,
            explanation:
              "role=\"alert\" marks an element as a live region that gets announced immediately upon appearing/changing, which is exactly the behavior needed for validation errors that show up dynamically — the user needs to hear about them right away, not have to go hunting for them.",
          },
        ],
        challenge: {
          id: "fsh-15-challenge",
          language: "html",
          title: "Add a novalidate Error Pattern",
          description:
            "Add `novalidate` to the `<form>`, and add `aria-invalid=\"true\"` plus `aria-describedby=\"name-error\"` to the name input, matching an existing `<p id=\"name-error\" role=\"alert\">`.",
          starterCode: `<form action="/submit" method="post">
  <label for="name3">Name</label>
  <input type="text" id="name3" name="name3" required>
  <p id="name-error" role="alert">Name is required</p>
  <button type="submit">Submit</button>
</form>
`,
          solutionCode: `<form action="/submit" method="post" novalidate>
  <label for="name3">Name</label>
  <input type="text" id="name3" name="name3" required aria-invalid="true" aria-describedby="name-error">
  <p id="name-error" role="alert">Name is required</p>
  <button type="submit">Submit</button>
</form>`,
          tests: [
            { id: 1, label: "Form has novalidate", keywords: [{ pattern: "<form[^>]*novalidate" }] },
            { id: 2, label: "Input has aria-invalid=\"true\"", keywords: [{ pattern: "aria-invalid=\"true\"" }] },
            { id: 3, label: "Input references the error via aria-describedby", keywords: [{ pattern: "aria-describedby=\"name-error\"" }] },
          ],
        },
      },
      {
        id: "fsh-16",
        title: "Multi-Field Signup Form",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A well-built signup form combines everything so far: a `<fieldset>`/`<legend>` grouping, proper `<label>`s, appropriate `autocomplete` values (which let browsers offer to fill in saved info), `required` validation, and a checkbox for terms acceptance.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete, accessible multi-field signup form",
            content: `<form action="/signup" method="post">
  <fieldset>
    <legend>Create your account</legend>

    <label for="su-name">Full name</label>
    <input type="text" id="su-name" name="name" required autocomplete="name">

    <label for="su-email">Email</label>
    <input type="email" id="su-email" name="email" required autocomplete="email">

    <label for="su-password">Password</label>
    <input type="password" id="su-password" name="password" required autocomplete="new-password" minlength="8">

    <label>
      <input type="checkbox" name="terms" required>
      I agree to the Terms of Service
    </label>
  </fieldset>

  <button type="submit">Create Account</button>
</form>`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`autocomplete=\"new-password\"` (rather than `autocomplete=\"current-password\"`) specifically tells the browser this is a **signup** password field, discouraging it from auto-filling an existing saved password and instead often suggesting a strong, newly generated one.",
          },
          {
            type: "quiz",
            question: "What's the practical difference between autocomplete=\"new-password\" and autocomplete=\"current-password\"?",
            options: [
              "They're identical, purely cosmetic attributes",
              "new-password signals a signup/password-creation field (browsers may suggest a strong generated password); current-password signals a login field (browsers autofill the existing saved password)",
              "current-password only works with type=\"text\"",
              "new-password disables autofill entirely",
            ],
            answer: 1,
            explanation:
              "These autocomplete values tell the browser/password manager the field's specific purpose. new-password appropriately triggers strong-password suggestions for account creation, while current-password triggers autofilling an already-saved credential for logging into an existing account.",
          },
        ],
        challenge: {
          id: "fsh-16-challenge",
          language: "html",
          title: "Add Terms Acceptance",
          description:
            "Add a required checkbox labeled \"I agree to the Terms of Service\" (name=\"terms\") to the end of the signup fieldset.",
          starterCode: `<fieldset>
  <legend>Create your account</legend>
  <label for="su-email2">Email</label>
  <input type="email" id="su-email2" name="email" required autocomplete="email">
  <!-- add the terms checkbox here -->
</fieldset>
`,
          solutionCode: `<fieldset>
  <legend>Create your account</legend>
  <label for="su-email2">Email</label>
  <input type="email" id="su-email2" name="email" required autocomplete="email">
  <label>
    <input type="checkbox" name="terms" required>
    I agree to the Terms of Service
  </label>
</fieldset>`,
          tests: [
            { id: 1, label: "Adds a checkbox with name=\"terms\"", keywords: [{ pattern: "name=\"terms\"" }] },
            { id: 2, label: "Checkbox is required", keywords: [{ pattern: "type=\"checkbox\"[^>]*required" }] },
            { id: 3, label: "Includes the agreement text", keywords: [{ pattern: "Terms of Service" }] },
          ],
        },
      },
      {
        id: "fsh-17",
        title: "Capstone: Full Accessible Contact Form",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine everything from this course: semantic `<main>` wrapping, proper `<label>`s, `autocomplete` hints, a `<textarea>`, an ARIA-linked error message, a `<fieldset>`/`<legend>` radio group, and `:invalid` styling — one complete, real-world accessible contact form.",
          },
          {
            type: "code",
            lang: "html",
            label: "A complete accessible contact form",
            content: `<style>
  form { display: flex; flex-direction: column; gap: 12px; max-width: 400px; }
  label { font-weight: bold; }
  input, textarea { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
  input:invalid:not(:placeholder-shown), textarea:invalid:not(:placeholder-shown) {
    border-color: #d9534f;
  }
  .error-msg { color: #d9534f; font-size: 0.875rem; }
  button { padding: 10px; background: #4a90d9; color: #fff; border: none; border-radius: 4px; }
</style>

<main>
  <h1>Contact Us</h1>
  <form action="/contact" method="post" novalidate>
    <div>
      <label for="cf-name">Name</label>
      <input type="text" id="cf-name" name="name" required autocomplete="name">
    </div>

    <div>
      <label for="cf-email">Email</label>
      <input
        type="email"
        id="cf-email"
        name="email"
        required
        autocomplete="email"
        aria-describedby="cf-email-error"
      >
      <p id="cf-email-error" class="error-msg" role="alert">
        Please enter a valid email address.
      </p>
    </div>

    <div>
      <label for="cf-message">Message</label>
      <textarea id="cf-message" name="message" rows="5" required></textarea>
    </div>

    <fieldset>
      <legend>Preferred reply method</legend>
      <label><input type="radio" name="reply-method" value="email" checked> Email</label>
      <label><input type="radio" name="reply-method" value="phone"> Phone</label>
    </fieldset>

    <button type="submit">Send Message</button>
  </form>
</main>`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Every technique in this course shows up here for a reason: `<main>` for the landmark, `<label>` + `autocomplete` for usable inputs, `role=\"alert\"` for announced errors, `<fieldset>`/`<legend>` for the radio group, and `:invalid` styling for visual feedback — a genuinely production-ready pattern, not just a classroom example.",
          },
          {
            type: "quiz",
            question: "In this capstone form, what is the accessible name for the two radio buttons' group as a whole?",
            options: [
              "They have no group-level accessible name",
              "\"Preferred reply method\", provided by the <legend> inside their shared <fieldset>",
              "The word \"Email\", since it's the first option",
              "The <h1> \"Contact Us\" text",
            ],
            answer: 1,
            explanation:
              "The <legend> inside a <fieldset> provides the accessible name for the group of controls as a whole — screen readers announce it when a user tabs into any radio button within that fieldset, giving context ('Preferred reply method, Email, selected') beyond just the individual option label.",
          },
        ],
        challenge: {
          id: "fsh-17-challenge",
          language: "html",
          title: "Add a Phone Number Field",
          description:
            "Add a new optional phone field (`type=\"tel\"`, `id=\"cf-phone\"`, `name=\"phone\"`, `autocomplete=\"tel\"`) with a matching `<label>`, placed after the email field's wrapping `<div>`.",
          starterCode: `<div>
  <label for="cf-email">Email</label>
  <input type="email" id="cf-email" name="email" required autocomplete="email">
</div>
<!-- add the phone field div here -->
`,
          solutionCode: `<div>
  <label for="cf-email">Email</label>
  <input type="email" id="cf-email" name="email" required autocomplete="email">
</div>
<div>
  <label for="cf-phone">Phone</label>
  <input type="tel" id="cf-phone" name="phone" autocomplete="tel">
</div>`,
          tests: [
            { id: 1, label: "Adds a tel input", keywords: [{ pattern: "type=\"tel\"" }] },
            { id: 2, label: "Uses autocomplete=\"tel\"", keywords: [{ pattern: "autocomplete=\"tel\"" }] },
            { id: 3, label: "Has a matching label", keywords: [{ pattern: "for=\"cf-phone\"" }] },
          ],
        },
      },
    ],
  },
];

export const FORMS_SEMANTIC_HTML_CHAPTERS = RAW_FORMS_SEMANTIC_HTML_CHAPTERS;

export const FORMS_SEMANTIC_HTML_LESSONS = FORMS_SEMANTIC_HTML_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const FORMS_SEMANTIC_HTML_TOTAL_XP = FORMS_SEMANTIC_HTML_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
