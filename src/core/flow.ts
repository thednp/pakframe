// src/flow.ts
import type { DOMElement, FunctionMaybe, MaybeChildNode } from "../types/types";
import { effect, untrack } from "./state";
import { isArray, isFunction } from "../util";

export type ListProps<T> = {
  each?: () => T[];
  children?: (item: T) => MaybeChildNode;
};

export const List = <T>(props: ListProps<T>) => {
  const { each, children } = props;
	let parentElement: DOMElement;
  const placeholder = document.createTextNode("");
  const itemMap = new Map<T, DOMElement>();
  const updateItems = (items: T[]) => {
    let marker: DOMElement | Text = placeholder;
    if (!children || !parentElement) return;

    for (const item of items) {
      if (!itemMap.has(item)) {
        const node = children(item) as DOMElement;
        if (node) {
          marker.after(node);
          itemMap.set(item, node);
        }
      }
      marker = itemMap.get(item) ?? placeholder;
    };
  }

  effect(() => {
    const items = each ? each() : [];

    for (const [item, node] of itemMap) {
      if (!items.includes(item)) {
        node.remove();
        itemMap.delete(item);
      }
    }
    updateItems(items)
  });

  queueMicrotask(() => {
    parentElement = placeholder.parentElement as DOMElement;
    if (isFunction(each)) {
      updateItems(untrack(each))
    }
  });

  return placeholder as unknown as DOMElement[];
};

export function Show<T>({
  when,
  children,
}: {
  when: FunctionMaybe<T | boolean>;
  children: MaybeChildNode;
}) {
  const placeholder = document.createTextNode("");
	const initialWhen = () => isFunction(when) ? when() : when;
	const newNodes = () => {
		const nodes = isFunction(children) ? children() : children;
		return isArray(nodes) ? nodes : [nodes];
	};

  effect(() => {
		const condition = initialWhen();
		const nodes = newNodes();
		const nextElementSibling = placeholder.nextElementSibling;
		if (condition && (!nextElementSibling || nextElementSibling !== nodes[0])) {
			placeholder.after(...nodes as DOMElement[]);
		} else if (!condition && placeholder.nextElementSibling === nodes[0]) {
			nodes.forEach((node) => (node as DOMElement).remove());
		}
	});

  return placeholder as unknown as MaybeChildNode;
}
