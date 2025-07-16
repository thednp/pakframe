import { isServer } from "../util";
import { routerState } from "../router/state";
import type { ComponentFn, ComponentModule, LazyComponent } from "../router/types";

/**
 * Check if selected page is the current page;
 */
export const isCurrentPage = (pageName: string) => {
  return routerState.pathname === pageName;
};

/**
 * Check if component is a lazy component
 */
export const isLazyComponent = (
  component: ComponentFn | (() => LazyComponent),
): component is () => LazyComponent => {
  // Server: Check if it's an async function
  if (isServer && typeof component === "function") {
    return component.constructor.name.includes("AsyncFunction");
  }

  // Client: Check if it's designated as lazy
  return (component as unknown as LazyComponent)?.isLazy === true;
};

/**
 * Execute lifecycle methods preload and / or load
 */
export const executeLifecycle = async (
  { route }: ComponentModule,
  params?: Record<string, string>,
): Promise<boolean> => {
  // istanbul ignore next
  if (!route) return true;
  try {
    if (route?.preload) await route.preload(params);
    if (route?.load) await route.load(params);
    return true;
  } catch (error) {
    // istanbul ignore next
    console.error("Lifecycle execution error:", error);
    // istanbul ignore next
    return false;
  }
};

/**
 * Client only reload utility
 * WORK IN PROGRESS
 * @param {boolean} forceFetch - Force fetch from server
 * @returns {void}
 */
// export const reload = (forceFetch = false) => {
//   if (!isServer) {
//     // Client-side reload
//     if (forceFetch) {
//       window.location.reload();
//     } else {
//       // Soft reload - just update router state
//       const { pathname, search } = window.location;
//       setRouterState(pathname, search);
//     }
//   } else {
//     // Server-side reload - throw error
//     console.error("Reload is not supported on server");
//   }
// };

/**
 * Isomorphic redirect utility
 * WORK IN PROGRESS
 * @param {string} path - The path to redirect to
 * @param {object} options - Redirect options
 * @param {number} options.status - HTTP status code (server-side only)
 * @param {boolean} options.replace - Whether to replace current history entry (client-side only)
 * @returns {void}
 */
// export const redirect = (path, options = {}) => {
//   const { status = 302, replace = true } = options;

//   if (!isServer) {
//     // Client-side redirect
//     navigate(path, { replace });
//   } else {
//     // Server-side redirect
//     const error = new Error(`Redirect to ${path}`);
//     error.status = status;
//     error.location = path;
//     throw error;
//   }
// };

// Utility to handle server-side redirects in your server entry point
// export const handleServerRedirect = (error, res) => {
//   if (error.location && error.status) {
//     res.writeHead(error.status, {
//       Location: error.location,
//       "Content-Type": "text/plain",
//     });
//     res.end(`Redirecting to ${error.location}...`);
//     return true;
//   }
//   return false;
// };
