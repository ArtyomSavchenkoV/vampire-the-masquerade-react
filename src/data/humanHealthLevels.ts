import { HealthLevelData } from "domain/Health";

/**
 * Уровни здоровья только для человека
 */
export const humanHealthLevels = [
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
    name: "finalDeath",
  },
] as const satisfies Readonly<HealthLevelData[]>;
