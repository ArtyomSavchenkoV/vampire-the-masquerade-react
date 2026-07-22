import { DisciplineLevelVariants, DisciplineName } from "models/Discipline";

/**
 * База данных дисциплин
 */
export const disciplines = {
  /** Анимализм */
  Animalism: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "animal_ken"],
        difficultLevel: 6,
      },
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["survival", "charisma"],
        difficultLevel: 6,
      },
    },
    /** 3 */
    [
      {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "intimidation"],
          difficultLevel: 7,
        },
      },
      {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "empathy"],
          difficultLevel: 7,
        },
      },
    ],
    /** 4 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "animal_ken"],
        difficultLevel: 8,
      },
    },
    /** 5 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "selfControl"],
        difficultLevel: 8,
      },
    },
  ],
  /** Величие */
  Presence: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      cost: { bloodPool: 1 },
      check: {
        type: "fixedDifficulty",
        selfCheck: ["charisma", "performance"],
        difficultLevel: 7,
      },
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["charisma", "intimidation"],
        difficultTarget: ["wits", "courage"],
      },
    },
    /** 3 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      cost: { bloodPool: 1 },
      check: {
        type: "opposedCheck",
        selfCheck: ["appearance", "empathy"],
        difficultTarget: ["willpower"],
      },
    },
    /** 4 */
    [
      {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 5,
        },
        description: "Сложность зависит от степени близости с жертвой",
      },
      {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 6,
        },
        description: "Сложность зависит от степени близости с жертвой",
      },
      {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 7,
        },
        description: "Сложность зависит от степени близости с жертвой",
      },
      {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 8,
        },
        description: "Сложность зависит от степени близости с жертвой",
      },
    ],
    /** 5 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      cost: { willpower: 1 },
    },
  ],
  /** Доминирование */
  Dominate: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["manipulation", "intimidation"],
        difficultTarget: ["willpower"],
      },
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["manipulation", "leadership"],
        difficultTarget: ["willpower"],
      },
    },
    /** 3 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["wits", "subterfuge"],
        difficultTarget: ["willpower"],
      },
    },
    /** 4 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["charisma", "leadership"],
        difficultTarget: ["willpower"],
      },
    },
    /** 5 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      cost: { willpower: 1 },
      check: {
        type: "fixedDifficulty",
        selfCheck: ["charisma", "intimidation"],
        difficultLevel: 7,
      },
      description: "Продолжительная встречная проверка против воли жертвы",
    },
  ],
  /** Затмение */
  Obtenebration: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      cost: { bloodPool: 1 },
      effects: {
        abilityEffects: {
          stealth: 1,
        },
      },
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "occult"],
        difficultLevel: 7,
      },
    },
    /** 3 */
    {
      type: "usable",
      availableTarget: ["self"],
      cost: { bloodPool: 1 },
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "occult"],
        difficultLevel: 7,
      },
    },
    /** 4 */
    {
      type: "usable",
      availableTarget: ["self"],
      cost: { bloodPool: 2 },
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "courage"],
        difficultLevel: 7,
      },
    },
    /** 5 */
    {
      type: "usable",
      availableTarget: ["self"],
      cost: { bloodPool: 3 },
    },
  ],
  /** Метаморфозы */
  Protean: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["self"],
      duration: "scene",
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["self"],
      cost: { bloodPool: 1 },
      duration: "scene",
      // TODO: параметры урона когтей
    },
    /** 3 */
    {
      type: "usable",
      availableTarget: ["self"],
      cost: { bloodPool: 1 },
    },
    /** 4 */
    [
      {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
        castDuration: 3,
      },
      {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 2 },
        castDuration: 2,
      },
      {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 3 },
        castDuration: 1,
      },
    ],
    /** 5 */
    [
      {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
        castDuration: 3,
      },
      {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 2 },
        castDuration: 2,
      },
      {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 3 },
        castDuration: 1,
      },
    ],
  ],
  /** Мощь */
  Potence: [
    /** 1 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          strength: 1,
        },
      },
    },
    /** 2 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          strength: 2,
        },
      },
    },
    /** 3 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          strength: 3,
        },
      },
    },
    /** 4 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          strength: 4,
        },
      },
    },
    /** 5 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          strength: 5,
        },
      },
    },
  ],
  Dementation: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["self", "notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["charisma", "empathy"],
        difficultTarget: ["humanityOrPathRating"],
      },
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["self", "notSelf"],
      cost: { bloodPool: 1 },
      check: {
        type: "opposedCheck",
        selfCheck: ["subterfuge", "manipulation"],
        difficultTarget: ["perception", "selfControl"],
      },
    },
    /** 3 */
    [
      {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 6,
        },
        description: "От окружения",
      },
      {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 7,
        },
        description: "Прочесть закодированное сообщение",
      },
      {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 8,
        },
        description: "Определить натуру знакомого",
      },
      {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 9,
        },
        description: "Определить натуру незнакомца",
      },
    ],
    /** 4 */
    {
      type: "usable",
      availableTarget: ["self", "notSelf"],
      cost: { bloodPool: 1 },
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "empathy"],
        difficultLevel: 7,
      },
      duration: "scene",
    },
    /** 5 */
    {
      type: "usable",
      availableTarget: ["self", "notSelf"],
      cost: { bloodPool: 1 },
      check: {
        type: "opposedCheck",
        selfCheck: ["manipulation", "intimidation"],
        difficultTarget: ["willpower"],
      },
      duration: "successCount",
    },
  ],
  /** Стойкость */
  Fortitude: [
    /** 1 */
    {
      type: "passive",
      effects: {
        absorptionDice: {
          Bashing: 1,
          Lethal: 1,
          Aggravated: 1,
        },
      },
      description:
        "Показатель стойкости 1 прибавляется к пулу проверки на прочность",
    },
    /** 2 */
    {
      type: "passive",
      effects: {
        absorptionDice: {
          Bashing: 2,
          Lethal: 2,
          Aggravated: 2,
        },
      },
      description:
        "Показатель стойкости 2 прибавляется к пулу проверки на прочность",
    },
    /** 3 */
    {
      type: "passive",
      effects: {
        absorptionDice: {
          Bashing: 3,
          Lethal: 3,
          Aggravated: 3,
        },
      },
      description:
        "Показатель стойкости 3 прибавляется к пулу проверки на прочность",
    },
    /** 4 */
    {
      type: "passive",
      effects: {
        absorptionDice: {
          Bashing: 4,
          Lethal: 4,
          Aggravated: 4,
        },
      },
      description:
        "Показатель стойкости 4 прибавляется к пулу проверки на прочность",
    },
    /** 5 */
    {
      type: "passive",
      effects: {
        absorptionDice: {
          Bashing: 5,
          Lethal: 5,
          Aggravated: 5,
        },
      },
      description:
        "Показатель стойкости 5 прибавляется к пулу проверки на прочность",
    },
  ],
  /** Стремительность */
  Celerity: [
    /** 1 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          dexterity: 1,
        },
      },
    },
    /** 2 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          dexterity: 2,
        },
      },
    },
    /** 3 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          dexterity: 3,
        },
      },
    },
    /** 4 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          dexterity: 4,
        },
      },
    },
    /** 5 */
    {
      type: "passive",
      effects: {
        attributesEffects: {
          dexterity: 5,
        },
      },
    },
  ],
  /** Ясновидение */
  Auspex: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["self"],
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["perception", "empathy"],
        difficultLevel: 8,
      },
      duration: "scene",
    },
    /** 3 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "plot",
        selfCheck: ["perception", "empathy"],
        difficultDescription: "Определяется мастером на основе сюжета",
      },
      duration: "scene",
    },
    /** 4 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["intelligence", "subterfuge"],
        difficultTarget: ["willpower"],
      },
    },
    /** 5 */
    {
      type: "usable",
      availableTarget: ["self"],
      cost: { willpower: 1 },
      check: {
        type: "plot",
        selfCheck: ["perception", "awareness"],
        difficultDescription: "Сложность проверки (5-9) зависит от расстояния",
      },
    },
  ],
  /** Сокрытие */
  Obfuscate: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["self"],
    },
    /** 2 */
    {
      type: "usable",
      availableTarget: ["self"],
    },
    /** 3 */
    {
      type: "usable",
      availableTarget: ["self"],
      check: {
        type: "fixedDifficulty",
        selfCheck: ["manipulation", "performance"],
        difficultLevel: 7,
      },
      duration: "scene",
    },
    /** 4 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      check: {
        type: "opposedCheck",
        selfCheck: ["charisma", "stealth"],
        difficultTarget: ["wits", "awareness"],
      },
      description: "Кастуется на себя, но на глазах у свидетелей",
    },
    /** 5 */
    {
      type: "usable",
      availableTarget: ["self", "notSelf"],
      description:
        "Каждый пункт скрытности позволяет спрятать 1 спутника, то есть если скрытность 4, можно спрятать 4 спутника.",
    },
  ],
} as const satisfies Record<DisciplineName, readonly DisciplineLevelVariants[]>;
