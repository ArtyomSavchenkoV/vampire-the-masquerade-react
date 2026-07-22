import { AbilityLevel, AbilityName } from "./Abilities";
import { AttributeLevel, AttributeName } from "./Attributes";
import { Clan } from "./Clan";
import { MentalStability, MentalStabilityLevel } from "./MentalStability";

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

  /** Характеристики (Attributes) */
  attributes: Record<AttributeName, AttributeLevel>;

  /** Способности (Abilities) */
  abilities: Record<AbilityName, AbilityLevel>;

  // TODO: проработать
  /** Факты биографии (ключевые события, связи, долги) */
  backgrounds: string[];

  /** Ментальные устойчивости */
  mentalStability: Record<MentalStability, MentalStabilityLevel>;

  // TODO: проработать
  /** Достоинства и недостатки (Merits & Flaws) */
  meritsAndFlaws: string[]; // можно позже разбить на два массива

  /** Человечность (Humanity) ИЛИ Путь (Path rating) — зависит от морали */
  humanityOrPathRating: number;

  /** Воля (Willpower) — текущий запас кубиков воли */
  willpower: number;
  /** Максимальный запас воли (для UI) */
  maxWillpower: number;

  /** Запас крови (Blood Pool) — сколько пунктов крови сейчас. maxBloodPool - значение вычисляемое из поколения */
  bloodPool: number;

  /** Уровень здоровья (7 - полностью здоров ... 0 - При смерти) */
  health: number;
}
