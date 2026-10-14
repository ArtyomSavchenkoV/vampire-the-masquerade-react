import { damageHealth, healthLevels as dataHealthLevels } from "./Health";

describe("src/domain/damageHealth", () => {
  const healthLevels = dataHealthLevels.filter(
    ({ name }) => name !== "incapacitated",
  );
  it("Урон по полному здоровью", () => {
    expect(damageHealth(healthLevels, [], "bashing", 3, false)).toEqual([
      "bashing",
      "bashing",
      "bashing",
    ]);
  });

  it("Урон по не полному здоровью", () => {
    expect(damageHealth(healthLevels, ["bashing"], "lethal", 3, false)).toEqual(
      ["bashing", "lethal", "lethal", "lethal"],
    );
  });

  it("Избыточный урон", () => {
    expect(healthLevels.length).toBe(8);
    expect(
      damageHealth(
        healthLevels,
        ["bashing", "lethal", "aggravated", "bashing"],
        "lethal",
        6,
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
        "lethal",
        6,
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
        "lethal",
        6,
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
        "lethal",
        6,
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
