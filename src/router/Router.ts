import { add, h, memo, effect } from "@core";
import type { DOMElement, MaybeChildNode } from "../types/types";
import { isServer } from "../util";
import { routerState, setRouterState } from "./state";
import { matchRoute } from "./matchRoute";
import { executeLifecycle } from "../helpers/router-helpers";
import { unwrap } from "./unwrap";
import { hydrate } from "@core";
import { Head, initializeHeadTags } from "../meta";
import type { ComponentFn, ComponentModule } from "./types";

let isConnected = false;

export const Router = (initialProps = /* istanbul ignore next */ {}) => {
  /* istanbul ignore next - try again later */
  const props = Object.fromEntries(
    Object.entries(initialProps).filter(([_, val]) => val !== undefined),
  );
  const wrapper = h("main", { ...props, "data-root": true });
  const mainLayout = () => {
    const route = matchRoute(routerState.pathname);
    /* istanbul ignore else */
    if (!route) {
      add(wrapper, h("div", "No Route Found"));
      return wrapper;
    }

    routerState.params = route.params || {};
    // Server-side or async component: use renderComponent
    if (isServer) {
      const renderComponent = async () => {
        try {
          const module = await route.component();
          const component = typeof module.component === "function"
            ? module.component()
            : /* istanbul ignore next */ module.component;

          await executeLifecycle(module, route.params);
          add(wrapper, unwrap(component).children as MaybeChildNode[]);
          return wrapper;
        } catch (error) {
          /* istanbul ignore next */
          console.error("  ➜  Router error:", error);
          /* istanbul ignore next */
          add(wrapper, h("div", "Error loading page"));
          return wrapper;
        }
      };

      return renderComponent();
    }

    const root = document.querySelector("[data-root]");
    // istanbul ignore else - cannot test unmount
    if (!isConnected || !root) {
      initializeHeadTags();
      globalThis.addEventListener(
        "popstate",
        // istanbul ignore next - cannot test
        (e: Event) => {
          const location = (e.target as Window)?.location;
          const oldPath = routerState.pathname;
          // istanbul ignore next - cannot test
          if (location.pathname !== oldPath) {
            setRouterState(location.pathname, location.search);
          }
        },
      );
    }

    // Client-side lazy component, lifeCycle is already executed on the server
    // or when A component has been clicked in the client
    if (root) {
      // this case is when root is server side rendered
      const children = () => {
        const module = route.component();
        executeLifecycle(module, route.params);
        // istanbul ignore next - cannot test
        const cp = (Array.isArray(module) || module instanceof Element)
          ? module as DOMElement[]
          : typeof (module as unknown as ComponentModule).component === "function"
            ? (module as unknown as ComponentModule & { component: ComponentFn }).component()
            : (module as unknown as ComponentModule).component;

        isConnected = true;
        // istanbul ignore else
        if (document.head) {
          hydrate(document.head, Head());
        }

        return cp ? Array.from(unwrap(cp).children) : [];
      };

      add(wrapper, children() as MaybeChildNode[]);
      return wrapper;
    }
    // this case is when root is for SPA apps
    const csrRoute = memo(() => {
      const p = routerState.pathname;
      return matchRoute(p);
    });

    const children = () => {
      const route = csrRoute();
      // istanbul ignore if - can only be tested in client
      if (!route) return [h("div", "No Route Found")];
      const module = route.component();
      executeLifecycle(module, route.params);
      // istanbul ignore next - cannot test all cases
      const cp = (Array.isArray(module) || module instanceof Element)
        ? module as DOMElement[]
        : typeof (module as unknown as ComponentModule).component === "function"
          ? (module as unknown as ComponentModule & { component: ComponentFn }).component()
          : (module as unknown as ComponentModule).component;
      return cp
        ? Array.from(unwrap(cp).children)
        : /* istanbul ignore next */[];
    };

    effect(() => {
      const kudos = children();
      // istanbul ignore else
      if (isConnected) add(wrapper, kudos as MaybeChildNode[]);

      isConnected = true;
      // istanbul ignore else
      if (document.head) hydrate(document.head, Head());
    })

    return wrapper;
  };

  return mainLayout();
};
