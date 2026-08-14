import { merits, flaws } from "data/meritsAndFlaws";
import { AbilityName, ModifiedAbilityLevel } from "domain/Abilities";
import { AttributeName, ModifiedAttributeLevel } from "domain/Attributes";
import { MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { Modifiers, mergeModifiers, applyModifiers } from "domain/Modifiers";
import { getGhoulHealthLevel } from "./Health";
import { Ghoul } from "./Ghoul";
import { calculateChangebleParams } from "./ResourcesHistory";
import { getDisciplinesEffects } from "domain/Discipline";

/**
 * Вычисленная модель сородича
 */
export type CalculatedGhoul = Omit<Ghoul, "attributes" | "abilities"> & {
  attributes: Record<AttributeName, ModifiedAttributeLevel>;
  abilities: Record<AbilityName, ModifiedAbilityLevel>;
} & Pick<Modifiers, "absorptionDice" | "commonDiceBonus" | "damageMultipliers">;

/**
 * Собирает все модификаторы для персонажа: активные эффекты,
 * достоинства/недостатки, пассивные эффекты дисциплин.
 *
 * Возвращает единый объект Modifiers, который можно сразу применять
 * к базовым статам.
 */
export const aggregateModifiers = (character: CalculatedGhoul): Modifiers => {
  let result: Modifiers = {};

  // Модификаторы от типа юнита
  if (character.unitTypeFeatures.modifiers) {
    result = mergeModifiers(result, character.unitTypeFeatures.modifiers);
  }

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

  // Достоинства
  for (const merit of character.merits) {
    const data: MeritsAndFlawsData = merits[merit];
    if (!data) continue;
    if (data.effects) {
      result = mergeModifiers(result, data.effects);
    }
  }

  // Недостатки
  for (const flaw of character.flaws) {
    const data: MeritsAndFlawsData = flaws[flaw];
    if (!data) continue;
    if (data.effects) {
      result = mergeModifiers(result, data.effects);
    }
  }

  // Эффекты от здоровья
  const healthLevelModifiers = getGhoulHealthLevel(
    character.bodyDamages,
  ).modifiers;
  if (healthLevelModifiers) {
    result = mergeModifiers(result, healthLevelModifiers);
  }

  // Пассивные эффекты от дисциплин
  result = mergeModifiers(result, getDisciplinesEffects(character.disciplines));

  // Пассивные эффекты от приобретённых дисциплин
  result = mergeModifiers(
    result,
    getDisciplinesEffects(character.acquiredDisciplines),
  );

  return result;
};

/**
 * Вычисляет все текущие показатели
 */
export const calculateGhoul = (character: Ghoul): CalculatedGhoul => {
  // Начинаем строить вычисленную модель. Сразу делаем копию, чтобы не мутировать оригинал.
  const calculated: CalculatedGhoul = { ...character };

  // Применение изменений ресурсов из историй
  const changebleParams = calculateChangebleParams(calculated);
  Object.assign(calculated, changebleParams);

  // Собираем и применяем модификаторы
  const modifiers = aggregateModifiers(calculated);
  const changedParameters = applyModifiers({ data: calculated, modifiers });

  // Объединяем результаты. Используем spread, чтобы не менять объекты attributes/abilities напрямую.
  return {
    ...calculated,
    attributes: { ...calculated.attributes, ...changedParameters.attributes },
    abilities: { ...calculated.abilities, ...changedParameters.abilities },
    absorptionDice: modifiers.absorptionDice,
    damageMultipliers: modifiers.damageMultipliers,
    commonDiceBonus: modifiers.commonDiceBonus,
  };
};
