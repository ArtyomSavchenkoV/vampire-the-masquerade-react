import { ru } from "./ru";
import { ObjectPaths } from "utils/types/ObjectPaths";
// import { DisciplineTranslationKeys } from "domain/Discipline";

export type Dictionary = typeof ru;

export type DictionaryTranslatePaths = ObjectPaths<Dictionary>;

// TODO: подумать, может быть можно типизировать соответствие дисциплин и переводов здесь, без необходимости разделять объект переводов
// type MissingDisciplineKeys = Exclude<
//   DisciplineTranslationKeys,
//   ObjectPaths<Dictionary>
// >;
//
// // Если чего-то не хватает — ошибка покажет union недостающих ключей
// const _disciplineTranslationsAreComplete: MissingDisciplineKeys extends never
//   ? true
//   : MissingDisciplineKeys = true;
