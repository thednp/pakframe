import { TodoApp } from "../components/todo";
import { h } from "pakframe";

export const route = {
  preload: () => console.log('preload triggered'),
  load: () => console.log('load triggered'),
}

export function Page() {
  const h1 = h("h1", "To Do");

  return h(
    "div",
    h1,
    TodoApp(),
  );
}
