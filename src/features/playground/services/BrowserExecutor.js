/**
 * BrowserExecutor — runs code 100% in the browser, no external API.
 *
 * JavaScript / TypeScript / JSX: Web Worker + @babel/standalone (in-browser "compiler")
 * Python: Pyodide WASM · SQL: sql.js · HTML/CSS/JSON/Markdown: native browser APIs
 *
 * Compiled languages (C, C++, Java, …): lightweight print-line simulation (no gcc/javac).
 */

import {
  compileWithBabel,
  looksLikeJsx,
  runJavaScriptInWorker,
  transpileTypeScript,
} from "./jsRunner";
import {
  TORCH_BROWSER_SHIM,
  codeUsesTorch,
} from "../../learn/shared/torchBrowserShim";
import {
  TRANSFORMERS_BROWSER_SHIM,
  codeUsesTransformers,
} from "../../learn/shared/transformersBrowserShim";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

function ok(stdout) { return { stdout, stderr: '', error: null }; }
function err(stderr) { return { stdout: '', stderr, error: stderr }; }
function preview(html) { return { stdout: '', stderr: '', error: null, previewHTML: html }; }

// ─── JavaScript / JSX (Web Worker sandbox) ───────────────────────────────────

export function runJavaScript(code, options) {
  return runJavaScriptInWorker(code, options);
}

export async function runJSX(code) {
  try {
    const compiled = await compileWithBabel(code, ["react"], "snippet.jsx");
    return runJavaScriptInWorker(compiled);
  } catch (e) {
    return err(e.message);
  }
}

export async function runTSX(code) {
  try {
    const compiled = await transpileTypeScript(code, {
      jsx: true,
      filename: "snippet.tsx",
    });
    return runJavaScriptInWorker(compiled);
  } catch (e) {
    return err(e.message);
  }
}

// ─── TypeScript ───────────────────────────────────────────────────────────────

export async function runTypeScript(code) {
  try {
    if (/^\s*import\s+/m.test(code) || /^\s*export\s+|from\s+['"]/m.test(code)) {
      return {
        stdout: "",
        stderr: [
          "⚠️  Import/Export statements are not supported in browser mode.",
          "",
          "Write standalone TypeScript — types, interfaces, and functions work without imports.",
        ].join("\n"),
        error: null,
      };
    }

    const compiled = await transpileTypeScript(code, { filename: "snippet.ts" });
    return runJavaScriptInWorker(compiled);
  } catch (e) {
    return err(e.message);
  }
}

// ─── HTML/CSS ─────────────────────────────────────────────────────────────────

export function runHTML(code) {
  return Promise.resolve(preview(code));
}

// ─── SCSS (Dart Sass compiled in the browser) ─────────────────────────────────

const SASS_URL = 'https://cdn.jsdelivr.net/npm/sass@1.105.0/sass.dart.js';
const IMMUTABLE_URL = 'https://cdn.jsdelivr.net/npm/immutable@5.1.9/dist/immutable.min.js';
let sassPromise = null;

// sass.dart.js is a classic script: it registers a loader on
// window._cliPkgExports and needs the immutable library passed in.
function loadSass() {
  if (!sassPromise) {
    sassPromise = (async () => {
      await loadScript(IMMUTABLE_URL);
      await loadScript(SASS_URL);
      const library = window._cliPkgExports?.pop();
      if (!library) throw new Error('The Sass compiler failed to start.');
      if (window._cliPkgExports?.length === 0) delete window._cliPkgExports;
      const sass = {};
      library.load({ immutable: window.Immutable }, sass);
      return sass;
    })().catch((e) => {
      sassPromise = null;
      document.querySelector(`script[src="${SASS_URL}"]`)?.remove();
      throw e;
    });
  }
  return sassPromise;
}

// Serves in-memory partials so `@use "tokens"` works without a filesystem.
// Keys are file paths such as "_tokens.scss" or "components/_index.scss".
function virtualImporter(modules) {
  return {
    canonicalize(url) {
      const path = url.replace(/^virtual:\/*/, '').replace(/\.scss$/, '');
      const slash = path.lastIndexOf('/');
      const dir = slash === -1 ? '' : path.slice(0, slash + 1);
      const base = path.slice(dir.length).replace(/^_/, '');
      const key = [`${dir}_${base}.scss`, `${dir}${base}.scss`, `${dir}${base}/_index.scss`]
        .find((candidate) => Object.prototype.hasOwnProperty.call(modules, candidate));
      return key ? new URL(`virtual:/${key}`) : null;
    },
    load(canonicalUrl) {
      return { contents: modules[canonicalUrl.pathname.replace(/^\/+/, '')], syntax: 'scss' };
    },
  };
}

/**
 * Compiles SCSS and, when `markup` is given, returns a preview document that
 * applies the compiled CSS to it. `modules` supplies partials for `@use`.
 */
export async function runSCSS(code, { markup = '', modules = {} } = {}) {
  let sass;
  try {
    sass = await loadSass();
  } catch (e) {
    return err(`${e.message} Check your connection and run again.`);
  }

  const warnings = [];
  try {
    const { css } = sass.compileString(code, {
      style: 'expanded',
      alertColor: false,
      importers: [virtualImporter(modules)],
      logger: {
        warn: (message) => warnings.push(`Warning: ${message}`),
        debug: (message, { span }) => warnings.push(`@debug (line ${span.start.line + 1}): ${message}`),
      },
    });
    const previewHTML = markup
      ? `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body { font-family: system-ui, sans-serif; padding: 1rem; }</style><style>${css.replace(/<\/style/gi, '<\\/style')}</style></head><body>${markup}</body></html>`
      : null;
    return { stdout: css, stderr: '', error: null, compiledCSS: css, warnings, previewHTML };
  } catch (e) {
    return err(e.message);
  }
}

// ─── JSON ─────────────────────────────────────────────────────────────────────

export function runJSON(code) {
  try {
    return Promise.resolve(ok(JSON.stringify(JSON.parse(code), null, 2)));
  } catch (e) { return Promise.resolve(err(`JSON Error: ${e.message}`)); }
}

// ─── Markdown ─────────────────────────────────────────────────────────────────

export async function runMarkdown(code) {
  if (!window.marked) await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
  const body = window.marked.parse(code);
  return preview(`<html><head><style>body{font-family:-apple-system,sans-serif;padding:2rem;line-height:1.7;max-width:800px;margin:0 auto;color:#24292f}h1,h2,h3{border-bottom:1px solid #d0d7de;padding-bottom:.3em}code{background:#f6f8fa;padding:.2em .4em;border-radius:3px;font-size:85%}pre{background:#f6f8fa;padding:1rem;border-radius:6px;overflow:auto}blockquote{border-left:4px solid #0550ae;margin:0;padding:.5em 1em;color:#57606a}</style></head><body>${body}</body></html>`);
}

// ─── SQL (sql.js) ─────────────────────────────────────────────────────────────

export async function runSQL(code) {
  try {
    if (!window.initSqlJs) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js');
    const SQL = await window.initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` });
    const db = new SQL.Database();
    const lines = [];
    const stmts = code.split(';').map(s => s.trim()).filter(Boolean);
    for (const s of stmts) {
      try {
        const res = db.exec(s);
        if (res.length) {
          for (const r of res) {
            const widths = r.columns.map((c, i) => Math.max(c.length, ...r.values.map(row => String(row[i] ?? 'NULL').length)));
            const pad = (v, w) => String(v ?? 'NULL').padEnd(w);
            const sep = widths.map(w => '-'.repeat(w + 2)).join('+');
            lines.push('| ' + r.columns.map((c, i) => pad(c, widths[i])).join(' | ') + ' |');
            lines.push('|-' + sep + '-|');
            for (const row of r.values) lines.push('| ' + row.map((v, i) => pad(v, widths[i])).join(' | ') + ' |');
          }
        } else { lines.push(`✓ ${s.split(' ')[0].toUpperCase()} executed`); }
      } catch (e) { lines.push(`✗ ERROR: ${e.message}`); }
    }
    db.close();
    return ok(lines.join('\n'));
  } catch (e) { return err(e.message); }
}

// ─── Python (Pyodide) — 100% in-browser ─────────────────────────────────────

let pyodideInstance = null;
let pyodideInitPromise = null;
const pyodideLoadedPackages = new Set();
let matplotlibPyodideReady = false;
let torchShimReady = false;
let transformersShimReady = false;

const MATPLOTLIB_PYODIDE_SETUP = `
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io, base64

if "_POLYCODE_FIGURES" not in globals():
    _POLYCODE_FIGURES = []

def _polycode_clear_figures():
    global _POLYCODE_FIGURES
    _POLYCODE_FIGURES = []

def _polycode_capture_show(*args, **kwargs):
    import matplotlib.pyplot as plt
    fig = plt.gcf()
    if fig.get_axes():
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight", dpi=110)
        _POLYCODE_FIGURES.append(base64.b64encode(buf.getvalue()).decode("ascii"))
    plt.close(fig)

plt.show = _polycode_capture_show
`;

const PYTHON_STDLIB_PREFIXES = [
  'math', 'random', 'datetime', 'time', 'sys', 'os', 'json', 're',
  'collections', 'itertools', 'functools', 'typing', 'statistics',
  'string', 'textwrap', 'unicodedata', 'struct', 'codecs', 'copy',
  'pprint', 'reprlib', 'enum', 'graphlib', 'contextlib', 'abc',
  'io', 'pickle', 'pathlib', 'warnings', 'builtins',
];

/** Pyodide wheels available via loadPackage (used by learn + playground). */
const PYTHON_PYODIDE_PACKAGES = {
  numpy: 'numpy',
  pandas: 'pandas',
  matplotlib: 'matplotlib',
  scipy: 'scipy',
  micropip: 'micropip',
  sklearn: 'scikit-learn',
  skimage: 'scikit-image',
  joblib: 'joblib',
};

function getImportedModules(code = '') {
  const modules = new Set();
  const importRegex = /^\s*(?:import|from)\s+([\w.]+)/gm;
  let match = importRegex.exec(code);
  while (match) {
    modules.add(match[1].split('.')[0]);
    match = importRegex.exec(code);
  }
  return [...modules];
}

function isAllowedPythonModule(moduleName = '') {
  if (!moduleName) return true;
  if (PYTHON_STDLIB_PREFIXES.some((lib) => moduleName === lib || moduleName.startsWith(`${lib}.`))) {
    return true;
  }
  return Object.prototype.hasOwnProperty.call(PYTHON_PYODIDE_PACKAGES, moduleName);
}

function getPyodideWheelPackages(code = '') {
  const wheels = new Set();
  for (const name of getImportedModules(code)) {
    const wheel = PYTHON_PYODIDE_PACKAGES[name];
    if (wheel) wheels.add(wheel);
  }
  // scikit-learn already bundles joblib — loading both causes Pyodide errors.
  if (wheels.has("scikit-learn")) {
    wheels.delete("joblib");
  }
  return [...wheels];
}

const PYODIDE_PACKAGE_TIMEOUT_MS = 60000;
const PYODIDE_LARGE_PACKAGE_TIMEOUT_MS = 240000;
const PYODIDE_LARGE_PACKAGES = new Set(["scipy", "scikit-learn", "scikit-image"]);
const pyodidePackagePromises = new Map();

function packageLoadTimeoutMs(pkg) {
  return PYODIDE_LARGE_PACKAGES.has(pkg)
    ? PYODIDE_LARGE_PACKAGE_TIMEOUT_MS
    : PYODIDE_PACKAGE_TIMEOUT_MS;
}

function loadPyodidePackageOnce(py, pkg) {
  // Concurrent runs (learner code + reference solution) must share one download.
  if (!pyodidePackagePromises.has(pkg)) {
    pyodidePackagePromises.set(
      pkg,
      Promise.resolve(py.loadPackage(pkg)).catch((error) => {
        pyodidePackagePromises.delete(pkg);
        throw error;
      }),
    );
  }
  return withPyodideTimeout(
    pyodidePackagePromises.get(pkg),
    packageLoadTimeoutMs(pkg),
    `Timed out downloading the '${pkg}' package`,
  );
}

async function ensurePyodidePackages(py, code = '') {
  const needed = getPyodideWheelPackages(code);

  for (const pkg of needed) {
    if (pyodideLoadedPackages.has(pkg)) continue;
    try {
      await loadPyodidePackageOnce(py, pkg);
      pyodideLoadedPackages.add(pkg);
      if (pkg === "scikit-learn") {
        pyodideLoadedPackages.add("joblib");
      }
    } catch (error) {
      const message = error?.message || String(error);
      const friendly = /Unexpected token\s*['"]?</i.test(message)
        ? `Could not download '${pkg}' for the in-browser runtime (received a web page instead of a package).`
        : message;
      const hint =
        pkg === "scipy"
          ? "SciPy is large — check your network and try again. On a local backend you can also install it with: pip install -r requirements-learn-python.txt"
          : "Check your network and try again. For local development, install packages on the PolyCode backend with: pip install -r requirements-learn-python.txt";
      throw new Error(`Could not load ${pkg} in the browser (${friendly}). ${hint}`);
    }
  }
}

function resetPyodideIO(py) {
  py.runPython(`
import sys, io
class _Cap(io.StringIO):
    pass
sys.stdout = _Cap()
sys.stderr = _Cap()
`);
}

function setupPyodideStdin(py, stdin = "") {
  if (!stdin) return;
  py.runPython(`
import sys, io
sys.stdin = io.StringIO(${JSON.stringify(stdin)})
`);
}

export function codeNeedsStdin(code = "", language = "") {
  const lang = String(language).toLowerCase();
  const source = String(code);
  if (lang === "python" || lang === "py") return /\binput\s*\(/.test(source);
  if (lang === "cpp" || lang === "c++" || lang === "c") {
    return /\bcin\s*>>/.test(source) || /\bscanf\s*\(/.test(source);
  }
  if (lang === "java") return /\bScanner\b/.test(source) || /\bSystem\.in\b/.test(source);
  return false;
}

function codeUsesMatplotlib(source = '') {
  return /(?:^|\n)\s*(?:import|from)\s+matplotlib\b/m.test(source) ||
    /\bmatplotlib\.pyplot\b/.test(source) ||
    /\bplt\.(?:show|plot|scatter|bar|hist|pie|subplots|figure|savefig|annotate)\s*\(/.test(source);
}

async function ensureMatplotlibPyodideSetup(py) {
  if (matplotlibPyodideReady) return;
  await loadPyodidePackageOnce(py, 'matplotlib');
  pyodideLoadedPackages.add('matplotlib');
  py.runPython(MATPLOTLIB_PYODIDE_SETUP);
  matplotlibPyodideReady = true;
}

function extractPyodidePlotImages(py) {
  try {
    const raw = py.runPython('__import__("json").dumps(_POLYCODE_FIGURES)');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

const PYODIDE_SCRIPT_TIMEOUT_MS = 30000;
const PYODIDE_INIT_TIMEOUT_MS = 75000;

function withPyodideTimeout(promise, ms, message) {
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function loadPyodideRuntime() {
  if (!window.loadPyodide) {
    await withPyodideTimeout(
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      }),
      PYODIDE_SCRIPT_TIMEOUT_MS,
      'Timed out downloading the Python runtime (Pyodide).',
    );
  }

  const py = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
  });
  resetPyodideIO(py);
  pyodideInstance = py;
  return py;
}

async function ensurePyodide() {
  if (pyodideInstance) return pyodideInstance;

  // Share one load across concurrent callers. A caller that times out leaves the
  // download running, so the next attempt rejoins it instead of starting over.
  if (!pyodideInitPromise) {
    pyodideInitPromise = loadPyodideRuntime().catch((e) => {
      pyodideInitPromise = null;
      throw e;
    });
  }

  return withPyodideTimeout(
    pyodideInitPromise,
    PYODIDE_INIT_TIMEOUT_MS,
    'Timed out starting the Python runtime (Pyodide). Check your connection and run again.',
  );
}

async function ensureTorchBrowserShim(py) {
  if (torchShimReady) return;
  await loadPyodidePackageOnce(py, "numpy");
  pyodideLoadedPackages.add("numpy");
  py.runPython(TORCH_BROWSER_SHIM);
  torchShimReady = true;
}

async function ensureTransformersBrowserShim(py) {
  if (transformersShimReady) return;
  py.runPython(TRANSFORMERS_BROWSER_SHIM);
  transformersShimReady = true;
}

const HEAVY_ML_MODULE_NOTES = {
  datasets: "downloads real dataset files from the Hugging Face Hub",
  huggingface_hub: "talks to the real Hugging Face Hub API (auth, uploads, model listings)",
  peft: "wraps a real PyTorch model with real LoRA adapter weights",
  evaluate: "computes real metrics against a real dataset",
  bitsandbytes: "runs real low-precision CUDA kernels on a real GPU",
};

export async function runPython(code, stdin = '') {
  try {
    const usesTorch = codeUsesTorch(code);
    const usesTransformers = codeUsesTransformers(code);
    const blocked = getImportedModules(code).filter((moduleName) => {
      if (usesTorch && moduleName === "torch") return false;
      if (usesTransformers && moduleName === "transformers") return false;
      return !isAllowedPythonModule(moduleName);
    });
    if (blocked.length) {
      const importedModule = blocked[0];
      const heavyNote = HEAVY_ML_MODULE_NOTES[importedModule];
      if (heavyNote) {
        return {
          stdout: '',
          stderr: [
            `⚠️  '${importedModule}' needs a real Python environment.`,
            '',
            `💡 '${importedModule}' ${heavyNote} — that needs real network access and a full Python install, which this in-browser demo (Pyodide) can't provide.`,
            '',
            `✅ This browser demo simulates transformers.pipeline() only (sentiment-analysis, text-generation, question-answering, summarization, zero-shot-classification, ner, fill-mask).`,
            `▶️  Try this exact code with: pip install ${importedModule} transformers — locally, or on Google Colab.`,
          ].join('\n'),
          error: `Module '${importedModule}' needs a real Python environment (not available in this browser demo).`,
        };
      }
      return {
        stdout: '',
        stderr: [
          `⚠️  The module '${importedModule}' is not available in browser mode.`,
          '',
          '💡 This playground runs Python with Pyodide (WebAssembly).',
          '',
          '✅ Available: stdlib, numpy, pandas, matplotlib, scipy, scikit-learn, joblib, micropip, torch (teaching shim), transformers (teaching shim, pipeline() only)',
          '❌ Not available: requests, socket, threading, subprocess, etc.',
        ].join('\n'),
        error: `Module '${importedModule}' is not available in the browser.`,
      };
    }

    const py = await ensurePyodide();
    if (usesTorch || usesTransformers) {
      // The transformers shim's Auto* mock builds its fake tensor output on
      // top of the torch shim's Tensor class, so it needs torch loaded first
      // even when the snippet itself never writes `import torch`.
      await ensureTorchBrowserShim(py);
    }
    if (usesTransformers) {
      await ensureTransformersBrowserShim(py);
    }
    await ensurePyodidePackages(py, code);
    const usesMatplotlib = codeUsesMatplotlib(code);
    if (usesMatplotlib) {
      await ensureMatplotlibPyodideSetup(py);
    }
    resetPyodideIO(py);
    setupPyodideStdin(py, stdin);
    if (usesMatplotlib && matplotlibPyodideReady) {
      py.runPython('_polycode_clear_figures()');
    }
    
    let error = null;
    try {
      py.runPython(code);
    } catch (e) {
      error = e.message;
      if (
        !stdin &&
        /\binput\s*\(/.test(code) &&
        /I\/O error|EOF|stdin/i.test(error)
      ) {
        error = [
          error,
          "",
          "💡 This program calls input(). Add values in the Program input (stdin) panel below — one line per input() call.",
        ].join("\n");
      }
    }
    
    let stdout = py.runPython('sys.stdout.getvalue()');
    const stderr = py.runPython('sys.stderr.getvalue()');
    if (usesTorch && !error) {
      stdout = `[PolyCode browser demo · teaching torch shim]\n${stdout || ""}`;
    }
    if (usesTransformers && !error) {
      stdout = `[PolyCode browser demo · teaching transformers shim — not real model inference]\n${stdout || ""}`;
    }
    const plotImages =
      usesMatplotlib && matplotlibPyodideReady ? extractPyodidePlotImages(py) : [];
    
    return { stdout, stderr, error, plotImages };
  } catch (e) {
    return err(`Python Error: ${e.message}`);
  }
}

// ─── PHP (lite — basic echo/print only via eval trick) ───────────────────────

export function runPHP(code) {
  // Very basic PHP simulation for echo/print/variables
  try {
    // Check for require/include statements
    if (/\b(require|require_once|include|include_once)\s*['"(]/i.test(code)) {
      return Promise.resolve({
        stdout: '',
        stderr: [
          '⚠️  File inclusion statements are not supported in browser mode.',
          '',
          '💡 What\'s happening?',
          'This playground runs PHP code by simulating it in JavaScript.',
          'Statements like require, include need a server filesystem.',
          '',
          '✅ What you can do instead:',
          '• Use echo, print for output',
          '• Work with variables, arrays, loops',
          '• Create functions and classes',
          '• All basic PHP syntax works great!',
          '',
          '📝 Example:',
          '❌ require \'config.php\';',
          '❌ include \'header.php\';',
          '✅ echo "Hello World";',
          '✅ $name = "John"; echo "Hi, $name!";',
        ].join('\n'),
        error: null,
      });
    }

    const normalized = code.replace(/<\?php\s*/gi, '').replace(/\?>/gi, '');
    // Convert basic PHP to JS
    let js = normalized
      .replace(/echo\s+(['"`])(.*?)\1\s*;/g, 'console.log($1$2$1);')
      .replace(/echo\s+(.*?);/g, 'console.log($1);')
      .replace(/print\s+(.*?);/g, 'console.log($1);')
      .replace(/\$(\w+)/g, 'let_$1')  // $var -> let_var (very rough)
      .replace(/let_let_/g, 'let_')
      .replace(/\.([\s])/g, '+$1')    // . concat -> +
      ;
    return runJavaScript(js);
  } catch (e) { return Promise.resolve(err(e.message)); }
}

// ─── Brainfuck ────────────────────────────────────────────────────────────────

export function runBrainfuck(code) {
  try {
    const prog = code.replace(/[^><+\-.,[\]]/g, '');
    const mem = new Uint8Array(30000);
    let dp = 0, ip = 0, out = '';
    const brackets = {};
    const stack = [];
    for (let i = 0; i < prog.length; i++) {
      if (prog[i] === '[') stack.push(i);
      else if (prog[i] === ']') { const j = stack.pop(); brackets[j] = i; brackets[i] = j; }
    }
    let steps = 0;
    while (ip < prog.length && steps++ < 1000000) {
      switch (prog[ip]) {
        case '>': dp = (dp + 1) % 30000; break;
        case '<': dp = (dp - 1 + 30000) % 30000; break;
        case '+': mem[dp] = (mem[dp] + 1) % 256; break;
        case '-': mem[dp] = (mem[dp] - 1 + 256) % 256; break;
        case '.': out += String.fromCharCode(mem[dp]); break;
        case '[': if (!mem[dp]) ip = brackets[ip]; break;
        case ']': if (mem[dp]) ip = brackets[ip]; break;
        default: ip++; break;
      }
      ip++;
    }
    return Promise.resolve(ok(out || '(no output)'));
  } catch (e) { return Promise.resolve(err(e.message)); }
}

// ─── Lua (Fengari) ────────────────────────────────────────────────────────────

export async function runLua(code) {
  try {
    if (!window.fengari) {
      await loadScript('https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.min.js');
      await new Promise(r => setTimeout(r, 200));
    }
    window.fengari.load(code);
    // fengari.load returns a function or throws
    // capture print output by overriding
    return runJavaScript(`
      // Lua via Fengari must be run in the page context — falling back to simulation
      console.log("Lua via Fengari loaded — ${code.split('\\n')[0].replace(/"/g, '\\"')}");
      console.log("(Full Lua execution requires fengari integration in page context)");
    `);
  } catch (e) { return err(e.message); }
}

// ─── CSS (render in preview) ──────────────────────────────────────────────────

export function runCSS(code) {
  // Provide a light preview container so CSS examples remain readable
  // even when example CSS sets dark text colors. User CSS is applied
  // after the reset so it can still override most rules if intended.
  return Promise.resolve(
    preview(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      /* Light preview reset for readability */
      html, body { background: #ffffff; color: #111111; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif; margin: 0; padding: 0; }
      .preview-note { font-family: sans-serif; padding: 1rem; color: #666666; font-size: 0.9rem; }
      .preview-wrap { padding: 1rem; }
      #hero { padding: 2rem; border-radius: 18px; background: #eef2ff; margin-bottom: 1rem; }
      #hero h1 { margin: 0 0 0.5rem; font-size: 2rem; }
      #hero p { margin: 0 0 1rem; color: #334155; }
      #hero button { padding: 0.75rem 1.25rem; border: none; border-radius: 999px; background: #0ea5e9; color: white; cursor: pointer; }
      .container { width: 100%; max-width: 960px; margin: 0 auto; display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      .card { border: 1px solid #d1d5db; border-radius: 16px; background: #f8fafc; padding: 1rem; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08); }
      .box { padding: 1rem; border: 2px dashed #94a3b8; border-radius: 12px; background: #f1f5f9; }
      .card h2 { margin-top: 0; }
      .demo-list { margin: 0; padding-left: 1.25rem; }
      .demo-list li { margin: 0.35rem 0; }
      input[type="text"] { width: 100%; max-width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; }
    </style>
    <style id="user-css">
${code}
    </style>
  </head>
  <body>
    <div class="preview-note">CSS Preview — add HTML elements to see styles applied:</div>
    <div class="preview-wrap">
      <section id="hero">
        <h1>PolyCode CSS demo</h1>
        <p>Use selectors like <code>#hero</code>, <code>.card</code>, and <code>.container</code> to style this preview.</p>
        <button>Explore styles</button>
      </section>
      <div class="container">
        <div class="card">
          <h2>Card title</h2>
          <p>This card uses <code>.card</code> styles and shows text, lists, and links.</p>
          <ul class="demo-list">
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
          </ul>
          <a href="#">Read more</a>
        </div>
        <div class="box">A div.box element</div>
      </div>
      <p>Try styling the <code>body</code>, <code>h1</code>, and <code>.container</code> elements too.</p>
      <input type="text" placeholder="Search PolyCode" />
    </div>
  </body>
</html>`),
  );
}

// ─── XML ─────────────────────────────────────────────────────────────────────

export function runXML(code) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, 'text/xml');
    const err2 = doc.querySelector('parsererror');
    if (err2) return Promise.resolve(err(`XML Parse Error: ${err2.textContent}`));
    const serializer = new XMLSerializer();
    return Promise.resolve(ok(serializer.serializeToString(doc)));
  } catch (e) { return Promise.resolve(err(e.message)); }
}

// ─── Regex tester ─────────────────────────────────────────────────────────────

export function runRegex(code) {
  try {
    // Expect format:  /pattern/flags\n---\ntest string
    const [regexPart, ...testParts] = code.split(/\n---+\n/);
    const testStr = testParts.join('\n') || 'test string here';
    const m = regexPart.trim().match(/^\/(.*)\/([gimsuy]*)$/);
    if (!m) return Promise.resolve(err('Format: /pattern/flags\n---\ntest string'));
    const matches = [...testStr.matchAll(new RegExp(m[1], m[2] + 'g'))];
    const lines = [`Pattern: ${regexPart.trim()}`, `Test: "${testStr.substring(0, 100)}"`, `Test matches: ${matches.length}`, ''];
    matches.forEach((match, i) => {
      lines.push(`Match ${i + 1}: "${match[0]}" at index ${match.index}`);
      match.slice(1).forEach((g, gi) => lines.push(`  Group ${gi + 1}: "${g}"`));
    });
    return Promise.resolve(ok(lines.join('\n') || 'No matches'));
  } catch (e) { return Promise.resolve(err(e.message)); }
}

// ─── Server-style local simulation (no API/backend) ──────────────────────────

function extractQuotedText(s = '') {
  const out = [];
  const re = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const raw = m[1] ?? m[2] ?? m[3] ?? '';
    out.push(
      raw
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
    );
  }
  return out;
}

function firstNonEmptyLine(code) {
  const lines = code.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function makeSimulationHeader(language) {
  return `ℹ Running ${language} in local browser simulation mode (no API/backend).`;
}

function runServerLanguageLocally(language, code) {
  try {
    const header = makeSimulationHeader(language);
    const lowerLang = language.toLowerCase();

    if (
      (lowerLang === "cpp" || lowerLang === "c++" || lowerLang === "c") &&
      (/\bcin\s*>>/.test(code) || /\bscanf\s*\(/.test(code))
    ) {
      return Promise.resolve(
        ok(
          [
            header,
            "",
            "⚠️  This program uses interactive input (cin / scanf).",
            "Browser mode cannot compile or run it — only static print lines are simulated.",
            "",
            "To run it properly:",
            "• Fill in the Program input (stdin) panel below (one value per line)",
            "• Ensure the PolyCode backend is running — it will compile with g++",
            "",
            "For quick tests without input, assign values directly:",
            "  int num = 10;  // instead of cin >> num;",
          ].join("\n"),
        ),
      );
    }

    const lines = code.split('\n');
    const out = [];
    const pushTexts = (texts) => texts.forEach(t => out.push(t));

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (/^printf\s*\(/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/std::cout\s*<</.test(line) || /cout\s*<</.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/System\.out\.print/.test(line) || /System\.out\.println/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/fmt\.Print/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/println!\s*\(/.test(line) || /print!\s*\(/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/^\s*puts\s+/.test(line) || /^\s*print\s+/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/^\s*echo\s+/.test(line) && (lowerLang === 'bash' || lowerLang === 'batch' || lowerLang === 'shell' || lowerLang === 'sh')) {
        const txt = line.replace(/^echo\s+/i, '').replace(/^@/g, '').trim();
        if (txt) out.push(txt);
        continue;
      }
      if (/^\s*println\s*\(/.test(line) || /^\s*print\s*\(/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/Console\.Write/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/Write-Host|Write-Output/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/^\s*cat\s*\(/.test(line)) {
        pushTexts(extractQuotedText(line));
        continue;
      }
      if (/^\s*print\s+["']/.test(line) && lowerLang === 'perl') {
        pushTexts(extractQuotedText(line));
      }
    }

    if (out.length) {
      return Promise.resolve(ok([header, '', ...out].join('\n')));
    }

    const hint = [
      header,
      '',
      'No direct print statement was detected.',
      'Supported output patterns include:',
      '• C/C++: printf(...), cout << ...',
      '• Java/Kotlin/Scala/C#: println(...), System.out.println(...), Console.WriteLine(...)',
      '• Go/Rust: fmt.Println(...), println!(...)',
      '• Shell/Batch/PowerShell: echo, Write-Host',
      '',
      `First code line: ${firstNonEmptyLine(code) || '(empty)'}`,
    ];
    return Promise.resolve(ok(hint.join('\n')));
  } catch (e) {
    return Promise.resolve(err(`Simulation Error: ${e.message}`));
  }
}

// ─── Server-side fallback message ─────────────────────────────────────────────

export function runUnsupported(language) {
  return Promise.resolve({
    stdout: '',
    stderr: [
      `ℹ  ${language} requires a server-side runtime.`,
      ``,
      `This playground runs 100% in your browser.`,
      ``,
      `Browser-supported languages:`,
      `  ✓  JavaScript / TypeScript`,
      `  ✓  Python  (Pyodide WASM)`,
      `  ✓  HTML / CSS`,
      `  ✓  SQL  (SQLite via sql.js)`,
      `  ✓  JSON / XML`,
      `  ✓  Markdown`,
      `  ✓  Brainfuck`,
      `  ✓  Regex tester`,
    ].join('\n'),
    error: null,
  });
}

// ─── Language registry ────────────────────────────────────────────────────────

export const LANGUAGE_REGISTRY = {
  // Browser-native
  javascript: { label: 'JavaScript', icon: '🟨', engine: 'js', mono: 'javascript', browserNative: true },
  js: { label: 'JavaScript', icon: '🟨', engine: 'js', mono: 'javascript', browserNative: true },
  jsx: { label: 'JSX', icon: '⚛️', engine: 'jsx', mono: 'javascript', browserNative: true },
  typescript: { label: 'TypeScript', icon: '🔷', engine: 'ts', mono: 'typescript', browserNative: true },
  ts: { label: 'TypeScript', icon: '🔷', engine: 'ts', mono: 'typescript', browserNative: true },
  tsx: { label: 'TSX', icon: '🔷', engine: 'tsx', mono: 'typescript', browserNative: true },
  python: { label: 'Python', icon: '🐍', engine: 'py', mono: 'python', browserNative: true },
  py: { label: 'Python', icon: '🐍', engine: 'py', mono: 'python', browserNative: true },
  html: { label: 'HTML', icon: '🌐', engine: 'html', mono: 'html', browserNative: true },
  css: { label: 'CSS', icon: '🎨', engine: 'css', mono: 'css', browserNative: true },
  sql: { label: 'SQL', icon: '🗄️', engine: 'sql', mono: 'sql', browserNative: true },
  json: { label: 'JSON', icon: '📦', engine: 'json', mono: 'json', browserNative: true },
  xml: { label: 'XML', icon: '📋', engine: 'xml', mono: 'xml', browserNative: true },
  markdown: { label: 'Markdown', icon: '📝', engine: 'md', mono: 'markdown', browserNative: true },
  md: { label: 'Markdown', icon: '📝', engine: 'md', mono: 'markdown', browserNative: true },
  brainfuck: { label: 'Brainfuck', icon: '🧠', engine: 'bf', mono: 'plaintext', browserNative: true },
  bf: { label: 'Brainfuck', icon: '🧠', engine: 'bf', mono: 'plaintext', browserNative: true },
  regex: { label: 'Regex', icon: '🔍', engine: 'regex', mono: 'plaintext', browserNative: true },
  php: { label: 'PHP', icon: '🐘', engine: 'php', mono: 'php', browserNative: true },
  // Server-side
  c: { label: 'C', icon: '⚙️', engine: 'server', mono: 'c', browserNative: false },
  cpp: { label: 'C++', icon: '💠', engine: 'server', mono: 'cpp', browserNative: false },
  'c++': { label: 'C++', icon: '💠', engine: 'server', mono: 'cpp', browserNative: false },
  java: { label: 'Java', icon: '☕', engine: 'server', mono: 'java', browserNative: false },
  go: { label: 'Go', icon: '🐹', engine: 'server', mono: 'go', browserNative: false },
  rust: { label: 'Rust', icon: '🦀', engine: 'server', mono: 'rust', browserNative: false },
  rs: { label: 'Rust', icon: '🦀', engine: 'server', mono: 'rust', browserNative: false },
  ruby: { label: 'Ruby', icon: '💎', engine: 'server', mono: 'ruby', browserNative: false },
  rb: { label: 'Ruby', icon: '💎', engine: 'server', mono: 'ruby', browserNative: false },
  bash: { label: 'Bash', icon: '🖥️', engine: 'server', mono: 'shell', browserNative: false },
  shell: { label: 'Shell', icon: '🖥️', engine: 'server', mono: 'shell', browserNative: false },
  sh: { label: 'Shell', icon: '🖥️', engine: 'server', mono: 'shell', browserNative: false },
  batch: { label: 'Batch', icon: '🪟', engine: 'server', mono: 'bat', browserNative: false },
  bat: { label: 'Batch', icon: '🪟', engine: 'server', mono: 'bat', browserNative: false },
  cmd: { label: 'Batch', icon: '🪟', engine: 'server', mono: 'bat', browserNative: false },
  kotlin: { label: 'Kotlin', icon: '🎯', engine: 'server', mono: 'kotlin', browserNative: false },
  swift: { label: 'Swift', icon: '🍎', engine: 'server', mono: 'swift', browserNative: false },
  csharp: { label: 'C#', icon: '🔵', engine: 'server', mono: 'csharp', browserNative: false },
  cs: { label: 'C#', icon: '🔵', engine: 'server', mono: 'csharp', browserNative: false },
  dart: { label: 'Dart', icon: '🎯', engine: 'server', mono: 'dart', browserNative: false },
  r: { label: 'R', icon: '📊', engine: 'server', mono: 'r', browserNative: false },
  perl: { label: 'Perl', icon: '🐪', engine: 'server', mono: 'perl', browserNative: false },
  scala: { label: 'Scala', icon: '⭕', engine: 'server', mono: 'scala', browserNative: false },
  lua: { label: 'Lua', icon: '🌙', engine: 'server', mono: 'lua', browserNative: false },
  powershell: { label: 'PowerShell', icon: '🔷', engine: 'server', mono: 'powershell', browserNative: false },
  ps1: { label: 'PowerShell', icon: '🔷', engine: 'server', mono: 'powershell', browserNative: false },
};

export function resolveEngine(language = '') {
  const key = language.toLowerCase().replace(/^language-/, '').trim();
  return LANGUAGE_REGISTRY[key] || { label: key || 'text', icon: '📄', engine: 'server', mono: 'plaintext', browserNative: false };
}

/**
 * Master dispatch
 */
export async function executeCode(code, language, stdin = '') {
  const { engine, label } = resolveEngine(language);
  switch (engine) {
    case 'js':
      if (looksLikeJsx(code)) return runJSX(code);
      return runJavaScript(code);
    case 'jsx': return runJSX(code);
    case 'tsx': return runTSX(code);
    case 'ts': return runTypeScript(code);
    case 'html': return runHTML(code);
    case 'css': return runCSS(code);
    case 'json': return runJSON(code);
    case 'xml': return runXML(code);
    case 'md': return runMarkdown(code);
    case 'sql': return runSQL(code);
    case 'bf': return runBrainfuck(code);
    case 'regex': return runRegex(code);
    case 'php': return runPHP(code);
    case 'py': return runPython(code, stdin);
    case 'server': return runServerLanguageLocally(label, code);
    default: return runUnsupported(label);
  }
}

export { JS_EXECUTION_TIMEOUT_MS } from "./jsRunner";