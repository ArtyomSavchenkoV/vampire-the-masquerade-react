import { HealthLevelData } from "domain/Health";

/**
 * Уровни здоровья только для сородича
 */
export const kindredHealthLevels = [
  /** Персонаж полностью здоров. */
  {
    name: "unimpaired",
  },
  /** Помят — небольшие ушибы и ссадины. */
  {
    name: "battered",
  },
  /** Легко ранен — раны мешают действовать, появляются штрафы. */
  {
    name: "lightlyWounded",
    modifiers: {
      commonDiceBonus: -1,
    },
  },
  /** Ранен — раны мешают действовать. */
  {
    name: "wounded",
    modifiers: {
      commonDiceBonus: -1,
    },
  },
  /** Серьёзно ранен */
  {
    name: "seriouslyWounded",
    modifiers: {
      commonDiceBonus: -2,
    },
  },
  /** Тяжело ранен */
  {
    name: "heavilyWounded",
    modifiers: {
      commonDiceBonus: -2,
    },
  },
  /** Едва жив — персонаж почти не способен двигаться. */
  {
    name: "nearlyDown",
    modifiers: {
      commonDiceBonus: -5,
    },
  },
  /** Небоеспособен. — на грани потери сознания и смерти. */
  {
    name: "incapacitated",
  },
] as const satisfies Readonly<HealthLevelData[]>;

/**
 * В отключке.
 */
export const torpor = {
  name: "torpor",
} as const satisfies HealthLevelData;

/**
 * Окончательная смерть.
 */
export const finalDeath = {
  name: "finalDeath",
} as const satisfies HealthLevelData;
