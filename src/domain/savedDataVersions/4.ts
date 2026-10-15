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

type DamageType = "blunt" | "penetrating" | "fire" | "solar" | "vampire_claw";

export type DamageToWoundMap = Record<DamageType, WoundType | null>;

/*
 * Применение изменений
 */
// Применяем изменения к модели сородича
type ChangedKindred = Omit<
  KindredType,
  // Убрали поля:
  | "bodyDamages"
  | "unitTypeFeatures"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  unitFeatures: Omit<KindredType["unitTypeFeatures"], "modifiers"> & {
    damageToWoundMap: DamageToWoundMap;
    modifiers?: NewModifiers;
  };
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  resourcesHistory: Omit<KindredType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent | AwakeningEvent>[];
  };
};

// Применяем изменения к модели гуля
type ChangedGhoul = Omit<
  GhoulType,
  // Убрали поля:
  | "bodyDamages"
  | "unitTypeFeatures"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  unitFeatures: Omit<GhoulType["unitTypeFeatures"], "modifiers"> & {
    damageToWoundMap: DamageToWoundMap;
    modifiers?: NewModifiers;
  };
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  resourcesHistory: Omit<GhoulType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent>[];
  };
};

// Применяем изменения к модели человека
type ChangedHuman = Omit<
  HumanType,
  // Убрали поля:
  | "bodyDamages"
  | "unitTypeFeatures"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
  | "healthLevels"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  unitFeatures: Omit<HumanType["unitTypeFeatures"], "modifiers"> & {
    damageToWoundMap: DamageToWoundMap;
    modifiers?: NewModifiers;
  };
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  healthLevels: NewHealthLevelData[];
  resourcesHistory: Omit<HumanType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent>[];
  };
};

// Применяем изменения к модели существа
type ChangedCreature = Omit<
  CreatureType,
  // Убрали поля:
  | "bodyDamages"
  | "unitTypeFeatures"
  // Изменили поля:
  | "resourcesHistory"
  | "equipment"
  | "activeEffects"
  | "healthLevels"
> & {
  // Добавили поля:
  bodyWounds: Wounds;
  unitFeatures: Omit<CreatureType["unitTypeFeatures"], "modifiers"> & {
    damageToWoundMap: DamageToWoundMap;
    modifiers?: NewModifiers;
  };
  // Изменили поля:
  equipment: NewEquipmentItem[];
  activeEffects: NewActiveEffect[];
  healthLevels: NewHealthLevelData[];
  resourcesHistory: Omit<CreatureType["resourcesHistory"], "health"> & {
    health: ResourceHistory<HealEvent | WoundEvent>[];
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
        unitTypeFeatures,
        ...notChangedFields
      } = unit.unit;
      const { modifiers: _, ...notChangedUnitTypeFeatures } = unitTypeFeatures;
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
          equipment: equipment.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          activeEffects: activeEffects.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          unitFeatures: {
            ...notChangedUnitTypeFeatures,
            ...(unitTypeFeatures.modifiers
              ? { modifiers: migrateModifiers(unitTypeFeatures.modifiers) }
              : {}),
            damageToWoundMap: {
              blunt: "bashing",
              penetrating: "lethal",
              fire: "aggravated",
              solar: "aggravated",
              vampire_claw: "aggravated",
            },
          },
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
        unitTypeFeatures,
        ...notChangedFields
      } = unit.unit;
      const { modifiers: _, ...notChangedUnitTypeFeatures } = unitTypeFeatures;
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
          equipment: equipment.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          activeEffects: activeEffects.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          unitFeatures: {
            ...notChangedUnitTypeFeatures,
            ...(unitTypeFeatures.modifiers
              ? { modifiers: migrateModifiers(unitTypeFeatures.modifiers) }
              : {}),
            damageToWoundMap: {
              blunt: "bashing",
              penetrating: "lethal",
              fire: "bashing",
              solar: null,
              vampire_claw: "lethal",
            },
          },
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
        unitTypeFeatures,
        ...notChangedFields
      } = unit.unit;
      const { modifiers: _, ...notChangedUnitTypeFeatures } = unitTypeFeatures;
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
          equipment: equipment.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          activeEffects: activeEffects.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          healthLevels: healthLevels.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          unitFeatures: {
            ...notChangedUnitTypeFeatures,
            ...(unitTypeFeatures.modifiers
              ? { modifiers: migrateModifiers(unitTypeFeatures.modifiers) }
              : {}),
            damageToWoundMap: {
              blunt: "bashing",
              penetrating: "lethal",
              fire: "bashing",
              solar: null,
              vampire_claw: "lethal",
            },
          },
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
        unitTypeFeatures,
        ...notChangedFields
      } = unit.unit;
      const { modifiers: _, ...notChangedUnitTypeFeatures } = unitTypeFeatures;
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
          equipment: equipment.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          activeEffects: activeEffects.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          healthLevels: healthLevels.map(({ modifiers, ...el }) => ({
            ...el,
            ...(modifiers ? { modifiers: migrateModifiers(modifiers) } : {}),
          })),
          unitFeatures: {
            ...notChangedUnitTypeFeatures,
            ...(unitTypeFeatures.modifiers
              ? { modifiers: migrateModifiers(unitTypeFeatures.modifiers) }
              : {}),
            damageToWoundMap: {
              blunt: "bashing",
              penetrating: "lethal",
              fire: "bashing",
              solar: null,
              vampire_claw: "lethal",
            },
          },
          ...notChangedFields,
        },
      };
    }
    return unit;
  }),
});
