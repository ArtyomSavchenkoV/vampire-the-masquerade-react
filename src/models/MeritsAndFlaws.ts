import { Modifiers } from "./Modifiers";

/**
 * Достоинства и недостатки (Merits & Flaws) для Vampire: The Masquerade v20
 */
export type MeritsAndFlawsName =
  /** Чарующий голос */
  | "charmOfTheTongue"
  /** Знакомое лицо */
  | "familiarFace"
  /** Приезжий */
  | "outsider"
  /** Разборчивость */
  | "fastidious"
  /** Потенциальный рекрут */
  | "potentialRecruit"
  /** Рефлексия */
  | "introspection"
  /** Полиглот */
  | "polyglot"
  /** Оракул */
  | "oracle"
  /** Кошмар */
  | "nightmare"
  /** Здоровый вид */
  | "healthyAppearance"
  /** Холодная логика */
  | "coldLogic"
  /** Эйдетическая память */
  | "eideticMemory";

export interface MeritsAndFlawsData {
  /** Стоимость в свободных очках. (для достоинств - положительное число, для недостатков - отрицательное) */
  cost: number;
  // TODO: в будущем у некоторых могут быть эффекты
  /** Эффекты, применяемые автоматически (бонусы, поглощение и т.д.). */
  effects?: Modifiers;
}
