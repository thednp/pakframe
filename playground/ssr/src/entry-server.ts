// entry-server.js
import { renderPreloadLinks } from "pakframe/ssr";
import { setRouterState } from "pakframe/router";
// import { Head } from "pakframe/meta";
import { App } from "./App";
// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";

export async function render(url: string, manifest: Record<string, string[]>) {
  setRouterState(url);
  
  // console.log(typeof App, App, await App())
  const main = (await App() as HTMLElement).outerHTML;

  // console.log( app)
  // const head = await renderToString(Head());
  // const header = await renderToString(Header());
  // const footer = await renderToString(Footer());

  // allow code splitting for multiple pages
  // by disabling the preloading of page components
  const manifestFiles = Object.keys(manifest).filter((file) =>
    file !== undefined
  );
  const preloadLinks = renderPreloadLinks(manifestFiles, manifest);

  return { head: "", main, header: "", footer: "", preloadLinks };
}
