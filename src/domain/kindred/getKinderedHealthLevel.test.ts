import { getKinderedHealthLevel } from "./Health";

describe("src/domain/kindred-getKinderedHealthLevel", () => {
  it("Персонаж полностью здоров", () => {
    expect(getKinderedHealthLevel([])).toEqual({
      name: "unimpaired",
      isIncapacitated: false,
    });
  });

  it("Помят", () => {
    expect(getKinderedHealthLevel(["aggravated"])).toEqual({
      name: "battered",
      isIncapacitated: false,
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
      isIncapacitated: false,
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
      isIncapacitated: true,
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
      isIncapacitated: true,
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
      isIncapacitated: true,
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
      isIncapacitated: true,
    });
  });
});
