# SciPy · py — Course Guide

## Overview
- **Path:** `/learn/scipy-py`
- **Level:** Beginner → Capstone
- **Size:** 8 chapters · 25 lessons
- **Accent:** Teal → violet science-lab theme (`#0d9488`)

## Chapters
1. Welcome to SciPy — what / why / NumPy teamwork / first import
2. Special Functions — gamma, erf, array helpers
3. Integration — area under curves with `quad`
4. Optimization — minimize, roots
5. Interpolation — `interp1d`, splines
6. Statistics — distributions, describe, gentle tests
7. Linear Algebra — solve, inverse, eigenvalues
8. Signal, FFT & Capstone — FFT, peaks, toolkit lab

## Files
| File | Role |
|------|------|
| `data/scipyCurriculum.js` | Lessons, theory, quizzes, challenges |
| `data/scipyVideoLinks.js` | Paste YouTube lecture URLs here (one per lesson) |
| `data/scipyLessonOutcomes.js` | Outcomes per lesson |
| `pages/ScipyHub.jsx` | Distinctive lab hub UI |
| `pages/ScipyLessonPage.jsx` | Theory + challenge |
| `components/ScipyTheoryShell.jsx` | Lab banner + NumPy theory renderer |
| `hooks/useScipyProgress.js` | Progress sync (`scipy-py`) |

## Notes
- Challenges reuse `PythonCodeChallenge` (NumPy track).
- Browser runtime loads SciPy via Pyodide; server needs `scipy` in `requirements-learn-python.txt`.
