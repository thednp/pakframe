import type { Accessor, DOMElement, DOMTagNameMap, Primitive } from "../types/types";

type PrimitiveChild = Primitive | Accessor<Primitive | undefined | null>;

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
export type RouteEntry = {
  path: string;
  component: () => Promise<ComponentModule>;
  // component: () => Promise<DynamicModule>;
  params?: Record<string, string>;
  preload?: (
    params?: Record<string, string>,
  ) => boolean | void | Promise<boolean | void>;
  load?: (
    params?: Record<string, string>,
  ) => boolean | void | Promise<boolean | void>;
};

export type ImportFn = () => LazyComponent;

/**
 * Registers a lazy component.
 * @param importFn
 */

export type RouteProps = {
  path: string;
  params?: Record<string, string>;
  component:
    | ComponentFn
    | (() => Promise<DynamicModule>);
  //   | ComponentModule["component"];
  // component: ComponentFn | (() => Promise<ComponentModule>);
  preload?: (
    params?: Record<string, string>,
  ) => boolean | void | Promise<boolean | void>;
  load?: (
    params?: Record<string, string>,
  ) => boolean | void | Promise<boolean | void>;
};

export type RouteConfig = {
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
export type RouterState = {
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
export interface ComponentFn {
  (): DOMElement | DOMElement[];
  isLazy?: boolean;
}

export type ComponentModule = {
  component: ComponentFn | DOMElement;
  route?: Pick<RouteEntry, "load" | "preload">;
};

export type DynamicModule = {
  Page: ComponentFn;
  default?: ComponentFn;
  route?: Pick<RouteEntry, "load" | "preload">;
};

export type LazyComponent = Promise<DynamicModule> & { isLazy: boolean };

export type PageFile = { path: string; routePath: string };
export type LayoutFile = { id: string; path: string };
export type RouteFile = PageFile & { layouts: Array<LayoutFile> };
export type PluginConfig = { routesDir: string; extensions: string[] };
