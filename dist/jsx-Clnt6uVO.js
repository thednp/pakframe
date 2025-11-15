import { isFunction, isServer } from "./store-JUSkKPgE.js";
import { effect, h, setAttribute, style } from "./core-CK120Hu2.js";

//#region src/jsx/jsx.ts
const jsx = (jsxTag, { children, ref, style: style$1,...rest }) => {
	if (typeof jsxTag === "string") {
		const element = h(jsxTag, rest, children);
		if (isFunction(ref)) ref(element);
		effect(() => {
			style(element, style$1);
		});
		for (const [key, value] of Object.entries(rest)) {
			if (key.startsWith("on") && !isServer) {
				const eventName = key.slice(2).toLowerCase();
				element.addEventListener(eventName, value);
				continue;
			}
			if (isFunction(value)) {
				effect(() => {
					setAttribute(element, key, value());
				});
				continue;
			}
			setAttribute(element, key, value);
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
export { Fragment, jsx };
//# sourceMappingURL=jsx-Clnt6uVO.js.map