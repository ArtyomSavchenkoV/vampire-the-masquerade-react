import { Effects } from "./Effects";

/**
 * Уровни здоровья по правилам V20.
 */
export type HealthLevelName =
  /** Персонаж полностью здоров. */
  | "unimpaired"
  /** Помят — небольшие ушибы и ссадины. */
  | "superficial"
  /** Легко ранен — ощутимые, но не опасные повреждения. */
  | "moderate"
  /** Ранен — раны мешают действовать, появляются штрафы. */
  | "severe"
  /** Серьёзно ранен — критическое ухудшение состояния. */
  | "critical"
  /** Тяжело ранен — персонаж почти не способен двигаться. */
  | "incapacitated"
  /** Едва жив — на грани потери сознания и смерти. */
  | "maimed"
  /** При смерти — смерть персонажа. */
  | "dead";

export interface HealthLevelData {
  name: HealthLevelName;
  effects?: Effects;
}

export const getHealthLevel = (
  health: number,
  healthLevels: HealthLevelData[],
): HealthLevelData => {
  const maxHealth = healthLevels.length - 1;
  const damage = maxHealth - health;

  if (damage > maxHealth) {
    return healthLevels[maxHealth];
  }

  if (damage < 0) {
    return healthLevels[0];
  }

  return healthLevels[damage];
};
