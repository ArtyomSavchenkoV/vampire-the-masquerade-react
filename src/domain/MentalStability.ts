export type MentalStability =
  /** Совесть (Humanity) или Путь (Path) — шкала морали */
  | "morality"
  /** Самоконтроль (Self-Control) или Инстинкты (Instincts) */
  | "selfControl"
  /** Смелость (Courage) — сопротивление страху и безумию */
  | "courage";

export type MentalStabilityLevel = 1 | 2 | 3 | 4 | 5;
