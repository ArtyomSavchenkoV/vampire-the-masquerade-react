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
export const getCreatureHealthLevel = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyDamages: HealthDamages,
): HealthLevelData => {
  return getHealthLevel(healthLevels, bodyDamages, false);
};

/**
 * Применение урона
 */
export const damageCreatureHealth = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyDamages: HealthDamages,
  damageEvent: DamageEvent,
): HealthDamages => {
  return commonDamageHealth(healthLevels, bodyDamages, damageEvent, false);
};

/**
 * применение исцеления
 */
export const healCreatureHealth = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyDamages: HealthDamages,
  healEvent: HealEvent,
): HealthDamages => {
  const healthLevelName = getCreatureHealthLevel(
    healthLevels,
    bodyDamages,
  ).name;
  return commonHealHealth(bodyDamages, healthLevelName, healEvent);
};
