import "./style.css";
import { Counter } from "./components/counter.ts";
import { TodoApp } from "./components/todo.ts";
import { MyComponent } from "./components/MyComponent.tsx";
import { add } from "../../../../framework/index.ts";

export function App() {
  return (
    <>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="/typescript.svg" class="logo vanilla" alt="TypeScript logo" />
      </a>

      <h1>Vite + Typescript</h1>
      <Counter />
      <TodoApp />
      <MyComponent text="Sample component" />
    </>
  )
}

add(document.getElementById("app")!, <App /> as HTMLElement[]);
