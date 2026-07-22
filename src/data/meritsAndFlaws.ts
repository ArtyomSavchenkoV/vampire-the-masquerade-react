import { MeritsAndFlawsName, MeritsAndFlawsData } from "models/MeritsAndFlaws";

export const meritsAndFlaws = {
  /** Чарующий голос */
  charmOfTheTongue: {
    cost: 2,
  },
  /** Знакомое лицо */
  familiarFace: {
    cost: 2,
  },
  /** Приезжий */
  outsider: {
    cost: -1,
  },
  /** Разборчивость */
  fastidious: {
    cost: -1,
  },
  /** Потенциальный рекрут */
  potentialRecruit: {
    cost: -1,
  },
  /** Рефлексия */
  introspection: {
    cost: 1,
  },
  /** Полиглот */
  polyglot: {
    cost: 1,
  },
  /** Оракул */
  oracle: {
    cost: 3,
  },
  /** Кошмар */
  nightmare: {
    cost: -1,
  },
  /** Здоровый вид */
  healthyAppearance: {
    cost: 2,
  },
  /** Холодная логика */
  coldLogic: {
    cost: 1,
  },
  /** Эйдетическая память */
  eideticMemory: {
    cost: 2,
  },
} as const satisfies Record<MeritsAndFlawsName, MeritsAndFlawsData>;
