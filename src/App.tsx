import { Landing } from "components/Landing";
import LocalizeProvider from "services/translate/TranslateProvider";
import { ThemeProvider } from "services/theme/ThemeProvider";
import { GlobalThemeStyles } from "baseComponents/GlobalThemeStyles";

export const App = () => {
  return (
    <ThemeProvider>
      <LocalizeProvider>
        <GlobalThemeStyles />
        <Landing />
      </LocalizeProvider>
    </ThemeProvider>
  );
};
