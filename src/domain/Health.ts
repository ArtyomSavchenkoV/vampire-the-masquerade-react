import { DamageType } from "./Damage";
import { Modifiers } from "./Modifiers";

/**
 * Список уровней здоровья
 */
export const healthLevels = [
  /** Персонаж полностью здоров. */
  {
    name: "unimpaired",
    isIncapacitated: false,
  },
  /** Помят — небольшие ушибы и ссадины. */
  {
    name: "battered",
    isIncapacitated: false,
  },
  /** Легко ранен — раны мешают действовать, появляются штрафы. */
  {
    name: "lightlyWounded",
    isIncapacitated: false,
    modifiers: {
      commonDiceBonus: -1,
    },
  },
  /** Ранен — раны мешают действовать. */
  {
    name: "wounded",
    isIncapacitated: false,
    modifiers: {
      commonDiceBonus: -1,
    },
  },
  /** Серьёзно ранен */
  {
    name: "seriouslyWounded",
    isIncapacitated: false,
    modifiers: {
      commonDiceBonus: -2,
    },
  },
  /** Тяжело ранен */
  {
    name: "heavilyWounded",
    isIncapacitated: false,
    modifiers: {
      commonDiceBonus: -2,
    },
  },
  /** Едва жив — персонаж почти не способен двигаться. */
  {
    name: "nearlyDown",
    isIncapacitated: false,
    modifiers: {
      commonDiceBonus: -5,
    },
  },
  /** Небоеспособен. — на грани потери сознания и смерти. */
  {
    name: "incapacitated",
    isIncapacitated: true,
    // Не пропускает превышающий урон до следующего повреждения
    cutExcessDamage: true,
  },
  /** Окончательная смерть. */
  {
    name: "final",
    isIncapacitated: true,
    variant: "death",
  },
] as const;

/**
 * Названия уровней здоровья
 */
export type HealthLevelName = (typeof healthLevels)[number]["name"];

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

export type HealthLevelData =
  | {
      name: Exclude<HealthLevelName, "final" | "incapacitated">;
      /** Небоеспособен */
      isIncapacitated: boolean;
      modifiers?: Modifiers;
    }
  | {
      name: "incapacitated";
      isIncapacitated: true;
      cutExcessDamage: true;
      modifiers?: Modifiers;
    }
  | {
      name: "final";
      isIncapacitated: true;
      variant: "death" | "torpor";
      modifiers?: Modifiers;
    };

/**
 * Проверка что в уровне есть модификаторы
 */
export const hasModifiers = (
  state: HealthLevelData,
): state is HealthLevelData & {
  modifiers: { commonDiceBonus?: number };
} => {
  return "modifiers" in state;
};

/**
 * Проверка что в уровне есть cutExcessDamage
 */
export const hasCutExcessDamage = (
  state: HealthLevelData,
): state is HealthLevelData & {
  cutExcessDamage: boolean;
} => {
  return "cutExcessDamage" in state;
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
 * Не использовать напрямую! Только функцию из папки типа персонажа!
 */
export const getHealthLevel = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyDamages: HealthDamages,
  isTorporPossible: boolean,
): HealthLevelData => {
  const getVariant = (
    healthLevelData: HealthLevelData,
    damageType: DamageType,
    isTorporPossible: boolean,
  ): HealthLevelData => {
    if (healthLevelData.name === "final") {
      if (isTorporPossible && damageType !== "aggravated") {
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
      isTorporPossible,
    );
  }
  return getVariant(
    healthLevels[bodyDamages.length],
    bodyDamages[bodyDamages.length - 1],
    isTorporPossible,
  );
};

/**
 * Применение урона
 * Не использовать напрямую! Только функцию из папки типа персонажа!
 */
export const damageHealth = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyDamages: HealthDamages,
  damageEvent: DamageEvent,
  isTorporPossible: boolean,
): HealthDamages => {
  const healthDamages = [...bodyDamages];
  // Максимальное количество элементов урона
  const maxDamages = healthLevels.length - 1; // 0 элемент healthLevels - это состояние "Здоров"
  // Текущий уровень здоровья
  const healthLevel = getHealthLevel(
    healthLevels,
    bodyDamages,
    isTorporPossible,
  );
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

  // Остаточные слоты ран:
  const remainsHealthLevels = healthLevels.slice(bodyDamages.length + 1);
  // Количество ран до ближайшего предела
  const cutExcessDamageIndex =
    remainsHealthLevels.findIndex(
      (healthLevel) =>
        hasCutExcessDamage(healthLevel) && healthLevel.cutExcessDamage,
    ) + 1;

  // Доступные слоты урона
  const availableCells =
    cutExcessDamageIndex !== 0
      ? Math.min(cutExcessDamageIndex, maxDamages - bodyDamages.length)
      : maxDamages - bodyDamages.length;

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
 * Не использовать напрямую! Только функцию из папки типа персонажа!
 */
export const healHealth = (
  bodyDamages: HealthDamages,
  healthLevelName: HealthLevelName,
  healEvent: HealEvent,
): HealthDamages => {
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
