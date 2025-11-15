import type {
  CSSProperties,
  DOMElement,
  FunctionMaybe,
  PropValueOrAccessor,
} from "../types/types";
import {
  isFunction,
  isObject,
  isString,
  needsEncoding,
  urlAttributes,
} from "../util";
import { escape } from "@thednp/domparser";

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
  const attrNamespaces = {
    // "": "http://www.w3.org/1999/xhtml", // HTMLElement
    "xlink:": "http://www.w3.org/1999/xlink", // XLink attributes (e.g., xlink:href)
    "xml:": "http://www.w3.org/XML/1998/namespace", // XML attributes (e.g., xml:lang)
    "xsi:": "http://www.w3.org/2001/XMLSchema-instance", // XML Schema Instance (e.g., xsi:schemaLocation)
  };

  // Determine attribute namespace
  let attrNS = element?.namespaceURI || null;
  for (const [prefix, uri] of Object.entries(attrNamespaces)) {
    if (key.startsWith(prefix)) {
      attrNS = uri;
      break;
    }
  }
  attrNS = attrNS === "http://www.w3.org/1999/xhtml" ? null : attrNS;

  if (value == null || value === false || value === "" || value === undefined) {
    element.removeAttributeNS(attrNS, attrKey);
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

    element.setAttributeNS(attrNS, attrKey, attrValue as string);
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

  if (isObject(styleVal)) {
    const styleObject = getStyleObject(styleVal);
    if (Object.values(styleObject).filter((v) => v).length) {
      Object.assign(target.style, styleObject);
    } else {
      target.removeAttribute("style");
    }
  } else if (isString(styleVal) && styleVal.length) {
    target.style.cssText = styleVal;
  } else {
    target.removeAttribute("style");
  }
};
