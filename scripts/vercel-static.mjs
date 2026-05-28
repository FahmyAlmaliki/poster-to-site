import { cp, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");

const clientIndex = path.join(clientDir, "index.html");
const clientAssets = path.join(clientDir, "assets");

const distIndex = path.join(distDir, "index.html");
const distAssets = path.join(distDir, "assets");

async function ensureFile(filePath) {
  try {
    const s = await stat(filePath);
    if (!s.isFile()) throw new Error(`${filePath} is not a file`);
  } catch (err) {
    throw new Error(
      `Expected build output not found: ${filePath}. ` +
        `Make sure TanStack Start prerendering is enabled and build succeeded.`,
      { cause: err },
    );
  }
}

await ensureFile(clientIndex);

// Copy index.html to dist/ root so static hosts that expect dist/index.html work.
await cp(clientIndex, distIndex);

// Copy assets to dist/assets so /assets/* works from dist root.
await rm(distAssets, { recursive: true, force: true });
await cp(clientAssets, distAssets, { recursive: true });

console.log("Postbuild: wrote dist/index.html and dist/assets/*");
