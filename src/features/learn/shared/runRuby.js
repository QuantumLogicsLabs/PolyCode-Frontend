import { getApiBase } from "../../../config/apiBase";
import { loadDefaultRubyVM } from "../../../lib/rubyWasmBrowser";

const LOCAL_RUBY_WASM_URL = `${process.env.PUBLIC_URL || ""}/ruby/ruby-stdlib.wasm`;
const CDN_RUBY_WASM_URLS = [
  "https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@2.9.3-2.9.4/dist/ruby+stdlib.wasm",
  "https://unpkg.com/@ruby/3.4-wasm-wasi@2.9.3-2.9.4/dist/ruby+stdlib.wasm",
];

async function fetchWasmResponse(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response;
}

async function loadRubyWasmModule() {
  const candidates = [LOCAL_RUBY_WASM_URL, ...CDN_RUBY_WASM_URLS];
  let lastError = null;

  for (const url of candidates) {
    try {
      const response = await fetchWasmResponse(url);
      try {
        return await WebAssembly.compileStreaming(response.clone());
      } catch (_) {
        const bytes = await response.arrayBuffer();
        return WebAssembly.compile(bytes);
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    lastError?.message ||
      "Could not load the in-browser Ruby runtime. Re-run npm start in frontend.",
  );
}

let rubyVmPromise = null;

/**
 * Lesson snippets often assign variables without puts/print. Append display lines
 * so learners still see computed values in the output panel.
 */
export function prepareRubyLearnCode(code = "") {
  if (/\b(puts|print|pp)\b/.test(code)) {
    return code;
  }

  const names = [];
  // Only top-level assignments (column 0) — skip locals inside defs/blocks.
  const re = /^([A-Za-z_][\w]*)\s*=/gm;
  let match;
  while ((match = re.exec(code)) !== null) {
    names.push(match[1]);
  }

  const unique = [...new Set(names)];
  if (!unique.length) return code;

  const trailer = unique.map((name) => `puts "${name} = #{${name}}"`).join("\n");
  return `${code.replace(/\s*$/, "")}\n\n${trailer}\n`;
}

function rubyWarningOnly(stderr = "") {
  const lines = stderr
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    lines.length > 0 &&
    lines.every((line) => /warning:/i.test(line) || line.includes("(polycode)"))
  );
}

function buildRubyWrapper(source) {
  let delim = `POLY_${Math.random().toString(36).slice(2, 12)}`;
  while (source.includes(delim)) {
    delim = `POLY_${Math.random().toString(36).slice(2, 12)}`;
  }

  return `
require "stringio"
__polycode_out = StringIO.new
__polycode_err = StringIO.new
$stdout = __polycode_out
$stderr = __polycode_err
begin
  eval(<<-'${delim}', binding, "(polycode)")
${source}
${delim}
rescue Exception => e
  __polycode_err.puts("#{e.class}: #{e.message}")
  if e.backtrace
    e.backtrace.first(8).each { |line| __polycode_err.puts(line) }
  end
ensure
  $polycode_stdout = __polycode_out.string
  $polycode_stderr = __polycode_err.string
  $stdout = STDOUT
  $stderr = STDERR
end
`;
}

async function initRubyVM() {
  if (!rubyVmPromise) {
    rubyVmPromise = (async () => {
      const DefaultRubyVM = await loadDefaultRubyVM();
      const rubyModule = await loadRubyWasmModule();
      const { vm } = await DefaultRubyVM(rubyModule);
      return vm;
    })();
  }

  return rubyVmPromise;
}

function readCapturedOutput(vm) {
  const stdout = vm.eval("$polycode_stdout")?.toString?.() ?? "";
  const stderr = vm.eval("$polycode_stderr")?.toString?.() ?? "";
  return {
    stdout: stdout.trimEnd(),
    stderr: stderr.trimEnd(),
  };
}

async function runRubyInBrowser(source) {
  const vm = await initRubyVM();
  vm.eval(buildRubyWrapper(source));
  const { stdout, stderr } = readCapturedOutput(vm);
  const hasError = stderr && !rubyWarningOnly(stderr);
  const exitCode = hasError ? 1 : 0;

  return {
    stdout,
    stderr,
    error:
      exitCode === 0
        ? null
        : stderr || `Ruby exited with code ${exitCode}`,
    exitCode,
    code: exitCode,
  };
}

async function readJsonResponse(response) {
  const text = await response.text();
  const trimmed = text.trim();
  if (!trimmed) return {};
  if (trimmed.startsWith("<")) {
    throw new Error(
      `Server returned HTML instead of JSON (HTTP ${response.status}).`,
    );
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error("Ruby API returned invalid JSON.");
  }
}

async function runRubyOnServer(source) {
  const endpoints = ["/challenges/run-ruby", "/documents/run-ruby"];
  let lastError = null;

  for (const path of endpoints) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(`${getApiBase()}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: source }),
        signal: controller.signal,
      });

      const payload = await readJsonResponse(response);
      if (!response.ok) {
        lastError = new Error(
          payload.message || payload.error || `Ruby API failed (${path})`,
        );
        if (response.status !== 404) {
          break;
        }
        continue;
      }
      return payload;
    } catch (error) {
      lastError = error;
      if (error.message?.includes("HTML instead of JSON")) {
        break;
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError || new Error("Ruby API unavailable");
}

export async function runRubyCode(code, { learn = false } = {}) {
  const source = learn ? prepareRubyLearnCode(code) : code;
  let serverFailure = null;

  try {
    const result = await runRubyOnServer(source);
    const runtimeError = getRubyRuntimeError(result);
    if (!runtimeError) {
      return { result, runtime: "server" };
    }
    serverFailure = new Error(runtimeError);
  } catch (serverError) {
    if (serverError.name === "AbortError") {
      throw new Error("Ruby run timed out. Try shorter code.");
    }
    serverFailure = serverError;
  }

  try {
    const result = await runRubyInBrowser(source);
    const runtimeError = getRubyRuntimeError(result);
    if (runtimeError) {
      throw new Error(runtimeError);
    }
    return { result, runtime: "browser" };
  } catch (browserError) {
    throw new Error(
      browserError.message ||
        serverFailure?.message ||
        "Could not run Ruby. Check your connection or try again.",
    );
  }
}

export function formatRubyOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getRubyRuntimeError(runResult) {
  const exitCode = runResult?.exitCode ?? runResult?.code;

  return (
    runResult?.error ||
    (exitCode != null && exitCode !== 0
      ? runResult.stderr || "Ruby exited with an error"
      : "")
  );
}
