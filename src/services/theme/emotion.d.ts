import "@emotion/react";
import type { Theme } from "./theme";

declare module "@emotion/react" {
  interface Theme extends DefaultThemeExt {}
}

interface DefaultThemeExt {
  themeName: Theme["themeName"];
  palette: Theme["palette"];
}
