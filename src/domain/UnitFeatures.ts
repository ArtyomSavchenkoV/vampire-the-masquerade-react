import { WoundType } from "./Wound";
import { Modifiers } from "./Modifiers";
import { DamageToWoundMap } from "./DamageToWoundMap";

/**
 * Особенности существа
 */
export interface UnitFeatures {
  /** Мапа типов урона к типам ран */
  damageToWoundMap: DamageToWoundMap;
  /** Модификаторы */
  modifiers?: Modifiers;
  /** Выполняется ли от выносливости проверка на снижение урона */
  staminaChecks?: Partial<Record<WoundType, boolean>>;
}
