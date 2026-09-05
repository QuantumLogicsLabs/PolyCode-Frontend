/**
 * Second MCQ (Question 2 of 2) for every SciPy lesson.
 * The lesson UI requires REQUIRED_QUIZ_COUNT = 2; without these, a generic
 * auto-generated quiz is shown instead.
 */

function q(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

export const SCIPY_SECOND_QUIZZES = {
  "scipy-0": q(
    "A weather team stores hourly rainfall in a NumPy array. Which SciPy job fits best?",
    [
      "Integrate the curve to estimate total water for the day",
      "Convert the array into a website theme",
      "Delete every other hour to save disk space",
      "Replace NumPy with a spreadsheet only",
    ],
    0,
    "Integration (integrate) estimates totals under curves — perfect for rainfall over time.",
  ),
  "scipy-1": q(
    "Your team wants the cheapest delivery route from many options. Which SciPy area helps?",
    [
      "optimize — search for a best setting",
      "special — only factorial-style helpers",
      "signal — only peak finding in audio",
      "stats — only rename column headers",
    ],
    0,
    "Optimization finds best inputs (like lowest cost) from a goal function.",
  ),
  "scipy-2": q(
    "You already have `temps = np.array([20, 22, 19])`. What is the smart next step before SciPy?",
    [
      "Keep it as a NumPy array and pass it to the SciPy tool you need",
      "Convert every value to a string before any SciPy call",
      "Avoid NumPy entirely when SciPy is installed",
      "Print the array once and never use it again",
    ],
    0,
    "SciPy expects numeric arrays from NumPy — build the array first, then call SciPy.",
  ),
  "scipy-3": q(
    "You only need integration in one script. Which import style is clearest?",
    [
      "`from scipy import integrate`",
      "`import *` from every SciPy submodule at once",
      "Never import NumPy when using SciPy",
      "Put all SciPy code inside HTML tags",
    ],
    0,
    "Import the module you need — keeps scripts readable and avoids name clashes.",
  ),
  "scipy-4": q(
    "A formula needs `5!` (5 factorial). Which SciPy module family helps?",
    [
      "`scipy.special` — helpers like gamma for factorial-style math",
      "`scipy.signal` — only for audio peaks",
      "`scipy.linalg` — only for CSS styling",
      "`scipy.interpolate` — only for sending emails",
    ],
    0,
    "special.gamma connects to factorial ideas — gamma(5) equals 4!, which is 24.",
  ),
  "scipy-5": q(
    "Lab notes mention small measurement errors clustering near zero. Which helper fits that story?",
    [
      "`special.erf` — common in probability and error-style problems",
      "`special.gamma` — only for sorting file names",
      "`integrate.quad` — only for HTML layouts",
      "`stats.ttest_1samp` — only for plotting pie charts",
    ],
    0,
    "erf appears in probability, heat, and diffusion — useful when errors cluster near a typical value.",
  ),
  "scipy-6": q(
    "You have `x = np.array([0.0, 0.5, 1.0])` and call `special.erf(x)`. What should you expect?",
    [
      "A NumPy array with one erf result per input value",
      "A single string describing the lesson title",
      "An error because erf never accepts arrays",
      "A PNG chart saved to disk automatically",
    ],
    0,
    "SciPy special functions work element-wise on NumPy arrays — one output per input.",
  ),
  "scipy-7": q(
    "Power usage over 8 hours forms a curve on a chart. What does integrating it give you?",
    [
      "Total energy used across those hours",
      "Only the color of the chart line",
      "The file name of the CSV export",
      "The number of Python keywords in your script",
    ],
    0,
    "Integration totals area under a curve — here, total energy under the power curve.",
  ),
  "scipy-8": q(
    "After `area, err = integrate.quad(f, 0, 1)`, why look at `err`?",
    [
      "It hints how confident the computer is in the area estimate",
      "It is always exactly zero so you can ignore it",
      "It stores your Python version number",
      "It lists every variable name in memory",
    ],
    0,
    "The error estimate is a sanity check — a huge err means investigate limits or f(x).",
  ),
  "scipy-9": q(
    "Your integral uses limits 0 to 100 but the sensor only recorded 0 to 10. What should you do?",
    [
      "Fix the limits to match the data range before trusting the result",
      "Always double the limits to be safe",
      "Delete SciPy and guess the answer",
      "Convert all numbers to strings first",
    ],
    0,
    "Wrong limits give meaningless integrals — match a and b to where your data is valid.",
  ),
  "scipy-10": q(
    "A factory wants the lowest-cost machine setting without trying every option by hand. This is…",
    [
      "An optimization problem — find inputs that minimize cost",
      "A file-compression problem only",
      "A problem that never uses functions",
      "A task that requires deleting all measurements",
    ],
    0,
    "Optimization searches for best inputs (here, lowest cost) from a goal function.",
  ),
  "scipy-11": q(
    "For `cost(x) = (x - 3) ** 2`, why does the starting guess `x0` matter?",
    [
      "A sensible x0 helps the search start near the right valley",
      "x0 must always be exactly 3 or SciPy crashes",
      "x0 replaces the need for a cost function",
      "x0 is only used for printing fonts",
    ],
    0,
    "minimize uses x0 as a starting point — a bad guess can land in the wrong local minimum.",
  ),
  "scipy-12": q(
    "You need the x value where `f(x) = x**2 - 9` crosses zero. Which idea fits?",
    [
      "Root finding — solve f(x) = 0",
      "Interpolation — fill gaps between GPS points",
      "FFT — split a signal into frequencies",
      "describe — summarize quiz score lists",
    ],
    0,
    "Roots are solutions to f(x) = 0 — here, x = ±3 for x² − 9.",
  ),
  "scipy-13": q(
    "GPS logs a position every 10 seconds. Why use interpolation for second 15?",
    [
      "To estimate a sensible position between two known readings",
      "To erase the original GPS data permanently",
      "To prove the GPS hardware never drifts",
      "To convert latitude into a password",
    ],
    0,
    "Interpolation estimates values between known samples — like 15 s between 10 s and 20 s marks.",
  ),
  "scipy-14": q(
    "With `f = interp1d(x, y, kind='linear')`, what does calling `f(3)` give you?",
    [
      "An estimated y at x = 3 based on your known points",
      "The number of lines in your Python file",
      "A database connection string",
      "The maximum possible temperature on Earth",
    ],
    0,
    "interp1d returns a callable — f(3) estimates y at a new x between your samples.",
  ),
  "scipy-15": q(
    "You have only two temperature readings. Which `kind` should you try first?",
    [
      "`linear` — cubic needs more points to work well",
      "`cubic` — always required even with two points",
      "`random` — picks a new curve each run",
      "`delete` — removes half the data",
    ],
    0,
    "Start with linear when you have few points; cubic needs enough samples for a smooth curve.",
  ),
  "scipy-16": q(
    "Most students score near 75, and only a few score very high or very low. What is that pattern called?",
    [
      "A distribution — common in the middle, rare at the ends",
      "A file folder",
      "A website theme",
      "A keyboard shortcut",
    ],
    0,
    "That “many near the middle, few at the ends” shape is a distribution.",
  ),
  "scipy-17": q(
    "Quiz scores average 88, but variance is high. What does that mean?",
    [
      "Scores are mixed — some low, some high",
      "Every student scored exactly 88",
      "Variance is the teacher’s name",
      "Variance only counts files on disk",
    ],
    0,
    "High variance means the numbers are spread out, not all near the average.",
  ),
  "scipy-18": q(
    "A small p-value usually means…",
    [
      "The data look surprising if the old average were still true",
      "You won a prize automatically",
      "You should never collect data again",
      "Python must be reinstalled",
    ],
    0,
    "A small p-value is a clue that the result is surprising under the old assumption — not final proof.",
  ),
  "scipy-19": q(
    "When might you reach for `scipy.linalg` instead of stopping at NumPy alone?",
    [
      "When you need solvers like solve, det, or eigvals on matrices",
      "When you only want to change CSS colors",
      "When you never use arrays",
      "When you need to send HTTP requests only",
    ],
    0,
    "scipy.linalg adds linear-algebra solvers beyond basic NumPy — systems, determinants, eigenvalues.",
  ),
  "scipy-20": q(
    "After `x = linalg.solve(A, b)`, why compute `A @ x`?",
    [
      "To check that the solution satisfies A @ x ≈ b",
      "To delete matrix A from memory only",
      "To convert x into a pie chart",
      "Because solve always returns None",
    ],
    0,
    "Multiplying A by x and comparing to b verifies your solution fits the equations.",
  ),
  "scipy-21": q(
    "A guitar string vibrates at natural frequencies. Which math idea connects to that story?",
    [
      "Eigenvalues — special stretch factors of a matrix",
      "interp1d — fill gaps in GPS tracks",
      "gamma — factorial-style products only",
      "find_peaks — only for sorting integers",
    ],
    0,
    "Eigenvalues describe natural modes/frequencies — a common vibration intuition.",
  ),
  "scipy-22": q(
    "You record a pure tone as numbers over time. Why run an FFT?",
    [
      "To see which frequency is strongest in the signal",
      "To compress the WAV file into a ZIP only",
      "To rename every variable in the script",
      "To prove the microphone never adds noise",
    ],
    0,
    "FFT reveals frequency content — which note or tone dominates the signal.",
  ),
  "scipy-23": q(
    "In `peaks, props = find_peaks(sig)`, what does the first return value contain?",
    [
      "Indexes in the array where local peaks occur",
      "The average of every value in sig",
      "A list of Python import statements",
      "The Wi-Fi password for the watch",
    ],
    0,
    "find_peaks returns peak indexes — positions of local highs in the signal.",
  ),
  "scipy-24": q(
    "In the capstone lab you chain stats, integrate, and optimize. What habit makes the report trustworthy?",
    [
      "Print clear checks at each step and use NumPy data throughout",
      "Skip all output and hope the grader guesses",
      "Never import SciPy modules by name",
      "Use only string data, never arrays",
    ],
    0,
    "Strong SciPy work: NumPy arrays in, the right module for each job, readable printed checks.",
  ),
};
