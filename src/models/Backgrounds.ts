/**
 * Факты биографии
 */
export type BackgroundName =
  /** Информаторы (Contacts) */
  | "contacts"
  /** Союзники (Allies) */
  | "allies"
  /** Поколение (Generation) — технически это не Background, но часто выносят отдельно */
  | "generation"
  /** Богатство (Resources) */
  | "resources";
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

export type BackgroundLevel = 1 | 2 | 3 | 4 | 5;
