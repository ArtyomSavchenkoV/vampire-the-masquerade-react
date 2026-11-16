import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { FC, ReactNode, useMemo, useState, createContext } from "react";
import { Theme, themes } from "./theme";

export type ThemeContextValue = {
  themeName: Theme["themeName"];
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  themeName: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<Theme["themeName"]>("light");

  const value = useMemo<ThemeContextValue>(
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
