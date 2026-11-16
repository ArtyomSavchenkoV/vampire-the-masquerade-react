import { useContext } from "react";
import { ThemeContext, ThemeContextValue } from "services/theme/ThemeProvider";

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Не объявлен контекст: ThemeContext");
  }
  return context;
};

export default useTheme;
