import { mapObject } from "utils/object/mapObject";
import { GetUnitEntry, GetUnitType } from "./3";
import { SavedData as PrevSavedData } from "./4";

/*
 * Получаем исходные типы
 */
type PrevUnitEntry = GetUnitEntry<PrevSavedData>;

type KindredType = GetUnitType<PrevUnitEntry, "kindred">;
type GhoulType = GetUnitType<PrevUnitEntry, "ghoul">;
type HumanType = GetUnitType<PrevUnitEntry, "human">;
type CreatureType = GetUnitType<PrevUnitEntry, "creature">;

/*
 * Не изменившиеся типы
 */

/*
 * Изменившиеся типы
 */
// Применяем изменения к модели существа
type ChangedCreature = CreatureType & {
  // Добавили поля:
  animalSpecies: string | null;
  role: string;
};

// Формируем тип массива Units
type Units = Record<
  string,
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "kindred";
      unit: KindredType;
    })
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "ghoul";
      unit: GhoulType;
    })
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "human";
      unit: HumanType;
    })
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "creature";
      unit: ChangedCreature;
    })
>;

export type SavedData = {
  version: 5;
  units: Units;
};

/*
 * Функции миграций
 */
export const migrateFrom4To5 = (savedData: PrevSavedData): SavedData => ({
  ...savedData,
  version: 5,
  units: mapObject(savedData.units, (unit) => {
    if (unit.type === "kindred") {
      return unit;
    }
    if (unit.type === "ghoul") {
      return unit;
    }
    if (unit.type === "human") {
      return unit;
    }
    if (unit.type === "creature") {
      return {
        ...unit,
        unit: {
          ...unit.unit,
          animalSpecies: null,
          role: "",
        },
      };
    }
    return unit;
  }),
});
