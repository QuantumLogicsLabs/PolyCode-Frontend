// PolyCode — Matplotlib (Python) full curriculum
// Beginner → Pro · YouTube links: edit matplotlibVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { MATPLOTLIB_VIDEO_LINKS } from "./matplotlibVideoLinks";

export const MATPLOTLIB_CHAPTERS = [
  {
    id: "intro",
    title: "Introduction to Matplotlib",
    icon: "📊",
    color: "#2563eb",
    lessons: [
      {
        id: "plt-0",
        title: "What is Matplotlib?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Matplotlib** is Python's foundational library for data visualization. If Pandas is about tables and numbers, Matplotlib is about transforming that raw data into static, animated, or interactive plots.",
          },
          {
            type: "text",
            content:
              "The most frequently used module is **pyplot**, which provides a state-based interface similar to MATLAB. We standardly import it using the alias `plt`.",
          },
          {
            type: "diagram",
            title: "Data Visualization Workflow",
            nodes: [
              {
                id: "data",
                label: "Data Input",
                color: "#2563eb",
                items: ["Lists", "NumPy Arrays", "Pandas DataFrames"],
              },
              {
                id: "plot",
                label: "Pyplot Layer",
                color: "#3b82f6",
                items: ["plt.plot()", "plt.scatter()", "plt.bar()"],
              },
              {
                id: "render",
                label: "Output Display",
                color: "#60a5fa",
                items: ["plt.show()", "plt.savefig()"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Your First Line Plot",
            content: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [10, 20, 25, 30]

plt.plot(x, y)
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Standard import shorthand: `import matplotlib.pyplot as plt`. Always match this to look professional!",
          },
          {
            type: "quiz",
            question:
              "Which shorthand alias is universally used for matplotlib.pyplot?",
            options: ["mp", "mplt", "plt", "plot"],
            answer: 2,
            explanation:
              "By convention, `matplotlib.pyplot` is almost always imported as `plt`.",
          },
        ],
        challenge: {
          title: "Generate a Plot",
          description:
            "Import `matplotlib.pyplot` as `plt`, plot x values `[1, 2, 3]` vs y values `[2, 4, 6]`, and call the function to show the chart.",
          starterCode: `# Import matplotlib.pyplot as plt
# Plot x and y, then show it

`,
          solutionCode: `import matplotlib.pyplot as plt

x = [1, 2, 3]
y = [2, 4, 6]
plt.plot(x, y)
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Imports pyplot as plt",
              keywords: [
                { pattern: "import\\s+matplotlib\\.pyplot\\s+as\\s+plt" },
              ],
            },
            {
              id: 2,
              label: "Invokes plt.plot()",
              keywords: [{ pattern: "plt\\.plot\\s*\\(" }],
            },
            {
              id: 3,
              label: "Invokes plt.show()",
              keywords: [{ pattern: "plt\\.show\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "plt-1",
        title: "Figures and Axes",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Every Matplotlib chart lives inside a **Figure** (the whole canvas) which contains one or more **Axes** (the actual plotting area with its x/y data). Understanding this hierarchy is the key to controlling layout.",
          },
          {
            type: "text",
            content:
              "The **object-oriented API** — `fig, ax = plt.subplots()` — gives you direct handles to the Figure and Axes, which is the recommended style for anything beyond a quick one-off plot.",
          },
          {
            type: "diagram",
            title: "Figure → Axes hierarchy",
            nodes: [
              {
                id: "fig",
                label: "Figure",
                color: "#2563eb",
                items: ["The whole window", "Can hold many Axes"],
              },
              {
                id: "ax",
                label: "Axes",
                color: "#3b82f6",
                items: ["One plotting area", "x-axis, y-axis, title"],
              },
              {
                id: "art",
                label: "Artists",
                color: "#60a5fa",
                items: ["Lines, bars, text", "Drawn on an Axes"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Object-oriented style",
            content: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])
ax.set_title("Squares")
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Prefer `fig, ax = plt.subplots()` over the plain `plt.plot()` shortcut once your chart needs titles, labels, or multiple panels.",
          },
          {
            type: "quiz",
            question: "What does `plt.subplots()` return?",
            options: [
              "Just an Axes",
              "Just a Figure",
              "A (Figure, Axes) tuple",
              "A NumPy array",
            ],
            answer: 2,
            explanation:
              "`plt.subplots()` returns a tuple `(fig, ax)` — the Figure object and one Axes object by default.",
          },
        ],
        challenge: {
          title: "Use the OO API",
          description:
            "Create `fig, ax = plt.subplots()`, plot `[1,2,3]` vs `[3,2,1]` on `ax`, then call `plt.show()`.",
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [3, 2, 1])
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses plt.subplots()",
              keywords: [{ pattern: "plt\\.subplots\\s*\\(" }],
            },
            {
              id: 2,
              label: "Calls ax.plot",
              keywords: [{ pattern: "ax\\.plot\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "basic-charts",
    title: "Core Chart Types",
    icon: "📈",
    color: "#0d9488",
    lessons: [
      {
        id: "plt-2",
        title: "Scatter and Bar Plots",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Line plots indicate continuities. When you need to isolate discrete data markers or evaluate groups, you use `plt.scatter()` or `plt.bar()`.",
          },
          {
            type: "code",
            lang: "python",
            label: "Scatter vs Bar Chart",
            content: `import matplotlib.pyplot as plt

categories = ['A', 'B', 'C']
values = [7, 11, 5]

plt.bar(categories, values)
plt.show()`,
          },
          {
            type: "quiz",
            question:
              "Which function would you select to discover correlation between two continuous features?",
            options: ["plt.bar()", "plt.scatter()", "plt.hist()", "plt.pie()"],
            answer: 1,
            explanation:
              "`plt.scatter()` maps out single un-joined dots perfectly suited for examining variations and correlations.",
          },
        ],
        challenge: {
          title: "Build a Simple Bar Chart",
          description:
            "Use `plt.bar()` to plot categories `['X', 'Y']` with sizes `[12, 18]`, then display it.",
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

plt.bar(['X', 'Y'], [12, 18])
plt.show()`,
          tests: [
            { id: 1, label: "Uses plt.bar", keywords: ["plt.bar"] },
            { id: 2, label: "Uses plt.show", keywords: ["plt.show()"] },
          ],
        },
      },
      {
        id: "plt-3",
        title: "Histograms and Pie Charts",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A **histogram** (`plt.hist()`) shows the distribution of a single numeric variable by bucketing values into **bins**. A **pie chart** (`plt.pie()`) shows proportions of a whole.",
          },
          {
            type: "text",
            content:
              "Use `bins=` to control how many buckets a histogram uses — too few hides detail, too many adds noise.",
          },
          {
            type: "diagram",
            title: "Choosing a chart",
            nodes: [
              {
                id: "hist",
                label: "Histogram",
                color: "#0d9488",
                items: ["One numeric variable", "Shows distribution"],
              },
              {
                id: "pie",
                label: "Pie chart",
                color: "#14b8a6",
                items: ["Parts of a whole", "Use sparingly"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Histogram of scores",
            content: `import matplotlib.pyplot as plt

scores = [55, 60, 62, 70, 71, 75, 80, 88, 90, 95]
plt.hist(scores, bins=5)
plt.show()`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Pie charts are best for 2–5 categories. Beyond that, a bar chart communicates proportions more clearly.",
          },
          {
            type: "quiz",
            question: "What does the `bins` parameter control in `plt.hist()`?",
            options: [
              "Bar color",
              "Number of buckets the data is grouped into",
              "The chart title",
              "Pie slice size",
            ],
            answer: 1,
            explanation:
              "`bins` sets how many intervals the numeric range is divided into for the histogram.",
          },
        ],
        challenge: {
          title: "Plot a Histogram",
          description:
            "Create `data = [1,2,2,3,3,3,4,4,5]` and plot a histogram with `bins=5`.",
          starterCode: `import matplotlib.pyplot as plt

data = [1, 2, 2, 3, 3, 3, 4, 4, 5]

`,
          solutionCode: `import matplotlib.pyplot as plt

data = [1, 2, 2, 3, 3, 3, 4, 4, 5]
plt.hist(data, bins=5)
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses plt.hist with bins",
              keywords: [{ pattern: "plt\\.hist\\s*\\([^)]*bins" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "customization",
    title: "Customizing Plots",
    icon: "🎨",
    color: "#7c3aed",
    lessons: [
      {
        id: "plt-4",
        title: "Titles, Labels, and Legends",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A chart without context is just shapes. Always add a **title** (`plt.title()`), **axis labels** (`plt.xlabel()` / `plt.ylabel()`), and a **legend** (`plt.legend()`) when plotting multiple series.",
          },
          {
            type: "text",
            content:
              "The `label=` argument on a plotting call feeds text into the legend — without it, `plt.legend()` has nothing to show.",
          },
          {
            type: "code",
            lang: "python",
            label: "Labeled multi-line chart",
            content: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 2, 3], label="Linear")
plt.plot([1, 2, 3], [1, 4, 9], label="Squared")
plt.title("Growth Comparison")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use `plt.legend(loc='upper left')` to control where the legend box appears.",
          },
          {
            type: "quiz",
            question:
              "What is required on a plot call for `plt.legend()` to display text?",
            options: ["color=", "label=", "title=", "marker="],
            answer: 1,
            explanation:
              "Each plotted series needs a `label=` argument; `plt.legend()` collects those labels into the legend box.",
          },
        ],
        challenge: {
          title: "Add a Title and Legend",
          description:
            'Plot `[1,2,3]` vs `[2,4,6]` with `label="Double"`, add a title `"My Chart"`, then call `plt.legend()` and `plt.show()`.',
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [2, 4, 6], label="Double")
plt.title("My Chart")
plt.legend()
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses label=",
              keywords: [{ pattern: "label\\s*=" }],
            },
            {
              id: 2,
              label: "Uses plt.legend()",
              keywords: [{ pattern: "plt\\.legend\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "plt-5",
        title: "Colors, Styles, and Markers",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Matplotlib lets you control **color** (`color=`), **line style** (`linestyle=` — `'-'`, `'--'`, `':'`), and **markers** (`marker=` — `'o'`, `'s'`, `'^'`) on every plot call.",
          },
          {
            type: "text",
            content:
              "A shorthand format string like `'ro--'` combines color (`r`=red), marker (`o`), and linestyle (`--`) in one string.",
          },
          {
            type: "diagram",
            title: "Style building blocks",
            nodes: [
              {
                id: "color",
                label: "Color",
                color: "#7c3aed",
                items: ["color='red'", "color='#ff0000'"],
              },
              {
                id: "line",
                label: "Line style",
                color: "#8b5cf6",
                items: ["'-' solid", "'--' dashed", "':' dotted"],
              },
              {
                id: "marker",
                label: "Marker",
                color: "#a78bfa",
                items: ["'o' circle", "'s' square", "'^' triangle"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Styled line",
            content: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 3, 2], color="green", linestyle="--", marker="o")
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use `linewidth=` and `markersize=` to fine-tune thickness and marker size.",
          },
          {
            type: "quiz",
            question:
              "Which format string draws a red, dashed line with circle markers?",
            options: ["'g-o'", "'r--o'", "'b:s'", "'r-^'"],
            answer: 1,
            explanation:
              "`'r--o'` = red color, dashed linestyle, circle marker — all combined in the shorthand format string.",
          },
        ],
        challenge: {
          title: "Style a Line",
          description:
            'Plot `[1,2,3]` vs `[3,1,2]` with `color="purple"`, `linestyle=":"`, and `marker="s"`.',
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [3, 1, 2], color="purple", linestyle=":", marker="s")
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses color, linestyle, marker",
              keywords: ["color=", "linestyle=", "marker="],
            },
          ],
        },
      },
    ],
  },
  {
    id: "layouts",
    title: "Subplots and Layouts",
    icon: "🗂️",
    color: "#0891b2",
    lessons: [
      {
        id: "plt-6",
        title: "Multiple Subplots",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`plt.subplots(rows, cols)` creates a **grid of Axes** in one Figure, returning an array of Axes objects you can index and plot on individually.",
          },
          {
            type: "text",
            content:
              "Use `plt.tight_layout()` after building a grid to automatically fix overlapping titles and labels.",
          },
          {
            type: "diagram",
            title: "Subplot grid",
            nodes: [
              {
                id: "grid",
                label: "subplots(2, 2)",
                color: "#0891b2",
                items: ["4 Axes objects", "axs[0,0], axs[0,1]…"],
              },
              {
                id: "index",
                label: "Indexing",
                color: "#0ea5e9",
                items: ["axs[row, col]", "1D if one row/col"],
              },
              {
                id: "fix",
                label: "Layout fix",
                color: "#38bdf8",
                items: ["plt.tight_layout()"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A 1x2 grid of charts",
            content: `import matplotlib.pyplot as plt

fig, axs = plt.subplots(1, 2)
axs[0].plot([1, 2, 3], [1, 2, 3])
axs[0].set_title("Line")
axs[1].bar(["A", "B"], [3, 5])
axs[1].set_title("Bar")
plt.tight_layout()
plt.show()`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "When `rows=1` or `cols=1`, `axs` is a 1-D array, so you index it like `axs[0]` instead of `axs[0, 0]`.",
          },
          {
            type: "quiz",
            question: "What does `plt.subplots(2, 2)` create?",
            options: [
              "One Axes",
              "A 2x2 grid of 4 Axes",
              "Two Figures",
              "A pie chart",
            ],
            answer: 1,
            explanation:
              "`subplots(rows, cols)` builds a grid Figure with `rows*cols` Axes objects.",
          },
        ],
        challenge: {
          title: "Build a 1x2 Grid",
          description:
            "Create `fig, axs = plt.subplots(1, 2)`. Plot a line on `axs[0]` and a bar chart on `axs[1]`.",
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

fig, axs = plt.subplots(1, 2)
axs[0].plot([1, 2, 3], [1, 2, 3])
axs[1].bar(["A", "B"], [3, 5])
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses subplots(1, 2)",
              keywords: [{ pattern: "subplots\\s*\\(\\s*1\\s*,\\s*2\\s*\\)" }],
            },
          ],
        },
      },
      {
        id: "plt-7",
        title: "Figure Size and DPI",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Control the overall canvas size with `figsize=(width, height)` in inches when calling `plt.subplots()` or `plt.figure()`. Use `dpi=` to control resolution for exports.",
          },
          {
            type: "text",
            content:
              "A larger `figsize` gives more room for labels and multiple subplots without crowding.",
          },
          {
            type: "code",
            lang: "python",
            label: "A wide, high-res figure",
            content: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4), dpi=120)
ax.plot([1, 2, 3], [3, 1, 4])
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Higher `dpi` values produce sharper images for printing or zooming, at the cost of larger file size.",
          },
          {
            type: "quiz",
            question:
              "Which parameter sets the figure's width and height in inches?",
            options: ["dpi=", "figsize=", "size=", "scale="],
            answer: 1,
            explanation:
              "`figsize=(width, height)` defines the figure's physical dimensions in inches.",
          },
        ],
        challenge: {
          title: "Set Figure Size",
          description:
            "Create a figure with `figsize=(6, 3)` and plot `[1,2,3]` vs `[1,2,3]`.",
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 3))
ax.plot([1, 2, 3], [1, 2, 3])
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses figsize=",
              keywords: [{ pattern: "figsize\\s*=" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Visualization",
    icon: "🚀",
    color: "#dc2626",
    lessons: [
      {
        id: "plt-8",
        title: "Working with NumPy and Pandas Data",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "In real projects, plot data rarely comes from plain lists — it comes from **NumPy arrays** or **Pandas DataFrame columns**. Matplotlib accepts both directly in any plotting call.",
          },
          {
            type: "text",
            content:
              "`np.linspace(start, stop, n)` generates `n` evenly spaced values — perfect for plotting smooth mathematical functions.",
          },
          {
            type: "code",
            lang: "python",
            label: "Plotting a NumPy function",
            content: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Sine Wave")
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "With a Pandas DataFrame `df`, you can plot directly: `df.plot(x='date', y='sales')` uses Matplotlib under the hood.",
          },
          {
            type: "quiz",
            question: "What does `np.linspace(0, 10, 100)` produce?",
            options: [
              "100 random numbers",
              "100 evenly spaced values from 0 to 10",
              "A single value",
              "An empty array",
            ],
            answer: 1,
            explanation:
              "`linspace(start, stop, n)` returns `n` evenly spaced points between `start` and `stop`, inclusive.",
          },
        ],
        challenge: {
          title: "Plot a Sine Wave",
          description:
            "Use `np.linspace(0, 10, 50)` for x, compute `y = np.sin(x)`, and plot it.",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

`,
          solutionCode: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 50)
y = np.sin(x)
plt.plot(x, y)
plt.show()`,
          tests: [
            { id: 1, label: "Uses np.linspace", keywords: ["np.linspace"] },
            { id: 2, label: "Uses np.sin", keywords: ["np.sin"] },
          ],
        },
      },
      {
        id: "plt-9",
        title: "Annotations and Text",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`plt.annotate()` draws text pointing at a specific data point with an arrow — perfect for highlighting peaks, anomalies, or key events on a chart.",
          },
          {
            type: "text",
            content:
              "`plt.text(x, y, 'message')` places plain text at a coordinate without an arrow, useful for labeling regions directly.",
          },
          {
            type: "code",
            lang: "python",
            label: "Annotating a peak",
            content: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 5, 9, 4, 1]

plt.plot(x, y)
plt.annotate("Peak", xy=(3, 9), xytext=(3.5, 9.5),
             arrowprops={"arrowstyle": "->"})
plt.show()`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`xy=` is the point being annotated; `xytext=` is where the label text is drawn — they can differ to avoid overlap.",
          },
          {
            type: "quiz",
            question:
              "Which argument in `plt.annotate()` specifies the data point being pointed at?",
            options: ["xytext=", "xy=", "loc=", "arrowprops="],
            answer: 1,
            explanation:
              "`xy=` is the coordinate of the point being annotated; `xytext=` positions the label text itself.",
          },
        ],
        challenge: {
          title: "Annotate a Point",
          description:
            'Plot `[1,2,3]` vs `[1,4,2]` and annotate the point `(2,4)` with the text `"Max"`.',
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 2])
plt.annotate("Max", xy=(2, 4), xytext=(2.2, 4.3))
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses plt.annotate",
              keywords: [{ pattern: "plt\\.annotate\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "plt-10",
        title: "Saving Figures and Styles",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`plt.savefig('chart.png', dpi=300, bbox_inches='tight')` exports your figure as a file instead of (or as well as) displaying it. Always call `savefig()` **before** `plt.show()`.",
          },
          {
            type: "text",
            content:
              "Matplotlib ships built-in **style sheets**. `plt.style.use('seaborn-v0_8')` (or `'ggplot'`, `'dark_background'`) instantly restyles every chart that follows.",
          },
          {
            type: "diagram",
            title: "Pro-level finishing touches",
            nodes: [
              {
                id: "save",
                label: "Export",
                color: "#dc2626",
                items: ["savefig('out.png')", "dpi=300", "bbox_inches='tight'"],
              },
              {
                id: "style",
                label: "Style sheets",
                color: "#ef4444",
                items: ["plt.style.use('ggplot')", "Consistent theming"],
              },
              {
                id: "close",
                label: "Cleanup",
                color: "#f87171",
                items: ["plt.close(fig)", "Frees memory in loops"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Styled and saved chart",
            content: `import matplotlib.pyplot as plt

plt.style.use("ggplot")
plt.plot([1, 2, 3], [3, 1, 4])
plt.savefig("my_chart.png", dpi=300, bbox_inches="tight")
plt.show()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "When generating many figures in a loop, call `plt.close(fig)` after each one to avoid memory buildup.",
          },
          {
            type: "quiz",
            question: "Why must `plt.savefig()` be called before `plt.show()`?",
            options: [
              "It doesn't matter, order is irrelevant",
              "show() can clear/close the figure, leaving nothing to save afterward",
              "savefig() requires user interaction first",
              "show() automatically saves the file",
            ],
            answer: 1,
            explanation:
              "In many backends, `plt.show()` can clear the current figure once displayed, so saving afterward may produce a blank file.",
          },
        ],
        challenge: {
          title: "Style and Save",
          description:
            'Apply `plt.style.use("ggplot")`, plot `[1,2,3]` vs `[2,3,1]`, then save with `plt.savefig("out.png")` before `plt.show()`.',
          starterCode: `import matplotlib.pyplot as plt

`,
          solutionCode: `import matplotlib.pyplot as plt

plt.style.use("ggplot")
plt.plot([1, 2, 3], [2, 3, 1])
plt.savefig("out.png")
plt.show()`,
          tests: [
            {
              id: 1,
              label: "Uses plt.style.use",
              keywords: [{ pattern: "plt\\.style\\.use\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses plt.savefig",
              keywords: [{ pattern: "plt\\.savefig\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
];

export const MATPLOTLIB_LESSONS = applyLessonVideoLinks(
  MATPLOTLIB_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  MATPLOTLIB_VIDEO_LINKS,
);

export const MATPLOTLIB_TOTAL_XP = MATPLOTLIB_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
