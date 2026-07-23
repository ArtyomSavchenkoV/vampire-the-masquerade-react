import { DisciplineLevelVariants, DisciplineName } from "models/Discipline";

/**
 * База данных дисциплин
 */
export const disciplines = {
  /** Анимализм */
  animalism: [
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
  presence: [
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
  dominate: [
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
  obtenebration: [
    /** 1 */
    {
      type: "usable",
      availableTarget: ["notSelf"],
      cost: { bloodPool: 1 },
      effects: {
        abilityModifiers: {
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
  protean: [
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
  potence: [
    /** 1 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          strength: 1,
        },
      },
    },
    /** 2 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          strength: 2,
        },
      },
    },
    /** 3 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          strength: 3,
        },
      },
    },
    /** 4 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          strength: 4,
        },
      },
    },
    /** 5 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          strength: 5,
        },
      },
    },
  ],
  dementation: [
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
  fortitude: [
    /** 1 */
    {
      type: "passive",
      effects: {
        absorptionDice: {
          bashing: 1,
          lethal: 1,
          aggravated: 1,
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
          bashing: 2,
          lethal: 2,
          aggravated: 2,
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
          bashing: 3,
          lethal: 3,
          aggravated: 3,
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
          bashing: 4,
          lethal: 4,
          aggravated: 4,
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
          bashing: 5,
          lethal: 5,
          aggravated: 5,
        },
      },
      description:
        "Показатель стойкости 5 прибавляется к пулу проверки на прочность",
    },
  ],
  /** Стремительность */
  celerity: [
    /** 1 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          dexterity: 1,
        },
      },
    },
    /** 2 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          dexterity: 2,
        },
      },
    },
    /** 3 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          dexterity: 3,
        },
      },
    },
    /** 4 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          dexterity: 4,
        },
      },
    },
    /** 5 */
    {
      type: "passive",
      effects: {
        attributesModifiers: {
          dexterity: 5,
        },
      },
    },
  ],
  /** Ясновидение */
  auspex: [
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
  obfuscate: [
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
