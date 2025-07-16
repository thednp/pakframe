import { isServer } from "../util";
import { matchRoute } from "./matchRoute";
import { setRouterState } from "./state";

/**
 * Client only navigation utility.
 */
export const navigate = (
  path: string,
  options: { replace: boolean } = { replace: false },
) => {
  const { replace = false } = options;

  // istanbul ignore else
  if (!isServer) {
    // Client-side navigation
    const url = new URL(path, globalThis.location.origin);
    const route = matchRoute(url.pathname);

    // Update history
    if (replace) {
      globalThis.history.replaceState({}, "", path);
    } else {
      globalThis.history.pushState({}, "", path);
    }

    // Update router state
    setRouterState(url.pathname, url?.search, route?.params);
  } else {
    // Server-side navigation - throw error
    console.error("  ➜  Direct navigation is not supported on server");
  }
};
