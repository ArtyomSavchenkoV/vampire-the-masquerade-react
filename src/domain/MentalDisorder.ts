export const mentalDisorders = [
  /** Булимия */
  "bulimia",
  /** Биполярное расстройство */
  "bipolar",
  /** Диссоциативная фуга */
  "dissociativeFugue",
  /** Истерия */
  "hysteria",
  /** Кровавый анимизм */
  "bloodAnimism",
  /** Мегаломания */
  "megalomania",
  /** Обсессивно-компульсивное расстройство */
  "ocd",
  /** Расстройство идентичности */
  "identityDisorder",
  /** Паранойя */
  "paranoia",
  /** Шизофрения */
  "schizophrenia",
] as const;

export type TMentalDisorder = ArrayElement<typeof mentalDisorders>;
