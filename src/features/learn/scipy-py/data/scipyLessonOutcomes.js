// Plain-English learning outcomes per SciPy lesson (shown at top of theory view).

export const SCIPY_LESSON_OUTCOMES = {
  "scipy-0": [
    "Say what SciPy is in one plain sentence",
    "Name the main jobs SciPy helps with (integrate, optimize, stats…)",
    "Know that SciPy sits on top of NumPy arrays",
  ],
  "scipy-1": [
    "Explain why scientists and engineers pick SciPy",
    "List everyday places SciPy skills show up",
    "See SciPy as a ready-made science toolkit",
  ],
  "scipy-2": [
    "Compare NumPy and SciPy roles clearly",
    "Use NumPy arrays as input to SciPy tools",
    "Know when to reach for SciPy instead of writing math by hand",
  ],
  "scipy-3": [
    "Import SciPy modules with clean `from scipy…` style",
    "Check a SciPy version and run a tiny first call",
    "Feel ready to explore the later chapters",
  ],
  "scipy-4": [
    "Define special functions in beginner words",
    "Connect special functions to real science problems",
    "Know where `scipy.special` lives",
  ],
  "scipy-5": [
    "Use gamma and erf from scipy.special",
    "Read printed special-function values",
    "Pick a helper function for a simple task",
  ],
  "scipy-6": [
    "Use a special function on many numbers at once with a NumPy array",
    "Combine `numpy` and `scipy.special` in a short script",
    "Print a clear result and check that every value was updated",
  ],
  "scipy-7": [
    "Explain numerical integration as finding area under a curve",
    "Give a real-life example (like total water or energy)",
    "Know that SciPy’s quad helps estimate that area",
  ],
  "scipy-8": [
    "Write a simple f(x) and call integrate.quad",
    "Read both the area and the error estimate",
    "Print the area between two clear limits",
  ],
  "scipy-9": [
    "Check limits and units before trusting an answer",
    "Use the error estimate as a warning light",
    "Compare SciPy’s result with a simple known case",
  ],
  "scipy-10": [
    "Explain optimization as searching for the best choice",
    "Give a real-life minimize example (like lowest cost)",
    "Know that scipy.optimize is the toolbox for this job",
  ],
  "scipy-11": [
    "Call optimize.minimize with a cost function and starting guess",
    "Read result.x (best input) and result.fun (best cost)",
    "Start with a simple one-number example first",
  ],
  "scipy-12": [
    "Explain a root as the place where f(x) = 0",
    "Use root_scalar with a bracket and print sol.root",
    "Describe curve fitting in plain beginner words",
  ],
  "scipy-13": [
    "Explain interpolation as estimating values between known points",
    "Give a real-life gap example (GPS or sensors)",
    "Know that scipy.interpolate is the toolbox for this job",
  ],
  "scipy-14": [
    "Build an interp1d helper from x and y samples",
    "Estimate y at a new in-between x value",
    "Start with kind=\"linear\" as a first try",
  ],
  "scipy-15": [
    "Use kind=\"cubic\" for a smoother path through points",
    "Compare linear vs cubic in plain words",
    "Keep enough sample points before using cubic",
  ],
  "scipy-16": [
    "Explain a distribution as common vs rare outcomes",
    "Use a bus-delay or exam-mark example",
    "Try stats.norm and read pdf / cdf in plain words",
  ],
  "scipy-17": [
    "Summarize numbers with stats.describe",
    "Read nobs (count), mean (average), and variance (spread)",
    "Know that high variance means values are mixed",
  ],
  "scipy-18": [
    "Ask if a change could just be luck",
    "Run ttest_1samp and read the p-value",
    "Treat a p-value as a clue, not final proof",
  ],
  "scipy-19": [
    "Explain why scipy.linalg sits next to NumPy arrays",
    "Import scipy.linalg and try linalg.det",
    "Know that a determinant near 0 can mean a hard-to-solve matrix",
  ],
  "scipy-20": [
    "Set up A x = b and solve with linalg.solve",
    "Check the answer with A @ x",
    "Connect solve to a real two-unknown price story",
  ],
  "scipy-21": [
    "Explain eigenvalues as special stretch factors",
    "Compute eigvals with SciPy on a small matrix",
    "Connect eigen ideas to vibration or stretch examples",
  ],
  "scipy-22": [
    "Explain FFT as splitting a signal into frequencies",
    "Run a small FFT on a sine wave",
    "Read which frequency is strongest",
  ],
  "scipy-23": [
    "Find peaks in a simple signal array",
    "Use SciPy signal helpers carefully",
    "Connect peaks to heartbeats or music notes",
  ],
  "scipy-24": [
    "Combine integrate, optimize, and stats in one mini lab",
    "Build a short science report with SciPy",
    "Know what to practice next after this course",
  ],
};
