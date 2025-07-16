// src/state.ts
import { isFunction } from "../util";
import type { Accessor, ObserverFn, Setter } from "../types/types";

// Execute without effects
export function untrack<T>(fn: Accessor<T>) {
  return fn();
}

export function onMount(fn: () => void) {
  let init = false;
  if (init) return;
  init = true;
  fn();
  return () => {};
}

export function signal<T>(value: T) {
  value = isFunction(value) ? value() : value;

  return [
    () => value,
    (nextValue: T | ((v: T) => T)) => {
      if (isFunction(nextValue)) {
        value = nextValue(value);
      } else {
        value = nextValue;
      }
    },
  ] as [Accessor<T>, Setter<T>];
}

export function effect(fn: ObserverFn) {
  fn()
}

export function memo<T>(value: () => T) {
  let v: T;
  try {
    v = value();
  } catch (err) {
    console.error(err);
  }
  return () => v;
}
