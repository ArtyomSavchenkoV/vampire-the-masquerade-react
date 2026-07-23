import { HealthLevelData } from "models/HealthLevel";

/**
 * Уровни здоровья только для сородича
 */
export const kindredHealthLevels = [
  {
    name: "unimpaired",
  },
  {
    name: "superficial",
  },
  {
    name: "moderate",
    modifiers: {
      commonDiceBonus: -1,
    },
  },
  {
    name: "severe",
    modifiers: {
      commonDiceBonus: -1,
    },
  },
  {
    name: "critical",
    modifiers: {
      commonDiceBonus: -2,
    },
  },
  {
    name: "incapacitated",
    modifiers: {
      commonDiceBonus: -2,
    },
  },
  {
    name: "maimed",
    modifiers: {
      commonDiceBonus: -5,
    },
  },
  {
    name: "dead",
  },
] as const satisfies Readonly<HealthLevelData[]>;
