import { kindredHealthLevels as healthLevels } from "data/kindredHealthLevels";
import {
  HealEvent,
  healHealth as commonHealHealth,
  damageHealth as commonDamageHealth,
  HealthLevelData,
  getHealthLevel,
  Wounds,
  sortWounds,
} from "domain/Health";
import { WoundType } from "domain/Wound";

export type AwakeningEvent = {
  type: "torpor";
};

/**
 * Получить данные о здоровье сородича.
 */
export const getKinderedHealthLevel = (bodyWounds: Wounds): HealthLevelData => {
  return getHealthLevel(healthLevels, bodyWounds, true);
};

/**
 * Применение урона
 */
export const damageHealth = (
  bodyWounds: Wounds,
  woundType: WoundType,
  woundCount: number,
): Wounds => {
  return commonDamageHealth(
    healthLevels,
    bodyWounds,
    woundType,
    woundCount,
    true,
  );
};

/**
 * применение исцеления
 */
export const healHealth = (
  bodyWounds: Wounds,
  healEvent: HealEvent,
): Wounds => {
  const healthLevelName = getKinderedHealthLevel(bodyWounds).name;
  return commonHealHealth(bodyWounds, healthLevelName, healEvent);
};

/**
 * Пробудиться после torpor
 */
export const awakening = (bodyDamages: Wounds): Wounds => {
  const healthDamages = [...bodyDamages];
  const healthLevel = getKinderedHealthLevel(healthDamages);
  if (healthLevel.name !== "final" || healthLevel.variant !== "torpor") {
    return healthDamages;
  }
  // Выход из торпора снимает два последних повреждения (index 6 и 7)
  // снимаем последнее 8 повреждение, которое отвечает за конечное состояние
  let damages = healthDamages.slice(0, healthDamages.length - 1);
  // сортируем
  damages = sortWounds(damages);
  // снимаем последнее из повреждений здоровья.
  return damages.slice(0, damages.length - 1);
};
