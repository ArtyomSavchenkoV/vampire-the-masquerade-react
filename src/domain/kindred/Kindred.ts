import { BaseAbilityLevel, AbilityName } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { BaseAttributeLevel, AttributeName } from "domain/Attributes";
import { BackgroundName, BackgroundLevel } from "domain/Backgrounds";
import { Clan } from "domain/Clan";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { FlawName, MeritName } from "domain/MeritsAndFlaws";
import { EquipmentItem } from "domain/EquipmentItem";
import { HealthDamages } from "domain/Health";
import { ResourcesHistory } from "./ResourcesHistory";
import { HumanityOrPathRating } from "domain/HumanityOrPathRating";
import { DisciplineName, DisciplineLevel } from "domain/Discipline";

/**
 * Базовая модель сородича
 */
export interface Kindred {
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
  /** Клан */
  clan: Clan;
  /** Поколение (чем меньше — тем сильнее) */
  generation: number;
  /** Сир (имя сира или null, если не известен) */
  sire: string | null;
  /** Характеристики */
  attributes: Record<AttributeName, BaseAttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, BaseAbilityLevel>;
  /** Обретённые дисциплины */
  acquiredDisciplines: Partial<Record<DisciplineName, DisciplineLevel>>;
  /** Факты биографии */
  backgrounds: Partial<Record<BackgroundName, BackgroundLevel>>;
  /** Ментальные устойчивости */
  mentalStability: Record<MentalStability, MentalStabilityLevel>;
  /** Достоинства */
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
