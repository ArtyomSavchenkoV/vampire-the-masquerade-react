import { AbilityName, BaseAbilityLevel } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { AttributeName, BaseAttributeLevel } from "domain/Attributes";
import { BackgroundName, BackgroundLevel } from "domain/Backgrounds";
import { EquipmentItem } from "domain/EquipmentItem";
import { HealthDamages } from "domain/Health";
import { HumanityOrPathRating } from "domain/HumanityOrPathRating";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { MeritName, FlawName } from "domain/MeritsAndFlaws";
import { ResourcesHistory } from "./ResourcesHistory";
import { DisciplineName, DisciplineLevel } from "domain/Discipline";
import { UnitTypeFeatures } from "domain/UnitTypeFeatures";

/**
 * Базовая модель гуля
 */
export interface Ghoul {
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
  /** Домитор (имя домитора или null, если нет определённого домитора) */
  domitor: string | null;
  /** Особенности этого типа существ */
  unitTypeFeatures: UnitTypeFeatures;
  /** Характеристики */
  attributes: Record<AttributeName, BaseAttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, BaseAbilityLevel>;
  /** Дисциплины */
  disciplines: Record<"potence", DisciplineLevel>;
  /** Обретённые дисциплины */
  acquiredDisciplines: Partial<
    Record<Exclude<DisciplineName, "potence">, DisciplineLevel>
  >;
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
  /** Максимальный запас крови */
  maxBloodPool: number;
  /** Повреждения, 8-ое повреждение - смерть если повреждение "aggravated" иначе отключка */
  bodyDamages: HealthDamages;
  /** Экипировка */
  equipment: EquipmentItem[];
  /** Активные эффекты (бафф/дебафф, состояние и пр.) */
  activeEffects: ActiveEffect[];
  /** История изменений ресурсов (кровь, здоровье и пр.) */
  resourcesHistory: ResourcesHistory;
}
