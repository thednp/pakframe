import { h, signal } from "pakframe";

// global state who cares
export const [count, setCount] = signal(0);

export function Counter() {
  const button = h("button", {
    class: "my-button-1",
    "data-count": count,
    onclick: () => setCount(count() + 1),
  }, () => `Count is ${count()}`);

  return button;
}
