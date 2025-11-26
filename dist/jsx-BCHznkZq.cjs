const require_util = require('./util-BI9HmrNV.cjs');
const require_core = require('./core-ClWVxI4s.cjs');

//#region src/jsx/jsx.ts
const jsx = (jsxTag, { children, ref, style: style$1,...rest }) => {
	if (typeof jsxTag === "string") {
		const element = require_core.h(jsxTag, rest, children);
		if (require_util.isFunction(ref)) ref(element);
		require_core.effect(() => {
			require_core.style(element, style$1);
		});
		for (const [key, value] of Object.entries(rest)) {
			if (key.startsWith("on") && !require_util.isServer) {
				const eventName = key.slice(2).toLowerCase();
				element.addEventListener(eventName, value);
				continue;
			}
			if (require_util.isFunction(value)) {
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
//# sourceMappingURL=jsx-BCHznkZq.cjs.map