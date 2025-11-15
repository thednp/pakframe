const require_chunk = require('./chunk-CUT6urMc.cjs');
const require_store = require('./store-DZCiBSN0.cjs');
const __thednp_domparser = require_chunk.__toESM(require("@thednp/domparser"));

//#region src/core/state.ts
let context = [];
function subscribe(running, subscriptions) {
	subscriptions.add(running);
	running.dependencies.add(subscriptions);
}
function cleanup(running) {
	for (const dep of running.dependencies) dep.delete(running);
	running.dependencies.clear();
}
function untrack(fn) {
	const tempContext = context;
	context = [];
	const value = fn();
	context = tempContext;
	return value;
}
function onMount(fn) {
	let init = false;
	effect(() => {
		if (init) return;
		init = true;
		fn();
		return () => {};
	});
}
function signal(value) {
	value = require_store.isFunction(value) ? value() : value;
	const subscriptions = /* @__PURE__ */ new Set();
	return [() => {
		const running = context[context.length - 1];
		if (running) subscribe(running, subscriptions);
		return value;
	}, (nextValue) => {
		if (require_store.isFunction(nextValue)) value = nextValue(value);
		else value = nextValue;
		const subs = Array.from(subscriptions);
		for (const sub of subs) sub.execute();
	}];
}
function effect(fn) {
	let running;
	const execute = () => {
		cleanup(running);
		context.push(running);
		try {
			const result = fn();
			if (typeof result === "function") {
				cleanup(running);
				running.cleanup = result;
			}
		} finally {
			context.pop();
		}
	};
	running = {
		execute,
		dependencies: /* @__PURE__ */ new Set(),
		cleanup: void 0
	};
	execute();
	return () => {
		cleanup(running);
		if (running.cleanup) running.cleanup();
	};
}
function memo(value) {
	const [get, set] = signal(null);
	effect(() => set(value()));
	return get;
}

//#endregion
//#region src/core/attr.ts
/**
* Sets or removes an attribute with the specified or inferred namespace on an element.
* @param element - The DOM element to modify.
* @param key - The attribute name (e.g., 'stroke-width', 'xlink:href').
* @param value - The attribute value; falsy values remove the attribute.
*/
const setAttribute = (element, key, rawValue) => {
	const value = require_store.isFunction(rawValue) ? rawValue() : rawValue;
	const attrKey = key.indexOf(":") > -1 ? key.replace(/^[^:]+:/, "") : key;
	const attrNamespaces = {
		"xlink:": "http://www.w3.org/1999/xlink",
		"xml:": "http://www.w3.org/XML/1998/namespace",
		"xsi:": "http://www.w3.org/2001/XMLSchema-instance"
	};
	let attrNS = element?.namespaceURI || null;
	for (const [prefix, uri] of Object.entries(attrNamespaces)) if (key.startsWith(prefix)) {
		attrNS = uri;
		break;
	}
	attrNS = attrNS === "http://www.w3.org/1999/xhtml" ? null : attrNS;
	if (value == null || value === false || value === "" || value === void 0) {
		element.removeAttributeNS(attrNS, attrKey);
		element.removeAttribute(key);
	} else {
		const t = typeof value;
		const attrValue = value === true ? "" : t === "number" ? String(value) : !require_store.urlAttributes.includes(key) ? (0, __thednp_domparser.escape)(value) : require_store.needsEncoding(key, value) ? encodeURI(value) : value;
		element.setAttributeNS(attrNS, attrKey, attrValue);
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
	if (require_store.isObject(styleVal)) {
		const styleObject = getStyleObject(styleVal);
		if (Object.values(styleObject).filter((v) => v).length) Object.assign(target.style, styleObject);
		else target.removeAttribute("style");
	} else if (require_store.isString(styleVal) && styleVal.length) target.style.cssText = styleVal;
	else target.removeAttribute("style");
};

//#endregion
//#region src/core/ns.ts
const namespaceElementsMap = {
	"http://www.w3.org/1999/xhtml": [
		"a",
		"style",
		"title",
		"script"
	],
	"http://www.w3.org/2000/svg": [
		"svg",
		"a",
		"animate",
		"animateMotion",
		"animateTransform",
		"circle",
		"clipPath",
		"defs",
		"desc",
		"ellipse",
		"feBlend",
		"feColorMatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feDropShadow",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence",
		"filter",
		"foreignObject",
		"g",
		"image",
		"line",
		"linearGradient",
		"marker",
		"mask",
		"metadata",
		"mpath",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"radialGradient",
		"rect",
		"set",
		"stop",
		"style",
		"switch",
		"symbol",
		"text",
		"textPath",
		"title",
		"tspan",
		"use",
		"view"
	],
	"http://www.w3.org/1998/Math/MathML": [
		"math",
		"maction",
		"maligngroup",
		"malignmark",
		"menclose",
		"merror",
		"mfenced",
		"mfrac",
		"mglyph",
		"mi",
		"mlabeledtr",
		"mmultiscripts",
		"mn",
		"mo",
		"mover",
		"mpadded",
		"mphantom",
		"mprescripts",
		"mroot",
		"mrow",
		"ms",
		"mspace",
		"msqrt",
		"mstyle",
		"msub",
		"msubsup",
		"msup",
		"mtable",
		"mtd",
		"mtext",
		"mtr",
		"munder",
		"munderover",
		"semantics",
		"annotation",
		"annotation-xml"
	]
};
/**
* Create reverse lookup for namespace elements
*/
const namespaceElements = Object.entries(namespaceElementsMap).reduce((acc, [namespace, elements]) => {
	elements.forEach((element) => {
		if (!(element in acc)) acc[element] = namespace;
	});
	return acc;
}, {});

//#endregion
//#region src/core/h.ts
const add = (parent, child) => {
	if (!parent || !child) return;
	if (child instanceof Promise) child.then((resolved) => add(parent, resolved));
	else if (require_store.isArray(child)) child.forEach((c) => add(parent, c));
	else if (require_store.isNode(child)) parent.appendChild(child);
	else if (require_store.isFunction(child)) {
		const textNode = document.createTextNode("");
		parent.appendChild(textNode);
		const realChild = require_store.isFunction(untrack(child)) ? untrack(child) : child;
		effect(() => {
			const value = realChild();
			if (require_store.isArray(value)) {
				parent.textContent = "";
				value.forEach((v) => add(parent, v));
			} else if (require_store.isNode(value)) add(parent, child);
			else textNode.textContent = require_store.getStringValue(value);
		});
	} else parent.appendChild(document.createTextNode(require_store.getStringValue(child)));
};
const createDomElement = (tagName) => {
	const ns = namespaceElements[tagName];
	return ns ? document.createElementNS(ns, tagName) : document.createElement(tagName);
};
function listen(target, event, handler, options) {
	target.addEventListener(event, handler, options);
}
function h(tagName, first, ...children) {
	const element = createDomElement(tagName);
	if (require_store.isObject(first) && !require_store.isNode(first) && !require_store.isArray(first)) Object.entries(first).forEach(([key, value]) => {
		if (key.startsWith("on")) {
			if (typeof value !== "function") return;
			const eventName = key.slice(2).toLowerCase();
			listen(element, eventName, value);
		} else if (key === "style") effect(() => style(element, value));
		else effect(() => setAttribute(element, key, value));
	});
	else add(element, first);
	add(element, children);
	return element;
}

//#endregion
//#region src/router/routes.ts
const routes = [];

//#endregion
//#region src/router/state.ts
/**
* Fix the URL of a route
*/
const fixRouteUrl = (url) => {
	if (!url) return "/";
	if (url.startsWith("/")) return url;
	return `/${url}`;
};
const initialPath = !require_store.isServer ? globalThis.location.pathname : "/";
const initialSearch = !require_store.isServer ? globalThis.location.search : "";
/**
* The global router state.
*/
const routerState = require_store.store({
	pathname: initialPath,
	searchParams: new URLSearchParams(initialSearch),
	params: {}
});
/** */
const setRouterState = (path, search, params) => {
	const [pathname, searchParams] = fixRouteUrl(path).split("?");
	routerState.pathname = pathname;
	routerState.searchParams = new URLSearchParams(search || searchParams || "");
	routerState.params = params || {};
};

//#endregion
//#region src/helpers/router-helpers.ts
/**
* Check if selected page is the current page;
*/
const isCurrentPage = (pageName) => {
	return routerState.pathname === pageName;
};
/**
* Check if component is a lazy component
*/
const isLazyComponent = (component) => {
	if (require_store.isServer && typeof component === "function") return component.constructor.name.includes("AsyncFunction");
	return component?.isLazy === true;
};
/**
* Execute lifecycle methods preload and / or load
*/
const executeLifecycle = async ({ route }, params) => {
	// istanbul ignore next
	if (!route) return true;
	try {
		if (route?.preload) await route.preload(params);
		if (route?.load) await route.load(params);
		return true;
	} catch (error) {
		// istanbul ignore next
		console.error("Lifecycle execution error:", error);
		// istanbul ignore next
		return false;
	}
};
/**
* Client only reload utility
* WORK IN PROGRESS
* @param {boolean} forceFetch - Force fetch from server
* @returns {void}
*/
/**
* Isomorphic redirect utility
* WORK IN PROGRESS
* @param {string} path - The path to redirect to
* @param {object} options - Redirect options
* @param {number} options.status - HTTP status code (server-side only)
* @param {boolean} options.replace - Whether to replace current history entry (client-side only)
* @returns {void}
*/

//#endregion
//#region src/router/cache.ts
const routeCache = /* @__PURE__ */ new Map();
const getCached = (key) => routeCache.get(key);
const cache = (key, value) => {
	routeCache.set(key, value);
};

//#endregion
//#region src/router/lazy.ts
/**
* Registers a lazy component.
*/
const lazy = (importFn) => {
	if (require_store.isServer) return async () => {
		const cached = getCached(importFn);
		/* istanbul ignore next */
		if (cached) return cached;
		const module$1 = await importFn();
		const component$1 = module$1?.default || module$1.Page;
		const result = {
			component: component$1,
			route: module$1.route
		};
		cache(importFn, result);
		return result;
	};
	let initialized = false;
	const [component, setComponent] = signal("Loading..");
	const [route, setRoute] = signal({});
	const load = () => {
		if (initialized) return;
		const cached = getCached(importFn);
		/* istanbul ignore next */
		if (cached) {
			setComponent(cached.component);
			setRoute(cached.route);
			return;
		}
		initialized = true;
		importFn().then((module$1) => {
			const pageComponent = module$1?.default || module$1.Page;
			cache(importFn, {
				component: pageComponent,
				route: module$1.route
			});
			setComponent(pageComponent);
			setRoute(module$1.route);
		});
	};
	const lazyComponent = () => {
		load();
		return {
			component: component(),
			route: route()
		};
	};
	lazyComponent.isLazy = true;
	return lazyComponent;
};

//#endregion
//#region src/router/Route.ts
/**
* Register a new Route entry
*/
const Route = (routeProps) => {
	const { path, component, preload, load,...rest } = routeProps;
	// istanbul ignore next - no point testing this error
	if (routes.some((r) => r.path === path)) {
		console.error(`  ➜  pakframe/router: duplicated route for "${path}".`);
		return;
	}
	if (!isLazyComponent(component)) {
		const wrappedComponent = lazy(() => Promise.resolve({
			Page: component,
			route: {
				preload,
				load
			}
		}));
		routes.push({
			...rest,
			path,
			component: wrappedComponent
		});
		return;
	}
	routes.push(routeProps);
};

//#endregion
//#region src/router/extractParams.ts
/**
* Extract route params
*/
const extractParams = (pattern, path) => {
	const params = {};
	const patternParts = pattern.split("/");
	const pathParts = path.split("/");
	if (patternParts.length !== pathParts.length) return null;
	for (let i = 0; i < patternParts.length; i++) {
		const patternPart = patternParts[i];
		const pathPart = pathParts[i];
		if (patternPart.startsWith(":")) params[patternPart.slice(1)] = pathPart;
		else if (patternPart !== pathPart) return null;
	}
	return params;
};

//#endregion
//#region src/router/matchRoute.ts
/**
* Find a registered route that matches the given path
*/
const matchRoute = (initialPath$1) => {
	const path = initialPath$1 !== "/" && initialPath$1.endsWith("/") ? initialPath$1.slice(0, -1) : initialPath$1;
	let foundMatch = routes.find((r) => r.path === path && !r.path.includes("*"));
	if (!foundMatch) {
		const nestedPath = path.split("/").slice(0, -1).join("/") + "/*";
		foundMatch = routes.find((r) => r.path === nestedPath);
	}
	if (foundMatch) return {
		...foundMatch,
		params: extractParams(foundMatch.path, path) ?? void 0
	};
	for (const route of routes) {
		if (route.path === "*") continue;
		const params = extractParams(route.path, path);
		if (params) return {
			...route,
			params
		};
	}
	return routes.find((r) => r.path === "*") || null;
};

//#endregion
//#region src/router/navigate.ts
/**
* Client only navigation utility.
*/
const navigate = (path, options = { replace: false }) => {
	const { replace = false } = options;
	// istanbul ignore else
	if (!require_store.isServer) {
		const url = new URL(path, globalThis.location.origin);
		const route = matchRoute(url.pathname);
		if (replace) globalThis.history.replaceState({}, "", path);
		else globalThis.history.pushState({}, "", path);
		setRouterState(url.pathname, url?.search, route?.params);
	} else console.error("  ➜  Direct navigation is not supported on server");
};

//#endregion
//#region src/router/A.ts
/** */
const A = ({ href, children,...rest } = {}, ...otherChildren) => {
	/* istanbul ignore next - try again later */
	const props = Object.fromEntries(Object.entries(rest || {}).filter(([_, val]) => val !== void 0));
	const newProps = {
		href,
		...props,
		onclick: async (e) => {
			e.preventDefault();
			const HREF = typeof href === "function" ? href() : href;
			/* istanbul ignore next */
			if (isCurrentPage(HREF)) return;
			// istanbul ignore else
			if (typeof props.onclick === "function") props.onclick(e);
			const route = matchRoute(HREF);
			const module$1 = await route.component();
			await executeLifecycle(module$1, route.params);
			navigate(HREF);
		},
		onmouseenter: () => {
			const HREF = typeof href === "function" ? href() : href;
			const route = matchRoute(HREF);
			/* istanbul ignore else */
			if (route?.component) route.component();
		}
	};
	effect(() => {
		const HREF = typeof href === "function" ? href() : href;
		if (isCurrentPage(HREF)) newProps["aria-current"] = "page";
	});
	return h("a", newProps, children || otherChildren);
};

//#endregion
//#region src/router/unwrap.ts
/**
* Merge the children of an Element or an array of elements with an optional array of children
* into the childen prperty of a simple object.
*/
const unwrap = (source, ...children) => {
	const layout = () => {
		const pageChildren = source && typeof source === "object" && "children" in source && require_store.isArray(source?.children) ? source.children : require_store.isFunction(source) ? [...source().children || source()] : typeof HTMLElement !== "undefined" && source instanceof HTMLElement ? [...source.children] : require_store.isArray(source) ? source : [source];
		return { children: [...children || [], ...pageChildren] };
	};
	return layout();
};

//#endregion
//#region src/helpers/head-helpers.ts
const parseAttributes = (attributeString) => {
	const attributes = {};
	const attributeRegex = /([a-zA-Z0-9_-]+)(?:="([^"]*?)")?/g;
	let match;
	while ((match = attributeRegex.exec(attributeString)) !== null) {
		const name = match[1];
		const value = match[2] || "";
		attributes[name] = value;
	}
	return attributes;
};
const getTagAttribute = (tag) => {
	const attributes = [
		"name",
		"property",
		"charset",
		"viewport",
		"media",
		"http-equiv",
		"rel",
		"src",
		"href",
		"id"
	];
	for (const attr of attributes) {
		const value = tag.getAttribute(attr);
		if (value) return value;
	}
	return "";
};
const getTagKey = (tag) => {
	return tag.tagName + (tag.tagName !== "TITLE" ? `.${getTagAttribute(tag)}` : "");
};

//#endregion
//#region src/meta/Head.ts
/**
* Create a new Map for each request on server
*/
const createHeadTags = () => /* @__PURE__ */ new Map();
/**
* Get the current head tags. Use a factory pattern to get the right store
* on the server and the client.
*/
const getHeadTags = (() => {
	if (require_store.isServer) {
		let serverHeadTags;
		return () => {
			if (!serverHeadTags) serverHeadTags = createHeadTags();
			return serverHeadTags;
		};
	}
	const clientHeadTags = createHeadTags();
	return () => clientHeadTags;
})();
/**
* Clear all head tags
*/
const resetHeadTags = () => {
	const tags = getHeadTags();
	tags.clear();
};
/**
* Initialize the head tags
*/
const initializeHeadTags = () => {
	const tags = getHeadTags();
	/* istanbul ignore else */
	if (!tags.size && !require_store.isServer) Array.from(document.head.children).forEach((tag) => {
		tags.set(getTagKey(tag), tag);
	});
};
/**
* Add a new meta tag
*/
const addMeta = (tag) => {
	if (!tag) return;
	const tags = getHeadTags();
	const key = getTagKey(tag);
	tags.set(key, tag);
};
/**
* Get the head tags
*/
const Head = () => {
	const tags = getHeadTags();
	return Array.from(tags.values());
};

//#endregion
//#region src/meta/tags.ts
/**
* Add a new `<title>` tag
*/
const Title = (props, content) => {
	addMeta(h("title", props, content));
	return null;
};
/**
* Add a new `<meta>` tag
*/
const Meta = (props) => {
	addMeta(h("meta", props));
	return null;
};
/**
* Add a new `<link>` tag
*/
const Link = (props) => {
	addMeta(h("link", props));
	return null;
};
/**
* Add a new `<script>` tag
*/
const Script = (props, content) => {
	addMeta(h("script", props, content));
	return null;
};
/**
* Add a new `<style>` tag
*/
const Style = (props, content) => {
	addMeta(h("style", props, content));
	return null;
};

//#endregion
//#region src/router/Router.ts
let isConnected = false;
const Router = (initialProps = (/* istanbul ignore next */ {})) => {
	/* istanbul ignore next - try again later */
	const props = Object.fromEntries(Object.entries(initialProps).filter(([_, val]) => val !== void 0));
	const wrapper = h("main", {
		...props,
		"data-root": true
	});
	const mainLayout = () => {
		const route = matchRoute(routerState.pathname);
		/* istanbul ignore else */
		if (!route) {
			add(wrapper, h("div", "No Route Found"));
			return wrapper;
		}
		routerState.params = route.params || {};
		if (require_store.isServer) {
			const renderComponent = async () => {
				try {
					const module$1 = await route.component();
					const component$1 = typeof module$1.component === "function" ? module$1.component() : module$1.component;
					await executeLifecycle(module$1, route.params);
					add(wrapper, unwrap(component$1).children);
					return wrapper;
				} catch (error) {
					/* istanbul ignore next */
					console.error("  ➜  Router error:", error);
					/* istanbul ignore next */
					add(wrapper, h("div", "Error loading page"));
					return wrapper;
				}
			};
			return renderComponent();
		}
		const root = document.querySelector("[data-root]");
		// istanbul ignore else - cannot test unmount
		if (!isConnected || !root) {
			initializeHeadTags();
			globalThis.addEventListener(
				"popstate",
				// istanbul ignore next - cannot test
				(e) => {
					const location = e.target?.location;
					const oldPath = routerState.pathname;
					// istanbul ignore next - cannot test
					if (location.pathname !== oldPath) setRouterState(location.pathname, location.search);
				}
			);
		}
		if (root) {
			const children$1 = async () => {
				const module$1 = await route.component();
				executeLifecycle(module$1, route.params);
				// istanbul ignore next - cannot test
				const cp = Array.isArray(module$1) || module$1 instanceof Element ? module$1 : typeof module$1.component === "function" ? module$1.component() : module$1.component;
				// istanbul ignore next - cannot test
				const kids = () => cp ? Array.from(unwrap(cp).children) : [];
				const kudos = kids();
				isConnected = true;
				// istanbul ignore else
				if (document.head) hydrate(document.head, Head());
				return kudos;
			};
			add(wrapper, children$1());
			return wrapper;
		}
		const csrRoute = memo(() => {
			const p = routerState.pathname;
			return matchRoute(p);
		});
		const children = memo(() => {
			const route$1 = csrRoute();
			// istanbul ignore if - can only be tested in client
			if (!route$1) return [h("div", "No Route Found")];
			const md = route$1.component();
			executeLifecycle(md, route$1.params);
			// istanbul ignore next - cannot test all cases
			const cp = Array.isArray(md) || md instanceof Element ? md : typeof md.component === "function" ? md.component() : md.component;
			return cp ? Array.from(unwrap(cp).children) : [];
		});
		const component = () => {
			const kids = children();
			const result = () => {
				return () => {
					hydrate(wrapper, kids);
					isConnected = true;
					// istanbul ignore else
					if (document.head) hydrate(document.head, Head());
					return wrapper;
				};
			};
			return result();
		};
		const finalResult = component();
		if (finalResult) add(wrapper, finalResult);
		return wrapper;
	};
	return mainLayout();
};

//#endregion
//#region src/core/hydrate.ts
const isTag = (target, ...tagNames) => {
	return tagNames.some((tag) => target.tagName.toLowerCase() === tag.toLowerCase());
};
const hasHydrationKeys = (target) => {
	return target.querySelector("[data-hk]") !== void 0;
};
/**
* Hydrate a target element
*/
const hydrate = (target, content) => {
	if (content instanceof Promise) {
		content.then((res) => {
			if (!target.hasAttribute("data-h")) hydrate(target, res);
			else {
				const wrapper$1 = unwrap(res);
				target.replaceChildren(...Array.from(wrapper$1.children));
			}
		});
		return target;
	}
	const wrapper = unwrap(content);
	const currentChildren = Array.from(target.children);
	const newChildren = wrapper.children;
	if (isTag(target, "head")) {
		if (!target.hasAttribute("data-h")) {
			target.setAttribute("data-h", "");
			return target;
		}
		const regularTags = newChildren.filter((child) => !isTag(child, "style", "link"));
		const styleTags = newChildren.filter((child) => isTag(child, "style", "link"));
		const existingStyles = new Map(currentChildren.filter((child) => isTag(child, "style", "link")).map((child) => [getTagKey(child), child]));
		regularTags.forEach((newChild) => {
			const key = getTagKey(newChild);
			const existing = currentChildren.find((child) => getTagKey(child) === key);
			if (existing) existing.replaceWith(newChild);
			else target.appendChild(newChild);
		});
		styleTags.forEach((newChild) => {
			const key = getTagKey(newChild);
			const existing = existingStyles.get(key);
			if (existing) {
				// istanbul ignore next - try again later
				if (isTag(existing, "style") && isTag(newChild, "style")) {
					if (existing.textContent === newChild.textContent && existing.id === newChild.id) return;
				}
				// istanbul ignore next - try again later
				if (isTag(existing, "link") && isTag(newChild, "link")) {
					if (existing.href === newChild.href) return;
				}
			}
			// istanbul ignore else - try again later
			if (isTag(newChild, "link")) {
				const temp = newChild.cloneNode();
				temp.disabled = true;
				const originalRel = temp.rel;
				temp.rel = "preload";
				temp.as = "style";
				// istanbul ignore next
				temp.onload = () => {
					temp.rel = originalRel;
					temp.removeAttribute("as");
					temp.disabled = false;
					if (existing && existing.parentNode === target) existing.remove();
				};
				target.appendChild(temp);
			} else if (isTag(newChild, "style")) {
				target.appendChild(newChild);
				// istanbul ignore next - try again later
				if (existing && existing.parentNode === target) existing.remove();
			}
		});
	} else if (!target.hasAttribute("data-h")) {
		if (hasHydrationKeys(target) && currentChildren.length === newChildren.length) currentChildren.forEach((child, i) => {
			child.replaceChildren(...Array.from(newChildren[i].childNodes));
		});
		else target.replaceChildren(...newChildren);
		target.setAttribute("data-h", "");
	} else target.replaceChildren(...newChildren);
	return target;
};

//#endregion
//#region src/core/store.ts
function processArrayItem(item) {
	if (!require_store.isPlainObject(item) || item && item["_"]) return item;
	if (require_store.isPlainObject(item)) {
		const newObj = {};
		createState(item, newObj);
		Object.defineProperty(newObj, "_", {
			value: true,
			enumerable: false
		});
		return newObj;
	}
	return item;
}
function createArrayProxy(get, set) {
	return new Proxy([], { get(_, prop) {
		const arr = get();
		const typedProp = prop;
		if (require_store.isFunction(Array.prototype[typedProp])) return (...args) => {
			const result = Array.prototype[typedProp].apply(arr, args);
			if ([
				"push",
				"pop",
				"shift",
				"unshift",
				"splice"
			].includes(String(prop))) set(arr.map(processArrayItem));
			return result;
		};
		return arr[typedProp];
	} });
}
function reconcileArrays(current, next) {
	if (next.length !== current.length) return next.map(processArrayItem);
	return next.some((item, i) => item !== current[i]) ? next.map(processArrayItem) : current;
}
function createState(obj, parentReceiver) {
	for (const [key, value] of Object.entries(obj)) if (require_store.isArray(value)) {
		const [get, set] = signal(value.map(processArrayItem));
		const proxy = createArrayProxy(get, set);
		Object.defineProperty(parentReceiver, key, {
			get: () => proxy,
			set: (newValue) => {
				const reconciledArray = reconcileArrays(proxy, newValue);
				if (reconciledArray !== proxy) set(reconciledArray);
				return true;
			},
			enumerable: true
		});
	} else if (require_store.isPlainObject(value)) parentReceiver[key] = createState(value, {});
	else {
		const [get, set] = signal(value);
		Object.defineProperty(parentReceiver, key, {
			get,
			set
		});
	}
	return parentReceiver;
}
function store$1(init) {
	return createState(init, {});
}

//#endregion
//#region src/core/flow.ts
const List = (props) => {
	const { each, children } = props;
	let parentElement;
	const placeholder = document.createTextNode("");
	const itemMap = /* @__PURE__ */ new Map();
	const updateItems = (items) => {
		let marker = placeholder;
		if (!children || !parentElement) return;
		for (const item of items) {
			if (!itemMap.has(item)) {
				const node = children(item);
				if (node) {
					marker.after(node);
					itemMap.set(item, node);
				}
			}
			marker = itemMap.get(item) ?? placeholder;
		}
	};
	effect(() => {
		const items = each ? each() : [];
		for (const [item, node] of itemMap) if (!items.includes(item)) {
			node.remove();
			itemMap.delete(item);
		}
		updateItems(items);
	});
	queueMicrotask(() => {
		parentElement = placeholder.parentElement;
		if (require_store.isFunction(each)) updateItems(untrack(each));
	});
	return placeholder;
};
function Show({ when, children }) {
	const placeholder = document.createTextNode("");
	const initialWhen = () => require_store.isFunction(when) ? when() : when;
	const newNodes = () => {
		const nodes = require_store.isFunction(children) ? children() : children;
		return require_store.isArray(nodes) ? nodes : [nodes];
	};
	effect(() => {
		const condition = initialWhen();
		const nodes = newNodes();
		const nextElementSibling = placeholder.nextElementSibling;
		if (condition && (!nextElementSibling || nextElementSibling !== nodes[0])) placeholder.after(...nodes);
		else if (!condition && placeholder.nextElementSibling === nodes[0]) nodes.forEach((node) => node.remove());
	});
	return placeholder;
}

//#endregion
Object.defineProperty(exports, 'A', {
  enumerable: true,
  get: function () {
    return A;
  }
});
Object.defineProperty(exports, 'Head', {
  enumerable: true,
  get: function () {
    return Head;
  }
});
Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function () {
    return Link;
  }
});
Object.defineProperty(exports, 'List', {
  enumerable: true,
  get: function () {
    return List;
  }
});
Object.defineProperty(exports, 'Meta', {
  enumerable: true,
  get: function () {
    return Meta;
  }
});
Object.defineProperty(exports, 'Route', {
  enumerable: true,
  get: function () {
    return Route;
  }
});
Object.defineProperty(exports, 'Router', {
  enumerable: true,
  get: function () {
    return Router;
  }
});
Object.defineProperty(exports, 'Script', {
  enumerable: true,
  get: function () {
    return Script;
  }
});
Object.defineProperty(exports, 'Show', {
  enumerable: true,
  get: function () {
    return Show;
  }
});
Object.defineProperty(exports, 'Style', {
  enumerable: true,
  get: function () {
    return Style;
  }
});
Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function () {
    return Title;
  }
});
Object.defineProperty(exports, 'add', {
  enumerable: true,
  get: function () {
    return add;
  }
});
Object.defineProperty(exports, 'addMeta', {
  enumerable: true,
  get: function () {
    return addMeta;
  }
});
Object.defineProperty(exports, 'cache', {
  enumerable: true,
  get: function () {
    return cache;
  }
});
Object.defineProperty(exports, 'createDomElement', {
  enumerable: true,
  get: function () {
    return createDomElement;
  }
});
Object.defineProperty(exports, 'effect', {
  enumerable: true,
  get: function () {
    return effect;
  }
});
Object.defineProperty(exports, 'executeLifecycle', {
  enumerable: true,
  get: function () {
    return executeLifecycle;
  }
});
Object.defineProperty(exports, 'extractParams', {
  enumerable: true,
  get: function () {
    return extractParams;
  }
});
Object.defineProperty(exports, 'fixRouteUrl', {
  enumerable: true,
  get: function () {
    return fixRouteUrl;
  }
});
Object.defineProperty(exports, 'getCached', {
  enumerable: true,
  get: function () {
    return getCached;
  }
});
Object.defineProperty(exports, 'getStyleObject', {
  enumerable: true,
  get: function () {
    return getStyleObject;
  }
});
Object.defineProperty(exports, 'getTagKey', {
  enumerable: true,
  get: function () {
    return getTagKey;
  }
});
Object.defineProperty(exports, 'h', {
  enumerable: true,
  get: function () {
    return h;
  }
});
Object.defineProperty(exports, 'hydrate', {
  enumerable: true,
  get: function () {
    return hydrate;
  }
});
Object.defineProperty(exports, 'initializeHeadTags', {
  enumerable: true,
  get: function () {
    return initializeHeadTags;
  }
});
Object.defineProperty(exports, 'isCurrentPage', {
  enumerable: true,
  get: function () {
    return isCurrentPage;
  }
});
Object.defineProperty(exports, 'isLazyComponent', {
  enumerable: true,
  get: function () {
    return isLazyComponent;
  }
});
Object.defineProperty(exports, 'lazy', {
  enumerable: true,
  get: function () {
    return lazy;
  }
});
Object.defineProperty(exports, 'listen', {
  enumerable: true,
  get: function () {
    return listen;
  }
});
Object.defineProperty(exports, 'memo', {
  enumerable: true,
  get: function () {
    return memo;
  }
});
Object.defineProperty(exports, 'navigate', {
  enumerable: true,
  get: function () {
    return navigate;
  }
});
Object.defineProperty(exports, 'onMount', {
  enumerable: true,
  get: function () {
    return onMount;
  }
});
Object.defineProperty(exports, 'parseAttributes', {
  enumerable: true,
  get: function () {
    return parseAttributes;
  }
});
Object.defineProperty(exports, 'resetHeadTags', {
  enumerable: true,
  get: function () {
    return resetHeadTags;
  }
});
Object.defineProperty(exports, 'routerState', {
  enumerable: true,
  get: function () {
    return routerState;
  }
});
Object.defineProperty(exports, 'routes', {
  enumerable: true,
  get: function () {
    return routes;
  }
});
Object.defineProperty(exports, 'setAttribute', {
  enumerable: true,
  get: function () {
    return setAttribute;
  }
});
Object.defineProperty(exports, 'setRouterState', {
  enumerable: true,
  get: function () {
    return setRouterState;
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
    return store$1;
  }
});
Object.defineProperty(exports, 'style', {
  enumerable: true,
  get: function () {
    return style;
  }
});
Object.defineProperty(exports, 'styleToString', {
  enumerable: true,
  get: function () {
    return styleToString;
  }
});
Object.defineProperty(exports, 'untrack', {
  enumerable: true,
  get: function () {
    return untrack;
  }
});
Object.defineProperty(exports, 'unwrap', {
  enumerable: true,
  get: function () {
    return unwrap;
  }
});
//# sourceMappingURL=core-Ew6WhCln.cjs.map