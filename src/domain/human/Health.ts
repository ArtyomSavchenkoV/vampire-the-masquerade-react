import { humanHealthLevels as healthLevels } from "data/humanHealthLevels";
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
export const getHumanHealthLevel = (
  bodyDamages: HealthDamages,
): HealthLevelData => {
  return getHealthLevel(healthLevels, bodyDamages, false);
};

/**
 * Применение урона
 */
export const damageHumanHealth = (
  bodyDamages: HealthDamages,
  damageEvent: DamageEvent,
): HealthDamages => {
  return commonDamageHealth(healthLevels, bodyDamages, damageEvent, false);
};

/**
 * применение исцеления
 */
export const healHumanHealth = (
  bodyDamages: HealthDamages,
  healEvent: HealEvent,
): HealthDamages => {
  const healthLevelName = getHumanHealthLevel(bodyDamages).name;
  return commonHealHealth(bodyDamages, healthLevelName, healEvent);
};
