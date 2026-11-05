export const mentalStabilities = [
  /** Совесть (Humanity) или Путь (Path) — шкала морали */
  "morality",
  /** Самоконтроль (Self-Control) или Инстинкты (Instincts) */
  "selfControl",
  /** Смелость (Courage) — сопротивление страху и безумию */
  "courage",
] as const;

export type MentalStability = ArrayElement<typeof mentalStabilities>;

export const isMentalStability = (target: any): target is MentalStability =>
  mentalStabilities.includes(target as MentalStability);

export const mentalStabilityLevels = [1, 2, 3, 4, 5] as const;

export type MentalStabilityLevel = ArrayElement<typeof mentalStabilityLevels>;
