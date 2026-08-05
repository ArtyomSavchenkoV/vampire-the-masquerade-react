import { getHealthLevel, HealthLevelData } from "./Health";

describe("src/domain/getHealthLevel", () => {
  const healthLevels = [
    {
      name: "unimpaired",
      isIncapacitated: false,
    },
    {
      name: "wounded",
      isIncapacitated: false,
      modifiers: {
        commonDiceBonus: -2,
      },
    },
    {
      name: "nearlyDown",
      isIncapacitated: false,
      modifiers: {
        commonDiceBonus: -5,
      },
    },
    {
      name: "final",
      isIncapacitated: true,
      variant: "death",
    },
  ] as const satisfies Readonly<HealthLevelData[]>;

  it("Персонаж полностью здоров", () => {
    expect(getHealthLevel(healthLevels, [], false)).toEqual({
      name: "unimpaired",
      isIncapacitated: false,
    });
  });

  it("Ранен", () => {
    expect(getHealthLevel(healthLevels, ["aggravated"], false)).toEqual({
      name: "wounded",
      isIncapacitated: false,
      modifiers: {
        commonDiceBonus: -2,
      },
    });
  });

  it("Едва жив", () => {
    expect(
      getHealthLevel(healthLevels, ["aggravated", "aggravated"], false),
    ).toEqual({
      name: "nearlyDown",
      isIncapacitated: false,
      modifiers: {
        commonDiceBonus: -5,
      },
    });
  });

  it("Окончательная смерть.", () => {
    expect(
      getHealthLevel(
        healthLevels,
        ["aggravated", "aggravated", "aggravated"],
        false,
      ),
    ).toEqual({
      name: "final",
      isIncapacitated: true,
      variant: "death",
    });
  });
});
