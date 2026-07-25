import { HealthDamages } from "domain/Health";
import { healHealth } from "./Health";

describe("src/domain/healHealth", () => {
  const healthDamages = [
    "lethal",
    "bashing",
    "aggravated",
    "lethal",
    "bashing",
    "lethal",
    "bashing",
  ] as const satisfies HealthDamages;
  it("Вылечен", () => {
    expect(
      healHealth({
        bodyDamages: [],
        healthLevelName: "unimpaired",
        healEvent: { type: "heal", damageType: "bashing", value: 2 },
      }),
    ).toEqual([]);
  });

  it("bashing", () => {
    expect(
      healHealth({
        bodyDamages: healthDamages,
        healthLevelName: "heavilyWounded",
        healEvent: {
          type: "heal",
          damageType: "bashing",
          value: 8,
        },
      }),
    ).toEqual(["aggravated", "lethal", "lethal", "lethal"]);
  });

  it("lethal", () => {
    expect(
      healHealth({
        bodyDamages: healthDamages,
        healthLevelName: "heavilyWounded",
        healEvent: {
          type: "heal",
          damageType: "lethal",
          value: 5,
        },
      }),
    ).toEqual(["aggravated", "bashing"]);
  });

  it("aggravated", () => {
    expect(
      healHealth({
        bodyDamages: healthDamages,
        healthLevelName: "heavilyWounded",
        healEvent: {
          type: "heal",
          damageType: "aggravated",
          value: 6,
        },
      }),
    ).toEqual(["bashing"]);
  });

  it("Лечение в конечном статусе не возможно", () => {
    expect(
      healHealth({
        bodyDamages: healthDamages,
        healthLevelName: "finalDeath",
        healEvent: {
          type: "heal",
          damageType: "aggravated",
          value: 6,
        },
      }),
    ).toEqual([...healthDamages]);
  });
});
