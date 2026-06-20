import { getApiBase } from "../../../config/apiBase";
import { executeCode } from "../../playground/services/BrowserExecutor";

function isCompilerUnavailableMessage(message = "") {
  return /g\+\+|compiler.*not|not installed|enoent/i.test(message);
}

function shouldUseBrowserFallback(serverError) {
  if (!serverError) return false;
  if (serverError.name === "TypeError") return true;
  return /failed to fetch|network|fetch/i.test(serverError.message || "");
}

function stripSimulationBanner(stdout = "") {
  const lines = String(stdout).split("\n");
  if (!lines[0]?.includes("local browser simulation")) {
    return stdout;
  }
  return lines.slice(2).join("\n").trim();
}

async function runCppOnServer(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(`${getApiBase()}/challenges/run-cpp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: source }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        payload.message || payload.error || "C++ compiler API failed",
      );
    }
    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("C++ compile timed out. Try shorter code.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function runCppInBrowser(source) {
  const result = await executeCode(source, "cpp");
  return {
    ...result,
    stdout: stripSimulationBanner(result.stdout),
    exitCode: result.error ? 1 : 0,
  };
}

export async function runCppCode(source) {
  let serverFailure = null;

  try {
    const result = await runCppOnServer(source);
    const runtimeError = getCppRuntimeError(result);

    if (!runtimeError) {
      return { result, runtime: "server" };
    }

    if (/compilation error/i.test(runtimeError)) {
      return { result, runtime: "server" };
    }

    if (!isCompilerUnavailableMessage(runtimeError)) {
      return { result, runtime: "server" };
    }

    serverFailure = new Error(runtimeError);
  } catch (error) {
    if (!shouldUseBrowserFallback(error) && !isCompilerUnavailableMessage(error.message)) {
      throw error;
    }
    serverFailure = error;
  }

  try {
    const result = await runCppInBrowser(source);
    return { result, runtime: "browser" };
  } catch (browserError) {
    throw new Error(
      serverFailure?.message ||
        browserError.message ||
        "Could not run C++. Start the backend or check your network.",
    );
  }
}

export function formatCppOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getCppRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.exitCode != null && runResult.exitCode !== 0
      ? runResult.stderr || "Compilation or run failed"
      : "")
  );
}
