import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { fileURLToPath } from "node:url";

const cfg = {
  external: [
    "node:fs/promises",
    "node:fs",
    "node:path",
    "node:url",
    'csstype',
    'vite',
    'rollup',
    'rolldown',
    'virtual:@pakframe/routes',
    '@thednp/parser',
  ],
  resolve: {
    alias: {
      // "pakframe/ssr": fileURLToPath(new URL("src/ssr", import.meta.url)),
      "@pakframe/router": fileURLToPath(new URL("src/router/index.ts", import.meta.url)),
      // "@pakframe/router": fileURLToPath(new URL("dist/router.js", import.meta.url)),
      "@core": fileURLToPath(new URL("src/core/index.ts", import.meta.url)),
      "@ssr": fileURLToPath(new URL("src/ssr/index.ts", import.meta.url)),
      "@router": fileURLToPath(new URL("src/router/index.ts", import.meta.url)),
    },

  },
  output: {
    format: 'esm',
    dir: 'dist',
    sourcemap: true,
  },
  plugins: [
    dts(),
  ],
};

export default [
  {
    ...cfg,
    input: {
      // index: toAbsolute('src/core/index.ts'),
      index: 'src/core/index.ts',
    },
  },
  {
    ...cfg,
    input: {
      // ssr: toAbsolute('src/ssr/index.ts'),
      ssr: 'src/ssr/index.ts',
    },
  },
  {
    ...cfg,
    input: {
      // meta: toAbsolute('src/meta/index.ts'),
      meta: 'src/meta/index.ts',
    },
  },
  {
    ...cfg,
    input: {
      // router: toAbsolute('src/router/index.ts'),
      router: 'src/router/index.ts',
    },
  },
  {
    ...cfg,
    input: {
      // vite: toAbsolute('src/vite/index.ts'),
      vite: 'src/vite/index.ts',
    },
  },
  {
    ...cfg,
    input: {
      // 'jsx-runtime': toAbsolute('src/jsx/jsx-runtime.ts'),
      'jsx-runtime': 'src/jsx/jsx-runtime.ts',
    },
  },
  {
    ...cfg,
    input: {
      // 'jsx-dev-runtime': toAbsolute('src/jsx/jsx-dev-runtime.ts'),
      'jsx-dev-runtime': 'src/jsx/jsx-dev-runtime.ts',
    },
  },
];