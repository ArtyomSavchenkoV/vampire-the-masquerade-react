import { AbilityName, AbilityLevel } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { AttributeName, AttributeLevel } from "domain/Attributes";
import { EquipmentItem } from "domain/EquipmentItem";
import { getHealthLevel, HealthDamages, HealthLevelData } from "domain/Health";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { Modifiers, mergeModifiers } from "domain/Modifiers";
import { ResourcesHistory } from "./ResourcesHistory";

/**
 * Базовая модель существа (Собака, крыса, медведь и пр.)
 */
export interface Creature {
  /** Имя персонажа */
  name: string;
  /** Игрок */
  player: string;
  /** Характеристики */
  attributes: Record<AttributeName, AttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, AbilityLevel>;
  /** Ментальные устойчивости */
  mentalStability: Record<MentalStability, MentalStabilityLevel>;
  /** Воля (Willpower) — текущий запас кубиков воли */
  willpower: number;
  /** Максимальный запас воли (для UI) */
  maxWillpower: number;
  /** Повреждения */
  bodyDamages: HealthDamages;
  /** Уровни здоровья */
  healthLevels: HealthLevelData[];
  /** Экипировка */
  equipment: EquipmentItem[];
  /** Активные эффекты (бафф/дебафф, состояние и пр.) */
  activeEffects: ActiveEffect[];
  /** История изменений ресурсов (кровь, здоровье и пр.) */
  resourcesHistory: ResourcesHistory;
}

/**
 * Собирает все модификаторы для персонажа.
 *
 * Возвращает единый объект Modifiers, который можно сразу применять
 * к базовым статам.
 */
export const aggregateModifiers = (character: Creature): Modifiers => {
  let result: Modifiers = {};

  // Эффекты экипировки
  for (const effect of character.equipment) {
    if (effect.modifiers) {
      result = mergeModifiers(result, effect.modifiers);
    }
  }

  // Активные эффекты
  for (const effect of character.activeEffects) {
    if (effect.modifiers) {
      result = mergeModifiers(result, effect.modifiers);
    }
  }

  // Эффекты от здоровья
  const healthLevelModifiers = getHealthLevel({
    healthLevels: [...character.healthLevels],
  })(character.bodyDamages).modifiers;
  if (healthLevelModifiers) {
    result = mergeModifiers(result, healthLevelModifiers);
  }

  return result;
};
