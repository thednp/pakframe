import { add } from "pakframe";
import { Counter } from "./components/Counter";
import { Sample } from "./components/Sample";
import { ThemeProvider } from "./context";
import "./style.css";

export function App() {
  return (
    <ThemeProvider value={{ color: "red" }}>
      <main>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo vanilla" alt="Vite logo" />
        </a>
        <a href="https://typescriptlang.org/" target="_blank">
          <img src="/typescript.svg" class="logo vanilla" alt="TypeScript logo" />
        </a>

        <h1>Vite + Typescript</h1>
        <Counter />
        <Sample />
      </main>
    </ThemeProvider>
  )
}

add(document.getElementById("app")!, <App />);
