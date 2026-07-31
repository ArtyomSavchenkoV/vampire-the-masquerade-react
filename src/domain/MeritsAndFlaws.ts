import { ClanName } from "./Clan";
import { Modifiers } from "./Modifiers";

/**
 * Достоинства (Merits) для Vampire: The Masquerade v20
 */
export const meritNames = [
  /** Чарующий голос */
  "charmOfTheTongue",
  /** Знакомое лицо */
  "familiarFace",
  /** Рефлексия */
  "introspection",
  /** Полиглот */
  "polyglot",
  /** Оракул */
  "oracle",
  /** Здоровый вид */
  "healthyAppearance",
  /** Холодная логика */
  "coldLogic",
  /** Эйдетическая память */
  "eideticMemory",
] as const;

export type MeritName = ArrayElement<typeof meritNames>;

/**
 * Недостатки (Flaws) для Vampire: The Masquerade v20
 */
export const flawNames = [
  /** Приезжий */
  "outsider",
  /** Разборчивость */
  "fastidious",
  /** Потенциальный рекрут */
  "potentialRecruit",
  /** Кошмар */
  "nightmare",
] as const;

export type FlawName = ArrayElement<typeof flawNames>;

export interface MeritsAndFlawsData {
  /** Стоимость в свободных очках. (для достоинств - положительное число, для недостатков - отрицательное) */
  cost: number;
  // TODO: в будущем у некоторых могут быть эффекты
  /** Эффекты, применяемые автоматически (бонусы, поглощение и т.д.). */
  effects?: Modifiers;
  /** Не доступны для кланов */
  abandonForClans?: readonly ClanName[];
}
