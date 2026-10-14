import {
  HealEvent,
  healHealth as commonHealHealth,
  damageHealth as commonDamageHealth,
  HealthLevelData,
  getHealthLevel,
  Wounds,
} from "domain/Health";
import { WoundType } from "domain/Wound";

/**
 * Получить данные о здоровье сородича.
 */
export const getCreatureHealthLevel = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyWounds: Wounds,
): HealthLevelData => {
  return getHealthLevel(healthLevels, bodyWounds, false);
};

/**
 * Применение урона
 */
export const damageCreatureHealth = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyWounds: Wounds,
  woundType: WoundType,
  woundCount: number,
): Wounds => {
  return commonDamageHealth(
    healthLevels,
    bodyWounds,
    woundType,
    woundCount,
    false,
  );
};

/**
 * применение исцеления
 */
export const healCreatureHealth = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyWounds: Wounds,
  healEvent: HealEvent,
): Wounds => {
  const healthLevelName = getCreatureHealthLevel(healthLevels, bodyWounds).name;
  return commonHealHealth(bodyWounds, healthLevelName, healEvent);
};
