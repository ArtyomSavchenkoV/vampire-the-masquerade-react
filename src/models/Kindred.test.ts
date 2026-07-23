import { aggregateCharacterModifiers } from "./Kindred";
import { Kindred } from "./Kindred";
import { disciplines } from "../data/disciplines";
import { meritsAndFlaws } from "../data/meritsAndFlaws";
import { MeritsAndFlawsName, MeritsAndFlawsData } from "./MeritsAndFlaws";
import { DisciplineName, DisciplineLevelVariants } from "./Discipline";

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

describe("aggregateCharacterModifiers", () => {
  const baseCharacter = {
    name: "Test Nosferatu",
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
    meritsAndFlaws: [],
    equipment: [],
    health: 4,
  } as unknown as Kindred;

  beforeEach(() => {
    // Замораживаем всё, что функция читает: character, disciplines, meritsAndFlaws
    deepFreeze(baseCharacter);
    deepFreeze(disciplines);
    deepFreeze(meritsAndFlaws);
  });

  it("возвращает корректные суммарные модификаторы (атрибуты, способности, лимиты, кубики)", () => {
    const result = aggregateCharacterModifiers(baseCharacter);

    /*
    Расчёт по фикстуре:
      - dexterity: 2 (celerity: 2) = 2
      - strength: 1 (potence: 1) + 3 (Berserk) + 2 (Calm) = 6
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
        strength: 6,
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
    });
  });

  it("не мутирует объект character (включая вложенные clan и disciplines)", () => {
    const originalCharacter = JSON.parse(JSON.stringify(baseCharacter));

    aggregateCharacterModifiers(baseCharacter);

    // Глубокое сравнение данных
    expect(baseCharacter).toEqual(originalCharacter);
    // Разные ссылки — это нормально, главное, чтобы данные не изменились
    expect(baseCharacter).not.toBe(originalCharacter);
  });

  it("не мутирует глобальные данные disciplines (включая вложенные массивы и объекты)", () => {
    const originalDisciplines = JSON.parse(JSON.stringify(disciplines));

    aggregateCharacterModifiers(baseCharacter);

    expect(disciplines).toEqual(originalDisciplines);
  });

  it("не мутирует глобальные данные meritsAndFlaws", () => {
    const originalMerits = JSON.parse(JSON.stringify(meritsAndFlaws));

    aggregateCharacterModifiers(baseCharacter);

    expect(meritsAndFlaws).toEqual(originalMerits);
  });

  it("корректно обрабатывает отсутствие modifiers в отдельных источниках", () => {
    const characterWithEmptySources = {
      name: "Empty Vampire",
      clan: {
        clanName: "Toreador",
        disciplines: { animalism: 1, dominate: 1, presence: 1 },
        modifiers: undefined, // нет клановых бонусов
      },
      activeEffects: [],
      meritsAndFlaws: [],
      equipment: [],
      health: 7,
    } as unknown as Kindred;

    const result = aggregateCharacterModifiers(characterWithEmptySources);

    // Должен вернуть пустой объект (или объект с undefined полями — зависит от твоей реализации merge)
    expect(result).toEqual({});
  });

  it("правильно применяет discipline levels и не ломает структуру disciplines", () => {
    const character = {
      name: "Discipline Test",
      clan: {
        clanName: "Ventrue",
        disciplines: { potence: 3, dominate: 1 },
        modifiers: {
          attributesModifiers: { presence: 1 },
        },
      },
      activeEffects: [],
      meritsAndFlaws: [],
      equipment: [],
      health: 7,
    } as unknown as Kindred;

    const result = aggregateCharacterModifiers(character);

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
      clan: {
        clanName: "Nosferatu",
        disciplines: {},
        // Проклятие: appearance: 0
        modifiers: {
          attributesMaxLimit: { appearance: 0 },
          attributesModifiers: { appearance: 5 }, // «бонус» к внешности, который должен быть перекрыт
        },
      },
      activeEffects: [
        {
          name: "Glamour Boost",
          modifiers: {
            attributesModifiers: { appearance: 3 },
          },
        },
      ],
      meritsAndFlaws: [],
      equipment: [],
      health: 7,
    } as unknown as Kindred;

    deepFreeze(cursedCharacter);

    const result = aggregateCharacterModifiers(cursedCharacter);

    // Даже при appearance: +5 (clan) и +3 (effect) лимит appearance: 0 должен остаться
    expect(result.attributesMaxLimit).toEqual({ appearance: 0 });
    expect(result.attributesModifiers?.appearance).toBeGreaterThanOrEqual(8); // бонусы суммируются, но не влияют на лимит
  });
});
