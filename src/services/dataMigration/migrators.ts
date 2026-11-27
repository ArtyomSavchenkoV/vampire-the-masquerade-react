import { State } from "store/types";
import { initialState } from "store/initialState";
import { SavedData as SavedData0 } from "domain/savedDataVersions/0";
import {
  migrateFrom0To1,
  SavedData as SavedData1,
} from "domain/savedDataVersions/1";
import {
  migrateFrom1To2,
  SavedData as SavedData2,
} from "domain/savedDataVersions/2";
import {
  migrateFrom2To3,
  SavedData as SavedData3,
} from "domain/savedDataVersions/3";
import {
  migrateFrom3To4,
  SavedData as SavedData4,
} from "domain/savedDataVersions/4";
import {
  migrateFrom4To5,
  SavedData as SavedData5,
} from "domain/savedDataVersions/5";

/**
 * Миграторы версий сохранённых данных.
 * Каждый ключ — версия файла, значение — набор функций для преобразования.
 */
export const dataMigrators = {
  "0": {
    toStore: (savedData: SavedData0): State =>
      dataMigrators["1"].toStore(migrateFrom0To1(savedData)),
    serializeToSave: null, // Старые версии не могут быть сохранены
  },
  "1": {
    toStore: (savedData: SavedData1): State =>
      dataMigrators["2"].toStore(migrateFrom1To2(savedData)),
    serializeToSave: null, // Старые версии не могут быть сохранены
  },
  "2": {
    toStore: (savedData: SavedData2): State =>
      dataMigrators["3"].toStore(migrateFrom2To3(savedData)),
    serializeToSave: null, // Старые версии не могут быть сохранены
  },
  "3": {
    toStore: (savedData: SavedData3): State =>
      dataMigrators["4"].toStore(migrateFrom3To4(savedData)),
    serializeToSave: null, // Старые версии не могут быть сохранены
  },
  "4": {
    toStore: (savedData: SavedData4): State =>
      dataMigrators["5"].toStore(migrateFrom4To5(savedData)),
    serializeToSave: null, // Старые версии не могут быть сохранены
  },
  "5": {
    toStore: ({ version: _, ...savedData }: SavedData5): State => {
      return {
        ...initialState,
        ...savedData,
      };
    },
    serializeToSave: (state: State): SavedData5 => ({
      version: 5,
      units: state.units,
    }),
  },
} as const;

/**
 * Поддерживаемые версии
 */
type SupportedVersion = keyof typeof dataMigrators;

/*
 * Текущая версия
 */
const currentVersion: SupportedVersion = "5";

/**
 * Функция сериализации актуального стора в формат сохранения.
 * Гарантированно возвращает формат последней версии.
 */
export const serializeToSave = dataMigrators[currentVersion].serializeToSave;

/**
 * Функция сериализации данных из сохранения в актуальный стор.
 */
export const serializeFromSave = (data: any) => {
  const dataVersion = detectVersion(data);
  return dataMigrators[dataVersion].toStore(data);
};

/**
 * Определяет версию данных, прочитанных из файла.
 * Возвращает ключ из dataMigrators.
 */
function isSavedDataWithVersion(data: unknown): data is { version: number } {
  return (
    typeof data === "object" &&
    data !== null &&
    "version" in data &&
    typeof (data as any).version === "number"
  );
}

export const detectVersion = (savedData: unknown): SupportedVersion => {
  if (!isSavedDataWithVersion(savedData)) {
    // Если нет поля version — считаем это самой старой версией
    return "0";
  }

  const versionKey = String(savedData.version);
  if (versionKey in dataMigrators) {
    return versionKey as SupportedVersion;
  }

  throw new Error(`Unsupported save version: ${versionKey}`);
};
