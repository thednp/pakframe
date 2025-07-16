// src/flow.ts
import type { DOMElement, FunctionMaybe, MaybeChildNode } from "../types/types";
import { isArray, isFunction } from "../util";

export type ListProps<T> = {
  each?: () => T[];
  children?: (item: T) => MaybeChildNode;
};

export const List = <T>(props: ListProps<T>) => {
  const { each, children } = props;
  const placeholder = document.createTextNode("");

  const Layout = () => {
    const items = each ? each() : [];
    const nodes = [];
    if (!children) return;

    for (const item of items) {
      const node = children(item) as DOMElement;
      if (node) nodes.push(node);
    };
    if (nodes.length) return nodes;

    return placeholder as unknown as DOMElement[];
  }

  return Layout();
};

export function Show<T>({
  when,
  children,
}: {
  when: FunctionMaybe<T | boolean>;
  children: () => MaybeChildNode;
}) {
  const placeholder = document.createTextNode("");
  const initialWhen = () => isFunction(when) ? when() : when
  const newNodes = () => {
    const nodes = isFunction(children) ? children() : children;
    return isArray(nodes) ? nodes : [nodes];
  };

  const Layout = () => {
    const condition = initialWhen();
    const nodes = newNodes();
    if (condition && nodes.length) {
      return nodes;
    }
    return placeholder as unknown as MaybeChildNode;
  };

  return Layout();
}
