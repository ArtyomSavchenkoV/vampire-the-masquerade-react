import {
  finalDeath,
  torpor,
  kindredHealthLevels,
} from "data/kindredHealthLevels";
import { DamageType } from "domain/Damage";
import {
  DamageEvent,
  HealEvent,
  healHealth as commonHealHealth,
  HealthDamages,
  HealthLevelData,
  sortHealthDamages,
} from "domain/Health";

export const MAX_HEALTH = kindredHealthLevels.length - 1;

export type AwakeningEvent = {
  type: "torpor";
};

/**
 * Получить данные о здоровье сородича.
 */
export const getKinderedHealthLevel = (
  bodyDamages: HealthDamages,
): HealthLevelData => {
  if (bodyDamages.length > 7) {
    if (bodyDamages[7] === "aggravated") {
      return finalDeath;
    } else {
      return torpor;
    }
  }
  return kindredHealthLevels[bodyDamages.length];
};

/**
 * Применение урона
 */
export const damageHealth = (
  bodyDamages: HealthDamages,
  damageEvent: DamageEvent,
): HealthDamages => {
  const healthDamages = [...bodyDamages];
  const healthLevelName = getKinderedHealthLevel(healthDamages).name;
  // Тип наносимого урона
  const damageType = damageEvent.damageType;
  // Если финальная смерть - урон не применяется
  if (healthLevelName === "finalDeath") {
    return healthDamages;
  }
  // Если персонаж в отключке - он может получить урон "aggravated" и умереть окончательно
  if (healthLevelName === "torpor" && damageType === "aggravated") {
    healthDamages[7] = "aggravated";
    return healthDamages;
  }
  // Доступные слоты урона
  const availableCells = MAX_HEALTH - healthDamages.length;
  // количество наносимого урона
  const damageCount = damageEvent.value;
  const damages = Array<DamageType>(
    // персонаж получает урон не выше максимума (кроме финального) или 1 единицу финального урона при условии что damageCount не 0
    (damageCount > availableCells ? availableCells : damageCount) || 1,
  ).fill(damageType);
  return [...healthDamages, ...damages];
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
  const healthLevelName = getKinderedHealthLevel(healthDamages).name;
  if (healthLevelName !== "torpor") {
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
