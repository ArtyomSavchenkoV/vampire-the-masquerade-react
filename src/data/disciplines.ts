import { DisciplineLevelVariants, DisciplineName } from "domain/Discipline";

/**
 * База данных дисциплин
 */
export const disciplines = {
  /** Анимализм */
  animalism: [
    /** 1 */
    {
      conversation: {
        type: "usable",
        availableTarget: ["animal"],
      },
      carnivorous_mammals_order: {
        type: "usable",
        availableTarget: ["carnivorous_mammal"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "animal_ken"],
          difficultLevel: 6,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      carnivorous_birds_and_mammals_order: {
        type: "usable",
        availableTarget: ["mammal", "carnivorous_bird"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "animal_ken"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      birds_and_reptiles_order: {
        type: "usable",
        availableTarget: ["mammal", "bird", "reptile"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "animal_ken"],
          difficultLevel: 8,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 2 */
    {
      calling: {
        type: "usable",
        availableTarget: ["animal"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["survival", "charisma"],
          difficultLevel: 6,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 3 */
    {
      beast_taming_intimidation_mortal: {
        type: "usable",
        availableTarget: ["mortal"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "intimidation"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "opposed",
            count: ["willpower"],
          },
        },
      },
      beast_taming_empathy_mortal: {
        type: "usable",
        availableTarget: ["mortal"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "empathy"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "opposed",
            count: ["willpower"],
          },
        },
      },
      beast_taming_empathy_kindred: {
        type: "usable",
        availableTarget: ["kindred"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "empathy"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 3,
          },
        },
      },
    },
    /** 4 */
    {
      spirit_absorption: {
        type: "usable",
        availableTarget: ["animal"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "animal_ken"],
          difficultLevel: 8,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 5 */
    {
      beast_alienation: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "selfControl"],
          difficultLevel: 8,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
  ],
  /** Величие */
  presence: [
    /** 1 */
    {
      reverence: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "performance"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 2 */
    {
      intimidating_gaze: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["charisma", "intimidation"],
          difficultTarget: ["wits", "courage"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 3 */
    {
      enchantment: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "opposedCheck",
          selfCheck: ["appearance", "empathy"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 4 */
    {
      invitation_close_friend: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 5,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      invitation_friend: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 6,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      invitation_acquaintance: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      invitation_stranger: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "subterfuge"],
          difficultLevel: 8,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 5 */
    {
      adoration: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { willpower: 1 },
      },
    },
  ],
  /** Доминирование */
  dominate: [
    /** 1 */
    {
      order: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["manipulation", "intimidation"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 2 */
    {
      suggestion: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["manipulation", "leadership"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 3 */
    {
      oblivion: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["wits", "subterfuge"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 4 */
    {
      enslavement: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["charisma", "leadership"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 5 */
    {
      possession: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { willpower: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["charisma", "intimidation"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
  ],
  /** Затмение */
  obtenebration: [
    /** 1 */
    {
      shadow_theater: {
        type: "usable",
        availableTarget: ["notSelf"],
        cost: { bloodPool: 1 },
        effects: {
          abilityModifiers: {
            stealth: 1,
          },
        },
      },
    },
    /** 2 */
    {
      night_veil: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "occult"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 3 */
    {
      abyss_hands: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "occult"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 4 */
    {
      black_metamorphosis: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 2 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "courage"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 5 */
    {
      twilight_appearance: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 3 },
      },
    },
  ],
  /** Метаморфозы */
  protean: [
    /** 1 */
    {
      beast_eyes: {
        type: "usable",
        availableTarget: ["self"],
        duration: "scene",
      },
    },
    /** 2 */
    {
      beast_claws: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
        duration: "scene",
        // TODO: параметры урона когтей
      },
    },
    /** 3 */
    {
      earth_merging: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
      },
    },
    /** 4 */
    {
      beast_appearance_slow_cast: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
        castDuration: 3,
      },
      beast_appearance_moderate_cast: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 2 },
        castDuration: 2,
      },
      beast_appearance_fast_cast: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 3 },
        castDuration: 1,
      },
    },
    /** 5 */
    {
      fog_transformation_slow_cast: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 1 },
        castDuration: 3,
      },
      fog_transformation_moderate_cast: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 2 },
        castDuration: 2,
      },
      fog_transformation_fast_cast: {
        type: "usable",
        availableTarget: ["self"],
        cost: { bloodPool: 3 },
        castDuration: 1,
      },
    },
  ],
  /** Мощь */
  potence: [
    /** 1 */
    {
      potence_1: {
        type: "passive",
        effects: {
          attributesModifiers: {
            strength: 1,
          },
        },
      },
    },
    /** 2 */
    {
      potence_2: {
        type: "passive",
        effects: {
          attributesModifiers: {
            strength: 2,
          },
        },
      },
    },
    /** 3 */
    {
      potence_3: {
        type: "passive",
        effects: {
          attributesModifiers: {
            strength: 3,
          },
        },
      },
    },
    /** 4 */
    {
      potence_4: {
        type: "passive",
        effects: {
          attributesModifiers: {
            strength: 4,
          },
        },
      },
    },
    /** 5 */
    {
      potence_5: {
        type: "passive",
        effects: {
          attributesModifiers: {
            strength: 5,
          },
        },
      },
    },
  ],
  dementation: [
    /** 1 */
    {
      passion: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["charisma", "empathy"],
          difficultTarget: ["humanityOrPathRating"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 2 */
    {
      obsession: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "opposedCheck",
          selfCheck: ["subterfuge", "manipulation"],
          difficultTarget: ["perception", "selfControl"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 3 */
    {
      environment: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 6,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      encrypted_message: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      acquaintance_nature: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 8,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      stranger_nature: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "occult"],
          difficultLevel: 9,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 4 */
    {
      madness_voice: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "empathy"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
        duration: "scene",
      },
    },
    /** 5 */
    {
      clouding_mind: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
        cost: { bloodPool: 1 },
        check: {
          type: "opposedCheck",
          selfCheck: ["manipulation", "intimidation"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
        duration: "successCount",
      },
    },
  ],
  /** Стойкость */
  fortitude: [
    /** 1 */
    {
      fortitude_1: {
        type: "passive",
        effects: {
          absorptionDice: {
            bashing: 1,
            lethal: 1,
            aggravated: 1,
          },
        },
      },
    },
    /** 2 */
    {
      fortitude_2: {
        type: "passive",
        effects: {
          absorptionDice: {
            bashing: 2,
            lethal: 2,
            aggravated: 2,
          },
        },
      },
    },
    /** 3 */
    {
      fortitude_3: {
        type: "passive",
        effects: {
          absorptionDice: {
            bashing: 3,
            lethal: 3,
            aggravated: 3,
          },
        },
      },
    },
    /** 4 */
    {
      fortitude_4: {
        type: "passive",
        effects: {
          absorptionDice: {
            bashing: 4,
            lethal: 4,
            aggravated: 4,
          },
        },
      },
    },
    /** 5 */
    {
      fortitude_5: {
        type: "passive",
        effects: {
          absorptionDice: {
            bashing: 5,
            lethal: 5,
            aggravated: 5,
          },
        },
      },
    },
  ],
  /** Стремительность */
  celerity: [
    /** 1 */
    {
      celerity_1: {
        type: "passive",
        effects: {
          attributesModifiers: {
            dexterity: 1,
          },
        },
      },
    },
    /** 2 */
    {
      celerity_2: {
        type: "passive",
        effects: {
          attributesModifiers: {
            dexterity: 2,
          },
        },
      },
    },
    /** 3 */
    {
      celerity_3: {
        type: "passive",
        effects: {
          attributesModifiers: {
            dexterity: 3,
          },
        },
      },
    },
    /** 4 */
    {
      celerity_4: {
        type: "passive",
        effects: {
          attributesModifiers: {
            dexterity: 4,
          },
        },
      },
    },
    /** 5 */
    {
      celerity_5: {
        type: "passive",
        effects: {
          attributesModifiers: {
            dexterity: 5,
          },
        },
      },
    },
  ],
  /** Ясновидение */
  auspex: [
    /** 1 */
    {
      heightened_senses: { type: "usable", availableTarget: ["self"] },
    },
    /** 2 */
    {
      aura_reading: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "empathy"],
          difficultLevel: 8,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
        duration: "scene",
      },
    },
    /** 3 */
    {
      psychometrics: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "plot",
          selfCheck: ["perception", "empathy"],
        },
        duration: "scene",
      },
    },
    /** 4 */
    {
      telepathy: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["intelligence", "subterfuge"],
          difficultTarget: ["willpower"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 5 */
    {
      near: {
        type: "usable",
        availableTarget: ["self"],
        cost: { willpower: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "awareness"],
          difficultLevel: 5,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      not_far: {
        type: "usable",
        availableTarget: ["self"],
        cost: { willpower: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "awareness"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
      very_far: {
        type: "usable",
        availableTarget: ["self"],
        cost: { willpower: 1 },
        check: {
          type: "fixedDifficulty",
          selfCheck: ["perception", "awareness"],
          difficultLevel: 9,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
  ],
  /** Сокрытие */
  obfuscate: [
    /** 1 */
    {
      shadows_cloak: { type: "usable", availableTarget: ["self"] },
    },
    /** 2 */
    {
      invisible_presence: { type: "usable", availableTarget: ["self"] },
    },
    /** 3 */
    {
      many_faces_mask: {
        type: "usable",
        availableTarget: ["self"],
        check: {
          type: "fixedDifficulty",
          selfCheck: ["manipulation", "performance"],
          difficultLevel: 7,
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
        duration: "scene",
      },
    },
    /** 4 */
    {
      disappearance: {
        type: "usable",
        availableTarget: ["notSelf"],
        check: {
          type: "opposedCheck",
          selfCheck: ["charisma", "stealth"],
          difficultTarget: ["wits", "awareness"],
          requiredSuccesses: {
            type: "fixed",
            count: 1,
          },
        },
      },
    },
    /** 5 */
    {
      secret_meeting: {
        type: "usable",
        availableTarget: ["self", "notSelf"],
      },
    },
  ],
} as const satisfies Record<DisciplineName, readonly DisciplineLevelVariants[]>;
