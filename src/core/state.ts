// src/state.ts
import { isFunction } from "../util";
import type {
  Accessor,
  ContextEntry,
  ObserverFn,
  Setter,
} from "../types/types";

let context: ContextEntry[] = [];

function subscribe(running: ContextEntry, subscriptions: Set<ContextEntry>) {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

// Clear dependencies
function cleanup(running: ContextEntry) {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }
  running.dependencies.clear();
}

// Execute without effects
export function untrack<T>(fn: Accessor<T>) {
  const tempContext = context;
  context = [];
  const value = fn();
  context = tempContext;
  return value;
}

export function onMount(fn: () => void) {
  let init = false;
  effect(() => {
    if (init) return;
    init = true;
    fn();
    return () => {};
  });
}

export function signal<T>(value: T) {
  value = isFunction(value) ? value() : value;
  const subscriptions = new Set<ContextEntry>();

  return [
    () => {
      const running = context[context.length - 1];
      if (running) {
        subscribe(running, subscriptions);
      }
      return value;
    },
    (nextValue: T | ((v: T) => T)) => {
      if (isFunction(nextValue)) {
        value = nextValue(value);
      } else {
        value = nextValue;
      }

      // Create a new array from subscriptions to avoid mutation during iteration
      const subs = Array.from(subscriptions);
      for (const sub of subs) {
        sub.execute();
      }
    },
  ] as [Accessor<T>, Setter<T>];
}

export function effect(fn: ObserverFn) {
  let running: ContextEntry;
  const execute = () => {
    cleanup(running);
    context.push(running);
    try {
      const result = fn();
      // Handle cleanup function returned from effect
      if (typeof result === "function") {
        cleanup(running); // Clear previous cleanup
        running.cleanup = result;
      }
    } finally {
      context.pop();
    }
  };

  running = {
    execute,
    dependencies: new Set(),
    cleanup: undefined, // Add cleanup property
  };

  execute();

  // Return dispose function
  return () => {
    cleanup(running);
    if (running.cleanup) {
      running.cleanup();
    }
  };
}

export function memo<T>(value: () => T) {
  const [get, set] = signal<T | null>(null);
  effect(() => set(value()));
  return get;
}
