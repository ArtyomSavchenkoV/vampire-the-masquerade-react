import { AbilityName } from "./Abilities";
import { AttributeName } from "./Attributes";
import { DamageType } from "./Damage";

/**
 * Эффекты от дисциплин: бонусы к атрибутам, способностям и поглощению урона.
 * Используется как в пассивных, так и в активных эффектах.
 */
export type Effects = {
  /** Бонусы к атрибутам (например, +2 к Dexterity). */
  attributesEffects?: Partial<Record<AttributeName, number>>;
  /** Бонусы к способностям (например, +1 к Stealth). */
  abilityEffects?: Partial<Record<AbilityName, number>>;
  /** Кубики для поглощения урона по типу (V20 Fortitude).
   * Например: { Bashing: 2, Lethal: 1 } — персонаж получает 2 кубика на поглощение тупого урона и 1 кубик на смертельный. */
  absorptionDice?: Partial<Record<DamageType, number>>;
};
