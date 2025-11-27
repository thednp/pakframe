import { effect, signal } from "pakframe";
import { useTheme } from "../context";


// Global state
const [count, setCount] = signal(0);

export const Counter = () => {
  let btnRef;
  const theme = useTheme();
  theme.color = "red";

  setTimeout(() => console.log({btnRef}), 500);
  effect(() => {
    const currentCount = count();
    console.log({color: theme.color, btnRef, currentCount})
  })

  return (
    <button
      ref={btnRef}
      class="my-button-1"
      data-count={count}
      onClick={() => setCount(count() + 1)}
    >
      {'Count is '}
      {count}
    </button>
  )
}
