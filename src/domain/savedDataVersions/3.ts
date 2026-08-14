import { GetByType } from "utils/types/GetByType";
import { SavedData as PrevSavedData } from "./2";
import { mapObject } from "utils/object/mapObject";

/*
 * Получаем исходные типы
 */
type PrevUnits = PrevSavedData["units"];
type PrevUnitEntry = PrevUnits[string];

type KindredType = GetByType<PrevUnitEntry, "kindred">["unit"];
type GhoulType = GetByType<PrevUnitEntry, "ghoul">["unit"];
type HumanType = GetByType<PrevUnitEntry, "human">["unit"];
type CreatureType = GetByType<PrevUnitEntry, "creature">["unit"];

/*
 * Не изменившиеся типы
 */
type AttributeName =
  | "strength"
  | "dexterity"
  | "stamina"
  | "charisma"
  | "manipulation"
  | "appearance"
  | "perception"
  | "intelligence"
  | "wits";
type AbilityName =
  | "athletics"
  | "alertness"
  | "brawl"
  | "intimidation"
  | "expression"
  | "leadership"
  | "streetwise"
  | "subterfuge"
  | "awareness"
  | "empathy"
  | "drive"
  | "larceny"
  | "survival"
  | "performance"
  | "animal_ken"
  | "crafts"
  | "stealth"
  | "firearms"
  | "melee"
  | "etiquette"
  | "academics"
  | "science"
  | "law"
  | "computer"
  | "medicine"
  | "occult"
  | "politics"
  | "investigation"
  | "finance"
  | "electronics";
type DamageType = "bashing" | "lethal" | "aggravated";

/*
 * Изменившиеся типы
 */
interface Modifiers {
  attributesModifiers?: Partial<Record<AttributeName, number>>;
  attributesMaxLimit?: Partial<Record<AttributeName, number>>;
  abilityModifiers?: Partial<Record<AbilityName, number>>;
  absorptionDice?: Partial<Record<DamageType, number>>;
  commonDiceBonus?: number;
  // Новое поле:
  damageMultipliers?: Partial<Record<DamageType, number>>;
  // Убрали поле:
  // attributeMultipliers?: Partial<Record<AttributeName, number>>;
}

// Новая модель
interface UnitTypeFeatures {
  modifiers?: Modifiers;
  staminaChecks?: Partial<Record<DamageType, boolean>>;
}

// Применяем изменения к модели сородича
type ChangedKindred = KindredType & {
  unitTypeFeatures: UnitTypeFeatures;
};

// Применяем изменения к модели гуля
type ChangedGhoul = GhoulType & {
  unitTypeFeatures: UnitTypeFeatures;
};

// Применяем изменения к модели человека
type ChangedHuman = HumanType & {
  unitTypeFeatures: UnitTypeFeatures;
};

// Применяем изменения к модели существа
type ChangedCreature = CreatureType & {
  unitTypeFeatures: UnitTypeFeatures;
};

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
  version: 3;
  units: Units;
};

export const migrateFrom2To3 = (savedData: PrevSavedData): SavedData => ({
  ...savedData,
  version: 3,
  units: mapObject(savedData.units, (unit) => {
    if (unit.type === "kindred") {
      return {
        ...unit,
        unit: {
          ...unit.unit,
          unitTypeFeatures: {
            modifiers: {
              damageMultipliers: {
                bashing: 0.5,
              },
            },
            staminaChecks: {
              bashing: true,
              lethal: true,
            },
          },
        },
      };
    }
    if (unit.type === "ghoul") {
      return {
        ...unit,
        unit: {
          ...unit.unit,
          unitTypeFeatures: {
            staminaChecks: {
              bashing: true,
            },
          },
        },
      };
    }
    if (unit.type === "human") {
      return {
        ...unit,
        unit: {
          ...unit.unit,
          unitTypeFeatures: {
            staminaChecks: {
              bashing: true,
            },
          },
        },
      };
    }
    if (unit.type === "creature") {
      return {
        ...unit,
        unit: {
          ...unit.unit,
          unitTypeFeatures: {
            staminaChecks: {
              bashing: true,
            },
          },
        },
      };
    }
    return unit;
  }),
});
