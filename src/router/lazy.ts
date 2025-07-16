// router/lazy.mjs
// import { signal } from "../core/state";
import { signal } from "@core";
import { isServer } from "../util";
import { cache, getCached } from "./cache";
import type { ComponentModule, ImportFn, LazyComponent } from "./types";

/**
 * Registers a lazy component.
 */
export const lazy = (importFn: ImportFn) => {
  if (isServer) {
    return async () => {
      const cached = getCached(importFn);
      /* istanbul ignore next */
      if (cached) {
        return cached;
      }

      const module = await importFn();
      const component = module?.default || module.Page;
      const result = { component, route: module.route };

      cache(importFn, result);
      return result;
    };
  }

  let initialized = false;
  const [component, setComponent] = signal<
    ComponentModule["component"] | string
  >("Loading..");
  const [route, setRoute] = signal<ComponentModule["route"]>({});

  const load = () => {
    if (initialized) return;

    const cached = getCached(importFn);
    /* istanbul ignore next */
    if (cached) {
      setComponent(cached.component);
      setRoute(cached.route);
      return;
    }

    initialized = true;
    importFn().then(
      (module) => {
        const pageComponent = module?.default || module.Page;
        cache(importFn, { component: pageComponent, route: module.route });
        setComponent(pageComponent);
        setRoute(module.route);
      },
    );
  };

  const lazyComponent = () => {
    load();
    return { component: component(), route: route() };
  };
  lazyComponent.isLazy = true;

  return lazyComponent as unknown as LazyComponent;
};
