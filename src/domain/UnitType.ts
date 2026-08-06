export const unitTypes = [
  /** Сородич (вампир) — основная игровая роль в V20 */
  "kindred",
  /** Гуль */
  "ghoul",
  /** Человек — второстепенные персонажи, NPC без сверхъестественных сил */
  "human",
  /** Существо — животные, монстры и прочие не‑разумные или иные сущности (например, медведь, крыса) */
  "creature",
] as const;

export type UnitType = ArrayElement<typeof unitTypes>;
