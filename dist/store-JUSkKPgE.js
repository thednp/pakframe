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
//#region src/ssr/state.ts
function untrack(fn) {
	return fn();
}
function onMount(fn) {
	let init = false;
	if (init) return;
	init = true;
	fn();
	return () => {};
}
function signal(value) {
	value = isFunction(value) ? value() : value;
	return [() => value, (nextValue) => {
		if (isFunction(nextValue)) value = nextValue(value);
		else value = nextValue;
	}];
}
function effect(fn) {
	fn();
}
function memo(value) {
	let v;
	try {
		v = value();
	} catch (err) {
		console.error(err);
	}
	return () => v;
}

//#endregion
//#region src/ssr/store.ts
function createState(obj, parentReceiver) {
	for (const [key, value] of Object.entries(obj)) if (isPlainObject(value)) parentReceiver[key] = createState(value, {});
	else {
		const [get, set] = signal(value);
		Object.defineProperty(parentReceiver, key, {
			get,
			set
		});
	}
	return parentReceiver;
}
function store(init) {
	return createState(init, {});
}

//#endregion
export { effect, getStringValue, isArray, isFunction, isNode, isObject, isPlainObject, isServer, isString, memo, needsEncoding, onMount, signal, store, untrack, urlAttributes };
//# sourceMappingURL=store-JUSkKPgE.js.map