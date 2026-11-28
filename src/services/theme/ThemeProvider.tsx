import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { getLocalStorageValue, setLocalStorageValue } from "localStorage";
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
  const [themeName, setThemeName] = useState<TTheme["themeName"]>(
    getLocalStorageValue("themeVariant"),
  );

  const value = useMemo<TThemeContextValue>(
    () => ({
      themeName,
      toggleTheme: () =>
        setThemeName((prev) => {
          const themeVariant = prev === "light" ? "dark" : "light";
          setLocalStorageValue("themeVariant", themeVariant);
          return themeVariant;
        }),
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
