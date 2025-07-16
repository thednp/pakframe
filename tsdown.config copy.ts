import { defineConfig } from 'tsdown'

export default defineConfig(
  {
    entry: {
      'index': 'src/index.ts',
      'ssr': 'src/ssr/index.ts',
      'meta': 'src/meta/index.ts',
      'router': 'src/router/index.ts',
      'vite': 'src/vite/index.ts',
      'jsx-runtime': 'src/jsx/jsx-runtime.ts',
      'jsx-dev-runtime': 'src/jsx/jsx-dev-runtime.ts',
    },
    noExternal: [
      // "virtual:@pakframe/ssr",
    ],
    external: [
      "csstype", "vite", "rollup", "rolldown",
      "pakframe",
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
