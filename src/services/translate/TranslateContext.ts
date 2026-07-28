import { Dictionary } from "dictionaries/types";
import { createContext } from "react";

type Path<Obj> = Obj extends object
  ? {
      [Key in keyof Obj & string]: Obj[Key] extends object
        ? `${Key}.${Path<Obj[Key]>}`
        : Key;
    }[keyof Obj & string]
  : never;

export interface TTranslate {
  (
    path: Path<Dictionary>,
    inserts?: { [key: string]: string | number },
  ): string;
}

export interface TranslateContextValue {
  translate: TTranslate;
}

const TranslateContext = createContext<TranslateContextValue | null>(null);

export default TranslateContext;
