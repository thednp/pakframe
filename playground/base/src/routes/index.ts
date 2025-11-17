import { Counter, count } from "../components/counter";
import { TodoApp } from "../components/todo";
import { Article } from "../components/article";
import { effect, h, signal, type MaybeChildNode } from "pakframe";


export const route = {
    preload: () => console.log('preload triggered'),
    load: () => console.log('load triggered'),
}

export function Page() {
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
      onmouseenter: (e: MouseEvent) => console.log("hi!\n" + e.target),
    },
    h("img", {
      src: "/typescript.svg",
      class: "logo vanilla",
      alt: "TypeScript logo",
    }),
  );

  const h1 = h("h1", "Vite + Typescript");
  const xPlus1 = () => h('math', { style: { display: 'inline' } },
    h('mrow',
      () => {
        const [parts, setParts] = signal<MaybeChildNode[]>([
          h('mn', 'Count'),
          h('mn', { style: "margin-right: 0.25rem" }, ':'),
        ]);
        effect(() => {
          const currentCount = count();
          if (!currentCount) setParts(currentParts => ([ ...currentParts.slice(0, 2),
            h('mi', { mathvariant: 'italic' }, count)
          ]));
          else setParts(currentParts => [
            ...currentParts.slice(0, 2),
            h('mi', { mathvariant: "italic" } , () => currentCount - 1),
            h('mo', { fence: 'true' }, '+'),
            h('mn', '1'),
            h('mo', { fence: 'true' }, '='),
            h('mi', { mathvariant: 'italic' }, currentCount)
          ])
        })
        return parts
      },
    )
  )

  return h(
    "div",
    ViteLink,
    TypeScriptLink,
    h1,
    Article({ count, title: () => "This is an article title", as: "h2" }, "This is some child content: "),
    xPlus1(),
    Counter(),
    TodoApp(),
  );
}
