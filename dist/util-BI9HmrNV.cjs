
//#region src/util.ts
const isObject = (value) => value != null && typeof value === "object" && !Array.isArray(value);
const isArray = (value) => Array.isArray(value);
const isFunction = (value) => typeof value === "function";
const isString = (value) => typeof value === "string";
const isNode = (value) => isObject(value) && "nodeName" in value;
const isPlainObject = (value) => isObject(value) && !isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
const isServer = typeof window === "undefined";
const urlAttributes = [
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
	"usemap"
];
const escape = (str) => {
	if (str === null || str === "") return "";
	else str = str.toString();
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#039;"
	};
	return str.replace(/[&<>"']/g, (m) => {
		return map[m];
	});
};
const getStringValue = (child) => {
	const t = typeof child;
	return t === "string" ? escape(child) : "number" === t || "boolean" === t || "bigint" === t || "symbol" === t || child instanceof Date || child instanceof RegExp ? child.toString() : String(child);
};
/**
* Checks if an attribute is a special URL attribute and if its value is already percent-encoded.
* @param attrKey - The attribute name (e.g., 'href', 'src').
* @param attrValue - The attribute value (e.g., a URL or fragment identifier).
* @returns - True if the value needs encoding, false if it’s already encoded or not a special attribute.
*/
const percentEncodedPattern = /%[0-9A-Fa-f]{2}/;
function needsEncoding(attrKey, attrValue) {
	if (!urlAttributes.includes(attrKey)) return false;
	if (percentEncodedPattern.test(attrValue)) return false;
	return true;
}

//#endregion
Object.defineProperty(exports, 'getStringValue', {
  enumerable: true,
  get: function () {
    return getStringValue;
  }
});
Object.defineProperty(exports, 'isArray', {
  enumerable: true,
  get: function () {
    return isArray;
  }
});
Object.defineProperty(exports, 'isFunction', {
  enumerable: true,
  get: function () {
    return isFunction;
  }
});
Object.defineProperty(exports, 'isNode', {
  enumerable: true,
  get: function () {
    return isNode;
  }
});
Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function () {
    return isObject;
  }
});
Object.defineProperty(exports, 'isPlainObject', {
  enumerable: true,
  get: function () {
    return isPlainObject;
  }
});
Object.defineProperty(exports, 'isServer', {
  enumerable: true,
  get: function () {
    return isServer;
  }
});
Object.defineProperty(exports, 'isString', {
  enumerable: true,
  get: function () {
    return isString;
  }
});
Object.defineProperty(exports, 'needsEncoding', {
  enumerable: true,
  get: function () {
    return needsEncoding;
  }
});
Object.defineProperty(exports, 'urlAttributes', {
  enumerable: true,
  get: function () {
    return urlAttributes;
  }
});
//# sourceMappingURL=util-BI9HmrNV.cjs.map