import { Landing } from "components/Landing";
import LocalizeProvider from "services/translate/TranslateProvider";

export const App = () => {
  return (
    <LocalizeProvider>
      <Landing />
    </LocalizeProvider>
  );
};
