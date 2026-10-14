/**
 * Типы ран в V20.
 */
export const woundTypes = [
  /** Лёгкая рана. */
  "bashing",
  /** Серьёзная рана. */
  "lethal",
  /** Сверхестественная рана. */
  "aggravated",
] as const;

export type WoundType = ArrayElement<typeof woundTypes>;
