import { ru } from "dictionaries/ru";
import { FC, ReactNode } from "react";
import TranslateContext, {
  TTranslate,
} from "services/translate/TranslateContext";

interface Props {
  children: ReactNode;
}

const TranslateProvider: FC<Props> = ({ children }) => {
  const getTranslate: (dictionary: { [key: string]: any }) => TTranslate =
    (dictionary) => (path, inserts) => {
      const pathParts = path.split(".");
      let result = "#" + path;
      let dictionaryPart: { [key: string]: any } = dictionary;
      for (let i = 0; i < pathParts.length; i += 1) {
        const key = pathParts[i];
        const field = dictionaryPart[key];
        if (field && typeof field === "object") {
          dictionaryPart = field;
        } else if (typeof field === "string") {
          result = field;
          if (inserts) {
            for (let key in inserts) {
              const val = inserts[key];
              result = result.replace(`{${key}}`, String(val));
            }
          }
          break;
        } else {
          break;
        }
      }
      return result;
    };

  return (
    <TranslateContext.Provider
      value={{
        translate: getTranslate(ru),
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
