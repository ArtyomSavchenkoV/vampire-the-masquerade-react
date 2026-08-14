import { DamageType } from "./Damage";
import { Modifiers } from "./Modifiers";

export interface UnitTypeFeatures {
  /**
   * Особенности
   */
  modifiers?: Modifiers;
  /**
   * Выполняется ли от выносливости проверка на прочность
   */
  staminaChecks?: Partial<Record<DamageType, boolean>>;
}
