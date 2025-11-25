import { Accessor, CSSProperties, DOMElement, DOMNodeAttributes, FunctionMaybe, MaybeChildNode, ObserverFn, OutputElement, PotentialProps, PropValueOrAccessor, Setter, StoreObject, TagNames } from "./types-pzt1ZtaD.js";

//#region src/ssr/h.d.ts
declare const add: (parent: DOMElement, child?: FunctionMaybe<RegExp | Date> | Accessor<MaybeChildNode> | MaybeChildNode | Promise<MaybeChildNode>) => void;
declare function listen<K extends keyof HTMLElementEventMap>(target: DOMElement, _event: K, _handler: EventListenerObject["handleEvent"] & ((e: HTMLElementEventMap[K]) => void), _options?: AddEventListenerOptions): boolean;
declare function h<K extends TagNames>(tagName: K, first?: MaybeChildNode | DOMNodeAttributes<PotentialProps<K>, K>, ...children: MaybeChildNode[]): OutputElement<K>;
//#endregion
//#region src/ssr/attr.d.ts
declare const setHydrationKey: (target: Element) => void;
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
//#region src/ssr/state.d.ts
declare function untrack<T>(fn: Accessor<T>): T;
declare function onMount(fn: () => void): (() => void) | undefined;
declare function signal<T>(value: T): [Accessor<T>, Setter<T>];
declare function effect(fn: ObserverFn): void;
declare function memo<T>(value: () => T): () => T;
//#endregion
//#region src/ssr/store.d.ts
declare function store<T extends StoreObject>(init: T): T;
//#endregion
//#region src/ssr/flow.d.ts
type ListProps<T> = {
  each?: () => T[];
  children?: (item: T) => MaybeChildNode;
};
declare const List: <T>(props: ListProps<T>) => (SVGElement | MathMLElement)[] | undefined;
declare function Show<T>({
  when,
  children
}: {
  when: FunctionMaybe<T | boolean>;
  children: () => MaybeChildNode;
}): MaybeChildNode;
//#endregion
//#region src/ssr/preload.d.ts
/**
 * @param modules The list of modules to preload
 * @param manifest The vite manifest object
 */
declare function renderPreloadLinks(modules: string[], manifest: Record<string, string[]>): string;
//#endregion
export { List, ListProps, Show, add, effect, getStyleObject, h, listen, memo, onMount, renderPreloadLinks, setAttribute, setHydrationKey, signal, store, style, styleToString, untrack };
//# sourceMappingURL=index-DYNpaI3p.d.ts.map