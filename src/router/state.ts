// router/state.js
import { store } from "../ssr/store";
import { isServer } from "../util";

/**
 * Fix the URL of a route
 */
export const fixRouteUrl = (url?: string) => {
  if (!url) return "/";
  if (url.startsWith("/")) {
    return url;
  }
  return `/${url}`;
};

const initialPath = !isServer ? globalThis.location.pathname : "/";
const initialSearch = !isServer ? globalThis.location.search : "";

type RouterState = {
  pathname: string;
  searchParams: URLSearchParams;
  params: Record<string, string>;
};

/**
 * The global router state.
 */
export const routerState = store<RouterState>({
  pathname: initialPath,
  searchParams: new URLSearchParams(initialSearch),
  params: {},
});

/** */
export const setRouterState = (
  path: string,
  search?: string,
  params?: Record<string, string>,
) => {
  const [pathname, searchParams] = fixRouteUrl(path).split("?");
  routerState.pathname = pathname;
  routerState.searchParams = new URLSearchParams(
    search || searchParams || "",
  );
  routerState.params = params || {};
};
