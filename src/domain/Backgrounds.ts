/**
 * Факты биографии
 */
export const backgroundNames = [
  /** Информаторы (Contacts) */
  "contacts",
  /** Союзники (Allies) */
  "allies",
  /** Поколение (Generation) — технически это не Background, но часто выносят отдельно */
  "generation",
  /** Богатство (Resources) */
  "resources",
  // TODO: уточнить все последующие
  // /** Статус (Status) */
  // | "status"
  // /** Ментор (Mentor) */
  // | "mentor"
  // /** Слуги (Retainers) */
  // | "retainers"
  // /** Влияние (Influence) */
  // | "influence"
  // /** Фамильяр (Familiar) */
  // | "familiar"
  // /** Доминион (Dominion) */
  // | "dominion";
] as const;

export type BackgroundName = ArrayElement<typeof backgroundNames>;

export const backgroundLevels = [1, 2, 3, 4, 5] as const;

export type BackgroundLevel = ArrayElement<typeof backgroundLevels>;
