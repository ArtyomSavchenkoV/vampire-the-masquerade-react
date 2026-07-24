import { HealthDamages } from "models/Health";
import { healHealth } from "./Health";

describe("src/models/kindred-healHealth", () => {
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
      healHealth([], { type: "heal", damageType: "bashing", value: 2 }),
    ).toEqual([]);
  });

  it("bashing", () => {
    expect(
      healHealth(healthDamages, {
        type: "heal",
        damageType: "bashing",
        value: 8,
      }),
    ).toEqual(["aggravated", "lethal", "lethal", "lethal"]);
  });

  it("lethal", () => {
    expect(
      healHealth(healthDamages, {
        type: "heal",
        damageType: "lethal",
        value: 5,
      }),
    ).toEqual(["aggravated", "bashing"]);
  });

  it("aggravated", () => {
    expect(
      healHealth(healthDamages, {
        type: "heal",
        damageType: "aggravated",
        value: 6,
      }),
    ).toEqual(["bashing"]);
  });

  it("Лечение в конечном статусе не возможно", () => {
    expect(
      healHealth([...healthDamages, "bashing"], {
        type: "heal",
        damageType: "aggravated",
        value: 6,
      }),
    ).toEqual([...healthDamages, "bashing"]);
    expect(
      healHealth([...healthDamages, "aggravated"], {
        type: "heal",
        damageType: "aggravated",
        value: 6,
      }),
    ).toEqual([...healthDamages, "aggravated"]);
  });
});
