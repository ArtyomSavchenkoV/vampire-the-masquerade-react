import { kindredHealthLevels as healthLevels } from "data/kindredHealthLevels";
import {
  DamageEvent,
  HealEvent,
  healHealth as commonHealHealth,
  damageHealth as commonDamageHealth,
  HealthDamages,
  HealthLevelData,
  sortHealthDamages,
  getHealthLevel,
} from "domain/Health";

export type AwakeningEvent = {
  type: "torpor";
};

/**
 * Получить данные о здоровье сородича.
 */
export const getKinderedHealthLevel = (
  bodyDamages: HealthDamages,
): HealthLevelData => {
  return getHealthLevel({
    healthLevels,
    bodyDamages,
    isKindred: true,
  });
};

/**
 * Применение урона
 */
export const damageHealth = (
  bodyDamages: HealthDamages,
  damageEvent: DamageEvent,
): HealthDamages => {
  return commonDamageHealth({
    isKindred: true,
    bodyDamages,
    healthLevels,
    damageEvent,
  });
};

/**
 * применение исцеления
 */
export const healHealth = (
  bodyDamages: HealthDamages,
  healEvent: HealEvent,
): HealthDamages => {
  const healthLevelName = getKinderedHealthLevel(bodyDamages).name;
  return commonHealHealth({
    bodyDamages,
    healthLevelName,
    healEvent,
  });
};

/**
 * Пробудиться после torpor
 */
export const awakening = (bodyDamages: HealthDamages): HealthDamages => {
  const healthDamages = [...bodyDamages];
  const healthLevel = getKinderedHealthLevel(healthDamages);
  if (healthLevel.name !== "final" || healthLevel.variant !== "torpor") {
    return healthDamages;
  }
  // Выход из торпора снимает два последних повреждения (index 6 и 7)
  // снимаем последнее 8 повреждение, которое отвечает за конечное состояние
  let damages = healthDamages.slice(0, healthDamages.length - 1);
  // сортируем
  damages = sortHealthDamages(damages);
  // снимаем последнее из повреждений здоровья.
  return damages.slice(0, damages.length - 1);
};
