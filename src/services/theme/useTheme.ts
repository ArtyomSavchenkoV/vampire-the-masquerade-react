import { useContext } from "react";
import { ThemeContext, TThemeContextValue } from "services/theme/ThemeProvider";

const useTheme = (): TThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Не объявлен контекст: ThemeContext");
  }
  return context;
};

export default useTheme;
