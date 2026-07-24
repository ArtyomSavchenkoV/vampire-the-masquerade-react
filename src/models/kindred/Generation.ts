import { kindredGenerations } from "data/kindredGenerations";
import { Kindred } from "./Kindred";

/**
 * Уровни поколения по правилам V20.
 */
export interface GenerationLevel {
  /** Максимальный запас крови (blood pool) для сородича данного поколения. */
  maxBloodPool: number;
  /** Максимальный уровень дисциплин, доступный сородичу. */
  maxDisciplineLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** Лимит потребления крови за ход. */
  bloodConsumptionLimitPerTurn: number;
}

/**
 * Получить данные о поколении сородича.
 */
export const getGenerationLevel = (generation: number) =>
  kindredGenerations[generation - 1];

/**
 * Вычислить реальное поколение сородича
 */
export const calculateGeneration = (
  kindredData: Pick<Kindred, "generation" | "backgrounds">,
) => kindredData.generation - (kindredData.backgrounds.generation ?? 0);
