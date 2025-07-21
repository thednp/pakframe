const require_store = require('./store-BDZV8c9W.cjs');
const __thednp_domparser = require_store.__toESM(require("@thednp/domparser"));
const node_path = require_store.__toESM(require("node:path"));

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
	const value = require_store.isFunction(rawValue) ? rawValue() : rawValue;
	const attrKey = key.indexOf(":") > -1 ? key.replace(/^[^:]+:/, "") : key;
	if (value == null || value === false || value === "" || value === void 0) {
		element.removeAttribute(attrKey);
		element.removeAttribute(key);
	} else {
		const t = typeof value;
		const attrValue = value === true ? "" : t === "number" ? String(value) : !require_store.urlAttributes.includes(key) ? (0, __thednp_domparser.escape)(value) : require_store.needsEncoding(key, value) ? encodeURI(value) : value;
		require_store.isFunction(rawValue) && setHydrationKey(element);
		element.setAttribute(attrKey, attrValue);
	}
};
const getStyleObject = (styleObject) => {
	const output = {};
	let key;
	let value;
	for (const [objKey, rawValue] of Object.entries(styleObject)) {
		key = objKey.split(/(?=[A-Z])/).join("-").toLowerCase();
		value = require_store.isFunction(rawValue) ? rawValue() : rawValue;
		if (value) output[key] = value;
	}
	return output;
};
/**
* Allows the "framework" to support CSS objects
*/
const styleToString = (styleValue) => {
	const styleVal = require_store.isFunction(styleValue) ? styleValue() : styleValue;
	return typeof styleVal === "string" ? styleVal : require_store.isObject(styleVal) ? Object.entries(getStyleObject(styleVal)).reduce((acc, [key, value]) => acc + key + ":" + value + ";", "") : "";
};
const style = (target, styleValue) => {
	const styleVal = require_store.isFunction(styleValue) ? styleValue() : styleValue;
	const hasReactiveProp = require_store.isObject(styleVal) && Object.values(styleVal).some((sv) => require_store.isFunction(sv));
	setAttribute(target, "style", styleToString(styleVal));
	if (require_store.isFunction(styleValue) || hasReactiveProp) setHydrationKey(target);
};

//#endregion
//#region src/ssr/h.ts
if (typeof document === "undefined") globalThis.document = (0, __thednp_domparser.createDocument)();
const add = (parent, child) => {
	if (!parent || !child) return;
	if (child instanceof Promise) child.then((resolved) => add(parent, resolved));
	else if (require_store.isArray(child)) child.forEach((c) => add(parent, c));
	else if (require_store.isNode(child)) parent.appendChild(child);
	else if (require_store.isFunction(child)) {
		const textNode = document.createTextNode("");
		parent.appendChild(textNode);
		const realChild = require_store.isFunction(child()) ? child() : child;
		const value = realChild();
		if (require_store.isArray(value)) {
			parent.textContent = "";
			value.forEach((v) => add(parent, v));
		} else if (require_store.isNode(value)) add(parent, child);
		else textNode.textContent = require_store.getStringValue(value);
	} else parent.appendChild(document.createTextNode(require_store.getStringValue(child)));
};
function listen(target, _event, _handler, _options) {
	setHydrationKey(target);
	return true;
}
function h(tagName, first, ...children) {
	const element = document.createElement(tagName);
	if (require_store.isObject(first) && !require_store.isNode(first) && !require_store.isArray(first)) Object.entries(first).forEach(([key, value]) => {
		if (key.startsWith("on")) {
			if (require_store.isFunction(value)) setHydrationKey(element);
		} else if (key === "style") style(element, value);
		else setAttribute(element, key, value);
	});
	else add(element, first);
	add(element, children);
	return element;
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
	const initialWhen = () => require_store.isFunction(when) ? when() : when;
	const newNodes = () => {
		const nodes = require_store.isFunction(children) ? children() : children;
		return require_store.isArray(nodes) ? nodes : [nodes];
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
exports.List = List;
exports.Show = Show;
exports.add = add;
exports.effect = require_store.effect;
exports.getStyleObject = getStyleObject;
exports.h = h;
exports.listen = listen;
exports.memo = require_store.memo;
exports.onMount = require_store.onMount;
exports.renderPreloadLinks = renderPreloadLinks;
exports.setAttribute = setAttribute;
exports.setHydrationKey = setHydrationKey;
exports.signal = require_store.signal;
exports.store = require_store.store;
exports.style = style;
exports.styleToString = styleToString;
exports.untrack = require_store.untrack;
//# sourceMappingURL=ssr.cjs.map