// PolyCode — SciPy (Python) full curriculum
// 8 chapters · 25 lessons · Python coding challenges
// YouTube links: edit scipyVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { SCIPY_VIDEO_LINKS } from "./scipyVideoLinks";
import { SCIPY_LESSON_OUTCOMES } from "./scipyLessonOutcomes";
import { applySecondQuizzes } from "../../shared/applySecondQuizzes";
import { SCIPY_SECOND_QUIZZES } from "./scipySecondQuizzes";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function challenge(title, description, starterCode, solutionCode, tests) {
  return { title, description, starterCode, solutionCode, tests };
}

function kw(id, label, hint, pattern) {
  return { id, label, hint, keywords: [{ pattern }] };
}

export const SCIPY_CHAPTERS = [
  {
    id: "intro",
    title: "Welcome to SciPy",
    icon: "microscope",
    color: "#0d9488",
    lessons: [
      {
        id: "scipy-0",
        title: "What is SciPy?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **SciPy** is a free Python library for **scientific computing**. It gives you ready-made tools for hard math jobs — integrating curves, finding best values, statistics, signals, and more — all built to work with **NumPy arrays**.\n\n**Real-life example:** A weather team has hourly rainfall numbers. They want the *total water* for the day (area under the rain curve). Writing that math from scratch is slow. SciPy has integration tools that do it in a few lines.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What SciPy is for\n• Why it sits next to NumPy\n• The big tool groups you will meet in this course",
          },
          {
            type: "diagram",
            title: "SciPy’s purpose",
            nodes: [
              {
                id: "numpy",
                label: "NumPy arrays",
                color: "#0d9488",
                items: ["Fast number grids", "Your raw data"],
              },
              {
                id: "scipy",
                label: "SciPy tools",
                color: "#14b8a6",
                items: ["Integrate", "Optimize", "Stats & signals"],
              },
              {
                id: "out",
                label: "Answers",
                color: "#06b6d4",
                items: ["Totals", "Best values", "Reports"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Say hello to SciPy",
            content: `import scipy
import numpy as np

print("SciPy version:", scipy.__version__)
print("NumPy ready:", np.array([1, 2, 3]))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Think of NumPy as the **notebook paper** and SciPy as the **calculator apps** that write on that paper.",
          },
          quiz(
            "SciPy is mainly used for…",
            [
              "Building websites",
              "Scientific computing on top of NumPy",
              "Editing photos only",
              "Sending emails",
            ],
            1,
            "SciPy is a scientific toolkit that works with NumPy arrays.",
          ),
        ],
        challenge: challenge(
          "Meet SciPy",
          "Import scipy and numpy as np. Print scipy.__version__ and print the sum of np.array([10, 20, 30]).",
          `import scipy
import numpy as np
# print version and array sum
`,
          `import scipy
import numpy as np
print(scipy.__version__)
print(np.array([10, 20, 30]).sum())`,
          [
            kw(1, "Imports scipy", "import scipy", "import\\s+scipy"),
            kw(2, "Imports numpy", "import numpy as np", "import\\s+numpy\\s+as\\s+np"),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-1",
        title: "Why Scientists Love SciPy",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** People use SciPy because it saves time. Instead of inventing every formula, you call **battle-tested functions** written by scientists and engineers.\n\n**Real-life example:** A pharmacy models how a medicine level rises and falls in the blood. They need curves, integrals, and fits. SciPy already has those building blocks.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Why SciPy is popular in labs and industry\n• Common problem types SciPy solves\n• How this course is sequenced",
          },
          {
            type: "table",
            title: "Everyday SciPy jobs",
            columns: ["Need", "SciPy area", "Example"],
            rows: [
              {
                label: "area",
                values: ["Total under a curve", "integrate", "Rainfall total"],
              },
              {
                label: "best",
                values: ["Best setting", "optimize", "Lowest delivery cost"],
              },
              {
                label: "gaps",
                values: ["Fill missing points", "interpolate", "GPS track gaps"],
              },
              {
                label: "chance",
                values: ["Chance & tests", "stats", "Exam score patterns"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A tiny science-style calculation",
            content: `import numpy as np
from scipy import special

# erf appears in probability & heat problems
print("erf(0) =", special.erf(0))
print("erf(1) ≈", round(float(special.erf(1)), 4))`,
          },
          quiz(
            "A pharmacy team models drug levels in blood using NumPy arrays. Why pick SciPy for this job?",
            [
              "SciPy adds trusted science tools that work directly on those arrays",
              "SciPy replaces Python so no code is needed",
              "SciPy only draws charts and cannot do math",
              "SciPy works only on text files, not numbers",
            ],
            0,
            "SciPy is popular because it gives reliable integrate, optimize, and stats tools built for NumPy data.",
          ),
        ],
        challenge: challenge(
          "Special hello",
          "From scipy import special. Print special.erf(0).",
          `from scipy import special
# print erf(0)
`,
          `from scipy import special
print(special.erf(0))`,
          [
            kw(1, "Imports special", "from scipy import special", "from\\s+scipy\\s+import\\s+special"),
            kw(2, "Uses erf", "special.erf", "special\\.erf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-2",
        title: "SciPy and NumPy Together",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **NumPy** stores and computes on arrays. **SciPy** adds higher-level science algorithms that take those arrays as input.\n\n**Real-life example:** NumPy holds temperature readings for a week. SciPy can help you integrate, fit, or test ideas on that same array.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• The teamwork between NumPy and SciPy\n• A simple pattern: create array → call SciPy\n• When NumPy alone is enough",
          },
          {
            type: "diagram",
            title: "Team pattern",
            nodes: [
              {
                id: "make",
                label: "1. Make data",
                color: "#0d9488",
                items: ["np.array(...)", "Clean numbers"],
              },
              {
                id: "call",
                label: "2. Call SciPy",
                color: "#14b8a6",
                items: ["integrate", "optimize", "stats"],
              },
              {
                id: "read",
                label: "3. Read result",
                color: "#06b6d4",
                items: ["Print", "Compare", "Decide"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "NumPy data → SciPy helper",
            content: `import numpy as np
from scipy import stats

scores = np.array([70, 82, 88, 95, 76])
print("Mean:", scores.mean())
print("SciPy describe nobs:", stats.describe(scores).nobs)`,
          },
          quiz(
            "A good workflow is…",
            [
              "Avoid NumPy when using SciPy",
              "Build arrays with NumPy, then call SciPy tools",
              "Only use SciPy for strings",
              "Never print results",
            ],
            1,
            "NumPy prepares the data; SciPy solves the science step.",
          ),
        ],
        challenge: challenge(
          "Describe scores",
          "Make scores = np.array([10, 20, 30, 40]). Print stats.describe(scores).nobs using scipy.stats.",
          `import numpy as np
from scipy import stats
# create scores and print nobs
`,
          `import numpy as np
from scipy import stats
scores = np.array([10, 20, 30, 40])
print(stats.describe(scores).nobs)`,
          [
            kw(1, "Uses stats", "scipy.stats", "stats\\.describe\\s*\\("),
            kw(2, "Uses np.array", "np.array", "np\\.array\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-3",
        title: "Your First SciPy Import",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** You usually import **one SciPy module** at a time, such as `from scipy import integrate`, instead of loading everything.\n\n**Real-life example:** A toolbox has many drawers. You open only the *integrate* drawer when you need area under a curve.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Clean import style\n• How to try a first function safely\n• How the later chapters map to modules",
          },
          {
            type: "table",
            title: "Course map → modules",
            columns: ["Chapter idea", "Import style"],
            rows: [
              { label: "1", values: ["Special functions", "`from scipy import special`"] },
              { label: "2", values: ["Integration", "`from scipy import integrate`"] },
              { label: "3", values: ["Optimization", "`from scipy import optimize`"] },
              { label: "4", values: ["Statistics", "`from scipy import stats`"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "First integrate import",
            content: `from scipy import integrate
import numpy as np

def f(x):
    return x

area, err = integrate.quad(f, 0, 1)
print("Area of y=x from 0 to 1:", area)
print("Error estimate:", err)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**You are ready.** Next chapters go deeper — always starting with a definition and a real example.",
          },
          quiz(
            "Preferred SciPy import style is…",
            [
              "Always import every module at once",
              "Import the module you need, e.g. from scipy import integrate",
              "Never import NumPy",
              "Only use import *",
            ],
            1,
            "Import the SciPy submodule you need for the job.",
          ),
        ],
        challenge: challenge(
          "First quad",
          "Import integrate from scipy. Define f(x)=x. Print integrate.quad(f, 0, 2)[0].",
          `from scipy import integrate
# define f and print quad result [0]
`,
          `from scipy import integrate

def f(x):
    return x

print(integrate.quad(f, 0, 2)[0])`,
          [
            kw(1, "Imports integrate", "from scipy import integrate", "from\\s+scipy\\s+import\\s+integrate"),
            kw(2, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "special",
    title: "Special Functions",
    icon: "sparkles",
    color: "#14b8a6",
    lessons: [
      {
        id: "scipy-4",
        title: "What Are Special Functions?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Special functions** are famous math helpers that appear so often in science that libraries give them their own names — like gamma, erf, and Bessel.\n\n**Real-life example:** Heat moving through a wall, or probabilities in a bell curve, often need the **error function** `erf`. SciPy computes it for you.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What “special” means here\n• Where to find them: `scipy.special`\n• Why not reinvent them",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "A chef keeps a spice rack of common flavors. Special functions are the spice rack of math — ready when a formula calls for them.",
          },
          {
            type: "code",
            lang: "python",
            label: "Peek at special",
            content: `from scipy import special
print("gamma(5) =", special.gamma(5))
print("factorial flavor: 4! related to gamma(5)")`,
          },
          quiz(
            "scipy.special is for…",
            [
              "Drawing maps",
              "Well-known scientific helper functions",
              "Only sorting lists",
              "HTML pages",
            ],
            1,
            "scipy.special provides classic mathematical special functions.",
          ),
        ],
        challenge: challenge(
          "Gamma check",
          "From scipy import special. Print special.gamma(6).",
          `from scipy import special
`,
          `from scipy import special
print(special.gamma(6))`,
          [
            kw(1, "Imports special", "from scipy import special", "from\\s+scipy\\s+import\\s+special"),
            kw(2, "Uses gamma", "special.gamma", "special\\.gamma\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-5",
        title: "Gamma, erf, and Everyday Helpers",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** SciPy gives you ready-made math helpers so you do not have to invent hard formulas yourself.\n\nTwo useful ones are **`gamma`** and **`erf`**:\n\n• **`gamma`** is connected to the **factorial** idea. For example, `gamma(5)` equals `4!`, which is **24**. When a formula needs a factorial-style value, call `gamma` instead of writing the math by hand.\n• **`erf`** (short for *error function*) shows up in everyday science work — probability, measurement error, heat, and diffusion. You do not need every detail of the formula. SciPy already knows how to compute it.\n• SciPy provides these helpers so beginners can use them without building complicated math from scratch.\n\n**Real-life example:** In a lab, the same measurement is rarely identical every time — small errors appear again and again. Tools like `erf` help scientists work with those small variations.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Call `special.gamma` and `special.erf`\n• Read simple outputs\n• Use them on single numbers first",
          },
          {
            type: "table",
            title: "Quick helper sheet",
            columns: ["Function", "Plain idea", "Try"],
            rows: [
              { label: "g", values: ["`gamma(n)`", "Factorial-related", "`gamma(5)` → 24"] },
              { label: "e", values: ["`erf(x)`", "Error function", "`erf(0)` → 0"] },
              { label: "x", values: ["`expit(x)`", "Smooth 0–1 curve", "Useful in ML stories"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "gamma and erf",
            content: `from scipy import special
print("gamma(5) =", special.gamma(5))
print("erf(0) =", special.erf(0))
print("erf(1) ≈", round(float(special.erf(1)), 4))`,
          },
          quiz(
            "Why might a scientist call `special.gamma(5)` instead of writing 4×3×2×1 by hand?",
            [
              "It returns the same factorial-style result in one trusted function call",
              "It converts the result into a website layout",
              "It only works on strings, not numbers",
              "It deletes old lab measurements from a file",
            ],
            0,
            "gamma(n) is factorial-related — gamma(5) equals 4!, which is 24, without manual multiplication.",
          ),
        ],
        challenge: challenge(
          "Two helpers",
          "Print special.gamma(4) and special.erf(0) on separate lines.",
          `from scipy import special
`,
          `from scipy import special
print(special.gamma(4))
print(special.erf(0))`,
          [
            kw(1, "Uses gamma", "special.gamma", "special\\.gamma\\s*\\("),
            kw(2, "Uses erf", "special.erf", "special\\.erf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-6",
        title: "Using Special Functions in Practice",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** In the last topics you used helpers like `gamma` and `erf` on **one number**. In real projects you often have **many numbers** at once — a list of scores, temperatures, or sensor readings.\n\nGood news: SciPy special functions work with **NumPy arrays**. You pass in a whole group of values, and SciPy updates **every item** for you. No writing a loop by hand.\n\nHere is the simple idea:\n\n• Put your numbers in a NumPy array with `np.array([...])`\n• Call a helper such as `special.erf(x)` or `special.expit(x)`\n• SciPy returns a new array with the answers, one for each input\n• Print the result to check your work\n\n**Real-life example:** A teacher has three student scores. Instead of changing each score one by one, they put all three in an array and run one SciPy function. The code stays short and easy to read.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to use special functions on a NumPy array\n• How to combine `import numpy as np` with `from scipy import special`\n• How to print a small, clear report of the results",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Imagine a stamp that prints the same pattern on every page of a stack. An array is the stack of pages. A special function is the stamp — one press updates every page.",
          },
          {
            type: "table",
            title: "Practice checklist",
            columns: ["Step", "What you do", "Why it helps"],
            rows: [
              {
                label: "1",
                values: [
                  "Make an array",
                  "`x = np.array([0.0, 0.5, 1.0])`",
                  "Holds many numbers together",
                ],
              },
              {
                label: "2",
                values: [
                  "Call a helper",
                  "`special.erf(x)`",
                  "Transforms every value at once",
                ],
              },
              {
                label: "3",
                values: [
                  "Print the output",
                  "`print(...)`",
                  "Lets you see and check the answers",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: array in, array out",
            content: `import numpy as np
from scipy import special

# Three numbers in one array
x = np.array([0.0, 0.5, 1.0])

# SciPy updates each value
print("erf(x) =", special.erf(x))
print("expit(x) =", special.expit(x))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Always start with **one number** first. When that works, put several numbers in an array and run the same function again.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** `erf` and `expit` are still the same helpers — arrays just let you use them on many values in one line.",
          },
          quiz(
            "Special functions in SciPy can…",
            [
              "Only accept strings",
              "Work on NumPy arrays of numbers",
              "Only run offline on paper",
              "Replace the Python language",
            ],
            1,
            "They accept arrays and return a transformed value for each number.",
          ),
        ],
        challenge: challenge(
          "erf on an array",
          "Create x = np.array([0.0, 1.0]). Print special.erf(x).",
          `import numpy as np
from scipy import special
# create the array, then print erf(x)
`,
          `import numpy as np
from scipy import special
x = np.array([0.0, 1.0])
print(special.erf(x))`,
          [
            kw(1, "Uses np.array", "np.array", "np\\.array\\s*\\("),
            kw(2, "Uses erf", "special.erf", "special\\.erf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "integrate",
    title: "Integration",
    icon: "function-square",
    color: "#06b6d4",
    lessons: [
      {
        id: "scipy-7",
        title: "What is Numerical Integration?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Sometimes you need the **total** of something that changes over time — like how much water flowed past a sensor, or how much energy a house used.\n\nOn a graph, that total is the **area under the curve**. When the math on paper is hard, the computer can **estimate** that area for you. That estimate is called **numerical integration**.\n\nIn plain words:\n\n• You have a curve (a function) that goes up and down\n• You choose a start and an end (the limits)\n• SciPy adds up the area between those limits\n• You get a total, plus a small error estimate\n\n**Real-life example:** A river sensor records water flow every hour. The **total water for the day** is the area under that flow curve. SciPy can estimate it without you drawing the graph by hand.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What “area under the curve” means in everyday language\n• Why SciPy is useful for this job\n• The basic idea behind `integrate.quad`",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Imagine stacking thin strips of paper under a curved line until they fill the space. Numerical integration is the computer stacking those strips for you — fast and carefully.",
          },
          {
            type: "diagram",
            title: "Integration idea",
            nodes: [
              {
                id: "curve",
                label: "Your curve",
                color: "#06b6d4",
                items: ["A function f(x)", "Height at each x"],
              },
              {
                id: "area",
                label: "Area to find",
                color: "#0d9488",
                items: ["From start a to end b", "The total you want"],
              },
              {
                id: "quad",
                label: "SciPy quad",
                color: "#14b8a6",
                items: ["Estimates the area", "Also reports error"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: area of a flat line",
            content: `from scipy import integrate

# A flat line at height 2
def flat(x):
    return 2

# Area from 0 to 3 should be 2 * 3 = 6
area, err = integrate.quad(flat, 0, 3)
print("Area:", area)
print("Error estimate:", err)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Start with an easy case you can check by hand (like a flat line). When that looks right, try harder curves.",
          },
          quiz(
            "Numerical integration estimates…",
            [
              "File sizes",
              "Area under a curve between limits",
              "Only integer factorials",
              "Website traffic only",
            ],
            1,
            "It estimates the area (or total) under a function between two limits.",
          ),
        ],
        challenge: challenge(
          "Flat area",
          "Define f(x)=5. Print integrate.quad(f, 0, 2)[0].",
          `from scipy import integrate
# define f, then print the area with quad
`,
          `from scipy import integrate

def f(x):
    return 5

print(integrate.quad(f, 0, 2)[0])`,
          [
            kw(1, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-8",
        title: "Area Under a Curve with quad",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** The main SciPy tool for this chapter is **`integrate.quad`**. You give it:\n\n• A Python function for your curve, like `f(x)`\n• A start limit `a`\n• An end limit `b`\n\nThen SciPy estimates the area from `a` to `b`.\n\n**Important:** `quad` returns **two values**:\n\n• The **area** (the answer you usually want)\n• An **error estimate** (how unsure the computer is)\n\nSo you often write: `area, err = integrate.quad(f, a, b)`\n\n**Real-life example:** Power use over 8 hours is a curve. Integrating that curve gives **total energy** used — like reading a smart meter for the whole morning.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to write a simple `f(x)` in Python\n• How to call `integrate.quad(f, a, b)`\n• How to print the area (and optionally the error)",
          },
          {
            type: "table",
            title: "quad in three steps",
            columns: ["Step", "What you write", "What it means"],
            rows: [
              {
                label: "1",
                values: [
                  "Define f(x)",
                  "`def f(x): return x ** 2`",
                  "Your curve formula",
                ],
              },
              {
                label: "2",
                values: [
                  "Call quad",
                  "`integrate.quad(f, 0, 1)`",
                  "Area from 0 to 1",
                ],
              },
              {
                label: "3",
                values: [
                  "Read the result",
                  "`area, err = ...`",
                  "Answer + confidence check",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: integrate x squared",
            content: `from scipy import integrate

def f(x):
    return x ** 2

area, err = integrate.quad(f, 0, 1)
print("Area from 0 to 1 ≈", area)
print("True value is 1/3 ≈", 1 / 3)
print("Error estimate:", err)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** If you only need the area, you can use `integrate.quad(f, a, b)[0]`. Index `0` is the result; index `1` is the error.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Compare SciPy’s answer with a known true value when you can (like `1/3` above). That builds trust in your code.",
          },
          quiz(
            "You define `f(x) = x ** 2`. What does `integrate.quad(f, 0, 2)` estimate?",
            [
              "The area under the curve from x = 0 to x = 2",
              "The highest y-value on the curve only",
              "The slope of the line at x = 2 only",
              "How many lines of Python code are in f",
            ],
            0,
            "quad estimates the total area under f(x) between the limits you give — here, under x² from 0 to 2.",
          ),
        ],
        challenge: challenge(
          "Quad x²",
          "Integrate x**2 from 0 to 2 with quad and print the result (index 0).",
          `from scipy import integrate
# define f(x) = x**2, then print quad(...)[0]
`,
          `from scipy import integrate

def f(x):
    return x ** 2

print(integrate.quad(f, 0, 2)[0])`,
          [
            kw(1, "Defines power", "x ** 2 or x**2", "\\*\\*\\s*2"),
            kw(2, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-9",
        title: "Tips for Reliable Integrals",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Getting a number from `quad` is easy. Getting a **trustworthy** number takes a few careful habits.\n\nA reliable integral means:\n\n• You used the **correct start and end** limits\n• Your function matches the real situation (clear units)\n• You glanced at the **error estimate**\n• You did a quick **sanity check** (does the size look reasonable?)\n\n**Real-life example:** If rain is about 2 mm each hour for 5 hours, the total should be near **10 mm**. If SciPy prints `10000`, something is wrong — maybe limits or units got mixed up.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to check that limits make sense\n• How to read the error estimate from `quad`\n• How to compare with a simple known case",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "A kitchen scale can show a weight, but you still glance to see if it looks right. Same with `quad`: print the answer, then ask “Does this look sensible?”",
          },
          {
            type: "table",
            title: "Sanity checklist",
            columns: ["Check", "Ask yourself", "Why it matters"],
            rows: [
              {
                label: "1",
                values: [
                  "Limits",
                  "Did I start and end in the right place?",
                  "Wrong window → wrong total",
                ],
              },
              {
                label: "2",
                values: [
                  "Units",
                  "Hours vs minutes? mm vs m?",
                  "Unit mix-ups make huge errors",
                ],
              },
              {
                label: "3",
                values: [
                  "Error size",
                  "Is the error estimate tiny?",
                  "Huge error → investigate",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: print area and error",
            content: `from scipy import integrate

def f(x):
    return x

area, err = integrate.quad(f, 0, 4)
print("Area:", area)
print("Error estimate:", err)
print("Expected by hand:", 8.0)  # triangle area 0.5*4*4 = 8`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Watch out:** A huge error estimate is a warning light. Do not ignore it — check your function and limits first.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Keep a known easy example nearby (like integrating `f(x)=x`). If that fails, fix your setup before trusting harder problems.",
          },
          quiz(
            "If the error estimate is huge, you should…",
            [
              "Ignore it always",
              "Investigate limits/function carefully",
              "Delete SciPy",
              "Only use strings",
            ],
            1,
            "A large error estimate means you should double-check your setup.",
          ),
        ],
        challenge: challenge(
          "Print area and err",
          "For f(x)=x from 1 to 3, unpack area, err = integrate.quad(...). Print both.",
          `from scipy import integrate
# define f, call quad, print area and err
`,
          `from scipy import integrate

def f(x):
    return x

area, err = integrate.quad(f, 1, 3)
print(area)
print(err)`,
          [
            kw(1, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(2, "Prints twice", "print", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "optimize",
    title: "Optimization",
    icon: "target",
    color: "#8b5cf6",
    lessons: [
      {
        id: "scipy-10",
        title: "What is Optimization?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** **Optimization** means searching for the **best** choice — often the **lowest cost** or the **highest score** — by trying different inputs.\n\nIn plain words:\n\n• You write a function that scores how good (or bad) a choice is\n• You ask SciPy to search for a better input\n• SciPy keeps adjusting until the score looks as good as it can\n• You read the best input it found\n\n**Real-life example:** A delivery app wants the cheapest fuel cost for a route. It tries different settings until the cost function is as small as possible.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What “minimize” means in everyday language\n• Why we give SciPy a starting guess\n• That `scipy.optimize` is the toolbox for this job",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Imagine standing on a foggy hillside. Optimization is carefully stepping downhill until you reach the valley floor — the lowest (best) cost.",
          },
          {
            type: "table",
            title: "Optimization words",
            columns: ["Word", "Simple meaning", "Example"],
            rows: [
              {
                label: "1",
                values: [
                  "Cost / score",
                  "A number that says how good a choice is",
                  "`(x - 3) ** 2`",
                ],
              },
              {
                label: "2",
                values: [
                  "Minimize",
                  "Make that number as small as possible",
                  "Find the cheapest route",
                ],
              },
              {
                label: "3",
                values: [
                  "Starting guess",
                  "Where the search begins",
                  "`x0 = 0`",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: a simple cost function",
            content: `from scipy import optimize

def cost(x):
    return (x - 3) ** 2

print("Cost at 0:", cost(0))
print("Cost at 3:", cost(3))
print("Smaller cost is better in this example")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** First print a few cost values by hand. When you understand the goal, let SciPy search for the best input.",
          },
          quiz(
            "Optimization often means…",
            [
              "Making files larger",
              "Finding best inputs for a goal (min/max)",
              "Only sorting names",
              "Drawing icons",
            ],
            1,
            "You search for inputs that make a goal as good as possible.",
          ),
        ],
        challenge: challenge(
          "Cost at a point",
          "Define cost(x)=(x-2)**2. Print cost(5).",
          `from scipy import optimize
# define cost, then print cost(5)
`,
          `def cost(x):
    return (x - 2) ** 2

print(cost(5))`,
          [
            kw(1, "Defines cost", "def cost", "def\\s+cost\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-11",
        title: "Find a Minimum with minimize",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** The main tool here is **`optimize.minimize`**. You give it:\n\n• A cost function (what you want to make small)\n• A starting guess `x0`\n\nSciPy then searches for a better input.\n\nAfter it finishes, read two useful parts of the result:\n\n• **`result.x`** — the best input it found\n• **`result.fun`** — the cost at that best input\n\n**Real-life example:** You want a cheaper energy setting. Start near today’s value (`x0`), and let SciPy walk toward a lower cost.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to call `optimize.minimize(fun, x0)`\n• How to read `.x` and `.fun`\n• How to try a simple one-number example first",
          },
          {
            type: "table",
            title: "minimize in three steps",
            columns: ["Step", "What you write", "What it means"],
            rows: [
              {
                label: "1",
                values: [
                  "Define cost",
                  "`def cost(x): return (x - 3) ** 2`",
                  "Smaller is better",
                ],
              },
              {
                label: "2",
                values: [
                  "Call minimize",
                  "`optimize.minimize(cost, x0=0.0)`",
                  "Start searching from 0",
                ],
              },
              {
                label: "3",
                values: [
                  "Read the answer",
                  "`result.x[0]`, `result.fun`",
                  "Best input and best cost",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: minimize a parabola",
            content: `from scipy import optimize

def cost(x):
    return (x - 3) ** 2

result = optimize.minimize(cost, x0=0.0)
print("Best x ≈", result.x[0])
print("Best cost ≈", result.fun)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** A bad starting guess can land in the wrong valley. Pick a sensible `x0` close to where you think the answer should be.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** For one-number problems, use `result.x[0]` to print the best value clearly.",
          },
          quiz(
            "You minimize `cost(x) = (x - 3) ** 2` starting from `x0 = 0.0`. What does `result.fun` tell you?",
            [
              "The lowest cost value SciPy found at the best input",
              "The starting guess before any search happened",
              "How many NumPy arrays are loaded in memory",
              "Whether your Python version is up to date",
            ],
            0,
            "result.fun is the cost at the best point — for this parabola it should be close to 0 near x = 3.",
          ),
        ],
        challenge: challenge(
          "Minimize (x-4)**2",
          "Minimize (x-4)**2 starting at x0=0. Print result.x[0].",
          `from scipy import optimize
# define cost, call minimize, print result.x[0]
`,
          `from scipy import optimize

def cost(x):
    return (x - 4) ** 2

result = optimize.minimize(cost, x0=0.0)
print(result.x[0])`,
          [
            kw(1, "Uses minimize", "optimize.minimize", "optimize\\.minimize\\s*\\("),
            kw(2, "Uses result.x", "result.x", "result\\.x"),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-12",
        title: "Roots and Curve Fitting Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Optimization tools can also help with two other everyday jobs:\n\n• **Finding a root** — where a function crosses **zero** (`f(x) = 0`)\n• **Curve fitting** — choosing model settings so a curve matches measured data\n\nYou do not need hard theory to start. For roots, SciPy’s `root_scalar` is a friendly first tool.\n\n**Real-life examples:**\n\n• A cooling drink reaches room temperature (find when the difference hits zero)\n• Plant height data is fitted with a simple growth curve",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What a root means in plain words\n• How to use `optimize.root_scalar` with a bracket\n• What curve fitting means at a gentle beginner level",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "A root is the crossing point on a bridge between above-zero and below-zero. Curve fitting is choosing the best rubber-band shape so it stretches through your data points.",
          },
          {
            type: "table",
            title: "Root finding checklist",
            columns: ["Step", "What you do", "Why"],
            rows: [
              {
                label: "1",
                values: [
                  "Write f(x)",
                  "`return x ** 2 - 4`",
                  "Defines the equation",
                ],
              },
              {
                label: "2",
                values: [
                  "Give a bracket",
                  "`bracket=[0, 3]`",
                  "Search between two sides",
                ],
              },
              {
                label: "3",
                values: [
                  "Read sol.root",
                  "`print(sol.root)`",
                  "The x where f(x) ≈ 0",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: find a root",
            content: `from scipy import optimize

def f(x):
    return x ** 2 - 4

# Look for a root between 0 and 3
sol = optimize.root_scalar(f, bracket=[0, 3])
print("Root ≈", sol.root)
print("Check f(root) ≈", f(sol.root))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** A **bracket** is two ends where the function changes sign (one side positive, one side negative). That helps SciPy find the crossing.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** After finding a root, print `f(sol.root)`. A value near zero means your answer looks good.",
          },
          quiz(
            "A root of f is a value where…",
            ["f(x) is huge", "f(x) = 0", "x is always 100", "SciPy crashes"],
            1,
            "Roots are solutions to f(x) = 0.",
          ),
        ],
        challenge: challenge(
          "Root of x**2 - 9",
          "Use optimize.root_scalar on f(x)=x**2-9 with bracket=[0, 5]. Print sol.root.",
          `from scipy import optimize
# define f, call root_scalar, print sol.root
`,
          `from scipy import optimize

def f(x):
    return x ** 2 - 9

sol = optimize.root_scalar(f, bracket=[0, 5])
print(sol.root)`,
          [
            kw(1, "Uses root_scalar", "root_scalar", "root_scalar\\s*\\("),
            kw(2, "Prints root", "sol.root", "\\.root"),
          ],
        ),
      },
    ],
  },
  {
    id: "interpolate",
    title: "Interpolation",
    icon: "trending-up",
    color: "#a855f7",
    lessons: [
      {
        id: "scipy-13",
        title: "What is Interpolation?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Real data often has **gaps**. A sensor might record a value every few seconds, but you want to know what happened **in between**.\n\n**Interpolation** means estimating values **between** known data points — using the points you already measured.\n\nIn plain words:\n\n• You know some (x, y) samples\n• You ask for y at a new x that sits **between** those samples\n• SciPy gives a sensible estimate\n• It is not magic for points far outside your data range\n\n**Real-life example:** A GPS records your location every 10 seconds. Interpolation estimates where you were at 10.5 seconds.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Why gaps appear in measured data\n• What interpolation does (and what it should not invent)\n• That `scipy.interpolate` is the toolbox for this job",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Imagine dots on a page with empty space between them. Interpolation is carefully drawing a path through those dots so you can read values in the gaps — without leaping far past the first and last dots.",
          },
          {
            type: "diagram",
            title: "Known points → estimate between",
            nodes: [
              {
                id: "known",
                label: "Known samples",
                color: "#a855f7",
                items: ["(1, 2)", "(3, 6)"],
              },
              {
                id: "fill",
                label: "Interpolate",
                color: "#8b5cf6",
                items: ["Estimate at x=2"],
              },
              {
                id: "out",
                label: "Filled value",
                color: "#6366f1",
                items: ["A sensible guess"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: see the gaps",
            content: `import numpy as np

x = np.array([0, 2, 4])
y = np.array([0, 4, 8])

print("At x=2 we already know y =", 4)
print("Interpolation helps for in-between x like 1 or 3")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Interpolation fills **between** known points. Guessing far outside the ends is a different (and harder) problem.",
          },
          quiz(
            "Interpolation estimates values…",
            [
              "Only far outside the data",
              "Between known points",
              "Only for text files",
              "Never from sensors",
            ],
            1,
            "Interpolation fills values between measured points.",
          ),
        ],
        challenge: challenge(
          "State the idea",
          "Create x=np.array([0,1,2]) and y=np.array([0,10,20]). Print y[1].",
          `import numpy as np
# create x and y arrays, then print y[1]
`,
          `import numpy as np
x = np.array([0, 1, 2])
y = np.array([0, 10, 20])
print(y[1])`,
          [
            kw(1, "Uses np.array", "np.array", "np\\.array\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-14",
        title: "Fill Gaps with interp1d",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** The friendly tool for beginners is **`interp1d`**. You give it:\n\n• Known `x` values\n• Matching `y` values\n• A style such as `kind=\"linear\"`\n\nSciPy builds a helper you can **call like a function**. Ask it for a new x, and it estimates y.\n\n**Real-life example:** Temperature is logged every hour. Use `interp1d` to estimate the temperature at 2:30.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to build an interpolator with `interp1d`\n• How to call it for a new x value\n• Why `kind=\"linear\"` is a great first choice",
          },
          {
            type: "table",
            title: "interp1d in three steps",
            columns: ["Step", "What you write", "What it means"],
            rows: [
              {
                label: "1",
                values: [
                  "Store samples",
                  "`x = np.array([...])`",
                  "Known points",
                ],
              },
              {
                label: "2",
                values: [
                  "Build helper",
                  "`f = interp1d(x, y, kind=\"linear\")`",
                  "Ready to estimate",
                ],
              },
              {
                label: "3",
                values: [
                  "Ask for a value",
                  "`float(f(1))`",
                  "y estimate at x=1",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: linear interp1d",
            content: `import numpy as np
from scipy.interpolate import interp1d

x = np.array([0, 2, 4])
y = np.array([0, 4, 8])

f = interp1d(x, y, kind="linear")
print("Estimate at 1:", float(f(1)))
print("Estimate at 3:", float(f(3)))`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Watch out:** Basic `interp1d` is for values **between** your points. Asking far outside the first/last x needs special settings.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Use `float(...)` when you print a single estimate so the output looks clean.",
          },
          quiz(
            "Temperature is logged at 0h, 2h, and 4h. Why build `f = interp1d(x, y, kind='linear')`?",
            [
              "To estimate temperature at in-between times like 1h or 3h",
              "To permanently delete gaps in the sensor log",
              "To convert each reading into a bar chart only",
              "To prove the sensor never makes measurement errors",
            ],
            0,
            "interp1d fills values between known samples — perfect for estimating 2:30 from hourly logs.",
          ),
        ],
        challenge: challenge(
          "Estimate middle",
          "With x=[0,10], y=[0,100], build interp1d and print float(f(5)).",
          `import numpy as np
from scipy.interpolate import interp1d
# build f, then print float(f(5))
`,
          `import numpy as np
from scipy.interpolate import interp1d
x = np.array([0, 10])
y = np.array([0, 100])
f = interp1d(x, y, kind="linear")
print(float(f(5)))`,
          [
            kw(1, "Uses interp1d", "interp1d", "interp1d\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-15",
        title: "Smooth Paths with Splines",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Linear interpolation connects points with **straight lines** — simple and clear, but sometimes a bit zig-zaggy.\n\nA **spline** (often `kind=\"cubic\"`) draws a **smoother path** through the same points.\n\nIn plain words:\n\n• Linear = connect the dots with rulers\n• Cubic spline = connect the dots with a soft curve\n• You still only trust values **between** your samples\n• You need **enough points** for cubic to work well\n\n**Real-life example:** Animation paths or gentle sensor curves often look better with a cubic spline than with sharp corners.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to try cubic interpolation with `interp1d`\n• How cubic feels smoother than linear\n• Why you should keep enough sample points",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Linear is like folding a paper airplane edge-to-edge. A cubic spline is more like bending a flexible wire through the same points — still through every point, but softer in between.",
          },
          {
            type: "table",
            title: "Linear vs cubic",
            columns: ["Style", "Look", "Good first use"],
            rows: [
              {
                label: "1",
                values: [
                  "`kind=\"linear\"`",
                  "Straight segments",
                  "First try, few points",
                ],
              },
              {
                label: "2",
                values: [
                  "`kind=\"cubic\"`",
                  "Smoother curve",
                  "When you have more points",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: cubic interp1d",
            content: `import numpy as np
from scipy.interpolate import interp1d

x = np.array([0, 1, 2, 3, 4])
y = np.array([0, 1, 0, 1, 0])

f = interp1d(x, y, kind="cubic")
print("Smooth estimate at 1.5:", round(float(f(1.5)), 4))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** Cubic needs enough points. If you only have two samples, start with linear.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Begin with linear. Switch to cubic only when you want a smoother look and you have several points.",
          },
          quiz(
            "Cubic interpolation is used to…",
            [
              "Delete all data",
              "Make a smoother path through points",
              "Only sort integers",
              "Compile C++",
            ],
            1,
            "Cubic splines create smoother interpolations when you have enough points.",
          ),
        ],
        challenge: challenge(
          "Cubic at 1.5",
          "Use interp1d with kind='cubic' on x=0..4 and y=[0,1,0,1,0]. Print float(f(2.5)).",
          `import numpy as np
from scipy.interpolate import interp1d
# build cubic f, then print float(f(2.5))
`,
          `import numpy as np
from scipy.interpolate import interp1d
x = np.array([0, 1, 2, 3, 4])
y = np.array([0, 1, 0, 1, 0])
f = interp1d(x, y, kind="cubic")
print(float(f(2.5)))`,
          [
            kw(1, "Uses cubic", "kind cubic", "kind\\s*=\\s*[\"']cubic[\"']"),
            kw(2, "Uses interp1d", "interp1d", "interp1d\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "stats",
    title: "Statistics",
    icon: "bar-chart",
    color: "#6366f1",
    lessons: [
      {
        id: "scipy-16",
        title: "Distributions in Plain Words",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Not every result happens equally often. Some values show up a lot. Others are rare.\n\nA **distribution** is that pattern — it tells you **what is common** and **what is uncommon**.\n\nIn simple words:\n\n• It is a picture of chance for a set of outcomes\n• Many real things cluster near a “typical” value\n• Extreme values can still happen, but less often\n• SciPy already has ready-made distribution helpers\n\n**Real-life example:** A bus is often about 5 minutes late. Sometimes it is on time. Almost never 40 minutes late. That “often near the middle, rare far away” shape is a distribution.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What a distribution means in everyday language\n• How to use `stats.norm` (the bell curve)\n• What `pdf` and `cdf` mean in beginner words\n• How to print a simple result from SciPy",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Imagine exam marks in a class. Many students score near 70–80. Only a few score 40 or 98. The overall shape of those marks is the distribution — not one single score, but the full pattern.",
          },
          {
            type: "table",
            title: "Two helpful tools",
            columns: ["Tool", "Simple meaning", "Everyday question"],
            rows: [
              {
                label: "1",
                values: [
                  "`pdf(x)`",
                  "How common is this value?",
                  "Is this score usual?",
                ],
              },
              {
                label: "2",
                values: [
                  "`cdf(x)`",
                  "How much is at or below x?",
                  "What share scored this or less?",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: normal distribution",
            content: `from scipy import stats

# loc = middle (center), scale = how wide the spread is
norm = stats.norm(loc=0, scale=1)

print("pdf at 0:", norm.pdf(0))
print("cdf at 0:", norm.cdf(0))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** `loc` is the center. `scale` is the spread. Bigger scale = wider bell curve.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Start with `stats.norm`. It is the classic bell curve and the easiest first distribution to try.",
          },
          quiz(
            "A distribution tells you…",
            [
              "Only how to save a file",
              "Which outcomes are common and which are rare",
              "How to design a website",
              "What keyboard to buy",
            ],
            1,
            "A distribution is the pattern of chance — what happens often vs rarely.",
          ),
        ],
        challenge: challenge(
          "Normal pdf",
          "Create stats.norm(loc=0, scale=1) and print its pdf(0).",
          `from scipy import stats
# create norm, then print pdf(0)
`,
          `from scipy import stats
norm = stats.norm(loc=0, scale=1)
print(norm.pdf(0))`,
          [
            kw(1, "Uses norm", "stats.norm", "stats\\.norm\\s*\\("),
            kw(2, "Uses pdf", ".pdf", "\\.pdf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-17",
        title: "Describe Your Data",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Before you guess or test anything, look at your numbers first.\n\n**Descriptive stats** give a short summary of a list:\n\n• **nobs** — how many values you have (the count)\n• **mean** — the average (the typical center)\n• **variance** — how spread out the values are\n• SciPy’s `stats.describe` prints these in one call\n\n**Real-life example:** A teacher has quiz scores: 88, 92, 76, 95, 84. First questions: *How many scores? What is the average? Are most students close to that average, or all mixed?*",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to run `stats.describe` on a NumPy array\n• How to read `nobs`, `mean`, and `variance`\n• Why a quick summary saves time later\n• How spread (variance) changes the story",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Two classes both average 80. In Class A, almost everyone scored 78–82. In Class B, scores range from 40 to 100. Same average — very different stories. Variance is what shows that difference.",
          },
          {
            type: "table",
            title: "Useful fields from describe",
            columns: ["Field", "Meaning", "Plain question"],
            rows: [
              {
                label: "1",
                values: ["nobs", "How many values", "How big is my sample?"],
              },
              {
                label: "2",
                values: ["mean", "Average / typical center", "What is usual?"],
              },
              {
                label: "3",
                values: ["variance", "Spread around the mean", "Are values close or mixed?"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: describe quiz scores",
            content: `import numpy as np
from scipy import stats

scores = np.array([88, 92, 76, 95, 84])
d = stats.describe(scores)

print("count (nobs):", d.nobs)
print("average (mean):", d.mean)
print("spread (variance):", d.variance)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** High variance = mixed values (some low, some high). Low variance = most values sit near the average.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Always check `nobs` first. A summary of 5 scores is different from a summary of 500.",
          },
          quiz(
            "After `d = stats.describe(scores)`, what is `d.nobs`?",
            [
              "How many scores were used",
              "The highest score only",
              "The teacher’s name",
              "Whether the quiz was online",
            ],
            0,
            "nobs is the count — how many numbers went into the summary.",
          ),
        ],
        challenge: challenge(
          "Describe mean",
          "For scores = np.array([10, 20, 30]), print stats.describe(scores).mean.",
          `import numpy as np
from scipy import stats
# describe scores and print the mean
`,
          `import numpy as np
from scipy import stats
scores = np.array([10, 20, 30])
print(stats.describe(scores).mean)`,
          [
            kw(1, "Uses describe", "stats.describe", "stats\\.describe\\s*\\("),
            kw(2, "Uses mean", ".mean", "\\.mean"),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-18",
        title: "A Gentle Hypothesis Test",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Sometimes your numbers look different from what you expected. The big question is: **Is this a real change, or just luck?**\n\nA **hypothesis test** helps check that carefully. In this lesson you use `stats.ttest_1samp`:\n\n• You give SciPy your sample numbers\n• You give a reference value (like “usual average = 20”)\n• SciPy returns a **statistic** and a **p-value**\n• The p-value is a **clue about surprise** — not final proof\n\n**Real-life example:** Your class usually averages 20 on a quiz. Today’s scores look a bit higher. Did a new study method help — or could this bump happen by chance?",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to run `stats.ttest_1samp`\n• How to read the p-value in simple words\n• Why a small p-value means “this looks surprising”\n• Why you still need a clear question and good data",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "A fair coin should give about half heads. If you get 9 heads in 10 flips, that feels odd. A test asks: “If the coin were fair, how surprising is 9 heads?” The p-value answers that “how surprising” part.",
          },
          {
            type: "table",
            title: "ttest_1samp in three steps",
            columns: ["Step", "What you write", "What it means"],
            rows: [
              {
                label: "1",
                values: [
                  "Store sample",
                  "`sample = np.array([...])`",
                  "Your measured values",
                ],
              },
              {
                label: "2",
                values: [
                  "Run test",
                  "`stat, p = stats.ttest_1samp(sample, popmean=20)`",
                  "Compare to a reference mean",
                ],
              },
              {
                label: "3",
                values: [
                  "Read p-value",
                  "`print(p)`",
                  "How surprising under the old idea",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: one-sample t-test",
            content: `import numpy as np
from scipy import stats

# Compare these scores to a usual mean of 20
sample = np.array([20, 22, 19, 21, 23])
stat, p = stats.ttest_1samp(sample, popmean=20)

print("statistic:", stat)
print("p-value:", p)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Watch out:** A small p-value does **not** automatically mean “important in real life.” Ask: Is the question clear? Is the data trustworthy?",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** `ttest_1samp` returns two values. Use the **second** one (`p`) for the p-value. Small p ≈ more surprising. Large p ≈ could easily be luck.",
          },
          quiz(
            "A p-value helps you judge…",
            [
              "How surprising the data look under a simple assumption",
              "How to compile Java",
              "How to resize images",
              "How to name variables",
            ],
            0,
            "The p-value is about surprise under an assumption — not automatic proof.",
          ),
        ],
        challenge: challenge(
          "ttest_1samp",
          "Run stats.ttest_1samp on np.array([10,12,11,13,12]) with popmean=10. Print the p-value (second return).",
          `import numpy as np
from scipy import stats
# run ttest_1samp and print p
`,
          `import numpy as np
from scipy import stats
sample = np.array([10, 12, 11, 13, 12])
stat, p = stats.ttest_1samp(sample, popmean=10)
print(p)`,
          [
            kw(1, "Uses ttest_1samp", "ttest_1samp", "ttest_1samp\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "linalg",
    title: "Linear Algebra",
    icon: "hash",
    color: "#4f46e5",
    lessons: [
      {
        id: "scipy-19",
        title: "SciPy linalg vs NumPy",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** NumPy already stores numbers in tables (matrices). **Linear algebra** is the math of those tables — multiplying them, measuring them, and solving equation systems.\n\n**NumPy** gives you the arrays. **`scipy.linalg`** adds extra tools for matrix jobs: determinants, solvers, eigenvalues, and more.\n\nIn simple words:\n\n• A matrix is a grid of numbers (rows and columns)\n• SciPy’s `linalg` module helps you work with that grid\n• You still build the matrix with NumPy\n• Then you call SciPy for the harder matrix tools\n\n**Real-life example:** A bakery mixes flour and sugar with two recipes and two total costs. That story becomes equations in a matrix — SciPy can help solve them.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Why SciPy has its own `linalg` module\n• How to import `from scipy import linalg`\n• What a determinant (`det`) is in beginner words\n• How to try `linalg.det` on a small matrix",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "NumPy is the notebook where you write the number grid. SciPy `linalg` is the calculator that answers questions about that grid — like “how special is this matrix?” or “what values solve these equations?”",
          },
          {
            type: "table",
            title: "NumPy vs SciPy linalg",
            columns: ["Tool", "Job", "Beginner tip"],
            rows: [
              {
                label: "1",
                values: [
                  "NumPy arrays",
                  "Store the matrix",
                  "Start with `np.array([...])`",
                ],
              },
              {
                label: "2",
                values: [
                  "`scipy.linalg`",
                  "Solve / measure matrices",
                  "Use for det, solve, eigvals",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: determinant with SciPy",
            content: `import numpy as np
from scipy import linalg

A = np.array([[1.0, 2.0], [3.0, 4.0]])
print("det:", linalg.det(A))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** A determinant near **0** can mean the matrix is “badly behaved” for solving — like equations that do not have a clear unique answer.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Keep matrices as floats (`1.0`, `2.0`) so SciPy solvers behave more smoothly.",
          },
          quiz(
            "scipy.linalg is mainly for…",
            [
              "Matrix and linear-algebra tools",
              "CSS styling",
              "Email servers",
              "Only drawing pie charts",
            ],
            0,
            "scipy.linalg focuses on matrix math: determinants, solvers, eigenvalues, and more.",
          ),
        ],
        challenge: challenge(
          "Matrix det",
          "For A = [[2,0],[0,3]], print linalg.det(A).",
          `import numpy as np
from scipy import linalg
# build A, then print linalg.det(A)
`,
          `import numpy as np
from scipy import linalg
A = np.array([[2.0, 0.0], [0.0, 3.0]])
print(linalg.det(A))`,
          [
            kw(1, "Uses linalg.det", "linalg.det", "linalg\\.det\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-20",
        title: "Solve Equations & Inverses",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Many real problems become **equations with unknowns**. In matrix form we write:\n\n**A x = b**\n\n• **A** — the known numbers (coefficients)\n• **b** — the known results\n• **x** — the unknown values you want\n\nSciPy’s **`linalg.solve(A, b)`** finds **x**. An **inverse** (when it exists) is like an “undo” button for matrix multiplication.\n\n**Real-life example:** A shop sells apples and bananas. Two deals give two totals. You do not know the price of each fruit. Two equations → two unknowns → `solve` finds the prices.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• How to set up a small 2×2 system\n• How to call `linalg.solve(A, b)`\n• How to check the answer with `A @ x`\n• What an inverse means in plain words",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Deal 1: 3 apples + 1 banana = $9. Deal 2: 1 apple + 2 bananas = $8. SciPy searches for apple price and banana price that fit both deals at once.",
          },
          {
            type: "table",
            title: "solve in three steps",
            columns: ["Step", "What you write", "What it means"],
            rows: [
              {
                label: "1",
                values: [
                  "Build A and b",
                  "`A = np.array([[...]])`",
                  "Known matrix and totals",
                ],
              },
              {
                label: "2",
                values: [
                  "Solve",
                  "`x = linalg.solve(A, b)`",
                  "Find the unknowns",
                ],
              },
              {
                label: "3",
                values: [
                  "Check",
                  "`print(A @ x)`",
                  "Should match b (or be very close)",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: solve Ax = b",
            content: `import numpy as np
from scipy import linalg

A = np.array([[3.0, 1.0], [1.0, 2.0]])
b = np.array([9.0, 8.0])

x = linalg.solve(A, b)
print("x =", x)
print("Check A @ x =", A @ x)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** Prefer `linalg.solve` over computing an inverse by hand. Solving is usually safer and clearer for beginners.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Always check with `A @ x`. If it matches `b`, your solution fits the equations.",
          },
          quiz(
            "Two shop deals give two equations with two unknown prices. Why use `linalg.solve(A, b)`?",
            [
              "It finds the x values that make A @ x equal b",
              "It turns the matrix into a pie chart",
              "It removes duplicate spreadsheet rows",
              "It picks random dashboard colors",
            ],
            0,
            "linalg.solve finds x in A x = b — the unknowns that fit your equations.",
          ),
        ],
        challenge: challenge(
          "Solve system",
          "Solve A=[[1,0],[0,2]], b=[4,10] with linalg.solve. Print x.",
          `import numpy as np
from scipy import linalg
# build A and b, solve, then print x
`,
          `import numpy as np
from scipy import linalg
A = np.array([[1.0, 0.0], [0.0, 2.0]])
b = np.array([4.0, 10.0])
x = linalg.solve(A, b)
print(x)`,
          [
            kw(1, "Uses solve", "linalg.solve", "linalg\\.solve\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-21",
        title: "Eigenvalues Made Simple",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** Some matrices have special directions that only **stretch** or **shrink** — they do not twist sideways. The stretch amounts are called **eigenvalues**.\n\nIn simple words:\n\n• An eigenvalue is a special scaling factor of a matrix\n• SciPy can find them with `linalg.eigvals`\n• You do not need deep theory to try a small example\n• Real systems (vibration, stretch) often connect to this idea\n\n**Real-life example:** A guitar string has natural notes it likes to vibrate at. Eigenvalues are a math cousin of those “natural modes.”",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What an eigenvalue means in beginner words\n• How to call `linalg.eigvals(A)`\n• How to read the printed numbers\n• Why a diagonal matrix is a friendly first example",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Imagine a rubber sheet. Pulling in one direction stretches it by 2. Pulling in another stretches it by 5. Those stretch amounts are like eigenvalues — special scale factors for special directions.",
          },
          {
            type: "table",
            title: "Friendly first example",
            columns: ["Matrix idea", "What you notice"],
            rows: [
              {
                label: "1",
                values: [
                  "Diagonal A = [[2, 0], [0, 5]]",
                  "Eigenvalues are often 2 and 5",
                ],
              },
              {
                label: "2",
                values: [
                  "`linalg.eigvals(A)`",
                  "SciPy prints those stretch factors",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Try it: eigenvalues",
            content: `import numpy as np
from scipy import linalg

A = np.array([[2.0, 0.0], [0.0, 5.0]])
vals = linalg.eigvals(A)
print("Eigenvalues:", vals)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** For a simple diagonal matrix, eigenvalues often match the numbers on the diagonal — a nice check for beginners.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Do not worry about complex numbers yet. Focus on reading the printed stretch factors from a tiny matrix.",
          },
          quiz(
            "Eigenvalues are related to…",
            [
              "Special stretch factors of a matrix",
              "Only JSON parsing",
              "Font sizes",
              "Wi-Fi passwords",
            ],
            0,
            "Eigenvalues are characteristic stretch factors along special directions.",
          ),
        ],
        challenge: challenge(
          "eigvals",
          "For diagonal A=[[4,0],[0,9]], print linalg.eigvals(A).",
          `import numpy as np
from scipy import linalg
# build A, then print linalg.eigvals(A)
`,
          `import numpy as np
from scipy import linalg
A = np.array([[4.0, 0.0], [0.0, 9.0]])
print(linalg.eigvals(A))`,
          [
            kw(1, "Uses eigvals", "linalg.eigvals", "linalg\\.eigvals\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "signal",
    title: "Signal, FFT & Capstone",
    icon: "radio",
    color: "#7c3aed",
    lessons: [
      {
        id: "scipy-22",
        title: "FFT — Hearing the Frequencies",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** An **FFT** (Fast Fourier Transform) splits a signal into **frequency pieces** — like hearing which notes are inside a sound.\n\n**Real-life example:** A tuning app shows which pitch a guitar string is playing. FFT ideas power that view.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Build a simple sine signal\n• Run an FFT\n• Spot a strong frequency bin",
          },
          {
            type: "code",
            lang: "python",
            label: "Tiny FFT demo",
            content: `import numpy as np
from scipy.fft import fft, fftfreq

n = 64
t = np.arange(n)
sig = np.sin(2 * np.pi * 3 * t / n)
spec = np.abs(fft(sig))
freqs = fftfreq(n, d=1)
peak = np.argmax(spec[: n // 2])
print("Peak bin:", peak)
print("Peak freq:", freqs[peak])`,
          },
          quiz(
            "FFT helps you see…",
            [
              "Frequency content of a signal",
              "Only file permissions",
              "CSS grids",
              "Git commits",
            ],
            0,
            "FFT reveals frequency components.",
          ),
        ],
        challenge: challenge(
          "FFT magnitude",
          "Create sig = np.array([0,1,0,-1]). Print np.abs(fft(sig)) using scipy.fft.fft.",
          `import numpy as np
from scipy.fft import fft
`,
          `import numpy as np
from scipy.fft import fft
sig = np.array([0.0, 1.0, 0.0, -1.0])
print(np.abs(fft(sig)))`,
          [
            kw(1, "Uses fft", "fft(", "fft\\s*\\("),
            kw(2, "Uses abs", "np.abs", "np\\.abs\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-23",
        title: "Simple Signal Peaks",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Peak finding** locates local highs in a signal — heartbeats, drum hits, or sensor spikes.\n\n**Real-life example:** A fitness watch finds pulse peaks in a noisy light sensor signal.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Use `find_peaks`\n• Print peak indexes\n• Keep signals short for practice",
          },
          {
            type: "code",
            lang: "python",
            label: "Find peaks",
            content: `import numpy as np
from scipy.signal import find_peaks

sig = np.array([0, 1, 0, 2, 0, 3, 0])
peaks, _ = find_peaks(sig)
print("Peak indexes:", peaks)
print("Peak values:", sig[peaks])`,
          },
          quiz(
            "A watch signal looks like [0, 1, 0, 2, 0, 3, 0]. What does `find_peaks(sig)` help you find?",
            [
              "The positions of local highs — useful for heartbeats or drum hits",
              "The monthly average rainfall for a city",
              "Duplicate rows in a SQL table",
              "Which font size looks best in the app",
            ],
            0,
            "find_peaks locates local maximum indexes in a signal — the peaks you care about in sensor data.",
          ),
        ],
        challenge: challenge(
          "Peak indexes",
          "On sig = np.array([1,3,1,4,1]), print find_peaks(sig)[0].",
          `import numpy as np
from scipy.signal import find_peaks
`,
          `import numpy as np
from scipy.signal import find_peaks
sig = np.array([1, 3, 1, 4, 1])
print(find_peaks(sig)[0])`,
          [
            kw(1, "Uses find_peaks", "find_peaks", "find_peaks\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-24",
        title: "Capstone Lab — Science Toolkit",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** This **capstone** combines skills: describe data, integrate a curve, and minimize a cost — a mini science report.\n\n**Real-life example:** A lab notebook page: summarize measurements, total a quantity under a curve, then find a best setting.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Chain stats + integrate + optimize\n• Print a tiny report\n• Celebrate finishing SciPy Mastery",
          },
          {
            type: "diagram",
            title: "Capstone pipeline",
            nodes: [
              {
                id: "data",
                label: "Describe data",
                color: "#6366f1",
                items: ["stats.describe"],
              },
              {
                id: "area",
                label: "Integrate",
                color: "#06b6d4",
                items: ["integrate.quad"],
              },
              {
                id: "best",
                label: "Optimize",
                color: "#8b5cf6",
                items: ["optimize.minimize"],
              },
              {
                id: "report",
                label: "Report",
                color: "#0d9488",
                items: ["Print results"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Mini science toolkit",
            content: `import numpy as np
from scipy import stats, integrate, optimize

data = np.array([2.0, 3.0, 4.0, 5.0])
print("Mean:", stats.describe(data).mean)

def f(x):
    return x
area, _ = integrate.quad(f, 0, 2)
print("Area:", area)

def cost(x):
    return (x - 1) ** 2
best = optimize.minimize(cost, x0=0.0)
print("Best x:", best.x[0])`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**Key takeaways:** SciPy extends NumPy with integrate, optimize, interpolate, stats, linalg, and signal/FFT tools. Start from a definition, try a tiny example, then combine tools into pipelines.",
          },
          quiz(
            "A strong SciPy habit is…",
            [
              "Skip checking results",
              "Use NumPy data + the right SciPy module + print checks",
              "Never use arrays",
              "Only memorize theory with no code",
            ],
            1,
            "Combine clear data, the right tool, and readable checks.",
          ),
        ],
        challenge: challenge(
          "Toolkit trio",
          "Print stats.describe(np.array([1.0,2.0,3.0])).mean, then integrate.quad(lambda x: x, 0, 1)[0], then optimize.minimize(lambda x: (x-2)**2, x0=0).x[0].",
          `import numpy as np
from scipy import stats, integrate, optimize
`,
          `import numpy as np
from scipy import stats, integrate, optimize
print(stats.describe(np.array([1.0, 2.0, 3.0])).mean)
print(integrate.quad(lambda x: x, 0, 1)[0])
print(optimize.minimize(lambda x: (x - 2) ** 2, x0=0.0).x[0])`,
          [
            kw(1, "Uses describe", "stats.describe", "stats\\.describe\\s*\\("),
            kw(2, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(3, "Uses minimize", "optimize.minimize", "optimize\\.minimize\\s*\\("),
          ],
        ),
      },
    ],
  },
];

export const SCIPY_LESSONS = applySecondQuizzes(
  applyLessonVideoLinks(
    SCIPY_CHAPTERS.flatMap((ch) =>
      ch.lessons.map((l) => ({
        ...l,
        challenge: l.challenge
          ? { ...l.challenge, id: l.challenge.id || l.id }
          : l.challenge,
        outcomes: l.outcomes ?? SCIPY_LESSON_OUTCOMES[l.id] ?? [],
        chapterId: ch.id,
        chapterTitle: ch.title,
        chapterColor: ch.color,
      })),
    ),
    SCIPY_VIDEO_LINKS,
  ),
  SCIPY_SECOND_QUIZZES,
);

export const SCIPY_TOTAL_XP = SCIPY_LESSONS.reduce((s, l) => s + l.xp, 0);
