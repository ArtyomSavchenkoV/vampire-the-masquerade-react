import { AbilityName, BaseAbilityLevel } from "domain/Abilities";
import { ActiveEffect } from "domain/ActiveEffect";
import { AttributeName, BaseAttributeLevel } from "domain/Attributes";
import { EquipmentItem } from "domain/EquipmentItem";
import { HealthDamages, HealthLevelData } from "domain/Health";
import { MentalStability, MentalStabilityLevel } from "domain/MentalStability";
import { ResourcesHistory } from "./ResourcesHistory";

/**
 * Базовая модель существа (Собака, крыса, медведь и пр.)
 */
export interface Creature {
  /** Имя персонажа */
  name: string;
  /** Игрок */
  player: string;
  /** Характеристики */
  attributes: Record<AttributeName, BaseAttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, BaseAbilityLevel>;
  /** Ментальные устойчивости */
  mentalStability: Record<MentalStability, MentalStabilityLevel>;
  /** Воля (Willpower) — текущий запас кубиков воли */
  willpower: number;
  /** Максимальный запас воли (для UI) */
  maxWillpower: number;
  /** Повреждения */
  bodyDamages: HealthDamages;
  /** Уровни здоровья */
  healthLevels: HealthLevelData[];
  /** Экипировка */
  equipment: EquipmentItem[];
  /** Активные эффекты (бафф/дебафф, состояние и пр.) */
  activeEffects: ActiveEffect[];
  /** История изменений ресурсов (кровь, здоровье и пр.) */
  resourcesHistory: ResourcesHistory;
}
