import { createContext } from "react";

export interface TTranslate {
  (path: string, inserts?: { [key: string]: string | number }): string;
}

export interface TranslateContextValue {
  translate: TTranslate;
}

const TranslateContext = createContext<TranslateContextValue | null>(null);

export default TranslateContext;
