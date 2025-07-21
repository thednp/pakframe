# ⚛️ pakframe

A lightweight, reactive TypeScript framework for building dynamic web interfaces with a simple signal-based state management system and a flexible DOM creation utility.

When creating a new vite project, this should be the JavaScript / TypeScript starter template.

[Try it now!](https://stackblitz.com/fork/github/thednp/framework-starter)

## Features

- **Reactive State Management**: Uses signals (`signal`), stores (`store`), memo (`memo`) and effects (`effect`) for reactive updates.
- **Type-Safe DOM Creation**: Provides a `createElement` function for creating HTML, SVG, and MathML elements with TypeScript support.
- **Automatic Cleanup**: Handles cleanup of event listeners and reactive effects.
- **Namespace Support**: Supports namespaced attributes (e.g., `xlink:href`, `xml:lang`) for SVG and other elements.
- **Flexible Child Nodes**: Supports strings, numbers, DOM nodes, arrays, and reactive accessors as children.

## Installation

```bash
npm install pakframe
```

```bash
pnpm add pakframe
```

```bash
deno add pakframe
```

```bash
bun add pakframe
```

## Wiki
Coming soon.

## Usage

### Creating a Signal

Use `signal` to create reactive state:

```ts
import { signal } from './framework';

const [count, setCount] = signal(0);
```
* `count` is an accessor function (() => T) that retrieves the current value.
* `setCount` is a setter function ((v: T) => void) that updates the value and notifies observers.


### Creating Effects

Use `effect` to run side effects when signals change:

```ts
import { signal, effect } from 'pakframe';

const [count, setCount] = signal(0);

effect(() => {
  console.log(`Count is ${count()}`);
});
```

> **Note**: `effect` automatically tracks dependencies (signals accessed within it) and re-runs when they change.


### Creating DOM Elements

Use `h` (short for hyperscript) to build DOM elements with reactive props and children:

```ts
import { h, signal } from 'pakframe';

const [count, setCount] = signal(0);

const button = h('button', 
  { 
    class: 'my-button', 
    'data-count': count, 
    onclick: () => setCount(count() + 1) 
  },
  () => `Count is ${count()}`
);
```

> **Notes**:
> * `h` supports HTML, SVG, and MathML elements with automatic namespace resolve.
> * Props can be static values or reactive accessors (e.g., `count`).
> * Event handlers are attached for props starting with "on" (e.g., `onclick`).
> * Children can be `String`s, `Number`s, DOM `Node`s, `Array`s, or reactive `Accessor`s.


## Example Application
```ts
import { signal, h, add } from 'pakframe';

function Counter() {
  const [count, setCount] = signal(0);
  const doubleCount = () => count() * 2;

  const button1 = h('button', 
    { class: 'my-button-1', 'data-count': count, onclick: () => setCount(count() + 1) },
    () => `Count is ${count()}`
  );
  const button2 = h('button', 
    { class: 'my-button-2', 'data-doublecount': doubleCount, onclick: () => setCount(count() + 1) },
    'Double count is ', doubleCount
  );

  return [button1, button2];
}

function App() {
  const h1 = h('h1', 'Vite + TypeScript');
  return h('div', h1, Counter());
}

add(document.getElementById('app')!, App());
```

This creates a simple app with a heading and two buttons that share a common `count` state, demonstrating reactivity and component composition.

Notice the difference of structure for the two buttons.


## API Reference
```ts
function signal<T>(value: T): [Accessor<T>, Setter<T>]
```
Creates a reactive `signal` with an `Accessor` and a `Setter`.

```ts
type Accessor<T>: () => T
```
An `Accessor` retrieves the current value.

```ts
type Setter<T>: (v: T) => void
```
A `Setter` updates the value and notifies observers.

```ts
function effect<T>(fn: () => T | void): () => void
```
Runs a function reactively, tracking signal dependencies, with cleanup support.
Returns a cleanup function to stop the effect.

```ts
function h<K extends TagNames>(tagName: K, props?: DOMNodeAttributes | MaybeChildNode, ...children: MaybeChildNode[]): DOMElement
```
Creates a DOM element with the specified tag, props, and children.
* `tagName`: HTML, SVG, or MathML tag name.
* `props`: Object with attributes, event handlers (on*), or reactive accessors.
* `children`: `String`s, `Number`s, `Node`s, `Array`s of the other three, or reactive accessors.
* Supports namespaces for SVG/MathML and attributes like `xlink:href`.

```ts
function add = (parent: ParentNode, child: MaybeChildNode)
```
Appends one or more child `Element`s or `String`s to a parent `Node`, handling various child types.


## Contributing
This is a minimal framework purposes. Contributions are welcome! Potential improvements include:
* Adding a proper component / templating system.
* Supporting more advanced reactive patterns (e.g., `async`, `resource`, etc.).
* Improving TypeScript inference for custom elements.
* Adding tests.


## About
This project was started as a [framework starter](https://github.com/thednp/framework-starter) to improve on various features and follows the [SolidJS](https://solidjs.com) design but with a much more simple architecture.


## License
[MIT License](LICENSE). Feel free to use, modify, and distribute this framework.
