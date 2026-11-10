import { DisciplineLevel, DisciplineName } from "./Discipline";
import { TMentalDisorder } from "./MentalDisorder";

export type TReference =
  /** Справка о психическом расстройстве. */
  | {
      type: "mentalDisorder";
      mentalDisorder: TMentalDisorder;
    }
  | {
      type: "disciplineLevel";
      discipline: DisciplineName;
      level: DisciplineLevel;
    };
