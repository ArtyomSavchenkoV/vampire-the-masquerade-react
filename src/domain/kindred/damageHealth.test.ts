import { damageHealth } from "./Health";

describe("src/domain/kindred-damageHealth", () => {
  it("Урон по полному здоровью", () => {
    expect(
      damageHealth([], { type: "damage", damageType: "bashing", value: 3 }),
    ).toEqual(["bashing", "bashing", "bashing"]);
  });

  it("Урон по не полному здоровью", () => {
    expect(
      damageHealth(["bashing"], {
        type: "damage",
        damageType: "lethal",
        value: 3,
      }),
    ).toEqual(["bashing", "lethal", "lethal", "lethal"]);
  });

  it("Избыточный урон", () => {
    expect(
      damageHealth(["bashing", "lethal", "aggravated", "bashing"], {
        type: "damage",
        damageType: "lethal",
        value: 6,
      }),
    ).toEqual([
      "bashing",
      "lethal",
      "aggravated",
      "bashing",
      "lethal",
      "lethal",
      "lethal",
    ]);
  });

  it("Отправить в отключку", () => {
    expect(
      damageHealth(
        [
          "bashing",
          "lethal",
          "aggravated",
          "bashing",
          "lethal",
          "lethal",
          "lethal",
        ],
        {
          type: "damage",
          damageType: "bashing",
          value: 6,
        },
      ),
    ).toEqual([
      "bashing",
      "lethal",
      "aggravated",
      "bashing",
      "lethal",
      "lethal",
      "lethal",
      "bashing",
    ]);
    expect(
      damageHealth(
        [
          "bashing",
          "lethal",
          "aggravated",
          "bashing",
          "lethal",
          "lethal",
          "lethal",
        ],
        {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
      ),
    ).toEqual([
      "bashing",
      "lethal",
      "aggravated",
      "bashing",
      "lethal",
      "lethal",
      "lethal",
      "lethal",
    ]);
  });

  it("Урон отправляющий в окончательную смерть", () => {
    expect(
      damageHealth(
        [
          "bashing",
          "lethal",
          "aggravated",
          "bashing",
          "lethal",
          "lethal",
          "lethal",
        ],
        {
          type: "damage",
          damageType: "aggravated",
          value: 6,
        },
      ),
    ).toEqual([
      "bashing",
      "lethal",
      "aggravated",
      "bashing",
      "lethal",
      "lethal",
      "lethal",
      "aggravated",
    ]);
  });

  it("Добивающий урон (урон по персонажу в отключке (torpor))", () => {
    expect(
      damageHealth(
        [
          "bashing",
          "lethal",
          "aggravated",
          "bashing",
          "lethal",
          "lethal",
          "lethal",
          "lethal",
        ],
        {
          type: "damage",
          damageType: "aggravated",
          value: 6,
        },
      ),
    ).toEqual([
      "bashing",
      "lethal",
      "aggravated",
      "bashing",
      "lethal",
      "lethal",
      "lethal",
      "aggravated",
    ]);
  });

  it("Урон по погибшему персонажу", () => {
    expect(
      damageHealth(
        [
          "bashing",
          "lethal",
          "aggravated",
          "bashing",
          "lethal",
          "lethal",
          "lethal",
          "aggravated",
        ],
        {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
      ),
    ).toEqual([
      "bashing",
      "lethal",
      "aggravated",
      "bashing",
      "lethal",
      "lethal",
      "lethal",
      "aggravated",
    ]);
  });
});
