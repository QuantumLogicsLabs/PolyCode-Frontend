#!/usr/bin/env node
/**
 * Copies the Ruby WASM loader + binary into public/ so the app can run Ruby
 * from the same origin (avoids CDN/CSP blocks and CRA ESM resolution issues).
 *
 * On Vercel/CI, a failed WASM download must NOT fail the whole site build —
 * Ruby lessons can fall back to CDN at runtime.
 */
const fs = require("fs");
const path = require("path");

const VERSION = "2.9.3-2.9.4";
const WASM_URLS = [
  process.env.RUBY_WASM_URL,
  `https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@${VERSION}/dist/ruby+stdlib.wasm`,
  `https://unpkg.com/@ruby/3.4-wasm-wasi@${VERSION}/dist/ruby+stdlib.wasm`,
].filter(Boolean);
const DEST_DIR = path.join(__dirname, "../public/ruby");
const DEST_FILE = path.join(DEST_DIR, "ruby-stdlib.wasm");
const UMD_SRC = path.join(
  __dirname,
  "../node_modules/@ruby/wasm-wasi/dist/browser.umd.js",
);
const UMD_DEST = path.join(DEST_DIR, "browser.umd.js");
const MIN_BYTES = 1_000_000;
const SKIP_DOWNLOAD =
  process.env.SKIP_RUBY_WASM_DOWNLOAD === "1" ||
  process.env.SKIP_RUBY_WASM_DOWNLOAD === "true";

function softFail(message) {
  console.warn(`[copy-ruby-wasm] ${message}`);
  console.warn(
    "[copy-ruby-wasm] Continuing build — Ruby lessons may use CDN fallback.",
  );
}

function copyRubyLoader() {
  if (!fs.existsSync(UMD_SRC)) {
    softFail(
      "Missing @ruby/wasm-wasi. Run npm install in the frontend folder first.",
    );
    return false;
  }

  fs.mkdirSync(DEST_DIR, { recursive: true });
  const raw = fs.readFileSync(UMD_SRC, "utf8");
  // Force the UMD bundle onto globalThis even when webpack/CRA defines
  // `module`, `exports`, or AMD `define` in the page.
  const patched =
    "var module=void 0,exports=void 0,define=void 0;\n" + raw;
  fs.writeFileSync(UMD_DEST, patched);
  console.log("Ruby WASM loader ready at public/ruby/browser.umd.js");
  return true;
}

async function downloadWasm(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < MIN_BYTES) {
      throw new Error("Downloaded file looks invalid (too small)");
    }
    return bytes;
  } finally {
    clearTimeout(timeout);
  }
}

async function ensureWasmBinary() {
  fs.mkdirSync(DEST_DIR, { recursive: true });

  if (fs.existsSync(DEST_FILE)) {
    const { size } = fs.statSync(DEST_FILE);
    if (size >= MIN_BYTES) {
      console.log(
        `Ruby WASM already present (${(size / 1024 / 1024).toFixed(1)} MB)`,
      );
      return;
    }
    fs.unlinkSync(DEST_FILE);
  }

  if (SKIP_DOWNLOAD) {
    softFail("SKIP_RUBY_WASM_DOWNLOAD is set — skipping binary download.");
    return;
  }

  console.log("Downloading Ruby WASM for local/production hosting...");
  let lastError = null;
  for (const url of WASM_URLS) {
    try {
      console.log(`Trying ${url}`);
      const bytes = await downloadWasm(url);
      fs.writeFileSync(DEST_FILE, bytes);
      console.log(
        `Ruby WASM ready at public/ruby/ruby-stdlib.wasm (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`,
      );
      return;
    } catch (error) {
      lastError = error;
      console.warn(`Download failed: ${error.message || error}`);
    }
  }

  softFail(
    `Could not download Ruby WASM (${lastError?.message || lastError || "unknown error"}).`,
  );
}

async function main() {
  const loaderOk = copyRubyLoader();
  if (!loaderOk) return;
  await ensureWasmBinary();
}

main().catch((error) => {
  softFail(error.message || String(error));
  // Never fail the CRA/Vercel build because of optional Ruby assets.
  process.exit(0);
});
