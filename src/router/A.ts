// router/a.mjs
// import { effect, h } from "../core/index";
import { effect, h } from "@core";
import { matchRoute } from "./matchRoute";
import { executeLifecycle, isCurrentPage } from "../helpers/router-helpers";
import { navigate } from "./navigate";
import type {
  DOMNodeAttributes,
  DOMTagNameMap,
  MaybeChildNode,
} from "../types/types";

type AnchorProps =
  & Omit<DOMNodeAttributes<DOMTagNameMap["a"], "a">, "children">
  & {
    children?: MaybeChildNode[];
  };

/** */
export const A = (
  /* istanbul ignore next */ { href, children, ...rest }: AnchorProps = {},
  ...otherChildren: MaybeChildNode[]
) => {
  /* istanbul ignore next - try again later */
  const props = Object.fromEntries(
    Object.entries(rest || {}).filter(([_, val]) => val !== undefined),
  ) as Omit<DOMNodeAttributes<DOMTagNameMap["a"], "a">, "children" | "href">;
  const newProps: Omit<DOMNodeAttributes<DOMTagNameMap["a"], "a">, "children"> =
    {
      href,
      ...props,
      onclick: async (e: MouseEvent) => {
        e.preventDefault();
        const HREF = (typeof href === "function" ? href() : href) as string;
        /* istanbul ignore next */
        if (isCurrentPage(HREF)) return;

        // istanbul ignore else
        if (typeof props.onclick === "function") {
          props.onclick(e);
        }

        const route = matchRoute(HREF)!;
        const module = await route.component();
        await executeLifecycle(module, route.params);

        navigate(HREF);
      },
      onmouseenter: () => {
        const HREF = (typeof href === "function" ? href() : href) as string;

        const route = matchRoute(HREF);

        /* istanbul ignore else */
        if (route?.component) {
          route.component();
        }
      },
    };

  effect(() => {
    const HREF = (typeof href === "function" ? href() : href) as string;

    if (isCurrentPage(HREF)) {
      newProps["aria-current"] = "page";
    }
  });

  return h("a", newProps, children || otherChildren);
};
