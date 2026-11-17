import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { FC, ReactNode, useMemo, useState, createContext } from "react";
import { TTheme, themes } from "./theme";

export type TThemeContextValue = {
  themeName: TTheme["themeName"];
  toggleTheme: () => void;
};

export const ThemeContext = createContext<TThemeContextValue>({
  themeName: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<TTheme["themeName"]>("light");

  const value = useMemo<TThemeContextValue>(
    () => ({
      themeName,
      toggleTheme: () =>
        setThemeName((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [themeName],
  );

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={themes[themeName]}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
