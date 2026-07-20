import { useContext } from "react";
import TranslateContext, {
  TranslateContextValue,
} from "services/translate/TranslateContext";

const useTranslate = (): TranslateContextValue => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error("Не объявлен контекст: TranslateContext");
  }
  return context;
};

export default useTranslate;
