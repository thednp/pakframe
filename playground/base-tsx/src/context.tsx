import { createContext, useContext } from "pakframe";

const ThemeContext = createContext({ color: "dark" });

export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;

// export const ThemeProvider_ = (props, ...children) => {
//     return ThemeContext.Provider(props, ...children)
// };
