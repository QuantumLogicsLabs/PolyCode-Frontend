/**
 * Node module resolve hook: lets plain Node import the curriculum files, which
 * use CRA-style extension-less relative imports ("./chapter1" → "./chapter1.js").
 */
import fs from "fs";
import { fileURLToPath } from "url";

const SUFFIXES = ["", ".js", ".jsx", "/index.js"];

export async function resolve(specifier, context, nextResolve) {
  if (/^\.{1,2}\//.test(specifier) && context.parentURL) {
    const base = new URL(specifier, context.parentURL).href;
    for (const suffix of SUFFIXES) {
      const url = new URL(base + suffix);
      try {
        if (fs.statSync(fileURLToPath(url)).isFile()) {
          return nextResolve(url.href, context);
        }
      } catch {
        // try the next suffix
      }
    }
  }
  return nextResolve(specifier, context);
}
