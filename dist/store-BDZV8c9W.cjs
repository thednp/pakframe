//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

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
Object.defineProperty(exports, '__toESM', {
  enumerable: true,
  get: function () {
    return __toESM;
  }
});
Object.defineProperty(exports, 'effect', {
  enumerable: true,
  get: function () {
    return effect;
  }
});
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
Object.defineProperty(exports, 'memo', {
  enumerable: true,
  get: function () {
    return memo;
  }
});
Object.defineProperty(exports, 'needsEncoding', {
  enumerable: true,
  get: function () {
    return needsEncoding;
  }
});
Object.defineProperty(exports, 'onMount', {
  enumerable: true,
  get: function () {
    return onMount;
  }
});
Object.defineProperty(exports, 'signal', {
  enumerable: true,
  get: function () {
    return signal;
  }
});
Object.defineProperty(exports, 'store', {
  enumerable: true,
  get: function () {
    return store;
  }
});
Object.defineProperty(exports, 'untrack', {
  enumerable: true,
  get: function () {
    return untrack;
  }
});
Object.defineProperty(exports, 'urlAttributes', {
  enumerable: true,
  get: function () {
    return urlAttributes;
  }
});
//# sourceMappingURL=store-BDZV8c9W.cjs.map