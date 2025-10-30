import { ChildAccessor, ChildArray, DOMElement, DOMNodeAttributes, DOMTagNameMap, FunctionMaybe, MaybeChildNode } from "./types-CjexJQM1.cjs";
import "./index-CwAiLVNf.cjs";
import "virtual:@pakframe/routes";

//#region src/router/types.d.ts

// type ComponentProps1<T> =
//   & Props
//   & PropsWithKnownKeys<T>;
// type ComponentProps<K extends keyof HTMLElementTagNameMap> =
//   & Props
//   & PropsWithKnownKeys<HTMLElementTagNameMap[K]>;
// export type VanComponent<
//   K extends keyof HTMLElementTagNameMap = "div",
//   O extends (Record<string, PropValueOrDerived> | undefined) = undefined,
// > = {
//   (
//     props?: O extends object ? ComponentProps<K> & Partial<O>
//       : ComponentProps<K>,
//     ...children: ChildDom[]
//   ): HTMLElementTagNameMap[K];
// };
// router.mjs
/**
 * A virtual component that renders the current route
 * in your VanJS application. It must be used in your main component.
 *
 * @example
 * import { Router } from '@starter/router';
 *
 * export const App = () => {
 *   return Router(); // or <Router /> for JSX
 * }
 */
// export const Router: JSX.Component<HTMLElement> & VanComponent<HTMLElement>;
// export function Router(props?: ComponentProps<HTMLElement>): HTMLElement;
// export function Router(
//   props?: JSX.IntrinsicElements["main"] & { children: null },
// ): HTMLElement;
// export const Router:
//   & VanComponent<"main">
//   & JSX.Component<"main">;
// export const FileSystemRouter:
//   & VanComponent<"main">
//   & JSX.Component<"main">;
// a.mjs
/**
 * A virtual component that creates an anchor element
 * that navigates to the specified href when clicked.
 *
 * @example
 * import { A } from '@starter/router';
 * import van from 'starter-core';
 *
 * export const Navigation = () => {
 *   const { nav } = van.tags
 *   return nav(
 *     A({ href="/" }, "Home"), // or <A href="/">Home</A> with JSX
 *     A({ href="/about" }, "About"), // or <A href="/about">About</A> with JSX
 *     // ...other children
 *   );
 * }
 */
// export const A:
//   & VanComponent<"a">
//   & JSX.Component<"a">;
// helpers.mjs
/**
 * Navigates to the specified href in the client and sets the router state.
 * Keep in mind that the router handles the search params and hash.
 *
 * @param href the URL to navigate to
 * @param options when true, will replace the current history entry
 */
// export const navigate: (
//   href: string,
//   options?: { replace?: boolean },
// ) => void;
/**
 * A client only helper function that reloads the current page.
 */
/**
 * A helper function that redirects the user to the specified href.
 * When called in the server, it will return a function that will redirect the user
 * to the specified href when called.
 * @param {string | undefined} href the URL to redirect to
 */
// routes.mjs
type RouteEntry = {
  path: string;
  component: () => Promise<ComponentModule>;
  // component: () => Promise<DynamicModule>;
  params?: Record<string, string>;
  preload?: (params?: Record<string, string>) => boolean | void | Promise<boolean | void>;
  load?: (params?: Record<string, string>) => boolean | void | Promise<boolean | void>;
};
type ImportFn = () => LazyComponent;

/**
 * Registers a lazy component.
 * @param importFn
 */

type RouteProps = {
  path: string;
  params?: Record<string, string>;
  component: ComponentFn | (() => Promise<DynamicModule>);
  //   | ComponentModule["component"];
  // component: ComponentFn | (() => Promise<ComponentModule>);
  preload?: (params?: Record<string, string>) => boolean | void | Promise<boolean | void>;
  load?: (params?: Record<string, string>) => boolean | void | Promise<boolean | void>;
};
type RouteConfig = {
  routePath: string;
  path: string;
  layouts?: LayoutFile[];
};

/**
 * Registers a new route in the router state.
 * @param route the route to register
 *
 * @example
 * import { Route, lazy } from '@starter/router';
 * import Home from './pages/Home';
 * import NotFound from './pages/NotFound';
 *
 * Route({ path: '/', component: Home });
 * Route({ path: '/about', component: lazy(() => import("./pages/About.ts")) });
 * Route({ path: '*', component: NotFound });
 */

// state.mjs
type RouterState = {
  pathname: string;
  searchParams: URLSearchParams;
  params: Record<string, string>;
};
/**
 * A reactive object that holds the current router state.
 * This state is maintained by both server and client.
 */

/**
 * Sets the router state to the specified href.
 * @param href the URL to navigate to
 * @param search the search string
 * @param params the route params object
 */

/**
 * Merge the children of an Element or an array of elements with an optional array of children
 * into the childen prperty of a simple object.
 * @param source
 * @param children
 */

// export type JSXComponentFn = () => JSX.Element;
interface ComponentFn {
  (): DOMElement | DOMElement[];
  isLazy?: boolean;
}
type ComponentModule = {
  component: ComponentFn | DOMElement;
  route?: Pick<RouteEntry, "load" | "preload">;
};
type DynamicModule = {
  Page: ComponentFn;
  default?: ComponentFn;
  route?: Pick<RouteEntry, "load" | "preload">;
};
type LazyComponent = Promise<DynamicModule> & {
  isLazy: boolean;
};
type PageFile = {
  path: string;
  routePath: string;
};
type LayoutFile = {
  id: string;
  path: string;
};
type RouteFile = PageFile & {
  layouts: Array<LayoutFile>;
};
type PluginConfig = {
  routesDir: string;
  extensions: string[];
};
//#endregion
//#region src/router/routes.d.ts
declare const routes: RouteEntry[];
//#endregion
//#region src/router/Route.d.ts
/**
 * Register a new Route entry
 */
declare const Route: (routeProps: RouteProps) => void;
//#endregion
//#region src/router/A.d.ts
type AnchorProps = Omit<DOMNodeAttributes<DOMTagNameMap["a"], "a">, "children"> & {
  children?: MaybeChildNode[];
};
/** */
declare const A: ({
  href,
  children,
  ...rest
}?: AnchorProps, ...otherChildren: MaybeChildNode[]) => any;
//#endregion
//#region src/router/Router.d.ts
declare const Router: (initialProps?: {}) => any;
//#endregion
//#region src/router/state.d.ts
/**
 * Fix the URL of a route
 */
declare const fixRouteUrl: (url?: string) => string;
type RouterState$1 = {
  pathname: string;
  searchParams: URLSearchParams;
  params: Record<string, string>;
};
/**
 * The global router state.
 */
declare const routerState: RouterState$1;
/** */
declare const setRouterState: (path: string, search?: string, params?: Record<string, string>) => void;
//#endregion
//#region src/router/navigate.d.ts
/**
 * Client only navigation utility.
 */
declare const navigate: (path: string, options?: {
  replace: boolean;
}) => void;
//#endregion
//#region src/router/lazy.d.ts
/**
 * Registers a lazy component.
 */
declare const lazy: (importFn: ImportFn) => (() => Promise<ComponentModule>) | LazyComponent;
//#endregion
//#region src/router/cache.d.ts
declare const getCached: (key: ImportFn) => ComponentModule | undefined;
declare const cache: (key: ImportFn, value: ComponentModule) => void;
//#endregion
//#region src/router/unwrap.d.ts
/**
 * Merge the children of an Element or an array of elements with an optional array of children
 * into the childen prperty of a simple object.
 */
declare const unwrap: (source: FunctionMaybe<DOMElement | DOMElement[]>, ...children: MaybeChildNode[]) => {
  children: (string | number | bigint | boolean | symbol | Element | SVGElement | ChildArray | ChildAccessor | null | undefined)[];
};
//#endregion
//#region src/router/extractParams.d.ts
/**
 * Extract route params
 */
declare const extractParams: (pattern: string, path: string) => Record<string, string> | null;
//#endregion
//#region src/helpers/router-helpers.d.ts
/**
 * Check if selected page is the current page;
 */
declare const isCurrentPage: (pageName: string) => boolean;
/**
 * Check if component is a lazy component
 */
declare const isLazyComponent: (component: ComponentFn | (() => LazyComponent)) => component is () => LazyComponent;
/**
 * Execute lifecycle methods preload and / or load
 */
declare const executeLifecycle: ({
  route
}: ComponentModule, params?: Record<string, string>) => Promise<boolean>;
/**
 * Client only reload utility
 * WORK IN PROGRESS
 * @param {boolean} forceFetch - Force fetch from server
 * @returns {void}
 */
/**
 * Isomorphic redirect utility
 * WORK IN PROGRESS
 * @param {string} path - The path to redirect to
 * @param {object} options - Redirect options
 * @param {number} options.status - HTTP status code (server-side only)
 * @param {boolean} options.replace - Whether to replace current history entry (client-side only)
 * @returns {void}
 */

//#endregion
export { A, ComponentFn, ComponentModule, DynamicModule, ImportFn, LayoutFile, LazyComponent, PageFile, PluginConfig, Route, RouteConfig, RouteEntry, RouteFile, RouteProps, Router, RouterState, cache, executeLifecycle, extractParams, fixRouteUrl, getCached, isCurrentPage, isLazyComponent, lazy, navigate, routerState, routes, setRouterState, unwrap };
//# sourceMappingURL=router.d.cts.map