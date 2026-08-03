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
export const healthLevelNames = [
  /** Персонаж полностью здоров. */
  "unimpaired",
  /** Помят — Лёгкий дискомфорт, почти не мешает. */
  "battered",
  /** Легко ранен — Заметные травмы, небольшие штрафы. */
  "lightlyWounded",
  /** Ранен — Существенные травмы, небольшие штрафы. */
  "wounded",
  /** Серьёзно ранен — Серьёзные травмы, ощутимые штрафы */
  "seriouslyWounded",
  /** Тяжело ранен — Тяжёлые травмы, ощутимые штрафы */
  "heavilyWounded",
  /** Едва жив — персонаж почти не способен двигаться. */
  "nearlyDown",
  /** Небоеспособен. — на грани потери сознания и смерти. */
  "incapacitated",
  /** Окончательная смерть/torpor */
  "final",
] as const;
export type HealthLevelName = ArrayElement<typeof healthLevelNames>;

export type HealthLevelData =
  | {
      name: Exclude<HealthLevelName, "final">;
      /** Небоеспособен */
      isIncapacitated: boolean;
      modifiers?: Modifiers;
    }
  | {
      name: "final";
      isIncapacitated: true;
      variant: "death" | "torpor";
      modifiers?: Modifiers;
    };

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
export const getHealthLevel = ({
  healthLevels,
  bodyDamages,
  isKindred,
}: {
  healthLevels: Readonly<HealthLevelData[]>;
  bodyDamages: HealthDamages;
  isKindred: boolean;
}): HealthLevelData => {
  const getVariant = (
    healthLevelData: HealthLevelData,
    damageType: DamageType,
    isKindred: boolean,
  ): HealthLevelData => {
    if (healthLevelData.name === "final") {
      if (isKindred && damageType !== "aggravated") {
        return {
          name: "final",
          isIncapacitated: true,
          variant: "torpor",
        };
      }
      return {
        name: "final",
        isIncapacitated: true,
        variant: "death",
      };
    }
    return healthLevelData;
  };
  if (bodyDamages.length > healthLevels.length) {
    return getVariant(
      healthLevels[healthLevels.length],
      bodyDamages[healthLevels.length - 1],
      isKindred,
    );
  }
  return getVariant(
    healthLevels[bodyDamages.length],
    bodyDamages[bodyDamages.length - 1],
    isKindred,
  );
};

/**
 * Получить ключ перевода
 */
export const getHealthLevelTranslateKey = (
  healthLevelData: HealthLevelData,
): Exclude<HealthLevelName, "final"> | "torpor" | "finalDeath" =>
  healthLevelData.name !== "final"
    ? healthLevelData.name
    : healthLevelData.variant === "torpor"
      ? "torpor"
      : "finalDeath";

/**
 * Применение урона
 */
export const damageHealth = ({
  isKindred,
  bodyDamages,
  healthLevels,
  damageEvent,
}: {
  isKindred: boolean;
  bodyDamages: HealthDamages;
  healthLevels: Readonly<HealthLevelData[]>;
  damageEvent: DamageEvent;
}): HealthDamages => {
  const healthDamages = [...bodyDamages];
  // Максимальное количество элементов урона
  const maxDamages = healthLevels.length - 1; // 0 элемент healthLevels - это состояние "Здоров"
  // Текущий уровень здоровья
  const healthLevel = getHealthLevel({ healthLevels, bodyDamages, isKindred });
  // Тип наносимого урона
  const damageType = damageEvent.damageType;
  // Если финальный урон
  if (healthLevel.name === "final") {
    // Если персонаж по торпору ловит aggravated - заменяем последний урон в bodyDamages на "aggravated"
    if (healthLevel.variant === "torpor" && damageType === "aggravated") {
      healthDamages[maxDamages - 1] = "aggravated";
      return healthDamages;
    }
    // иначе ничего не делаем
    return healthDamages;
  }
  // Доступные слоты урона
  const availableCells = maxDamages - healthDamages.length;
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
  if (healthLevelName === "final") {
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
