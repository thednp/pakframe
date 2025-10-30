import { PluginOption } from "vite";

//#region src/vite/types.d.ts
// vite/types.ts
type PackframePluginOptions = {
  routesDir: string;
  extensions: string[];
};
//#endregion
//#region src/vite/index.d.ts
declare function PackframePlugin(options?: PackframePluginOptions): PluginOption;
//#endregion
export { PackframePlugin as default };
//# sourceMappingURL=vite.d.cts.map