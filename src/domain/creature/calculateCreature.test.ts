import { calculateCreature } from "./CalculatedCreature";
import { Creature } from "./Creature";

describe("src/domain/creature/calculateCreature", () => {
  const creature = {
    name: "Name",
    player: "Player",
    unitTypeFeatures: {
      modifiers: {
        damageMultipliers: {
          bashing: 0.5,
        },
      },
    },
    attributes: {
      strength: 2,
      dexterity: 1,
    },
    abilities: {
      stealth: 1,
    },
    mentalStability: {
      morality: 2,
      selfControl: 2,
      courage: 2,
    },
    willpower: 4,
    maxWillpower: 10,
    bodyDamages: ["bashing"],
    healthLevels: [
      {
        name: "unimpaired",
        isIncapacitated: false,
      },
      /** Помят — небольшие ушибы и ссадины. */
      {
        name: "battered",
        isIncapacitated: false,
      },
      /** Легко ранен — раны мешают действовать, появляются штрафы. */
      {
        name: "finalDeath",
        isIncapacitated: true,
        modifiers: {
          commonDiceBonus: -1,
        },
      },
    ],
    equipment: [
      {
        modifiers: {
          attributesModifiers: {
            strength: 1,
          },
        },
      },
    ],
    activeEffects: [
      {
        id: "1",
        name: "n",
        type: "buff",
        modifiers: {
          attributesModifiers: {
            strength: 1,
          },
          abilityModifiers: {
            stealth: -1,
          },
        },
        source: "environment",
      },
    ],
    resourcesHistory: {
      willpower: [],
      health: [],
    },
  } as Creature;
  it("test", () => {
    expect(calculateCreature(creature)).toEqual({
      ...creature,
      attributes: {
        strength: 4,
        dexterity: 1,
      },
      abilities: {
        stealth: 0,
      },
    });
  });
});
