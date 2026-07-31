import { AbilityName, BaseAbilityLevel } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { AttributeName, BaseAttributeLevel } from "domain/Attributes";
import { BackgroundName, BackgroundLevel } from "domain/Backgrounds";
import { EquipmentItem } from "domain/EquipmentItem";
import { HealthDamages } from "domain/Health";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { FlawName, MeritName } from "domain/MeritsAndFlaws";
import { ResourcesHistory } from "./ResourcesHistory";
import { HumanityOrPathRating } from "domain/HumanityOrPathRating";

/**
 * Базовая модель челолвека
 */
export interface Human {
  /** Имя персонажа */
  name: string;
  /** Игрок */
  player: string | null;
  /** Хроника/кампания */
  chronicle: string | null;
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
  merits: MeritName[];
  /** Hедостатки */
  flaws: FlawName[];
  /** Человечность (Humanity) ИЛИ Путь (Path rating) — зависит от морали */
  humanityOrPathRating: HumanityOrPathRating;
  /** Столп */
  pillar: string | null;
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
