// src/ssr/context.ts
import { CONTEXT_OWNER } from "@core";
export * from "../core/context";

// Server-side rendering support
export const resetOwner = (): void => {
  CONTEXT_OWNER.current = null;
};

// Use this in your server entry point before rendering
export const renderWithContext = <T,>(fn: () => T): T => {
  resetOwner();
  return fn();
};
