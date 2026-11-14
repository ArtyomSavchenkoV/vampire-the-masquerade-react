import { ru } from "dictionaries/ru";
import { Dictionary } from "dictionaries/types";
import { FC, Fragment, ReactNode } from "react";
import TranslateContext, {
  TTranslate,
  TTranslateRich,
} from "services/translate/TranslateContext";

/** Общий обход словаря по пути: возвращает строку или null, если путь не найден. */
const findInDictionary = (
  dictionary: Dictionary,
  path: string,
): string | null => {
  const pathParts = path.split(".");
  let dictionaryPart: { [key: string]: any } = dictionary;
  for (let i = 0; i < pathParts.length; i += 1) {
    const field = dictionaryPart[pathParts[i]];
    if (field && typeof field === "object") {
      dictionaryPart = field;
    } else if (typeof field === "string") {
      return field;
    } else {
      return null;
    }
  }
  return null;
};

interface Props {
  children: ReactNode;
}

const TranslateProvider: FC<Props> = ({ children }) => {
  const getTranslate: (dictionary: Dictionary) => TTranslate =
    (dictionary) => (path, inserts) => {
      const result = findInDictionary(dictionary, path);
      if (result === null) {
        return "#" + path;
      }
      if (inserts) {
        let withInserts = result;
        for (const key in inserts) {
          withInserts = withInserts.replace(`{${key}}`, String(inserts[key]));
        }
        return withInserts;
      }
      return result;
    };

  const getTranslateRich: (dictionary: Dictionary) => TTranslateRich =
    (dictionary) => (path, inserts) => {
      const raw = findInDictionary(dictionary, path);
      if (raw === null) {
        return "#" + path;
      }
      if (!inserts) {
        return raw;
      }

      const parts: ReactNode[] = [];
      const regex = /\{(\w+)\}/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      let index = 0;
      while ((match = regex.exec(raw)) !== null) {
        if (match.index > lastIndex) {
          parts.push(raw.slice(lastIndex, match.index));
        }
        const insert = inserts[match[1]];
        if (insert !== undefined && insert !== null) {
          parts.push(<Fragment key={`insert-${index}`}>{insert}</Fragment>);
        } else {
          // вставка не передана — оставляем плейсхолдер как есть, чтобы проблему было видно
          parts.push(match[0]);
        }
        lastIndex = regex.lastIndex;
        index += 1;
      }
      if (lastIndex < raw.length) {
        parts.push(raw.slice(lastIndex));
      }
      return parts;
    };

  return (
    <TranslateContext.Provider
      value={{
        translate: getTranslate(ru),
        translateRich: getTranslateRich(ru),
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
