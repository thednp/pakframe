// src/core/context.ts
import type { Context, Owner, ProviderProps } from "../types/types";

export const CONTEXT_OWNER: { current: Owner | null } = {
  current: null
};

export function createOwner(parent: Owner | null = null): Owner {
  return {
    context: new Map(),
    parent,
  };
}

export const runWithOwner = <T>(owner: Owner, fn: () => T): T => {
  const previousOwner = CONTEXT_OWNER.current;
  CONTEXT_OWNER.current = owner;
  try {
    return fn();
  } finally {
    CONTEXT_OWNER.current = previousOwner;
  }
};

export const getOwner = (): Owner | null => CONTEXT_OWNER.current;

export const createContext = <T>(defaultValue?: T) => {
  const contextSymbol = Symbol("context");
  const Provider = (props: ProviderProps) => {
    const owner = createOwner(CONTEXT_OWNER.current);
    owner.context.set(contextSymbol, props.value);
    const children = runWithOwner(owner, props.children);
    CONTEXT_OWNER.current = null;
    return children;
  };

  return {
    symbol: contextSymbol,
    defaultValue,
    Provider,
  };
};

export const provide = <T>(contextSymbol: symbol, value: T): void => {
  if (!CONTEXT_OWNER.current) {
    console.warn("provide() called outside of component scope");
    return;
  }
  CONTEXT_OWNER.current.context.set(contextSymbol, value);
};

export const useContext = <T>(context: Context<T>): T => {
  let owner = CONTEXT_OWNER.current;
  if (!owner) {
    console.warn("useContext() called outside of component scope");
    return context.defaultValue as T;
  }
  while (owner) {
    if (owner.context.has(context.symbol)) {
      return owner.context.get(context.symbol) as T;
    }
    owner = owner.parent;
  }

  return context.defaultValue as T;
};
