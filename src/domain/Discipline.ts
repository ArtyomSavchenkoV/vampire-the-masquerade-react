import { disciplines } from "data/disciplines";
import { DictionaryTranslatePaths } from "dictionaries/types";
import { DecrementUnionNumbers } from "utils/types/DecrementUnionNumbers";
import { AbilityName, isAbilityName } from "./Abilities";
import { AttributeName, isAttributeName } from "./Attributes";
import { isMentalStability, MentalStability } from "./MentalStability";
import { mergeModifiers, Modifiers } from "./Modifiers";

/**
 * Названия дисциплин (V20).
 * Каждый вариант снабжён комментарием с кратким описанием механики.
 * Закомментированные дисциплины — планируемые к добавлению.
 */
export const disciplineNames = [
  /** Анимализм — связь с животными, звериные инстинкты и формы */
  "animalism",
  /** Величие — социальное влияние, харизма, внушение благоговения */
  "presence",
  /** Доминирование — прямой контроль над разумом и приказами */
  "dominate",
  /** Затмение — манипуляции тьмой и тенями */
  "obtenebration",
  /** Метаморфозы — изменение собственной плоти (когти, шипы, маскировка) */
  "protean",
  /** Мощь — сверхъестественная физическая сила */
  "potence",
  /** Помешательство — вызов безумия, искажение восприятия, психические атаки */
  "dementation",
  /** Ясновидение — обнаружение эмоций, скрытых намерений, сверхъестественных следов */
  "auspex",
  /** Сокрытие — скрытность, невидимость, искажение восприятия наблюдателя */
  "obfuscate",
  /** Стремительность — сверхчеловеческая скорость и реакция */
  "celerity",
  /** Стойкость — защита, сопротивление урону и негативным эффектам */
  "fortitude",

  // TODO: Добавить в базу данных
  // /** Фантасмагория — создание иллюзий и галлюцинаций */
  // "chimerstry",
  // /** Некромантия — взаимодействие с мёртвыми, духами и энергией смерти */
  // "necromancy",
  // /** Упокоение — техники контроля и устранения противников скрытно */
  // "quietus",
  // /** Серпентис — змеиные и рептильные способности, трансформация в змееподобную форму */
  // "serpentis",
  // /** Тауматургия — ритуальная магия крови, заклинания через кровь */
  // "thaumaturgy",
  // /** Преображение — радикальная трансформация тела, крайняя форма изменения плоти */
  // "vicissitude",
] as const;
export type DisciplineName = ArrayElement<typeof disciplineNames>;

/**
 * Уровень дисциплины в V20: от 1 до 5.
 * В механике V20 каждая дисциплина имеет до 5 рангов, где каждый ранг открывает новые эффекты.
 */
export const disciplineLevels = [1, 2, 3, 4, 5] as const;

export type DisciplineLevel = ArrayElement<typeof disciplineLevels>;

/**
 * Целевые характеристики для проверок (атрибуты, способности, ментальные параметры).
 * Включает специальные значения: humanityOrPathRating (путь морали) и willpower (сила воли).
 */
type CheckRuleTarget =
  | AttributeName
  | AbilityName
  | MentalStability
  | "humanityOrPathRating"
  | "willpower";

export const getCheckRuleTargetTranslationKey = (
  checkRuleTarget: CheckRuleTarget,
): DictionaryTranslatePaths => {
  if (isAttributeName(checkRuleTarget)) {
    return `attributes.${checkRuleTarget}`;
  }
  if (isAbilityName(checkRuleTarget)) {
    return `abilities.${checkRuleTarget}`;
  }
  if (isMentalStability(checkRuleTarget)) {
    return `mentalStability.${checkRuleTarget}`;
  }
  if (checkRuleTarget === "humanityOrPathRating") {
    return "fields.humanityOrPathRating";
  }
  if (checkRuleTarget === "willpower") {
    return "fields.willpower";
  }
  return checkRuleTarget satisfies never;
};

/**
 * Правила проверки для способностей дисциплины.
 * Три взаимоисключающих типа проверок (дискриминантное объединение):
 * - plot: сложность определяет мастер (часто с пояснением в difficultDescription).
 * - fixedDifficulty: фиксированная сложность (число).
 * - opposedCheck: встречная проверка против характеристик цели.
 */
type CheckRule =
  | {
      /** Тип проверки: сложность определяет мастер. */
      type: "plot";
      /** Характеристики, которые персонаж использует для проверки. */
      selfCheck: readonly CheckRuleTarget[];
    }
  | {
      /** Тип проверки: фиксированная сложность. */
      type: "fixedDifficulty";
      /** Характеристики, которые персонаж использует для проверки. */
      selfCheck: readonly CheckRuleTarget[];
      /** Числовое значение сложности проверки. */
      difficultLevel: number;
    }
  | {
      /** Тип проверки: встречная (против характеристик цели). */
      type: "opposedCheck";
      /** Характеристики, которые персонаж использует для проверки. */
      selfCheck: readonly CheckRuleTarget[];
      /** Характеристики цели, против которых идёт проверка. */
      difficultTarget: readonly CheckRuleTarget[];
    };

/**
 * Данные об эффекте конкретного уровня дисциплины.
 * Два типа эффектов: пассивный (всегда активен) и используемый (требует активации).
 */
export type DisciplineLevelData =
  | {
      /** Тип эффекта: пассивный. */
      type: "passive";
      /** Эффекты, применяемые автоматически (бонусы, поглощение и т.д.). */
      effects?: Modifiers;
    }
  | {
      /** Тип эффекта: используемый (активная способность). */
      type: "usable";
      /** Допустимые цели применения способности: на себя или на других. */
      availableTarget: readonly ("self" | "notSelf")[];
      /** Стоимость активации: в очках силы воли или крови. */
      cost?: Partial<Record<"willpower" | "bloodPool", number>>;
      /** Правило проверки, необходимое для применения способности. */
      check?: CheckRule;
      /** Эффекты, которые применяются при успешном использовании способности. */
      effects?: Modifiers;
      /** Длительность эффекта: в раундах, сцене или количестве успехов. */
      duration?: number | "scene" | "successCount";
      /** Время, необходимое на активацию способности (в раундах). */
      castDuration?: number;
    };

/**
 * Варианты данных для уровня дисциплины.
 * Может быть одиночным эффектом либо массивом альтернативных эффектов (например, выбор ветки на 4‑м уровне).
 */
export type DisciplineLevelVariants = Record<string, DisciplineLevelData>;

export type Discipline<Name extends DisciplineName> =
  (typeof disciplines)[Name];

/**
 * Выбирает и складывает модификаторы пассивных дисциплин
 */
export const getDisciplinesEffects = (
  charDisciplines: Partial<Record<DisciplineName, DisciplineLevel>>,
): Modifiers => {
  let result: Modifiers = {};

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

    for (const variant of Object.values(levelData)) {
      if (variant.type === "passive" && variant.effects) {
        result = mergeModifiers(result, variant.effects);
      }
    }
  }

  return result;
};

/** Какой формы должен быть блок translations.disciplines в словаре. */
export type DisciplineTranslations = {
  [N in DisciplineName]: {
    name: string;
    levels: {
      [L in DisciplineLevel]: {
        name: string;
        variants: {
          [V in keyof Discipline<N>[DecrementUnionNumbers<L>] & string]: {
            name: string;
            description: string;
          };
        };
      };
    };
  };
};
