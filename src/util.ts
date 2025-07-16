import type { Primitive } from "./types/types";

export const isObject = (value: unknown): value is Record<any, any> =>
  value != null && typeof value === "object" && !Array.isArray(value);

export const isArray = (value: unknown): value is Array<any> =>
  Array.isArray(value);

export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isSymbol = (value: unknown): value is symbol =>
  typeof value === "symbol";

export const isNode = (value: unknown): value is Node =>
  isObject(value) && "nodeName" in value;

export const isPlainObject = (
  value: unknown,
): value is Record<string, unknown> =>
  isObject(value) && !isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;

export const isServer = typeof window === "undefined";

export const urlAttributes = [
  "action",
  "cite",
  "data",
  "formaction",
  "href",
  "icon",
  "manifest",
  "poster",
  "src",
  "srcset",
  "xlink:href",
  "xml:base",
  "longdesc",
  "ping",
  "usemap",
];

export const escape = (str: string) => {
  if ((str === null) || (str === "")) {
    return "";
  } else {
    str = str.toString();
  }

  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return str.replace(/[&<>"']/g, (m) => {
    return map[m];
  });
};

export const getStringValue = (child: Primitive | Date | RegExp) => {
  const t = typeof child;
  return t === "string"
    ? escape(child as string)
    : ("number" === t || "boolean" === t || "bigint" === t || "symbol" === t ||
        child instanceof Date ||
        child instanceof RegExp)
    ? child.toString()
    : String(child);
};

/**
 * Checks if an attribute is a special URL attribute and if its value is already percent-encoded.
 * @param attrKey - The attribute name (e.g., 'href', 'src').
 * @param attrValue - The attribute value (e.g., a URL or fragment identifier).
 * @returns - True if the value needs encoding, false if it’s already encoded or not a special attribute.
 */
const percentEncodedPattern = /%[0-9A-Fa-f]{2}/;
export function needsEncoding(attrKey: string, attrValue: string) {
  // Check if the attribute is in the urlAttributes array
  if (!urlAttributes.includes(attrKey)) {
    return false; // Not a special attribute, no encoding needed
  }

  // Check for percent-encoded characters (e.g., % followed by two hex digits)
  if (percentEncodedPattern.test(attrValue)) {
    return false; // Value is already percent-encoded, no further encoding needed
  }

  // If the attribute is special and not encoded, encoding is needed
  return true;
}
