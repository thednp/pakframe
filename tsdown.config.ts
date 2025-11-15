import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const injectRoutes_ = () => ({
  name: 'inject-routes',
  transform(code: string, id: string, smth, smth1) {
    // Target a specific file by ID (full path)
    if (id.includes('src/router/Router.ts')) {
      // Inject text, e.g., prepend a comment or variable
      code = `import "virtual:@pakframe/routes";\n${code}`;
      // Or more advanced: use regex to insert at a specific line
      console.log("injectRoutes-code:", id, smth, smth1)
    }
    return { code };
  }
});

const injectRoutes = () => ({
  name: 'inject-virtual-import',
  renderChunk(code, chunk) {
    // Target the specific output file (adjust 'some-file.js' to match your chunk)
    if (['index.js', 'ssr.js'].some(fileName => chunk.fileName.includes(fileName))) {
      // Prepend the import at the very beginning
      const injectedCode = `import "virtual:@pakframe/routes";\n${code}`;
      console.log(`Injected import into ${chunk.fileName}`); // Optional: log for verification
      
      return { code: injectedCode };
    }
    if (['index.cjs', 'ssr.cjs'].some(fileName => chunk.fileName.includes(fileName))) {
      // Prepend the import at the very beginning
      const injectedCode = `require("virtual:@pakframe/routes");\n${code}`;
      console.log(`Injected import into ${chunk.fileName}`); // Optional: log for verification
      
      return { code: injectedCode };
    }
    return null; // or { code } to pass through
  }
});

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
    //   // "pakframe/ssr": fileURLToPath(new URL("src/ssr", import.meta.url)),
    //   "@pakframe/router": fileURLToPath(new URL("src/router/index.ts", import.meta.url)),
    //   // "@pakframe/router": fileURLToPath(new URL("dist/router.js", import.meta.url)),
      "@core": fileURLToPath(new URL("src/core/index.ts", import.meta.url)),
      "@ssr": fileURLToPath(new URL("src/ssr/index.ts", import.meta.url)),
    //   "@router": fileURLToPath(new URL("src/router/index.ts", import.meta.url)),
    },
    noExternal: [
      "pakframe",
      // "pakframe/router",
      // "pakframe/ssr",
      // "virtual:@pakframe/ssr",
      "virtual:@pakframe/routes",
    ],
    external: [
      "csstype", "vite", "rollup", "rolldown",
      // "pakframe",
      "pakframe/router",
      // "virtual:@pakframe/router",
      // "virtual:@pakframe/routes",
      "@thednp/parser",
    ],
    plugins: [injectRoutes()],
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
