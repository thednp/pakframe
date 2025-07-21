import { Accessor, CSSProperties, DOMElement, DOMNodeAttributes, FunctionMaybe, MaybeChildNode, ObserverFn, OutputElement, PotentialProps, PropValueOrAccessor, Setter, StoreObject, TagNames } from "./types-pzt1ZtaD.js";

//#region src/core/h.d.ts
declare const add: (parent: DOMElement, child?: FunctionMaybe<RegExp | Date> | Accessor<MaybeChildNode> | MaybeChildNode | Promise<MaybeChildNode>) => void;
declare const createDomElement: <K extends TagNames, M = OutputElement<K>>(tagName: K) => M;
declare function listen<K extends keyof HTMLElementEventMap>(target: DOMElement, event: K, handler: EventListenerObject["handleEvent"] & ((e: HTMLElementEventMap[K]) => void), options?: AddEventListenerOptions): void;
declare function h<K extends TagNames>(tagName: K, first?: MaybeChildNode | DOMNodeAttributes<PotentialProps<K>, K>, ...children: MaybeChildNode[]): OutputElement<K>;
//#endregion
//#region src/core/hydrate.d.ts
/**
 * Hydrate a target element
 */
declare const hydrate: (target: DOMElement, content: DOMElement | DOMElement[] | Promise<DOMElement | DOMElement[]>) => DOMElement;
//#endregion
//#region src/core/state.d.ts
declare function untrack<T>(fn: Accessor<T>): T;
declare function onMount(fn: () => void): void;
declare function signal<T>(value: T): [Accessor<T>, Setter<T>];
declare function effect(fn: ObserverFn): () => void;
declare function memo<T>(value: () => T): Accessor<T | null>;
//#endregion
//#region src/core/store.d.ts
declare function store<T extends StoreObject>(init: T): T;
//#endregion
//#region src/core/flow.d.ts
type ListProps<T> = {
  each?: () => T[];
  children?: (item: T) => MaybeChildNode;
};
declare const List: <T>(props: ListProps<T>) => DOMElement[];
declare function Show<T>({
  when,
  children
}: {
  when: FunctionMaybe<T | boolean>;
  children: MaybeChildNode;
}): MaybeChildNode;
//#endregion
//#region src/core/attr.d.ts
/**
 * Sets or removes an attribute with the specified or inferred namespace on an element.
 * @param element - The DOM element to modify.
 * @param key - The attribute name (e.g., 'stroke-width', 'xlink:href').
 * @param value - The attribute value; falsy values remove the attribute.
 */
declare const setAttribute: (element: Element, key: string, rawValue?: PropValueOrAccessor) => void;
declare const getStyleObject: <T extends CSSProperties>(styleObject: T) => T;
/**
 * Allows the "framework" to support CSS objects
 */
declare const styleToString: (styleValue?: FunctionMaybe<CSSProperties | string | null | undefined>) => string;
declare const style: (target: DOMElement, styleValue?: FunctionMaybe<CSSProperties | string | null | undefined>) => void;
//#endregion
export { List, ListProps, Show, add, createDomElement, effect, getStyleObject, h, hydrate, listen, memo, onMount, setAttribute, signal, store, style, styleToString, untrack };
//# sourceMappingURL=index-BpWREiYo.d.ts.map