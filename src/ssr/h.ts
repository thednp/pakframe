import { createDocument } from "@thednp/domparser";

// src/h.ts
import { setAttribute, setHydrationKey, style } from "./attr";
import type {
  DOMElement,
  DOMNodeAttributes,
  FunctionMaybe,
  MaybeChildNode,
  OutputElement,
  PotentialProps,
  Primitive,
  TagNames,
} from "../types/types";
import { getStringValue, isArray, isFunction, isNode, isObject } from "../util";
import type { Accessor } from "../types/types";

if (typeof document === "undefined") {
  // @ts-expect-error this is server code
  globalThis.document = createDocument();
}

// Append children
export const add = (
  parent: DOMElement,
  child?:
    | FunctionMaybe<RegExp | Date>
    | Accessor<MaybeChildNode>
    | MaybeChildNode
    | Promise<MaybeChildNode>,
) => {
  if (!parent || !child) return;

  if (child instanceof Promise) {
    child.then((resolved) => add(parent, resolved));
  } else if (isArray(child)) {
    child.forEach((c) => add(parent, c));
  } else if (isNode(child)) {
    parent.appendChild(child);
  } else if (isFunction(child)) {
    const textNode = document.createTextNode("");
    parent.appendChild(textNode);
    const realChild = (isFunction(child()) ? child() : child) as Accessor<
      MaybeChildNode
    >;

    const value = realChild();
    if (isArray(value)) {
      parent.textContent = "";
      value.forEach((v) => add(parent, v));
    } else if (isNode(value)) { // Node
      add(parent, child);
    } else { // string | number | bigint | boolean | symbol | Date | RegExp
      textNode.textContent = getStringValue(
        value as Primitive | RegExp | Date,
      );
    }
  } else {
    parent.appendChild(document.createTextNode(getStringValue(child)));
  }
};

export function listen<K extends keyof HTMLElementEventMap>(
  target: DOMElement,
  _event: K,
  _handler:
    & EventListenerObject["handleEvent"]
    & ((e: HTMLElementEventMap[K]) => void),
  _options?: AddEventListenerOptions,
) {
  setHydrationKey(target);
  return true;
}

export function h<K extends TagNames>(
  tagName: K,
  first?: MaybeChildNode | DOMNodeAttributes<PotentialProps<K>, K>,
  ...children: MaybeChildNode[]
): OutputElement<K> {
  const element = document.createElement(tagName) as OutputElement<K>;

  // Handle props if first is an object and not a Node
  if (isObject(first) && !isNode(first) && !isArray(first)) {
    Object.entries(first).forEach(([key, value]) => {
      if (key.startsWith("on")) {
        if (isFunction(value)) setHydrationKey(element);
      } else if (key === "style") {
        style(element, value);
      } else {
        setAttribute(element, key, value);
      }
    });
  } else {
    add(element, first);
  }

  add(element, children);

  return element;
}
