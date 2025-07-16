import { h, listen, Show, type Accessor, type FunctionMaybe, type MaybeChildNode } from "pakframe"

interface ArticleProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title: FunctionMaybe<string>;
  count: Accessor<number>;
  children?: MaybeChildNode;
}

export const Article = ({ as, title, count, children }: ArticleProps, ...otherChildren: MaybeChildNode[]) => {
  const article = h("article", { class: "article", onmouseenter: () => console.log("hi!") },
    h(as || "h2", title, ": ", count),
    children || otherChildren
  );
  
  listen(article, "mouseleave", () => console.log("leave?"));
  
  return Show(({
    when: () => count && count() > 5,
    children: () => article
  }))
};
