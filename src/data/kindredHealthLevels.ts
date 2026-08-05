import { healthLevels } from "domain/Health";

/**
 * Уровни здоровья только для сородича
 */
export const kindredHealthLevels = healthLevels;

export const MAX_HEALTH = kindredHealthLevels.length - 1;
