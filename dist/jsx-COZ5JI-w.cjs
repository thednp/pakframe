const require_core = require('./core-CBmu30RC.cjs');

//#region src/jsx/jsx.ts
const jsx = (jsxTag, { children, style: style$1,...rest }) => {
	if (typeof jsxTag === "string") {
		const element = require_core.h(jsxTag, rest, children);
		require_core.effect(() => {
			require_core.style(element, style$1);
		});
		for (const [key, value] of Object.entries(rest)) {
			if (key === "ref") continue;
			if (key.startsWith("on") && !require_core.isServer) {
				const eventName = key.slice(2).toLowerCase();
				element.addEventListener(eventName, value);
				continue;
			}
			if (require_core.isFunction(value)) {
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
//# sourceMappingURL=jsx-COZ5JI-w.cjs.map