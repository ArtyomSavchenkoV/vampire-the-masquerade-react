import { State } from "store/types";
import { initialState } from "store/initialState";
import { SavedData as SavedData0 } from "domain/savedDataVersions/0";
import { SavedData as SavedData1 } from "domain/savedDataVersions/1";

/**
 * Миграторы версий сохранённых данных.
 * Каждый ключ — версия файла, значение — набор функций для преобразования.
 */
export const dataMigrators = {
  "0": {
    toStore: (savedData: SavedData0): State => {
      // Мигрируем сразу до актуальной версии
      return dataMigrators["1"].toStore({
        version: 1,
        units: savedData,
      });
    },
    serializeToFile: null, // Старые версии не могут быть сохранены обратно
  },
  "1": {
    toStore: ({ version, ...savedData }: SavedData1): State => {
      return {
        ...initialState,
        units: savedData.units,
      };
    },
    serializeToFile: (state: State): SavedData1 => ({
      version: 1,
      units: state.units,
    }),
  },
} as const;

/**
 * Функция сериализации актуального стора в формат файла.
 * Гарантированно возвращает формат последней версии.
 */
export const serializeToFile = dataMigrators["1"].serializeToFile;

/**
 * Поддерживаемые версии
 */
type SupportedVersion = keyof typeof dataMigrators;

/**
 * Определяет версию данных, прочитанных из файла.
 * Возвращает ключ из dataMigrators.
 */
export const detectVersion = (savedData: unknown): SupportedVersion => {
  if (
    typeof savedData === "object" &&
    savedData !== null &&
    typeof (savedData as any).version === "number"
  ) {
    const versionKey = String((savedData as any).version);
    if (versionKey in dataMigrators) {
      return versionKey as SupportedVersion;
    }
    throw new Error(`Unsupported save version: ${versionKey}`);
  }
  return "0";
};
