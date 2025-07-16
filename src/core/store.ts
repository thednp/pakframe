import { signal } from "./state";
import type { Accessor, Primitive, Setter, StoreObject } from "../types/types";
import { isArray, isFunction, isPlainObject } from "../util";

function processArrayItem(item: Primitive | StoreObject) {
  if (!isPlainObject(item) || item && item["_"]) return item;
  if (isPlainObject(item)) {
    const newObj = {} as StoreObject;
    createState(item, newObj);
    Object.defineProperty(newObj, "_", { value: true, enumerable: false });
    return newObj;
  }
  return item;
}

function createArrayProxy(
  get: Accessor<(Primitive | StoreObject)[]>,
  set: Setter<(Primitive | StoreObject)[]>,
) {
  return new Proxy<(Primitive | StoreObject)[]>([], {
    get(_, prop) {
      const arr = get();
      const typedProp = prop as keyof typeof Array.prototype | number;
      // Apply Array prototype methods
      if (isFunction(Array.prototype[typedProp])) {
        return (...args: Array<StoreObject>) => {
          const result = Array.prototype[typedProp].apply(arr, args);
          if (
            ["push", "pop", "shift", "unshift", "splice"].includes(String(prop))
          ) {
            set(arr.map(processArrayItem));
          }
          return result;
        };
      }
      // Access Array items
      return arr[typedProp];
    },
  });
}

function reconcileArrays(
  current: Array<Primitive | StoreObject>,
  next: Array<Primitive | StoreObject>,
) {
  if (next.length !== current.length) return next.map(processArrayItem);
  return next.some((item, i) => item !== current[i])
    ? next.map(processArrayItem)
    : current;
}

function createState(obj: StoreObject, parentReceiver: StoreObject) {
  for (const [key, value] of Object.entries(obj)) {
    if (isArray(value)) {
      const [get, set] = signal<(Primitive | StoreObject)[]>(
        value.map(processArrayItem),
      );
      const proxy = createArrayProxy(get, set);

      Object.defineProperty(parentReceiver, key, {
        get: () => proxy,
        set: (newValue) => {
          const reconciledArray = reconcileArrays(proxy, newValue);
          if (reconciledArray !== proxy) set(reconciledArray);
          return true;
        },
        enumerable: true,
      });
    } else if (isPlainObject(value)) {
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
