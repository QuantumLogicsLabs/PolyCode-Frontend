// PolyCode — HTML & CSS Foundation course

import {
  quiz,
  callout,
  text,
  diagram,
  table,
  objectives,
} from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = "#0ea5e9";
const CSS_ACCENT = "#22c55e";

function htmlPage(title, styles, body) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
${styles}
    </style>
  </head>
  <body>
${body}
  </body>
</html>`;
}

function bootstrapPage(title, styles, body) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root { color-scheme: light; }
      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }
      .container { max-width: 960px; margin: 0 auto; padding: 24px; }
      .row { display: flex; flex-wrap: wrap; gap: 16px; }
      .col, .col-md-6 { flex: 1 1 280px; }
      .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border: 0; border-radius: .65rem; padding: .8rem 1.1rem; font-weight: 700; cursor: pointer; text-decoration: none; }
      .btn-primary { background: #0d6efd; color: #fff; }
      .btn-outline { background: #fff; color: #0f172a; border: 1px solid #cbd5e1; }
      .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 1rem; overflow: hidden; box-shadow: 0 8px 30px rgba(15,23,42,.08); }
      .card-body { padding: 1rem; }
      .card-title { margin: 0 0 .5rem; font-size: 1.15rem; }
      .card-text { color: #475569; }
      .nav { display: flex; gap: 1rem; list-style: none; padding: 0; margin: 0; }
      .nav a { color: inherit; text-decoration: none; }
      .form-control { width: 100%; padding: .75rem .9rem; border: 1px solid #cbd5e1; border-radius: .7rem; }
      .table { width: 100%; border-collapse: collapse; background: #fff; }
      .table th, .table td { padding: .75rem .9rem; border-bottom: 1px solid #e2e8f0; text-align: left; }
      .badge { display: inline-block; padding: .25rem .55rem; border-radius: 999px; background: #dbeafe; color: #1d4ed8; font-size: .8rem; font-weight: 700; }
      .text-center { text-align: center; }
      .text-muted { color: #64748b; }
      .shadow { box-shadow: 0 10px 25px rgba(15,23,42,.12); }
${styles}
    </style>
  </head>
  <body>
${body}
  </body>
</html>`;
}

function cssPage(title, styles, body) {
  return htmlPage(title, styles, body);
}

function lessonTemplate({ id, title, chapterTitle, chapterColor, theory, challenge }) {
  return { id, title, xp: 10, chapterTitle, chapterColor, theory, challenge };
}

const LESSON_HTML_0 = lessonTemplate({
  id: "html-0",
  title: "HTML basics, text, links, images",
  chapterTitle: "HTML Basics",
  chapterColor: ACCENT,
  theory: [
    objectives([
      "1.1 Introduction to HTML",
      "1.2 Basic HTML Elements",
      "1.3 Text Formatting",
      "1.4 Images",
    ]),
    text(
      "HTML gives a page its structure. Tags tell the browser where the heading, paragraph, link, and image content belongs.",
      {
        lang: "html",
        label: "Introduction to HTML",
        content: htmlPage("Introduction to HTML", `      body { margin: 0; font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      header, main, footer { max-width: 720px; margin: 0 auto 1rem; }\n      h1 { color: #0ea5e9; }`, `    <header>\n      <h1>HTML Basics</h1>\n    </header>\n    <main>\n      <p>HTML structures the page before CSS styles it.</p>\n      <p><strong>Semantic HTML</strong> improves accessibility and readability.</p>\n      <a href="https://polycode.example">Visit PolyCode</a>\n      <img src="https://placehold.co/600x240" alt="HTML basics illustration" />\n    </main>\n    <footer>© 2026 PolyCode</footer>`),
      },
    ),
    table("Core beginner HTML elements", ["Element", "Purpose", "Example"], [
      ["<h1>-<h6>", "Headings", "Page title and subtitles"],
      ["<p>", "Paragraphs", "Text blocks"],
      ["<a>", "Links", "Navigation"],
      ["<img>", "Images", "Pictures with alt text"],
    ]),
    callout("tip", "Always use `alt` text for meaningful images."),
    quiz("Which tag creates a hyperlink?", ["<img>", "<a>", "<p>", "<strong>"], 1, "`<a>` creates clickable links."),
  ],
  challenge: {
    id: "html-0-challenge",
    language: "html",
    title: "Build a simple HTML intro card",
    description: "Create a page with a heading, paragraph, link, formatted text, and image with alt text.",
    starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Basics</title>
  </head>
  <body>
    <!-- Add heading, paragraph, link, strong text, and image -->
  </body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Basics</title>
  </head>
  <body>
    <h1>HTML Basics</h1>
    <p>HTML structures content on the page.</p>
    <p><strong>Important:</strong> Use semantic tags.</p>
    <a href="https://polycode.example">Open PolyCode</a>
    <img src="https://placehold.co/600x240" alt="HTML basics illustration" />
  </body>
</html>
`,
    tests: [
      { id: 1, label: "Includes heading and paragraph", keywords: [{ pattern: "<h1[\\s>]", flags: "i" }, { pattern: "<p[\\s>]", flags: "i" }] },
      { id: 2, label: "Includes link and image", keywords: [{ pattern: "<a[\\s>]", flags: "i" }, { pattern: "<img[\\s>]", flags: "i" }] },
      { id: 3, label: "Uses alt text", keywords: [{ pattern: "alt=[\"']", flags: "i" }] },
    ],
  },
});

const LESSON_HTML_1 = lessonTemplate({
  id: "html-1",
  title: "Tables, lists, layouts, semantic HTML, multimedia",
  chapterTitle: "HTML Basics",
  chapterColor: ACCENT,
  theory: [
    objectives(["2.1 Lists", "2.2 Tables", "2.3 Containers", "Semantic HTML and multimedia"]),
    text(
      "Use lists to group items, tables for data, semantic containers for layout, and media tags for audio and video content.",
      {
        lang: "html",
        label: "Lists and tables",
        content: htmlPage("Lists and Tables", `      body { margin: 0; font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      section, table { max-width: 760px; margin: 0 auto 1rem; }\n      table { width: 100%; border-collapse: collapse; background: white; }\n      th, td { border: 1px solid #e2e8f0; padding: .75rem; text-align: left; }`, `    <section>\n      <h1>Lists and Tables</h1>\n      <ol>\n        <li>Plan content</li>\n        <li>Group related ideas</li>\n        <li>Use semantic layout</li>\n      </ol>\n      <ul>\n        <li>Apple</li>\n        <li>Banana</li>\n        <li>Cherry</li>\n      </ul>\n    </section>\n    <table>\n      <caption>Example data table</caption>\n      <thead><tr><th>Topic</th><th>Meaning</th></tr></thead>\n      <tbody><tr><td>Lists</td><td>Group items</td></tr><tr><td>Tables</td><td>Show data</td></tr></tbody>\n    </table>`),
      },
    ),
    text("Semantic containers like `<section>`, `<article>`, and `<aside>` make page regions clearer."),
    text("Use `<audio>` and `<video>` with controls for multimedia."),
    table("HTML growth path", ["Topic", "Core tags", "What you learn"], [
      ["Lists", "<ul>, <ol>, <li>, <dl>", "Group related items"],
      ["Tables", "<table>, <thead>, <tbody>, <th>, <td>", "Present data clearly"],
      ["Containers", "<section>, <article>, <aside>", "Organize page regions"],
      ["Multimedia", "<audio>, <video>, <source>", "Embed media"],
    ]),
    callout("info", "Use captions, headings, and semantic sections to keep content accessible."),
    quiz("Which element is best for a list where order matters?", ["<ul>", "<ol>", "<table>", "<section>"], 1, "`<ol>` is ordered.")
  ],
  challenge: {
    id: "html-1-challenge",
    language: "html",
    title: "Build a structured content page",
    description: "Create a page with an ordered list, unordered list, table, and a semantic section.",
    starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Structured Content</title>
  </head>
  <body>
    <!-- Add lists, a table, and a semantic section -->
  </body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Structured Content</title>
  </head>
  <body>
    <section>
      <h1>Study Plan</h1>
      <ol>
        <li>Learn lists</li>
        <li>Learn tables</li>
        <li>Learn layouts</li>
      </ol>
    </section>
    <table>
      <thead>
        <tr><th>Topic</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>Lists</td><td>Done</td></tr>
      </tbody>
    </table>
    <ul>
      <li>Semantic HTML</li>
      <li>Multimedia</li>
    </ul>
  </body>
</html>
`,
    tests: [
      { id: 1, label: "Includes ordered list", keywords: [{ pattern: "<ol[\\s>]", flags: "i" }] },
      { id: 2, label: "Includes table header", keywords: [{ pattern: "<th[\\s>]", flags: "i" }] },
      { id: 3, label: "Includes semantic section", keywords: [{ pattern: "<section[\\s>]", flags: "i" }] },
    ],
  },
});

const LESSON_HTML_5 = lessonTemplate({
  id: "html-5",
  title: "Forms, input types, graphics, APIs, modern HTML",
  chapterTitle: "HTML Basics",
  chapterColor: ACCENT,
  theory: [
    objectives(["3.1 HTML Forms", "3.2 Input Elements", "3.4 HTML APIs", "Graphics and modern HTML"]),
    text(
      "Forms collect user data, input types improve validation, SVG and canvas handle graphics, and browser APIs extend what HTML pages can do.",
      {
        lang: "html",
        label: "Forms and inputs",
        content: htmlPage("Forms and Inputs", `      body { margin: 0; font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      form { max-width: 520px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }\n      label { display: block; margin-top: .75rem; margin-bottom: .35rem; font-weight: 700; }\n      input, button { width: 100%; padding: .75rem .9rem; border-radius: .7rem; border: 1px solid #cbd5e1; }\n      button { margin-top: 1rem; background: #0ea5e9; color: white; border: 0; }`, `    <form action="/submit" method="post">\n      <label for="name">Name</label>\n      <input id="name" name="name" type="text" required />\n      <label for="email">Email</label>\n      <input id="email" name="email" type="email" required />\n      <label for="startDate">Start date</label>\n      <input id="startDate" name="startDate" type="date" />\n      <button type="submit">Submit</button>\n    </form>`),
      },
    ),
    text("Use `text`, `email`, `password`, `number`, `date`, `checkbox`, `radio`, and `file` input types where appropriate."),
    text("SVG and canvas let you create graphics directly in the page."),
    text("HTML APIs like `fetch`, `localStorage`, and geolocation add browser-powered features."),
    table("Forms to modern HTML map", ["Area", "Main tags/APIs", "Use case"], [
      ["Forms", "<form>, <label>, <button>", "Collect input"],
      ["Input types", "<input type=...>", "Better UX and validation"],
      ["Graphics", "<svg>, <canvas>", "Icons, charts, drawings"],
      ["APIs", "fetch, localStorage, geolocation", "Browser features"],
    ]),
    callout("tip", "Always pair inputs with labels and use the correct input type."),
    quiz("Which input type validates email format?", ["text", "number", "email", "password"], 2, "`type=\"email\"` helps with validation.")
  ],
  challenge: {
    id: "html-5-challenge",
    language: "html",
    title: "Build a modern form section",
    description: "Create a form with text and email inputs, a submit button, an SVG, and a `fetch` example.",
    starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Modern Form</title>
  </head>
  <body>
    <!-- Add a form, inputs, SVG, and fetch example -->
  </body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Modern Form</title>
  </head>
  <body>
    <form>
      <label for="name">Name</label>
      <input id="name" type="text" />
      <label for="email">Email</label>
      <input id="email" type="email" />
      <button type="submit">Send</button>
    </form>
    <svg width="120" height="40" aria-label="simple graphic" role="img"><rect width="120" height="40" fill="#0ea5e9" /></svg>
    <script>
      fetch("/api/ping").then(() => console.log("ready"));
    </script>
  </body>
</html>
`,
    tests: [
      { id: 1, label: "Includes form and labels", keywords: [{ pattern: "<form[\\s>]", flags: "i" }, { pattern: "<label[\\s>]", flags: "i" }] },
      { id: 2, label: "Includes text and email inputs", keywords: [{ pattern: 'type="text"', flags: "i" }, { pattern: 'type="email"', flags: "i" }] },
      { id: 3, label: "Includes SVG and fetch", keywords: [{ pattern: "<svg[\\s>]", flags: "i" }, { pattern: "fetch\\(", flags: "i" }] },
    ],
  },
});

const CSS_LESSONS = [
  lessonTemplate({
    id: "css-0",
    title: "Introduction to CSS",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Explain what CSS does", "Connect CSS to HTML", "Understand the cascade"]),
      text(
        "CSS separates presentation from structure. You can style elements with external stylesheets, embedded `<style>` tags, or inline styles.",
        {
          lang: "html",
          label: "CSS in a page",
          content: cssPage("Introduction to CSS", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }\n      h1 { color: #16a34a; }\n      p { max-width: 42rem; line-height: 1.7; }`, `    <main>\n      <h1>CSS adds style to HTML</h1>\n      <p>CSS controls presentation, spacing, and visual design.</p>\n    </main>`),
      },
    ),
    table("Core idea", ["Part", "Meaning", "Example"], [["Selector", "Target", "body"], ["Property", "Style name", "color"], ["Value", "Assigned style", "#111"]]),
    callout("tip", "Start with a small stylesheet and grow it as the page becomes more complex."),
    quiz("Which file extension is used for a stylesheet?", [".html", ".css", ".js", ".json"], 1, "CSS files usually use the .css extension."),
    ],
    challenge: {
      id: "css-0-challenge",
      language: "css",
      title: "Add a body stylesheet",
      description: "Write CSS for the body that sets a font family and text color.",
      starterCode: `body {
  /* Set font-family and color */
}
`,
      solutionCode: `body {
  font-family: system-ui, sans-serif;
  color: #111827;
}
`,
      tests: [
        { id: 1, label: "Uses body selector", keywords: [{ pattern: "body\\s*\\{" }] },
        { id: 2, label: "Sets font-family", keywords: [{ pattern: "font-family:", flags: "i" }] },
        { id: 3, label: "Sets color", keywords: [{ pattern: "color:\\s*#111827", flags: "i" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-1",
    title: "CSS Syntax",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Learn selector, property, and value syntax", "Use curly braces correctly", "Write valid CSS rules"]),
      text(
        "A CSS rule has a selector, then declarations inside braces. Each declaration has a property and a value.",
        {
          lang: "html",
          label: "CSS syntax example",
          content: htmlPage("CSS Syntax", `      body { margin: 0; font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .demo { color: #0f172a; background: #e2e8f0; padding: 1rem; border-radius: .75rem; }\n      /* selector, property, value */`, `    <main>\n      <h1>CSS Syntax</h1>\n      <p class="demo">CSS syntax uses selectors, braces, properties, and values.</p>\n    </main>`),
      },
    ),
    table("Syntax checklist", ["Part", "Example", "Purpose"], [["Selector", ".demo", "Choose element"], ["Property", "color", "What changes"], ["Value", "#0f172a", "Result"]]),
    callout("info", "Keep your CSS declarations inside `{}` and end each property with a semicolon."),
    quiz("Which part of a rule changes text color?", ["Selector", "Property", "Value", "Comment"], 1, "The property name controls the style being changed."),
    ],
    challenge: {
      id: "css-1-challenge",
      language: "css",
      title: "Write a valid CSS rule",
      description: "Write a `.demo` rule that sets text color, background, padding, and border-radius.",
      starterCode: `.demo {
  /* Add styles here */
}
`,
      solutionCode: `.demo {
  color: #0f172a;
  background: #e2e8f0;
  padding: 1rem;
  border-radius: 0.75rem;
}
`,
      tests: [
        { id: 1, label: "Defines .demo selector", keywords: [{ pattern: "\\.demo\\s*\\{" }] },
        { id: 2, label: "Sets color", keywords: [{ pattern: "color:", flags: "i" }] },
        { id: 3, label: "Sets padding and border-radius", keywords: [{ pattern: "padding:", flags: "i" }, { pattern: "border-radius:", flags: "i" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-2",
    title: "CSS Selectors",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Target elements with tag, class, and id selectors", "Use descendant selectors", "Choose the right selector for the job"]),
      text(
        "Selectors decide which HTML elements receive styles. Classes are reusable, ids are unique, and descendant selectors target elements inside other elements.",
        {
          lang: "html",
          label: "Selector examples",
          content: htmlPage("CSS Selectors", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      #featured { border-left: 6px solid #22c55e; padding-left: 1rem; }\n      .card { background: white; border: 1px solid #cbd5e1; padding: 1rem; border-radius: 1rem; }\n      article p { color: #334155; }`, `    <main>\n      <section id="featured" class="card">\n        <h1>Selector demo</h1>\n        <article><p>Selectors choose which HTML elements receive styles.</p></article>\n      </section>\n    </main>`),
      },
    ),
    table("Selector types", ["Selector", "Targets", "Use"], [["Tag", "p", "All paragraphs"], ["Class", ".card", "Reusable styles"], ["Id", "#hero", "Unique block"]]),
    callout("tip", "Prefer classes for reusable styling and ids only for unique page regions."),
    quiz("Which selector is reusable across multiple elements?", ["#hero", ".card", "body > p", "article p"], 1, "Class selectors are reusable."),
    ],
    challenge: {
      id: "css-2-challenge",
      language: "css",
      title: "Style a featured section",
      description: "Write CSS that styles a featured section, a card class, and paragraphs inside articles.",
      starterCode: `#featured {
  /* Add border-left and padding */
}

.card {
  /* Add border and background */
}
`,
      solutionCode: `#featured {
  border-left: 6px solid #22c55e;
  padding-left: 1rem;
}

.card {
  background: white;
  border: 1px solid #cbd5e1;
  padding: 1rem;
  border-radius: 1rem;
}

article p {
  color: #334155;
}
`,
      tests: [
        { id: 1, label: "Styles #featured", keywords: [{ pattern: "#featured" }] },
        { id: 2, label: "Styles .card", keywords: [{ pattern: "\\.card" }] },
        { id: 3, label: "Styles article p", keywords: [{ pattern: "article\\s+p" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-3",
    title: "Colors & Backgrounds",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Use named, hex, and gradient colors", "Style page backgrounds", "Create visual contrast"]),
      text(
        "Colors and backgrounds control mood and readability. Gradients and layered backgrounds can make a page feel more polished and modern.",
        {
          lang: "html",
          label: "Color and background demo",
          content: htmlPage("Colors & Backgrounds", `      body { margin: 0; font-family: system-ui, sans-serif; padding: 2rem; background: linear-gradient(135deg, #0f172a, #1d4ed8); color: white; }\n      .panel { background: rgba(255,255,255,.12); backdrop-filter: blur(8px); padding: 1.25rem; border-radius: 1rem; }`, `    <main class="panel">\n      <h1>Color contrast and backgrounds</h1>\n      <p>Use gradients and contrast for a clear visual hierarchy.</p>\n    </main>`),
      },
    ),
    table("Color options", ["Type", "Example", "When to use"], [["Hex", "#0ea5e9", "Brand colors"], ["RGB", "rgb(14,165,233)", "Computed colors"], ["Gradient", "linear-gradient(...)", "Background surfaces"]]),
    callout("info", "Make sure text contrast remains readable over colored backgrounds."),
    quiz("Which value creates a gradient background?", ["#0ea5e9", "linear-gradient(...)", "inherit", "transparent"], 1, "`linear-gradient(...)` creates a gradient."),
    ],
    challenge: {
      id: "css-3-challenge",
      language: "css",
      title: "Style a gradient hero",
      description: "Write CSS for a hero section with a gradient background, white text, and a translucent panel.",
      starterCode: `.hero {
  /* Add gradient, text color, and padding */
}

.panel {
  /* Add translucent background */
}
`,
      solutionCode: `.hero {
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  color: white;
  padding: 2rem;
}

.panel {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  padding: 1.25rem;
  border-radius: 1rem;
}
`,
      tests: [
        { id: 1, label: "Uses gradient background", keywords: [{ pattern: "linear-gradient" }] },
        { id: 2, label: "Sets text color", keywords: [{ pattern: "color:\\s*white" }] },
        { id: 3, label: "Uses translucent panel", keywords: [{ pattern: "rgba\\(" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-4",
    title: "The Box Model",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Understand content, padding, border, and margin", "Control spacing with box model properties", "Debug layout spacing issues"]),
      text(
        "The box model explains how elements take up space on the page. Content sits in the center, then padding, border, and margin build outward.",
        {
          lang: "html",
          label: "Box model demo",
          content: htmlPage("The Box Model", `      body { margin: 0; font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .box { width: min(100%, 420px); margin: 24px auto; border: 2px solid #0f172a; padding: 24px; background: white; border-radius: 1rem; }`, `    <main class="box">\n      <h1>Box model demo</h1>\n      <p>Padding lives inside the border, margin lives outside it.</p>\n    </main>`),
      },
    ),
    diagram("CSS box model", [
      { id: "margin", label: "margin", color: "#f59e0b", items: ["Space outside the element"] },
      { id: "border", label: "border", color: "#0ea5e9", items: ["Visible edge around content"] },
      { id: "padding", label: "padding", color: "#22c55e", items: ["Space inside border"] },
      { id: "content", label: "content", color: "#7c3aed", items: ["Text or media"] },
    ]),
    callout("tip", "Use the box model to balance content and whitespace."),
    quiz("Which property adds space inside the border?", ["margin", "padding", "display", "position"], 1, "Padding sits inside the border."),
    ],
    challenge: {
      id: "css-4-challenge",
      language: "css",
      title: "Style a content box",
      description: "Create a `.box` rule with width, margin, border, and padding.",
      starterCode: `.box {
  /* Add width, margin, border, padding */
}
`,
      solutionCode: `.box {
  width: min(100%, 420px);
  margin: 24px auto;
  border: 2px solid #0f172a;
  padding: 24px;
}
`,
      tests: [
        { id: 1, label: "Sets width", keywords: [{ pattern: "width:" }] },
        { id: 2, label: "Sets border", keywords: [{ pattern: "border:" }] },
        { id: 3, label: "Sets padding and margin", keywords: [{ pattern: "padding:" }, { pattern: "margin:" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-5",
    title: "Text & Fonts",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Style readable text", "Choose font families", "Control line height and emphasis"]),
      text(
        "Typography controls how easy text is to scan. Font family, size, weight, and line height all shape readability.",
        {
          lang: "html",
          label: "Typography example",
          content: htmlPage("Text & Fonts", `      body { margin: 0; padding: 2rem; font-family: Inter, system-ui, sans-serif; line-height: 1.7; color: #111827; background: #f8fafc; }\n      h1 { font-size: 2.5rem; letter-spacing: -.04em; }\n      .lead { max-width: 42rem; }`, `    <main>\n      <h1>Readable typography</h1>\n      <p class="lead">Text and fonts control readability through size, weight, line height, and family choices.</p>\n    </main>`),
      },
    ),
    table("Text properties", ["Property", "Use", "Example"], [["font-family", "Choose typeface", "system-ui"], ["font-size", "Scale text", "1.2rem"], ["line-height", "Improve readability", "1.7"]]),
    callout("info", "Use enough spacing and contrast for comfortable reading."),
    quiz("Which property improves line spacing?", ["line-height", "display", "position", "overflow"], 0, "`line-height` improves spacing between lines."),
    ],
    challenge: {
      id: "css-5-challenge",
      language: "css",
      title: "Style readable text",
      description: "Write CSS to set font family, line height, and heading size for a content page.",
      starterCode: `body {
  /* Add font-family and line-height */
}

h1 {
  /* Add a larger heading size */
}
`,
      solutionCode: `body {
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.7;
  color: #111827;
}

h1 {
  font-size: 2.5rem;
  letter-spacing: -0.04em;
}
`,
      tests: [
        { id: 1, label: "Styles body font", keywords: [{ pattern: "font-family:" }] },
        { id: 2, label: "Sets line-height", keywords: [{ pattern: "line-height:" }] },
        { id: 3, label: "Styles h1", keywords: [{ pattern: "h1" }, { pattern: "font-size:" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-6",
    title: "Basic Styling",
    chapterTitle: "CSS Fundamentals",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Combine simple rules into polished components", "Style buttons and cards", "Add hover states"]),
      text(
        "Basic styling is the point where small CSS rules turn into usable components like buttons, cards, and labels.",
        {
          lang: "html",
          label: "Basic styling example",
          content: htmlPage("Basic Styling", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .btn { display: inline-block; background: #2563eb; color: white; padding: .8rem 1.1rem; border-radius: .75rem; text-decoration: none; box-shadow: 0 8px 20px rgba(37,99,235,.25); }\n      .btn:hover { background: #1d4ed8; }`, `    <main>\n      <h1>Basic styling example</h1>\n      <a class="btn" href="#">Click me</a>\n    </main>`),
      },
    ),
    callout("tip", "Start with one component and reuse the same visual pattern across the page."),
    quiz("What should a hover state do?", ["Remove styles", "Show interaction feedback", "Hide text", "Break layout"], 1, "Hover states show interaction feedback."),
    ],
    challenge: {
      id: "css-6-challenge",
      language: "css",
      title: "Style a button",
      description: "Write CSS for a button with background, text color, padding, border-radius, and hover state.",
      starterCode: `.btn {
  /* Add button styles */
}

.btn:hover {
  /* Add hover styles */
}
`,
      solutionCode: `.btn {
  display: inline-block;
  background: #2563eb;
  color: white;
  padding: .8rem 1.1rem;
  border-radius: .75rem;
  text-decoration: none;
}

.btn:hover {
  background: #1d4ed8;
}
`,
      tests: [
        { id: 1, label: "Styles .btn", keywords: [{ pattern: "\\.btn" }] },
        { id: 2, label: "Has hover state", keywords: [{ pattern: ":hover" }] },
        { id: 3, label: "Sets background and padding", keywords: [{ pattern: "background:" }, { pattern: "padding:" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-7",
    title: "Display & Visibility",
    chapterTitle: "CSS Layout & Positioning",
    chapterColor: CSS_ACCENT,
    theory: [
      objectives(["Use display values", "Hide elements correctly", "Understand visibility versus display"]),
      text("Display and visibility control whether an element participates in layout, stays visible, or is hidden from sight.", {
        lang: "html",
        label: "Display demo",
        content: htmlPage("Display & Visibility", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .inline { display: inline-block; background: #dbeafe; padding: .5rem .8rem; margin: .25rem; }\n      .hidden { visibility: hidden; }`, `    <main>\n      <span class="inline">Inline block</span>\n      <span class="inline hidden">Hidden text</span>\n      <p>Display and visibility control layout behavior.</p>\n    </main>`),
      }),
      callout("info", "`display: none` removes an element from layout; `visibility: hidden` keeps its space."),
      quiz("Which property removes an element from layout?", ["visibility: hidden", "display: none", "opacity: 0", "position: static"], 1, "`display: none` removes it from layout."),
    ],
    challenge: {
      id: "css-7-challenge",
      language: "css",
      title: "Toggle visibility styles",
      description: "Write CSS to make one element inline-block and another hidden.",
      starterCode: `.inline {
  /* display */
}

.hidden {
  /* visibility */
}
`,
      solutionCode: `.inline {
  display: inline-block;
}

.hidden {
  visibility: hidden;
}
`,
      tests: [
        { id: 1, label: "Sets display", keywords: [{ pattern: "display:" }] },
        { id: 2, label: "Sets visibility", keywords: [{ pattern: "visibility:" }] },
      ],
    },
  }),
  lessonTemplate({ id: "css-8", title: "Positioning Elements", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Use relative, absolute, fixed, and sticky positioning"]), text("Positioning controls where an element sits relative to the normal flow.", { lang: "html", label: "Positioning demo", content: htmlPage("Positioning Elements", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .card { position: relative; background: white; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 1rem; width: min(100%, 420px); }\n      .badge { position: absolute; top: -10px; right: -10px; background: #ef4444; color: white; padding: .3rem .55rem; border-radius: 999px; }`, `    <main class="card">\n      <span class="badge">New</span>\n      <h1>Positioning demo</h1>\n      <p>Positioning determines how elements are placed relative to the normal flow.</p>\n    </main>`)}), callout("tip", "Use relative positioning on the container and absolute positioning for overlays."), quiz("Which value positions an element relative to its nearest positioned ancestor?", ["static", "relative", "absolute", "sticky"], 2, "Absolute positioning uses the nearest positioned ancestor." )], challenge: { id: "css-8-challenge", language: "css", title: "Position a badge", description: "Create CSS for a card with an absolutely positioned badge.", starterCode: `.card {\n  /* position relative */\n}\n.badge {\n  /* position absolute */\n}\n`, solutionCode: `.card { position: relative; }\n.badge { position: absolute; top: -10px; right: -10px; }\n`, tests: [{ id: 1, label: "Card is relative", keywords: [{ pattern: "position:\\s*relative", flags: "i" }] }, { id: 2, label: "Badge is absolute", keywords: [{ pattern: "position:\\s*absolute", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-9", title: "Alignment & Spacing", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Align items and distribute space", "Use gap, padding, and margins"]), text("Spacing and alignment keep layout balanced and readable.", { lang: "html", label: "Alignment demo", content: htmlPage("Alignment & Spacing", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; background: white; border: 1px solid #e2e8f0; padding: 1rem 1.25rem; border-radius: 1rem; }`, `    <main class="bar">\n      <strong>Aligned items</strong>\n      <span>Spacing demo</span>\n    </main>`)}), callout("tip", "Use gaps for internal spacing and margins for spacing between blocks."), quiz("Which property adds space between flex items?", ["gap", "float", "clear", "overflow"], 0, "`gap` adds space between flex items.")], challenge: { id: "css-9-challenge", language: "css", title: "Align a toolbar", description: "Write CSS for a toolbar with space-between alignment and gap spacing.", starterCode: `.toolbar {\n  /* display flex, align-items, justify-content, gap */\n}\n`, solutionCode: `.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n`, tests: [{ id: 1, label: "Uses flex", keywords: [{ pattern: "display:\\s*flex", flags: "i" }] }, { id: 2, label: "Aligns items", keywords: [{ pattern: "align-items:", flags: "i" }, { pattern: "justify-content:", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-10", title: "Lists & Tables", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Style lists and tables"]), text("Styled lists and tables make structured content easier to scan.", { lang: "html", label: "Lists and tables", content: htmlPage("Lists & Tables", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      table { width: 100%; border-collapse: collapse; background: white; }\n      th, td { border: 1px solid #e2e8f0; padding: .75rem; text-align: left; }`, `    <main>\n      <ul>\n        <li>Apple</li>\n        <li>Banana</li>\n      </ul>\n      <table>\n        <thead><tr><th>Label</th><th>Value</th></tr></thead>\n        <tbody><tr><td>Rows</td><td>Styled</td></tr></tbody>\n      </table>\n    </main>`)}), callout("info", "Keep table headers clear and consistent."), quiz("Which property collapses table borders?", ["border-spacing", "border-collapse", "display", "padding"], 1, "`border-collapse: collapse;` merges borders." )], challenge: { id: "css-10-challenge", language: "css", title: "Style a table", description: "Create CSS that styles a table with collapsed borders and cell padding.", starterCode: `table {\n  /* border-collapse */\n}\nth, td {\n  /* padding and border */\n}\n`, solutionCode: `table { border-collapse: collapse; width: 100%; }\nth, td { border: 1px solid #e2e8f0; padding: .75rem; }\n`, tests: [{ id: 1, label: "Collapses borders", keywords: [{ pattern: "border-collapse:\\s*collapse", flags: "i" }] }, { id: 2, label: "Adds cell padding", keywords: [{ pattern: "padding:\\s*\\.75rem", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-11", title: "Navigation & Forms", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Style nav bars and form controls"]), text("Navigation and forms need clear spacing, states, and usable touch targets.", { lang: "html", label: "Navigation and forms", content: htmlPage("Navigation & Forms", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      nav { display: flex; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e2e8f0; border-radius: 1rem; margin-bottom: 1rem; }\n      input, button { padding: .75rem .9rem; border-radius: .7rem; border: 1px solid #cbd5e1; }`, `    <main>\n      <nav><a href="#">Home</a><a href="#">Docs</a></nav>\n      <form>\n        <input type="text" placeholder="Your name" />\n        <button type="submit">Send</button>\n      </form>\n    </main>`)}), callout("tip", "Make links and inputs easy to click and read."), quiz("Which CSS property is useful for horizontal nav spacing?", ["gap", "float", "clear", "clip-path"], 0, "`gap` helps space nav items.")], challenge: { id: "css-11-challenge", language: "css", title: "Style a nav bar and form", description: "Write CSS for a navigation bar and a basic input/button form.", starterCode: `nav {\n  /* flex and gap */\n}\ninput, button {\n  /* padding and border */\n}\n`, solutionCode: `nav { display: flex; gap: 1rem; }\ninput, button { padding: .75rem .9rem; border: 1px solid #cbd5e1; border-radius: .7rem; }\n`, tests: [{ id: 1, label: "Uses flex nav", keywords: [{ pattern: "display:\\s*flex", flags: "i" }] }, { id: 2, label: "Styles controls", keywords: [{ pattern: "border-radius:", flags: "i" }, { pattern: "padding:", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-12", title: "Flexbox", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Align items in one dimension", "Use flex grow and gap"]), text("Flexbox is ideal for one-dimensional alignment and distribution.", { lang: "html", label: "Flexbox demo", content: htmlPage("Flexbox", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .row { display: flex; gap: 1rem; }\n      .card { flex: 1; background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="row">\n      <div class="card"><h1>Left</h1></div>\n      <div class="card"><h1>Right</h1></div>\n    </main>`)}), callout("info", "Use flexbox when content should flow in a single row or column."), quiz("Which property creates a flex container?", ["display: flex", "position: flex", "float: flex", "layout: flex"], 0, "`display: flex` creates a flex container.")], challenge: { id: "css-12-challenge", language: "css", title: "Build a flex row", description: "Write CSS that creates a two-column flex layout with gap spacing.", starterCode: `.row {\n  /* display flex and gap */\n}\n.card {\n  /* flex */\n}\n`, solutionCode: `.row { display: flex; gap: 1rem; }\n.card { flex: 1; }\n`, tests: [{ id: 1, label: "Uses flex container", keywords: [{ pattern: "display:\\s*flex", flags: "i" }] }, { id: 2, label: "Uses flex child growth", keywords: [{ pattern: "flex:\\s*1", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-13", title: "CSS Grid", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Create rows and columns", "Use grid template columns"]), text("CSS Grid is ideal for two-dimensional layouts with rows and columns.", { lang: "html", label: "Grid demo", content: htmlPage("CSS Grid", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }\n      .tile { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="grid">\n      <div class="tile">1</div>\n      <div class="tile">2</div>\n      <div class="tile">3</div>\n      <div class="tile">4</div>\n    </main>`)}), callout("info", "Use grid when content needs rows and columns at the same time."), quiz("Which property defines the columns in grid?", ["grid-auto-flow", "grid-template-columns", "display", "align-content"], 1, "`grid-template-columns` defines columns.")], challenge: { id: "css-13-challenge", language: "css", title: "Build a grid gallery", description: "Write CSS that creates a two-column grid layout.", starterCode: `.grid {\n  /* display grid and template columns */\n}\n`, solutionCode: `.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }\n`, tests: [{ id: 1, label: "Uses grid", keywords: [{ pattern: "display:\\s*grid", flags: "i" }] }, { id: 2, label: "Defines columns", keywords: [{ pattern: "grid-template-columns:", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-14", title: "Website Layout", chapterTitle: "CSS Layout & Positioning", chapterColor: CSS_ACCENT, theory: [objectives(["Combine sections into a full page layout"]), text("Website layout combines sections, containers, and responsive areas into a full page.", { lang: "html", label: "Layout demo", content: htmlPage("Website Layout", `      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .layout { min-height: 100vh; display: grid; grid-template-columns: 220px 1fr; grid-template-rows: auto 1fr auto; }\n      header, aside, main, footer { padding: 1rem; }\n      header, footer { grid-column: 1 / -1; background: #0f172a; color: white; }\n      aside { background: #e2e8f0; }\n      main { background: white; }`, `    <div class="layout">\n      <header>Header</header>\n      <aside>Sidebar</aside>\n      <main>Website layout combines sections, containers, and responsive areas into a full page.</main>\n      <footer>Footer</footer>\n    </div>`)}), callout("tip", "Break the page into clear regions before adding spacing and alignment."), quiz("Which layout system is used for rows and columns here?", ["float", "grid", "table", "inline"], 1, "Grid is a two-dimensional layout system.")], challenge: { id: "css-14-challenge", language: "css", title: "Create a page layout", description: "Write CSS for a page layout with header, sidebar, main area, and footer.", starterCode: `.layout {\n  /* grid layout */\n}\nheader, footer {\n  /* span full width */\n}\n`, solutionCode: `.layout { display: grid; grid-template-columns: 220px 1fr; grid-template-rows: auto 1fr auto; min-height: 100vh; }\nheader, footer { grid-column: 1 / -1; }\n`, tests: [{ id: 1, label: "Uses grid layout", keywords: [{ pattern: "display:\\s*grid", flags: "i" }] }, { id: 2, label: "Spans header and footer", keywords: [{ pattern: "grid-column:", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-15", title: "Visual Effects", chapterTitle: "Advanced CSS", chapterColor: "#8b5cf6", theory: [objectives(["Use shadows, filters, and gradients"]), text("Visual effects use shadows, filters, and gradients to add depth.", { lang: "html", label: "Visual effects demo", content: htmlPage("Visual Effects", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .card { background: white; box-shadow: 0 20px 40px rgba(15,23,42,.15); filter: saturate(1.05); border-radius: 1rem; padding: 1.25rem; }`, `    <main class="card">\n      <h1>Depth and shadow</h1>\n      <p>Visual effects use shadows, filters, and gradients to add depth.</p>\n    </main>`)}), callout("tip", "Use effects sparingly to support clarity."), quiz("Which property adds a drop shadow?", ["box-shadow", "text-align", "padding", "overflow"], 0, "`box-shadow` creates shadows.")], challenge: { id: "css-15-challenge", language: "css", title: "Style a shadow card", description: "Write CSS to add a shadow and border radius to a card.", starterCode: `.card {\n  /* shadow and radius */\n}\n`, solutionCode: `.card { box-shadow: 0 20px 40px rgba(15,23,42,.15); border-radius: 1rem; }\n`, tests: [{ id: 1, label: "Uses box-shadow", keywords: [{ pattern: "box-shadow:", flags: "i" }] }, { id: 2, label: "Uses border-radius", keywords: [{ pattern: "border-radius:", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-16", title: "Images & Media", chapterTitle: "Advanced CSS", chapterColor: "#8b5cf6", theory: [objectives(["Scale media correctly", "Preserve aspect ratio"]), text("Images and media should scale cleanly and preserve aspect ratio.", { lang: "html", label: "Media demo", content: htmlPage("Images & Media", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      img, video { width: 100%; max-width: 640px; height: auto; border-radius: 1rem; object-fit: cover; }`, `    <main>\n      <img src="https://placehold.co/960x540" alt="Responsive sample" />\n      <p>Images and media should scale cleanly and preserve aspect ratio.</p>\n    </main>`)}), callout("info", "Use `width: 100%` and `height: auto` for responsive media."), quiz("Which property helps images scale proportionally?", ["width: 100%", "height: 100%", "position: fixed", "float"], 0, "Use width: 100% and height: auto.")], challenge: { id: "css-16-challenge", language: "css", title: "Make media responsive", description: "Write CSS so images and videos scale with their container.", starterCode: `img, video {\n  /* responsive media */\n}\n`, solutionCode: `img, video { width: 100%; height: auto; max-width: 100%; }\n`, tests: [{ id: 1, label: "Sets width", keywords: [{ pattern: "width:\\s*100%", flags: "i" }] }, { id: 2, label: "Sets height auto", keywords: [{ pattern: "height:\\s*auto", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-17", title: "Transforms", chapterTitle: "Advanced CSS", chapterColor: "#8b5cf6", theory: [objectives(["Move, rotate, scale, and skew elements"]), text("Transforms move, rotate, scale, and skew elements in 2D or 3D space.", { lang: "html", label: "Transform demo", content: htmlPage("Transforms", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .tile { width: 180px; height: 180px; background: linear-gradient(135deg, #22c55e, #0ea5e9); color: white; display: grid; place-items: center; border-radius: 1rem; transform: rotate(-3deg); }\n      .tile:hover { transform: rotate(0deg) scale(1.03); }`, `    <main class="tile">Transform</main>`)}), callout("tip", "Pair transforms with subtle hover states."), quiz("Which property rotates an element?", ["transform", "transition", "animation", "filter"], 0, "Rotation is part of `transform`." )], challenge: { id: "css-17-challenge", language: "css", title: "Rotate a tile", description: "Write CSS that rotates and scales a tile on hover.", starterCode: `.tile {\n  /* initial transform */\n}\n.tile:hover {\n  /* hover transform */\n}\n`, solutionCode: `.tile { transform: rotate(-3deg); }\n.tile:hover { transform: rotate(0deg) scale(1.03); }\n`, tests: [{ id: 1, label: "Uses transform", keywords: [{ pattern: "transform:", flags: "i" }] }, { id: 2, label: "Uses hover state", keywords: [{ pattern: ":hover" }] }] } }),
  lessonTemplate({ id: "css-18", title: "Transitions", chapterTitle: "Advanced CSS", chapterColor: "#8b5cf6", theory: [objectives(["Animate property changes smoothly"]), text("Transitions smooth changes between states such as hover and focus.", { lang: "html", label: "Transition demo", content: htmlPage("Transitions", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .btn { display: inline-block; background: #1d4ed8; color: white; padding: .9rem 1.1rem; border-radius: .75rem; transition: transform .2s ease, background .2s ease; }\n      .btn:hover { transform: translateY(-2px); background: #2563eb; }`, `    <main>\n      <a class="btn" href="#">Hover me</a>\n    </main>`)}), callout("info", "Transitions are best for simple interactive changes."), quiz("Which property defines how long the change takes?", ["transition-duration", "transform", "box-shadow", "border"], 0, "`transition-duration` controls the timing." )], challenge: { id: "css-18-challenge", language: "css", title: "Add hover transitions", description: "Write CSS that smoothly animates a button hover state.", starterCode: `.btn {\n  /* transition */\n}\n.btn:hover {\n  /* hover styles */\n}\n`, solutionCode: `.btn { transition: transform .2s ease, background .2s ease; }\n.btn:hover { transform: translateY(-2px); background: #2563eb; }\n`, tests: [{ id: 1, label: "Uses transition", keywords: [{ pattern: "transition:", flags: "i" }] }, { id: 2, label: "Uses hover transform", keywords: [{ pattern: "transform:", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-19", title: "Animations", chapterTitle: "Advanced CSS", chapterColor: "#8b5cf6", theory: [objectives(["Use keyframes and animation properties"]), text("Animations let you create motion with keyframes and timing controls.", { lang: "html", label: "Animation demo", content: htmlPage("Animations", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .spinner { width: 48px; height: 48px; border: 4px solid #cbd5e1; border-top-color: #0ea5e9; border-radius: 50%; animation: spin 1s linear infinite; }\n      @keyframes spin { to { transform: rotate(360deg); } }`, `    <main>\n      <div class="spinner"></div>\n      <p>Animations let you create motion with keyframes and timing controls.</p>\n    </main>`)}), callout("tip", "Keep motion purposeful and subtle."), quiz("Which at-rule defines animation frames?", ["@media", "@keyframes", "@supports", "@scope"], 1, "`@keyframes` defines animation frames." )], challenge: { id: "css-19-challenge", language: "css", title: "Animate a spinner", description: "Write CSS that spins a loading circle using keyframes.", starterCode: `.spinner {\n  /* animation */\n}\n@keyframes spin {\n  /* frames */\n}\n`, solutionCode: `.spinner { animation: spin 1s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n`, tests: [{ id: 1, label: "Uses animation", keywords: [{ pattern: "animation:", flags: "i" }] }, { id: 2, label: "Defines keyframes", keywords: [{ pattern: "@keyframes", flags: "i" }] }] } }),
  lessonTemplate({
    id: "css-20",
    title: "CSS Variables (Custom Properties)",
    chapterTitle: "Advanced CSS",
    chapterColor: "#8b5cf6",
    theory: [
      objectives(["Declare CSS custom properties in :root", "Reuse variables with var()", "Understand variable scope and cascading"]),
      text(
        "CSS variables (officially called custom properties) allow you to store specific values (like colors or font sizes) in one place and reuse them throughout your stylesheet, making themes and maintenance extremely easy.",
        {
          lang: "html",
          label: "Variables demo",
          content: htmlPage("CSS Variables", `      :root { --brand: #0ea5e9; --surface: #eff6ff; --text: #0f172a; }\n      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: var(--surface); color: var(--text); }\n      .card { background: white; border: 1px solid #dbeafe; border-left: 6px solid var(--brand); padding: 1rem; border-radius: 1rem; }`, `    <main class="card">\n      <h1>Theme variables</h1>\n      <p>CSS variables keep theme values reusable and updateable.</p>\n    </main>`),
        },
      ),
      table("CSS Variables Checklist", ["Concept", "Syntax", "Purpose"], [
        ["Declaration", "--variable-name: value;", "Define custom property"],
        ["Global Scope", ":root { ... }", "Available across the entire document"],
        ["Usage", "property: var(--variable-name);", "Apply the stored value"],
      ]),
      callout("info", "Define variables once in `:root` and use `var(--name)` to apply them across your CSS."),
      quiz("Where are global CSS variables typically declared?", ["body", ":root", "main", "header"], 1, "`:root` represents the document root element, making variables globally available."),
    ],
    challenge: {
      id: "css-20-challenge",
      language: "css",
      title: "Use CSS Custom Properties",
      description: "Define root variables for `--brand` and `--surface`, then apply them to a card component.",
      starterCode: `:root {
  /* Define variables here */
}
.card {
  /* Use var() here */
}
`,
      solutionCode: `:root {
  --brand: #0ea5e9;
  --surface: #eff6ff;
}
.card {
  background: var(--surface);
  border-color: var(--brand);
}
`,
      tests: [
        { id: 1, label: "Defines custom properties in :root", keywords: [{ pattern: ":root" }, { pattern: "--" }] },
        { id: 2, label: "Uses var() function", keywords: [{ pattern: "var\\(" }] },
      ],
    },
  }),
  lessonTemplate({
    id: "css-28",
    title: "Introduction to Sass (SCSS)",
    chapterTitle: "Advanced CSS",
    chapterColor: "#8b5cf6",
    theory: [
      objectives(["Understand CSS preprocessors", "Use Sass variables and nesting", "Organize styles with mixins and partials"]),
      text(
        "Sass (Syntactically Awesome Style Sheets) is a CSS preprocessor that adds power features like variables, nested rules, mixins, and inheritance to standard CSS, making large stylesheets much cleaner and easier to maintain.",
        {
          lang: "scss",
          label: "Sass / SCSS syntax example",
          content: `// SCSS Syntax
$brand-color: #0ea5e9;
$surface-color: #f8fafc;

.card {
  background: $surface-color;
  padding: 1.5rem;
  border-radius: 1rem;
  
  h2 {
    color: $brand-color;
    margin-bottom: 0.5rem;
  }
  
  &:hover {
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.1);
  }
}`,
        },
      ),
      table("Core Sass Features", ["Feature", "Syntax Example", "Benefit"], [
        ["Variables", "$primary: #333;", "Store reusable colors/fonts"],
        ["Nesting", ".card { h2 { color: red; } }", "Write cleaner hierarchical selectors"],
        ["Mixins", "@mixin flex-center { ... }", "Reusable blocks of styles"],
        ["Partials", "_buttons.scss", "Modular file separation"],
      ]),
      callout("tip", "Browsers cannot read Sass directly; it gets compiled into standard CSS before deployment."),
      quiz("Which symbol is used to define a variable in Sass?", ["@", "$", "--", "#"], 1, "`$` is used to define Sass variables."),
    ],
    challenge: {
      id: "css-28-challenge",
      language: "css",
      title: "Write Nested SCSS Rules",
      description: "Write an SCSS block with a variable `$primary: #2563eb;` and a `.nav` container nesting `ul` and `li` elements inside it.",
      starterCode: `// Define variable and nest selectors here
`,
      solutionCode: `$primary: #2563eb;

.nav {
  background: $primary;
  padding: 1rem;
  
  ul {
    list-style: none;
    margin: 0;
    
    li {
      color: white;
    }
  }
}
`,
      tests: [
        { id: 1, label: "Defines a Sass variable", keywords: [{ pattern: "\\$primary" }] },
        { id: 2, label: "Nests ul inside .nav", keywords: [{ pattern: "\\.nav\\s*\\{[^}]*ul" }] },
        { id: 3, label: "Nests li inside ul", keywords: [{ pattern: "ul\\s*\\{[^}]*li" }] },
      ],
    },
  }),
  lessonTemplate({ id: "css-21", title: "Advanced Selectors & Rules", chapterTitle: "Advanced CSS", chapterColor: "#8b5cf6", theory: [objectives(["Use pseudo-classes and structural selectors", "Write advanced selector rules"]), text("Advanced selectors and rules help target complex patterns cleanly.", { lang: "html", label: "Advanced selector demo", content: htmlPage("Advanced Selectors & Rules", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .list li:nth-child(odd) { background: #dbeafe; }\n      .list li:not(:last-child) { margin-bottom: .5rem; }\n      .list li:focus-visible { outline: 3px solid #0ea5e9; }`, `    <main>\n      <ul class="list">\n        <li>First</li>\n        <li>Second</li>\n        <li>Third</li>\n      </ul>\n    </main>`)}), callout("tip", "Advanced selectors reduce the need for extra classes."), quiz("Which selector targets every other list item?", [":first-child", ":nth-child(odd)", ":hover", ":focus"], 1, "`nth-child(odd)` targets alternating items." )], challenge: { id: "css-21-challenge", language: "css", title: "Target alternating rows", description: "Write CSS that styles odd list items and adds a focus outline.", starterCode: `.list li {\n  /* base styles */\n}\n`, solutionCode: `.list li:nth-child(odd) { background: #dbeafe; }\n.list li:focus-visible { outline: 3px solid #0ea5e9; }\n`, tests: [{ id: 1, label: "Uses nth-child", keywords: [{ pattern: "nth-child" }] }, { id: 2, label: "Uses focus-visible", keywords: [{ pattern: "focus-visible" }] }] } }),
  lessonTemplate({ id: "css-22", title: "Responsive Web Design", chapterTitle: "Responsive Design & Best Practices", chapterColor: "#f59e0b", theory: [objectives(["Make layouts adapt to screen sizes"]), text("Responsive design makes layouts adapt to different screen sizes.", { lang: "html", label: "Responsive web design", content: htmlPage("Responsive Web Design", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .container { width: min(100%, 960px); margin: 0 auto; }\n      .card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="container">\n      <div class="card">Responsive design makes layouts adapt to different screen sizes.</div>\n    </main>`)}), callout("info", "Start with the smallest screen and scale up."), quiz("What makes a layout responsive?", ["Fixed widths only", "Flexible widths and breakpoints", "No CSS", "Absolute positioning"], 1, "Flexible widths and breakpoints make it responsive." )], challenge: { id: "css-22-challenge", language: "css", title: "Build a responsive container", description: "Write CSS for a centered container with a max width and flexible width.", starterCode: `.container {\n  /* responsive width */\n}\n`, solutionCode: `.container { width: min(100%, 960px); margin: 0 auto; }\n`, tests: [{ id: 1, label: "Uses max-style width", keywords: [{ pattern: "min\\(100\%,\\s*960px\\)" }] }, { id: 2, label: "Centers content", keywords: [{ pattern: "margin:\\s*0\\s+auto" }] }] } }),
  lessonTemplate({ id: "css-23", title: "Media Queries", chapterTitle: "Responsive Design & Best Practices", chapterColor: "#f59e0b", theory: [objectives(["Change styles at different viewport widths"]), text("Media queries let styles change at different viewport widths.", { lang: "html", label: "Media queries demo", content: htmlPage("Media Queries", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }\n      @media (min-width: 768px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n      .card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="grid">\n      <div class="card">Mobile first</div>\n      <div class="card">Two columns on larger screens</div>\n    </main>`)}), callout("tip", "Write base styles first, then add breakpoint overrides."), quiz("Which at-rule is used for responsive breakpoints?", ["@keyframes", "@media", "@supports", "@layer"], 1, "`@media` defines breakpoint-based rules." )], challenge: { id: "css-23-challenge", language: "css", title: "Add a breakpoint", description: "Write a media query that turns a single-column grid into two columns on larger screens.", starterCode: `.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n`, solutionCode: `.grid { display: grid; grid-template-columns: 1fr; }\n@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n`, tests: [{ id: 1, label: "Uses media query", keywords: [{ pattern: "@media" }] }, { id: 2, label: "Changes columns", keywords: [{ pattern: "grid-template-columns" }] }] } }),
  lessonTemplate({ id: "css-24", title: "Responsive Images & Videos", chapterTitle: "Responsive Design & Best Practices", chapterColor: "#f59e0b", theory: [objectives(["Scale media across devices"]), text("Responsive media keeps images and videos flexible and fast.", { lang: "html", label: "Responsive media demo", content: htmlPage("Responsive Images & Videos", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      img, video { width: 100%; max-width: 100%; height: auto; border-radius: 1rem; display: block; }`, `    <main>\n      <img src="https://placehold.co/960x540" alt="Responsive media" />\n      <p>Images and videos should scale within the container.</p>\n    </main>`)}), callout("info", "Set `max-width: 100%` and `height: auto` for images."), quiz("Which styles make images responsive?", ["width: 100%; height: auto;", "position: absolute;", "float: left;", "display: inline;"], 0, "Responsive media uses width and height auto." )], challenge: { id: "css-24-challenge", language: "css", title: "Make media responsive", description: "Write CSS so images and videos scale with their container.", starterCode: `img, video {\n  /* responsive media */\n}\n`, solutionCode: `img, video { width: 100%; height: auto; max-width: 100%; display: block; }\n`, tests: [{ id: 1, label: "Sets width", keywords: [{ pattern: "width:\\s*100%", flags: "i" }] }, { id: 2, label: "Sets height auto", keywords: [{ pattern: "height:\\s*auto", flags: "i" }] }] } }),
  lessonTemplate({ id: "css-25", title: "CSS Optimization", chapterTitle: "Responsive Design & Best Practices", chapterColor: "#f59e0b", theory: [objectives(["Reduce duplication and keep styles maintainable"]), text("Optimization removes duplication and keeps styles easier to maintain.", { lang: "html", label: "CSS optimization demo", content: htmlPage("CSS Optimization", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .btn, .chip { display: inline-flex; align-items: center; gap: .5rem; border-radius: 999px; }\n      .btn { padding: .75rem 1rem; background: #0ea5e9; color: white; }\n      .chip { padding: .35rem .65rem; background: #dbeafe; color: #1d4ed8; }`, `    <main>\n      <span class="chip">Reusable utility</span>\n      <a class="btn" href="#">Optimized CSS</a>\n    </main>`)}), callout("tip", "Group repeated declarations into shared classes or variables."), quiz("What helps reduce duplicated color values?", ["Variables", "Floats", "Tables", "Margins"], 0, "Variables and shared classes reduce duplication." )], challenge: { id: "css-25-challenge", language: "css", title: "Refactor shared styles", description: "Write CSS variables or shared classes to reduce repeated code.", starterCode: `:root {\n  /* variables */\n}\n`, solutionCode: `:root {\n  --brand: #0ea5e9;\n  --surface: #dbeafe;\n}\n.btn { background: var(--brand); }\n.chip { background: var(--surface); }\n`, tests: [{ id: 1, label: "Defines variables", keywords: [{ pattern: "--brand" }] }, { id: 2, label: "Uses var", keywords: [{ pattern: "var\\(" }] }] } }),
  lessonTemplate({ id: "css-26", title: "Accessibility", chapterTitle: "Responsive Design & Best Practices", chapterColor: "#f59e0b", theory: [objectives(["Support contrast and focus states"]), text("Accessible CSS supports contrast, focus states, and readable interactions.", { lang: "html", label: "Accessibility demo", content: htmlPage("Accessibility", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #fff; color: #111827; }\n      a:focus-visible, button:focus-visible, input:focus-visible { outline: 3px solid #0ea5e9; outline-offset: 2px; }\n      .panel { background: #f8fafc; border: 1px solid #cbd5e1; padding: 1rem; border-radius: 1rem; }`, `    <main class="panel">\n      <h1>Accessible styles</h1>\n      <p>Accessible CSS supports contrast, focus states, and readable interactions.</p>\n    </main>`)}), callout("info", "Always keep focus states visible and text contrast strong."), quiz("What should focus-visible provide?", ["Hidden outline", "Visible keyboard focus", "New font", "Bigger margin"], 1, "Keyboard users need a visible focus state." )], challenge: { id: "css-26-challenge", language: "css", title: "Improve focus styles", description: "Write CSS focus-visible styles for links and buttons.", starterCode: `a:focus-visible, button:focus-visible {\n  /* outline */\n}\n`, solutionCode: `a:focus-visible, button:focus-visible {\n  outline: 3px solid #0ea5e9;\n  outline-offset: 2px;\n}\n`, tests: [{ id: 1, label: "Uses focus-visible", keywords: [{ pattern: "focus-visible" }] }, { id: 2, label: "Sets outline", keywords: [{ pattern: "outline:" }] }] } }),
  lessonTemplate({ id: "css-27", title: "CSS Best Practices", chapterTitle: "Responsive Design & Best Practices", chapterColor: "#f59e0b", theory: [objectives(["Keep CSS organized and scalable"]), text("Best practices keep styles organized, scalable, and easy to debug.", { lang: "html", label: "Best practices demo", content: htmlPage("CSS Best Practices", `      body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .section { max-width: 720px; margin: 0 auto; }\n      .section h2 { margin-top: 0; }`, `    <main class="section">\n      <h1>Clean CSS structure</h1>\n      <p>Best practices keep styles organized, scalable, and easy to debug.</p>\n    </main>`)}), callout("tip", "Prefer predictable naming, small components, and low specificity when possible."), quiz("Which habit improves maintainability?", ["Deep nesting everywhere", "Clear class names", "Duplicate rules", "Inline everything"], 1, "Clear class names help maintainability." )], challenge: { id: "css-27-challenge", language: "css", title: "Organize styles", description: "Write CSS that keeps layout code readable and reusable.", starterCode: `.section {\n  /* max-width and spacing */\n}\n`, solutionCode: `.section {\n  max-width: 720px;\n  margin: 0 auto;\n}\n`, tests: [{ id: 1, label: "Sets max-width", keywords: [{ pattern: "max-width:" }] }, { id: 2, label: "Centers section", keywords: [{ pattern: "margin:\\s*0\\s+auto" }] }] } }),
  lessonTemplate({ id: "bs-0", title: "Introduction to Bootstrap", chapterTitle: "Bootstrap Basics", chapterColor: CSS_ACCENT, theory: [objectives(["Explain Bootstrap's purpose"]), text("Bootstrap provides ready-made layout and component classes for faster development.", { lang: "html", label: "Bootstrap intro", content: bootstrapPage("Introduction to Bootstrap", `      .btn-primary { background: #0d6efd; color: white; }`, `    <div class="container">\n      <span class="badge">BOOTSTRAP</span>\n      <h1>Bootstrap adds ready-made UI helpers</h1>\n      <p>Bootstrap provides ready-made layout and component classes for faster development.</p>\n      <a class="btn btn-primary" href="#">Get started</a>\n    </div>`)}), callout("info", "Bootstrap helps you build consistent interfaces quickly."), quiz("What is Bootstrap mainly used for?", ["Backend APIs", "UI layout and components", "Database design", "Networking"], 1, "Bootstrap is for UI layout and components." )], challenge: { id: "bs-0-challenge", language: "html", title: "Add Bootstrap to a page", description: "Create a page that uses Bootstrap-like classes in the preview.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Intro</title>
  </head>
  <body>
    <!-- Add a container, badge, heading, and button -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Intro</title>
  </head>
  <body>
    <div class="container">
      <span class="badge">BOOTSTRAP</span>
      <h1>Bootstrap adds ready-made UI helpers</h1>
      <a class="btn btn-primary" href="#">Get started</a>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Has a container", keywords: [{ pattern: "class=\"container\"", flags: "i" }] }, { id: 2, label: "Has a button", keywords: [{ pattern: "class=\"btn btn-primary\"", flags: "i" }] }] } }),
  lessonTemplate({ id: "bs-1", title: "Installation & Setup", chapterTitle: "Bootstrap Basics", chapterColor: CSS_ACCENT, theory: [objectives(["Explain Bootstrap setup"]), text("Bootstrap setup means loading the framework assets in your project.", { lang: "html", label: "Bootstrap setup", content: bootstrapPage("Installation & Setup", `      .code { background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 1rem; overflow-x: auto; }`, `    <div class="container">\n      <h1>Bootstrap setup</h1>\n      <p>Add the Bootstrap CSS file in your project head.</p>\n      <pre class="code">&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" /&gt;</pre>\n    </div>`)}), callout("tip", "In this workspace we use local preview CSS instead of the CDN to keep examples working offline."), quiz("Where is the Bootstrap stylesheet usually loaded?", ["In the head", "Inside a table", "Inside a form", "In the footer only"], 0, "Stylesheets are typically loaded in the head." )], challenge: { id: "bs-1-challenge", language: "html", title: "Show setup code", description: "Write the head section with a Bootstrap link tag example.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Setup</title>
  </head>
  <body>
    <!-- Add Bootstrap link example -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Setup</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
  </head>
  <body></body>
</html>
`, tests: [{ id: 1, label: "Includes link tag", keywords: [{ pattern: "<link\\s+[^>]*stylesheet", flags: "i" }] }] } }),
  lessonTemplate({ id: "bs-2", title: "Containers", chapterTitle: "Bootstrap Basics", chapterColor: CSS_ACCENT, theory: [objectives(["Use container classes to center content"]), text("Bootstrap containers set the page width and center content.", { lang: "html", label: "Bootstrap containers", content: bootstrapPage("Containers", `      .surface { background: white; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="surface">\n        <h1>Bootstrap container</h1>\n        <p>Bootstrap containers set the page width and center content.</p>\n      </div>\n    </div>`)}), callout("info", "Use containers to keep content readable on large screens."), quiz("What do containers do?", ["Center content", "Hide text", "Replace HTML", "Remove spacing"], 0, "Containers center and constrain content width." )], challenge: { id: "bs-2-challenge", language: "html", title: "Create a container block", description: "Wrap content in a Bootstrap container and a styled surface block.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Containers</title>
  </head>
  <body>
    <!-- Add container and content -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Containers</title>
  </head>
  <body>
    <div class="container">
      <div class="card p-3">Bootstrap containers set the page width and center content.</div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses container", keywords: [{ pattern: "class=\"container\"", flags: "i" }] }, { id: 2, label: "Adds content block", keywords: [{ pattern: "card p-3" }] }] } }),
  lessonTemplate({ id: "bs-3", title: "Typography", chapterTitle: "Bootstrap Basics", chapterColor: CSS_ACCENT, theory: [objectives(["Style headings and text with Bootstrap classes"]), text("Bootstrap typography helpers improve spacing, scale, and emphasis.", { lang: "html", label: "Bootstrap typography", content: bootstrapPage("Typography", `      .display-6 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; }\n      .lead { font-size: 1.1rem; color: #475569; }`, `    <div class="container">\n      <h1 class="display-6">Bootstrap typography</h1>\n      <p class="lead">Bootstrap typography helpers improve spacing, scale, and emphasis.</p>\n    </div>`)}), callout("tip", "Use display classes for large hero headings and lead text for introductory copy."), quiz("Which Bootstrap class is often used for intro text?", ["lead", "table", "btn", "row"], 0, "`lead` is used for intro text." )], challenge: { id: "bs-3-challenge", language: "html", title: "Style a heading and intro text", description: "Use Bootstrap typography classes to emphasize a heading and lead text.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Typography</title>
  </head>
  <body>
    <!-- Add display and lead classes -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Typography</title>
  </head>
  <body>
    <div class="container">
      <h1 class="display-6">Bootstrap typography</h1>
      <p class="lead">Bootstrap typography helpers improve spacing, scale, and emphasis.</p>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses display class", keywords: [{ pattern: "display-6" }] }, { id: 2, label: "Uses lead class", keywords: [{ pattern: "lead" }] }] } }),
  lessonTemplate({ id: "bs-4", title: "Colors & Utilities", chapterTitle: "Bootstrap Basics", chapterColor: CSS_ACCENT, theory: [objectives(["Use utility classes for spacing and color"]), text("Bootstrap utilities speed up layout, color, and spacing work.", { lang: "html", label: "Bootstrap utilities", content: bootstrapPage("Colors & Utilities", `      .bg-primary { background: #0d6efd; color: white; }\n      .bg-success { background: #198754; color: white; }\n      .p-3 { padding: 1rem; }\n      .rounded { border-radius: 1rem; }`, `    <div class="container row">
      <div class="col card p-3 bg-primary rounded">Primary utility</div>
      <div class="col card p-3 bg-success rounded">Success utility</div>
    </div>`)}), callout("info", "Utilities help compose layouts quickly."), quiz("Which class adds spacing?", ["p-3", "nav", "table", "h1"], 0, "`p-3` adds padding." )], challenge: { id: "bs-4-challenge", language: "html", title: "Use utility classes", description: "Create two utility cards with different background colors and padding.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Utilities</title>
  </head>
  <body>
    <!-- Add utility cards -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Utilities</title>
  </head>
  <body>
    <div class="container row">
      <div class="col card p-3 bg-primary rounded">Primary utility</div>
      <div class="col card p-3 bg-success rounded">Success utility</div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses primary utility", keywords: [{ pattern: "bg-primary" }] }, { id: 2, label: "Uses spacing utility", keywords: [{ pattern: "p-3" }] }] } }),
  lessonTemplate({ id: "bs-5", title: "Grid System", chapterTitle: "Bootstrap Layout", chapterColor: CSS_ACCENT, theory: [objectives(["Build layouts with rows and columns"]), text("The Bootstrap grid uses rows and columns to create responsive structures.", { lang: "html", label: "Bootstrap grid", content: bootstrapPage("Grid System", `      .row { display: flex; flex-wrap: wrap; gap: 1rem; }\n      .col-md-6 { flex: 1 1 320px; }\n      .panel { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="row">\n        <div class="col-md-6 panel">Left column</div>\n        <div class="col-md-6 panel">Right column</div>\n      </div>\n    </div>`)}), callout("tip", "Start with a single row and columns that adapt at breakpoints."), quiz("What is the grid made of?", ["Rows and columns", "Tables and footers", "Forms and labels", "Images and links"], 0, "Bootstrap grid uses rows and columns." )], challenge: { id: "bs-5-challenge", language: "html", title: "Build a grid layout", description: "Create a Bootstrap-like two-column layout using rows and columns.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Grid</title>
  </head>
  <body>
    <!-- Add row and columns -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Grid</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6">Left column</div>
        <div class="col-md-6">Right column</div>
      </div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses row", keywords: [{ pattern: "class=\"row\"", flags: "i" }] }, { id: 2, label: "Uses columns", keywords: [{ pattern: "col-md-6" }] }] } }),
  lessonTemplate({ id: "bs-6", title: "Flexbox", chapterTitle: "Bootstrap Layout", chapterColor: CSS_ACCENT, theory: [objectives(["Use flex utilities for alignment"]), text("Bootstrap flex utilities align items without custom CSS.", { lang: "html", label: "Bootstrap flexbox", content: bootstrapPage("Flexbox", `      .d-flex { display: flex; }\n      .justify-content-between { justify-content: space-between; }\n      .align-items-center { align-items: center; }\n      .bar { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="bar d-flex justify-content-between align-items-center">\n        <strong>Flex row</strong>\n        <span>Bootstrap flex utilities align items without custom CSS.</span>\n      </div>\n    </div>`)}), callout("info", "Flex utilities are useful for quick one-line layouts."), quiz("Which class enables flex layout?", ["d-flex", "table", "badge", "card"], 0, "`d-flex` enables flex layout." )], challenge: { id: "bs-6-challenge", language: "html", title: "Align content with flex utilities", description: "Build a flex row with space-between alignment and centered items.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Flexbox</title>
  </head>
  <body>
    <!-- Add flex utilities -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Flexbox</title>
  </head>
  <body>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <strong>Flex row</strong>
        <span>Aligned content</span>
      </div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses d-flex", keywords: [{ pattern: "d-flex" }] }, { id: 2, label: "Uses justify-content-between", keywords: [{ pattern: "justify-content-between" }] }] } }),
  lessonTemplate({ id: "bs-7", title: "Responsive Design", chapterTitle: "Bootstrap Layout", chapterColor: CSS_ACCENT, theory: [objectives(["Make layout change at breakpoints"]), text("Bootstrap responsive classes adapt layouts across breakpoints.", { lang: "html", label: "Responsive design", content: bootstrapPage("Responsive Design", `      .row { display: flex; flex-wrap: wrap; gap: 1rem; }\n      .col-12 { flex: 1 1 100%; }\n      @media (min-width: 768px) { .col-md-6 { flex: 1 1 calc(50% - .5rem); } }\n      .panel { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="row">\n        <div class="col-12 col-md-6 panel">Mobile first</div>\n        <div class="col-12 col-md-6 panel">Responsive column</div>\n      </div>\n    </div>`)}), callout("tip", "Use small-screen-friendly structure first, then scale up."), quiz("What does responsive design do?", ["Keeps one fixed width", "Adapts to screen size", "Removes CSS", "Only centers content"], 1, "Responsive design adapts to screen size." )], challenge: { id: "bs-7-challenge", language: "html", title: "Make columns responsive", description: "Use responsive column classes that stack on small screens and split on larger screens.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Responsive</title>
  </head>
  <body>
    <!-- Add responsive columns -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Responsive</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">First</div>
        <div class="col-12 col-md-6">Second</div>
      </div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses col-12", keywords: [{ pattern: "col-12" }] }, { id: 2, label: "Uses col-md-6", keywords: [{ pattern: "col-md-6" }] }] } }),
  lessonTemplate({ id: "bs-8", title: "Spacing & Positioning", chapterTitle: "Bootstrap Layout", chapterColor: CSS_ACCENT, theory: [objectives(["Use spacing and positioning utilities"]), text("Spacing and positioning utilities fine-tune the layout quickly.", { lang: "html", label: "Spacing and positioning", content: bootstrapPage("Spacing & Positioning", `      .position-relative { position: relative; }\n      .position-absolute { position: absolute; }\n      .mt-4 { margin-top: 1.5rem; }\n      .badge { top: -10px; right: -10px; }`, `    <div class="container mt-4">\n      <div class="card position-relative">\n        <span class="badge position-absolute">New</span>\n        <div class="card-body">Spacing and positioning utilities fine-tune the layout quickly.</div>\n      </div>\n    </div>`)}), callout("tip", "Utilities let you move quickly without custom CSS."), quiz("Which utility adds top margin?", ["mt-4", "mb-4", "px-4", "gap-4"], 0, "`mt-4` adds top margin." )], challenge: { id: "bs-8-challenge", language: "html", title: "Add spacing utilities", description: "Use spacing and positioning utilities to create a positioned badge card.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Spacing</title>
  </head>
  <body>
    <!-- Add spacing utilities -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Spacing</title>
  </head>
  <body>
    <div class="container mt-4">
      <div class="card position-relative">
        <span class="badge position-absolute">New</span>
        <div class="card-body">Spacing utilities</div>
      </div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses mt-4", keywords: [{ pattern: "mt-4" }] }, { id: 2, label: "Uses positioned card", keywords: [{ pattern: "position-relative" }] }] } }),
  lessonTemplate({ id: "bs-9", title: "Buttons", chapterTitle: "Bootstrap Components", chapterColor: CSS_ACCENT, theory: [objectives(["Style buttons with Bootstrap classes"]), text("Bootstrap buttons standardize actions and states.", { lang: "html", label: "Buttons demo", content: bootstrapPage("Buttons", `      .btn-success { background: #198754; color: white; }\n      .btn-warning { background: #ffc107; color: #111827; }`, `    <div class="container">\n      <button class="btn btn-primary">Primary</button>\n      <button class="btn btn-success">Success</button>\n      <button class="btn btn-warning">Warning</button>\n    </div>`)}), callout("info", "Buttons should have clear labels and visible states."), quiz("What is a button used for?", ["Navigation only", "Actions", "Tables", "Images"], 1, "Buttons trigger actions." )], challenge: { id: "bs-9-challenge", language: "html", title: "Create action buttons", description: "Create three buttons with different Bootstrap button classes.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Buttons</title>
  </head>
  <body>
    <!-- Add buttons -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Buttons</title>
  </head>
  <body>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-success">Success</button>
    <button class="btn btn-warning">Warning</button>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses btn-primary", keywords: [{ pattern: "btn-primary" }] }, { id: 2, label: "Uses multiple buttons", keywords: [{ pattern: "<button" }] }] } }),
  lessonTemplate({ id: "bs-10", title: "Cards", chapterTitle: "Bootstrap Components", chapterColor: CSS_ACCENT, theory: [objectives(["Present content with card components"]), text("Cards present grouped content with a consistent visual frame.", { lang: "html", label: "Cards demo", content: bootstrapPage("Cards", `      .card-title { margin: 0 0 .5rem; font-size: 1.15rem; }\n      .card-text { color: #475569; }`, `    <div class="container">\n      <div class="card">\n        <div class="card-body">\n          <h2 class="card-title">Bootstrap card</h2>\n          <p class="card-text">Cards present grouped content with a consistent visual frame.</p>\n        </div>\n      </div>\n    </div>`)}), callout("tip", "Use cards for related content blocks like products or lessons."), quiz("Which class wraps a card body?", ["card-body", "card-title", "btn", "row"], 0, "`card-body` holds the card content." )], challenge: { id: "bs-10-challenge", language: "html", title: "Build a card", description: "Create a Bootstrap-style card with title and text.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Card</title>
  </head>
  <body>
    <!-- Add card markup -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Card</title>
  </head>
  <body>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Bootstrap card</h2>
        <p class="card-text">Cards present grouped content with a consistent visual frame.</p>
      </div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses card-body", keywords: [{ pattern: "card-body" }] }, { id: 2, label: "Uses card-title and card-text", keywords: [{ pattern: "card-title" }, { pattern: "card-text" }] }] } }),
  lessonTemplate({ id: "bs-11", title: "Navigation", chapterTitle: "Bootstrap Components", chapterColor: CSS_ACCENT, theory: [objectives(["Create nav bars and menus"]), text("Bootstrap navigation components create menus and headers quickly.", { lang: "html", label: "Navigation demo", content: bootstrapPage("Navigation", `      .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #0f172a; color: white; border-radius: 1rem; }\n      .nav { list-style: none; }`, `    <div class="container">\n      <nav class="navbar">\n        <strong>Brand</strong>\n        <ul class="nav">\n          <li><a href="#">Home</a></li>\n          <li><a href="#">Docs</a></li>\n        </ul>\n      </nav>\n    </div>`)}), callout("info", "Navigation should be easy to scan and use."), quiz("Which element usually holds nav links?", ["nav", "table", "footer", "figure"], 0, "`nav` holds navigation links." )], challenge: { id: "bs-11-challenge", language: "html", title: "Build a navbar", description: "Create a navigation bar with a brand and two links.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Navigation</title>
  </head>
  <body>
    <!-- Add navbar -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Navigation</title>
  </head>
  <body>
    <nav class="navbar">
      <strong>Brand</strong>
      <a href="#">Home</a>
      <a href="#">Docs</a>
    </nav>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses nav", keywords: [{ pattern: "<nav" }] }, { id: 2, label: "Includes links", keywords: [{ pattern: "<a" }] }] } }),
  lessonTemplate({ id: "bs-12", title: "Forms", chapterTitle: "Bootstrap Components", chapterColor: CSS_ACCENT, theory: [objectives(["Style forms with Bootstrap classes"]), text("Bootstrap form classes improve spacing, labels, and controls.", { lang: "html", label: "Forms demo", content: bootstrapPage("Forms", `      .form-label { display: block; margin-bottom: .35rem; font-weight: 700; }`, `    <div class="container">\n      <form class="card card-body">\n        <label class="form-label" for="email">Email</label>\n        <input class="form-control" id="email" type="email" placeholder="name@example.com" />\n        <div style="height: .75rem"></div>\n        <button class="btn btn-primary" type="submit">Submit</button>\n      </form>\n    </div>`)}), callout("tip", "Keep form controls clear and consistent."), quiz("Which class usually styles form controls?", ["form-control", "card-title", "badge", "row"], 0, "`form-control` styles inputs." )], challenge: { id: "bs-12-challenge", language: "html", title: "Build a form", description: "Create a form with a label, email input, and submit button.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Form</title>
  </head>
  <body>
    <!-- Add form controls -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Form</title>
  </head>
  <body>
    <form>
      <label for="email">Email</label>
      <input class="form-control" id="email" type="email" />
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </body>
</html>
`, tests: [{ id: 1, label: "Includes form-control", keywords: [{ pattern: "form-control" }] }, { id: 2, label: "Includes submit button", keywords: [{ pattern: "<button" }] }] } }),
  lessonTemplate({ id: "bs-13", title: "Tables", chapterTitle: "Bootstrap Components", chapterColor: CSS_ACCENT, theory: [objectives(["Style tables for readable data"]), text("Bootstrap tables make tabular data easier to read.", { lang: "html", label: "Tables demo", content: bootstrapPage("Tables", `      .table-striped tbody tr:nth-child(odd) { background: #f8fafc; }`, `    <div class="container">\n      <table class="table table-striped">\n        <thead><tr><th>Topic</th><th>Status</th></tr></thead>\n        <tbody><tr><td>Lesson</td><td>Styled</td></tr></tbody>\n      </table>\n    </div>`)}), callout("info", "Tables are useful for structured comparisons."), quiz("Which class adds a striped table look?", ["table-striped", "card", "btn", "nav"], 0, "`table-striped` stripes rows." )], challenge: { id: "bs-13-challenge", language: "html", title: "Build a striped table", description: "Create a Bootstrap table with striped rows and headers.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Table</title>
  </head>
  <body>
    <!-- Add table -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Table</title>
  </head>
  <body>
    <table class="table table-striped">
      <thead><tr><th>Topic</th><th>Status</th></tr></thead>
      <tbody><tr><td>Lesson</td><td>Styled</td></tr></tbody>
    </table>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses table class", keywords: [{ pattern: "class=\"table" }] }, { id: 2, label: "Uses striped rows", keywords: [{ pattern: "table-striped" }] }] } }),
  lessonTemplate({ id: "bs-14", title: "Common Components", chapterTitle: "Bootstrap Components", chapterColor: CSS_ACCENT, theory: [objectives(["Use alerts, badges, and common components"]), text("Common Bootstrap components include alerts, badges, and accordions.", { lang: "html", label: "Common components demo", content: bootstrapPage("Common Components", `      .alert { padding: 1rem; border-radius: 1rem; }\n      .alert-info { background: #dbeafe; color: #1d4ed8; }`, `    <div class="container">\n      <div class="alert alert-info">Alert and badge demo</div>\n      <span class="badge">Badge</span>\n    </div>`)}), callout("tip", "Use common components to keep interfaces consistent."), quiz("Which component is used to show a short status label?", ["badge", "grid", "form-control", "navbar"], 0, "Badges show short labels." )], challenge: { id: "bs-14-challenge", language: "html", title: "Add common components", description: "Create an alert and a badge component block.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Components</title>
  </head>
  <body>
    <!-- Add alert and badge -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Components</title>
  </head>
  <body>
    <div class="alert alert-info">Alert and badge demo</div>
    <span class="badge">Badge</span>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses alert", keywords: [{ pattern: "alert-info" }] }, { id: 2, label: "Uses badge", keywords: [{ pattern: "badge" }] }] } }),
  lessonTemplate({ id: "bs-15", title: "Utilities", chapterTitle: "Bootstrap Advanced", chapterColor: "#f97316", theory: [objectives(["Use utility classes for spacing and color"]), text("Bootstrap utilities provide small reusable helpers for spacing, display, and more.", { lang: "html", label: "Utilities demo", content: bootstrapPage("Utilities", `      .text-center { text-align: center; }\n      .shadow { box-shadow: 0 10px 30px rgba(15,23,42,.14); }\n      .rounded { border-radius: 1rem; }`, `    <div class="container text-center">\n      <div class="card shadow rounded">\n        <div class="card-body">Bootstrap utilities provide small reusable helpers for spacing, display, and more.</div>\n      </div>\n    </div>`)}), callout("info", "Utilities help you move fast with repeatable patterns."), quiz("What do utilities do?", ["Add small reusable helpers", "Replace HTML", "Remove spacing", "Break layout"], 0, "Utilities are small reusable helpers." )], challenge: { id: "bs-15-challenge", language: "html", title: "Use utilities", description: "Create a card that uses spacing and shadow utilities.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Utilities</title>
  </head>
  <body>
    <!-- Add utility classes -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Utilities</title>
  </head>
  <body>
    <div class="card shadow rounded text-center">
      <div class="card-body">Utilities example</div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses shadow", keywords: [{ pattern: "shadow" }] }, { id: 2, label: "Uses text-center", keywords: [{ pattern: "text-center" }] }] } }),
  lessonTemplate({ id: "bs-16", title: "Icons", chapterTitle: "Bootstrap Advanced", chapterColor: "#f97316", theory: [objectives(["Use icons for visual meaning"]), text("Bootstrap icons add visual meaning to actions and labels.", { lang: "html", label: "Icons demo", content: bootstrapPage("Icons", `      .bi { display: inline-grid; place-items: center; width: 2rem; height: 2rem; border-radius: 999px; background: #dbeafe; color: #1d4ed8; font-weight: 900; }`, `    <div class="container">\n      <h1><span class="bi" aria-hidden="true">★</span> Bootstrap icons</h1>\n      <p>Bootstrap icons add visual meaning to actions and labels.</p>\n    </div>`)}), callout("tip", "Use icons to support labels, not replace them entirely."), quiz("What do icons improve?", ["Visual meaning", "Database speed", "JavaScript runtime", "HTML tags"], 0, "Icons improve visual meaning." )], challenge: { id: "bs-16-challenge", language: "html", title: "Add an icon and label", description: "Create a heading with an inline icon and text.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Icons</title>
  </head>
  <body>
    <!-- Add icon and heading -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Icons</title>
  </head>
  <body>
    <h1><span class="bi" aria-hidden="true">★</span> Bootstrap icons</h1>
  </body>
</html>
`, tests: [{ id: 1, label: "Includes inline icon", keywords: [{ pattern: "bi" }] }, { id: 2, label: "Has text label", keywords: [{ pattern: "Bootstrap icons" }] }] } }),
  lessonTemplate({ id: "bs-17", title: "Customization", chapterTitle: "Bootstrap Advanced", chapterColor: "#f97316", theory: [objectives(["Adapt Bootstrap to your design system"]), text("Customization lets you adapt Bootstrap to your own design system.", { lang: "html", label: "Customization demo", content: bootstrapPage("Customization", `      :root { --bs-primary: #7c3aed; }\n      .btn-primary { background: var(--bs-primary); color: white; }`, `    <div class="container">\n      <button class="btn btn-primary">Custom theme</button>\n      <p>Customization lets you adapt Bootstrap to your own design system.</p>\n    </div>`)}), callout("info", "Use theme values to keep your UI consistent."), quiz("What is customization used for?", ["Matching your design system", "Deleting layout", "Removing utility classes", "Changing HTML semantics"], 0, "Customization adapts the framework." )], challenge: { id: "bs-17-challenge", language: "html", title: "Customize the primary color", description: "Use a custom primary color and show it on a button.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Customization</title>
  </head>
  <body>
    <!-- Add custom color code -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Customization</title>
    <style>:root { --bs-primary: #7c3aed; }</style>
  </head>
  <body>
    <button class="btn btn-primary">Custom theme</button>
  </body>
</html>
`, tests: [{ id: 1, label: "Defines custom primary", keywords: [{ pattern: "--bs-primary" }] }, { id: 2, label: "Uses btn-primary", keywords: [{ pattern: "btn-primary" }] }] } }),
  lessonTemplate({ id: "bs-18", title: "Building Responsive Pages", chapterTitle: "Bootstrap Advanced", chapterColor: "#f97316", theory: [objectives(["Combine grid, components, and utilities"]), text("Building responsive pages combines grid, components, and utilities into one design.", { lang: "html", label: "Responsive Bootstrap page", content: bootstrapPage("Building Responsive Pages", `      .row { display: flex; flex-wrap: wrap; gap: 1rem; }\n      .col-lg-4 { flex: 1 1 280px; }\n      .card-body { min-height: 120px; }`, `    <div class="container">\n      <div class="row">\n        <div class="col-lg-4 card"><div class="card-body">Hero</div></div>\n        <div class="col-lg-4 card"><div class="card-body">Content</div></div>\n        <div class="col-lg-4 card"><div class="card-body">Footer</div></div>\n      </div>\n    </div>`)}), callout("tip", "Combine bootstrap layout and utilities to build whole pages faster."), quiz("What do responsive pages combine?", ["Grid, components, utilities", "Only text", "Only images", "Only tables"], 0, "Responsive pages combine layout and components." )], challenge: { id: "bs-18-challenge", language: "html", title: "Build a responsive page", description: "Create a three-column responsive page using Bootstrap-like layout classes.", starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Responsive Bootstrap Page</title>
  </head>
  <body>
    <!-- Add grid layout -->
  </body>
</html>
`, solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Responsive Bootstrap Page</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 card"><div class="card-body">Hero</div></div>
        <div class="col-lg-4 card"><div class="card-body">Content</div></div>
        <div class="col-lg-4 card"><div class="card-body">Footer</div></div>
      </div>
    </div>
  </body>
</html>
`, tests: [{ id: 1, label: "Uses container", keywords: [{ pattern: "container" }] }, { id: 2, label: "Uses row and columns", keywords: [{ pattern: "row" }, { pattern: "col-lg-4" }] }] } }),
];

const [
  LESSON_CSS_0,
  LESSON_CSS_1,
  LESSON_CSS_2,
  LESSON_CSS_3,
  LESSON_CSS_4,
  LESSON_CSS_5,
  LESSON_CSS_6,
  LESSON_CSS_7,
  LESSON_CSS_8,
  LESSON_CSS_9,
  LESSON_CSS_10,
  LESSON_CSS_11,
  LESSON_CSS_12,
  LESSON_CSS_13,
  LESSON_CSS_14,
  LESSON_CSS_15,
  LESSON_CSS_16,
  LESSON_CSS_17,
  LESSON_CSS_18,
  LESSON_CSS_19,
  LESSON_CSS_20,
  LESSON_CSS_28,
  LESSON_CSS_21,
  LESSON_CSS_22,
  LESSON_CSS_23,
  LESSON_CSS_24,
  LESSON_CSS_25,
  LESSON_CSS_26,
  LESSON_CSS_27,
  LESSON_BS_0,
  LESSON_BS_1,
  LESSON_BS_2,
  LESSON_BS_3,
  LESSON_BS_4,
  LESSON_BS_5,
  LESSON_BS_6,
  LESSON_BS_7,
  LESSON_BS_8,
  LESSON_BS_9,
  LESSON_BS_10,
  LESSON_BS_11,
  LESSON_BS_12,
  LESSON_BS_13,
  LESSON_BS_14,
  LESSON_BS_15,
  LESSON_BS_16,
  LESSON_BS_17,
  LESSON_BS_18,
] = CSS_LESSONS;

const HTML_CSS_FOUNDATION_CHAPTER_DATA = [
  {
    id: "html-basics",
    title: "HTML Basics",
    icon: "file-text",
    color: ACCENT,
    lessons: [LESSON_HTML_0, LESSON_HTML_1, LESSON_HTML_5],
  },
  {
    id: "css-fundamentals",
    title: "CSS Fundamentals",
    icon: "braces",
    color: CSS_ACCENT,
    lessons: [LESSON_CSS_0, LESSON_CSS_1, LESSON_CSS_2, LESSON_CSS_3, LESSON_CSS_4, LESSON_CSS_5, LESSON_CSS_6],
  },
  {
    id: "css-layout-positioning",
    title: "CSS Layout & Positioning",
    icon: "layout-grid",
    color: CSS_ACCENT,
    lessons: [LESSON_CSS_7, LESSON_CSS_8, LESSON_CSS_9, LESSON_CSS_10, LESSON_CSS_11, LESSON_CSS_12, LESSON_CSS_13, LESSON_CSS_14],
  },
  {
    id: "css-advanced",
    title: "Advanced CSS",
    icon: "sparkles",
    color: "#8b5cf6",
    lessons: [LESSON_CSS_15, LESSON_CSS_16, LESSON_CSS_17, LESSON_CSS_18, LESSON_CSS_19, LESSON_CSS_20, LESSON_CSS_28, LESSON_CSS_21],
  },
  {
    id: "css-responsive",
    title: "Responsive Design & Best Practices",
    icon: "shield-check",
    color: "#f59e0b",
    lessons: [LESSON_CSS_22, LESSON_CSS_23, LESSON_CSS_24, LESSON_CSS_25, LESSON_CSS_26, LESSON_CSS_27],
  },
  {
    id: "bootstrap-basics",
    title: "Bootstrap Basics",
    icon: "package",
    color: "#0ea5e9",
    lessons: [LESSON_BS_0, LESSON_BS_1, LESSON_BS_2, LESSON_BS_3, LESSON_BS_4],
  },
  {
    id: "bootstrap-layout",
    title: "Bootstrap Layout",
    icon: "blocks",
    color: "#22c55e",
    lessons: [LESSON_BS_5, LESSON_BS_6, LESSON_BS_7, LESSON_BS_8],
  },
  {
    id: "bootstrap-components",
    title: "Bootstrap Components",
    icon: "library",
    color: "#14b8a6",
    lessons: [LESSON_BS_9, LESSON_BS_10, LESSON_BS_11, LESSON_BS_12, LESSON_BS_13, LESSON_BS_14],
  },
  {
    id: "bootstrap-advanced",
    title: "Bootstrap Advanced",
    icon: "target",
    color: "#f97316",
    lessons: [LESSON_BS_15, LESSON_BS_16, LESSON_BS_17, LESSON_BS_18],
  },
];

export const HTML_CSS_FOUNDATION_CHAPTERS = HTML_CSS_FOUNDATION_CHAPTER_DATA.map((chapter) => ({
  id: chapter.id,
  title: chapter.title,
  icon: chapter.icon,
  color: chapter.color,
  lessons: chapter.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title })),
}));

export const HTML_CSS_FOUNDATION_LESSONS = HTML_CSS_FOUNDATION_CHAPTER_DATA.flatMap(
  (chapter) => chapter.lessons,
);

export const HTML_CSS_FOUNDATION_TOTAL_XP = HTML_CSS_FOUNDATION_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);

export function getHtmlCssFoundationLessons() {
  return HTML_CSS_FOUNDATION_LESSONS;
}