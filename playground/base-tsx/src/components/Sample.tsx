import { effect } from "pakframe";
import { useTheme } from "../context";


export const Sample = () => {
  const theme = useTheme();
  const getTheme = () => theme.color;

  effect(() => {
    const currentColor = getTheme();
    console.log("Sample", { currentColor })
  });

  return (
    <button
      class="my-button-2"
      onclick={() => console.log({ currentColor: getTheme() })}
    >
      {'Sample'}
    </button>
  )
}
