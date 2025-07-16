import type { JSX } from "pakframe/jsx-runtime"

interface ArticleProps  {
  title: string | (() => string);
  children: JSX.Element
}

export const Article = ({ title, children }: ArticleProps) => {
  return (
    <article>
      <h3>{title}</h3>
      {children}
    </article>
  );  
}
