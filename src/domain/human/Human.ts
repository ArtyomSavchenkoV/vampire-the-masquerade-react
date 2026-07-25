import { meritsAndFlaws } from "data/meritsAndFlaws";
import { AbilityName, AbilityLevel } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { AttributeName, AttributeLevel } from "domain/Attributes";
import { BackgroundName, BackgroundLevel } from "domain/Backgrounds";
import { EquipmentItem } from "domain/EquipmentItem";
import { getHealthLevel, HealthDamages } from "domain/Health";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { MeritsAndFlawsName, MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { Modifiers, mergeModifiers } from "domain/Modifiers";
import { ResourcesHistory } from "./ResourcesHistory";
import { humanHealthLevels } from "data/humanHealthLevels";
import { unimpaired } from "data/kindredHealthLevels";

/**
 * Базовая модель челолвека
 */
export interface Human {
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
export const aggregateModifiers = (character: Human): Modifiers => {
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

  // Достоинства и недостатки
  for (const meritOrFlaw of character.meritsAndFlaws) {
    const data: MeritsAndFlawsData = meritsAndFlaws[meritOrFlaw];
    if (!data) continue;
    if (data.effects) {
      result = mergeModifiers(result, data.effects);
    }
  }

  // Эффекты от здоровья
  const healthLevelModifiers = getHealthLevel({
    healthLevels: humanHealthLevels,
    unimpaired: unimpaired,
  })(character.bodyDamages).modifiers;
  if (healthLevelModifiers) {
    result = mergeModifiers(result, healthLevelModifiers);
  }

  return result;
};
