import { darkPalette, lightPalette } from "styles/palette";

export type TPalette = {
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

export type TTheme = {
  palette: TPalette;
  themeName: "light" | "dark";
};

export const themes: Record<TTheme["themeName"], TTheme> = {
  light: { themeName: "light", palette: lightPalette },
  dark: { themeName: "dark", palette: darkPalette },
};
