import { getHealthLevel, HealthLevelData } from "./Health";

describe("src/domain/getHealthLevel", () => {
  const healthLevels = [
    {
      name: "unimpaired",
    },
    {
      name: "wounded",
      modifiers: {
        commonDiceBonus: -2,
      },
    },
    {
      name: "nearlyDown",
      modifiers: {
        commonDiceBonus: -5,
      },
    },
    {
      name: "finalDeath",
    },
  ] as const satisfies Readonly<HealthLevelData[]>;

  it("Персонаж полностью здоров", () => {
    expect(getHealthLevel({ healthLevels })([])).toEqual({
      name: "unimpaired",
    });
  });

  it("Ранен", () => {
    expect(getHealthLevel({ healthLevels })(["aggravated"])).toEqual({
      name: "wounded",
      modifiers: {
        commonDiceBonus: -2,
      },
    });
  });

  it("Едва жив", () => {
    expect(
      getHealthLevel({ healthLevels })(["aggravated", "aggravated"]),
    ).toEqual({
      name: "nearlyDown",
      modifiers: {
        commonDiceBonus: -5,
      },
    });
  });

  it("Окончательная смерть.", () => {
    expect(
      getHealthLevel({ healthLevels })([
        "aggravated",
        "aggravated",
        "aggravated",
      ]),
    ).toEqual({
      name: "finalDeath",
    });
  });
});
