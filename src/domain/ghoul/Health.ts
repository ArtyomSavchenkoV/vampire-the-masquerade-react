import { ghoulHealthLevels as healthLevels } from "data/ghoulHealthLevels";
import {
  DamageEvent,
  HealEvent,
  healHealth as commonHealHealth,
  damageHealth as commonDamageHealth,
  HealthDamages,
  HealthLevelData,
  getHealthLevel,
} from "domain/Health";

/**
 * Получить данные о здоровье сородича.
 */
export const getGhoulHealthLevel = (
  bodyDamages: HealthDamages,
): HealthLevelData => {
  return getHealthLevel(healthLevels, bodyDamages, false);
};

/**
 * Применение урона
 */
export const damageGhoulHealth = (
  bodyDamages: HealthDamages,
  damageEvent: DamageEvent,
): HealthDamages => {
  return commonDamageHealth(healthLevels, bodyDamages, damageEvent, false);
};

/**
 * применение исцеления
 */
export const healGhoulHealth = (
  bodyDamages: HealthDamages,
  healEvent: HealEvent,
): HealthDamages => {
  const healthLevelName = getGhoulHealthLevel(bodyDamages).name;
  return commonHealHealth(bodyDamages, healthLevelName, healEvent);
};
