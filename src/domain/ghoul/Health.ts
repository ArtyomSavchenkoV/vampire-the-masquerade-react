import { ghoulHealthLevels as healthLevels } from "data/ghoulHealthLevels";
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
export const getGhoulHealthLevel = (bodyWounds: Wounds): HealthLevelData => {
  return getHealthLevel(healthLevels, bodyWounds, false);
};

/**
 * Применение урона
 */
export const damageGhoulHealth = (
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
export const healGhoulHealth = (
  bodyWounds: Wounds,
  healEvent: HealEvent,
): Wounds => {
  const healthLevelName = getGhoulHealthLevel(bodyWounds).name;
  return commonHealHealth(bodyWounds, healthLevelName, healEvent);
};
