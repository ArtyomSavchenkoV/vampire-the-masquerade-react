import { AbilityName, ModifiedAbilityLevel } from "domain/Abilities";
import { AttributeName, ModifiedAttributeLevel } from "domain/Attributes";
import { getHealthLevel } from "domain/Health";
import { Modifiers, applyModifiers, mergeModifiers } from "domain/Modifiers";
import { Creature } from "./Creature";
import { calculateChangebleParams } from "./ResourcesHistory";

/**
 * Вычисленная модель существа
 */
export type CalculatedCreature = Omit<Creature, "attributes" | "abilities"> & {
  attributes: Record<AttributeName, ModifiedAttributeLevel>;
  abilities: Record<AbilityName, ModifiedAbilityLevel>;
} & Pick<Modifiers, "absorptionDice" | "commonDiceBonus">;

/**
 * Собирает все модификаторы для персонажа.
 *
 * Возвращает единый объект Modifiers, который можно сразу применять
 * к базовым статам.
 */
export const aggregateModifiers = (
  character: CalculatedCreature,
): Modifiers => {
  let result: Modifiers = {};

  // Эффекты экипировки
  for (const effect of character.equipment) {
    if (effect.modifiers) {
      result = mergeModifiers(result, effect.modifiers);
    }
  }

  // Активные эффекты
  for (const effect of character.activeEffects) {
    if (effect.modifiers) {
      result = mergeModifiers(result, effect.modifiers);
    }
  }

  // Эффекты от здоровья
  const healthLevelModifiers = getHealthLevel({
    healthLevels: [...character.healthLevels],
  })(character.bodyDamages).modifiers;
  if (healthLevelModifiers) {
    result = mergeModifiers(result, healthLevelModifiers);
  }

  return result;
};

/**
 * Вычисляет все текущие показатели
 */
export const calculateCreature = (human: Creature): CalculatedCreature => {
  // 1. Начинаем строить вычисленную модель. Сразу делаем копию, чтобы не мутировать оригинал.
  const calculated: CalculatedCreature = { ...human };

  // 2. Применение изменений ресурсов из историй
  const changebleParams = calculateChangebleParams(calculated);
  Object.assign(calculated, changebleParams);

  // 3. Собираем и применяем модификаторы
  const modifiers = aggregateModifiers(calculated);
  const changedParameters = applyModifiers({ data: calculated, modifiers });

  // 4. Объединяем результаты. Используем spread, чтобы не менять объекты attributes/abilities напрямую.
  return {
    ...calculated,
    attributes: { ...calculated.attributes, ...changedParameters.attributes },
    abilities: { ...calculated.abilities, ...changedParameters.abilities },
    absorptionDice: modifiers.absorptionDice,
    commonDiceBonus: modifiers.commonDiceBonus,
  };
};
