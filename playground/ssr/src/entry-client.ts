import { hydrate } from "pakframe";
import { App } from "./App";
// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";

const main = document.getElementById("main") as HTMLElement;
// const header = document.getElementById("app-header") as HTMLElement;
// const footer = document.getElementById("app-footer") as HTMLElement;

hydrate(main, App())
// main.replaceChildren(...unwrap(App()).children as HTMLElement[])
// hydrate(document.body, App())
// document.body.replaceChildren(App())
// add(document.body, App())
// hydrate(header, Header());
// hydrate(footer, Footer());

