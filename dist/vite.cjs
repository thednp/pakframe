const require_chunk = require('./chunk-CUT6urMc.cjs');
const node_path = require_chunk.__toESM(require("node:path"));
const node_url = require_chunk.__toESM(require("node:url"));
const vite = require_chunk.__toESM(require("vite"));
const pakframe_router = require_chunk.__toESM(require("pakframe/router"));
const node_fs = require_chunk.__toESM(require("node:fs"));
const node_fs_promises = require_chunk.__toESM(require("node:fs/promises"));

//#region src/helpers/fs-helpers.ts
/**
* Get the file most probable route path for a given potential route.
*/
const fileToRoute = (file, routesDir) => {
	const cleanPath = file.slice(routesDir.length + 1).replace(/\.(jsx|tsx|ts|js)$/, "").replace(/index$/, "").replace(/\(.*\)$/, "").replace(/\([^)]+\)\/?/g, "").replace(/\[\.\.\.[^\]]+\]/g, "*").replace(/\[([^\]]+)\]/g, ":$1");
	const slashPath = cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;
	const path = slashPath === "*" ? slashPath : slashPath?.length > 0 ? `/${slashPath}` : "/";
	return path;
};
/**
* Identify all files in a folder.
*/
const globFiles = async (dir, extensions) => {
	const files = [];
	async function scan(directory) {
		if (!(0, node_fs.existsSync)(directory)) return;
		const entries = await (0, node_fs_promises.readdir)(directory, { withFileTypes: true });
		if (!entries.length) return;
		for (const entry of entries) {
			const fullPath = (0, node_path.join)(directory, entry.name);
			// istanbul ignore else
			if (entry.isDirectory()) await scan(fullPath);
			else if (entry.isFile()) {
				// istanbul ignore else
				if (extensions.some((ext) => entry.name.endsWith(ext))) files.push(fullPath);
			}
		}
	}
	await scan(dir);
	return files;
};
const normalizePathRegExp = new RegExp(`\\${node_path.win32.sep}`, "g");
function normalizePath(filename) {
	return filename.replace(normalizePathRegExp, node_path.posix.sep);
}
/**
* Scan routes directory and generate routes.
*/
const scanRoutes = async (config, pluginConfig) => {
	const { routesDir, extensions } = pluginConfig;
	const routesPath = (0, node_path.join)(config.root, routesDir);
	const files = await globFiles(routesPath, extensions);
	if (!files?.length) return [];
	const routes$1 = files.map((file) => ({
		path: normalizePath(file),
		routePath: fileToRoute(file, routesPath)
	}));
	const uniqueRoutes = routes$1.reduce((acc, route) => {
		const existing = acc.find((r) => r.routePath === route.routePath);
		if (!existing || existing.path.includes("(") && !route.path.includes("(")) {
			// istanbul ignore if - should not be possible
			if (existing) acc = acc.filter((r) => r !== existing);
			acc.push(route);
		}
		return acc;
	}, []);
	return uniqueRoutes;
};
/**
* Find all layout files for a given route.
*/
const findLayouts = (routePath, config, pluginConfig) => {
	const { routesDir, extensions } = pluginConfig;
	const layouts = [];
	let dir = (0, node_path.dirname)(routePath);
	const routesPath = (0, node_path.join)(config.root, routesDir);
	while (dir.startsWith(routesPath) && dir !== routesPath) {
		let layoutFile = null;
		const dirName = dir.split(/[/\\]/).pop();
		// istanbul ignore else
		if (dirName) for (const ext of extensions) {
			const layoutPaths = [(0, node_path.join)((0, node_path.dirname)(dir), `${dirName}${ext}`), (0, node_path.join)((0, node_path.dirname)(dir), `(${dirName.replace(/^\((.*)\)$/, "$1")})${ext}`)];
			for (const path of layoutPaths) if ((0, node_fs.existsSync)(path)) {
				layoutFile = path;
				break;
			}
		}
		// istanbul ignore else
		if (layoutFile && layoutFile !== routePath) layouts.unshift({
			id: `Layout${layouts.length}`,
			path: layoutFile
		});
		dir = (0, node_path.dirname)(dir);
	}
	return layouts;
};
const processLayoutRoutes = (routes$1, config, pluginConfig) => {
	if (!routes$1.length) return [];
	return routes$1.map((route) => {
		const layouts = findLayouts(route.path, config, pluginConfig);
		return {
			...route,
			layouts
		};
	});
};
/**
* Scan and process routes and return them
*/
const getRoutes = async (config, pluginConfig) => {
	const routes$1 = await scanRoutes(config, pluginConfig);
	return processLayoutRoutes(routes$1, config, pluginConfig);
};
const generateRouteProloaders = (route) => {
	const moduleName = "PageModule";
	const layoutName = "Module";
	return `{
    preload: async (params) => {
      ${route.layouts?.map((layout) => `if (${layout.id + layoutName}?.route?.preload) await ${layout.id + layoutName}?.route?.preload(params);`).join("\n      ")}
      if (${moduleName}?.route?.preload) await ${moduleName}?.route?.preload(params);
    },
    load: async (params) => {
      ${route.layouts?.map((layout) => `if (${layout.id + layoutName}?.route?.load) await ${layout.id + layoutName}?.route?.load(params);`).join("\n      ")}
      if (${moduleName}?.route?.load) await ${moduleName}?.route?.load(params);
    }
  }`;
};
const generateComponentRoute = (route) => {
	if (route.layouts?.length > 0) {
		const layoutImports = route.layouts.map((layout) => `const ${layout.id}Module = await import('${JSON.stringify(layout.path)}');\nconst ${layout.id}Page = ${layout.id}Module.Layout || ${layout.id}Module.Page || ${layout.id}Module.default;`).join("\n");
		const pageComponent = route.layouts.reduce((acc, layout) => `${layout.id}Page({ children: ${acc} })`, "Page()");
		return `lazy(() => {
      const importFn = async () => {
        ${layoutImports}
        const PageModule = await import('${JSON.stringify(route.path)}');
        const Page = PageModule?.Page || PageModule?.default;
  
        return Promise.resolve({
          route: ${generateRouteProloaders(route)},
          Page: () => ${pageComponent},
        });
      };
      return importFn();
    })`;
	}
	return `lazy(() => import('${route.path}'))`;
};
const generateRoute = (route) => {
	return `Route({
    path: ${JSON.stringify(route.routePath)},
    component: ${generateComponentRoute(route)},
  });`;
};

//#endregion
//#region src/vite/index.ts
const __filename$1 = (0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href);
const __dirname$1 = (0, node_path.dirname)(__filename$1);
const toAbsolute = (p) => (0, node_path.resolve)(__dirname$1, p);
const pluginDefaults = {
	routesDir: "src/routes",
	extensions: [
		".tsx",
		".jsx",
		".ts",
		".js"
	]
};
function PackframePlugin(options) {
	const pluginConfig = {
		...pluginDefaults,
		...options
	};
	const { routesDir } = pluginConfig;
	let config;
	let routeCache = null;
	const routesVirtualModuleId = "virtual:@pakframe/routes";
	const resolvedRoutesVirtualModuleId = "\0" + routesVirtualModuleId;
	const virtualSSRModuleId = "virtual:@pakframe/ssr";
	const resolvedVirtualSSRModuleId = "\0" + virtualSSRModuleId;
	return {
		name: "pakframe",
		enforce: "pre",
		config() {
			return {
				ssr: {
					noExternal: [
						"pakframe",
						"pakframe/*",
						"@core",
						"@ssr"
					],
					external: []
				},
				resolve: { alias: { "@core": toAbsolute("index") } },
				esbuild: {
					jsx: "automatic",
					jsxImportSource: "pakframe"
				}
			};
		},
		configResolved(resolvedConfig) {
			config = resolvedConfig;
		},
		configureServer(server) {
			const pagesPath = (0, node_path.join)(config.root, routesDir);
			const changeHandler = (file) => {
				// istanbul ignore else
				if (file.startsWith(pagesPath)) {
					pakframe_router.routes.length = 0;
					routeCache = null;
					const module$1 = server.moduleGraph.getModuleById(resolvedRoutesVirtualModuleId);
					// istanbul ignore else
					if (module$1) server.moduleGraph.invalidateModule(module$1);
					server.ws.send({ type: "full-reload" });
				}
			};
			server.watcher.add(pagesPath);
			server.watcher.on("add", changeHandler);
			server.watcher.on("addDir", changeHandler);
			server.watcher.on("unlink", changeHandler);
			server.watcher.on("unlinkDir", changeHandler);
			server.watcher.on("change", changeHandler);
		},
		resolveId(source, _importer = void 0, ops) {
			const ssr = ops?.ssr;
			if (source === routesVirtualModuleId) return resolvedRoutesVirtualModuleId;
			if (ssr && (source === "pakframe" || source === "@core")) return resolvedVirtualSSRModuleId;
			return null;
		},
		async load(id, ops) {
			// istanbul ignore else
			if (id === resolvedVirtualSSRModuleId) return `
          export * from 'pakframe/ssr';
        `;
			// istanbul ignore else
			if (id === resolvedRoutesVirtualModuleId) {
				const currentRoutes = routeCache || await getRoutes(config, pluginConfig);
				if (!currentRoutes || !currentRoutes.length) return {
					code: "",
					map: null
				};
				const routesScript = `
import { Route, routes, lazy } from "pakframe/router";
if (routes) {
  routes.length = 0;
}

// Register routes
${currentRoutes.map(generateRoute).join("\n")}
${ops?.ssr && currentRoutes.length ? `console.log(\`  ➜  pakframe/router registered ${currentRoutes.length} routes.\`)` : ""}
`;
				const result = await (0, vite.transformWithEsbuild)(routesScript, id, { loader: "js" });
				return {
					code: result.code,
					map: null
				};
			}
			return null;
		}
	};
}

//#endregion
module.exports = PackframePlugin;
//# sourceMappingURL=vite.cjs.map