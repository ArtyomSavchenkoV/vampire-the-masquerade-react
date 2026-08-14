import { Kindred } from "./Kindred";
import { disciplines } from "data/disciplines";
import { flaws, merits } from "data/meritsAndFlaws";
import { aggregateModifiers } from "./CalculatedKindred";

/**
 * Глубокое замораживание объекта и всех вложенных структур.
 * Любая попытка мутации вызовет TypeError — это лучшая страховка
 * для React/Zustand, чтобы не сломать неизменяемость.
 */
function deepFreeze(obj: any): any {
  if (obj === null || typeof obj !== "object") return obj;
  Object.freeze(obj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}

describe("src/domain/kindred-aggregateCharacterModifiers", () => {
  const baseCharacter = {
    name: "Test Nosferatu",
    unitTypeFeatures: {
      modifiers: {
        damageMultipliers: {
          bashing: 0.5,
        },
      },
    },
    clan: {
      clanName: "Nosferatu",
      // Дисциплины: уровни строго 1–5
      disciplines: {
        celerity: 2, // dexterity: 2,
        animalism: 4,
        potence: 1, // strength: 1
        fortitude: 1, // bashing: 1, lethal: 1, aggravated: 1,
      },
      // Проклятие Носферату: appearance: 0 — это исключение, оно должно перекрыть всё
      modifiers: {
        attributesMaxLimit: { appearance: 0 },
      },
    },
    acquiredDisciplines: {
      potence: 1, // strength: 1
    },
    activeEffects: [
      {
        name: "Berserk",
        modifiers: {
          attributesModifiers: { strength: 3, stamina: -1 }, // resolve — кастомный атрибут, если есть в типе
          commonDiceBonus: 2,
        },
      },
      {
        name: "Calm",
        modifiers: {
          attributesModifiers: { strength: 2 },
          abilityModifiers: { intimidation: 3 },
        },
      },
    ],
    merits: [],
    flaws: [],
    equipment: [
      {
        modifiers: {
          damageMultipliers: {
            bashing: 0.5,
          },
        },
      },
    ],
    bodyDamages: ["bashing", "bashing", "bashing"],
  } as unknown as Kindred;

  beforeEach(() => {
    // Замораживаем всё, что функция читает: character, disciplines, meritsAndFlaws
    deepFreeze(baseCharacter);
    deepFreeze(disciplines);
    deepFreeze(merits);
    deepFreeze(flaws);
  });

  it("возвращает корректные суммарные модификаторы (атрибуты, способности, лимиты, кубики)", () => {
    const result = aggregateModifiers(baseCharacter);

    /*
    Расчёт по фикстуре:
      - dexterity: 2 (celerity: 2) = 2
      - strength: 1 (potence: 1) + 3 (Berserk) + 2 (Calm) + 1(acquiredDisciplines) = 7
      - stamina: -1 (Berserk) = -1
      - intimidation: 3 (Calm)
      - commonDiceBonus: 2 (Berserk) + -1(health: 4) = 1
      - attributesMaxLimit.appearance: 0 (проклятие Носферату)
      - bashing: 1 (fortitude: 1) = 1
      - lethal: 1 (fortitude: 1) = 1
      - aggravated: 1 (fortitude: 1) = 1
    */

    expect(result).toEqual({
      attributesModifiers: {
        strength: 7,
        stamina: -1,
        dexterity: 2,
      },
      abilityModifiers: {
        intimidation: 3,
      },
      attributesMaxLimit: {
        appearance: 0,
      },
      commonDiceBonus: 1,
      absorptionDice: {
        bashing: 1,
        lethal: 1,
        aggravated: 1,
      },
      damageMultipliers: {
        bashing: 0.25,
      },
    });
  });

  it("не мутирует объект character (включая вложенные clan и disciplines)", () => {
    const originalCharacter = JSON.parse(JSON.stringify(baseCharacter));

    aggregateModifiers(baseCharacter);

    // Глубокое сравнение данных
    expect(baseCharacter).toEqual(originalCharacter);
    // Разные ссылки — это нормально, главное, чтобы данные не изменились
    expect(baseCharacter).not.toBe(originalCharacter);
  });

  it("не мутирует глобальные данные disciplines (включая вложенные массивы и объекты)", () => {
    const originalDisciplines = JSON.parse(JSON.stringify(disciplines));

    aggregateModifiers(baseCharacter);

    expect(disciplines).toEqual(originalDisciplines);
  });

  it("не мутирует глобальные данные meritsAndFlaws", () => {
    const originalMerits = JSON.parse(JSON.stringify(merits));
    const originalFlaws = JSON.parse(JSON.stringify(flaws));

    aggregateModifiers(baseCharacter);

    expect(merits).toEqual(originalMerits);
    expect(flaws).toEqual(originalFlaws);
  });

  it("корректно обрабатывает отсутствие modifiers в отдельных источниках", () => {
    const characterWithEmptySources = {
      name: "Empty Vampire",
      unitTypeFeatures: {},
      clan: {
        clanName: "Toreador",
        disciplines: { animalism: 1, dominate: 1, presence: 1 },
        modifiers: undefined, // нет клановых бонусов
      },
      acquiredDisciplines: {},
      activeEffects: [],
      merits: [],
      flaws: [],
      equipment: [],
      bodyDamages: [],
    } as unknown as Kindred;

    const result = aggregateModifiers(characterWithEmptySources);

    // Должен вернуть пустой объект (или объект с undefined полями — зависит от твоей реализации merge)
    expect(result).toEqual({});
  });

  it("правильно применяет discipline levels и не ломает структуру disciplines", () => {
    const character = {
      name: "Discipline Test",
      unitTypeFeatures: {},
      clan: {
        clanName: "Ventrue",
        disciplines: { potence: 3, dominate: 1 },
        modifiers: {
          attributesModifiers: { presence: 1 },
        },
      },
      acquiredDisciplines: {},
      activeEffects: [],
      merits: [],
      flaws: [],
      equipment: [],
      bodyDamages: [],
    } as unknown as Kindred;

    const result = aggregateModifiers(character);

    expect(result).toEqual({
      attributesModifiers: {
        strength: 3, // potence lvl 3
        presence: 1, // clan
      },
    });
  });

  it("проклятие Носферату (appearance: 0) имеет высший приоритет и не перезаписывается бонусами", () => {
    const cursedCharacter = {
      id: "cursed-nosferatu",
      name: "Cursed Nosferatu",
      unitTypeFeatures: {},
      clan: {
        clanName: "Nosferatu",
        disciplines: {},
        // Проклятие: appearance: 0
        modifiers: {
          attributesMaxLimit: { appearance: 0 },
          attributesModifiers: { appearance: 5 }, // «бонус» к внешности, который должен быть перекрыт
        },
      },
      acquiredDisciplines: {},
      activeEffects: [
        {
          name: "Glamour Boost",
          modifiers: {
            attributesModifiers: { appearance: 3 },
          },
        },
      ],
      merits: [],
      flaws: [],
      equipment: [],
      bodyDamages: [],
    } as unknown as Kindred;

    deepFreeze(cursedCharacter);

    const result = aggregateModifiers(cursedCharacter);

    // Даже при appearance: +5 (clan) и +3 (effect) лимит appearance: 0 должен остаться
    expect(result.attributesMaxLimit).toEqual({ appearance: 0 });
    expect(result.attributesModifiers?.appearance).toBeGreaterThanOrEqual(8); // бонусы суммируются, но не влияют на лимит
  });
});
