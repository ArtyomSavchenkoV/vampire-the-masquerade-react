import { WoundType } from "./Wound";
import { Modifiers } from "./Modifiers";

export interface UnitTypeFeatures {
  /**
   * Особенности
   */
  modifiers?: Modifiers;
  /**
   * Выполняется ли от выносливости проверка на прочность
   */
  staminaChecks?: Partial<Record<WoundType, boolean>>;
}
