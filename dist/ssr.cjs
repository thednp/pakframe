require("virtual:@pakframe/routes");
const require_chunk = require('./chunk-CUT6urMc.cjs');
const require_core = require('./core-CfqC-T4D.cjs');
const __thednp_domparser = require_chunk.__toESM(require("@thednp/domparser"));
const node_path = require_chunk.__toESM(require("node:path"));

//#region src/ssr/attr.ts
const setHydrationKey = (target) => {
	!target.hasAttribute("data-hk") && target.setAttribute("data-hk", "");
};
/**
* Sets or removes an attribute with the specified or inferred namespace on an element.
* @param element - The DOM element to modify.
* @param key - The attribute name (e.g., 'stroke-width', 'xlink:href').
* @param value - The attribute value; falsy values remove the attribute.
*/
const setAttribute = (element, key, rawValue) => {
	const value = require_core.isFunction(rawValue) ? rawValue() : rawValue;
	const attrKey = key.indexOf(":") > -1 ? key.replace(/^[^:]+:/, "") : key;
	if (value == null || value === false || value === "" || value === void 0) {
		element.removeAttribute(attrKey);
		element.removeAttribute(key);
	} else {
		const t = typeof value;
		const attrValue = value === true ? "" : t === "number" ? String(value) : !require_core.urlAttributes.includes(key) ? (0, __thednp_domparser.escape)(value) : require_core.needsEncoding(key, value) ? encodeURI(value) : value;
		require_core.isFunction(rawValue) && setHydrationKey(element);
		element.setAttribute(attrKey, attrValue);
	}
};
const getStyleObject = (styleObject) => {
	const output = {};
	let key;
	let value;
	for (const [objKey, rawValue] of Object.entries(styleObject)) {
		key = objKey.split(/(?=[A-Z])/).join("-").toLowerCase();
		value = require_core.isFunction(rawValue) ? rawValue() : rawValue;
		if (value) output[key] = value;
	}
	return output;
};
/**
* Allows the "framework" to support CSS objects
*/
const styleToString = (styleValue) => {
	const styleVal = require_core.isFunction(styleValue) ? styleValue() : styleValue;
	return typeof styleVal === "string" ? styleVal : require_core.isObject(styleVal) ? Object.entries(getStyleObject(styleVal)).reduce((acc, [key, value]) => acc + key + ":" + value + ";", "") : "";
};
const style = (target, styleValue) => {
	const styleVal = require_core.isFunction(styleValue) ? styleValue() : styleValue;
	const hasReactiveProp = require_core.isObject(styleVal) && Object.values(styleVal).some((sv) => require_core.isFunction(sv));
	setAttribute(target, "style", styleToString(styleVal));
	if (require_core.isFunction(styleValue) || hasReactiveProp) setHydrationKey(target);
};

//#endregion
//#region src/ssr/h.ts
if (typeof document === "undefined") globalThis.document = (0, __thednp_domparser.createDocument)();
const add = (parent, child) => {
	if (!parent || !child) return;
	if (child instanceof Promise) child.then((resolved) => add(parent, resolved));
	else if (require_core.isArray(child)) child.forEach((c) => add(parent, c));
	else if (require_core.isNode(child)) parent.appendChild(child);
	else if (require_core.isFunction(child)) {
		const textNode = document.createTextNode("");
		parent.appendChild(textNode);
		const realChild = require_core.isFunction(child()) ? child() : child;
		const value = realChild();
		if (require_core.isArray(value)) {
			parent.textContent = "";
			value.forEach((v) => add(parent, v));
		} else if (require_core.isNode(value)) add(parent, child);
		else textNode.textContent = require_core.getStringValue(value);
	} else parent.appendChild(document.createTextNode(require_core.getStringValue(child)));
};
function listen(target, _event, _handler, _options) {
	setHydrationKey(target);
	return true;
}
function h(tagName, first, ...children) {
	return require_core.createComponent(() => {
		const element = document.createElement(tagName);
		if (require_core.isObject(first) && !require_core.isNode(first) && !require_core.isArray(first)) Object.entries(first).forEach(([key, value]) => {
			if (key.startsWith("on")) {
				if (require_core.isFunction(value)) setHydrationKey(element);
			} else if (key === "style") style(element, value);
			else setAttribute(element, key, value);
		});
		else add(element, first);
		add(element, children);
		return element;
	}, {});
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
	value = require_core.isFunction(value) ? value() : value;
	return [() => value, (nextValue) => {
		if (require_core.isFunction(nextValue)) value = nextValue(value);
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
	for (const [key, value] of Object.entries(obj)) if (require_core.isPlainObject(value)) parentReceiver[key] = createState(value, {});
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
//#region src/ssr/flow.ts
const List = (props) => {
	const { each, children } = props;
	const placeholder = document.createTextNode("");
	const Layout = () => {
		const items = each ? each() : [];
		const nodes = [];
		if (!children) return;
		for (const item of items) {
			const node = children(item);
			if (node) nodes.push(node);
		}
		if (nodes.length) return nodes;
		return placeholder;
	};
	return Layout();
};
function Show({ when, children }) {
	const placeholder = document.createTextNode("");
	const initialWhen = () => require_core.isFunction(when) ? when() : when;
	const newNodes = () => {
		const nodes = require_core.isFunction(children) ? children() : children;
		return require_core.isArray(nodes) ? nodes : [nodes];
	};
	const Layout = () => {
		const condition = initialWhen();
		const nodes = newNodes();
		if (condition && nodes.length) return nodes;
		return placeholder;
	};
	return Layout();
}

//#endregion
//#region src/ssr/context.ts
const resetOwner = () => {
	require_core.CONTEXT_OWNER.current = null;
};
const renderWithContext = (fn) => {
	resetOwner();
	return fn();
};

//#endregion
//#region src/ssr/preload.ts
/**
* @param file File path
*/
function renderPreloadLink(file) {
	if (file.endsWith(".js")) return `<link rel="preload" href="${file}" as="script" crossorigin>`;
	else if (file.endsWith(".css")) return `<link rel="preload" href="${file}" as="style" crossorigin>`;
	else if (file.endsWith(".woff")) return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
	else if (file.endsWith(".woff2")) return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
	else if (file.endsWith(".gif")) return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
	else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
	else if (file.endsWith(".png")) return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
	else if (file.endsWith(".webp")) return ` <link rel="preload" href="${file}" as="image" type="image/webp">`;
	else {
		console.warn("Render error! File format not recognized: " + file);
		return "";
	}
}
/**
* @param modules The list of modules to preload
* @param manifest The vite manifest object
*/
function renderPreloadLinks(modules, manifest) {
	let links = "";
	const seen = /* @__PURE__ */ new Set();
	const ignoredAssets = /* @__PURE__ */ new Set();
	Object.entries(manifest).forEach(([id, files]) => {
		// istanbul ignore else - don't pre-render routes, layouts and JSX stuff
		if ([
			"src/pages",
			"src/routes",
			"pakframe/"
		].some((l) => id.includes(l))) files.forEach((asset) => ignoredAssets.add(asset));
	});
	modules.forEach((id) => {
		const files = manifest[id];
		// istanbul ignore else
		if (files?.length) files.forEach((file) => {
			if (seen.has(file) || ignoredAssets.has(file)) return;
			seen.add(file);
			const filename = (0, node_path.basename)(file);
			// istanbul ignore next - no way to test this
			if (manifest[filename]) {
				for (const depFile of manifest[filename])
 // istanbul ignore else
				if (!seen.has(depFile) && !ignoredAssets.has(depFile)) {
					links += renderPreloadLink(depFile);
					seen.add(depFile);
				}
			}
			links += renderPreloadLink(file);
		});
	});
	return links;
}

//#endregion
exports.CONTEXT_OWNER = require_core.CONTEXT_OWNER;
exports.List = List;
exports.Show = Show;
exports.add = add;
exports.createComponent = require_core.createComponent;
exports.createContext = require_core.createContext;
exports.effect = effect;
exports.getOwner = require_core.getOwner;
exports.getStyleObject = getStyleObject;
exports.h = h;
exports.listen = listen;
exports.memo = memo;
exports.onMount = onMount;
exports.provide = require_core.provide;
exports.renderPreloadLinks = renderPreloadLinks;
exports.renderWithContext = renderWithContext;
exports.resetOwner = resetOwner;
exports.runWithOwner = require_core.runWithOwner;
exports.setAttribute = setAttribute;
exports.setHydrationKey = setHydrationKey;
exports.signal = signal;
exports.store = store;
exports.style = style;
exports.styleToString = styleToString;
exports.untrack = untrack;
exports.useContext = require_core.useContext;
//# sourceMappingURL=ssr.cjs.map