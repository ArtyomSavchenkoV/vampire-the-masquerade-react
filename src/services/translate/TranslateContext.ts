import { DictionaryTranslatePaths } from "dictionaries/types";
import { createContext } from "react";

export interface TTranslate {
  (
    path: DictionaryTranslatePaths,
    inserts?: { [key: string]: string | number },
  ): string;
}

export interface TranslateContextValue {
  translate: TTranslate;
}

const TranslateContext = createContext<TranslateContextValue | null>(null);

export default TranslateContext;
