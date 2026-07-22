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
    effects: {
      commonDiceBonus: -1,
    },
  },
  {
    name: "severe",
    effects: {
      commonDiceBonus: -1,
    },
  },
  {
    name: "critical",
    effects: {
      commonDiceBonus: -2,
    },
  },
  {
    name: "incapacitated",
    effects: {
      commonDiceBonus: -2,
    },
  },
  {
    name: "maimed",
    effects: {
      commonDiceBonus: -5,
    },
  },
  {
    name: "dead",
  },
] as const satisfies Readonly<HealthLevelData[]>;
