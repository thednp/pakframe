const require_store = require('./store-BDZV8c9W.cjs');
const require_core = require('./core-Bv4QFb55.cjs');

//#region src/jsx/jsx.ts
const jsx = (jsxTag, { children, ref, style: style$1,...rest }) => {
	if (typeof jsxTag === "string") {
		const element = require_core.h(jsxTag, rest, children);
		if (require_store.isFunction(ref)) ref(element);
		require_core.effect(() => {
			require_core.style(element, style$1);
		});
		for (const [key, value] of Object.entries(rest)) {
			if (key.startsWith("on") && !require_store.isServer) {
				const eventName = key.slice(2).toLowerCase();
				element.addEventListener(eventName, value);
				continue;
			}
			if (require_store.isFunction(value)) {
				require_core.effect(() => {
					require_core.setAttribute(element, key, value());
				});
				continue;
			}
			require_core.setAttribute(element, key, value);
		}
		return element;
	}
	return typeof jsxTag === "function" ? jsxTag({
		children,
		ref,
		style: style$1,
		...rest
	}) : null;
};
const Fragment = ({ children }) => children;

//#endregion
Object.defineProperty(exports, 'Fragment', {
  enumerable: true,
  get: function () {
    return Fragment;
  }
});
Object.defineProperty(exports, 'jsx', {
  enumerable: true,
  get: function () {
    return jsx;
  }
});
//# sourceMappingURL=jsx-D8L93j6T.cjs.map