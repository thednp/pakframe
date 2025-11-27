// src/core/context.ts
import type { MaybeChildNode } from "../types/types";

interface Owner {
  context: Map<symbol, unknown>;
  parent: Owner | null;
}

export const CONTEXT_OWNER: { current: Owner | null } = {
  current: null
};

function createOwner(parent: Owner | null = null): Owner {
  return {
    context: new Map(),
    parent,
  };
}

export const runWithOwner = <T,>(owner: Owner, fn: () => T): T => {
  const previousOwner = CONTEXT_OWNER.current;
  CONTEXT_OWNER.current = owner;
  try {
    return fn();
  } finally {
    CONTEXT_OWNER.current = previousOwner;
  }
};

export const getOwner = (): Owner | null => CONTEXT_OWNER.current;

export const createContext = <T,>(defaultValue?: T) => {
  const contextSymbol = Symbol("context");

  const Provider = (props: { value: T; children: MaybeChildNode }, ...otherChildren: MaybeChildNode[]): any => {
    provide(contextSymbol, props.value);
    return props.children || otherChildren;
  };

  return {
    symbol: contextSymbol,
    defaultValue,
    Provider,
  };
};

type Context<T> = ReturnType<typeof createContext<T>>;

export const provide = <T,>(contextSymbol: symbol, value: T): void => {
  if (!CONTEXT_OWNER.current) {
    console.warn("provide() called outside of component scope");
    return;
  }
  CONTEXT_OWNER.current.context.set(contextSymbol, value);
};

export const useContext = <T,>(context: Context<T>): T => {
  let owner = CONTEXT_OWNER.current;
  while (owner) {
    if (owner.context.has(context.symbol)) {
      return owner.context.get(context.symbol) as T;
    }
    owner = owner.parent;
  }
  return context.defaultValue as T;
};

export const createComponent = <P extends Record<string, any>, R>(
  fn: (props: P) => R,
  props: P
): R => {
  const owner = createOwner(CONTEXT_OWNER.current);
  return runWithOwner(owner, () => fn(props));
};
