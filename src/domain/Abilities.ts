export type AbilityName =
  /** Атлетика */
  | "athletics"
  /** Бдительность */
  | "alertness"
  /** Драка */
  | "brawl"
  /** Запугивание */
  | "intimidation"
  /** Красноречие */
  | "expression" // в V20 часто "Expression" вместо "Eloquence"
  /** Лидерство */
  | "leadership"
  /** Уличное чутьё */
  | "streetwise"
  /** Хитрость */
  | "subterfuge"
  /** Шестое чувство */
  | "awareness"
  /** Эмпатия */
  | "empathy"

  /** Вождение */
  | "drive"
  /** Воровство */
  | "larceny"
  /** Выживание */
  | "survival"
  /** Исполнение (выступления, музыка, театр) */
  | "performance"
  /** Обращение с животными */
  | "animal_ken"
  /** Ремесло */
  | "crafts"
  /** Скрытность */
  | "stealth"
  /** Стрельба */
  | "firearms"
  /** Фехтование */
  | "melee"

  /** Этикет */
  | "etiquette"
  /** Гуманитарные науки */
  | "academics"
  /** Естественные науки */
  | "science"
  /** Законы */
  | "law"
  /** Информатика */
  | "computer"
  /** Медицина */
  | "medicine"
  /** Оккультизм */
  | "occult"
  /** Политика */
  | "politics"
  /** Расследование */
  | "investigation"
  /** Финансы */
  | "finance"
  /** Электроника */
  | "electronics";

/** Допустимые базовые уровни абилок персонажа, без каких либо модиыикаторов */
export const baseAbilityLevels = [0, 1, 2, 3, 4, 5] as const;

export type BaseAbilityLevel = ArrayElement<typeof baseAbilityLevels>;

/** Допустимые уровни абилок персонажа, в том числе с учётом модификаторов */
export const modifiedAbilityLevels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
] as const;

export type ModifiedAbilityLevel = ArrayElement<typeof modifiedAbilityLevels>;

export const MODIFIED_ABILITY_MIN = modifiedAbilityLevels[0];
export const MODIFIED_ABILITY_MAX =
  modifiedAbilityLevels[modifiedAbilityLevels.length - 1];
