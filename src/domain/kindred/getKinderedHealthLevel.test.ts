import { getKinderedHealthLevel } from "./Health";

describe("src/models/kindred-getKinderedHealthLevel", () => {
  it("Персонаж полностью здоров", () => {
    expect(getKinderedHealthLevel([])).toEqual({
      name: "unimpaired",
    });
  });

  it("Помят", () => {
    expect(getKinderedHealthLevel(["aggravated"])).toEqual({
      name: "battered",
    });
  });

  it("Едва жив", () => {
    expect(
      getKinderedHealthLevel([
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
      ]),
    ).toEqual({
      name: "nearlyDown",
      modifiers: {
        commonDiceBonus: -5,
      },
    });
  });

  it("Небоеспособен", () => {
    expect(
      getKinderedHealthLevel([
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
      ]),
    ).toEqual({
      name: "incapacitated",
    });
  });

  it("В отключке", () => {
    expect(
      getKinderedHealthLevel([
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "bashing",
      ]),
    ).toEqual({
      name: "torpor",
    });
  });

  it("В отключке", () => {
    expect(
      getKinderedHealthLevel([
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "lethal",
      ]),
    ).toEqual({
      name: "torpor",
    });
  });

  it("Окончательная смерть.", () => {
    expect(
      getKinderedHealthLevel([
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
        "aggravated",
      ]),
    ).toEqual({
      name: "finalDeath",
    });
  });
});
