import { AbilityName, BaseAbilityLevel } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { AttributeName, BaseAttributeLevel } from "domain/Attributes";
import { BackgroundName, BackgroundLevel } from "domain/Backgrounds";
import { EquipmentItem } from "domain/EquipmentItem";
import { HealthDamages } from "domain/Health";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { MeritsAndFlawsName } from "domain/MeritsAndFlaws";
import { ResourcesHistory } from "./ResourcesHistory";

/**
 * Базовая модель челолвека
 */
export interface Human {
  /** Имя персонажа */
  name: string;
  /** Игрок */
  player: string;
  /** Хроника/кампания */
  // chronicle: string;
  /** Натура (то, кем персонаж является на самом деле) */
  nature: string; // например: "Диктатор", "Мечтатель", "Опекун"
  /** Маска (то, каким он хочет казаться) */
  demeanor: string; // например: "Душка", "Холодный профессионал", "Клоун"
  /** Амплуа (социальная роль в секте/городе) */
  role: string; // например: "Осведомитель", "Телохранитель", "Дипломат", "Ищейка"
  /** Характеристики */
  attributes: Record<AttributeName, BaseAttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, BaseAbilityLevel>;
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
  /** Повреждения */
  bodyDamages: HealthDamages;
  /** Экипировка */
  equipment: EquipmentItem[];
  /** Активные эффекты (бафф/дебафф, состояние и пр.) */
  activeEffects: ActiveEffect[];
  /** История изменений ресурсов (кровь, здоровье и пр.) */
  resourcesHistory: ResourcesHistory;
}
