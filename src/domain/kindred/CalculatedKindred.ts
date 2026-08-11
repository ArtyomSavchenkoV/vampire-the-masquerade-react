import { merits, flaws } from "data/meritsAndFlaws";
import { AbilityName, ModifiedAbilityLevel } from "domain/Abilities";
import { AttributeName, ModifiedAttributeLevel } from "domain/Attributes";
import { MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { Modifiers, mergeModifiers, applyModifiers } from "domain/Modifiers";
import { calculateGeneration, getGenerationLevel } from "./Generation";
import { getKinderedHealthLevel } from "./Health";
import { Kindred } from "./Kindred";
import { calculateChangebleParams } from "./ResourcesHistory";
import { getDisciplinesEffects } from "domain/Discipline";

/**
 * Вычисленная модель сородича
 */
export type CalculatedKindred = Omit<Kindred, "attributes" | "abilities"> & {
  attributes: Record<AttributeName, ModifiedAttributeLevel>;
  abilities: Record<AbilityName, ModifiedAbilityLevel>;
} & Pick<Modifiers, "absorptionDice" | "commonDiceBonus">;

/**
 * Собирает все модификаторы для персонажа: клан, активные эффекты,
 * достоинства/недостатки, пассивные эффекты дисциплин.
 *
 * Возвращает единый объект Modifiers, который можно сразу применять
 * к базовым статам.
 */
export const aggregateModifiers = (character: CalculatedKindred): Modifiers => {
  let result: Modifiers = {};

  // Модификаторы от клана
  if (character.clan.modifiers) {
    result = mergeModifiers(result, character.clan.modifiers);
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
  const healthLevelModifiers = getKinderedHealthLevel(
    character.bodyDamages,
  ).modifiers;
  if (healthLevelModifiers) {
    result = mergeModifiers(result, healthLevelModifiers);
  }

  // Пассивные эффекты от дисциплин
  result = mergeModifiers(
    result,
    getDisciplinesEffects(character.clan.disciplines),
  );

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
export const calculateKindred = (kindred: Kindred): CalculatedKindred => {
  // 1. Начинаем строить вычисленную модель. Сразу делаем копию, чтобы не мутировать оригинал.
  const calculated: CalculatedKindred = { ...kindred };

  // 2. Уточнение поколения
  calculated.generation = calculateGeneration(calculated);
  const generationLevel = getGenerationLevel(calculated.generation);

  // 3. Применение изменений ресурсов из историй
  const changebleParams = calculateChangebleParams(calculated, {
    maxBloodPool: generationLevel.maxBloodPool,
  });
  Object.assign(calculated, changebleParams);

  // 4. Собираем и применяем модификаторы
  const modifiers = aggregateModifiers(calculated);
  const changedParameters = applyModifiers({ data: calculated, modifiers });

  // 5. Объединяем результаты. Используем spread, чтобы не менять объекты attributes/abilities напрямую.
  return {
    ...calculated,
    attributes: { ...calculated.attributes, ...changedParameters.attributes },
    abilities: { ...calculated.abilities, ...changedParameters.abilities },
    absorptionDice: modifiers.absorptionDice,
    commonDiceBonus: modifiers.commonDiceBonus,
  };
};
