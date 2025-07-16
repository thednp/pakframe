import type { DOMElement, FunctionMaybe, MaybeChildNode } from "../types/types";
import { isArray, isFunction } from "../util";

/**
 * Merge the children of an Element or an array of elements with an optional array of children
 * into the childen prperty of a simple object.
 */
export const unwrap = (
  source: FunctionMaybe<DOMElement | DOMElement[]>,
  ...children: MaybeChildNode[]
) => {
  const layout = () => {
    const pageChildren =
      source && typeof source === "object" && "children" in source &&
        isArray(source?.children)
        ? source.children as DOMElement[]
        : isFunction(source)
        ? [
          ...(source as () => DOMElement)().children ||
            (source as () => DOMElement[])(),
        ]
        : typeof HTMLElement !== "undefined" && source instanceof HTMLElement
        ? [...source.children] as DOMElement[]
        : /* istanbul ignore next */ isArray(source)
        ? source as DOMElement[]
        : [source];

    return {
      children: [
        ...(children || /* istanbul ignore next */ []),
        ...pageChildren,
      ],
    };
  };
  return layout();
};
