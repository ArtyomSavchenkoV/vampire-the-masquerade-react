import { DamageType } from "./Damage";
import { Modifiers } from "./Modifiers";

/**
 * Данные полученного урона
 */
export type HealthDamages = DamageType[];

/**
 * Отсортировать HealthDamages по типам урона от aggravated до bashing
 */
export const sortHealthDamages = (
  healthDamages: HealthDamages,
): HealthDamages => {
  const order: Record<DamageType, number> = {
    aggravated: 0,
    lethal: 1,
    bashing: 2,
  };

  // Создаём копию, чтобы не мутировать исходный массив
  return [...healthDamages].sort((a, b) => order[a] - order[b]);
};

/**
 * Уровни здоровья по правилам V20.
 */
export type HealthLevelName =
  /** Персонаж полностью здоров. */
  | "unimpaired"
  /** Помят — Лёгкий дискомфорт, почти не мешает. */
  | "battered"
  /** Легко ранен — Заметные травмы, небольшие штрафы. */
  | "lightlyWounded"
  /** Ранен — Существенные травмы, небольшие штрафы. */
  | "wounded"
  /** Серьёзно ранен — Серьёзные травмы, ощутимые штрафы */
  | "seriouslyWounded"
  /** Тяжело ранен — Тяжёлые травмы, ощутимые штрафы */
  | "heavilyWounded"
  /** Едва жив — персонаж почти не способен двигаться. */
  | "nearlyDown"
  /** Небоеспособен. — на грани потери сознания и смерти. */
  | "incapacitated"
  /** В отключке. */
  | "torpor"
  /** Окончательная смерть. */
  | "finalDeath";

export interface HealthLevelData {
  name: HealthLevelName;
  modifiers?: Modifiers;
}

/** Полученное лечение */
export interface HealEvent {
  type: "heal";
  damageType: DamageType;
  /** Точное значение на которое должно измениться здоровье, всегда положительное значение */
  value: number;
}

/** Полученный урон */
export interface DamageEvent {
  type: "damage";
  /** Уже не принимает участие в вычислении урона, который должен получить Сородич, а нужен для того, чтобы здоровье сородича не упало ниже 1 для не "aggravated" */
  damageType: DamageType;
  /** Точное значение на которое должно измениться здоровье, всегда положительное значение, уже с учётом всех снижений урона, множителей от типа урона и пр. */
  value: number;
}

/**
 * Получить данные о здоровье.
 */
export const getHealthLevel =
  ({ healthLevels }: { healthLevels: Readonly<HealthLevelData[]> }) =>
  (bodyDamages: HealthDamages): HealthLevelData => {
    if (bodyDamages.length > healthLevels.length) {
      return healthLevels[healthLevels.length];
    }
    return healthLevels[bodyDamages.length];
  };

/**
 * Применение урона
 */
export const damageHealth = ({
  bodyDamages,
  healthLevelName,
  maxHealth,
  damageEvent,
}: {
  bodyDamages: HealthDamages;
  healthLevelName: HealthLevelName;
  maxHealth: number;
  damageEvent: DamageEvent;
}): HealthDamages => {
  const healthDamages = [...bodyDamages];
  // Тип наносимого урона
  const damageType = damageEvent.damageType;
  // Если финальная смерть - урон не применяется
  if (healthLevelName === "finalDeath") {
    return healthDamages;
  }
  // Доступные слоты урона
  const availableCells = maxHealth - healthDamages.length;
  // количество наносимого урона
  const damageCount = damageEvent.value;
  const damages = Array<DamageType>(
    // персонаж получает урон не выше максимума
    damageCount > availableCells ? availableCells : damageCount,
  ).fill(damageType);
  return [...healthDamages, ...damages];
};

/**
 * применение исцеления
 */
export const healHealth = ({
  bodyDamages,
  healthLevelName,
  healEvent,
}: {
  bodyDamages: HealthDamages;
  healthLevelName: HealthLevelName;
  healEvent: HealEvent;
}): HealthDamages => {
  const healthDamages = [...bodyDamages];
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
