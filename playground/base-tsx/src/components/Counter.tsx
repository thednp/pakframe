import { signal } from "pakframe";
import type { JSX } from "pakframe/jsx-runtime";

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Global state
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

export const Counter = () => (
  <button
    class="my-button-1"
    data-count={count}
    onClick={() => setCount(count() + 1)}
  >
    {'Count is '}
    {count}
  </button>
)

export const MathMLCounter: JSX.Component<"button"> = () => {
  return (
    <button
      class="math-button"
      onClick={() => setCount(count() + 1)}
      data-count={count}
    >
      {'Double count: '}
      <math display="block">
        <mrow>
          <mn>{count}</mn>
          <mo>x</mo>
          <mn>2</mn>
          <mo>=</mo>
          <mn>{doubleCount}</mn>
        </mrow>
      </math>
    </button>

  );
}