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

export type AbilityLevel = 0 | 1 | 2 | 3 | 4 | 5;
