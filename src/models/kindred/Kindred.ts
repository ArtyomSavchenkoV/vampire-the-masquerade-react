import { disciplines } from "data/disciplines";
import { AbilityLevel, AbilityName } from "../Abilities";
import { ActiveEffect } from "../ActiveEffect";
import { AttributeLevel, AttributeName } from "../Attributes";
import { BackgroundName, BackgroundLevel } from "../Backgrounds";
import { Clan } from "../Clan";
import { MentalStability, MentalStabilityLevel } from "../MentalStability";
import { MeritsAndFlawsData, MeritsAndFlawsName } from "../MeritsAndFlaws";
import { Modifiers, mergeModifiers } from "../Modifiers";
import { meritsAndFlaws } from "data/meritsAndFlaws";
import { EquipmentItem } from "../EquipmentItem";
import { getKinderedHealthLevel } from "./Health";
import { HealthDamages } from "models/Health";
import { ResourcesHistory } from "./ResourcesHistory";

/**
 * Базовая модель сородича
 */
export interface Kindred {
  /** Имя персонажа */
  name: string;
  /** Игрок */
  player: string;
  /** Хроника/кампания */
  chronicle: string;
  /** Натура (то, кем персонаж является на самом деле) */
  nature: string; // например: "Диктатор", "Мечтатель", "Опекун"
  /** Маска (то, каким он хочет казаться) */
  demeanor: string; // например: "Душка", "Холодный профессионал", "Клоун"
  /** Амплуа (социальная роль в секте/городе) */
  role: string; // например: "Осведомитель", "Телохранитель", "Дипломат", "Ищейка"
  /** Клан */
  clan: Clan;
  /** Поколение (чем меньше — тем сильнее) */
  generation: number;
  /** Сир (имя сира или null, если не известен) */
  sire: string | null;
  /** Характеристики */
  attributes: Record<AttributeName, AttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, AbilityLevel>;
  /** Факты биографии */
  backgrounds: Partial<Record<BackgroundName, BackgroundLevel>>;
  /** Ментальные устойчивости */
  mentalStability: Record<MentalStability, MentalStabilityLevel>;
  /** Достоинства и недостатки */
  meritsAndFlaws: MeritsAndFlawsName[];
  /** Человечность (Humanity) ИЛИ Путь (Path rating) — зависит от морали */
  humanityOrPathRating: number;
  /** Воля (Willpower) — текущий запас кубиков воли */
  willpower: number;
  /** Максимальный запас воли (для UI) */
  maxWillpower: number;
  /** Запас крови (Blood Pool) — сколько пунктов крови сейчас. maxBloodPool - значение вычисляемое из поколения */
  bloodPool: number;
  /** Повреждения, 8-ое повреждение - смерть если повреждение "aggravated" иначе отключка */
  bodyDamages: HealthDamages;
  /** Экипировка */
  equipment: EquipmentItem[];
  /** Активные эффекты (бафф/дебафф, состояние и пр.) */
  activeEffects: ActiveEffect[];
  /** История изменений ресурсов (кровь, здоровье и пр.) */
  resourcesHistory: ResourcesHistory;
}

/**
 * Собирает все модификаторы для персонажа: клан, активные эффекты,
 * достоинства/недостатки, пассивные эффекты дисциплин.
 *
 * Возвращает единый объект Modifiers, который можно сразу применять
 * к базовым статам.
 */
export const aggregateCharacterModifiers = (character: Kindred): Modifiers => {
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
