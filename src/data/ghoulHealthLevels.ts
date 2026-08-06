import { healthLevels } from "domain/Health";

/**
 * Уровни здоровья только для сородича
 */
export const ghoulHealthLevels = healthLevels;

export const MAX_HEALTH = ghoulHealthLevels.length - 1;
