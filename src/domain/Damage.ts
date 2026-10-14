/**
 * Типы урона
 */
export const damageTypes = [
  /** Дробящий урон (удары кулаком, дубинкой и пр.) */
  "blunt",
  /** Проникающий урон */
  "penetrating",
  /** Огненный урон */
  "fire",
  /** Солнечный урон */
  "solar",
  /** Урон вампирских когтей */
  "vampire_claw",
] as const;

export type DamageType = ArrayElement<typeof damageTypes>;
