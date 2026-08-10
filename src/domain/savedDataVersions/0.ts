type DisciplineName =
  | "animalism"
  | "presence"
  | "dominate"
  | "obtenebration"
  | "protean"
  | "potence"
  | "dementation"
  | "auspex"
  | "obfuscate"
  | "celerity"
  | "fortitude";
type DisciplineLevel = 1 | 2 | 3 | 4 | 5;

type AttributeName =
  | "strength"
  | "dexterity"
  | "stamina"
  | "charisma"
  | "manipulation"
  | "appearance"
  | "perception"
  | "intelligence"
  | "wits";
type BaseAttributeLevel = 1 | 2 | 3 | 4 | 5;

type AbilityName =
  | "athletics"
  | "alertness"
  | "brawl"
  | "intimidation"
  | "expression"
  | "leadership"
  | "streetwise"
  | "subterfuge"
  | "awareness"
  | "empathy"
  | "drive"
  | "larceny"
  | "survival"
  | "performance"
  | "animal_ken"
  | "crafts"
  | "stealth"
  | "firearms"
  | "melee"
  | "etiquette"
  | "academics"
  | "science"
  | "law"
  | "computer"
  | "medicine"
  | "occult"
  | "politics"
  | "investigation"
  | "finance"
  | "electronics";
type BaseAbilityLevel = 0 | 1 | 2 | 3 | 4 | 5;

type BackgroundName = "contacts" | "allies" | "generation" | "resources";
type BackgroundLevel = 1 | 2 | 3 | 4 | 5;

type MentalStability = "morality" | "selfControl" | "courage";
type MentalStabilityLevel = 1 | 2 | 3 | 4 | 5;

type MeritName =
  | "charmOfTheTongue"
  | "familiarFace"
  | "introspection"
  | "polyglot"
  | "oracle"
  | "healthyAppearance"
  | "coldLogic"
  | "eideticMemory";
type FlawName = "outsider" | "fastidious" | "potentialRecruit" | "nightmare";

type HumanityOrPathRating = 0 | 1 | 2 | 3 | 4 | 5 | 8 | 6 | 7 | 9 | 10;

type DamageType = "bashing" | "lethal" | "aggravated";
type HealthDamages = DamageType[];

interface Modifiers {
  attributesModifiers?: Partial<Record<AttributeName, number>>;
  attributesMaxLimit?: Partial<Record<AttributeName, number>>;
  abilityModifiers?: Partial<Record<AbilityName, number>>;
  absorptionDice?: Partial<Record<DamageType, number>>;
  commonDiceBonus?: number;
  attributeMultipliers?: Partial<Record<AttributeName, number>>;
}

interface EquipmentItem {
  modifiers?: Modifiers;
}

export interface ActiveEffect {
  id: string;
  name: string;
  type: "buff" | "debuff";
  modifiers?: Modifiers;
  duration?: number | "scene";
  source: "clan" | "merit" | "item" | "spell" | "environment";
}

interface HealEvent {
  type: "heal";
  damageType: DamageType;
  value: number;
}

export interface DamageEvent {
  type: "damage";
  damageType: DamageType;
  value: number;
}

type AwakeningEvent = {
  type: "torpor";
};

type HealthLevelName =
  | "unimpaired"
  | "battered"
  | "lightlyWounded"
  | "wounded"
  | "seriouslyWounded"
  | "heavilyWounded"
  | "nearlyDown"
  | "incapacitated"
  | "final";
type HealthLevelData =
  | {
      name: Exclude<HealthLevelName, "final" | "incapacitated">;
      /** Небоеспособен */
      isIncapacitated: boolean;
      modifiers?: Modifiers;
    }
  | {
      name: "incapacitated";
      isIncapacitated: true;
      cutExcessDamage: true;
      modifiers?: Modifiers;
    }
  | {
      name: "final";
      isIncapacitated: true;
      variant: "death" | "torpor";
      modifiers?: Modifiers;
    };

type ResourceHistory<T> = {
  date: number;
  effect: T;
  description: string;
};

type ClanName =
  | "Gangrel"
  | "Brujah"
  | "Malkavian"
  | "Nosferatu"
  | "Toreador"
  | "Ventrue"
  | "Lasombra"
  | "Other";

interface Clan {
  clanName: ClanName;
  disciplines: Partial<Record<DisciplineName, DisciplineLevel>>;
  modifiers?: Modifiers;
}

export type Kindred = {
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
  resourcesHistory: {
    willpower: ResourceHistory<Kindred["willpower"]>[];
    bloodPool: ResourceHistory<Kindred["bloodPool"]>[];
    health: ResourceHistory<AwakeningEvent | HealEvent | DamageEvent>[];
  };
};

export type Ghoul = {
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
  /** Характеристики */
  attributes: Record<AttributeName, BaseAttributeLevel>;
  /** Способности */
  abilities: Record<AbilityName, BaseAbilityLevel>;
  /** Дисциплины */
  disciplines: Partial<Record<DisciplineName, DisciplineLevel>>;
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
  resourcesHistory: {
    willpower: ResourceHistory<Ghoul["willpower"]>[];
    bloodPool: ResourceHistory<Ghoul["bloodPool"]>[];
    health: ResourceHistory<HealEvent | DamageEvent>[];
  };
};

export type Human = {
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
  /** Повреждения */
  bodyDamages: HealthDamages;
  /** Уровни здоровья */
  healthLevels: HealthLevelData[];
  /** Экипировка */
  equipment: EquipmentItem[];
  /** Активные эффекты (бафф/дебафф, состояние и пр.) */
  activeEffects: ActiveEffect[];
  /** История изменений ресурсов (кровь, здоровье и пр.) */
  resourcesHistory: {
    willpower: ResourceHistory<Human["willpower"]>[];
    health: ResourceHistory<HealEvent | DamageEvent>[];
  };
};

export type Creature = {
  /** Имя персонажа */
  name: string;
  /** Игрок */
  player: string | null;
  /** Характеристики */
  attributes: Partial<Record<AttributeName, BaseAttributeLevel>>;
  /** Способности */
  abilities: Partial<Record<AbilityName, BaseAbilityLevel>>;
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
  resourcesHistory: {
    willpower: ResourceHistory<Creature["willpower"]>[];
    health: ResourceHistory<HealEvent | DamageEvent>[];
  };
};

export type SavedData = Record<
  string,
  | { type: "kindred"; unit: Kindred }
  | { type: "ghoul"; unit: Ghoul }
  | { type: "human"; unit: Human }
  | { type: "creature"; unit: Creature }
>;
