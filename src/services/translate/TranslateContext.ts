import { DictionaryTranslatePaths } from "dictionaries/types";
import { createContext, ReactNode } from "react";

export interface TTranslate {
  (
    path: DictionaryTranslatePaths,
    inserts?: { [key: string]: string | number },
  ): string;
}

/** Возвращает ReactNode: строки из словаря чередуются с вставками-элементами. */
export interface TTranslateRich {
  (
    path: DictionaryTranslatePaths,
    inserts?: { [key: string]: ReactNode },
  ): ReactNode;
}

export interface TranslateContextValue {
  translate: TTranslate;
  translateRich: TTranslateRich;
}

const TranslateContext = createContext<TranslateContextValue | null>(null);

export default TranslateContext;
