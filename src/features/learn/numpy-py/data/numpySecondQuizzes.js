/**
 * Second MCQ (Question 2 of 2) for NumPy lessons that only define one quiz.
 * Lessons that already have 2+ quizzes in numpyCurriculum.js are skipped.
 */

function q(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

export const NUMPY_SECOND_QUIZZES = {
  "numpy-0": q(
    "You track daily steps as `[4000, 5200, 6100]`. What does `steps + 500` do in NumPy?",
    [
      "Adds 500 to every day at once — no loop needed",
      "Appends 500 as a fourth item only",
      "Converts the list into a string",
      "Works only if steps is a Python list, not an array",
    ],
    0,
    "Vector math like `steps + 500` updates every element in one line — a core NumPy superpower.",
  ),
  "numpy-1": q(
    "Why is `numbers * 2` on a NumPy array often better than a Python for-loop?",
    [
      "It doubles every number in one step without writing a loop",
      "It merges the array with a dictionary",
      "It only works on text, not numbers",
      "It deletes half the values automatically",
    ],
    0,
    "NumPy applies math to the whole group at once — that is vectorization in action.",
  ),
  "numpy-5": q(
    "For `scores = np.array([90, 85, 78, 92])`, what does `scores[-1]` give you?",
    [
      "The last score (92) — negative index counts from the end",
      "The first score only",
      "The sum of all scores",
      "An error because negative indexes are forbidden",
    ],
    0,
    "Index `-1` means the last item — handy for the most recent reading without counting length.",
  ),
  "numpy-7": q(
    "You have a (3, 1) column of bonuses and a (1, 4) row of base pay. Broadcasting lets you…",
    [
      "Stretch smaller shapes so they combine with bigger tables safely",
      "Delete every other column automatically",
      "Convert the array into a CSV file only",
      "Run only when both arrays are exactly the same shape",
    ],
    0,
    "Broadcasting repeats smaller arrays along missing dimensions so element-wise math can run.",
  ),
  "numpy-7b": q(
    "A grade table has shape (5 students, 4 subjects). What does `grades.sum(axis=0)` answer?",
    [
      "One total per subject column — added down each column",
      "One total per student row only",
      "The file name of the spreadsheet",
      "How many Python files are in your project",
    ],
    0,
    "axis=0 collapses rows — you get one sum per column (subject totals across students).",
  ),
  "numpy-8": q(
    "You multiply two 2D arrays with `*`. How is that different from `@`?",
    [
      "`*` multiplies matching cells; `@` does matrix multiplication",
      "They always do exactly the same thing",
      "`*` only works on strings",
      "`@` only sorts the array",
    ],
    0,
    "Element-wise `*` pairs up each cell; `@` combines rows and columns the linear-algebra way.",
  ),
  "numpy-9": q(
    "A receipt has prices `[10, 20, 5]` and quantities `[2, 1, 4]`. Why use `np.dot(prices, qty)`?",
    [
      "It multiplies each pair and adds them for a weighted total bill",
      "It draws a bar chart of the receipt",
      "It returns only the largest price",
      "It shuffles the items randomly",
    ],
    0,
    "Dot product = multiply matching pairs and sum — perfect for price × quantity totals.",
  ),
  "numpy-10": q(
    "Matrix A is (2×3) and matrix B is (3×2). Why is `@` the right tool for A @ B?",
    [
      "Matrix multiply needs inner dimensions to match — rows meet columns",
      "Because `@` always flattens both arrays first",
      "Because `@` only works on 1D lists",
      "Because `@` converts matrices into HTML",
    ],
    0,
    "For A @ B, A's columns must match B's rows — that is standard matrix multiplication.",
  ),
  "numpy-18": q(
    "After solving `Ax = b`, why might you check `np.linalg.det(A)` first?",
    [
      "A zero determinant hints the system may not have a unique solution",
      "Determinant always prints the answer vector x",
      "Determinant replaces the need for NumPy arrays",
      "Determinant only measures string length",
    ],
    0,
    "Determinant near zero suggests a singular matrix — solve may fail or be unstable.",
  ),
  "numpy-11": q(
    "Quiz scores are `[40, 55, 90, 72]`. What does `np.max(scores)` tell you?",
    [
      "The highest single score in the set",
      "The average of all scores",
      "How many students took the quiz",
      "The alphabetically first student name",
    ],
    0,
    "np.max finds the largest value — quick way to spot the top score.",
  ),
  "numpy-12": q(
    "Same (5, 4) grade table: you want each student's total across subjects. Which axis?",
    [
      "axis=1 — sum across columns inside each row",
      "axis=0 — sum down columns only",
      "axis=-99 — random pick",
      "No axis — NumPy cannot sum 2D tables",
    ],
    0,
    "axis=1 moves left-to-right across each row — one total per student.",
  ),
  "numpy-19": q(
    "What is `NaN` in a sensor log, and why use `np.nanmean` instead of plain `mean`?",
    [
      "NaN marks missing readings; nanmean skips them so the average stays honest",
      "NaN means the sensor is always correct",
      "nanmean deletes every row in the file",
      "NaN only appears in text files, never in arrays",
    ],
    0,
    "NaN = not a number (missing). nanmean ignores those slots instead of breaking the average.",
  ),
  "numpy-13": q(
    "You have 12 values and run `arr.reshape(3, 4)`. What must stay true?",
    [
      "The total count of cells stays 12 — rows × columns must match",
      "Every value becomes a string",
      "The array must already be 2D before reshape",
      "Reshape always adds new random numbers",
    ],
    0,
    "reshape rearranges the same elements — 3×4 = 12, so no values appear or disappear.",
  ),
  "numpy-13b": q(
    "When do you pick `ravel()` instead of `.T` on a 2D grid?",
    [
      "When you want one flat line of all values, not a rotated table",
      "When you want to swap rows and columns only",
      "When you need to save a PNG image",
      "When you want to delete half the data",
    ],
    0,
    "`.T` flips rows/columns; `ravel()` collapses everything into a single 1D sequence.",
  ),
  "numpy-14": q(
    "Morning route `[4, 7, 2]` and afternoon `[5, 1, 6]` should become one long 1D line. Use…",
    [
      "np.concatenate — join pieces end-to-end in one row",
      "np.vstack — stack as separate rows only",
      "reshape only — no joining function needed",
      "transpose only — flip rows and columns",
    ],
    0,
    "concatenate glues 1D pieces into one sequence: [4,7,2,5,1,6]. vstack is for stacking rows.",
  ),
  "numpy-22": q(
    "Weekly temps have `NaN` for a broken sensor day. Why clean before `np.mean`?",
    [
      "Plain mean would become NaN too — cleaning keeps the average meaningful",
      "NaN values always mean the week was freezing",
      "mean automatically deletes NaN without any helper",
      "Cleaning converts Celsius to Fahrenheit",
    ],
    0,
    "One NaN can poison np.mean — filter or use nanmean so real readings still count.",
  ),
  "numpy-23": q(
    "You have exam scores and want ranking indexes (who is 1st, 2nd, 3rd). Use…",
    [
      "np.argsort — returns positions that would sort the array",
      "np.unique — only removes duplicates",
      "np.sort — returns sorted values but not the original indexes",
      "np.reshape — only changes table shape",
    ],
    0,
    "argsort gives index order for ranking; sort alone returns values, not who was where.",
  ),
  "numpy-25": q(
    "You slice `part = big[0:5]` and change `part[0] = 99`. Why can `big[0]` change too?",
    [
      "The slice may be a view sharing memory — use `.copy()` before editing safely",
      "NumPy always copies automatically on every slice",
      "Slicing converts arrays into Python lists",
      "Views only exist for string arrays",
    ],
    0,
    "Views share data with the parent — mutate a view and the original can change. `.copy()` isolates.",
  ),
  "numpy-26": q(
    "Why call `np.sqrt(arr)` on a whole array instead of looping with `math.sqrt`?",
    [
      "Ufuncs apply the function to every element in one fast vectorized call",
      "np.sqrt only works on the first element",
      "Loops are always faster than ufuncs",
      "Ufuncs convert numbers to strings",
    ],
    0,
    "Universal functions (ufuncs) run element-wise on the entire array — short and fast.",
  ),
  "numpy-26b": q(
    "Why does a NumPy array of 1 million floats often use less memory than a Python list?",
    [
      "Arrays store one numeric type compactly; lists wrap each number in a Python object",
      "Lists always use zero memory",
      "Arrays store text only",
      "Memory usage is identical for lists and arrays",
    ],
    0,
    "ndarrays pack plain numbers tightly; Python lists add object overhead per item.",
  ),
  "numpy-27": q(
    "Building a grade report: why filter with a mask before computing the class average?",
    [
      "So incomplete or invalid rows do not skew the summary stats",
      "Masks delete the entire CSV file",
      "Filtering replaces the need for np.mean",
      "Masks only work on text columns",
    ],
    0,
    "Boolean masks keep only valid scores — summarize clean data, not junk rows.",
  ),
  "numpy-30": q(
    "Why normalize scores with `(x - mean) / std` before comparing two different tests?",
    [
      "Z-scores put different scales on fair footing — compare relative standing",
      "It converts scores into file paths",
      "It removes the need for NumPy arrays",
      "It always makes every score exactly 100",
    ],
    0,
    "Z-scores show how far above or below average a value is, even when tests use different ranges.",
  ),
};
