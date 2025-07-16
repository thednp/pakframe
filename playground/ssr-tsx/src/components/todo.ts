// todo.ts
import { createElement, store } from "../framework";

// Define the todo item type
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// Create a store for the todo list
const todos = store<{ items: Todo[], filter: "all" | "active" | "completed"}>({
  items: [],
  filter: "all",
});

// Function to add a new todo
function addTodo(text: string) {
  todos.items.push({
    id: todos.items.length,
    done: false,
    text,
  })
}

// Function to toggle a todo's done status
function toggleTodo(id: number) {
  todos.items[id].done = !todos.items[id].done;
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
  const input = createElement("input", {
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
  const allFilter = createElement("button", {
    class: () => todos.filter === "all" ? "active" : "",
    onclick: () => {
      todos.filter = "all";
    },
  }, "All");
  const activeFilter = createElement("button", {
    class: () => todos.filter === "active" ? "active" : "",
    onclick: () => {
      todos.filter = "active";
    },
  }, "Active");
  const completedFilter = createElement("button", {
    class: () => todos.filter === "completed" ? "active" : "",
    onclick: () => {
      todos.filter = "completed";
    },
  }, "Completed");
  const clearCompletedButton = createElement("button", {
    onclick: clearCompleted,
  }, "Clear Completed");

  const todoItems = () => {
    const filtered = todos.items.filter(todo => 
      todos.filter === "all" 
        ? true 
        : todos.filter === "active" 
        ? !todo.done 
        : todo.done
    );

    return filtered.map(todo => 
      createElement("li", 
        createElement("label",
          {
            // style: () => todo.done ? "text-decoration: line-through;" : "",
            style: () => todo.done ? ({ "text-decoration": "line-through;" }) : null,
          },
          createElement("input", {
            type: "checkbox",
            id: () => `checkbox-${todo.id}`,
            checked: () => todo.done,
            onclick: () => toggleTodo(todo.id),
          }),
          todo.text
        )
      )
    );
  };

  // Todo list rendering
  // const todoList = createElement("ul", todoItems());
  const todoList = createElement("ul", todoItems);

  // Remaining todos count
  const remaining = createElement(
    "p",
    () =>
      `${todos.items.filter((t) => !t.done).length} item${
        todos.items.filter((t) => !t.done).length !== 1 ? "s" : ""
      } remaining`,
  );

  return createElement(
    "div",
    createElement("h1", "Todo List"),
    input,
    todoList,
    createElement(
      "div",
      allFilter,
      activeFilter,
      completedFilter,
      clearCompletedButton,
    ),
    remaining,
  );
}
