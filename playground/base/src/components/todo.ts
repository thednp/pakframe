// todo.ts
import { h, List, store } from "pakframe";

// Define the todo item type
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// Create a store for the todo list
const todos = store<{ items: Todo[], filter: "all" | "active" | "completed" }>({
  items: [
    {id: 654, text: "Make router", done: true },
    {id: 655, text: "Make types", done: false },
    {id: 657, text: "Make ssr", done: false },
  ],
  filter: "all",
});

// Function to add a new todo
function addTodo(text: string) {
  console.log(todos)
  todos.items = [...todos.items, {
    id: new Date().getTime(),
    done: false,
    text,
  }]
  
  // todos.items.push({
  //     id: Date.now(),
  //     done: false,
  //     text,
  // })
  console.log({ [`todos.items[0]`]: todos.items[0] })
}

// Function to toggle a todo's done status
function toggleTodo(todoId: number) {
  console.log(todos)
  // const todo = todos.items.find(({ id }) => todoId === id);
  // if (todo) todo.done = !todo.done

  // const idx = todos.items.indexOf(todo!)
  // todos.items[idx].done = !todos.items[idx].done;

  todos.items = todos.items.map(todo => 
    todo.id === todoId ? (todo.done = !todo.done, todo) : todo)
}

// Function to clear completed todos
function clearCompleted() {
  // todos.items = todos.items.filter((todo) => !todo.done);

  for (let i = todos.items.length - 1; i >= 0; i--) {
    if (todos.items[i].done) {
      todos.items.splice(i, 1);
    }
  }
}

// Todo list component
export function TodoApp() {
  // Input for new todos
  const input = h("input", {
    type: "text",
    name: "todo-input",
    "aria-label": "Add a new todo here",
    placeholder: "Add a todo and press Enter",
    onkeydown: (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const target = e.currentTarget as HTMLInputElement;
        if (target.value.trim()) {
          addTodo(target.value.trim());
          target.value = "";
        }
      }
    },
  });

  // Filter buttons
  const allFilter = h("button", {
    class: () => todos.filter === "all" ? "active" : "",
    onclick: () => {
      todos.filter = "all";
    },
  }, "All");
  const activeFilter = h("button", {
    class: () => todos.filter === "active" ? "active" : "",
    onclick: () => {
      todos.filter = "active";
    },
  }, "Active");
  const completedFilter = h("button", {
    class: () => todos.filter === "completed" ? "active" : "",
    onclick: () => {
      todos.filter = "completed";
    },
  }, "Completed");
  const clearCompletedButton = h("button", {
    onclick: clearCompleted,
  }, "Clear Completed");

  // Todo list rendering
  const filteredTodos = () => todos.items.filter(todo =>
    todos.filter === "all"
      ? true
      : todos.filter === "active"
        ? !todo.done
        : todo.done
  );

  const TodoList = () => List({
    each: filteredTodos,
    children: todo => h("li",
      h("label",
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

  // Remaining todos count
  const remaining = h(
    "p",
    () =>
      `${todos.items.filter((t) => !t.done).length} item${todos.items.filter((t) => !t.done).length !== 1 ? "s" : ""
      } remaining`,
  );

  return h(
    "div",
    h("h1", "Todo List"),
    input,
    h('ul',
      TodoList(),
    ),
    h(
      "div",
      allFilter,
      activeFilter,
      completedFilter,
      clearCompletedButton,
    ),
    remaining,
  );
}
