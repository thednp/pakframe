import { defineConfig } from 'rolldown';
// Optional: If you need dts generation, you may need a plugin like `@rolldown/plugin-dts`.
import { dts } from 'rolldown-plugin-dts';

export default defineConfig({
  // experimental: {},

  input: {
    index: 'src/index.ts',
    ssr: 'src/ssr/index.ts',
    meta: 'src/meta/index.ts',
    router: 'src/router/index.ts',
    vite: 'src/vite/index.ts',
    'jsx-runtime': 'src/jsx/jsx-runtime.ts',
    'jsx-dev-runtime': 'src/jsx/jsx-dev-runtime.ts',
  },
  external: [
    'csstype',
    'vite',
    'rollup',
    'rolldown',
    'virtual:@pakframe/routes',
    '@thednp/parser',
  ],
  output: {
    format: 'esm', // Rolldown supports 'esm' and 'cjs', but multiple formats require multiple output configs
    dir: 'dist', // Assuming output directory; adjust if needed
    sourcemap: true,
    // globalName: 'pakframe', // Note: Rolldown may not support UMD or globalName directly; comment out or use a plugin if needed
  },
  // For multiple formats (esm, cjs), you may need multiple output configurations
  // output: [
  //   {
  //     format: 'esm',
  //     dir: 'dist/esm',
  //     sourcemap: true,
  //   },
  //   {
  //     format: 'cjs',
  //     dir: 'dist/cjs',
  //     sourcemap: true,
  //   },
  // ],
  // Clean option: Rolldown doesn't have a direct 'clean' option; you may need a plugin like `rollup-plugin-delete`
  // clean: true, // Use a plugin like `rollup-plugin-delete` to clean the dist folder before building
  // DTS generation: Requires a plugin like `@rolldown/plugin-dts`
  plugins: [
    dts(), // Uncomment and add `@rolldown/plugin-dts` if declaration files are needed
  ],
  // skipNodeModulesBundle: No direct equivalent in Rolldown; assuming node_modules are handled by `external`
  // target: 'es2020' is typically handled by TypeScript's tsconfig.json `target` option, not Rolldown
});