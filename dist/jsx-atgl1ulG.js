import { effect, h, isFunction, isServer, setAttribute, style } from "./core-Dnj3owAD.js";

//#region src/jsx/jsx.ts
const jsx = (jsxTag, { children, style: style$1,...rest }) => {
	if (typeof jsxTag === "string") {
		const element = h(jsxTag, rest, children);
		rest.ref = element;
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
		style: style$1,
		...rest
	}) : null;
};
const Fragment = ({ children }) => children;

//#endregion
export { Fragment, jsx };
//# sourceMappingURL=jsx-atgl1ulG.js.map