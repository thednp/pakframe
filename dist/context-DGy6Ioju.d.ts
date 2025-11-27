import { MaybeChildNode } from "./types-BZyJRwNQ.js";

//#region src/core/context.d.ts
interface Owner {
  context: Map<symbol, unknown>;
  parent: Owner | null;
}
declare const CONTEXT_OWNER: {
  current: Owner | null;
};
declare const runWithOwner: <T>(owner: Owner, fn: () => T) => T;
declare const getOwner: () => Owner | null;
declare const createContext: <T>(defaultValue?: T) => {
  symbol: symbol;
  defaultValue: T | undefined;
  Provider: (props: {
    value: T;
    children: MaybeChildNode;
  }, ...otherChildren: MaybeChildNode[]) => any;
};
type Context<T> = ReturnType<typeof createContext<T>>;
declare const provide: <T>(contextSymbol: symbol, value: T) => void;
declare const useContext: <T>(context: Context<T>) => T;
declare const createComponent: <P extends Record<string, any>, R>(fn: (props: P) => R, props: P) => R;
//#endregion
export { CONTEXT_OWNER, createComponent, createContext, getOwner, provide, runWithOwner, useContext };
//# sourceMappingURL=context-DGy6Ioju.d.ts.map