import { store, List, memo,} from "pakframe";

// Define the todo item type
interface Todo {
  id: number;
  text: string;
  done: boolean;
}


type TodoStore = { items: Todo[]; filter: "all" | "active" | "completed" }

// Create a store for the todo list
const todos = store<TodoStore>({
  items: [],
  filter: "all",
});

// Function to add a new todo
function addTodo(text: string) {
  todos.items.push({
    id: new Date().getTime(),
    done: false,
    text,
  })
}

// Function to toggle a todo's done status
function toggleTodo(id: number) {
  const item = todos.items.find(todo => todo.id === id);
  if (item) item.done = !item.done;
}

// Function to clear completed todos
function clearCompleted() {
  for (let i = todos.items.length - 1; i >= 0; i--) {
    if (todos.items[i].done) {
      todos.items.splice(i, 1);
    }
  }
}

const filteredTodos = memo(() => 
  todos.items
  .filter((todo) =>
    todos.filter === "all"
      ? true
      : todos.filter === "active"
      ? !todo.done
      : todo.done,
  )
)

export const TodoApp = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        name="todo-input"
        aria-label="Add a new todo here"
        placeholder="Add a todo and press Enter"
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            const target = e.currentTarget as HTMLInputElement;
            if (target.value.trim()) {
              addTodo(target.value.trim());
              target.value = "";
            }
          }
        }}
      />

      <List each={filteredTodos} as="div" class={"red"}>
        {todo => (
          <div>
            <label style={{ textDecoration: () => todo.done ? "line-through" : "" }}>
              <input
                id={String(todo.id)}
                type="checkbox" 
                checked={() => todo.done}
                onClick={() => toggleTodo(todo.id)}
              />
              {todo.text}
            </label>
          </div>
        )}
      </List>
    
      <div>
        <button
          class={() => (todos.filter === "all" ? "active" : "")}
          onClick={() => {
            todos.filter = "all";
          }}
        >
          All
        </button>
        <button
          class={() => (todos.filter === "active" ? "active" : "")}
          onClick={() => {
            todos.filter = "active";
          }}
        >
          Active
        </button>
        <button
          class={() => (todos.filter === "completed" ? "active" : "")}
          onClick={() => {
            todos.filter = "completed";
          }}
        >
          Completed
        </button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
      <p>
        {() =>
          `${todos.items.filter((t) => !t.done).length} item${
            todos.items.filter((t) => !t.done).length !== 1 ? "s" : ""
          } remaining`
        }
      </p>
    </div>
  );
}