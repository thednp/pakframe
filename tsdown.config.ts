import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown'

export default defineConfig(
  {
    entry: {
      'index': 'src/core/index.ts',
      'ssr': 'src/ssr/index.ts',
      'meta': 'src/meta/index.ts',
      'router': 'src/router/index.ts',
      'vite': 'src/vite/index.ts',
      'jsx-runtime': 'src/jsx/jsx-runtime.ts',
      'jsx-dev-runtime': 'src/jsx/jsx-dev-runtime.ts',
    },
    alias: {
      // "pakframe/ssr": fileURLToPath(new URL("src/ssr", import.meta.url)),
      "@pakframe/router": fileURLToPath(new URL("src/router/index.ts", import.meta.url)),
      // "@pakframe/router": fileURLToPath(new URL("dist/router.js", import.meta.url)),
      "@core": fileURLToPath(new URL("src/core/index.ts", import.meta.url)),
      "@ssr": fileURLToPath(new URL("src/ssr/index.ts", import.meta.url)),
      "@router": fileURLToPath(new URL("src/router/index.ts", import.meta.url)),
    },
    noExternal: [
      "pakframe",
      // "pakframe/router",
      // "pakframe/ssr",
      // "virtual:@pakframe/ssr",
      // "virtual:@pakframe/routes",
    ],
    external: [
      "csstype", "vite", "rollup", "rolldown",
      // "pakframe",
      // "pakframe/router",
      // "virtual:@pakframe/router",
      "virtual:@pakframe/routes",
      "@thednp/parser",
    ],
    target: "es2020",
    exports: true,
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    skipNodeModulesBundle: true,
    globalName: "pakframe"
  },
);
