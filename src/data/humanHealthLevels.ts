import { healthLevels } from "domain/Health";

/**
 * Уровни здоровья только для сородича
 */
export const humanHealthLevels = healthLevels.filter(
  ({ name }) => name !== "incapacitated",
);

export const MAX_HEALTH = humanHealthLevels.length - 1;
