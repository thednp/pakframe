import { effect, h } from "../core/index";
import { isFunction, isServer } from "../util";
import { setAttribute, style as setStyle } from "../core/index";
import type {
  DOMNodeAttributes,
  MaybeChildNode,
  PotentialProps,
  PropValueOrAccessor,
  TagNames,
} from "../types/types";
import type { Component, ComponentProps, JSX } from "./types";

const jsx = <K extends TagNames>(
  jsxTag: K | Component<K>,
  { children, ref, style, ...rest }: ComponentProps<K>,
) => {
  if (typeof jsxTag === "string") {
    const element = h(
      jsxTag,
      rest as DOMNodeAttributes<PotentialProps<K>, K>,
      children as MaybeChildNode,
    );

    if (isFunction(ref)) ref(element);
    // else ref = element;

    effect(() => {
      setStyle(element, style);
    });

    for (const [key, value] of Object.entries(rest)) {
      if (key.startsWith("on") && !isServer) {
        const eventName = key.slice(2)
          .toLowerCase() as keyof HTMLElementEventMap;
        element.addEventListener(eventName, value as EventListener);
        continue;
      }

      if (isFunction(value)) {
        effect(() => {
          setAttribute(element, key, value() as PropValueOrAccessor);
        });
        continue;
      }

      setAttribute(element, key, value as PropValueOrAccessor);
    }

    return element;
  }

  return typeof jsxTag === "function"
    ? jsxTag({ children, ref, style, ...rest } as ComponentProps<K>)
    : null;
};

const Fragment = ({ children }: { children: JSX.Element }) => children;

export { type JSX };
export { Fragment, jsx, jsx as createElement, jsx as jsxDEV, jsx as jsxs };
