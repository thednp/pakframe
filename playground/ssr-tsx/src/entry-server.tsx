// entry-server.js
// import { renderPreloadLinks, renderToString } from "@vanjs/server";
// import { setRouterState } from "@vanjs/router";
// import { Head } from "@vanjs/meta";
import { App } from "./App";
// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";

export async function render(url: string, manifest: Record<string, string[]>) {
  // setRouterState(url);

  // const main = await renderToString(<App />);
  // const head = await renderToString(Head());
  // const header = await renderToString(<Header />);
  // const footer = await renderToString(<Footer />);

  // allow code splitting for multiple pages
  // by disabling the preloading of page components
  const manifestFiles = Object.keys(manifest).filter((file) =>
    file !== undefined
  );
  const preloadLinks = renderPreloadLinks(manifestFiles, manifest);

  return { head, main, header, footer, preloadLinks };
}
