import { TMentalDisorder } from "./MentalDisorder";

export type TReference =
  /** Справка о психическом расстройстве. */
  {
    type: "mentalDisorder";
    mentalDisorder: TMentalDisorder;
  };
