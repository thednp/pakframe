// import { add, effect, h, memo } from "../core/index";
import { add, effect, h, memo } from "@core";
import type { DOMElement, MaybeChildNode } from "../types/types";
import { isServer } from "../util";
import { routerState, setRouterState } from "./state";
import { matchRoute } from "./matchRoute";
import { executeLifecycle } from "../helpers/router-helpers";
import { unwrap } from "./unwrap";
import { hydrate } from "../core/hydrate";
import { Head, initializeHeadTags } from "../meta";


let isConnected = false;

export const Router = (initialProps = /* istanbul ignore next */ {}) => {
  // const { div, main } = van.tags;

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
      const children = async () => {
        const module = await route.component();
        executeLifecycle(module, route.params);
        // istanbul ignore next - cannot test
        const cp = (Array.isArray(module) || module instanceof Element)
          ? module as DOMElement[]
          : typeof module.component === "function"
          ? module.component()
          : module.component;
        // istanbul ignore next - cannot test
        const kids = () => cp ? Array.from(unwrap(cp).children) : [];
        const kudos = kids();

        isConnected = true;
        // istanbul ignore else
        if (document.head) {
          hydrate(document.head, Head());
        }

        return kudos;
      };

      add(wrapper, children() as Promise<MaybeChildNode>);
      return wrapper;
    }
    // this case is when root is for SPA apps
    const csrRoute = memo(() => {
      const p = routerState.pathname;
      return matchRoute(p);
    });

    const children = memo(() => {
      const route = csrRoute();
      // istanbul ignore if - can only be tested in client
      if (!route) return [h("div", "No Route Found")];
      const md = route.component();
      executeLifecycle(md, route.params);
      // istanbul ignore next - cannot test all cases
      const cp = (Array.isArray(md) || md instanceof Element)
        ? md
        : typeof md.component === "function"
        ? md.component()
        : md.component;
      return cp
        ? Array.from(unwrap(cp).children)
        : /* istanbul ignore next */ [];
    });

    const component = () => {
      const kids = children();
      const result = () => {
        return (() => {

          hydrate(wrapper, kids);
          isConnected = true;
          // istanbul ignore else
          if (document.head) {
            hydrate(document.head,  Head());
          }
          return wrapper;
        });
      };
      return result();
    };
    const finalResult = component();
    if (finalResult) add(wrapper, finalResult);

    return wrapper;
  };

  return mainLayout();
};
