export const attributeNames = [
  /** Физическая сила */
  "strength",
  /** Ловкость */
  "dexterity",
  /** Выносливость */
  "stamina",
  /** Обаяние (социальное притяжение) */
  "charisma",
  /** Манипуляция (умение управлять другими) */
  "manipulation",
  /** Привлекательность (внешность) */
  "appearance",
  /** Восприятие (замечает детали) */
  "perception",
  /** Интеллект (анализ, обучение) */
  "intelligence",
  /** Смекалка (быстрая реакция, импровизация) */
  "wits",
] as const;

export type AttributeName = ArrayElement<typeof attributeNames>;

/** Допустимые базовые уровни атрибутов персонажа, без каких либо модиыикаторов */
export const baseAttributeLevels = [1, 2, 3, 4, 5] as const;

export type BaseAttributeLevel = ArrayElement<typeof baseAttributeLevels>;

/** Допустимые уровни атрибутов персонажа, в том числе с учётом модификаторов */
export const modifiedAttributeLevels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
] as const;

export type ModifiedAttributeLevel = ArrayElement<
  typeof modifiedAttributeLevels
>;

export const MODIFIED_ATTRIBUTE_MIN = modifiedAttributeLevels[0];
export const MODIFIED_ATTRIBUTE_MAX =
  modifiedAttributeLevels[modifiedAttributeLevels.length - 1];
