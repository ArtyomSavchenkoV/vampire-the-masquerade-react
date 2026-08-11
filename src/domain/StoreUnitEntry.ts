import { UnitType } from "./UnitType";

/**
 * Модель метаданных участника
 */
export type StoreUnitEntry<Type extends UnitType, Unit extends Object> = {
  /**
   * Тип участника
   */
  type: Type;

  /**
   * Модель данных участника
   */
  unit: Unit;

  /**
   * Заметки
   */
  notes: string;
};
