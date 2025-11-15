import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
// import process from "node:process";
import {
  type PluginOption,
  type ResolvedConfig,
  transformWithEsbuild,
  type ViteDevServer,
} from "vite";
import { routes } from "pakframe/router";
import type { RouteFile } from "../router/types";
import { generateRoute, getRoutes } from "../helpers/fs-helpers";
import type { PackframePluginOptions } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const toAbsolute = (p: string) => resolve(__dirname, p);

const pluginDefaults = {
  routesDir: "src/routes",
  extensions: [".tsx", ".jsx", ".ts", ".js"],
};

function PackframePlugin(options?: PackframePluginOptions): PluginOption {
  const pluginConfig = { ...pluginDefaults, ...options };
  const { routesDir } = pluginConfig;

  let config: ResolvedConfig;
  let routeCache: RouteFile[] | null = null;

  const routesVirtualModuleId = "virtual:@pakframe/routes";
  const resolvedRoutesVirtualModuleId = "\0" + routesVirtualModuleId;

  const virtualSSRModuleId = "virtual:@pakframe/ssr";
  const resolvedVirtualSSRModuleId = "\0" + virtualSSRModuleId;

  return {
    name: "pakframe",
    enforce: "pre",
    config() {
      return {
        // optimizeDeps: {
        //   noDiscovery: true,
        //   include: [
        //     "pakframe",
        //     "pakframe/*",
        //     // "pakframe/ssr",
        //     // "pakframe/router",
        //     // "pakframe/meta",
        //     // "pakframe/jsx-runtime",
        //     // "pakframe/jsx-dev-runtime",
        //     "virtual:@pakframe/*"
        //   ],
        // },
        ssr: {
          noExternal: [
            "pakframe",
            "pakframe/*",
            "@core",
            "@ssr",
            // "virtual:@pakframe/*"
          ],
          external: [
            // "virtual:@pakframe/routes",
            // "virtual:@pakframe/router",
            // "@pakframe/fs-routes",
          ],
        },
        resolve: {
          alias: {
            //     "@ssr": toAbsolute("ssr"),
            "@core": toAbsolute("index"),
            //     "@router": toAbsolute("router"),
            //     // "@pakframe": toAbsolute("./index.js"),
            //     // "@pakframe/*": toAbsolute("./"),
            //     // "@pakframe/ssr": toAbsolute("./ssr.js"),
            //     // "@pakframe/router": toAbsolute("../src/router/index.ts"),
            //     "@pakframe/router": fileURLToPath(new URL("./router.js", import.meta.url)),
            //     // "@pakframe/router": toAbsolute("./router"),
            //     // "@pakframe/fs-routes": toAbsolute("./"),
          },
        },
        esbuild: {
          jsx: "automatic",
          jsxImportSource: "pakframe",
        },
      };
    },
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },

    configureServer(server: ViteDevServer) {
      // Watch routes directory
      const pagesPath = join(config.root, routesDir);
      const changeHandler = (file: string) => {
        // istanbul ignore else
        if (file.startsWith(pagesPath)) {
          routes.length = 0;
          routeCache = null;
          const module = server.moduleGraph.getModuleById(
            resolvedRoutesVirtualModuleId,
          );
          // istanbul ignore else
          if (module) {
            server.moduleGraph.invalidateModule(module);
          }
          server.ws.send({ type: "full-reload" });
        }
      };
      server.watcher.add(pagesPath);

      // Handle file changes in pages directory
      // 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'
      server.watcher.on("add", changeHandler);
      server.watcher.on("addDir", changeHandler);
      server.watcher.on("unlink", changeHandler);
      server.watcher.on("unlinkDir", changeHandler);
      server.watcher.on("change", changeHandler);
    },
    resolveId(
      source: string,
      _importer: string | undefined = undefined,
      ops: { ssr?: boolean },
    ) {
      const ssr = ops?.ssr;
      // Handle virtual module
      if (source === routesVirtualModuleId) {
        return resolvedRoutesVirtualModuleId;
      }
      if (ssr && (source === "pakframe" || source === "@core")) {
        return resolvedVirtualSSRModuleId;
        // return "pakframe/ssr"
      }

      return null;
    },
    async load(id: string, ops?: { ssr?: boolean }) {
      // istanbul ignore else
      if (id === resolvedVirtualSSRModuleId) {
        // Dynamically load SSR content (replace with actual SSR logic)
        return `
          export * from 'pakframe/ssr';
        `;
      }
      // istanbul ignore else
      if (id === resolvedRoutesVirtualModuleId) {
        const currentRoutes = routeCache ||
          await getRoutes(config, pluginConfig);
        if (!currentRoutes || !currentRoutes.length) {
          // don't crash the server if no routes are found
          // devs might not use file system router
          return { code: "", map: null };
        }
        // console.log(toAbsolute("./index.js"))
        const routesScript = `
import { Route, routes, lazy } from "pakframe/router";
if (routes) {
  routes.length = 0;
}

// Register routes
${currentRoutes.map(generateRoute).join("\n")}
${
          ops?.ssr && currentRoutes.length
            ? `console.log(\`  ➜  pakframe/router registered ${currentRoutes.length} routes.\`)`
            : /* istanbul ignore next - satisfied */ ""
        }
`;

        const result = await transformWithEsbuild(
          routesScript,
          id,
          { loader: "js" },
        );

        return {
          code: result.code,
          map: null,
        };
      }
      return null;
    },
  };
}

export { PackframePlugin as default };
