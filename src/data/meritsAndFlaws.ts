import { MeritsAndFlawsData, FlawName, MeritName } from "domain/MeritsAndFlaws";

export const merits = {
  /** Чарующий голос */
  charmOfTheTongue: {
    cost: 2,
  },
  /** Знакомое лицо */
  familiarFace: {
    cost: 2,
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
  /** Здоровый вид */
  healthyAppearance: {
    cost: 2,
    abandonForClans: ["Nosferatu"],
  },
  /** Холодная логика */
  coldLogic: {
    cost: 1,
  },
  /** Эйдетическая память */
  eideticMemory: {
    cost: 2,
  },
} as const satisfies Record<MeritName, MeritsAndFlawsData>;

export const flaws = {
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
  /** Кошмар */
  nightmare: {
    cost: -1,
  },
} as const satisfies Record<FlawName, MeritsAndFlawsData>;
