import { add, effect, signal } from "pakframe";
import "./style.css";
import { Counter, MathMLCounter } from "./components/Counter";
import { TodoApp } from "./components/Todo";
import { Article } from "./components/Article";

export function App() {
  const [count, setCount] = signal(0);
  const [viteLinkRef, setViteLinkRef] = signal<HTMLAnchorElement | null>(null);
  // let viteLinkRef!: HTMLAnchorElement;

  effect(() => 
    console.log(viteLinkRef())
  )

  return (
    <>
      <a ref={setViteLinkRef} href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://typescriptlang.org/" target="_blank">
        <img src="/typescript.svg" class="logo vanilla" alt="TypeScript logo" />
      </a>

      <h1>Vite + Typescript</h1>
      <MathMLCounter />
      <Counter />
      <button
        class="my-button-5"
        data-count={count}
        onClick={() => setCount(count() + 1)}
      >
        {'Count is '}
        {count}
      </button>
      <TodoApp />
      <Article title={() => "Sample component: " + count()}>
        <p>This is a random paragraph</p>
      </Article>
    </>
  )
}

add(document.getElementById("app")!, () => <App />);
