import { defineConfig, type PluginOption } from "vite";
// import { fileURLToPath } from "node:url";
// import { dirname, resolve } from "node:path";
import pakframe from "pakframe/vite"

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const toAbsolute = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [pakframe() as PluginOption],
  resolve: {
    // alias: {
    //   "@jsx": toAbsolute("../../src/jsx"),
    // },
  },
  // esbuild: {
  //   jsx: "automatic",
  //   jsxImportSource: "pakframe/jsx",
  // },
});
