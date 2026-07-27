import { MODIFIED_ATTRIBUTE_MAX } from "domain/Attributes";
import { applyModifiers } from "./Modifiers";
import { Modifiers } from "domain/Modifiers";

describe("src/domain/applyModifiers", () => {
  const creature: any = {
    name: "Test",
    player: "Player",
    chronicle: "Chronicle",
    nature: "Dictator",
    demeanor: "Cool",
    role: "Enforcer",
    clan: {} as any,
    generation: 8,
    sire: null,
    attributes: { strength: 5, charisma: 3, appearance: 1 },
    abilities: { finance: 5 },
    backgrounds: {},
    mentalStability: {} as any,
    meritsAndFlaws: [],
    humanityOrPathRating: 7,
    willpower: 5,
    maxWillpower: 5,
    bloodPool: 10,
    bodyDamages: [] as any,
    equipment: [],
    activeEffects: [],
    resourcesHistory: [] as any,
  };

  const modifiers: Modifiers = {
    attributesModifiers: {
      strength: 10,
      charisma: 3,
    }, // Пытаемся выйти за пределы
    attributesMaxLimit: { appearance: 0 }, // Проклятие носферату
    abilityModifiers: {
      finance: 2,
      academics: 4,
    },
  };

  it("тест", () => {
    const result = applyModifiers({ data: creature, modifiers });

    expect(result).toHaveProperty("attributes");
    expect(result.attributes?.charisma).toBe(6);
    expect(result.attributes?.strength).toBe(MODIFIED_ATTRIBUTE_MAX); // Должно быть ровно 10
    expect(result.attributes?.appearance).toBe(0); // Проклятие носферату
    expect(result.abilities?.finance).toBe(7);

    const { attributes, ...withoutAttributes } = creature;
    expect(
      applyModifiers({ data: withoutAttributes, modifiers }),
    ).not.toHaveProperty("attributes");
    expect(result.abilities).not.toHaveProperty("academics"); // Функция не должна добавлять эффекты к полям, которых изначально не было
  });
});
