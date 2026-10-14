import { calculateChangebleParams } from "./ResourcesHistory";

describe("src/domain/kindred-calculateChangebleParams", () => {
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
                  type: "wound",
                  woundType: "lethal",
                  value: 1,
                },
                description: "",
              },
              {
                date: 2,
                effect: {
                  type: "heal",
                  woundType: "bashing",
                  value: 1,
                },
                description: "",
              },
              {
                date: 3,
                effect: {
                  type: "wound",
                  woundType: "aggravated",
                  value: 1,
                },
                description: "",
              },
            ],
          },
          willpower: 4,
          bloodPool: 5,
          bodyWounds: ["lethal", "aggravated", "bashing"],
        },
        { maxBloodPool: 10 },
      ),
    ).toEqual({
      willpower: 4 - 2 + 1,
      bloodPool: 5 - 3 + 1,
      bodyWounds: ["aggravated", "lethal", "lethal", "aggravated"],
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
          bodyWounds: [],
        },
        { maxBloodPool: 10 },
      ),
    ).toEqual({
      willpower: 5,
      bloodPool: 10,
      bodyWounds: [],
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
          bodyWounds: [],
        },
        { maxBloodPool: 10 },
      ),
    ).toEqual({
      willpower: 0,
      bloodPool: 0,
      bodyWounds: [],
    });
  });
});
