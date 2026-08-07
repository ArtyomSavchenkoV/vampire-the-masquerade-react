import { damageHealth, healthLevels as dataHealthLevels } from "./Health";

describe("src/domain/damageHealth", () => {
  const healthLevels = dataHealthLevels.filter(
    ({ name }) => name !== "incapacitated",
  );
  it("Урон по полному здоровью", () => {
    expect(
      damageHealth(
        healthLevels,
        [],
        { type: "damage", damageType: "bashing", value: 3 },
        false,
      ),
    ).toEqual(["bashing", "bashing", "bashing"]);
  });

  it("Урон по не полному здоровью", () => {
    expect(
      damageHealth(
        healthLevels,
        ["bashing"],
        {
          type: "damage",
          damageType: "lethal",
          value: 3,
        },
        false,
      ),
    ).toEqual(["bashing", "lethal", "lethal", "lethal"]);
  });

  it("Избыточный урон", () => {
    expect(healthLevels.length).toBe(8);
    expect(
      damageHealth(
        healthLevels,
        ["bashing", "lethal", "aggravated", "bashing"],
        {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
        false,
      ),
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

  it("Избыточный при уровне ограничения", () => {
    expect(healthLevels.length).toBe(8);
    expect(
      damageHealth(
        dataHealthLevels.filter(
          ({ name }) =>
            name === "unimpaired" ||
            name === "wounded" ||
            name === "incapacitated" ||
            name === "final",
        ),
        ["bashing"],
        {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
        false,
      ),
    ).toEqual(["bashing", "lethal"]);
  });

  it("Избыточный после ограничения", () => {
    expect(healthLevels.length).toBe(8);
    expect(
      damageHealth(
        dataHealthLevels.filter(
          ({ name }) =>
            name === "unimpaired" ||
            name === "wounded" ||
            name === "incapacitated" ||
            name === "final",
        ),
        ["bashing", "lethal"],
        {
          type: "damage",
          damageType: "lethal",
          value: 6,
        },
        false,
      ),
    ).toEqual(["bashing", "lethal", "lethal"]);
  });

  it("Урон по погибшему персонажу", () => {
    expect(
      damageHealth(
        healthLevels,
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
        false,
      ),
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
