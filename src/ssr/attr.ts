import type {
  CSSProperties,
  DOMElement,
  FunctionMaybe,
  PropValueOrAccessor,
} from "../types/types";
import { isFunction, isObject, needsEncoding, urlAttributes } from "../util";
import { escape } from "@thednp/domparser";

export const setHydrationKey = (target: Element) => {
  !target.hasAttribute("data-hk") && target.setAttribute("data-hk", "");
};

/**
 * Sets or removes an attribute with the specified or inferred namespace on an element.
 * @param element - The DOM element to modify.
 * @param key - The attribute name (e.g., 'stroke-width', 'xlink:href').
 * @param value - The attribute value; falsy values remove the attribute.
 */
export const setAttribute = (
  element: Element,
  key: string,
  rawValue?: PropValueOrAccessor,
) => {
  const value = isFunction(rawValue) ? rawValue() : rawValue;
  const attrKey = key.indexOf(":") > -1 ? key.replace(/^[^:]+:/, "") : key;

  // Determine attribute namespace
  if (value == null || value === false || value === "" || value === undefined) {
    element.removeAttribute(attrKey);
    element.removeAttribute(key);
  } else {
    const t = typeof value;
    const attrValue = value === true
      ? ""
      : t === "number"
      ? String(value)
      : !urlAttributes.includes(key)
      ? escape(value as string)
      : (needsEncoding(key, value as string)
        ? encodeURI(value as string)
        : value);

    isFunction(rawValue) && setHydrationKey(element);
    element.setAttribute(attrKey, attrValue as string);
  }
};

export const getStyleObject = <T extends CSSProperties>(styleObject: T) => {
  const output = {} as T;
  let key: keyof T;
  let value: T[keyof T];
  for (const [objKey, rawValue] of Object.entries(styleObject)) {
    key = objKey.split(/(?=[A-Z])/).join("-").toLowerCase() as keyof T;
    // allow state values in style object
    value = (isFunction(rawValue) ? rawValue() : rawValue) as T[keyof T];
    if (value) output[key] = value;
  }
  return output;
};

/**
 * Allows the "framework" to support CSS objects
 */
export const styleToString = (
  styleValue?: FunctionMaybe<CSSProperties | string | null | undefined>,
) => {
  const styleVal = isFunction(styleValue) ? styleValue() : styleValue;
  return typeof styleVal === "string"
    ? styleVal
    : isObject(styleVal)
    ? Object.entries(getStyleObject(styleVal)).reduce(
      (acc, [key, value]) => acc + key + ":" + value + ";",
      "",
    )
    : "";
};

export const style = (
  target: DOMElement,
  styleValue?: FunctionMaybe<CSSProperties | string | null | undefined>,
) => {
  const styleVal = isFunction(styleValue) ? styleValue() : styleValue;
  const hasReactiveProp = isObject(styleVal) &&
    Object.values(styleVal).some((sv) => isFunction(sv));

  setAttribute(target, "style", styleToString(styleVal));
  if (isFunction(styleValue) || hasReactiveProp) {
    setHydrationKey(target);
  }
};
