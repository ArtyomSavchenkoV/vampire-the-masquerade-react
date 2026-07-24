import { DamageType } from "./Damage";
import { Modifiers } from "./Modifiers";

/**
 * Данные полученного урона
 */
export type HealthDamages = DamageType[];

/**
 * Отсортировать HealthDamages по типам урона от aggravated до bashing
 */
export const sortHealthDamages = (
  healthDamages: HealthDamages,
): HealthDamages => {
  const order: Record<DamageType, number> = {
    aggravated: 0,
    lethal: 1,
    bashing: 2,
  };

  // Создаём копию, чтобы не мутировать исходный массив
  return [...healthDamages].sort((a, b) => order[a] - order[b]);
};

/**
 * Уровни здоровья по правилам V20.
 */
export type HealthLevelName =
  /** Персонаж полностью здоров. */
  | "unimpaired"
  /** Помят — Лёгкий дискомфорт, почти не мешает. */
  | "battered"
  /** Легко ранен — Заметные травмы, небольшие штрафы. */
  | "lightlyWounded"
  /** Ранен — Существенные травмы, небольшие штрафы. */
  | "wounded"
  /** Серьёзно ранен — Серьёзные травмы, ощутимые штрафы */
  | "seriouslyWounded"
  /** Тяжело ранен — Тяжёлые травмы, ощутимые штрафы */
  | "heavilyWounded"
  /** Едва жив — персонаж почти не способен двигаться. */
  | "nearlyDown"
  /** Небоеспособен. — на грани потери сознания и смерти. */
  | "incapacitated"
  /** В отключке. */
  | "torpor"
  /** Окончательная смерть. */
  | "finalDeath";

export interface HealthLevelData {
  name: HealthLevelName;
  modifiers?: Modifiers;
}

/** Полученное лечение */
export interface HealEvent {
  type: "heal";
  damageType: DamageType;
  /** Точное значение на которое должно измениться здоровье, всегда положительное значение */
  value: number;
}

/** Полученный урон */
export interface DamageEvent {
  type: "damage";
  /** Уже не принимает участие в вычислении урона, который должен получить Сородич, а нужен для того, чтобы здоровье сородича не упало ниже 1 для не "aggravated" */
  damageType: DamageType;
  /** Точное значение на которое должно измениться здоровье, всегда положительное значение, уже с учётом всех снижений урона, множителей от типа урона и пр. */
  value: number;
}
