import { WoundType } from "./Wound";
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
 * Ранения
 */
export type Wounds = WoundType[];

/**
 * Отсортировать Wounds по типам ран от aggravated до bashing
 */
export const sortWounds = (wounds: Wounds): Wounds => {
  const order: Record<WoundType, number> = {
    aggravated: 0,
    lethal: 1,
    bashing: 2,
  };

  // Создаём копию, чтобы не мутировать исходный массив
  return [...wounds].sort((a, b) => order[a] - order[b]);
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
 * Проверка что в уровне есть cutExcessDamage (Ограничение избыточного урона этим уровнем)
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
  /** Предельный тип сложности исцеляемых ран */
  woundType: WoundType;
  /** Точное значение на которое должно измениться здоровье, всегда положительное значение */
  value: number;
}

// TODO:
/** Полученный урон */
export interface WoundEvent {
  type: "wound";
  /** Уже не принимает участие в вычислении урона, который должен получить Сородич, а нужен для того, чтобы здоровье сородича не упало ниже 1 для не "aggravated" */
  woundType: WoundType;
  /** Точное значение на которое должно измениться здоровье, всегда положительное значение, уже с учётом всех снижений урона, множителей от типа урона и пр. */
  value: number;
}

/**
 * Получить данные о здоровье.
 * Не использовать напрямую! Только функцию из папки типа персонажа!
 */
export const getHealthLevel = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyWounds: Wounds,
  isTorporPossible: boolean,
): HealthLevelData => {
  const getVariant = (
    healthLevelData: HealthLevelData,
    damageType: WoundType,
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
  if (bodyWounds.length > healthLevels.length) {
    return getVariant(
      healthLevels[healthLevels.length],
      bodyWounds[healthLevels.length - 1],
      isTorporPossible,
    );
  }
  return getVariant(
    healthLevels[bodyWounds.length],
    bodyWounds[bodyWounds.length - 1],
    isTorporPossible,
  );
};

// TODO:
/*
1 определение типа ран
2 модифицирование урона в соответствии с множителями и успехами проверок
3 применение урона
*/
/**
 * Применение урона
 * Не использовать напрямую! Только функцию из папки типа персонажа!
 */
export const damageHealth = (
  healthLevels: Readonly<HealthLevelData[]>,
  bodyWounds: Wounds,
  woundType: WoundType,
  woundCount: number,
  isTorporPossible: boolean,
): Wounds => {
  const wounds = [...bodyWounds];
  // Максимальное количество элементов урона
  const maxDamages = healthLevels.length - 1; // 0 элемент healthLevels - это состояние "Здоров"
  // Текущий уровень здоровья
  const healthLevel = getHealthLevel(
    healthLevels,
    bodyWounds,
    isTorporPossible,
  );
  // Если финальный урон
  if (healthLevel.name === "final") {
    // Если персонаж по торпору ловит aggravated - заменяем последний урон в bodyWounds на "aggravated"
    if (healthLevel.variant === "torpor" && woundType === "aggravated") {
      wounds[maxDamages - 1] = "aggravated";
      return wounds;
    }
    // иначе ничего не делаем
    return wounds;
  }

  // Остаточные слоты ран:
  const remainsHealthLevels = healthLevels.slice(bodyWounds.length + 1);
  // Количество ран до ближайшего предела
  const cutExcessDamageIndex =
    remainsHealthLevels.findIndex(
      (healthLevel) =>
        hasCutExcessDamage(healthLevel) && healthLevel.cutExcessDamage,
    ) + 1;

  // Доступные слоты урона
  const availableCells =
    cutExcessDamageIndex !== 0
      ? Math.min(cutExcessDamageIndex, maxDamages - bodyWounds.length)
      : maxDamages - bodyWounds.length;

  const damages = Array<WoundType>(
    // персонаж получает урон не выше максимума
    woundCount > availableCells ? availableCells : woundCount,
  ).fill(woundType);

  return [...wounds, ...damages];
};

/**
 * применение исцеления
 * Не использовать напрямую! Только функцию из папки типа персонажа!
 */
export const healHealth = (
  bodyWounds: Wounds,
  healthLevelName: HealthLevelName,
  healEvent: HealEvent,
): Wounds => {
  const wounds = [...bodyWounds];
  // количество исцеления
  const healCount = healEvent.value;
  // Исцеляемый тип урона
  const healWoundType = healEvent.woundType;
  // Если финальная смерть или torpor - исцеление не применяется
  if (healthLevelName === "final") {
    return wounds;
  }
  const aggravatedDamages = wounds.filter((damage) => damage === "aggravated");
  const lethalDamages = wounds.filter((damage) => damage === "lethal");
  const bashingDamages = wounds.filter((damage) => damage === "bashing");
  if (healWoundType === "aggravated") {
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
  if (healWoundType === "lethal") {
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
  if (healWoundType === "bashing") {
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
  return wounds as never;
};
