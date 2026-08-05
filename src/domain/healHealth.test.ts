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
  ] satisfies HealthDamages;
  it("Вылечен", () => {
    expect(
      healHealth([], "unimpaired", {
        type: "heal",
        damageType: "bashing",
        value: 2,
      }),
    ).toEqual([]);
  });

  it("bashing", () => {
    expect(
      healHealth(healthDamages, "heavilyWounded", {
        type: "heal",
        damageType: "bashing",
        value: 8,
      }),
    ).toEqual(["aggravated", "lethal", "lethal", "lethal"]);
  });

  it("lethal", () => {
    expect(
      healHealth(healthDamages, "heavilyWounded", {
        type: "heal",
        damageType: "lethal",
        value: 5,
      }),
    ).toEqual(["aggravated", "bashing"]);
  });

  it("aggravated", () => {
    expect(
      healHealth(healthDamages, "heavilyWounded", {
        type: "heal",
        damageType: "aggravated",
        value: 6,
      }),
    ).toEqual(["bashing"]);
  });

  it("Лечение в конечном статусе не возможно", () => {
    expect(
      healHealth(healthDamages, "final", {
        type: "heal",
        damageType: "aggravated",
        value: 6,
      }),
    ).toEqual([...healthDamages]);
  });
});
