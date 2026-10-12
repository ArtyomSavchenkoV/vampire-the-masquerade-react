import { mapObject } from "utils/object/mapObject";
import { ResourceHistory } from "./0";
import {
  GetUnitEntry,
  GetUnitType,
  Modifiers,
  SavedData as PrevSavedData,
} from "./3";

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
type HealthLevelName =
  | "unimpaired"
  | "battered"
  | "lightlyWounded"
  | "wounded"
  | "seriouslyWounded"
  | "heavilyWounded"
  | "nearlyDown"
  | "incapacitated"
  | "final";

type AwakeningEvent = {
  type: "torpor";
};

/*
 * Изменившиеся типы
 */
export type WoundType = "bashing" | "lethal" | "aggravated";
export type Wounds = WoundType[];

export interface HealEvent {
  type: "heal";
  woundType: WoundType;
  value: number;
}

export interface WoundEvent {
  type: "wound";
  woundType: WoundType;
  value: number;
}

type NewModifiers = Omit<
  Modifiers,
  // Убрали поле:
  "damageMultipliers"
> & {
  // Добавили поле:
  woundMultipliers?: Partial<Record<WoundType, number>>;
};
const migrateModifiers = ({
  damageMultipliers,
  ...modifiers
}: Modifiers): NewModifiers => ({
  ...(damageMultipliers ? { woundMultipliers: damageMultipliers } : {}),
  ...modifiers,
});

interface NewEquipmentItem {
  modifiers?: NewModifiers;
}

interface NewActiveEffect {
  id: string;
  name: string;
  type: "buff" | "debuff";
  modifiers?: NewModifiers;
  duration?: number | "scene";
  source: "clan" | "merit" | "item" | "spell" | "environment";
}

export type NewHealthLevelData =
  | {
      name: Exclude<HealthLevelName, "final" | "incapacitated">;
      /** Небоеспособен */
      isIncapacitated: boolean;
      // Изменили поля:
      modifiers?: NewModifiers;
    }
  | {
      name: "incapacitated";
      isIncapacitated: true;
      cutExcessDamage: true;
      // Изменили поля:
      modifiers?: NewModifiers;
    }
  | {
      name: "final";
      isIncapacitated: true;
      variant: "death" | "torpor";
      // Изменили поля:
      modifiers?: NewModifiers;
    };

/*
 * Применение изменений
 */
// Применяем изменения к модели сородича
type ChangedKindred = Omit<
  KindredType,
  // Убрали поля:
  | "bodyDamages"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
  | "unitTypeFeatures"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  resourcesHistory: Omit<KindredType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent | AwakeningEvent>[];
  };
  unitTypeFeatures: Omit<KindredType["unitTypeFeatures"], "modifiers"> & {
    modifiers?: Modifiers;
  };
};

// Применяем изменения к модели гуля
type ChangedGhoul = Omit<
  GhoulType,
  // Убрали поля:
  | "bodyDamages"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
  | "unitTypeFeatures"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  resourcesHistory: Omit<GhoulType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent>[];
  };
  unitTypeFeatures: Omit<GhoulType["unitTypeFeatures"], "modifiers"> & {
    modifiers?: Modifiers;
  };
};

// Применяем изменения к модели человека
type ChangedHuman = Omit<
  HumanType,
  // Убрали поля:
  | "bodyDamages"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
  | "unitTypeFeatures"
  | "healthLevels"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  healthLevels: NewHealthLevelData[];
  resourcesHistory: Omit<HumanType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent>[];
  };
  unitTypeFeatures: Omit<HumanType["unitTypeFeatures"], "modifiers"> & {
    modifiers?: Modifiers;
  };
};

// Применяем изменения к модели существа
type ChangedCreature = Omit<
  CreatureType,
  // Убрали поля:
  | "bodyDamages"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
  | "unitTypeFeatures"
  | "healthLevels"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  healthLevels: NewHealthLevelData[];
  resourcesHistory: Omit<CreatureType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent>[];
  };
  unitTypeFeatures: Omit<CreatureType["unitTypeFeatures"], "modifiers"> & {
    modifiers?: Modifiers;
  };
};

// Формируем тип массива Units
type Units = Record<
  string,
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "kindred";
      unit: ChangedKindred;
    })
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "ghoul";
      unit: ChangedGhoul;
    })
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "human";
      unit: ChangedHuman;
    })
  | (Omit<PrevUnitEntry, "type" | "unit"> & {
      type: "creature";
      unit: ChangedCreature;
    })
>;

export type SavedData = {
  version: 4;
  units: Units;
};

/*
 * Функции миграций
 */
export const migrateFrom3To4 = (savedData: PrevSavedData): SavedData => ({
  ...savedData,
  version: 4,
  units: mapObject(savedData.units, (unit) => {
    if (unit.type === "kindred") {
      const {
        bodyDamages,
        resourcesHistory,
        equipment,
        activeEffects,
        ...notChangedFields
      } = unit.unit;
      const { health, ...notChangedHistoryFields } = resourcesHistory;
      return {
        ...unit,
        unit: {
          bodyWounds: bodyDamages,
          resourcesHistory: {
            ...notChangedHistoryFields,
            health: health.map((history) => ({
              ...history,
              effect: (history.effect.type === "damage" && {
                type: "wound",
                woundType: history.effect.damageType,
                value: history.effect.value,
              }) ||
                (history.effect.type === "heal" && {
                  type: "heal",
                  woundType: history.effect.damageType,
                  value: history.effect.value,
                }) || {
                  type: "torpor",
                },
            })),
          },
          equipment: equipment.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          activeEffects: activeEffects.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          ...notChangedFields,
        },
      };
    }
    if (unit.type === "ghoul") {
      const {
        bodyDamages,
        resourcesHistory,
        equipment,
        activeEffects,
        ...notChangedFields
      } = unit.unit;
      const { health, ...notChangedHistoryFields } = resourcesHistory;
      return {
        ...unit,
        unit: {
          bodyWounds: bodyDamages,
          resourcesHistory: {
            ...notChangedHistoryFields,
            health: health.map((history) => ({
              ...history,
              effect: (history.effect.type === "damage" && {
                type: "wound",
                woundType: history.effect.damageType,
                value: history.effect.value,
              }) || {
                type: "heal",
                woundType: history.effect.damageType,
                value: history.effect.value,
              },
            })),
          },
          equipment: equipment.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          activeEffects: activeEffects.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          ...notChangedFields,
        },
      };
    }
    if (unit.type === "human") {
      const {
        bodyDamages,
        resourcesHistory,
        equipment,
        activeEffects,
        healthLevels,
        ...notChangedFields
      } = unit.unit;
      const { health, ...notChangedHistoryFields } = resourcesHistory;
      return {
        ...unit,
        unit: {
          bodyWounds: bodyDamages,
          resourcesHistory: {
            ...notChangedHistoryFields,
            health: health.map((history) => ({
              ...history,
              effect: (history.effect.type === "damage" && {
                type: "wound",
                woundType: history.effect.damageType,
                value: history.effect.value,
              }) || {
                type: "heal",
                woundType: history.effect.damageType,
                value: history.effect.value,
              },
            })),
          },
          equipment: equipment.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          activeEffects: activeEffects.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          healthLevels: healthLevels.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          ...notChangedFields,
        },
      };
    }
    if (unit.type === "creature") {
      const {
        bodyDamages,
        resourcesHistory,
        equipment,
        activeEffects,
        healthLevels,
        ...notChangedFields
      } = unit.unit;
      const { health, ...notChangedHistoryFields } = resourcesHistory;
      return {
        ...unit,
        unit: {
          bodyWounds: bodyDamages,
          resourcesHistory: {
            ...notChangedHistoryFields,
            health: health.map((history) => ({
              ...history,
              effect: (history.effect.type === "damage" && {
                type: "wound",
                woundType: history.effect.damageType,
                value: history.effect.value,
              }) || {
                type: "heal",
                woundType: history.effect.damageType,
                value: history.effect.value,
              },
            })),
          },
          equipment: equipment.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          activeEffects: activeEffects.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          healthLevels: healthLevels.map((el) => ({
            ...el,
            ...(el.modifiers ? migrateModifiers(el.modifiers) : {}),
          })),
          ...notChangedFields,
        },
      };
    }
    return unit;
  }),
});
