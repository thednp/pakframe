import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const toAbsolute = (p: string) => resolve(__dirname, p);

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "pakframe",
  },
});
