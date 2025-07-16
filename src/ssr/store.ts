import { signal } from "./state";
import type { StoreObject } from "../types/types";
import { isPlainObject } from "../util";

function createState(obj: StoreObject, parentReceiver: StoreObject) {
  for (const [key, value] of Object.entries(obj)) {
    if (isPlainObject(value)) {
      parentReceiver[key] = createState(value, {});
    } else {
      const [get, set] = signal(value);
      Object.defineProperty(parentReceiver, key, { get, set });
    }
  }
  return parentReceiver;
}

export function store<T extends StoreObject>(init: T) {
  return createState(init, {}) as T;
}
