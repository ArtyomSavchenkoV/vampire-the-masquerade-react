import { GetByType } from "utils/types/GetByType";
import { SavedData as PrevSavedData } from "./1";
import { mapObject } from "utils/object/mapObject";

/* 
  Получаем исходные типы 
*/
type PrevUnits = PrevSavedData["units"];
type PrevUnitEntry = PrevUnits[string];
type UnitType = PrevUnitEntry["type"];

type KindredType = GetByType<PrevUnitEntry, "kindred">["unit"];
type GhoulType = GetByType<PrevUnitEntry, "ghoul">["unit"];
type HumanType = GetByType<PrevUnitEntry, "human">["unit"];
type CreatureType = GetByType<PrevUnitEntry, "creature">["unit"];

/*
  Формируем новые типы:
*/

// Изменившиеся метаданные
type StoreUnitEntry<Type extends UnitType, Unit extends Object> = {
  type: Type;
  unit: Unit;
  notes: string;
};

// Изменившаяся модель сородича
type ChangedKindred = KindredType & {
  acquiredDisciplines: KindredType["clan"]["disciplines"];
};

// Изменившаяся модель гуля
type DisciplineLevel = 1 | 2 | 3 | 4 | 5;
type ChangedGhoul = Omit<GhoulType, "disciplines"> & {
  disciplines: Record<"potence", DisciplineLevel>;
  acquiredDisciplines: GhoulType["disciplines"];
};

type Units = Record<
  string,
  | StoreUnitEntry<"kindred", ChangedKindred>
  | StoreUnitEntry<"ghoul", ChangedGhoul>
  | StoreUnitEntry<"human", HumanType>
  | StoreUnitEntry<"creature", CreatureType>
>;

export type SavedData = {
  version: 2;
  units: Units;
};

export const migrateFrom1To2 = (savedData: PrevSavedData): SavedData => ({
  ...savedData,
  version: 2,
  units: mapObject(savedData.units, (unit) => {
    if (unit.type === "kindred") {
      return {
        ...unit,
        notes: "",
        unit: {
          ...unit.unit,
          acquiredDisciplines: {},
        },
      };
    }
    if (unit.type === "ghoul") {
      const { potence, ...disciplines } = unit.unit.disciplines;
      return {
        ...unit,
        notes: "",
        unit: {
          ...unit.unit,
          disciplines: { potence: potence || 1 },
          acquiredDisciplines: { ...disciplines },
        },
      };
    }
    return { ...unit, notes: "" };
  }),
});
