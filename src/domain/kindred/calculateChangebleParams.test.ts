import { calculateChangebleParams } from "./ResourcesHistory";

describe("src/models/kindred-calculateChangebleParams", () => {
  it("Test", () => {
    expect(
      calculateChangebleParams(
        {
          maxWillpower: 5,
          resourcesHistory: {
            bloodPool: [
              {
                date: 2,
                effect: -3,
                description: "",
              },
              {
                date: 2,
                effect: 1,
                description: "",
              },
            ],
            willpower: [
              {
                date: 2,
                effect: -2,
                description: "",
              },
              {
                date: 2,
                effect: 1,
                description: "",
              },
            ],
            health: [
              {
                date: 1,
                effect: {
                  type: "damage",
                  damageType: "lethal",
                  value: 1,
                },
                description: "",
              },
              {
                date: 2,
                effect: {
                  type: "heal",
                  damageType: "bashing",
                  value: 1,
                },
                description: "",
              },
              {
                date: 3,
                effect: {
                  type: "damage",
                  damageType: "aggravated",
                  value: 1,
                },
                description: "",
              },
            ],
          },
          willpower: 4,
          bloodPool: 5,
          bodyDamages: ["lethal", "aggravated", "bashing"],
        },
        { maxBloodPool: 10 },
      ),
    ).toEqual({
      willpower: 4 - 2 + 1,
      bloodPool: 5 - 3 + 1,
      bodyDamages: ["aggravated", "lethal", "lethal", "aggravated"],
    });
  });

  it("Тест максимального предела", () => {
    expect(
      calculateChangebleParams(
        {
          maxWillpower: 5,
          resourcesHistory: {
            bloodPool: [
              {
                date: 2,
                effect: 20,
                description: "",
              },
              {
                date: 2,
                effect: 20,
                description: "",
              },
            ],
            willpower: [
              {
                date: 2,
                effect: 20,
                description: "",
              },
              {
                date: 2,
                effect: 20,
                description: "",
              },
            ],
            health: [],
          },
          willpower: 4,
          bloodPool: 5,
          bodyDamages: [],
        },
        { maxBloodPool: 10 },
      ),
    ).toEqual({
      willpower: 5,
      bloodPool: 10,
      bodyDamages: [],
    });
  });

  it("Тест минимального предела", () => {
    expect(
      calculateChangebleParams(
        {
          maxWillpower: 5,
          resourcesHistory: {
            bloodPool: [
              {
                date: 2,
                effect: -20,
                description: "",
              },
              {
                date: 2,
                effect: -20,
                description: "",
              },
            ],
            willpower: [
              {
                date: 2,
                effect: -20,
                description: "",
              },
              {
                date: 2,
                effect: -20,
                description: "",
              },
            ],
            health: [],
          },
          willpower: 4,
          bloodPool: 5,
          bodyDamages: [],
        },
        { maxBloodPool: 10 },
      ),
    ).toEqual({
      willpower: 0,
      bloodPool: 0,
      bodyDamages: [],
    });
  });
});
