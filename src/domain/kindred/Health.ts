import {
  unimpaired,
  finalDeath,
  torpor,
  kindredHealthLevels,
} from "data/kindredHealthLevels";
import { DamageType } from "domain/Damage";
import {
  DamageEvent,
  HealEvent,
  HealthDamages,
  HealthLevelData,
  sortHealthDamages,
} from "domain/Health";

type AwakeningEvent = {
  type: "torpor";
};

export type HealthHistory = AwakeningEvent | HealEvent | DamageEvent;

/**
 * Получить данные о здоровье сородича.
 */
export const getKinderedHealthLevel = (
  bodyDamages: HealthDamages,
): HealthLevelData => {
  if (bodyDamages.length === 0) {
    return unimpaired;
  }
  if (bodyDamages.length > 7) {
    if (bodyDamages[7] === "aggravated") {
      return finalDeath;
    } else {
      return torpor;
    }
  }
  return kindredHealthLevels[bodyDamages.length - 1];
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
  const maxHealth = kindredHealthLevels.length;
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
  const availableCells = maxHealth - healthDamages.length;
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
  const healthDamages = [...bodyDamages];
  const healthLevelName = getKinderedHealthLevel(healthDamages).name;
  // количество исцеления
  const healCount = healEvent.value;
  // Исцеляемый тип урона
  const healDamageType = healEvent.damageType;
  // Если финальная смерть или torpor - исцеление не применяется
  if (healthLevelName === "finalDeath" || healthLevelName === "torpor") {
    return healthDamages;
  }
  const aggravatedDamages = healthDamages.filter(
    (damage) => damage === "aggravated",
  );
  const lethalDamages = healthDamages.filter((damage) => damage === "lethal");
  const bashingDamages = healthDamages.filter((damage) => damage === "bashing");
  if (healDamageType === "aggravated") {
    let remaining = healCount;
    const aggravatedDamagesDeleteCount = Math.min(
      aggravatedDamages.length,
      remaining,
    );
    remaining =
      remaining - aggravatedDamagesDeleteCount > 0
        ? remaining - aggravatedDamagesDeleteCount
        : 0;
    const lethalDamagesDeleteCount = Math.min(lethalDamages.length, remaining);
    remaining =
      remaining - lethalDamagesDeleteCount > 0
        ? remaining - lethalDamagesDeleteCount
        : 0;
    const bashingDamagesDeleteCount = Math.min(
      bashingDamages.length,
      remaining,
    );
    return [
      ...aggravatedDamages.slice(aggravatedDamagesDeleteCount),
      ...lethalDamages.slice(lethalDamagesDeleteCount),
      ...bashingDamages.slice(bashingDamagesDeleteCount),
    ];
  }
  if (healDamageType === "lethal") {
    let remaining = healCount;
    const lethalDamagesDeleteCount = Math.min(lethalDamages.length, remaining);
    remaining =
      remaining - lethalDamagesDeleteCount > 0
        ? remaining - lethalDamagesDeleteCount
        : 0;
    const bashingDamagesDeleteCount = Math.min(
      bashingDamages.length,
      remaining,
    );
    return [
      ...aggravatedDamages,
      ...lethalDamages.slice(lethalDamagesDeleteCount),
      ...bashingDamages.slice(bashingDamagesDeleteCount),
    ];
  }
  if (healDamageType === "bashing") {
    const bashingDamagesDeleteCount = Math.min(
      bashingDamages.length,
      healCount,
    );
    return [
      ...aggravatedDamages,
      ...lethalDamages,
      ...bashingDamages.slice(bashingDamagesDeleteCount),
    ];
  }
  return healthDamages as never;
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
