import { DisciplineLevel, DisciplineName } from "./Discipline";
import { TMentalDisorder } from "./MentalDisorder";

export type TDisciplineLevelReference = {
  type: "disciplineLevel";
  discipline: DisciplineName;
  level: DisciplineLevel;
};

export type TReference =
  /** Справка о психическом расстройстве. */
  | {
      type: "mentalDisorder";
      mentalDisorder: TMentalDisorder;
    }
  /** Справка о силе дисциплины */
  | TDisciplineLevelReference
  /** Справка о цветах ауры */
  | {
      type: "auraColors";
    }
  /** Справка видиние невидимого */
  | {
      type: "seeInvisible";
    };
