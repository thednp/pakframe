// src/h.ts
import { effect, untrack } from "../core/state";
import { setAttribute, style } from "./attr";
import { namespaceElements } from "./ns";
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
import {
  getStringValue,
  isArray,
  isFunction,
  isNode,
  isObject,
} from "../util";
import type { Accessor } from "../types/types";

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
    const realChild = (isFunction(untrack(child as Accessor<Accessor<unknown>>)) ? untrack(child as Accessor<Accessor<unknown>>) : child) as Accessor<
      MaybeChildNode
    >;

    effect(() => {
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
    });
  } else {
    parent.appendChild(document.createTextNode(getStringValue(child)));
  }
};

export const createDomElement = <
  K extends TagNames,
  M = OutputElement<K>,
>(tagName: K) => {
  const ns = namespaceElements[tagName];
  return (ns
      ? document.createElementNS(ns, tagName)
      : document.createElement(tagName)) as M;
};

export function listen<K extends keyof HTMLElementEventMap>(
  target: DOMElement,
  event: K,
  handler:
    & EventListenerObject["handleEvent"]
    & ((e: HTMLElementEventMap[K]) => void),
  options?: AddEventListenerOptions,
) {
  target.addEventListener(event, handler, options);
}

export function h<K extends TagNames>(
  tagName: K,
  first?: MaybeChildNode | DOMNodeAttributes<PotentialProps<K>, K>,
  ...children: MaybeChildNode[]
): OutputElement<K> {
  const element = createDomElement(tagName);

  // Handle props if first is an object and not a Node
  if (isObject(first) && !isNode(first) && !isArray(first)) {
    Object.entries(first).forEach(([key, value]) => {
      if (key.startsWith("on")) {
        if (typeof value !== "function") {
          return;
        }
        const eventName = key.slice(2)
          .toLowerCase() as keyof HTMLElementEventMap;
        listen(element, eventName, value);
      } else if (key === "style") {
        effect(() => style(element, value));
      } else {
        effect(() => setAttribute(element, key, value));
      }
    });
  } else {
    add(element, first);
  }

  add(element, children);

  return element;
}
