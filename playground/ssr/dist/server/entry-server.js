import { escape as escape$1, createDocument } from "@thednp/domparser";
import { basename } from "node:path";
const isObject = (value) => value != null && typeof value === "object" && !Array.isArray(value);
const isArray = (value) => Array.isArray(value);
const isFunction = (value) => typeof value === "function";
const isNode = (value) => isObject(value) && "nodeName" in value;
const isPlainObject = (value) => isObject(value) && !isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
const urlAttributes = [
  "action",
  "cite",
  "data",
  "formaction",
  "href",
  "icon",
  "manifest",
  "poster",
  "src",
  "srcset",
  "xlink:href",
  "xml:base",
  "longdesc",
  "ping",
  "usemap"
];
const escape = (str) => {
  if (str === null || str === "") return "";
  else str = str.toString();
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return str.replace(/[&<>"']/g, (m) => {
    return map[m];
  });
};
const getStringValue = (child) => {
  const t = typeof child;
  return t === "string" ? escape(child) : "number" === t || "boolean" === t || "bigint" === t || "symbol" === t || child instanceof Date || child instanceof RegExp ? child.toString() : String(child);
};
function needsEncoding(attrKey, attrValue) {
  if (!urlAttributes.includes(attrKey)) return false;
  const percentEncodedPattern = /%[0-9A-Fa-f]{2}/;
  if (percentEncodedPattern.test(attrValue)) return false;
  return true;
}
const setHydrationKey = (target) => {
  !target.hasAttribute("data-hk") && target.setAttribute("data-hk", "");
};
const setAttribute = (element, key, rawValue) => {
  const value = isFunction(rawValue) ? rawValue() : rawValue;
  const attrKey = key.indexOf(":") > -1 ? key.replace(/^[^:]+:/, "") : key;
  if (value == null || value === false || value === "" || value === void 0) {
    element.removeAttribute(attrKey);
    element.removeAttribute(key);
  } else {
    const t = typeof value;
    const attrValue = value === true ? "" : t === "number" ? String(value) : !urlAttributes.includes(key) ? escape$1(value) : needsEncoding(key, value) ? encodeURI(value) : value;
    isFunction(rawValue) && setHydrationKey(element);
    element.setAttribute(attrKey, attrValue);
  }
};
const getStyleObject = (styleObject) => {
  const output = {};
  let key;
  let value;
  for (const [objKey, rawValue] of Object.entries(styleObject)) {
    key = objKey.split(/(?=[A-Z])/).join("-").toLowerCase();
    value = isFunction(rawValue) ? rawValue() : rawValue;
    if (value) output[key] = value;
  }
  return output;
};
const styleToString = (styleValue) => {
  const styleVal = isFunction(styleValue) ? styleValue() : styleValue;
  return typeof styleVal === "string" ? styleVal : isObject(styleVal) ? Object.entries(getStyleObject(styleVal)).reduce((acc, [key, value]) => acc + key + ":" + value + ";", "") : "";
};
const style = (target, styleValue) => {
  const styleVal = isFunction(styleValue) ? styleValue() : styleValue;
  const hasReactiveProp = isObject(styleVal) && Object.values(styleVal).some((sv) => isFunction(sv));
  setAttribute(target, "style", styleToString(styleVal));
  if (isFunction(styleValue) || hasReactiveProp) setHydrationKey(target);
};
if (typeof document === "undefined") globalThis.document = createDocument();
const add = (parent, child) => {
  if (!parent || !child) return;
  if (child instanceof Promise) child.then((resolved) => add(parent, resolved));
  else if (isArray(child)) child.forEach((c) => add(parent, c));
  else if (isNode(child)) parent.appendChild(child);
  else if (isFunction(child)) {
    const textNode = document.createTextNode("");
    parent.appendChild(textNode);
    const realChild = isFunction(child()) ? child() : child;
    const value = realChild();
    if (isArray(value)) {
      parent.textContent = "";
      value.forEach((v) => add(parent, v));
    } else if (isNode(value)) add(parent, child);
    else textNode.textContent = getStringValue(value);
  } else parent.appendChild(document.createTextNode(getStringValue(child)));
};
function listen(target, _event, _handler, _options) {
  setHydrationKey(target);
  return true;
}
function h(tagName, first, ...children) {
  const element = document.createElement(tagName);
  if (isObject(first) && !isNode(first) && !isArray(first)) Object.entries(first).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      if (isFunction(value)) setHydrationKey(element);
    } else if (key === "style") style(element, value);
    else setAttribute(element, key, value);
  });
  else add(element, first);
  add(element, children);
  return element;
}
function signal(value) {
  value = isFunction(value) ? value() : value;
  return [() => value, (nextValue) => {
    if (isFunction(nextValue)) value = nextValue(value);
    else value = nextValue;
  }];
}
function effect(fn) {
  fn();
}
function createState(obj, parentReceiver) {
  for (const [key, value] of Object.entries(obj)) if (isPlainObject(value)) parentReceiver[key] = createState(value, {});
  else {
    const [get, set] = signal(value);
    Object.defineProperty(parentReceiver, key, {
      get,
      set
    });
  }
  return parentReceiver;
}
function store(init) {
  return createState(init, {});
}
const List = (props) => {
  const { each, children } = props;
  const placeholder = document.createTextNode("");
  const Layout = () => {
    const items = each ? each() : [];
    const nodes = [];
    if (!children) return;
    for (const item of items) {
      const node = children(item);
      if (node) nodes.push(node);
    }
    if (nodes.length) return nodes;
    return placeholder;
  };
  return Layout();
};
function Show({ when, children }) {
  const placeholder = document.createTextNode("");
  const initialWhen = () => isFunction(when) ? when() : when;
  const newNodes = () => {
    const nodes = isFunction(children) ? children() : children;
    return isArray(nodes) ? nodes : [nodes];
  };
  const Layout = () => {
    const condition = initialWhen();
    const nodes = newNodes();
    if (condition && nodes.length) return nodes;
    return placeholder;
  };
  return Layout();
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) return `<link rel="preload" href="${file}" as="script" crossorigin>`;
  else if (file.endsWith(".css")) return `<link rel="preload" href="${file}" as="style" crossorigin>`;
  else if (file.endsWith(".woff")) return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  else if (file.endsWith(".woff2")) return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  else if (file.endsWith(".gif")) return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  else if (file.endsWith(".png")) return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  else if (file.endsWith(".webp")) return ` <link rel="preload" href="${file}" as="image" type="image/webp">`;
  else {
    console.warn("Render error! File format not recognized: " + file);
    return "";
  }
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  const ignoredAssets = /* @__PURE__ */ new Set();
  Object.entries(manifest).forEach(([id, files]) => {
    if ([
      "src/pages",
      "src/routes",
      "pakframe/"
    ].some((l) => id.includes(l))) files.forEach((asset) => ignoredAssets.add(asset));
  });
  modules.forEach((id) => {
    const files = manifest[id];
    if (files == null ? void 0 : files.length) files.forEach((file) => {
      if (seen.has(file) || ignoredAssets.has(file)) return;
      seen.add(file);
      const filename = basename(file);
      if (manifest[filename]) {
        for (const depFile of manifest[filename])
          if (!seen.has(depFile) && !ignoredAssets.has(depFile)) {
            links += renderPreloadLink(depFile);
            seen.add(depFile);
          }
      }
      links += renderPreloadLink(file);
    });
  });
  return links;
}
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const [count, setCount] = signal(0);
const [f, setF] = signal(count());
const doubleCount = () => {
  const currentCount = count();
  const result = currentCount * 2;
  if (currentCount >= 15) {
    console.warn("Your potato cannot process fibonaci!", f());
  } else {
    setF(fibonacci(result));
  }
  return result;
};
function Counter() {
  const button1 = h("button", {
    class: "btn btn-ghost hover:btn-secondary",
    "data-count": count,
    onclick: () => setCount(count() + 1)
  }, () => `Count is ${count()}`);
  const button2 = h(
    "button",
    {
      class: "btn btn-ghost hover:btn-primary",
      "data-doublecount": doubleCount,
      onclick: () => setCount(count() - 1)
    },
    `Double count is `,
    doubleCount
  );
  return [button1, button2];
}
const cn = (...classNames) => {
  let i = 0, tmp, str = "";
  const len = classNames.length;
  for (; i < len; i++) {
    if (tmp = classNames[i]) {
      if (typeof tmp === "string") {
        str += (str && " ") + tmp;
      }
    }
  }
  return str;
};
const todos = store({
  items: [
    { id: 654, text: "Make router", done: true },
    { id: 655, text: "Make types", done: false },
    { id: 657, text: "Make ssr", done: false }
  ],
  filter: "all"
});
function addTodo(text) {
  todos.items = [...todos.items, {
    id: (/* @__PURE__ */ new Date()).getTime(),
    done: false,
    text
  }];
}
function toggleTodo(todoId) {
  todos.items = todos.items.map((todo) => todo.id === todoId ? (todo.done = !todo.done, todo) : todo);
}
function clearCompleted() {
  for (let i = todos.items.length - 1; i >= 0; i--) {
    if (todos.items[i].done) {
      todos.items.splice(i, 1);
    }
  }
}
function TodoApp() {
  const input = h("input", {
    type: "text",
    class: "input",
    name: "todo-input",
    "aria-label": "Add a new todo here",
    placeholder: "Add a todo and press Enter",
    onkeydown: (e) => {
      if (e.key === "Enter") {
        const target = e.currentTarget;
        if (target.value.trim()) {
          addTodo(target.value.trim());
          target.value = "";
        }
      }
    }
  });
  const allFilter = h("button", {
    class: () => cn("btn", todos.filter === "all" ? "btn-primary" : ""),
    onclick: () => {
      todos.filter = "all";
    }
  }, "All");
  const activeFilter = h("button", {
    class: () => cn("btn", todos.filter === "active" ? "btn-primary" : ""),
    onclick: () => {
      todos.filter = "active";
    }
  }, "Active");
  const completedFilter = h("button", {
    class: () => cn("btn", todos.filter === "completed" ? "btn-primary" : ""),
    onclick: () => {
      todos.filter = "completed";
    }
  }, "Completed");
  const clearCompletedButton = h("button", {
    class: "btn btn-secondary",
    onclick: clearCompleted
  }, "Clear Completed");
  const filteredTodos = () => todos.items.filter(
    (todo) => todos.filter === "all" ? true : todos.filter === "active" ? !todo.done : todo.done
  );
  const TodoList = () => List({
    each: filteredTodos,
    children: (todo) => h(
      "li",
      h(
        "label",
        {
          style: { "text-decoration": () => todo.done ? "line-through" : "" }
        },
        h("input", {
          id: String(todo.id),
          type: "checkbox",
          checked: () => todo.done,
          onclick: () => toggleTodo(todo.id)
        }),
        todo.text
      )
    )
  });
  const remaining = h(
    "p",
    () => `${todos.items.filter((t) => !t.done).length} item${todos.items.filter((t) => !t.done).length !== 1 ? "s" : ""} remaining`
  );
  return h(
    "div",
    h("h1", "Todo List"),
    input,
    h(
      "ul",
      TodoList()
    ),
    h(
      "div",
      allFilter,
      activeFilter,
      completedFilter,
      clearCompletedButton
    ),
    remaining
  );
}
const Article = ({ as, title, count: count2, children }, ...otherChildren) => {
  const article = h(
    "article",
    { class: "article", onmouseenter: () => console.log("hi!") },
    h(as, title, ": ", count2),
    children || otherChildren
  );
  listen(article);
  return Show({
    when: () => count2 && count2() > 5,
    children: () => article
  });
};
function App() {
  const ViteLink = h(
    "a",
    { href: "https://vite.dev", target: "_blank" },
    h("img", {
      src: "/vite.svg",
      class: "logo vite",
      alt: "Vite logo"
    })
  );
  const TypeScriptLink = h(
    "a",
    {
      href: "https://typescriptlang.org/",
      target: "_blank",
      onmouseenter: (e) => console.log("hi!\n" + e.target)
    },
    h("img", {
      src: "/typescript.svg",
      class: "logo vanilla",
      alt: "TypeScript logo"
    })
  );
  const h1 = h("h1", "Vite + Typescript");
  const xPlus1 = () => h(
    "math",
    { style: { display: "inline" } },
    h(
      "mrow",
      () => {
        const [parts, setParts] = signal([
          h("mn", "Count"),
          h("mn", { style: "margin-right: 0.25rem" }, ":")
        ]);
        effect(() => {
          const currentCount = count();
          if (!currentCount) setParts((currentParts) => [
            ...currentParts.slice(0, 2),
            h("mi", { mathvariant: "italic" }, count)
          ]);
          else setParts((currentParts) => [
            ...currentParts.slice(0, 2),
            h("mi", { mathvariant: "italic" }, () => currentCount - 1),
            h("mo", { fence: "true" }, "+"),
            h("mn", "1"),
            h("mo", { fence: "true" }, "="),
            h("mi", { mathvariant: "italic" }, currentCount)
          ]);
        });
        return parts;
      }
    )
  );
  return h(
    "main",
    { id: "main", class: "prose" },
    h(
      "div",
      ViteLink,
      TypeScriptLink,
      h1
    ),
    h(
      "div",
      Article({ count, title: "This is an article title", as: "h2" }, "This is some child content: ")
    ),
    h(
      "div",
      xPlus1(),
      Counter(),
      TodoApp()
    )
  );
}
async function render(url, manifest) {
  const main = App().outerHTML;
  const manifestFiles = Object.keys(manifest).filter(
    (file) => file !== void 0
  );
  const preloadLinks = renderPreloadLinks(manifestFiles, manifest);
  return { head: "", main, header: "", footer: "", preloadLinks };
}
export {
  render
};
