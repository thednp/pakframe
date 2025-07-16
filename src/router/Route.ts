// router/routes.mjs
import { isLazyComponent } from "../helpers/router-helpers";
import { routes } from "./routes";
import { lazy } from "./lazy";
import type { ComponentModule, RouteProps } from "./types";

/**
 * Register a new Route entry
 */
export const Route = (routeProps: RouteProps) => {
  const { path, component, preload, load, ...rest } = routeProps;

  // istanbul ignore next - no point testing this error
  if (routes.some((r) => r.path === path)) {
    console.error(`  ➜  pakframe/router: duplicated route for "${path}".`);
    return;
  }

  // If component isn't lazy, make it lazy
  if (!isLazyComponent(component)) {
    const wrappedComponent = lazy(() =>
      Promise.resolve({
        Page: component,
        route: { preload, load },
      })
    );
    routes.push({
      ...rest,
      path,
      component: wrappedComponent as (() => Promise<ComponentModule>),
    });
    return;
  }

  // Otherwise keep original component
  routes.push(routeProps);
};
