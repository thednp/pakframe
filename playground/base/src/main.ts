import "./style.css";
import { Counter } from "./components/counter";
import { add, h } from "pakframe";

function App() {
  const ViteLink = h(
    "a",
    { href: "https://vite.dev", target: "_blank" },
    h("img", {
      src: "/vite.svg",
      class: "logo vite",
      alt: "Vite logo",
    }),
  );
  const TypeScriptLink = h(
    "a",
    {
      href: "https://typescriptlang.org/",
      target: "_blank",
    },
    h("img", {
      src: "/typescript.svg",
      class: "logo vanilla",
      alt: "TypeScript logo",
    }),
  );

  return h(
    "div",
    ViteLink,
    TypeScriptLink,
    h("h1", "Vite + Typescript"),
    Counter()
  );
}

add(document.getElementById("app")!, App());
