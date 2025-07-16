import type { ComponentModule, ImportFn } from "./types";

const routeCache = new Map<ImportFn, ComponentModule>();

export const getCached = (key: ImportFn) => routeCache.get(key);
export const cache = (key: ImportFn, value: ComponentModule) => {
  routeCache.set(key, value);
};
