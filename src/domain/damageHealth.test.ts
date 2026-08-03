import { healthLevels } from "data/healthLevels";
import { damageHealth } from "./Health";

describe("src/domain/damageHealth", () => {
  it("Урон по полному здоровью", () => {
    expect(
      damageHealth({
        bodyDamages: [],
        healthLevels,
        isKindred: false,
        damageEvent: { type: "damage", damageType: "bashing", value: 3 },
      }),
    ).toEqual(["bashing", "bashing", "bashing"]);
  });

  it("Урон по не полному здоровью", () => {
    expect(
      damageHealth({
        bodyDamages: ["bashing"],
        healthLevels,
        isKindred: false,
        damageEvent: {
          type: "damage",
          damageType: "lethal",
          value: 3,
        },
      }),
    ).toEqual(["bashing", "lethal", "lethal", "lethal"]);
  });

  it("Избыточный урон", () => {
    expect(
      damageHealth({
        bodyDamages: ["bashing", "lethal", "aggravated", "bashing"],
        healthLevels,
        isKindred: false,
        damageEvent: {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
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

  it("Урон по погибшему персонажу", () => {
    expect(
      damageHealth({
        bodyDamages: [
          "bashing",
          "lethal",
          "aggravated",
          "bashing",
          "lethal",
          "lethal",
          "lethal",
        ],
        healthLevels,
        isKindred: false,
        damageEvent: {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
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
});
