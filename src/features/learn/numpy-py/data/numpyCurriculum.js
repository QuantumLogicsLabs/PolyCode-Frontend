// PolyCode — NumPy (Python) full curriculum
// 11 chapters · 36 lessons · Python coding challenges
// YouTube links: edit numpyVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { applySecondQuizzes } from "../../shared/applySecondQuizzes";
import { NUMPY_VIDEO_LINKS } from "./numpyVideoLinks";
import { NUMPY_LESSON_OUTCOMES } from "./numpyLessonOutcomes";
import { NUMPY_SECOND_QUIZZES } from "./numpySecondQuizzes";

export const NUMPY_CHAPTERS = [
  {
    id: "intro",
    title: "What is NumPy?",
    icon: "🔢",
    color: "#4f46e5",
    lessons: [
      {
        id: "numpy-0",
        title: "What is NumPy?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**NumPy** (say: “num-pie”) is a free Python tool for working with **lots of numbers at once**. If you ever add up test scores, daily steps, or prices in a list — NumPy makes that fast and easy.",
            code: {
              lang: "python",
              label: "Add 500 steps to each day in one line",
              content: `import numpy as np

steps = np.array([4000, 5200, 6100])
print(steps + 500)   # every day gets +500`,
            },
          },
          {
            type: "text",
            content:
              "The main thing NumPy gives you is an **ndarray** (a number array). Think of it like a neat row or table of numbers — not mixed with text, just numbers ready for math.",
            code: {
              lang: "python",
              label: "A small table: rows = students, columns = subjects",
              content: `import numpy as np

grades = np.array([[78, 85],
                   [92, 88]])
print(grades.shape)   # (2, 2) = 2 rows, 2 columns`,
            },
          },
          {
            type: "diagram",
            title: "Where people use NumPy",
            nodes: [
              {
                id: "school",
                label: "School & homework",
                color: "#4f46e5",
                items: ["Averages and grades", "Simple statistics"],
              },
              {
                id: "apps",
                label: "Apps you use",
                color: "#6366f1",
                items: ["Charts and graphs", "Spreadsheet-style data"],
              },
              {
                id: "future",
                label: "Later in your journey",
                color: "#8b5cf6",
                items: ["Data science", "Machine learning basics"],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You'll almost always start with `import numpy as np`. The nickname `np` is used everywhere — it's the standard shortcut.",
          },
          {
            type: "quiz",
            question: "What is NumPy best at?",
            options: [
              "Writing website HTML",
              "Doing math on many numbers quickly",
              "Sending emails",
              "Drawing UI buttons",
            ],
            answer: 1,
            explanation:
              "NumPy is built for numeric arrays and fast math on whole groups of numbers.",
          },
        ],
        challenge: {
          title: "Your First ndarray",
          description:
            "Import NumPy as `np`, create `temps = np.array([18, 22, 19])`, and print `temps + 3` (three warmer days).",
          starterCode: `# Import NumPy as np
# Create temps and print temps + 3

`,
          solutionCode: `import numpy as np

temps = np.array([18, 22, 19])
print(temps + 3)`,
          tests: [
            {
              id: 1,
              label: "Imports numpy as np",
              hint: "import numpy as np",
              keywords: [{ pattern: "import\\s+numpy\\s+as\\s+np" }],
            },
            {
              id: 2,
              label: "Uses np.array",
              hint: "np.array([18, 22, 19])",
              keywords: [{ pattern: "np\\.array\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints temps + 3",
              hint: "print(temps + 3)",
              keywords: [{ pattern: "print\\s*\\(\\s*temps\\s*\\+\\s*3\\s*\\)" }],
            },
          ],
        },
      },
      {
        id: "numpy-1",
        title: "Lists vs NumPy Arrays",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "A Python **list** can hold anything: numbers, words, even other lists. That's flexible — but when you only have numbers and want to do math on hundreds of them, lists get slow and wordy.",
            code: {
              lang: "python",
              label: "List way — write a loop",
              content: `numbers = [1, 2, 3, 4]
doubled = [n * 2 for n in numbers]
print(doubled)   # [2, 4, 6, 8]`,
            },
          },
          {
            type: "text",
            content:
              "A NumPy **array** is like a dedicated number box: same type, stored together, built for speed. One line like `numbers * 2` doubles every value — no loop needed.",
            code: {
              lang: "python",
              label: "NumPy way — one line, no loop",
              content: `import numpy as np

numbers = np.array([1, 2, 3, 4])
doubled = numbers * 2
print(doubled)   # [2 4 6 8]`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use a **list** for small mixed data (names + ages in one list). Use a **NumPy array** when you have lots of numbers and want quick math.",
          },
          {
            type: "diagram",
            title: "List vs ndarray",
            nodes: [
              {
                id: "list",
                label: "Python list",
                color: "#f43f5e",
                items: ["Numbers, text, anything", "Need a loop for math", "Great for small tasks"],
              },
              {
                id: "ndarray",
                label: "NumPy array",
                color: "#4f46e5",
                items: ["Numbers of one type", "Math on the whole group", "Fast for big data"],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Always write `import numpy as np` at the top. Everyone in the Python world uses `np` as the short name.",
          },
          {
            type: "quiz",
            question: "What do we call NumPy's main number container?",
            options: ["list", "tuple", "ndarray", "dict"],
            answer: 2,
            explanation:
              "NumPy stores numbers in an ndarray — a fast, typed number array.",
          },
        ],
        challenge: {
          title: "Import NumPy and Build an Array",
          description:
            "Import NumPy as `np`, create a 1D array from `[10, 20, 30]`, and print it.",
          starterCode: `# Import NumPy as np
# Create the array and print it

`,
          solutionCode: `import numpy as np

arr = np.array([10, 20, 30])
print(arr)`,
          tests: [
            {
              id: 1,
              label: "Imports numpy as np",
              hint: "import numpy as np",
              keywords: [{ pattern: "import\\s+numpy\\s+as\\s+np" }],
            },
            {
              id: 2,
              label: "Uses np.array",
              hint: "np.array([10, 20, 30])",
              keywords: [{ pattern: "np\\.array\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the array",
              hint: "print(arr)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-2",
        title: "Shape, dtype & Vector Math",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Every NumPy array has a **shape** — how many rows and columns it has. `[10, 20, 30]` has shape `(3,)` (three numbers in a row). A table of grades might have shape `(5, 4)` — five students, four subjects. **dtype** tells you what kind of number is inside: whole numbers (`int64`), decimals (`float64`), or True/False (`bool`).",
            code: {
              lang: "python",
              label: "Check shape and dtype",
              content: `import numpy as np

scores = np.array([88, 92, 75, 100, 85])
print(scores.shape)   # (5,) — five scores
print(scores.dtype)   # usually int64`,
            },
          },
          {
            type: "diagram",
            title: "Array attributes",
            nodes: [
              {
                id: "shape",
                label: "shape",
                color: "#4f46e5",
                items: ["(3,) = 3 numbers in a row", "(2, 4) = 2 rows, 4 cols", "Like rows × columns in Excel"],
              },
              {
                id: "dtype",
                label: "dtype (data type)",
                color: "#10b981",
                items: ["int = whole numbers", "float = decimals", "bool = True/False"],
              },
            ],
          },
          {
            type: "text",
            content:
              "**Vector math** means doing one math action on a **whole row of numbers at once**. Picture five test scores: instead of adding 5 points to each score in a slow loop, you add 5 to the entire row in one go. That row of numbers is called a **vector** — just a fancy word for an ordered list of numbers.",
            code: {
              lang: "python",
              label: "Add a number to every score — no loop",
              content: `import numpy as np

scores = np.array([88, 92, 75, 100, 85])
print(scores + 5)     # each score + 5
print(scores * 2)     # each score doubled`,
            },
          },
          {
            type: "text",
            content:
              "In NumPy, a 1D array **is** your vector. Write `scores + 5` and NumPy adds 5 to **every** score. Write `a + b` when both arrays are the same length, and NumPy adds matching pairs: first + first, second + second, and so on. Same idea works for `-`, `*`, and `/` — that's **element-wise** (or **vectorized**) math.",
            code: {
              lang: "python",
              label: "Add two arrays — same length, pair by pair",
              content: `import numpy as np

monday = np.array([4000, 5200, 6100])    # steps each day
tuesday = np.array([4500, 4800, 5900])
total = monday + tuesday                 # pair by pair
print(total)   # [8500 10000 12000]`,
            },
          },
          {
            type: "diagram",
            title: "Vector math in NumPy",
            nodes: [
              {
                id: "idea",
                label: "What vector math means",
                color: "#6366f1",
                items: [
                  "One operation on many numbers",
                  "No for-loop needed",
                  "Like filling a whole Excel column at once",
                ],
              },
              {
                id: "numpy",
                label: "How NumPy does it",
                color: "#4f46e5",
                items: [
                  "scores + 5 → add 5 to each score",
                  "scores * 2 → double every score",
                  "a + b → add matching pairs (same length)",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "When you write `scores + 5` or `a + b`, NumPy applies the math to **every** element at once. That one-line trick is called **vectorization** — and it's why NumPy feels like magic compared to writing loops.",
          },
          {
            type: "quiz",
            question: "An array `[1, 2, 3]` has how many numbers in its shape?",
            options: ["(3, 1)", "(3,)", "(1, 3)", "3 alone with no comma"],
            answer: 1,
            explanation: "A 1D array of length 3 has shape `(3,)`. The comma means 'one dimension'.",
          },
          {
            type: "quiz",
            question: "What does `np.array([2, 4, 6]) + np.array([1, 1, 1])` give you?",
            options: [
              "One single number: 15",
              "[3, 5, 7] — each pair added",
              "An error — you can't add arrays",
              "[2, 4, 6, 1, 1, 1] — glued together",
            ],
            answer: 1,
            explanation:
              "NumPy adds matching positions: 2+1, 4+1, 6+1 → [3, 5, 7]. Both arrays must be the same length.",
          },
        ],
        challenge: {
          title: "Boost Every Score",
          description:
            "Create `np.array([1, 2, 3, 4])`, add 100 to every element, and print the result and the array's `shape`.",
          starterCode: `import numpy as np

# Create array, add 100, print result and shape

`,
          solutionCode: `import numpy as np

a = np.array([1, 2, 3, 4])
result = a + 100
print(result)
print(result.shape)`,
          tests: [
            {
              id: 1,
              label: "Uses np.array",
              hint: "np.array([1, 2, 3, 4])",
              keywords: [{ pattern: "np\\.array\\s*\\(" }],
            },
            {
              id: 2,
              label: "Adds 100 to the array",
              hint: "a + 100",
              keywords: [{ pattern: "\\+\\s*100" }],
            },
            {
              id: 3,
              label: "Prints shape",
              hint: "print(...shape)",
              keywords: [
                { pattern: "\\.shape" },
                { pattern: "print\\s*\\(" },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "creation",
    title: "Creating Arrays",
    icon: "🧱",
    color: "#6366f1",
    lessons: [
      {
        id: "numpy-2a",
        title: "np.array()",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "You already know **Python lists** — great for mixing names, numbers, and text. But when your data is **only numbers** (scores, prices, sensor readings), staying on a plain list makes math awkward: Python does not add a number to **every** item in one step.",
            code: {
              lang: "python",
              label: "List problem — you need a loop for simple math",
              content: `scores = [88, 92, 75, 100]

# scores + 5  → TypeError! Can't add int to whole list

boosted = [s + 5 for s in scores]   # loop required
print(boosted)   # [93, 97, 80, 105]`,
            },
          },
          {
            type: "text",
            content:
              "That is why we **convert** a list with **`np.array()`**. Same numbers, but now they live in an **ndarray** — one type, stored together, built for fast **vector math** (add, multiply, or divide the whole row at once).",
            code: {
              lang: "python",
              label: "Convert once, then math without a loop",
              content: `import numpy as np

scores = [88, 92, 75, 100]
arr = np.array(scores)   # list → ndarray

print(arr + 5)   # [93 97 80 105] — every score + 5
print(arr * 2)   # [176 184 150 200] — every score doubled`,
            },
          },
          {
            type: "diagram",
            title: "Why convert with np.array()?",
            nodes: [
              {
                id: "list",
                label: "Python list",
                color: "#f43f5e",
                items: [
                  "Flexible (any types)",
                  "Loops for numeric math",
                  "Slower on large data",
                ],
              },
              {
                id: "ndarray",
                label: "After np.array()",
                color: "#4f46e5",
                items: [
                  "Numbers of one type",
                  "Math on the whole array",
                  "Much faster at scale",
                ],
              },
            ],
          },
          {
            type: "text",
            content:
              "The most common way to make a NumPy array is **`np.array()`**. Pass it a Python list (or lists inside lists) and NumPy turns it into a fast **ndarray** — ready for math.",
            code: {
              lang: "python",
              label: "Turn a list into a 1D array",
              content: `import numpy as np

scores = [88, 92, 75, 100]
arr = np.array(scores)
print(arr)          # [ 88  92  75 100]
print(type(arr))    # <class 'numpy.ndarray'>`,
            },
          },
          {
            type: "text",
            content:
              "Nest lists to build a **2D table** — like rows of students and columns of subjects. NumPy stores it as one array with shape `(rows, columns)`.",
            code: {
              lang: "python",
              label: "Build a 2×3 grade table",
              content: `import numpy as np

grades = np.array([[78, 85, 90],
                   [92, 88, 95]])
print(grades)
print(grades.shape)   # (2, 3) = 2 rows, 3 columns`,
            },
          },
          {
            type: "diagram",
            title: "Ways to fill np.array()",
            nodes: [
              {
                id: "1d",
                label: "1D array",
                color: "#6366f1",
                items: ["One flat list", "Like a single row of numbers", "shape (5,) for 5 items"],
              },
              {
                id: "2d",
                label: "2D array",
                color: "#4f46e5",
                items: ["List of lists", "Rows and columns", "shape (2, 3) for 2×3 table"],
              },
            ],
          },
          {
            type: "text",
            content:
              "You can also tell NumPy the **dtype** when you create the array — for example `float64` for decimals or `int32` for smaller whole numbers. If you skip it, NumPy picks a sensible default.",
            code: {
              lang: "python",
              label: "Create floats from whole numbers",
              content: `import numpy as np

prices = np.array([10, 20, 30], dtype=float)
print(prices)       # [10. 20. 30.]
print(prices.dtype) # float64`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Rule of thumb:** keep a **list** when data is small or mixed (names + ages). Use **`np.array(your_list)`** when you have lots of numbers and want quick math without writing loops.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Always start with `import numpy as np`. Then `np.array(your_list)` is the go-to when you already have data in Python lists.",
          },
          {
            type: "quiz",
            question: "Why convert `[10, 20, 30]` with `np.array()` before doing math?",
            options: [
              "Lists cannot store integers",
              "ndarrays allow math on every element at once, without a loop",
              "np.array() sorts the numbers automatically",
              "Python lists are read-only",
            ],
            answer: 1,
            explanation:
              "A list holds values, but NumPy arrays are built for fast element-wise math on the whole group.",
          },
          {
            type: "quiz",
            question: "What does `np.array([[1, 2], [3, 4]]).shape` return?",
            options: ["(4,)", "(2, 2)", "(2,)", "4"],
            answer: 1,
            explanation: "Two rows and two columns → shape `(2, 2)`.",
          },
        ],
        challenge: {
          title: "Build a 1D Array",
          description:
            "Import NumPy as `np`, create `arr = np.array([5, 10, 15, 20])`, and print `arr` and `arr.shape`.",
          starterCode: `import numpy as np

# Create arr and print arr and arr.shape

`,
          solutionCode: `import numpy as np

arr = np.array([5, 10, 15, 20])
print(arr)
print(arr.shape)`,
          tests: [
            {
              id: 1,
              label: "Uses np.array",
              hint: "np.array([5, 10, 15, 20])",
              keywords: [{ pattern: "np\\.array\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints the array",
              hint: "print(arr)",
              keywords: [{ pattern: "print\\s*\\(\\s*arr\\s*\\)" }],
            },
            {
              id: 3,
              label: "Prints shape",
              hint: "print(arr.shape)",
              keywords: [
                { pattern: "arr\\.shape" },
                { pattern: "print\\s*\\(" },
              ],
            },
          ],
        },
      },
      {
        id: "numpy-3",
        title: "arange & linspace",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "In the last lesson, **`np.array()`** was for numbers you **already have** — like typing `[5, 10, 15, 20]` by hand. But what if you need **many numbers in a pattern** and do not want to type them all? That is when **`np.arange`** and **`np.linspace`** help — they **generate** the sequence for you.",
            code: {
              lang: "python",
              label: "np.array() — you supply every number",
              content: `import numpy as np

# You already know the values → use np.array()
hours = np.array([0, 2, 4, 6, 8])
print(hours)`,
            },
          },
          {
            type: "text",
            content:
              "**`np.arange(start, stop, step)`** is like **`range()`**, but it gives you a NumPy array. You pick where to start, where to stop, and the **gap** between numbers. The **stop value is left out** — same rule as Python `range()`.",
            code: {
              lang: "python",
              label: "Generate 0, 2, 4, 6, 8 — no typing each number",
              content: `import numpy as np

# Same as [0, 2, 4, 6, 8] but generated automatically
steps = np.arange(0, 10, 2)
print(steps)   # [0 2 4 6 8]  (10 is excluded)`,
            },
          },
          {
            type: "text",
            content:
              "**`np.linspace(start, stop, num)`** picks exactly **`num`** evenly spaced values **including both ends**. Use it when you care about **how many points** you want between two numbers — perfect for smooth charts.",
            code: {
              lang: "python",
              label: "Five values from 0.0 to 1.0 — both ends included",
              content: `import numpy as np

points = np.linspace(0, 1, 5)
print(points)
# [0.   0.25 0.5  0.75 1.  ]`,
            },
          },
          {
            type: "diagram",
            title: "Which one should I use?",
            nodes: [
              {
                id: "array",
                label: "np.array()",
                color: "#10b981",
                items: [
                  "You already have the numbers",
                  "Small, fixed lists",
                  "Example: test scores [88, 92, 75]",
                ],
              },
              {
                id: "arange",
                label: "np.arange",
                color: "#6366f1",
                items: [
                  "You know the step (gap)",
                  "Stop value excluded",
                  "Example: 0, 2, 4, 6, 8",
                ],
              },
              {
                id: "linspace",
                label: "np.linspace",
                color: "#4f46e5",
                items: [
                  "You know how many points",
                  "Both ends included",
                  "Example: 5 values from 0 to 10",
                ],
              },
            ],
          },
          {
            type: "text",
            content:
              "Same goal — get a row of numbers — but different tools. **`np.array()`** copies what you typed. **`arange`** counts by steps. **`linspace`** splits a range into equal pieces.",
            code: {
              lang: "python",
              label: "Three ways to get similar data",
              content: `import numpy as np

a = np.array([0, 2, 4, 6, 8])      # type them yourself
b = np.arange(0, 10, 2)            # generate with step 2
c = np.linspace(0, 8, 5)           # 5 points from 0 to 8

print(a)
print(b)
print(c)`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Simple pick:** already have data → **`np.array()`**. Need every 2nd or 5th number → **`arange`**. Need exactly 50 points for a graph → **`linspace`**.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Common mistake: expecting `arange(0, 10, 2)` to include 10. It will not. If you need 10 as the last value, use `linspace(0, 10, 6)` instead.",
          },
          {
            type: "quiz",
            question: "You already wrote `[1, 2, 3, 4, 5]`. Which function fits best?",
            options: ["np.arange", "np.linspace", "np.array()", "np.zeros"],
            answer: 2,
            explanation:
              "When you already have the full list, `np.array([1, 2, 3, 4, 5])` is the right choice.",
          },
          {
            type: "quiz",
            question: "Which function includes the stop value by default?",
            options: ["arange", "linspace", "np.array", "zeros"],
            answer: 1,
            explanation: "linspace always includes both endpoints; arange excludes stop like range().",
          },
        ],
        challenge: {
          title: "Build a Range",
          description:
            "Use `np.arange` to create `[0, 2, 4, 6, 8]` and print it.",
          starterCode: `import numpy as np

# Your code here
`,
          solutionCode: `import numpy as np

arr = np.arange(0, 10, 2)
print(arr)`,
          tests: [
            {
              id: 1,
              label: "Uses np.arange",
              hint: "np.arange(0, 10, 2)",
              keywords: [{ pattern: "np\\.arange\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints the array",
              hint: "print(arr)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-4",
        title: "zeros, ones & identity",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "So far you used **`np.array()`** when you already had numbers, and **`arange` / `linspace`** when you wanted a pattern. But sometimes you do **not** have real data yet — you only know the **size** of a table. That is when **`zeros`**, **`ones`**, and **`eye`** help: they **build the shape for you** and fill it with a simple value.",
            code: {
              lang: "python",
              label: "Typing every zero by hand gets old fast",
              content: `import numpy as np

# 7 days of scores — all empty (0) for now
week = np.array([0, 0, 0, 0, 0, 0, 0])   # fine for 7 numbers...

# But 100 or 1000 zeros? Use np.zeros instead — one line!`,
            },
          },
          {
            type: "text",
            content:
              "**Why `np.zeros`?** Think of a **blank spreadsheet** — you want the rows and columns ready, then you fill in scores later. **`np.zeros(shape)`** makes that empty grid in one line. Every cell starts at **0**.",
            code: {
              lang: "python",
              label: "A 2×3 blank table (six zeros)",
              content: `import numpy as np

scores = np.zeros((2, 3))   # 2 rows, 3 columns — all 0.0
print(scores)
print(scores.shape)   # (2, 3)`,
            },
          },
          {
            type: "text",
            content:
              "**Why `np.ones`?** Sometimes you need a starting value of **1** everywhere — like \"each item counts as 1 at first\" or you will multiply later. **`np.ones(shape)`** is the same idea as zeros, but every cell is **1.0**.",
            code: {
              lang: "python",
              label: "Four slots that each start at 1",
              content: `import numpy as np

slots = np.ones(4)
print(slots)   # [1. 1. 1. 1.]

# Later you might do: slots * 10  → [10. 10. 10. 10.]`,
            },
          },
          {
            type: "text",
            content:
              "**Why `np.eye`?** **`np.eye(n)`** creates a **square** array with **1s on the diagonal** and **0s everywhere else**. It is called an **identity matrix** and is mainly used in advanced mathematics, machine learning, and matrix operations. In simple terms: multiplying by it is like multiplying a number by **1** — the matrix stays the same.",
            code: {
              lang: "python",
              label: "3×3 identity — 1s on the diagonal, 0s elsewhere",
              content: `import numpy as np

identity = np.eye(3)
print(identity)
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]`,
            },
          },
          {
            type: "diagram",
            title: "Why would I use these?",
            nodes: [
              {
                id: "zeros",
                label: "np.zeros",
                color: "#6366f1",
                items: [
                  "Empty table before real data",
                  "Reset or clear values to 0",
                  "Example: 5×5 grid to fill in a loop",
                ],
              },
              {
                id: "ones",
                label: "np.ones",
                color: "#8b5cf6",
                items: [
                  "Every cell starts at 1",
                  "Easy to scale later (× 10, × 0.5)",
                  "Example: default weights",
                ],
              },
              {
                id: "eye",
                label: "np.eye",
                color: "#4f46e5",
                items: [
                  "Square matrix only",
                  "1s on diagonal, 0 elsewhere",
                  "Example: \"do nothing\" in matrix math",
                ],
              },
            ],
          },
          {
            type: "diagram",
            title: "Pick the right tool",
            nodes: [
              {
                id: "array",
                label: "np.array()",
                color: "#10b981",
                items: ["You already know every number"],
              },
              {
                id: "arange",
                label: "arange / linspace",
                color: "#f59e0b",
                items: ["You want a number pattern"],
              },
              {
                id: "factory",
                label: "zeros / ones / eye",
                color: "#4f46e5",
                items: ["You only know the shape + fill value"],
              },
            ],
          },
          {
            type: "text",
            content:
              "Bonus: **`np.full(shape, value)`** fills every cell with **any** number you choose — not just 0 or 1. Handy when you want a whole grid of 7s or -1s.",
            code: {
              lang: "python",
              label: "Every cell is 7",
              content: `import numpy as np

board = np.full((2, 2), 7)
print(board)
# [[7 7]
#  [7 7]]`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** `np.array()` = you type the data. `arange` / `linspace` = generate a sequence. **`zeros` / `ones` / `eye`** = build an empty or starter grid when you only care about **size and fill value**.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "For `zeros` and `ones`, use a **tuple** for 2D: `(rows, cols)` like `(2, 3)`. For 1D, just pass one number: `np.ones(5)`.",
          },
          {
            type: "quiz",
            question: "You need a 4×4 table of zeros before filling it with sensor data. Best choice?",
            options: [
              "np.array([[0,0,...]]) typed by hand",
              "np.zeros((4, 4))",
              "np.linspace(0, 0, 16)",
              "np.eye(4)",
            ],
            answer: 1,
            explanation:
              "np.zeros((4, 4)) builds the right shape filled with 0 in one line.",
          },
          {
            type: "quiz",
            question: "Which function creates a matrix with 1s on the diagonal only?",
            options: ["np.ones", "np.zeros", "np.eye", "np.full"],
            answer: 2,
            explanation: "`np.eye(n)` builds an n×n identity matrix.",
          },
        ],
        challenge: {
          title: "Identity Matrix",
          description: "Create a 3×3 identity with `np.eye(3)` and print it.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

m = np.eye(3)
print(m)`,
          tests: [
            {
              id: 1,
              label: "Uses np.eye",
              hint: "np.eye(3)",
              keywords: [{ pattern: "np\\.eye\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints matrix",
              hint: "print(m)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "indexing",
    title: "Indexing & Smart Selection",
    icon: "✂️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "numpy-5",
        title: "Slicing 1D & 2D",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Once you have an array, you rarely need **every** number at once. **Indexing and slicing** let you grab one value, a row, a column, or a piece of a list — just like cutting a slice from a longer list in plain Python.",
            code: {
              lang: "python",
              label: "1D slice — same idea as a Python list",
              content: `import numpy as np

temps = np.array([68, 72, 75, 80, 65])
print(temps[0])      # first day → 68
print(temps[1:4])    # middle days → [72 75 80]
print(temps[-1])     # last day → 65`,
            },
          },
          {
            type: "text",
            content:
              "A **2D array** is a table (rows and columns). Use **`array[row, col]`** for one cell. Use **`array[row, :]`** for a full row and **`array[:, col]`** for a full column. The **`:`** means \"all\" along that side.",
            code: {
              lang: "python",
              label: "Pick a cell, a row, or a column",
              content: `import numpy as np

grid = np.array([[10, 20, 30],
                 [40, 50, 60],
                 [70, 80, 90]])

print(grid[1, 2])    # row 1, col 2 → 60
print(grid[1, :])    # whole middle row → [40 50 60]
print(grid[:, 0])    # first column → [10 40 70]`,
            },
          },
          {
            type: "diagram",
            title: "2D indexing cheat sheet",
            nodes: [
              {
                id: "cell",
                label: "One cell",
                color: "#8b5cf6",
                items: ["grid[1, 2]", "row 1, column 2"],
              },
              {
                id: "row",
                label: "Whole row",
                color: "#6366f1",
                items: ["grid[1, :]", "or grid[1]"],
              },
              {
                id: "col",
                label: "Whole column",
                color: "#4f46e5",
                items: ["grid[:, 0]", "every row, column 0"],
              },
            ],
          },
          {
            type: "text",
            content:
              "**Negative indices** count from the end — `-1` is the last row or last item. Handy when you do not want to count how long the array is.",
            code: {
              lang: "python",
              label: "Last row without knowing the size",
              content: `import numpy as np

grid = np.array([[1, 2], [3, 4], [5, 6]])
print(grid[-1])      # last row → [5 6]
print(grid[-1, 0])   # last row, first col → 5`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Slicing uses **`start:stop`** — the **stop index is left out**, just like Python lists. `temps[0:3]` gives indices 0, 1, 2.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "For 2D arrays, always think **row first, then column**: `grid[row, col]`.",
          },
          {
            type: "quiz",
            question: "How do you select row index 2 from a 2D array `grid`?",
            options: ["grid[2]", "grid[2, :]", "grid[:, 2]", "grid(2)"],
            answer: 1,
            explanation: "Both `grid[2]` and `grid[2, :]` select row 2. The comma form is clearer for 2D.",
          },
        ],
        challenge: {
          title: "Grab the Middle Row",
          description:
            "From `np.array([[10,20],[30,40],[50,60]])`, print row index `1` (the middle row).",
          starterCode: `import numpy as np

grid = np.array([[10, 20], [30, 40], [50, 60]])
`,
          solutionCode: `import numpy as np

grid = np.array([[10, 20], [30, 40], [50, 60]])
print(grid[1])`,
          tests: [
            {
              id: 1,
              label: "Indexes row 1",
              hint: "grid[1]",
              keywords: [{ pattern: "\\[1\\]" }],
            },
            {
              id: 2,
              label: "Prints result",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-6",
        title: "Boolean Masks",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Imagine you have **100 test scores** and want only the ones **above 90**. You could write a **for loop** and check each score one by one — but that is slow to write and slow to run. A **boolean mask** lets NumPy check **every score at once** and give you only the matches in **one line**.",
            code: {
              lang: "python",
              label: "Loop way — works, but long and slow on big data",
              content: `scores = [55, 92, 78, 100, 63]
high = []

for s in scores:
    if s >= 90:
        high.append(s)

print(high)   # [92, 100]`,
            },
          },
          {
            type: "text",
            content:
              "**NumPy way — no loop.** Convert to an array, write the rule inside brackets, and NumPy does the rest. Same result, cleaner code, and much faster when you have thousands of numbers.",
            code: {
              lang: "python",
              label: "Mask way — one line, no loop",
              content: `import numpy as np

scores = np.array([55, 92, 78, 100, 63])
high = scores[scores >= 90]
print(high)   # [ 92 100]`,
            },
          },
          {
            type: "text",
            content:
              "So **what is a mask?** It is just an array of **`True`** and **`False`** — one answer per value: \"Does this score pass the test?\" **`scores >= 90`** builds the mask. **`scores[mask]`** keeps only the **`True`** spots.",
            code: {
              lang: "python",
              label: "Step 1: build the mask — Step 2: use it",
              content: `import numpy as np

scores = np.array([55, 92, 78, 100, 63])

# Step 1 — the mask (True = keep, False = skip)
mask = scores >= 90
print(mask)
# [False  True False  True False]

# Step 2 — apply the mask
print(scores[mask])   # [ 92 100]`,
            },
          },
          {
            type: "diagram",
            title: "How a mask works",
            nodes: [
              {
                id: "data",
                label: "Your data",
                color: "#6366f1",
                items: ["scores = [55, 92, 78, 100, 63]", "One number per slot"],
              },
              {
                id: "mask",
                label: "The mask",
                color: "#8b5cf6",
                items: [
                  "scores >= 90",
                  "[F, T, F, T, F]",
                  "True = passes the rule",
                ],
              },
              {
                id: "result",
                label: "Result",
                color: "#4f46e5",
                items: ["scores[mask]", "Only True values kept", "[92, 100]"],
              },
            ],
          },
          {
            type: "text",
            content:
              "You can also write the mask **inside the brackets** directly — **`arr[arr > 0]`** means: \"build the mask and filter in one go.\" The **original array stays unchanged**; you get a **new selection**.",
            code: {
              lang: "python",
              label: "Shorthand — mask and filter together",
              content: `import numpy as np

a = np.array([-1, 3, 0, 7, -2])
positives = a[a > 0]
print(positives)   # [3 7]
print(a)           # [-1  3  0  7 -2]  ← original untouched`,
            },
          },
          {
            type: "text",
            content:
              "Masks work with **any condition**: greater than, equal to, even numbers (`% 2 == 0`), and more. NumPy checks **every element at the same time** — that is why we skip loops.",
            code: {
              lang: "python",
              label: "Even numbers with a mask",
              content: `import numpy as np

nums = np.array([1, 2, 3, 4, 5, 6])
evens = nums[nums % 2 == 0]
print(evens)   # [2 4 6]`,
            },
          },
          {
            type: "diagram",
            title: "Loop vs boolean mask",
            nodes: [
              {
                id: "loop",
                label: "Python loop",
                color: "#f43f5e",
                items: [
                  "Check one item at a time",
                  "More code to write",
                  "Slower on large arrays",
                ],
              },
              {
                id: "mask",
                label: "Boolean mask",
                color: "#8b5cf6",
                items: [
                  "Check all items at once",
                  "One short line",
                  "Fast — the NumPy way",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Why no loops?** NumPy is built in C under the hood. Masking lets it scan the whole array in one fast pass instead of Python visiting each element slowly.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Read **`scores[scores >= 90]`** aloud as: \"give me every score where `score >= 90` is True.\"",
          },
          {
            type: "quiz",
            question: "Why use a boolean mask instead of a for loop?",
            options: [
              "Loops cannot filter lists",
              "Masks are shorter and faster for filtering whole arrays",
              "Masks change every value to True",
              "Loops are not allowed in Python",
            ],
            answer: 1,
            explanation:
              "Boolean masks filter an entire array in one NumPy operation — less code and better speed.",
          },
          {
            type: "quiz",
            question: "What does `arr[arr > 5]` return?",
            options: [
              "All elements greater than 5",
              "A boolean array only",
              "The index of 5",
              "An error",
            ],
            answer: 0,
            explanation: "The condition builds a mask; bracket indexing returns only elements where True.",
          },
        ],
        challenge: {
          title: "Filter Evens",
          description:
            "From `np.array([1,2,3,4,5,6])`, print only even numbers using a boolean mask.",
          starterCode: `import numpy as np

nums = np.array([1, 2, 3, 4, 5, 6])
`,
          solutionCode: `import numpy as np

nums = np.array([1, 2, 3, 4, 5, 6])
print(nums[nums % 2 == 0])`,
          tests: [
            {
              id: 1,
              label: "Uses modulo mask",
              hint: "nums % 2 == 0",
              keywords: [{ pattern: "%\\s*2\\s*==\\s*0" }],
            },
            {
              id: 2,
              label: "Prints filtered",
              hint: "print(nums[...])",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-17",
        title: "np.where & Fancy Indexing",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "In the last lesson, a **boolean mask** helped you **keep** values that match a rule (like scores above 90). In real life you often need something different: **change** values by a rule — \"if temperature is below 60, show 0 on the chart\" or \"if the student failed, store 0 instead of the score.\" That is what **`np.where`** is for.",
            code: {
              lang: "python",
              label: "Real life: exam scores — pass keeps score, fail becomes 0",
              content: `import numpy as np

# Five students' marks out of 100
marks = np.array([45, 88, 52, 95, 70])

# If mark >= 60 → keep the mark; else → 0 (did not pass threshold)
report = np.where(marks >= 60, marks, 0)
print(report)   # [ 0 88  0 95 70]`,
            },
          },
          {
            type: "text",
            content:
              "Read **`np.where(condition, x, y)`** like a sentence: **\"where the condition is True, use x; otherwise use y.\"** It checks **every value at once** — no loop over each student or each day.",
            code: {
              lang: "python",
              label: "Real life: daily temperature — cold days become 0 for a simple chart",
              content: `import numpy as np

# Celsius readings for the week
temps = np.array([55, 72, 88, 61, 95])

# Warm days (>= 60) stay; cooler days become 0 so the graph is easy to read
display = np.where(temps >= 60, temps, 0)
print(display)   # [ 0 72 88  0 95]`,
            },
          },
          {
            type: "text",
            content:
              "**Fancy indexing** is for when you already know **which positions** you want — not a rule, not a continuous slice. Real-life examples: pull **Monday, Wednesday, and Friday** from a week of step counts, or grab **items #0, #2, and #5** from a shopping list.",
            code: {
              lang: "python",
              label: "Real life: steps on Mon, Wed, Sat only",
              content: `import numpy as np

# Steps for 7 days (index 0 = Monday ... 6 = Sunday)
steps = np.array([4000, 5200, 6100, 4800, 5500, 7200, 3900])

# Pick Monday(0), Wednesday(2), Saturday(5) — note the double brackets
weekend_check = steps[[0, 2, 5]]
print(weekend_check)   # [4000 6100 7200]`,
            },
          },
          {
            type: "diagram",
            title: "Which tool for which job?",
            nodes: [
              {
                id: "mask",
                label: "Boolean mask",
                color: "#8b5cf6",
                items: [
                  "Keep values that match a rule",
                  "Example: scores[scores >= 90]",
                  "Result: shorter list of matches",
                ],
              },
              {
                id: "where",
                label: "np.where",
                color: "#4f46e5",
                items: [
                  "Replace or pick per cell",
                  "Example: pass → score, fail → 0",
                  "Same length as original",
                ],
              },
              {
                id: "fancy",
                label: "Fancy indexing",
                color: "#6366f1",
                items: [
                  "Pick exact positions you name",
                  "Example: steps[[0, 2, 5]]",
                  "Like choosing specific days",
                ],
              },
            ],
          },
          {
            type: "text",
            content:
              "**Mask vs `np.where`:** a mask **removes** non-matching values. **`np.where`** keeps the **same size** array but **swaps** some cells — great for reports and charts where every day or every student still needs a slot.",
            code: {
              lang: "python",
              label: "Same data — filter vs replace",
              content: `import numpy as np

prices = np.array([12, 45, 8, 99, 30])

# Mask: only prices above 20 (fewer items)
print(prices[prices > 20])          # [45 99 30]

# where: every slot stays; cheap items become -1 as a flag
print(np.where(prices > 20, prices, -1))
# [12 45 -1 99 30]`,
            },
          },
          {
            type: "text",
            content:
              "With **one argument**, **`np.where(condition)`** tells you **where** (which index) the rule is True — like asking \"which students passed?\" and getting back **positions 1, 3, 4** instead of only their scores.",
            code: {
              lang: "python",
              label: "Find which students passed (indices)",
              content: `import numpy as np

marks = np.array([45, 88, 52, 95, 70])
passed_slots = np.where(marks >= 60)
print(passed_slots)   # (array([1, 3, 4]),)

# Fancy indexing: get those students' marks directly
print(marks[passed_slots[0]])   # [88 95 70]`,
            },
          },
          {
            type: "text",
            content:
              "Another fancy-indexing example: a **menu** with 6 meal prices — you only want prices for **lunch items** at positions 1, 3, and 4 (not a range from 1 to 4).",
            code: {
              lang: "python",
              label: "Real life: pick specific menu items by number",
              content: `import numpy as np

meal_prices = np.array([5, 12, 8, 15, 20, 6])   # item 0..5
lunch_items = meal_prices[[1, 3, 4]]
print(lunch_items)   # [12 15 20]`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Quick pick:** only keep matches → **`arr[condition]`**. same length, swap values → **`np.where(cond, x, y)`**. pick named positions → **`arr[[0, 2, 5]]`**.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Fancy indexing uses **double brackets** `arr[[...]]` with a **list of indices**. A single slice `arr[0:3]` only gives a **continuous** block.",
          },
          {
            type: "quiz",
            question: "You want failed exam scores to show as 0 but keep passes unchanged. Best tool?",
            options: [
              "marks[marks >= 60]",
              "np.where(marks >= 60, marks, 0)",
              "marks[[0, 1, 2]]",
              "np.linspace(0, 100, 5)",
            ],
            answer: 1,
            explanation:
              "np.where replaces failing cells with 0 while keeping the same array length.",
          },
          {
            type: "quiz",
            question: "You want step counts for days 0, 2, and 4 from a week array. Best approach?",
            options: [
              "steps[0:4]",
              "steps[[0, 2, 4]]",
              "steps > 0",
              "np.where(steps >= 60, steps, 0)",
            ],
            answer: 1,
            explanation: "Double brackets with a list of indices is fancy indexing.",
          },
        ],
        challenge: {
          title: "Where It's Hot",
          description:
            "Given `temps = np.array([55, 72, 88, 61, 95])`, use `np.where` to replace values below 60 with `0` and keep others unchanged. Print the result.",
          starterCode: `import numpy as np

temps = np.array([55, 72, 88, 61, 95])
`,
          solutionCode: `import numpy as np

temps = np.array([55, 72, 88, 61, 95])
print(np.where(temps >= 60, temps, 0))`,
          tests: [
            {
              id: 1,
              label: "Uses np.where",
              hint: "np.where(temps >= 60, temps, 0)",
              keywords: [{ pattern: "np\\.where\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints result",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "broadcast",
    title: "Broadcasting",
    icon: "📡",
    color: "#a855f7",
    lessons: [
      {
        id: "numpy-7",
        title: "Broadcasting Rules",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "You already know **`scores + 5`** adds 5 to every score in a 1D array. **Broadcasting** is NumPy's way of doing the same idea on **tables** — one small value or one short row/column can stretch to match a bigger grid **without you writing a loop**.",
            code: {
              lang: "python",
              label: "Real life: add $2 delivery fee to every menu price",
              content: `import numpy as np

# 2×3 menu prices (rows = meals, cols = sizes)
prices = np.array([[8, 10, 12],
                   [6,  7,  9]])

# One number stretches to every cell
with_fee = prices + 2
print(with_fee)`,
            },
          },
          {
            type: "text",
            content:
              "**Why not a loop?** You could add 2 to each cell with nested `for` loops — but broadcasting does it in **one line** and is **much faster** on large spreadsheets (sales reports, sensor grids, image pixels).",
            code: {
              lang: "python",
              label: "Same idea on a blank 2×3 table",
              content: `import numpy as np

m = np.ones((2, 3))   # 2 rows, 3 columns of 1.0
print(m + 5)
# [[6. 6. 6.]
#  [6. 6. 6.]]`,
            },
          },
          {
            type: "text",
            content:
              "Broadcasting also works when one side is a **row** and the other is a **column**. Imagine **3 students** and **4 subjects** — a column of bonus points (one per student) can be added to the whole grade table.",
            code: {
              lang: "python",
              label: "Column (3,1) + row (1,4) → table (3, 4)",
              content: `import numpy as np

# Bonus points per student (3 students, 1 column)
bonus = np.array([[5],
                  [3],
                  [2]])

# Subject weights (1 row, 4 subjects)
weights = np.array([[1, 1, 2, 1]])

# NumPy stretches both to shape (3, 4)
result = bonus + weights
print(result.shape)   # (3, 4)
print(result)`,
            },
          },
          {
            type: "diagram",
            title: "Broadcasting in plain English",
            nodes: [
              {
                id: "scalar",
                label: "One number + table",
                color: "#a855f7",
                items: [
                  "prices + 2",
                  "2 copies to every cell",
                  "Like same tax on all items",
                ],
              },
              {
                id: "rowcol",
                label: "Row + column",
                color: "#8b5cf6",
                items: [
                  "(3,1) + (1,4)",
                  "Stretches to (3, 4)",
                  "No loop needed",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Simple rule:** sizes must **match from the right** or one side must be **1**. If shapes fight (like (3,) vs (4,)), NumPy raises an error instead of guessing.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Think of broadcasting as **copying a small sticker onto every matching spot** in a bigger grid — NumPy does the copying efficiently for you.",
          },
          {
            type: "quiz",
            question: "Can you add a (3,1) array to a (1,4) array?",
            options: [
              "Yes, broadcasts to (3,4)",
              "No, shapes must match exactly",
              "Only if both are 1D",
              "Only with np.dot",
            ],
            answer: 0,
            explanation: "NumPy stretches both to (3,4) via broadcasting rules.",
          },
        ],
        challenge: {
          title: "Broadcast a Scalar",
          description: "Create `np.zeros((2, 2))`, add `10`, and print the result.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.zeros((2, 2))
print(a + 10)`,
          tests: [
            {
              id: 1,
              label: "Uses zeros",
              hint: "np.zeros((2, 2))",
              keywords: [{ pattern: "np\\.zeros\\s*\\(" }],
            },
            {
              id: 2,
              label: "Adds 10",
              hint: "a + 10",
              keywords: [{ pattern: "\\+\\s*10" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-7b",
        title: "Row vs Column Operations",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A 2D NumPy table has **rows** (side to side) and **columns** (top to bottom). When you **sum** or **average**, you pick a direction with **`axis`**: **`axis=1`** goes **across each row** (one answer per row), and **`axis=0`** goes **down each column** (one answer per column). That is what **row vs column operations** mean — same table, two different summaries.",
          },
          {
            type: "text",
            content:
              "**Example:** two food trucks track sales for **Mon / Tue / Wed**. Purple totals are **per truck** (`axis=1`). Blue totals are **per day** (`axis=0`).",
          },
          {
            type: "table",
            title: "Food truck sales — two ways to sum",
            columns: ["Mon", "Tue", "Wed"],
            rows: [
              { label: "Truck A", values: [100, 120, 90] },
              { label: "Truck B", values: [80, 95, 110] },
            ],
            rowTotals: [310, 285],
            colTotals: [180, 215, 200],
            rowTotalLabel: "axis=1 → total per truck",
            colTotalLabel: "axis=0 ↓ total per day",
          },
          {
            type: "text",
            content: "Here is the sales table in NumPy:",
            code: {
              lang: "python",
              label: "Build the table",
              content: `import numpy as np

sales = np.array([[100, 120,  90],
                  [ 80,  95, 110]])
print(sales)`,
            },
          },
          {
            type: "text",
            content:
              "Use **`axis=1`** when you want one total **per row** (each truck's weekly sales).",
            code: {
              lang: "python",
              label: "Total per truck",
              content: `per_truck = sales.sum(axis=1)
print(per_truck)   # [310 285]`,
            },
          },
          {
            type: "text",
            content:
              "Use **`axis=0`** when you want one total **per column** (each day's sales across all trucks).",
            code: {
              lang: "python",
              label: "Total per day",
              content: `per_day = sales.sum(axis=0)
print(per_day)   # [180 215 200]`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Memory trick:** `axis=0` **collapses rows** (you move **down** the table). `axis=1` **collapses columns** (you move **sideways** along a row).",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "If you forget, ask: \"Do I want one number **per row** or **per column**?\" Row → `axis=1`. Column → `axis=0`.",
          },
          {
            type: "quiz",
            question: "For a (3, 4) grade table, which axis gives one total per student (per row)?",
            options: ["axis=0", "axis=1", "axis=2", "no axis"],
            answer: 1,
            explanation: "axis=1 reduces across columns inside each row.",
          },
        ],
        challenge: {
          title: "Busiest Day for All Trucks",
          description:
            "Given `sales = np.array([[50, 60], [70, 40], [55, 65]])`, print `sales.sum(axis=0)` (total per column/day).",
          starterCode: `import numpy as np

sales = np.array([[50, 60], [70, 40], [55, 65]])
`,
          solutionCode: `import numpy as np

sales = np.array([[50, 60], [70, 40], [55, 65]])
print(sales.sum(axis=0))`,
          tests: [
            {
              id: 1,
              label: "Uses sum",
              hint: "sales.sum(axis=0)",
              keywords: [{ pattern: "\\.sum\\s*\\(" }],
            },
            {
              id: 2,
              label: "axis=0",
              hint: "axis=0",
              keywords: [{ pattern: "axis\\s*=\\s*0" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-8",
        title: "2D Element-wise Ops",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "On a **2D table**, you can multiply, divide, or compare **cell by cell** — like applying a **10% sale** to every item in a price grid, or checking which test scores passed. The **`*`** operator does **element-wise** math, **not** matrix multiplication.",
            code: {
              lang: "python",
              label: "Real life: sale multipliers on a price grid",
              content: `import numpy as np

# Shelf prices (2 products × 2 stores)
prices = np.array([[10, 20],
                   [30, 40]])

# Sale: store 1 ×1, store 2 ×2 for each product
multipliers = np.array([[1, 2],
                        [1, 2]])

sale_prices = prices * multipliers
print(sale_prices)
# [[ 10  40]
#  [ 30  80]]`,
            },
          },
          {
            type: "text",
            content:
              "Comparisons work the same way — you get a **True/False table** the same shape as your data. Perfect for finding which cells pass a rule (like \"score at least 80\").",
            code: {
              lang: "python",
              label: "Which scores passed? (≥ 80)",
              content: `import numpy as np

scores = np.array([[70, 85],
                   [90, 55]])

passed = scores >= 80
print(passed)
# [[False  True]
#  [ True False]]`,
            },
          },
          {
            type: "text",
            content:
              "When two tables are the **same shape**, `+`, `-`, `*`, `/` all work **pair by pair** — top-left with top-left, and so on. Broadcasting from the last lesson can also stretch a smaller table when shapes line up.",
            code: {
              lang: "python",
              label: "Subtract a row of discounts from every product row",
              content: `import numpy as np

prices = np.array([[100, 200, 150],
                   [ 80, 120,  90]])

# $10 off every item in each size column
discounts = np.array([10, 10, 10])

final = prices - discounts   # broadcasts (3,) to each row
print(final)`,
            },
          },
          {
            type: "diagram",
            title: "Element-wise vs matrix multiply",
            nodes: [
              {
                id: "elem",
                label: "Element-wise *",
                color: "#a855f7",
                items: [
                  "Same-size tables",
                  "Each cell × matching cell",
                  "Sales, discounts, masks",
                ],
              },
              {
                id: "matmul",
                label: "Matrix multiply @",
                color: "#8b5cf6",
                items: [
                  "Linear algebra",
                  "Rows × columns rule",
                  "Use @ or np.matmul later",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** `*` = multiply **matching cells**. `@` or `np.matmul` = true **matrix** multiply (covered in Linear Algebra chapter).",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Element-wise ops are what you use daily for reports: adjust prices, compare thresholds, combine two sensor readings.",
          },
          {
            type: "quiz",
            question: "What operator performs element-wise multiplication?",
            options: ["@", "np.dot", "*", "np.cross"],
            answer: 2,
            explanation: "The `*` operator multiplies corresponding elements, not rows×columns.",
          },
        ],
        challenge: {
          title: "Scale Each Cell",
          description:
            "Multiply `np.array([[2,4],[6,8]])` by `np.array([[1,10],[100,1000]])` element-wise and print.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.array([[2, 4], [6, 8]])
b = np.array([[1, 10], [100, 1000]])
print(a * b)`,
          tests: [
            {
              id: 1,
              label: "Two np.array calls",
              hint: "np.array(...)",
              keywords: [{ pattern: "np\\.array" }],
            },
            {
              id: 2,
              label: "Element-wise *",
              hint: "a * b",
              keywords: [{ pattern: "\\*" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "linalg",
    title: "Linear Algebra",
    icon: "📐",
    color: "#ec4899",
    lessons: [
      {
        id: "numpy-9",
        title: "Dot Product",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "In the last chapter you used **`*`** to multiply **matching cells** in a table. The **dot product** is different: it works on **two flat lists**, multiplies **matching pairs**, then **adds** everything into **one number** — like a receipt total.",
            code: {
              lang: "python",
              label: "Real life: café order total with np.dot",
              content: `import numpy as np

prices  = np.array([3, 2])   # coffee $3, muffin $2
amounts = np.array([2, 3])   # 2 coffees, 3 muffins

total = np.dot(prices, amounts)
print(total)   # 3*2 + 2*3 = 12`,
            },
          },
          {
            type: "text",
            content:
              "The rule is simple: position **0** pairs with **0**, **1** with **1**, and so on. Multiply each pair, then sum. **`np.dot(a, b)`** does that in one line — no loop needed.",
            code: {
              lang: "python",
              label: "Two longer lists — same rule",
              content: `import numpy as np

u = np.array([1, 2, 3])
v = np.array([4, 5, 6])

print(np.dot(u, v))   # 1*4 + 2*5 + 3*6 = 32`,
            },
          },
          {
            type: "table",
            title: "Café receipt — how the total is built",
            columns: ["Price", "Qty"],
            rows: [
              { label: "Coffee", values: [3, 2] },
              { label: "Muffin", values: [2, 3] },
            ],
            rowTotals: [6, 6],
            colTotals: [5, 5],
            rowTotalLabel: "price × qty per item",
            colTotalLabel: "column sums (for reference)",
          },
          {
            type: "diagram",
            title: "np.dot in two steps",
            nodes: [
              {
                id: "multiply",
                label: "Step 1 — multiply pairs",
                color: "#ec4899",
                items: ["3×2 = 6", "2×3 = 6", "1×4 + 2×5 + 3×6 for longer lists"],
              },
              {
                id: "add",
                label: "Step 2 — add them up",
                color: "#f472b6",
                items: ["6 + 6 = 12", "One final number", "Your bill total"],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**`*`** changes every cell in a table. **`np.dot`** on two 1D lists gives **one** answer. Both lists must be the **same length**.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Think of `np.dot` as a **smart total button** for two lists. In the next lesson you'll use **`@`** when whole **tables** need to combine.",
          },
          {
            type: "quiz",
            question: "np.dot([1, 2], [3, 4]) equals?",
            options: ["10", "11", "[3, 8]", "[4, 6]"],
            answer: 1,
            explanation: "1×3 + 2×4 = 3 + 8 = 11.",
          },
        ],
        challenge: {
          title: "Dot Two Vectors",
          description: "Dot `[1, 2]` with `[3, 4]` using `np.dot` and print the scalar.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.array([1, 2])
b = np.array([3, 4])
print(np.dot(a, b))`,
          tests: [
            {
              id: 1,
              label: "Uses np.dot",
              hint: "np.dot(a, b)",
              keywords: [{ pattern: "np\\.dot\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-10",
        title: "Matrix Multiply @",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "You already know **`np.dot`** for two flat lists and **`*`** for cell-by-cell math. **Matrix multiply** (`@`) is the next step: it combines **whole tables**. Each answer cell is one **row** from the left table dotted with one **column** from the right table — the same pair-and-sum idea from the last lesson, but applied row by row.",
          },
          {
            type: "text",
            content:
              "**See two separate arrays first.** On the left: **scores** (2 students × 2 assignments). On the right: **weights** (quiz 40%, project 60%). **`@`** combines them into **one final grade per student**.",
          },
          {
            type: "matrices",
            title: "Two arrays — then @ combines them",
            left: {
              label: "scores (2×2)",
              data: [
                [80, 90],
                [70, 85],
              ],
            },
            operator: "@",
            right: {
              label: "weights (2×1)",
              data: [[0.4], [0.6]],
            },
            result: {
              label: "scores @ weights",
              data: [[86], [79]],
            },
            caption:
              "Row 0 of **scores** (80, 90) meets **weights** → 80×0.4 + 90×0.6 = **86**. Same for student B → **79**.",
            leftAccent: "#ec4899",
            rightAccent: "#f472b6",
            resultAccent: "#db2777",
          },
          {
            type: "diagram",
            title: "How @ is different from * and np.dot",
            nodes: [
              {
                id: "dot",
                label: "np.dot — two lists",
                color: "#ec4899",
                items: [
                  "Multiply matching pairs, add up",
                  "One final number",
                  "Receipt total",
                ],
              },
              {
                id: "star",
                label: "* — same-size tables",
                color: "#f472b6",
                items: [
                  "Cell × matching cell",
                  "Same shape out",
                  "Sales, discounts",
                ],
              },
              {
                id: "at",
                label: "@ — combine tables",
                color: "#db2777",
                items: [
                  "Each cell = row · column",
                  "Two different arrays",
                  "Inner sizes must match",
                ],
              },
            ],
          },
          {
            type: "text",
            content:
              "Here is the same grade example in code. **`scores @ weights`** applies 40% to quiz and 60% to project for each student.",
            code: {
              lang: "python",
              label: "Real life: weighted grades for two students",
              content: `import numpy as np

# rows = students, cols = quiz & project scores
scores = np.array([[80, 90],
                   [70, 85]])

# quiz 40%, project 60%
weights = np.array([[0.4],
                    [0.6]])

finals = scores @ weights
print(finals)   # [[86.], [79.]] — one final per student`,
            },
          },
          {
            type: "text",
            content:
              "**Same idea with plain numbers.** Array **A** is **2×2** and array **B** is **2×2**. Rule for `@`: pick one **row from A**, pick one **column from B** (read **down** the column), multiply matching pairs, then add. Do that for every result cell.",
          },
          {
            type: "text",
            content:
              "**Columns of B** (read down, not across): **Col 0** = [2, 1], **Col 1** = [0, 2]. That is what each row of A gets dotted with.",
          },
          {
            type: "matrices",
            title: "Complete 2×2 example — A, B, and A @ B",
            left: {
              label: "A  (2 rows × 2 cols)",
              data: [
                [1, 2],
                [3, 4],
              ],
              rowLabels: ["Row 0", "Row 1"],
              colLabels: ["Col 0", "Col 1"],
            },
            operator: "@",
            right: {
              label: "B  (2 rows × 2 cols)",
              data: [
                [2, 0],
                [1, 2],
              ],
              rowLabels: ["Row 0", "Row 1"],
              colLabels: ["Col 0", "Col 1"],
              footnote: "For @, use **columns** of B: Col 0 = [2,1], Col 1 = [0,2]",
            },
            result: {
              label: "A @ B  (result)",
              data: [
                [4, 4],
                [10, 8],
              ],
              rowLabels: ["Row 0", "Row 1"],
              colLabels: ["Col 0", "Col 1"],
            },
            caption:
              "Each result cell = **one row of A** · **one column of B**. Below shows all **four** cells step by step.",
            steps: [
              {
                position: "Result [0,0] top-left",
                row: "[1, 2]  (Row 0 of A)",
                col: "[2, 1]  (Col 0 of B)",
                formula: "1×2 + 2×1",
                value: 4,
              },
              {
                position: "Result [0,1] top-right",
                row: "[1, 2]  (Row 0 of A)",
                col: "[0, 2]  (Col 1 of B)",
                formula: "1×0 + 2×2",
                value: 4,
              },
              {
                position: "Result [1,0] bottom-left",
                row: "[3, 4]  (Row 1 of A)",
                col: "[2, 1]  (Col 0 of B)",
                formula: "3×2 + 4×1",
                value: 10,
              },
              {
                position: "Result [1,1] bottom-right",
                row: "[3, 4]  (Row 1 of A)",
                col: "[0, 2]  (Col 1 of B)",
                formula: "3×0 + 4×2",
                value: 8,
              },
            ],
            leftAccent: "#ec4899",
            rightAccent: "#f472b6",
            resultAccent: "#db2777",
          },
          {
            type: "text",
            content:
              "Build the same 2×2 multiply in NumPy. Each cell in the answer mixes one **row** from `A` with one **column** from `B`.",
            code: {
              lang: "python",
              label: "2×2 multiply with @",
              content: `import numpy as np

A = np.array([[1, 2],
              [3, 4]])
B = np.array([[2, 0],
              [1, 2]])

print(A @ B)
# [[ 4  4]
#  [10  8]]`,
            },
          },
          {
            type: "text",
            content:
              "A quick check: multiplying by an **identity** matrix `np.eye(n)` leaves your table **unchanged** — useful to verify your code is working.",
            code: {
              lang: "python",
              label: "Identity matrix sanity check",
              content: `import numpy as np

M = np.array([[5, 6],
              [7, 8]])
I = np.eye(2)

print(I @ M)   # same as M`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Memory trick:** `*` = multiply **cells**. `@` = multiply **tables** (rows meet columns). Wrong operator → wrong answer, even when shapes match.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "For grades and weights, think: **scores @ weights** when weights are a **column** of percentages. Match inner sizes: columns of left = rows of right.",
          },
          {
            type: "quiz",
            question: "Which operator performs matrix multiplication?",
            options: ["*", "np.multiply", "@", "np.add"],
            answer: 2,
            explanation: "The `@` operator (Python 3.5+) does matrix multiplication.",
          },
        ],
        challenge: {
          title: "Multiply Matrices",
          description:
            "Multiply `[[1,0],[0,1]]` by `[[5,6],[7,8]]` with `@` and print.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

I = np.array([[1, 0], [0, 1]])
M = np.array([[5, 6], [7, 8]])
print(I @ M)`,
          tests: [
            {
              id: 1,
              label: "Uses @ operator",
              hint: "I @ M",
              keywords: [{ pattern: "@" }],
            },
            {
              id: 2,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-18",
        title: "Solve & Determinants",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "Sometimes you know **totals** but not each **single price**. A snack shop gives you two clues — that is a small **system of equations**. NumPy can find the missing prices with **`np.linalg.solve`**.",
          },
          {
            type: "text",
            content:
              "**Example:** 2 coffees + 1 muffin cost **$11**. 1 coffee + 1 muffin cost **$7**. Put the numbers in table **`A`**, put the totals in **`b`**, then solve for coffee and muffin prices.",
          },
          {
            type: "table",
            title: "Snack shop puzzle — two clues",
            columns: ["Coffee", "Muffin"],
            rows: [
              { label: "Receipt 1 ($11)", values: [2, 1] },
              { label: "Receipt 2 ($7)", values: [1, 1] },
            ],
            rowTotals: [11, 7],
            colTotals: [3, 2],
            rowTotalLabel: "total $ on receipt",
            colTotalLabel: "items bought (reference)",
          },
          {
            type: "text",
            content:
              "Turn the table into NumPy arrays and call **`np.linalg.solve(A, b)`**. It returns the unknown prices.",
            code: {
              lang: "python",
              label: "Find coffee & muffin prices",
              content: `import numpy as np

# 2c + 1m = 11
# 1c + 1m =  7
A = np.array([[2, 1],
              [1, 1]])
b = np.array([11, 7])

prices = np.linalg.solve(A, b)
print(prices)   # coffee ≈ 4, muffin ≈ 3`,
            },
          },
          {
            type: "text",
            content:
              "Before solving, you can check **`np.linalg.det(A)`**. If the determinant is **0** (or very close), the puzzle has **no one clear answer**. If it is **not 0**, `solve` should work.",
            code: {
              lang: "python",
              label: "Check if the puzzle is solvable",
              content: `import numpy as np

A = np.array([[2, 1],
              [1, 1]])
print(np.linalg.det(A))   # not 0 → unique solution

M = np.array([[1, 2],
              [2, 4]])
print(np.linalg.det(M))   # 0 → rows repeat, no unique answer`,
            },
          },
          {
            type: "diagram",
            title: "solve vs det — when to use which",
            nodes: [
              {
                id: "solve",
                label: "np.linalg.solve(A, b)",
                color: "#ec4899",
                items: [
                  "You want the unknown values",
                  "Snack prices, missing numbers",
                  "Needs square A, det ≠ 0",
                ],
              },
              {
                id: "det",
                label: "np.linalg.det(A)",
                color: "#f472b6",
                items: [
                  "Quick “can we solve this?” test",
                  "det = 0 → no unique answer",
                  "det ≠ 0 → solve should work",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Ax = b** means: table **`A`** × unknowns **`x`** = totals **`b`**. `A` must be **square** (same number of equations and unknowns) for `solve` to give one answer.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You don't need to memorize determinant formulas — just know: **det ≈ 0** means be careful; **`solve`** is the button that gives you the actual answers.",
          },
          {
            type: "quiz",
            question: "Which function solves Ax = b?",
            options: ["np.dot", "np.linalg.solve", "np.linalg.det", "np.inv @ b only"],
            answer: 1,
            explanation: "np.linalg.solve(A, b) is the direct, numerically stable solver.",
          },
        ],
        challenge: {
          title: "Solve the System",
          description:
            "Solve `A @ x = b` where `A = [[3, 1], [1, 2]]` and `b = [9, 8]` using `np.linalg.solve`. Print `x`.",
          starterCode: `import numpy as np

A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
`,
          solutionCode: `import numpy as np

A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)
print(x)`,
          tests: [
            {
              id: 1,
              label: "Uses np.linalg.solve",
              hint: "np.linalg.solve(A, b)",
              keywords: [{ pattern: "np\\.linalg\\.solve\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints x",
              hint: "print(x)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "aggregate",
    title: "Stats & Aggregation",
    icon: "📊",
    color: "#f43f5e",
    lessons: [
      {
        id: "numpy-11",
        title: "sum, mean, min, max",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "You have a week of **test scores** — maybe 80, 90, 70, and 100. NumPy can answer four common questions in **one line each**: What is the **total**? What is the **average**? What was the **best** score? What was the **lowest**?",
            code: {
              lang: "python",
              label: "Four quick questions, four quick answers",
              content: `import numpy as np

scores = np.array([80, 90, 70, 100])

print(scores.sum())    # 340 — add them all up
print(scores.mean())   # 85.0 — the average
print(scores.max())    # 100 — highest score
print(scores.min())    # 70 — lowest score`,
            },
          },
          {
            type: "text",
            content:
              "Think of these as **shortcut buttons** on a calculator. Instead of writing a loop, you put a dot and the name: `.sum()`, `.mean()`, `.max()`, `.min()`. They work on **any** NumPy array of numbers.",
            code: {
              lang: "python",
              label: "Same idea with daily steps",
              content: `import numpy as np

steps = np.array([4000, 5200, 6100, 4800])

print(steps.sum())     # 20,100 steps total this week
print(steps.mean())    # 5,025 steps per day on average`,
            },
          },
          {
            type: "diagram",
            title: "What each button does",
            nodes: [
              {
                id: "sum",
                label: ".sum()",
                color: "#f43f5e",
                items: [
                  "Add every number",
                  "Like a receipt total",
                  "[80,90,70,100] → 340",
                ],
              },
              {
                id: "mean",
                label: ".mean()",
                color: "#ec4899",
                items: [
                  "The average",
                  "Total ÷ how many",
                  "[80,90,70,100] → 85",
                ],
              },
              {
                id: "minmax",
                label: ".min() / .max()",
                color: "#db2777",
                items: [
                  "Smallest or biggest",
                  "Worst day / best day",
                  "Useful for highs & lows",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You can also write `np.mean(scores)` instead of `scores.mean()` — both work. The dot version (`scores.mean()`) is very common in notebooks and courses.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**`.mean()`** = add everything, then divide by how many numbers you have. Four scores? Divide the total by 4.",
          },
          {
            type: "quiz",
            question: "You have scores [10, 20, 30]. What does .mean() return?",
            options: ["60", "20", "30", "10"],
            answer: 1,
            explanation: "Mean = (10+20+30) ÷ 3 = 60 ÷ 3 = 20.",
          },
        ],
        challenge: {
          title: "Average Score",
          description: "Print the mean of `np.array([80, 90, 70, 100])`.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

scores = np.array([80, 90, 70, 100])
print(scores.mean())`,
          tests: [
            {
              id: 1,
              label: "Uses mean",
              hint: "scores.mean()",
              keywords: [{ pattern: "\\.mean\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-12",
        title: "axis=0 vs axis=1",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "A **2D array** is like a small **spreadsheet** — rows go **sideways**, columns go **down**. When you `.sum()` the whole thing, you get **one number**. But often you want **one answer per row** or **one answer per column**. That is what **`axis`** is for.",
          },
          {
            type: "text",
            content:
              "**Real example:** two students, three quiz scores each. You might ask: *How did each student do overall?* (sum **each row**) or *What was the class average on Quiz 1?* (sum **each column**).",
            code: {
              lang: "python",
              label: "A 2×3 grade table",
              content: `import numpy as np

# rows = students, columns = Quiz 1, 2, 3
grades = np.array([[80, 90, 70],   # Student A
                   [60, 75, 85]])  # Student B
print(grades)`,
            },
          },
          {
            type: "table",
            title: "Student quiz scores — read the table first",
            columns: ["Quiz 1", "Quiz 2", "Quiz 3"],
            rows: [
              { label: "Student A", values: [80, 90, 70] },
              { label: "Student B", values: [60, 75, 85] },
            ],
            rowTotals: [240, 220],
            colTotals: [140, 165, 155],
            rowTotalLabel: "axis=1 → total per student (each row)",
            colTotalLabel: "axis=0 ↓ total per quiz (each column)",
          },
          {
            type: "text",
            content:
              "**`axis=1`** → go **across each row** (left to right). You get **one answer per row**. Use this when you care about **each student** or **each food truck** or **each person**.",
            code: {
              lang: "python",
              label: "Sum each row — one total per student",
              content: `import numpy as np

grades = np.array([[80, 90, 70],
                   [60, 75, 85]])

print(grades.sum(axis=1))   # [240, 220]
# Student A: 80+90+70 = 240
# Student B: 60+75+85 = 220`,
            },
          },
          {
            type: "text",
            content:
              "**`axis=0`** → go **down each column** (top to bottom). You get **one answer per column**. Use this when you care about **each quiz**, **each day of the week**, or **each subject**.",
            code: {
              lang: "python",
              label: "Sum each column — one total per quiz",
              content: `import numpy as np

grades = np.array([[80, 90, 70],
                   [60, 75, 85]])

print(grades.sum(axis=0))   # [140, 165, 155]
# Quiz 1: 80+60 = 140
# Quiz 2: 90+75 = 165
# Quiz 3: 70+85 = 155`,
            },
          },
          {
            type: "diagram",
            title: "Remember axis with arrows",
            nodes: [
              {
                id: "axis0",
                label: "axis=0 ↓ down columns",
                color: "#f43f5e",
                items: [
                  "One result per column",
                  "“How was Quiz 1 for everyone?”",
                  "grades.sum(axis=0)",
                ],
              },
              {
                id: "axis1",
                label: "axis=1 → across rows",
                color: "#ec4899",
                items: [
                  "One result per row",
                  "“How did Student A do overall?”",
                  "grades.sum(axis=1)",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Memory trick:** `axis=1` has a **1** in it — think **one total per row** (rows are the “1st” direction when you read left-to-right). `axis=0` collapses **down** the columns.",
          },
          {
            type: "quiz",
            question: "You want each student's total score. Which axis?",
            options: ["axis=0", "axis=1", "no axis", "axis=2"],
            answer: 1,
            explanation: "axis=1 sums across each row — one total per student.",
          },
        ],
        challenge: {
          title: "Sum Each Row",
          description:
            "For `np.array([[1,2],[3,4],[5,6]])`, print `sum` along `axis=1`.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

m = np.array([[1, 2], [3, 4], [5, 6]])
print(m.sum(axis=1))`,
          tests: [
            {
              id: 1,
              label: "Uses sum",
              hint: "m.sum(...)",
              keywords: [{ pattern: "\\.sum\\s*\\(" }],
            },
            {
              id: 2,
              label: "axis=1",
              hint: "axis=1",
              keywords: [{ pattern: "axis\\s*=\\s*1" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-19",
        title: "NaN & Percentiles",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Sometimes data has **gaps**. A weather sensor stops working. A student misses a test. A survey question is left blank. In NumPy, a missing value is written as **`NaN`** — it simply means *we don't know this number*.",
          },
          {
            type: "array",
            title: "Daily steps — one day is missing",
            label: "steps",
            values: [8000, 7500, "NaN", 9000],
            colLabels: ["Mon", "Tue", "Wed", "Thu"],
            missingIndexes: [2],
            accentColor: "#6366f1",
            missingAccent: "#f43f5e",
            footnote:
              "Wednesday is **NaN** (highlighted red). You still have Mon, Tue, Thu — but normal `.mean()` gives up on the whole array.",
          },
          {
            type: "array",
            title: "Same data — two different averages",
            rows: [
              {
                label: ".mean()",
                values: ["nan"],
                colLabels: ["result"],
                missingIndexes: [0],
              },
              {
                label: "np.nanmean()",
                values: ["8166.67"],
                colLabels: ["result"],
                okIndexes: [0],
              },
            ],
            footnote:
              "`.mean()` → **nan** (one gap breaks it). `np.nanmean()` → **8166.67** (average of 8000, 7500, 9000 only).",
          },
          {
            type: "text",
            content:
              "**Fix missing data** with **`nan*`** functions. Use **`np.isnan`** to see which spots are empty.",
            code: {
              lang: "python",
              label: "Missing value breaks normal .mean()",
              content: `import numpy as np

steps = np.array([8000, 7500, np.nan, 9000])

print(steps.mean())      # nan
print(np.nanmean(steps)) # 8166.67`,
            },
          },
          {
            type: "array",
            title: "np.isnan() — True means missing",
            label: "missing?",
            values: ["False", "False", "True", "False"],
            colLabels: ["Mon", "Tue", "Wed", "Thu"],
            missingIndexes: [2],
            accentColor: "#6366f1",
            missingAccent: "#f43f5e",
            footnote: "**True** = that day has NaN. **False** = real number.",
          },
          {
            type: "diagram",
            title: "Quick pick",
            nodes: [
              {
                id: "normal",
                label: ".mean()",
                color: "#f43f5e",
                items: [
                  "Every value must exist",
                  "One NaN → whole answer is NaN",
                  "Use when data is complete",
                ],
              },
              {
                id: "nanmean",
                label: "np.nanmean()",
                color: "#22c55e",
                items: [
                  "Skips missing values",
                  "Uses the rest",
                  "Use for real-world data",
                ],
              },
            ],
          },
          {
            type: "text",
            content:
              "A **percentile** shows **where a number ranks** in a group — like asking *\"How many people scored below this?\"*",
          },
          {
            type: "table",
            title: "Class test scores — who stands where?",
            showTotals: false,
            columns: ["Score", "Plain English"],
            rows: [
              { label: "Ali", values: [55, "Lowest in class"] },
              { label: "Ben", values: [70, "Below middle"] },
              { label: "Cara", values: [85, "Middle — 50th percentile"] },
              { label: "Dan", values: [90, "Above most students"] },
              { label: "Eve", values: [100, "Highest in class"] },
            ],
            highlightRows: [2],
            footnote:
              "Highlighted row = **50th percentile** (middle). **90th percentile** ≈ 97 — the score line where only 10% scored higher.",
          },
          {
            type: "array",
            title: "Same scores as a NumPy array",
            label: "scores",
            values: [55, 70, 85, 90, 100],
            colLabels: ["low →", "", "middle", "", "→ high"],
            accentColor: "#22c55e",
            footnote:
              "Sorted lowest to highest. `np.percentile(scores, 50)` → **85**. `np.percentile(scores, 90)` → **97**.",
          },
          {
            type: "text",
            content:
              "**Real-life uses:** salary reports (90th percentile pay), child growth charts (height vs age), weather alerts (95th percentile = unusually hot day).",
            code: {
              lang: "python",
              label: "Percentiles on test scores",
              content: `import numpy as np

scores = np.array([55, 70, 85, 90, 100])

print(np.percentile(scores, 50))   # 85.0 — middle
print(np.percentile(scores, 90))   # 97.0 — top 10% line`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Cheat sheet:** All values present → `.mean()`. Some missing → `np.nanmean()`. Need a ranking or cutoff line → `np.percentile()`.",
          },
          {
            type: "quiz",
            question: "Data has missing values. Safest average?",
            options: ["scores.mean()", "np.nanmean(scores)", "np.sum(scores)", "len(scores)"],
            answer: 1,
            explanation: "np.nanmean skips NaN values and averages the rest.",
          },
        ],
        challenge: {
          title: "Mean Despite Missing Data",
          description:
            "Print `np.nanmean` of `np.array([10.0, np.nan, 20.0, 30.0])`.",
          starterCode: `import numpy as np

data = np.array([10.0, np.nan, 20.0, 30.0])
`,
          solutionCode: `import numpy as np

data = np.array([10.0, np.nan, 20.0, 30.0])
print(np.nanmean(data))`,
          tests: [
            {
              id: 1,
              label: "Uses np.nanmean",
              hint: "np.nanmean(data)",
              keywords: [{ pattern: "np\\.nanmean\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "reshape",
    title: "Reshape & Combine",
    icon: "🔀",
    color: "#f97316",
    lessons: [
      {
        id: "numpy-13",
        title: "reshape",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Imagine you have **12 chocolates in a line**. You can place them in a **3×4 box** — same chocolates, just arranged differently. **`reshape`** does that for numbers: it changes the **shape** without adding or removing any values.",
          },
          {
            type: "text",
            content:
              "**Real life:** A long list of **daily temperatures** (7 days) can become a **calendar row**. A stream of **photo pixels** can become a **small image grid** for editing.",
          },
          {
            type: "array",
            title: "One line → small table (same 6 numbers)",
            label: "values",
            values: [10, 20, 30, 40, 50, 60],
            colLabels: ["1", "2", "3", "4", "5", "6"],
            footnote:
              "Before reshape: **one row** of 6 numbers. After `reshape(2, 3)`: **2 rows, 3 columns** — still 6 numbers total.",
          },
          {
            type: "code",
            lang: "python",
            label: "Weekly pocket money → 2 weeks × 3 days",
            content: `import numpy as np

# 6 days of pocket money in one line
money = np.array([50, 60, 55, 70, 65, 80])

# Turn into 2 rows (weeks) × 3 columns (days)
table = money.reshape(2, 3)
print(table)
print(table.shape)   # (2, 3)`,
          },
          {
            type: "table",
            title: "The one rule you must remember",
            showTotals: false,
            columns: ["Check", "Example"],
            rows: [
              { label: "Count elements", values: ["6 numbers in the array", ""] },
              { label: "Pick a shape", values: ["2 rows × 3 columns", "2 × 3 = 6 ✓"] },
              { label: "Bad shape", values: ["2 rows × 4 columns", "2 × 4 = 8 ✗ (only have 6)"] },
            ],
            footnote: "Rows × columns must equal the **total number of values**. No magic — just counting.",
          },
          {
            type: "code",
            lang: "python",
            label: "Use -1 when NumPy should figure out one side",
            content: `import numpy as np

# 20 quiz scores in one long list
scores = np.arange(20)

# I want 4 rows — let NumPy work out columns
class_table = scores.reshape(4, -1)
print(class_table.shape)   # (4, 5) because 20 ÷ 4 = 5`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Only **one** size can be `-1`. Think: *\"I know I want 4 rows — NumPy, please fill in how many columns.\"*",
          },
          {
            type: "quiz",
            question: "You have 6 numbers. Can you reshape to (2, 4)?",
            options: [
              "Yes, always",
              "No — 2×4 needs 8 numbers, you only have 6",
              "Only if they are even",
              "Only with stack",
            ],
            answer: 1,
            explanation:
              "Multiply rows × columns. 2×4 = 8, but you only have 6 values.",
          },
        ],
        challenge: {
          title: "Make a 2×3 Grid",
          description:
            "Create 6 numbers with `np.arange(6)`, reshape them into 2 rows and 3 columns, and print the result.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.arange(6)
print(a.reshape(2, 3))`,
          tests: [
            {
              id: 1,
              label: "Uses arange",
              hint: "np.arange(6)",
              keywords: [{ pattern: "np\\.arange" }],
            },
            {
              id: 2,
              label: "reshape(2, 3)",
              hint: "reshape(2, 3)",
              keywords: [{ pattern: "reshape\\s*\\(\\s*2\\s*,\\s*3\\s*\\)" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-13b",
        title: "transpose & ravel",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Sometimes your data is saved **the wrong way round** for what you need. A **school timetable** might list *periods as rows* and *days as columns* — but your chart app wants *days as rows*. **`.T`** (transpose) **flips rows and columns**, like turning a page sideways.",
          },
          {
            type: "table",
            title: "Class schedule — before and after .T",
            showTotals: false,
            columns: ["Mon", "Tue", "Wed"],
            rows: [
              { label: "Period 1", values: ["Math", "English", "Science"] },
              { label: "Period 2", values: ["Art", "Math", "PE"] },
            ],
            footnote:
              "Original: each **row** is a period. After `.T`, each **row** becomes a day — easier for a \"hours per day\" chart.",
          },
          {
            type: "code",
            lang: "python",
            label: "Flip a simple number timetable",
            content: `import numpy as np

# rows = periods, columns = Mon–Wed
schedule = np.array([[1, 2, 3],
                     [4, 5, 6]])

flipped = schedule.T
print(flipped)
# [[1, 4],
#  [2, 5],
#  [3, 6]]`,
          },
          {
            type: "text",
            content:
              "**`ravel()`** means *\"make it one long line\"*. Read the grid **left to right, top to bottom** — like reading a book line by line into a single shopping list.",
          },
          {
            type: "array",
            title: "2×2 game board → one line with ravel()",
            label: "board",
            values: [9, 8, 7, 6],
            colLabels: ["cell 1", "cell 2", "cell 3", "cell 4"],
            footnote:
              "Grid `[[9, 8], [7, 6]]` becomes `[9, 8, 7, 6]` — same numbers, no longer a square.",
          },
          {
            type: "code",
            lang: "python",
            label: "Flatten a score board, then reshape back",
            content: `import numpy as np

# 2×2 tic-tac-toe scores
board = np.array([[9, 8],
                  [7, 6]])

flat = board.ravel()
print(flat)          # [9, 8, 7, 6]

back = flat.reshape(2, 2)
print(back)          # same 2×2 again`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**`ravel()`** is fast and often shares memory with the original. **`flatten()`** always makes a **separate copy** — use it when you will change the flat list and do not want to affect the grid.",
          },
          {
            type: "diagram",
            title: "Which tool when?",
            nodes: [
              {
                id: "transpose",
                label: ".T transpose",
                color: "#f97316",
                items: [
                  "Rows ↔ columns swap",
                  "Same total numbers",
                  "Timetables, spreadsheets",
                ],
              },
              {
                id: "ravel",
                label: "ravel()",
                color: "#fb923c",
                items: [
                  "Any shape → one line",
                  "Read row by row",
                  "Before saving or reshaping",
                ],
              },
            ],
          },
          {
            type: "quiz",
            question: "What does `.T` do on a 2D array?",
            options: [
              "Sorts smallest to largest",
              "Swaps rows and columns",
              "Deletes the last row",
              "Adds up every number",
            ],
            answer: 1,
            explanation:
              "Transpose turns rows into columns and columns into rows — like rotating a table.",
          },
        ],
        challenge: {
          title: "Flip and Flatten",
          description:
            "Make `grid = np.array([[1,2,3],[4,5,6]])`. Print the transpose (`grid.T`), then print one flat line with `grid.ravel()`.",
          starterCode: `import numpy as np

grid = np.array([[1, 2, 3], [4, 5, 6]])
`,
          solutionCode: `import numpy as np

grid = np.array([[1, 2, 3], [4, 5, 6]])
print(grid.T)
print(grid.ravel())`,
          tests: [
            {
              id: 1,
              label: "Uses .T",
              hint: "grid.T",
              keywords: [{ pattern: "\\.T" }],
            },
            {
              id: 2,
              label: "Uses ravel",
              hint: "grid.ravel()",
              keywords: [{ pattern: "\\.ravel\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints twice",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-14",
        title: "stack & concatenate",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Real data often arrives in **separate pieces** — two weekly reports, two column lists, two route tallies. NumPy can **glue** those pieces into one array. Below, each method is shown as: **piece 1 → piece 2 → combined result → code**.",
          },

          // ── np.vstack ──────────────────────────────────────────────
          {
            type: "text",
            content:
              "**np.vstack — stack rows (vertical).** Use when each piece is a **row** and you want to **pile them on top of each other** — like sliding Week 2's report under Week 1's.",
          },
          {
            type: "scenario",
            content:
              "A café manager receives **two separate weekly sales sheets** — one for Week 1, one for Week 2. Each sheet is its own small table (one row, four days).",
          },
          {
            type: "array",
            title: "Piece 1 — Week 1 (separate array `week1`)",
            label: "week1",
            values: [420, 380, 510, 490],
            colLabels: ["Mon", "Tue", "Wed", "Thu"],
            accentColor: "#f97316",
            footnote: "This lives in **its own variable**. Not joined to Week 2 yet.",
          },
          {
            type: "array",
            title: "Piece 2 — Week 2 (separate array `week2`)",
            label: "week2",
            values: [450, 395, 530, 505],
            colLabels: ["Mon", "Tue", "Wed", "Thu"],
            accentColor: "#fb923c",
            footnote: "Same column layout as Week 1, but still a **second, separate** array.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Before vstack:** two arrays, each shape **(4,)** or **(1, 4)**. **After `np.vstack([week1, week2])`:** one table, shape **(2, 4)** — Week 1 on top, Week 2 below.",
          },
          {
            type: "array",
            title: "Combined — after `np.vstack([week1, week2])`",
            rows: [
              {
                label: "week1",
                values: [420, 380, 510, 490],
                colLabels: ["Mon", "Tue", "Wed", "Thu"],
              },
              {
                label: "week2",
                values: [450, 395, 530, 505],
                colLabels: ["Mon", "Tue", "Wed", "Thu"],
              },
            ],
            accentColor: "#22c55e",
            footnote: "One manager's view: **both weeks in a single (2 × 4) table**.",
          },
          {
            type: "code",
            lang: "python",
            label: "vstack — café sales, two weeks",
            content: `import numpy as np

week1 = np.array([420, 380, 510, 490])   # piece 1
week2 = np.array([450, 395, 530, 505])   # piece 2

both_weeks = np.vstack([week1, week2])    # combine ↓
print(both_weeks)
print(both_weeks.shape)   # (2, 4)`,
          },

          // ── np.hstack ──────────────────────────────────────────────
          {
            type: "text",
            content:
              "**np.hstack — stack columns (horizontal).** Use when each piece is a **column** and you want to **place them side by side** — like putting badge numbers next to hours worked.",
          },
          {
            type: "scenario",
            content:
              "HR exports **badge numbers** in one file and **hours worked** in another. Same three employees, but two separate column lists.",
          },
          {
            type: "array",
            title: "Piece 1 — badge numbers (separate array `badges`)",
            rows: [
              { label: "Sara", values: [1042], colLabels: ["Badge #"] },
              { label: "Omar", values: [1048], colLabels: ["Badge #"] },
              { label: "Lina", values: [1051], colLabels: ["Badge #"] },
            ],
            accentColor: "#f97316",
            footnote: "A **(3 × 1)** column — IDs only. No hours yet.",
          },
          {
            type: "array",
            title: "Piece 2 — hours worked (separate array `hours`)",
            rows: [
              { label: "Sara", values: [38], colLabels: ["Hours"] },
              { label: "Omar", values: [40], colLabels: ["Hours"] },
              { label: "Lina", values: [36], colLabels: ["Hours"] },
            ],
            accentColor: "#fb923c",
            footnote: "Another **(3 × 1)** column — hours only. Same row order as badges.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Before hstack:** two columns stored separately. **After `np.hstack([badges, hours])`:** one **(3 × 2)** payroll table — badge on the left, hours on the right for each person.",
          },
          {
            type: "array",
            title: "Combined — after `np.hstack([badges, hours])`",
            rows: [
              {
                label: "Sara",
                values: [1042, 38],
                colLabels: ["Badge #", "Hours"],
              },
              {
                label: "Omar",
                values: [1048, 40],
                colLabels: ["Badge #", "Hours"],
              },
              {
                label: "Lina",
                values: [1051, 36],
                colLabels: ["Badge #", "Hours"],
              },
            ],
            accentColor: "#22c55e",
            footnote: "One row per employee — **both columns merged horizontally**.",
          },
          {
            type: "code",
            lang: "python",
            label: "hstack — badges beside hours",
            content: `import numpy as np

badges = np.array([[1042], [1048], [1051]])   # piece 1
hours  = np.array([[38], [40], [36]])          # piece 2

payroll = np.hstack([badges, hours])           # combine →
print(payroll)
# [[1042, 38],
#  [1048, 40],
#  [1051, 36]]`,
          },

          // ── np.concatenate ─────────────────────────────────────────
          {
            type: "text",
            content:
              "**np.concatenate — join end-to-end (any axis).** Use when you want to **tape lists together** into one longer sequence. On 1D arrays it lines up morning stops, then afternoon stops. On 2D tables, **`axis=0`** stacks down (like vstack) and **`axis=1`** joins across (like hstack).",
          },
          {
            type: "scenario",
            content:
              "A delivery driver tallies packages at **three morning stops**, then **three afternoon stops**. You get two short lists — not a table yet.",
          },
          {
            type: "array",
            title: "Piece 1 — morning route (separate array `morning`)",
            label: "morning",
            values: [4, 7, 2],
            colLabels: ["Stop 1", "Stop 2", "Stop 3"],
            accentColor: "#f97316",
            footnote: "Three morning counts — shape **(3,)**. Afternoon not included.",
          },
          {
            type: "array",
            title: "Piece 2 — afternoon route (separate array `afternoon`)",
            label: "afternoon",
            values: [5, 1, 6],
            colLabels: ["Stop 1", "Stop 2", "Stop 3"],
            accentColor: "#fb923c",
            footnote: "Three afternoon counts — another separate **(3,)** array.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Before concatenate:** `[4, 7, 2]` and `[5, 1, 6]` — two short lists. **After `np.concatenate([morning, afternoon])`:** one long list `[4, 7, 2, 5, 1, 6]` — shape **(6,)**.",
          },
          {
            type: "array",
            title: "Combined — after `np.concatenate([morning, afternoon])`",
            label: "full_day",
            values: [4, 7, 2, 5, 1, 6],
            colLabels: ["1", "2", "3", "4", "5", "6"],
            accentColor: "#22c55e",
            footnote:
              "Morning stops first, afternoon stops second — **one timeline** for the whole day.",
          },
          {
            type: "code",
            lang: "python",
            label: "concatenate — morning then afternoon",
            content: `import numpy as np

morning   = np.array([4, 7, 2])    # piece 1
afternoon = np.array([5, 1, 6])    # piece 2

full_day = np.concatenate([morning, afternoon])
print(full_day)   # [4, 7, 2, 5, 1, 6]`,
          },

          {
            type: "quiz",
            question:
              "You have Monday's sales row and Tuesday's sales row. You want one table with Monday on top and Tuesday below. Which do you use?",
            options: ["hstack", "vstack", "reshape only", "transpose only"],
            answer: 1,
            explanation:
              "vstack adds rows — each array becomes a new row underneath the previous one.",
          },
        ],
        challenge: {
          title: "Stack Vertically",
          description:
            "You have two short lists: `[1, 2]` and `[3, 4]`. Use `np.vstack` to stack them as rows and print the result.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.array([1, 2])
b = np.array([3, 4])
print(np.vstack([a, b]))`,
          tests: [
            {
              id: 1,
              label: "Uses vstack",
              hint: "np.vstack([a, b])",
              keywords: [{ pattern: "np\\.vstack\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "random",
    title: "Random & Luck",
    icon: "🎲",
    color: "#eab308",
    lessons: [
      {
        id: "numpy-20",
        title: "Random Numbers & Seed",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Real life is full of **luck** — dice rolls, raffle draws, which song shuffle plays next. When you **test** a game or practice a lesson, you often need **fake luck** that looks random but you can **replay the same way** every time. NumPy's **`np.random`** module is your toolkit for that.",
          },
          {
            type: "scenario",
            content:
              "You're building a **board-game night app**. You need to roll dice, draw cards, and test that the score screen works — but every time you run your code, you want the **same test rolls** so you can fix bugs without guessing.",
          },
          {
            type: "diagram",
            title: "Two main ways to get random numbers",
            nodes: [
              {
                id: "rand",
                label: "np.random.rand()",
                color: "#eab308",
                items: [
                  "Decimal numbers from 0 up to (but not including) 1",
                  "Like: 0.37, 0.91, 0.04",
                  "Great for percentages & simulations",
                ],
              },
              {
                id: "randint",
                label: "np.random.randint()",
                color: "#f59e0b",
                items: [
                  "Whole numbers in a range you pick",
                  "Like dice: 1, 2, 3, 4, 5, 6",
                  "Great for rolls, counts, coin flips (0/1)",
                ],
              },
              {
                id: "seed",
                label: "np.random.seed()",
                color: "#ca8a04",
                items: [
                  "Freezes the random pattern",
                  "Same seed → same numbers next run",
                  "Essential for fair testing & sharing code",
                ],
              },
            ],
          },
          {
            type: "table",
            title: "Quick cheat sheet — random helpers",
            columns: ["Function", "What you get", "Real-life use"],
            rows: [
              {
                label: "rand",
                values: [
                  "`np.random.rand(5)`",
                  "5 decimals between 0 and 1",
                  "Random discount %, lottery odds",
                ],
              },
              {
                label: "randint",
                values: [
                  "`np.random.randint(1, 7, 5)`",
                  "5 whole numbers from 1 to 6",
                  "Five dice rolls",
                ],
              },
              {
                label: "seed",
                values: [
                  "`np.random.seed(42)`",
                  "Locks the next random sequence",
                  "Same test data every debug run",
                ],
              },
            ],
            showTotals: false,
            footnote:
              "`randint(low, high)` uses **high exclusive** — `randint(1, 7)` gives 1–6, perfect for a six-sided die.",
          },

          // ── np.random.rand ─────────────────────────────────────────
          {
            type: "text",
            content:
              "**`np.random.rand(n)`** — random **decimals** between **0** and **1** (1 is never included). Think of each number as a **random percentage** or a **spin on a wheel** that only goes from 0% to 99.9%.",
            code: {
              lang: "python",
              label: "Three random decimals — like three raffle wheel spins",
              content: `import numpy as np

# Three random floats in [0, 1)
spins = np.random.rand(3)
print(spins)
# Example: [0.37  0.91  0.04]  — different every run (unless you set a seed)`,
            },
          },
          {
            type: "array",
            title: "What `rand(5)` might look like (one possible run)",
            label: "rand(5)",
            values: [0.37, 0.91, 0.04, 0.72, 0.15],
            colLabels: ["#1", "#2", "#3", "#4", "#5"],
            accentColor: "#eab308",
            footnote:
              "Each value is **independent** — getting 0.91 does not change the next spin. All are ≥ 0 and **< 1**.",
          },

          // ── np.random.randint ──────────────────────────────────────
          {
            type: "text",
            content:
              "**`np.random.randint(low, high, size=n)`** — random **whole numbers**. The **high** end is **exclusive**, so `randint(1, 7)` gives **1 through 6** — exactly like a fair die.",
            code: {
              lang: "python",
              label: "Roll five dice at game night",
              content: `import numpy as np

rolls = np.random.randint(1, 7, size=5)
print(rolls)
# Example: [4 1 6 3 5]  — five separate die faces`,
            },
          },
          {
            type: "scenario",
            content:
              "At **family game night**, you roll one die five times to move your token. NumPy can simulate those five rolls in **one line** — no physical dice needed while you're coding the app.",
          },
          {
            type: "array",
            title: "Five dice rolls — `randint(1, 7, size=5)`",
            label: "rolls",
            values: [4, 1, 6, 3, 5],
            colLabels: ["Roll 1", "Roll 2", "Roll 3", "Roll 4", "Roll 5"],
            accentColor: "#f59e0b",
            footnote:
              "Each cell is an integer from **1 to 6**. Run again without a seed and you'll usually get a different row.",
          },

          // ── np.random.seed ─────────────────────────────────────────
          {
            type: "text",
            content:
              "Here's the problem: **true random** is hard to test. If your dice code prints `[4 1 6]` today and `[2 2 5]` tomorrow, how do you know the bug is fixed? **`np.random.seed(number)`** resets the random generator so the **next** random numbers are **the same every time** you use that seed.",
            code: {
              lang: "python",
              label: "Same seed → identical dice rolls on every run",
              content: `import numpy as np

np.random.seed(42)
print(np.random.randint(1, 7, size=3))
# [6 3 1]  — always these three if seed is 42

np.random.seed(42)   # reset to the same starting point
print(np.random.randint(1, 7, size=3))
# [6 3 1]  — identical! Great for debugging.`,
            },
          },
          {
            type: "diagram",
            title: "Seed = replay button for luck",
            nodes: [
              {
                id: "no-seed",
                label: "No seed",
                color: "#f43f5e",
                items: [
                  "Every run → new random numbers",
                  "Good for real games",
                  "Hard to debug \"what went wrong?\"",
                ],
              },
              {
                id: "with-seed",
                label: "With seed(42)",
                color: "#22c55e",
                items: [
                  "Every run → same sequence",
                  "Good for tests & homework checks",
                  "Teammates get same results too",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Set the seed **once at the top** of your script before any `rand` or `randint` calls. Change the number (7, 42, 100) to get a **different** — but still **repeatable** — lucky pattern.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Learning outcome check:** You can now use **`rand`** for decimals, **`randint`** for dice-style integers, and **`seed`** so your luck-based examples repeat when you need fair tests.",
          },
          {
            type: "quiz",
            question: "Which function rolls a fair six-sided die many times?",
            options: [
              "np.random.rand(1, 7, 5)",
              "np.random.randint(1, 7, size=5)",
              "np.random.seed(1, 6)",
              "np.random.choice(6)",
            ],
            answer: 1,
            explanation:
              "`randint(1, 7, size=5)` gives five integers from 1 to 6. `rand` gives decimals, not die faces.",
          },
          {
            type: "quiz",
            question: "Why set np.random.seed() before testing?",
            options: [
              "To make Python run faster",
              "To get the same random numbers every run",
              "To force all rolls to be 6",
              "Because arrays require a seed",
            ],
            answer: 1,
            explanation:
              "A fixed seed makes the random sequence repeatable — essential for debugging and sharing reproducible experiments.",
          },
        ],
        challenge: {
          title: "Roll the Dice",
          description:
            "Set seed to `7`, then print `np.random.randint(1, 7, size=5)` (five dice rolls).",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

np.random.seed(7)
print(np.random.randint(1, 7, size=5))`,
          tests: [
            {
              id: 1,
              label: "Sets seed",
              hint: "np.random.seed(7)",
              keywords: [{ pattern: "np\\.random\\.seed\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses randint",
              hint: "np.random.randint(1, 7, ...)",
              keywords: [{ pattern: "np\\.random\\.randint\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-21",
        title: "choice, shuffle & permutation",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Sometimes you don't need a **new random number** — you need to **pick from a list you already have**: lunch spots, team names, student IDs. NumPy gives you **`choice`** (draw from a bowl), **`shuffle`** (mix in place), and **`permutation`** (mix into a **copy**). Together they help you build **fair** picks with no favourites.",
          },
          {
            type: "scenario",
            content:
              "A PE teacher has **four house teams** — Red, Blue, Green, Yellow — and must pick **two** for a friendly match. Everyone agrees the pick should be **random and fair**, with **no team chosen twice**.",
          },

          // ── np.random.choice ───────────────────────────────────────
          {
            type: "text",
            content:
              "**`np.random.choice(items, size=n, replace=...)`** — reach into a bowl and pull out items. **`replace=True`** (default) means you can pick the **same item twice** (like drawing a card and putting it back). **`replace=False`** means each item can only be picked **once** — perfect for \"pick two different teams.\"",
          },
          {
            type: "table",
            title: "choice — replace True vs False",
            columns: ["Setting", "Meaning", "Example"],
            rows: [
              {
                label: "replace=True",
                values: [
                  "Put item back after each draw",
                  "Same lunch spot can appear twice in a week",
                  "`choice(spots, size=5)`",
                ],
              },
              {
                label: "replace=False",
                values: [
                  "Each item picked at most once",
                  "Two different teams for today's match",
                  "`choice(teams, size=2, replace=False)`",
                ],
              },
            ],
            showTotals: false,
            footnote:
              "`size` cannot be bigger than the list length when `replace=False` — you can't pick 5 unique teams from only 4 names.",
          },
          {
            type: "array",
            title: "The bowl — four teams in `teams`",
            label: "teams",
            values: ["Red", "Blue", "Green", "Yellow"],
            colLabels: ["Slot 1", "Slot 2", "Slot 3", "Slot 4"],
            accentColor: "#eab308",
            footnote:
              "`np.random.choice(teams, size=2, replace=False)` picks **2 different** names from this row.",
          },
          {
            type: "text",
            content:
              "**Fair team picker** — two teams, no repeats:",
            code: {
              lang: "python",
              label: "Pick two different teams for today's match",
              content: `import numpy as np

teams = np.array(["Red", "Blue", "Green", "Yellow"])
match = np.random.choice(teams, size=2, replace=False)
print(match)
# Example: ['Green' 'Red']  — order may vary`,
            },
          },
          {
            type: "text",
            content:
              "**Lunch roulette** — with replacement, the same spot can win twice (you might eat tacos two days in a row):",
            code: {
              lang: "python",
              label: "Pick 3 lunch spots — repeats allowed",
              content: `import numpy as np

spots = np.array(["tacos", "pasta", "sushi", "burger"])
week = np.random.choice(spots, size=3, replace=True)
print(week)
# Example: ['tacos' 'sushi' 'tacos']  — tacos twice is OK here`,
            },
          },

          // ── shuffle vs permutation ─────────────────────────────────
          {
            type: "text",
            content:
              "**`np.random.shuffle(arr)`** — **reorders the array in place**. The same items stay; only their **order** changes. Like shuffling a **physical deck** — the cards in your hand change order, and the deck variable itself is mixed.",
          },
          {
            type: "text",
            content:
              "**`np.random.permutation(arr)`** — returns a **new** shuffled array and **leaves the original untouched**. Use this when you need the **old order for records** (attendance list) but also a **random order for today's activity**.",
          },
          {
            type: "diagram",
            title: "shuffle vs permutation — what happens to the original?",
            nodes: [
              {
                id: "shuffle",
                label: "np.random.shuffle",
                color: "#f59e0b",
                items: [
                  "Changes the array you pass in",
                  "Original order is gone",
                  "Like mixing cards in the same pile",
                ],
              },
              {
                id: "perm",
                label: "np.random.permutation",
                color: "#22c55e",
                items: [
                  "Returns a new shuffled copy",
                  "Original array stays the same",
                  "Like photocopying then shuffling the copy",
                ],
              },
            ],
          },
          {
            type: "scenario",
            content:
              "A teacher has **`queue = [101, 102, 103, 104]`** (student IDs in register order). For **presentation order**, she shuffles a **copy** so the official register file still shows 101→104, but today's speaking order is random.",
          },
          {
            type: "array",
            title: "Before shuffle — register order",
            label: "queue (before)",
            values: [101, 102, 103, 104],
            colLabels: ["1st", "2nd", "3rd", "4th"],
            accentColor: "#6366f1",
            footnote: "Official order — saved for the school record.",
          },
          {
            type: "text",
            content:
              "**Shuffle in place** — the variable itself gets a new order:",
            code: {
              lang: "python",
              label: "shuffle — queue variable is permanently reordered",
              content: `import numpy as np

queue = np.array([101, 102, 103, 104])
np.random.shuffle(queue)
print(queue)
# Example: [103  101  104  102]  — original order is lost`,
            },
          },
          {
            type: "text",
            content:
              "**Permutation** — keep the register, get a separate random line:",
            code: {
              lang: "python",
              label: "permutation — original stays, new array for today",
              content: `import numpy as np

register = np.array([101, 102, 103, 104])
today_order = np.random.permutation(register)

print("register:", register)       # [101 102 103 104] — unchanged
print("today:", today_order)       # e.g. [104  101  103  102]`,
            },
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Building fair teams:** use **`choice(..., replace=False)`** so nobody is picked twice. **Shuffling a line:** use **`permutation`** if you still need the original list; use **`shuffle`** only when overwriting the old order is fine.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Learning outcome check:** You can **`choice`** items from a list, **`shuffle`** in place, and use **`permutation`** when the original must stay — all tools for unbiased random samples.",
          },
          {
            type: "quiz",
            question: "You need two different teams from four names. Best call?",
            options: [
              "np.random.choice(teams, size=2, replace=True)",
              "np.random.choice(teams, size=2, replace=False)",
              "np.random.shuffle(2)",
              "np.random.permutation(teams, size=2)",
            ],
            answer: 1,
            explanation:
              "`replace=False` guarantees no duplicate picks — exactly what you want for two distinct teams.",
          },
          {
            type: "quiz",
            question: "Which leaves the original array unchanged?",
            options: [
              "np.random.shuffle",
              "np.random.permutation",
              "both",
              "neither",
            ],
            answer: 1,
            explanation:
              "`permutation` returns a new shuffled array. `shuffle` edits the array you pass in.",
          },
        ],
        challenge: {
          title: "Fair Team Picker",
          description:
            "From `teams = np.array(['Red','Blue','Green','Yellow'])`, print `np.random.choice(teams, size=2, replace=False)`.",
          starterCode: `import numpy as np

teams = np.array(["Red", "Blue", "Green", "Yellow"])
`,
          solutionCode: `import numpy as np

teams = np.array(["Red", "Blue", "Green", "Yellow"])
print(np.random.choice(teams, size=2, replace=False))`,
          tests: [
            {
              id: 1,
              label: "Uses np.random.choice",
              hint: "np.random.choice(teams, ...)",
              keywords: [{ pattern: "np\\.random\\.choice\\s*\\(" }],
            },
            {
              id: 2,
              label: "replace=False",
              hint: "replace=False",
              keywords: [{ pattern: "replace\\s*=\\s*False" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-21b",
        title: "Random Simulations",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "A **simulation** is **make-believe luck on the computer**. You do not need a real coin or dice. NumPy picks random numbers for you, and you **count** or **find the average** — that is the whole idea.",
          },
          {
            type: "text",
            content:
              "**You only need two skills:** (1) **`np.sum`** — how many? (2) **`.mean()`** — what is the usual number? Everything in this lesson uses those two ideas.",
          },
          {
            type: "scenario",
            content:
              "**Ali** and **Sara** play at recess. They flip a coin **5 times** to see who starts. Ali asks: *\"How many heads will I get?\"* We can **pretend** 5 flips on the laptop instead of using a real coin.",
          },
          {
            type: "diagram",
            title: "Simulation = 3 easy steps",
            nodes: [
              {
                id: "step1",
                label: "Step 1 — Get random numbers",
                color: "#eab308",
                items: [
                  "NumPy picks 0 or 1 (or 1–6 for a dice)",
                  "Like a computer coin flip",
                ],
              },
              {
                id: "step2",
                label: "Step 2 — Count or average",
                color: "#f59e0b",
                items: [
                  "Count heads with np.sum",
                  "Or use mean() for dice average",
                ],
              },
              {
                id: "step3",
                label: "Step 3 — Look at the answer",
                color: "#22c55e",
                items: [
                  "3 heads out of 5? Fair enough",
                  "Try more flips if you want a steadier guess",
                ],
              },
            ],
          },
          {
            type: "table",
            title: "Three fun stories — same NumPy pattern",
            columns: ["Story", "What we count"],
            rows: [
              {
                label: "Coin flips",
                values: [
                  "5 flips — 0 means heads, 1 means tails",
                  "How many heads? (count the 0s)",
                ],
              },
              {
                label: "Dice rolls",
                values: [
                  "5 rolls — numbers 1 to 6",
                  "What is the average roll?",
                ],
              },
              {
                label: "Rain or sun",
                values: [
                  "5 days — 0 sunny, 1 rainy",
                  "How many rainy days? (count the 1s)",
                ],
              },
            ],
            showTotals: false,
            footnote:
              "Coin and rain use the **same code pattern**. Dice uses **mean()** instead of counting.",
          },

          // ── Example 1: Coin ─────────────────────────────────────────
          {
            type: "text",
            content:
              "**Example 1 — 5 coin flips.** Rule: **0 = heads**, **1 = tails**. Line 1: set seed (so practice is repeatable). Line 2: get 5 random 0s and 1s. Line 3: count heads.",
          },
          {
            type: "text",
            content: "Follow each line below. Run it and read the printed numbers.",
            code: {
              lang: "python",
              label: "5 coin flips — how many heads?",
              content: `import numpy as np

np.random.seed(0)                         # step 1: lock luck for practice

flips = np.random.randint(0, 2, size=5) # step 2: five flips (0 or 1)
# Example result: [0, 1, 0, 0, 1]

heads = np.sum(flips == 0)                # step 3: count zeros = heads
print("Flips:", flips)
print("Heads:", heads)`,
            },
          },
          {
            type: "array",
            title: "Sample result — count the 0s for heads",
            label: "flips",
            values: [0, 1, 0, 0, 1],
            colLabels: ["Flip 1", "Flip 2", "Flip 3", "Flip 4", "Flip 5"],
            accentColor: "#eab308",
            footnote:
              "This run has **3 heads** (three zeros). Your run might differ — that is normal with luck.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**`flips == 0`** asks: \"is this flip a head?\" **`np.sum`** adds up how many times the answer is yes. No need to loop by hand.",
          },

          // ── Example 2: Dice ─────────────────────────────────────────
          {
            type: "text",
            content:
              "**Example 2 — 5 dice rolls.** Imagine a board game. You roll 1–6 five times. **Average** = add all rolls and divide by 5. NumPy: `rolls.mean()`.",
          },
          {
            type: "text",
            content:
              "A fair dice has middle value **3.5**. With only 5 rolls you might get average **2.4** or **4.2**. With **50 rolls** (your challenge!) the average usually lands near **3.5**.",
            code: {
              lang: "python",
              label: "5 dice rolls — what is the average?",
              content: `import numpy as np

np.random.seed(42)

rolls = np.random.randint(1, 7, size=5)  # five rolls: 1 through 6
# Example: [4, 1, 6, 3, 5]

print("Rolls:", rolls)
print("Average:", rolls.mean())            # one number: typical roll`,
            },
          },
          {
            type: "array",
            title: "Sample rolls — add and divide by 5, or use mean()",
            label: "rolls",
            values: [4, 1, 6, 3, 5],
            colLabels: ["Roll 1", "Roll 2", "Roll 3", "Roll 4", "Roll 5"],
            accentColor: "#f59e0b",
            footnote:
              "(4+1+6+3+5) / 5 = 3.8 — that is the average for this sample.",
          },

          // ── Example 3: Weather ──────────────────────────────────────
          {
            type: "scenario",
            content:
              "**Sara** checks the week: *\"Will it rain a lot?\"* We pretend **5 days**. **0 = sunny**, **1 = rainy**. Count the 1s — same idea as counting heads.",
          },
          {
            type: "text",
            content:
              "**Example 3 — 5 days of weather.** Same steps as the coin. Only the story changes.",
            code: {
              lang: "python",
              label: "5 days — how many rainy days?",
              content: `import numpy as np

np.random.seed(1)

weather = np.random.randint(0, 2, size=5)  # 0=sunny, 1=rain
# Example: [1, 0, 0, 1, 0]

rainy = np.sum(weather == 1)               # count the 1s
print("Weather:", weather)
print("Rainy days:", rainy)`,
            },
          },
          {
            type: "array",
            title: "Sample week — 1 means rain",
            label: "weather",
            values: [1, 0, 0, 1, 0],
            colLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            accentColor: "#4db6ac",
            footnote: "This sample has **2 rainy days**. Sara might still pack a umbrella!",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**`np.random.seed(0)`** — same random list every time you practice. **No seed** — new random list each run. Use a seed while learning; skip it when you want fresh luck.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Done!** Simulation = random numbers + **count** (`np.sum`) or **average** (`.mean()`). Your challenge rolls **50 dice** — more rolls → average closer to **3.5**.",
          },
          {
            type: "quiz",
            question: "What does a simulation do in this lesson?",
            options: [
              "Deletes bad data from arrays",
              "Uses random numbers to pretend real-life luck",
              "Draws charts automatically",
              "Sends data to the internet",
            ],
            answer: 1,
            explanation:
              "We use NumPy random numbers to copy coin flips, dice rolls, or weather — on the computer.",
          },
          {
            type: "quiz",
            question: "5 coin flips: 0 = head. How do you count heads?",
            options: [
              "np.mean(flips)",
              "np.sum(flips == 0)",
              "np.sort(flips)",
              "flips[0]",
            ],
            answer: 1,
            explanation:
              "np.sum(flips == 0) counts how many times the flip equals 0 (head).",
          },
        ],
        challenge: {
          title: "Roll 50 Dice (bigger simulation)",
          description:
            "Roll a dice **50 times** in one go. Set `np.random.seed(1)`, make `rolls = np.random.randint(1, 7, size=50)`, then print `rolls.mean()`. With 50 rolls, the average is usually close to **3.5**.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

np.random.seed(1)
rolls = np.random.randint(1, 7, size=50)
print(rolls.mean())`,
          tests: [
            {
              id: 1,
              label: "Sets seed",
              hint: "np.random.seed(1)",
              keywords: [{ pattern: "np\\.random\\.seed\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses randint size 50",
              hint: "randint(1, 7, size=50)",
              keywords: [{ pattern: "randint\\s*\\(\\s*1\\s*,\\s*7" }],
            },
            {
              id: 3,
              label: "Prints mean",
              hint: "rolls.mean()",
              keywords: [{ pattern: "\\.mean\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "data-skills",
    title: "Real-World Data Skills",
    icon: "🌍",
    color: "#14b8a6",
    lessons: [
      {
        id: "numpy-22",
        title: "Cleaning NaN Values",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Messy sensor **weather data**? Find gaps with **`np.isnan`**, fill them with **`np.nan_to_num`** or a custom value, or drop them with **`~np.isnan(arr)`** masks. Clean data = trustworthy stats.",
          },
          {
            type: "code",
            lang: "python",
            label: "Detect and filter NaN",
            content: `import numpy as np

readings = np.array([72.0, np.nan, 68.0, np.nan, 75.0])
clean = readings[~np.isnan(readings)]
print(clean)  # [72. 68. 75.]`,
          },
          {
            type: "code",
            lang: "python",
            label: "Replace NaN with zero",
            content: `import numpy as np

data = np.array([1.0, np.nan, 3.0])
fixed = np.nan_to_num(data, nan=0.0)
print(fixed)  # [1. 0. 3.]`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Choosing fill vs drop depends on context — weather gaps might use interpolation; survey blanks might use zero.",
          },
          {
            type: "quiz",
            question: "How do you keep only non-NaN values?",
            options: [
              "arr[np.isnan(arr)]",
              "arr[~np.isnan(arr)]",
              "arr[None]",
              "np.delete all",
            ],
            answer: 1,
            explanation: "~np.isnan inverts the mask to select valid values.",
          },
        ],
        challenge: {
          title: "Drop the Gaps",
          description:
            "From `readings = np.array([1.0, np.nan, 3.0, np.nan, 5.0])`, print only non-NaN values using a boolean mask.",
          starterCode: `import numpy as np

readings = np.array([1.0, np.nan, 3.0, np.nan, 5.0])
`,
          solutionCode: `import numpy as np

readings = np.array([1.0, np.nan, 3.0, np.nan, 5.0])
print(readings[~np.isnan(readings)])`,
          tests: [
            {
              id: 1,
              label: "Uses isnan",
              hint: "np.isnan(readings)",
              keywords: [{ pattern: "np\\.isnan\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints filtered",
              hint: "print(readings[...])",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-23",
        title: "sort, argsort & unique",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**`np.sort`** lines up values from low to high — like sorting **playlist lengths** shortest first. **`np.argsort`** gives the **positions** that would do that sort, so you can rank data without moving the original list.",
          },
          {
            type: "text",
            content:
              "**`np.unique`** finds distinct values and can count how many times each appears — great for “how many students picked each answer?” on a survey.",
          },
          {
            type: "code",
            lang: "python",
            label: "Sort and find the winner index",
            content: `import numpy as np

times = np.array([42.1, 38.5, 40.0, 39.2])
order = np.argsort(times)
print("Fastest runner index:", order[0])
print("Sorted times:", np.sort(times))`,
          },
          {
            type: "code",
            lang: "python",
            label: "Count shirt sizes sold",
            content: `import numpy as np

sizes = np.array(["M", "S", "M", "L", "S", "M"])
labels, counts = np.unique(sizes, return_counts=True)
print(labels)
print(counts)   # how many S, M, L`,
          },
          {
            type: "quiz",
            question: "Which function returns only distinct values (and optional counts)?",
            options: ["np.sort", "np.unique", "np.argsort", "np.ravel"],
            answer: 1,
            explanation: "np.unique removes duplicates; return_counts=True adds tallies.",
          },
        ],
        challenge: {
          title: "Count Each Answer",
          description:
            "For `answers = np.array([1, 2, 2, 3, 1, 2])`, print `np.unique(answers, return_counts=True)`.",
          starterCode: `import numpy as np

answers = np.array([1, 2, 2, 3, 1, 2])
`,
          solutionCode: `import numpy as np

answers = np.array([1, 2, 2, 3, 1, 2])
print(np.unique(answers, return_counts=True))`,
          tests: [
            {
              id: 1,
              label: "Uses np.unique",
              hint: "np.unique(answers, return_counts=True)",
              keywords: [{ pattern: "np\\.unique\\s*\\(" }],
            },
            {
              id: 2,
              label: "return_counts=True",
              hint: "return_counts=True",
              keywords: [{ pattern: "return_counts\\s*=\\s*True" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-24",
        title: "Save & Load .npy Files",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Imagine you've spent **30 minutes** creating and processing a NumPy array. If you close your Python program, everything stored in memory **disappears**.",
          },
          {
            type: "text",
            content:
              "Instead of creating the array again next time, you can **save it to your computer** and **load it back** whenever you need it. That's exactly what **`.npy` files** are for.",
          },
          {
            type: "text",
            content:
              "**`np.save()`** → Saves a NumPy array into a file.\n\n**`np.load()`** → Reads that saved array back into Python.",
          },
          {
            type: "scenario",
            content:
              "Think of a **Word document**: you write notes, click **Save**, and later open the file to continue. NumPy works the same way with arrays — create → save → load → original array back.",
          },
          {
            type: "diagram",
            title: "Save & load flow",
            nodes: [
              {
                id: "create",
                label: "1. Create array",
                color: "#14b8a6",
                items: ["Build your NumPy array", "Process and clean data"],
              },
              {
                id: "save",
                label: "2. np.save()",
                color: "#0d9488",
                items: ["Writes file.npy", "Stores numbers on disk"],
              },
              {
                id: "load",
                label: "3. np.load()",
                color: "#0f766e",
                items: ["Reads file.npy", "Original array is back"],
              },
            ],
          },
          {
            type: "text",
            content:
              "Here is a complete example. Notice that the **loaded array is exactly the same** as the original one.",
            code: {
              lang: "python",
              label: "Save an array, then load it back",
              content: `import numpy as np

# Create an array
arr = np.array([10, 20, 30, 40, 50])

# Save the array
np.save("numbers.npy", arr)
print("Array saved successfully!")

# Load the array
loaded_arr = np.load("numbers.npy")
print("Loaded Array:")
print(loaded_arr)`,
            },
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Expected output:** `Array saved successfully!` then `Loaded Array:` and `[10 20 30 40 50]`.",
          },
          {
            type: "scenario",
            content:
              "**Real-life example — a teacher.** You enter marks for **1000 students** into a NumPy array. If you close Python, those marks disappear. So before closing, you save them with `np.save(\"student_marks.npy\", marks)`. Tomorrow you simply load them with `np.load(\"student_marks.npy\")` — all marks are back instantly.",
          },
          {
            type: "table",
            title: "Why use .npy instead of a text file?",
            columns: ["Text file", ".npy file"],
            rows: [
              {
                label: "Speed",
                values: [
                  "Loading is slower",
                  "Much faster to save and load",
                ],
              },
              {
                label: "Space",
                values: [
                  "Ordinary text takes more space",
                  "Takes less storage space",
                ],
              },
              {
                label: "Data type",
                values: [
                  "Types may change when you reload",
                  "NumPy remembers int, float, etc.",
                ],
              },
              {
                label: "Accuracy",
                values: [
                  "May not match the original array",
                  "Loads exactly as it was saved",
                ],
              },
            ],
            showTotals: false,
            footnote:
              "For arrays like `[10 20 30 40 50]`, prefer `.npy` over plain text when you want a faithful, fast round-trip.",
          },
          {
            type: "text",
            content:
              "**Multiple arrays?** Use **`np.savez()`** to store several arrays in one **`.npz`** file — like a folder that holds several NumPy arrays together.",
            code: {
              lang: "python",
              label: "Save and load more than one array",
              content: `import numpy as np

marks = np.array([88, 92, 75])
ages = np.array([15, 16, 15])

# Save both in one .npz file
np.savez("data.npz", marks=marks, ages=ages)

# Load them later
data = np.load("data.npz")
print(data["marks"])
print(data["ages"])`,
            },
          },
          {
            type: "table",
            title: "Easy way to remember",
            columns: ["Meaning"],
            rows: [
              {
                label: "np.save()",
                values: ["Save **one** NumPy array to a `.npy` file"],
              },
              {
                label: "np.load()",
                values: ["Load the saved array (or `.npz`) back"],
              },
              {
                label: "np.savez()",
                values: ["Save **multiple** arrays in one `.npz` file"],
              },
            ],
            showTotals: false,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use **`np.save`** for one array. Use **`np.savez`** when you need several named arrays (like marks + ages) in a single file.",
          },
          {
            type: "quiz",
            question: "What does np.save() do?",
            options: [
              "Deletes an array from memory",
              "Saves a NumPy array into a .npy file",
              "Sorts the array from low to high",
              "Prints the array to the screen",
            ],
            answer: 1,
            explanation:
              "np.save() writes one NumPy array to a .npy file on your computer.",
          },
          {
            type: "quiz",
            question: "Which function loads a saved .npy file back into Python?",
            options: ["np.read", "np.open", "np.load", "np.reload"],
            answer: 2,
            explanation:
              "np.load() reads a .npy (or .npz) file and returns the array.",
          },
          {
            type: "quiz",
            question: "Why prefer .npy over a plain text file for NumPy arrays?",
            options: [
              "Text files cannot store numbers",
              "It is faster, smaller, and keeps the data type",
              "np.load only works with text files",
              "Text files are always safer",
            ],
            answer: 1,
            explanation:
              ".npy is faster, uses less space, and NumPy remembers dtype so the array loads exactly as saved.",
          },
          {
            type: "quiz",
            question: "How do you save marks and ages together in one file?",
            options: [
              "np.save(\"data.npy\", marks, ages)",
              "np.savez(\"data.npz\", marks=marks, ages=ages)",
              "np.load(\"data.npz\", marks, ages)",
              "print(marks, ages)",
            ],
            answer: 1,
            explanation:
              "np.savez() stores multiple named arrays inside one .npz file.",
          },
        ],
        challenge: {
          title: "Round-Trip an Array",
          description:
            "Create `arr = np.array([10, 20, 30])`, save it with `np.save('temp_arr.npy', arr)`, load with `np.load('temp_arr.npy')`, and print the loaded array.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

arr = np.array([10, 20, 30])
np.save("temp_arr.npy", arr)
loaded = np.load("temp_arr.npy")
print(loaded)`,
          tests: [
            {
              id: 1,
              label: "Uses np.save",
              hint: "np.save('temp_arr.npy', arr)",
              keywords: [{ pattern: "np\\.save\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses np.load",
              hint: "np.load('temp_arr.npy')",
              keywords: [{ pattern: "np\\.load\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints loaded",
              hint: "print(loaded)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "mastery",
    title: "NumPy Mastery",
    icon: "⚡",
    color: "#0ea5e9",
    lessons: [
      {
        id: "numpy-25",
        title: "Views vs Copy",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Slicing often returns a **view** — a window into the same memory. Change the view, and the original changes too! **`.copy()`** makes an independent clone. Like photocopying a **pizza order** vs pointing at the same slip.",
          },
          {
            type: "code",
            lang: "python",
            label: "View surprise",
            content: `import numpy as np

a = np.array([1, 2, 3, 4, 5])
view = a[1:4]
view[0] = 99
print(a)  # [ 1 99  3  4  5] — original changed!`,
          },
          {
            type: "code",
            lang: "python",
            label: "Safe copy",
            content: `import numpy as np

a = np.array([1, 2, 3, 4, 5])
safe = a[1:4].copy()
safe[0] = 99
print(a)   # [1 2 3 4 5] — untouched
print(safe)  # [99  2  3]`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "reshape usually returns a view; flatten() always copies. When in doubt, `.copy()`.",
          },
          {
            type: "quiz",
            question: "How do you guarantee an independent array slice?",
            options: [".view()", ".copy()", "[:]", "np.array only"],
            answer: 1,
            explanation: ".copy() allocates new memory for a true duplicate.",
          },
        ],
        challenge: {
          title: "Copy Before You Tweak",
          description:
            "From `a = np.array([10, 20, 30, 40])`, copy `a[1:3]` with `.copy()`, set the first element of the copy to `999`, and print both `a` and the copy.",
          starterCode: `import numpy as np

a = np.array([10, 20, 30, 40])
`,
          solutionCode: `import numpy as np

a = np.array([10, 20, 30, 40])
b = a[1:3].copy()
b[0] = 999
print(a)
print(b)`,
          tests: [
            {
              id: 1,
              label: "Uses .copy()",
              hint: "a[1:3].copy()",
              keywords: [{ pattern: "\\.copy\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints both arrays",
              hint: "print(a) and print(b)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-26",
        title: "ufuncs & vectorization",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "**Ufuncs** (universal functions) such as `np.sqrt`, `np.log`, and `np.abs` work on every element at once. **Vectorization** means writing `arr * 2` instead of looping — NumPy runs the work in fast compiled code.",
          },
          {
            type: "text",
            content:
              "Picture converting **1000 battery percentages** to decimals: one ufunc call beats 1000 lines of Python `for` loops.",
          },
          {
            type: "code",
            lang: "python",
            label: "Ufuncs on sensor readings",
            content: `import numpy as np

readings = np.array([0.25, 1.0, 4.0, 9.0])
print(np.sqrt(readings))
print(np.round(readings * 100))   # percent style`,
          },
          {
            type: "code",
            lang: "python",
            label: "Vectorized vs mental loop",
            content: `import numpy as np

prices = np.array([10, 20, 30])
discounted = prices * 0.9 + 1   # 10% off plus $1 fee, all at once
print(discounted)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Before writing `for x in arr`, check if `+`, `*`, or a ufunc like `np.maximum` can do the job in one line.",
          },
          {
            type: "quiz",
            question: "What is vectorization in NumPy?",
            options: [
              "Drawing arrows on plots",
              "Applying an operation to whole arrays without Python loops",
              "Storing strings only",
              "Using only 1D arrays",
            ],
            answer: 1,
            explanation: "Vectorized code runs bulk math on arrays efficiently.",
          },
        ],
        challenge: {
          title: "Vectorized Square Roots",
          description:
            "Print `np.sqrt` of `np.array([0, 1, 4, 9, 16])`.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.array([0, 1, 4, 9, 16])
print(np.sqrt(a))`,
          tests: [
            {
              id: 1,
              label: "Uses np.sqrt",
              hint: "np.sqrt(a)",
              keywords: [{ pattern: "np\\.sqrt\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-26b",
        title: "Speed & Memory Efficiency",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "NumPy is fast because it stores numbers in a compact block and runs math in C. **Memory** matters when arrays get huge — a million `float64` values use more RAM than a million `float32` values.",
          },
          {
            type: "text",
            content:
              "Avoid extra **copies** when you do not need them. Slicing can be a view (shared memory); `.copy()` is for when you must change data without touching the original.",
          },
          {
            type: "code",
            lang: "python",
            label: "Compare memory: float64 vs float32",
            content: `import numpy as np

big = np.zeros(1_000_000, dtype=np.float64)
small = np.zeros(1_000_000, dtype=np.float32)
print(big.nbytes, small.nbytes)`,
          },
          {
            type: "code",
            lang: "python",
            label: "Vectorized math on a big range",
            content: `import numpy as np

hours = np.arange(24)
bill = hours * 0.15 + 2.0   # energy cost formula, all hours at once
print(bill[0], bill[-1])`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use float32 for very large image or audio buffers when full double precision is not needed — you save RAM and often gain speed.",
          },
          {
            type: "quiz",
            question: "Why is `arr * 2` usually faster than a Python for-loop?",
            options: [
              "Python forbids loops on lists",
              "NumPy runs the operation in optimized code on the whole array",
              "It always uses less disk space",
              "It converts arrays to strings",
            ],
            answer: 1,
            explanation: "Bulk array ops avoid slow per-element Python overhead.",
          },
        ],
        challenge: {
          title: "Which Uses Less RAM?",
          description:
            "Create `a = np.zeros(100, dtype=np.float64)` and `b = np.zeros(100, dtype=np.float32)`. Print `a.nbytes` and `b.nbytes`.",
          starterCode: `import numpy as np

`,
          solutionCode: `import numpy as np

a = np.zeros(100, dtype=np.float64)
b = np.zeros(100, dtype=np.float32)
print(a.nbytes, b.nbytes)`,
          tests: [
            {
              id: 1,
              label: "float64 array",
              hint: "dtype=np.float64",
              keywords: [{ pattern: "float64" }],
            },
            {
              id: 2,
              label: "float32 array",
              hint: "dtype=np.float32",
              keywords: [{ pattern: "float32" }],
            },
            {
              id: 3,
              label: "Prints nbytes",
              hint: "a.nbytes, b.nbytes",
              keywords: [{ pattern: "\\.nbytes" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: "Capstone Lab",
    icon: "🏁",
    color: "#10b981",
    lessons: [
      {
        id: "numpy-15",
        title: "Normalize a Vector (Z-Score)",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **z-score** answers one simple question: *how far is this number from the average, in steps of “spread”?*  \n\n**Definition:** for each value `x`,  \n`z = (x − mean) ÷ std`  \n- **mean** = the typical middle value  \n- **std** (standard deviation) = how spread out the numbers are  \n\nAfter this, the new list usually has **mean ≈ 0** and **std ≈ 1**. People also call this **standardizing** or **normalizing** (z-score style).",
          },
          {
            type: "scenario",
            title: "Real world: two quiz classes",
            content:
              "Class A quizzes are hard (average 60). Class B quizzes are easy (average 90).  \nAli scored **70** in Class A. Sara scored **85** in Class B.  \n\nRaw scores make Sara look better — but 70 might be *above average* in the hard class, while 85 might be *below average* in the easy class.  \n\n**Z-scores fix that.** They put both students on the same “how unusual?” scale so you can compare fairly.",
          },
          {
            type: "diagram",
            title: "What a z-score is doing",
            nodes: [
              {
                id: "raw",
                label: "1. Raw scores",
                color: "#6366f1",
                items: ["70, 80, 90", "Different units / levels", "Hard to compare"],
              },
              {
                id: "center",
                label: "2. Subtract mean",
                color: "#0ea5e9",
                items: ["x − mean", "Centers around 0", "Above avg → positive"],
              },
              {
                id: "scale",
                label: "3. Divide by std",
                color: "#10b981",
                items: ["÷ std", "Measures in “spreads”", "Fair comparison"],
              },
            ],
          },
          {
            type: "table",
            title: "Related ideas you need first",
            columns: ["Idea", "Plain English", "NumPy"],
            rows: [
              {
                label: "Mean",
                values: [
                  "Mean",
                  "The average — the balance point of the list",
                  "`x.mean()`",
                ],
              },
              {
                label: "Std",
                values: [
                  "Std (std)",
                  "How spread out numbers are from the mean",
                  "`x.std()`",
                ],
              },
              {
                label: "Z-score",
                values: [
                  "Z-score",
                  "How many spreads above/below the mean",
                  "`(x - x.mean()) / x.std()`",
                ],
              },
              {
                label: "Outlier",
                values: [
                  "Outlier tip",
                  "Often |z| > 2 feels unusual on a bell curve",
                  "Check `np.abs(z) > 2`",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Tiny number line:** mean sits at **0**. A z-score of **+1** means “one std above average.” **−1** means “one std below.” **0** means “exactly average.”",
          },
          {
            type: "diagram",
            title: "Number line of z-scores",
            nodes: [
              {
                id: "low",
                label: "z = −2",
                color: "#f97316",
                items: ["Quite low", "Often unusual", "Far left"],
              },
              {
                id: "neg",
                label: "z = −1",
                color: "#fb923c",
                items: ["Below average", "Still common", "Left of 0"],
              },
              {
                id: "zero",
                label: "z = 0",
                color: "#10b981",
                items: ["At the mean", "Typical score", "Center"],
              },
              {
                id: "pos",
                label: "z = +1",
                color: "#38bdf8",
                items: ["Above average", "Still common", "Right of 0"],
              },
              {
                id: "high",
                label: "z = +2",
                color: "#6366f1",
                items: ["Quite high", "Often unusual", "Far right"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Step by step — class marks",
            content: `import numpy as np

# Three quiz scores (easy numbers)
marks = np.array([10.0, 20.0, 30.0])

avg = marks.mean()      # 20.0  ← middle value
spread = marks.std()    # how far they usually sit from 20

print("mean:", avg)
print("std:", spread)

# Z-score: how many "spreads" from the mean?
z = (marks - avg) / spread
print("z-scores:", z)   # [-1.  0.  1.]`,
          },
          {
            type: "text",
            content:
              "Read that printout like a story:  \n- **10** → z = **−1** (one step below average)  \n- **20** → z = **0** (exactly average)  \n- **30** → z = **+1** (one step above average)",
          },
          {
            type: "code",
            lang: "python",
            label: "Same idea in one short line",
            content: `import numpy as np

scores = np.array([70.0, 80.0, 90.0])
z = (scores - scores.mean()) / scores.std()
print(z)`,
          },
          {
            type: "scenario",
            title: "Why people use this",
            content:
              "**Games:** compare points from easy vs hard levels.  \n**Fitness:** compare step counts for a quiet week vs a busy week.  \n**Machine learning:** many models learn better when features are on a similar scale.  \n\nIn all cases: *don’t only look at the raw number — look at how it sits in its own group.*",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Watch out:** if every value is the same, `std` is **0** and you cannot divide. Real data almost always has some spread — if not, there is nothing to normalize.",
          },
          {
            type: "callout",
            variant: "success",
            content:
              "You now know: mean + std → z-score → fair comparison. Next topics build on this (weights, filters, full projects).",
          },
          {
            type: "quiz",
            question: "What does a z-score of 0 mean?",
            options: [
              "The value is missing",
              "The value equals the mean (average)",
              "The value is the biggest in the list",
              "The value is always an outlier",
            ],
            answer: 1,
            explanation:
              "z = 0 means x is exactly at the mean — a typical / average value.",
          },
          {
            type: "quiz",
            question: "The z-score formula is?",
            options: [
              "x / sum",
              "(x - mean) / std",
              "x - min",
              "x * weights",
            ],
            answer: 1,
            explanation:
              "Subtract the mean (center), then divide by std (scale into “spreads”).",
          },
        ],
        challenge: {
          title: "Z-Score Your Scores",
          description:
            "You have quiz scores `x = np.array([2.0, 4.0, 6.0, 8.0])`. Print the z-scores using `(x - x.mean()) / x.std()`.",
          starterCode: `import numpy as np

x = np.array([2.0, 4.0, 6.0, 8.0])
# Print z-scores: (x - mean) / std
`,
          solutionCode: `import numpy as np

x = np.array([2.0, 4.0, 6.0, 8.0])
print((x - x.mean()) / x.std())`,
          tests: [
            {
              id: 1,
              label: "Uses mean",
              hint: "x.mean()",
              keywords: [{ pattern: "\\.mean\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses std",
              hint: "x.std()",
              keywords: [{ pattern: "\\.std\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints z-scores",
              hint: "print((x - x.mean()) / x.std())",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-16",
        title: "Weighted Average",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Weighted Average**\n\nIn real life, not every value has the same importance.\n\nFor example, imagine a student's final grade is calculated like this:\n\n• **Assignments** = 50%\n• **Quizzes** = 30%\n• **Final Exam** = 20%\n\nAlthough there are three scores, they should **not** contribute equally — some assessments matter more than others.\n\nA **weighted average** gives different importance (**weights**) to different values before calculating the final result.",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "Suppose a student has these marks:\n\n• **Assignment:** 90 (weight 50%)\n• **Quiz:** 80 (weight 30%)\n• **Final Exam:** 70 (weight 20%)\n\nA **normal average** would be:\n\n(90 + 80 + 70) ÷ 3 = **80**\n\nThat looks fine — but it is **wrong** here, because each assessment has a different contribution.\n\nInstead, **multiply each mark by its weight**, then add the pieces together:\n\n• 90 × 0.5 = **45**\n• 80 × 0.3 = **24**\n• 70 × 0.2 = **14**\n\n45 + 24 + 14 = **83**\n\nThe **weighted average is 83** — not 80.",
          },
          {
            type: "table",
            title: "Marks, weights, and contributions",
            columns: ["Assessment", "Marks", "Weight", "Contribution"],
            rows: [
              {
                label: "Assignment",
                values: ["Assignment", "90", "0.5 (50%)", "45"],
              },
              {
                label: "Quiz",
                values: ["Quiz", "80", "0.3 (30%)", "24"],
              },
              {
                label: "Final Exam",
                values: ["Final Exam", "70", "0.2 (20%)", "14"],
              },
              {
                label: "Total",
                values: ["Total", "—", "1.0 (100%)", "83"],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Formula:** Weighted Average = Sum(Value × Weight) ÷ Sum(Weights)\n\nIn words: multiply each value by how important it is, add those products, then divide by the total weight.",
          },
          {
            type: "code",
            lang: "python",
            label: "Weighted average in NumPy",
            content: `import numpy as np

values = np.array([90, 80, 70])
weights = np.array([0.5, 0.3, 0.2])
avg = np.dot(values, weights) / weights.sum()
print(avg)  # 83.0`,
          },
          {
            type: "table",
            title: "Understanding the code — line by line",
            columns: ["Line", "Plain English"],
            rows: [
              {
                label: "values",
                values: [
                  "`values = np.array([90, 80, 70])`",
                  "Stores the marks (the numbers you care about).",
                ],
              },
              {
                label: "weights",
                values: [
                  "`weights = np.array([0.5, 0.3, 0.2])`",
                  "Stores how important each mark is.",
                ],
              },
              {
                label: "dot",
                values: [
                  "`np.dot(values, weights)`",
                  "Multiplies each value by its matching weight and adds the results (45 + 24 + 14).",
                ],
              },
              {
                label: "sum",
                values: [
                  "`weights.sum()`",
                  "Adds all weights together (here: 0.5 + 0.3 + 0.2 = 1.0).",
                ],
              },
              {
                label: "avg",
                values: [
                  "Divide by `weights.sum()`",
                  "Gives the correct weighted average — even when weights do not add up to 1.",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Why divide by `weights.sum()`?**\n\nWeights do **not** have to add up to 1.\n\n`weights = [50, 30, 20]` works the same as `weights = [0.5, 0.3, 0.2]` — dividing by `weights.sum()` automatically **normalizes** the result.",
          },
          {
            type: "diagram",
            title: "Real-world uses",
            nodes: [
              {
                id: "grades",
                label: "Student grading",
                color: "#10b981",
                items: ["Assignments vs exams", "Different % weights", "Final course mark"],
              },
              {
                id: "ratings",
                label: "Product ratings",
                color: "#6366f1",
                items: ["Verified buyers count more", "Recent reviews weighted", "Fair star average"],
              },
              {
                id: "finance",
                label: "Investments",
                color: "#0ea5e9",
                items: ["Portfolio mix", "Bigger holdings matter more", "Weighted return"],
              },
              {
                id: "ml",
                label: "Machine learning",
                color: "#4f46e5",
                items: ["Survey analysis", "Sample weights", "Model training scores"],
              },
            ],
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**Key takeaways:**\n\n• A **normal average** treats every value equally.\n• A **weighted average** gives different importance to different values.\n• **`np.dot()`** multiplies values by weights and adds the results.\n• **`weights.sum()`** normalizes automatically.\n• Weighted averages are common in real-world data analysis.",
          },
          {
            type: "quiz",
            question: "Which formula computes a weighted average in NumPy?",
            options: [
              "values.mean()",
              "np.dot(values, weights) / weights.sum()",
              "values.max()",
              "np.sort(values)",
            ],
            answer: 1,
            explanation:
              "np.dot multiplies each value by its weight and adds them; dividing by weights.sum() normalizes the result.",
          },
          {
            type: "quiz",
            question: "A student has Assignment 90 (50%), Quiz 80 (30%), Exam 70 (20%). What is the weighted average?",
            options: ["80", "83", "90", "70"],
            answer: 1,
            explanation:
              "90×0.5 + 80×0.3 + 70×0.2 = 45 + 24 + 14 = 83.",
          },
        ],
        challenge: {
          title: "Grade Weighting",
          description:
            "Given `scores = np.array([100, 80])` and `weights = np.array([0.7, 0.3])`, print the weighted average using `np.dot` and `.sum()`.",
          starterCode: `import numpy as np

scores = np.array([100, 80])
weights = np.array([0.7, 0.3])
`,
          solutionCode: `import numpy as np

scores = np.array([100, 80])
weights = np.array([0.7, 0.3])
print(np.dot(scores, weights) / weights.sum())`,
          tests: [
            {
              id: 1,
              label: "Uses np.dot",
              hint: "np.dot(scores, weights)",
              keywords: [{ pattern: "np\\.dot\\s*\\(" }],
            },
            {
              id: 2,
              label: "Divides by weights.sum",
              hint: "weights.sum()",
              keywords: [{ pattern: "weights\\.sum\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-27",
        title: "Mini Project: Grade Report",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Time for a **grade report**! Three students took three quizzes — a 2D score grid. You'll sum each student's total with `axis=1`, find the class average, and spot the top scorer. Spreadsheet skills, NumPy speed.",
          },
          {
            type: "code",
            lang: "python",
            label: "Student score grid",
            content: `import numpy as np

grades = np.array([
    [88, 92, 85],   # Alice
    [76, 80, 78],   # Bob
    [95, 98, 100],  # Carol
])
totals = grades.sum(axis=1)
print(totals)           # [265 234 293]
print(grades.mean())    # class average
print(np.argmax(totals))  # index of top student`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`np.argmax` returns the index of the maximum value — perfect for 'who won?' questions.",
          },
          {
            type: "quiz",
            question: "To sum each student's quizzes across columns, use axis=?",
            options: ["0", "1", "None", "-1 only"],
            answer: 1,
            explanation: "axis=1 sums across columns within each row (each student).",
          },
        ],
        challenge: {
          title: "Class Grade Sheet",
          description:
            "Given `grades = np.array([[90, 80], [70, 100], [85, 95]])`, print row sums with `.sum(axis=1)`, then print the index of the highest row sum using `np.argmax`.",
          starterCode: `import numpy as np

grades = np.array([[90, 80], [70, 100], [85, 95]])
`,
          solutionCode: `import numpy as np

grades = np.array([[90, 80], [70, 100], [85, 95]])
totals = grades.sum(axis=1)
print(totals)
print(np.argmax(totals))`,
          tests: [
            {
              id: 1,
              label: "Uses sum axis=1",
              hint: "grades.sum(axis=1)",
              keywords: [{ pattern: "\\.sum\\s*\\(\\s*axis\\s*=\\s*1\\s*\\)" }],
            },
            {
              id: 2,
              label: "Uses np.argmax",
              hint: "np.argmax(totals)",
              keywords: [{ pattern: "np\\.argmax\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints results",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-28",
        title: "Mini Project: Score Pipeline",
        xp: 20,
        theory: [
          {
            type: "scenario",
            title: "Real life: a school game tournament",
            content:
              "Your school runs a game tournament. Seven players finish with these scores:\n\n**45, 88, 52, 95, 70, 38, 91**\n\nThe coach says:\n\n1. Only players who scored **60 or more** move to the next round.\n2. Compare the remaining players **fairly** (not just by raw points).\n3. Rank them from low to high.\n\nDoing this by hand is slow. In NumPy, we build a **score pipeline** — a short chain of steps that cleans, compares, and ranks the numbers automatically.",
          },
          {
            type: "text",
            content:
              "**What is a score pipeline?**\n\nA **pipeline** is a clear sequence of data steps. Each step takes the result of the previous step and improves it.\n\nIn this lesson, the pipeline has three main moves:\n\n1. **Filter** — keep only useful scores (pass mark ≥ 60)\n2. **Normalize (z-score)** — put survivors on a fair comparison scale\n3. **Sort** — rank the fair scores from smallest to largest\n\nYou already learned each tool alone. Now we connect them into one useful workflow.",
          },
          {
            type: "diagram",
            title: "The score pipeline at a glance",
            nodes: [
              {
                id: "raw",
                label: "1. Raw scores",
                color: "#6366f1",
                items: ["All player scores", "Mixed high & low", "Some below 60"],
              },
              {
                id: "filter",
                label: "2. Filter",
                color: "#10b981",
                items: ["Keep score ≥ 60", "Boolean mask", "Drop failed players"],
              },
              {
                id: "norm",
                label: "3. Z-score",
                color: "#0ea5e9",
                items: ["(x − mean) / std", "Fair scale", "Mean ≈ 0"],
              },
              {
                id: "sort",
                label: "4. Sort",
                color: "#4f46e5",
                items: ["np.sort(...)", "Low → high", "Ready to rank"],
              },
            ],
          },
          {
            type: "table",
            title: "Step-by-step with tournament scores",
            columns: ["Step", "What happens", "Result idea"],
            rows: [
              {
                label: "Start",
                values: [
                  "Start",
                  "Raw scores: 45, 88, 52, 95, 70, 38, 91",
                  "Everyone included",
                ],
              },
              {
                label: "Filter",
                values: [
                  "Filter",
                  "Keep only scores ≥ 60",
                  "88, 95, 70, 91 (passers)",
                ],
              },
              {
                label: "Z-score",
                values: [
                  "Z-score",
                  "Ask: how far is each passer from the average?",
                  "Some below 0, some above 0",
                ],
              },
              {
                label: "Sort",
                values: [
                  "Sort",
                  "Arrange z-scores from small to large",
                  "A clean ranking list",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Quick reminder — z-score:**  \n`z = (x − mean) ÷ std`  \n\n• **z = 0** → exactly average among the passers  \n• **z > 0** → above average  \n• **z < 0** → below average  \n\nWe apply z-scores **after filtering**, so we only compare players who actually passed.",
          },
          {
            type: "code",
            lang: "python",
            label: "Full pipeline: filter → z-score → sort",
            content: `import numpy as np

# Raw tournament scores
scores = np.array([45, 88, 52, 95, 70, 38, 91])

# Step 1: keep only players who passed (score >= 60)
passed = scores[scores >= 60]
print("Passed:", passed)

# Step 2: fair comparison with z-scores
z = (passed - passed.mean()) / passed.std()
print("Z-scores:", z)

# Step 3: rank from low to high
ranked = np.sort(z)
print("Ranked:", ranked)`,
          },
          {
            type: "table",
            title: "What each line does",
            columns: ["Code", "Plain English"],
            rows: [
              {
                label: "scores",
                values: [
                  "`scores = np.array([...])`",
                  "Stores all player scores in one array.",
                ],
              },
              {
                label: "filter",
                values: [
                  "`scores[scores >= 60]`",
                  "Boolean mask: keep True values only (passers).",
                ],
              },
              {
                label: "z",
                values: [
                  "`(passed - mean) / std`",
                  "Turns each passer score into a fair z-score.",
                ],
              },
              {
                label: "sort",
                values: [
                  "`np.sort(z)`",
                  "Orders z-scores from smallest to largest.",
                ],
              },
            ],
          },
          {
            type: "scenario",
            title: "Where else this pipeline helps",
            content:
              "**Exam results:** drop failing marks, then compare remaining students fairly.\n\n**Fitness app:** keep only workouts above a goal, then rank relative effort.\n\n**Sales data:** remove tiny orders, normalize store sales, then sort best to worst.\n\nSame idea every time: **clean → compare fairly → rank.**",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Order matters.** Filter first, then normalize. If you z-score *before* filtering, failed scores can pull the mean down and make the ranking unfair.",
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**Key takeaways:**\n\n• A **pipeline** chains NumPy steps for a real task.\n• **Filter** with a boolean mask (`scores >= 60`).\n• **Z-score** makes remaining values comparable.\n• **`np.sort`** ranks the fair scores.\n• Always **filter before** you normalize when pass/fail rules exist.",
          },
          {
            type: "quiz",
            question: "In this score pipeline, what is the first useful step?",
            options: [
              "Sort all raw scores",
              "Filter scores that meet the pass rule",
              "Save the array to a file",
              "Reshape into 2D",
            ],
            answer: 1,
            explanation:
              "First keep only the scores that matter (for example, ≥ 60). Then normalize and sort those survivors.",
          },
          {
            type: "quiz",
            question: "After filtering with scores >= 60, what comes next in this pipeline?",
            options: [
              "np.save",
              "Z-score normalize",
              "np.random.seed",
              "reshape",
            ],
            answer: 1,
            explanation:
              "Normalize the filtered scores so they share a common scale before sorting.",
          },
          {
            type: "quiz",
            question: "Why filter before computing z-scores?",
            options: [
              "Because sorting only works on filtered arrays",
              "So failed scores do not distort the mean and std of the group you care about",
              "Because NumPy cannot z-score raw arrays",
              "Because print() needs a filtered list",
            ],
            answer: 1,
            explanation:
              "Low/failed scores change the average and spread. Filtering first keeps the comparison fair among passers only.",
          },
        ],
        challenge: {
          title: "Run the Pipeline",
          description:
            "From `scores = np.array([55, 80, 45, 90, 72])`, keep only values >= 60, then print the z-scores `(x - x.mean()) / x.std()` of the filtered array.",
          starterCode: `import numpy as np

scores = np.array([55, 80, 45, 90, 72])
# 1) Keep scores >= 60
# 2) Print their z-scores
`,
          solutionCode: `import numpy as np

scores = np.array([55, 80, 45, 90, 72])
passed = scores[scores >= 60]
print((passed - passed.mean()) / passed.std())`,
          tests: [
            {
              id: 1,
              label: "Uses boolean filter",
              hint: "scores[scores >= 60]",
              keywords: [{ pattern: ">=\\s*60" }],
            },
            {
              id: 2,
              label: "Uses mean and std",
              hint: "passed.mean() and passed.std()",
              keywords: [
                { pattern: "\\.mean\\s*\\(" },
                { pattern: "\\.std\\s*\\(" },
              ],
            },
            {
              id: 3,
              label: "Prints z-scores",
              hint: "print(...)",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-29",
        title: "Mini Project: Temperature Stats",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Introduction**\n\nIn this mini project, you are a **weather analyst**. Your job is to study one week of real-world temperature data and prepare a simple weather report.\n\nThere is one problem: the thermometer failed on Tuesday, so that day has no reading. Before analyzing the week, you must first **clean the missing value**.\n\nBy the end of this lesson, you will know how to:\n\n• Remove a missing value\n• Calculate the average temperature\n• Find the highest temperature\n• Count how many days were hotter than 75°F",
          },
          {
            type: "scenario",
            title: "Think of it Like This",
            content:
              "Imagine that you write the temperature down every afternoon. The thermometer works on six days, but it gives no reading on Tuesday.\n\nYou should not guess Tuesday’s temperature. Instead, store it as **missing**, remove it from the calculations, and analyze only the temperatures that were actually measured.",
          },
          {
            type: "table",
            title: "Weekly temperature readings",
            columns: ["Day", "Temperature", "Meaning"],
            rows: [
              {
                label: "Monday",
                values: ["Monday", "72°F", "Valid reading"],
              },
              {
                label: "Tuesday",
                values: ["Tuesday", "Missing", "Stored as `np.nan`"],
              },
              {
                label: "Wednesday",
                values: ["Wednesday", "78°F", "Valid reading"],
              },
              {
                label: "Thursday",
                values: ["Thursday", "80°F", "Valid reading"],
              },
              {
                label: "Friday",
                values: ["Friday", "68°F", "Valid reading"],
              },
              {
                label: "Saturday",
                values: ["Saturday", "76°F", "Valid reading"],
              },
              {
                label: "Sunday",
                values: ["Sunday", "74°F", "Valid reading"],
              },
            ],
          },
          {
            type: "text",
            content:
              "**What is `np.nan`?**\n\n`np.nan` stands for **Not a Number**. NumPy uses it to represent data that is missing or unavailable.\n\nFor example, a teacher may record marks for a class. If one student was absent, there is no mark to enter. The teacher can store that missing mark as `np.nan` instead of pretending it is 0.\n\nIn this weather project, `np.nan` means the thermometer did not provide a temperature for Tuesday.",
          },
          {
            type: "table",
            title: "How NumPy finds the missing reading",
            columns: ["Expression", "Result", "What it means"],
            rows: [
              {
                label: "Raw",
                values: [
                  "`temps`",
                  "[72, NaN, 78, 80, 68, 76, 74]",
                  "The original week",
                ],
              },
              {
                label: "isnan",
                values: [
                  "`np.isnan(temps)`",
                  "[False, True, False, False, False, False, False]",
                  "True marks the missing value",
                ],
              },
              {
                label: "NOT",
                values: [
                  "`~np.isnan(temps)`",
                  "[True, False, True, True, True, True, True]",
                  "`~` means NOT and flips every Boolean",
                ],
              },
              {
                label: "Clean",
                values: [
                  "`temps[~np.isnan(temps)]`",
                  "[72, 78, 80, 68, 76, 74]",
                  "Boolean masking keeps valid readings",
                ],
              },
            ],
          },
          {
            type: "diagram",
            title: "The complete weather-analysis pipeline",
            nodes: [
              {
                id: "raw",
                label: "Raw Temperature Data",
                color: "#6366f1",
                items: ["Seven days", "One `np.nan`", "Not ready yet"],
              },
              {
                id: "clean",
                label: "Remove Missing Values",
                color: "#10b981",
                items: ["Use `np.isnan()`", "Apply `~`", "Keep valid data"],
              },
              {
                id: "mean",
                label: "Calculate Average",
                color: "#0ea5e9",
                items: ["Use `np.mean()`", "Typical temperature", "Valid days only"],
              },
              {
                id: "max",
                label: "Find Maximum",
                color: "#f97316",
                items: ["Use `.max()`", "Highest reading", "Hottest day"],
              },
              {
                id: "count",
                label: "Count Hot Days",
                color: "#4f46e5",
                items: ["Use `clean > 75`", "Sum True values", "Days above 75°F"],
              },
              {
                id: "report",
                label: "Final Weather Report",
                color: "#14b8a6",
                items: ["Average", "Maximum", "Hot-day count"],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Why clean first?** A normal average cannot give a useful result while `np.nan` is still present. Remove the missing value first so every later step uses only real measurements.",
          },
          {
            type: "code",
            lang: "python",
            label: "Full weather report in NumPy",
            content: `import numpy as np

# One week of highs — Tuesday is missing
temps = np.array([72, np.nan, 78, 80, 68, 76, 74])

# Step 1: keep only real numbers (drop NaN)
clean = temps[~np.isnan(temps)]
print("Clean temps:", clean)

# Step 2: summarize
print("Mean:", np.mean(clean))
print("Max:", clean.max())

# Step 3: count hot days (above 75°F)
print("Hot days:", np.sum(clean > 75))`,
          },
          {
            type: "table",
            title: "Every line explained",
            columns: ["Line", "Code", "Simple explanation"],
            rows: [
              {
                label: "1",
                values: [
                  "1",
                  "`import numpy as np`",
                  "Imports the NumPy library and gives it the short name `np`.",
                ],
              },
              {
                label: "2",
                values: [
                  "2",
                  "`temps = np.array([...])`",
                  "Creates a NumPy array containing one week of temperatures. Tuesday is stored as `np.nan` because its reading is missing.",
                ],
              },
              {
                label: "3a",
                values: [
                  "3a",
                  "`np.isnan(temps)`",
                  "Checks every item. It returns True for `np.nan` and False for a normal temperature.",
                ],
              },
              {
                label: "3b",
                values: [
                  "3b",
                  "`~`",
                  "Means NOT. It changes True to False and False to True, selecting values that are not missing.",
                ],
              },
              {
                label: "3c",
                values: [
                  "3c",
                  "`temps[~np.isnan(temps)]`",
                  "Uses Boolean masking to keep valid temperatures. The result is `[72, 78, 80, 68, 76, 74]`.",
                ],
              },
              {
                label: "4",
                values: [
                  "4",
                  "`np.mean(clean)`",
                  "Adds the valid temperatures and divides by their count to find the average.",
                ],
              },
              {
                label: "5",
                values: [
                  "5",
                  "`clean.max()`",
                  "Returns the highest temperature: the hottest measured day.",
                ],
              },
              {
                label: "6a",
                values: [
                  "6a",
                  "`clean > 75`",
                  "Creates a Boolean array. True means hotter than 75°F; False means not hotter.",
                ],
              },
              {
                label: "6b",
                values: [
                  "6b",
                  "`np.sum(clean > 75)`",
                  "Counts True values. NumPy treats True as 1 and False as 0, so their sum is the number of hot days.",
                ],
              },
            ],
          },
          {
            type: "diagram",
            title: "Real-world applications",
            nodes: [
              {
                id: "forecast",
                label: "Weather Forecasting",
                color: "#0ea5e9",
                items: ["Clean station readings", "Compare daily highs", "Prepare forecasts"],
              },
              {
                id: "climate",
                label: "Climate Research",
                color: "#6366f1",
                items: ["Study long-term records", "Handle missing years", "Find trends"],
              },
              {
                id: "sensors",
                label: "Sensor Analysis",
                color: "#10b981",
                items: ["Detect missing readings", "Monitor machines", "Count unsafe values"],
              },
              {
                id: "agriculture",
                label: "Agriculture",
                color: "#84cc16",
                items: ["Track soil temperature", "Protect crops", "Plan watering"],
              },
              {
                id: "environment",
                label: "Environmental Monitoring",
                color: "#14b8a6",
                items: ["Air and water sensors", "Remove bad readings", "Measure conditions"],
              },
              {
                id: "data",
                label: "Data Science & ML",
                color: "#4f46e5",
                items: ["Clean training data", "Calculate features", "Build reliable models"],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Helpful tip:** Break every data-analysis problem into small steps:  \n**Clean Data → Calculate Statistics → Filter Data → Count Results**  \n\nNumPy provides simple functions for each step, making data analysis easy and efficient.",
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**Key Takeaways**\n\n• `np.nan` represents missing or unavailable data.\n• `np.isnan()` finds missing values.\n• `~` means NOT and helps select values that are not missing.\n• Boolean masking creates a clean array of valid temperatures.\n• `np.mean()` calculates the average.\n• `.max()` finds the highest value.\n• `clean > 75` marks hot days with True or False.\n• `np.sum()` counts the True values.\n• Each pipeline step uses the cleaned result from the step before it.",
          },
          {
            type: "quiz",
            question: "Why clean NaN values before calling a normal mean?",
            options: [
              "Because NumPy cannot store temperatures",
              "One missing value can make the whole average become NaN",
              "Because max() only works on strings",
              "Because print() rejects NaN",
            ],
            answer: 1,
            explanation:
              "A single NaN can poison a normal mean. Remove missing days first, then average the real readings.",
          },
          {
            type: "quiz",
            question: "After removing NaN, which expression counts days above 75?",
            options: [
              "clean.count()",
              "np.sum(clean > 75)",
              "len(clean)",
              "clean.max()",
            ],
            answer: 1,
            explanation:
              "A boolean mask (`clean > 75`) plus `np.sum` counts how many True values there are.",
          },
          {
            type: "quiz",
            question: "What does `temps[~np.isnan(temps)]` keep?",
            options: [
              "Only the missing days",
              "Only the real (non-missing) temperatures",
              "Only values greater than 75",
              "The hottest day only",
            ],
            answer: 1,
            explanation:
              "`np.isnan` finds missing values; the `~` flips the mask so you keep present days.",
          },
        ],
        challenge: {
          title: "Weekly Weather Report",
          description:
            "Given `temps = np.array([70, np.nan, 82, 76, 68, 79, 74])`, print the mean of non-NaN values (use a `~np.isnan` mask and `.mean()`), then print how many values are > 75.",
          starterCode: `import numpy as np

temps = np.array([70, np.nan, 82, 76, 68, 79, 74])
# 1) Clean NaN days
# 2) Print mean
# 3) Print count of days > 75
`,
          solutionCode: `import numpy as np

temps = np.array([70, np.nan, 82, 76, 68, 79, 74])
clean = temps[~np.isnan(temps)]
print(clean.mean())
print(np.sum(clean > 75))`,
          tests: [
            {
              id: 1,
              label: "Filters with isnan",
              hint: "temps[~np.isnan(temps)]",
              keywords: [{ pattern: "np\\.isnan\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses mean",
              hint: "clean.mean()",
              keywords: [{ pattern: "\\.mean\\s*\\(" }],
            },
            {
              id: 3,
              label: "Counts hot days",
              hint: "np.sum(clean > 75)",
              keywords: [{ pattern: "np\\.sum\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "numpy-30",
        title: "Final Boss: Combine All Skills",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Introduction**\n\nCongratulations — you made it to the **final lesson** of NumPy Mastery!\n\nThis is your final project. You will combine skills from the whole course into one complete analysis: **normalize** student scores with a Z-score, calculate a **weighted average**, and **rank** the students.\n\nThink of it as writing a class report card with NumPy. Each step uses an idea you have already practiced, and now they work together as one pipeline.",
          },
          {
            type: "text",
            content:
              "**Learning Objectives**\n\nAfter this lesson, you will be able to:\n\n• Normalize data with a **Z-score**\n• Calculate a **weighted average**\n• Rank data using **`np.argsort()`**\n• Build a complete **NumPy data-analysis pipeline**",
          },
          {
            type: "scenario",
            title: "Think of it Like This",
            content:
              "Four students finished a game challenge. Their scores are 85, 92, 78, and 95. You want three answers:\n\n1. How does each score compare to the group average?\n2. What is the class average when every score has equal weight?\n3. Who ranks from lowest to highest?\n\nNumPy can answer all three without writing long loops.",
          },
          {
            type: "table",
            title: "Student scores for the final project",
            columns: ["Student index", "Score", "Equal weight"],
            rows: [
              {
                label: "0",
                values: ["0", "85.0", "0.25"],
              },
              {
                label: "1",
                values: ["1", "92.0", "0.25"],
              },
              {
                label: "2",
                values: ["2", "78.0", "0.25"],
              },
              {
                label: "3",
                values: ["3", "95.0", "0.25"],
              },
            ],
          },
          {
            type: "text",
            content:
              "**Quick reminders before the code**\n\n• **Z-score** = `(value − mean) / standard deviation`. It shows how far a score sits from the average.\n• **Weighted average** = multiply each value by its weight, add the products, then divide by the total of the weights.\n• **`np.argsort()`** does not return the sorted values. It returns the **indexes** that would put the array in order.",
          },
          {
            type: "code",
            lang: "python",
            label: "Boss pattern",
            content: `import numpy as np

scores = np.array([85.0, 92.0, 78.0, 95.0])
weights = np.array([0.25, 0.25, 0.25, 0.25])
z = (scores - scores.mean()) / scores.std()
avg = np.dot(scores, weights) / weights.sum()
rank = np.argsort(scores)
print(z, avg, rank)`,
          },
          {
            type: "table",
            title: "Every line explained",
            columns: ["Line", "Code", "Simple explanation"],
            rows: [
              {
                label: "1",
                values: [
                  "1",
                  "`import numpy as np`",
                  "Imports the NumPy library and gives it the short name `np`.",
                ],
              },
              {
                label: "2",
                values: [
                  "2",
                  "`scores = np.array([...])`",
                  "Creates an array of four student scores. Index 0 is the first student, index 1 is the second, and so on.",
                ],
              },
              {
                label: "3",
                values: [
                  "3",
                  "`weights = np.array([...])`",
                  "Creates equal weights of 0.25 for each student. Equal weights mean every score matters the same amount.",
                ],
              },
              {
                label: "4",
                values: [
                  "4",
                  "`z = (scores - scores.mean()) / scores.std()`",
                  "`mean()` finds the average. `std()` finds the standard deviation. Subtracting and dividing turns every score into a Z-score.",
                ],
              },
              {
                label: "5",
                values: [
                  "5",
                  "`avg = np.dot(scores, weights) / weights.sum()`",
                  "`np.dot()` multiplies each score by its weight and adds the results. Dividing by `weights.sum()` finishes the weighted average.",
                ],
              },
              {
                label: "6",
                values: [
                  "6",
                  "`rank = np.argsort(scores)`",
                  "Returns the indexes that would sort the scores from low to high. That is how you rank the students.",
                ],
              },
              {
                label: "7",
                values: [
                  "7",
                  "`print(z, avg, rank)`",
                  "Shows the Z-scores, the weighted average, and the ranking indexes together.",
                ],
              },
            ],
          },
          {
            type: "text",
            content:
              "**What is `np.argsort()`?**\n\n`argsort` means **Argument Sort**. The “argument” is the **index** of each value.\n\nSo `np.argsort(scores)` answers this question: *“In what order should I visit the indexes to read the scores from smallest to largest?”*\n\nIt does **not** rearrange the scores themselves. It only returns the indexes.",
          },
          {
            type: "table",
            title: "`np.sort()` vs `np.argsort()`",
            columns: ["Function", "What it returns", "Example with [85, 92, 78, 95]"],
            rows: [
              {
                label: "sort",
                values: [
                  "`np.sort(scores)`",
                  "The sorted values",
                  "[78, 85, 92, 95]",
                ],
              },
              {
                label: "argsort",
                values: [
                  "`np.argsort(scores)`",
                  "The indexes that create that order",
                  "[2, 0, 1, 3]",
                ],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**How to read `[2, 0, 1, 3]`:** Index **2** has the lowest score (78), then index **0** (85), then index **1** (92), then index **3** (95). The original `scores` array stays unchanged.",
          },
          {
            type: "diagram",
            title: "The complete final-boss pipeline",
            nodes: [
              {
                id: "scores",
                label: "Student Scores",
                color: "#6366f1",
                items: ["Raw score array", "Four students", "Starting point"],
              },
              {
                id: "normalize",
                label: "Normalize Scores",
                color: "#10b981",
                items: ["Use mean()", "Use std()", "Create Z-scores"],
              },
              {
                id: "weighted",
                label: "Calculate Weighted Average",
                color: "#0ea5e9",
                items: ["Use np.dot()", "Divide by weights.sum()", "One class average"],
              },
              {
                id: "rank",
                label: "Rank Students",
                color: "#f97316",
                items: ["Use np.argsort()", "Indexes low → high", "Keep original order"],
              },
              {
                id: "report",
                label: "Final Grade Report",
                color: "#14b8a6",
                items: ["Z-scores", "Weighted average", "Student ranks"],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Why a pipeline?** Each step uses the output of the step before it. First you store the scores. Then you normalize them. Then you compute the weighted average. Then you rank the students. At the end, you print one complete grade report.",
          },
          {
            type: "diagram",
            title: "Real-world applications",
            nodes: [
              {
                id: "students",
                label: "Student Result Analysis",
                color: "#10b981",
                items: ["Normalize quiz scores", "Weight assignments", "Rank the class"],
              },
              {
                id: "datascience",
                label: "Data Science",
                color: "#6366f1",
                items: ["Clean number pipelines", "Compare features fairly", "Sort and report"],
              },
              {
                id: "ml",
                label: "Machine Learning",
                color: "#4f46e5",
                items: ["Feature scaling", "Sample weights", "Model inputs"],
              },
              {
                id: "healthcare",
                label: "Healthcare Analytics",
                color: "#0ea5e9",
                items: ["Compare patient scores", "Weighted risk factors", "Rank priority cases"],
              },
              {
                id: "finance",
                label: "Financial Analytics",
                color: "#f97316",
                items: ["Normalize returns", "Portfolio weights", "Rank investments"],
              },
              {
                id: "sports",
                label: "Sports Analytics",
                color: "#84cc16",
                items: ["Normalize player stats", "Weighted ratings", "League rankings"],
              },
              {
                id: "bi",
                label: "Business Intelligence",
                color: "#14b8a6",
                items: ["Score sales teams", "Weighted KPIs", "Leaderboard reports"],
              },
            ],
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**Key Takeaways**\n\n• A **Z-score** normalizes values with `(x − mean) / std`.\n• A **weighted average** uses `np.dot(values, weights) / weights.sum()`.\n• **`np.sort()`** returns sorted values.\n• **`np.argsort()`** returns the indexes that would sort the array.\n• Ranking with indexes keeps the original data in place.\n• A NumPy pipeline connects small steps into one complete analysis.\n• The same pattern appears in school grades, data science, machine learning, healthcare, finance, sports, and business reports.",
          },
          {
            type: "quiz",
            question: "To rank scores low→high by index, use?",
            options: ["np.sort", "np.argsort", "np.rank", "np.order"],
            answer: 1,
            explanation: "argsort returns indices that would sort the array.",
          },
        ],
        challenge: {
          title: "Class Report Card",
          description:
            "Given `scores = np.array([70.0, 85.0, 90.0, 100.0])` and equal weights `np.array([0.25, 0.25, 0.25, 0.25])`, print the weighted average, then print `np.argsort(scores)` (ascending rank indices).",
          starterCode: `import numpy as np

scores = np.array([70.0, 85.0, 90.0, 100.0])
weights = np.array([0.25, 0.25, 0.25, 0.25])
`,
          solutionCode: `import numpy as np

scores = np.array([70.0, 85.0, 90.0, 100.0])
weights = np.array([0.25, 0.25, 0.25, 0.25])
print(np.dot(scores, weights) / weights.sum())
print(np.argsort(scores))`,
          tests: [
            {
              id: 1,
              label: "Uses np.dot",
              hint: "np.dot(scores, weights)",
              keywords: [{ pattern: "np\\.dot\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses weights.sum",
              hint: "weights.sum()",
              keywords: [{ pattern: "weights\\.sum\\s*\\(" }],
            },
            {
              id: 3,
              label: "Uses np.argsort",
              hint: "np.argsort(scores)",
              keywords: [{ pattern: "np\\.argsort\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
];

export const NUMPY_LESSONS = applySecondQuizzes(
  applyLessonVideoLinks(
    NUMPY_CHAPTERS.flatMap((ch) =>
      ch.lessons.map((l) => ({
        ...l,
        challenge: l.challenge
          ? { ...l.challenge, id: l.challenge.id || l.id }
          : l.challenge,
        outcomes: l.outcomes ?? NUMPY_LESSON_OUTCOMES[l.id] ?? [],
        chapterId: ch.id,
        chapterTitle: ch.title,
        chapterColor: ch.color,
      })),
    ),
    NUMPY_VIDEO_LINKS,
  ),
  NUMPY_SECOND_QUIZZES,
);

export const NUMPY_TOTAL_XP = NUMPY_LESSONS.reduce((s, l) => s + l.xp, 0);
