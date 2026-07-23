import { mergeLimitsMin } from "utils/mergeLimitsMin";
import { mergeRecordSum } from "utils/mergeRecordSum";
import { AbilityName } from "./Abilities";
import { AttributeName } from "./Attributes";
import { DamageType } from "./Damage";
import { mergeMultipliers } from "utils/mergeMultipliers";
import { filterEmptyAndZeroValues } from "utils/filterEmptyValues";

/**
 * Набор модификаторов, влияющих на характеристики персонажа.
 *
 * Используется универсально: для клановых особенностей, достоинств/недостатков,
 * временных состояний, предметов и заклинаний. Позволяет декларативно описывать
 * любые изменения статов без привязки к конкретной механике источника.
 */
export interface Modifiers {
  /**
   * Плоские бонусы к атрибутам (например, +2 к Dexterity).
   */
  attributesModifiers?: Partial<Record<AttributeName, number>>;

  /**
   * Ограничение максимального значения атрибута.
   * Если максимальное значение ниже минимального - минимальное значение должно снижиться до максимального
   * Классический пример: проклятие Носферату (appearance: 0).
   */
  attributesMaxLimit?: Partial<Record<AttributeName, number>>;

  /**
   * Плоские бонусы к способностям (например, +1 к Stealth).
   */
  abilityModifiers?: Partial<Record<AbilityName, number>>;

  /**
   * Кубики для поглощения урона по типу (механика V20 Fortitude).
   * Пример: { Bashing: 2, Lethal: 1 } — персонаж получает 2 кубика на поглощение
   * тупого урона и 1 кубик на смертельный.
   */
  absorptionDice?: Partial<Record<DamageType, number>>;

  /**
   * Общее изменение количества кубиков при всех бросках.
   * Работает как глобальный бонус/штраф к пулу кубиков.
   */
  commonDiceBonus?: number;

  /**
   * Множитель для атрибутов (например, ×1.5 к Силе).
   * Поле опционально: позволяет реализовать механики вроде «Ярость: +50% к урону»
   * без необходимости пересчитывать абсолютные значения вручную.
   */
  // TODO: пока нигде не используется
  attributeMultipliers?: Partial<Record<AttributeName, number>>;
}

export const mergeModifiers = (
  base: Modifiers,
  incoming: Modifiers,
): Modifiers => {
  const attributesModifiers = mergeRecordSum(
    base.attributesModifiers,
    incoming.attributesModifiers,
  );
  const attributesMaxLimit = mergeLimitsMin(
    base.attributesMaxLimit,
    incoming.attributesMaxLimit,
  );
  const abilityModifiers = mergeRecordSum(
    base.abilityModifiers,
    incoming.abilityModifiers,
  );
  const absorptionDice = mergeRecordSum(
    base.absorptionDice,
    incoming.absorptionDice,
  );

  const baseBonus = base.commonDiceBonus ?? 0;
  const incomingBonus = incoming.commonDiceBonus ?? 0;
  const commonDiceBonus = baseBonus + incomingBonus;

  const attributeMultipliers = mergeMultipliers(
    base.attributeMultipliers,
    incoming.attributeMultipliers,
  );

  // Создаём объект со всеми полями
  const result = {
    attributesModifiers,
    attributesMaxLimit,
    abilityModifiers,
    absorptionDice,
    commonDiceBonus,
    attributeMultipliers,
  } satisfies Record<keyof Modifiers, unknown>;

  return filterEmptyAndZeroValues(result);
};
