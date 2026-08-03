import { HealthLevelData } from "domain/Health";

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
  {
    name: "incapacitated",
    isIncapacitated: true,
  },
  /** Окончательная смерть. */
  {
    name: "final",
    isIncapacitated: true,
    variant: "death",
  },
] as const satisfies Readonly<HealthLevelData[]>;
