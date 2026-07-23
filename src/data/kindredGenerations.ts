import { GenerationLevel } from "models/Kindred";

export const kindredGenerations = [
  /** Не встречаются (данные от балды) */
  {
    maxBloodPool: 100,
    maxDisciplineLevel: 10,
    bloodConsumptionLimitPerTurn: 20,
  },
  /** Не встречаются (данные от балды) */
  {
    maxBloodPool: 100,
    maxDisciplineLevel: 10,
    bloodConsumptionLimitPerTurn: 20,
  },
  /** 3 - мифологическое (данные от балды) */
  {
    maxBloodPool: 100,
    maxDisciplineLevel: 10,
    bloodConsumptionLimitPerTurn: 20,
  },
  /** 4 */
  {
    maxBloodPool: 50,
    maxDisciplineLevel: 9,
    bloodConsumptionLimitPerTurn: 10,
  },
  /** 5 */
  {
    maxBloodPool: 40,
    maxDisciplineLevel: 8,
    bloodConsumptionLimitPerTurn: 8,
  },
  /** 6 */
  {
    maxBloodPool: 30,
    maxDisciplineLevel: 7,
    bloodConsumptionLimitPerTurn: 6,
  },
  /** 7 */
  {
    maxBloodPool: 20,
    maxDisciplineLevel: 6,
    bloodConsumptionLimitPerTurn: 4,
  },
  /** 8 */
  {
    maxBloodPool: 15,
    maxDisciplineLevel: 5,
    bloodConsumptionLimitPerTurn: 3,
  },
  /** 9 */
  {
    maxBloodPool: 14,
    maxDisciplineLevel: 5,
    bloodConsumptionLimitPerTurn: 2,
  },
  /** 10 */
  {
    maxBloodPool: 13,
    maxDisciplineLevel: 5,
    bloodConsumptionLimitPerTurn: 1,
  },
  /** 11 */
  {
    maxBloodPool: 12,
    maxDisciplineLevel: 5,
    bloodConsumptionLimitPerTurn: 1,
  },
  /** 12 */
  {
    maxBloodPool: 11,
    maxDisciplineLevel: 5,
    bloodConsumptionLimitPerTurn: 1,
  },
  /** 13 */
  {
    maxBloodPool: 10,
    maxDisciplineLevel: 5,
    bloodConsumptionLimitPerTurn: 1,
  },
  /** 14 */
  {
    maxBloodPool: 10,
    maxDisciplineLevel: 3,
    bloodConsumptionLimitPerTurn: 1,
  },
] as const satisfies readonly GenerationLevel[];
