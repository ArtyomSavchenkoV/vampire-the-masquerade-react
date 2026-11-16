export type Palette = {
  background: string;
  surface: string;
  text: string;
  textInvert: string;
  divider: string;

  scrollBackground: string;
  scroll: string;
  scrollHover: string;

  buttonBackground: string;
  buttonText: string;

  input: string;

  white: string;
  black: string;
  red: string;
  orange: string;
  green: string;
  sky: string;
  sapphire: string;

  shift: string;
};

const lightPalette: Palette = {
  background: "#f5f4f0",
  surface: "#ffffff",
  text: "#1a1a1a",
  textInvert: "#ccc",
  divider: "#ccc",

  scrollBackground: "#f5f4f0",
  scroll: "#ffffff",
  scrollHover: "#eee",

  buttonBackground: "#eee",
  buttonText: "#1a1a1a",

  input: "#ffffff",

  white: "#fff",
  black: "#333",
  red: "#f30",
  green: "#3f0",
  orange: "orange",
  sky: "#9bf",
  sapphire: "#07f",

  shift: "#000000",
};

const darkPalette: Palette = {
  background: "#1c1b1a",
  surface: "#333",
  text: "#ccc",
  textInvert: "#1a1a1a",
  divider: "#555",

  scrollBackground: "#1c1b1a",
  scroll: "#333",
  scrollHover: "#222",

  buttonBackground: "#444",
  buttonText: "#e8e6e3",

  input: "#333",

  white: "#ddd",
  black: "#000",
  red: "#f30",
  green: "#3f0",
  orange: "orange",
  sky: "#2d487d",
  sapphire: "#4cf",

  shift: "#ffffff",
};

export type Theme = {
  palette: Palette;
  themeName: "light" | "dark";
};

export const themes: Record<Theme["themeName"], Theme> = {
  light: { themeName: "light", palette: lightPalette },
  dark: { themeName: "dark", palette: darkPalette },
};
