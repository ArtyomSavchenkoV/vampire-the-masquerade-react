import { disciplines } from "data/disciplines";
import { meritsAndFlaws } from "data/meritsAndFlaws";
import { AbilityName, ModifiedAbilityLevel } from "domain/Abilities";
import { AttributeName, ModifiedAttributeLevel } from "domain/Attributes";
import { MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { Modifiers, mergeModifiers, applyModifiers } from "domain/Modifiers";
import { calculateGeneration, getGenerationLevel } from "./Generation";
import { getKinderedHealthLevel } from "./Health";
import { Kindred } from "./Kindred";
import { calculateChangebleParams } from "./ResourcesHistory";

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

  // Достоинства и недостатки
  for (const meritOrFlaw of character.meritsAndFlaws) {
    const data: MeritsAndFlawsData = meritsAndFlaws[meritOrFlaw];
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
  const { disciplines: charDisciplines } = character.clan;

  // Приводим ключи к строгому типу
  const disciplineKeys = Object.keys(charDisciplines) as Array<
    keyof typeof charDisciplines
  >;

  for (const disciplineName of disciplineKeys) {
    const level = charDisciplines[disciplineName];
    if (!level) continue;

    const disciplineLevels = disciplines[disciplineName];
    if (!disciplineLevels) continue;

    // Уровень в V20 обычно 1–5, поэтому индекс level - 1
    const levelData = disciplineLevels[level - 1];
    if (!levelData) continue;
    const variants = Array.isArray(levelData) ? levelData : [levelData];

    for (const variant of variants) {
      if (variant.type === "passive" && variant.effects) {
        result = mergeModifiers(result, variant.effects);
      }
    }
  }

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
