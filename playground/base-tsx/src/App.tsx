import { add } from "pakframe";
import { Counter } from "./components/Counter";
import { Sample } from "./components/Sample";
import { ThemeProvider, useTheme } from "./context";
import "./style.css";

const Main = () => {
  const { color } = useTheme();

  console.log("Main", { color });
  return (
    <>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://typescriptlang.org/" target="_blank">
        <img src="/typescript.svg" class="logo vanilla" alt="TypeScript logo" />
      </a>

      <h1>Vite + Typescript</h1>
      <Counter />
      {/* <Sample /> */}
    </>

  )
}

export function App() {
  return (
    <main>
      <ThemeProvider value={{ color: "red" }} children={Main} />
      <Sample />
    </main>
  )
}

add(document.getElementById("app")!, <App />);
