import { Creature } from "domain/creature/Creature";

export const initialCreature: Creature = {
  name: "",
  player: null,
  unitTypeFeatures: {
    staminaChecks: {
      bashing: true,
    },
  },
  attributes: {},
  abilities: {},
  mentalStability: {
    morality: 1,
    selfControl: 1,
    courage: 1,
  },
  willpower: 0,
  maxWillpower: 0,
  bodyDamages: [],
  healthLevels: [
    { name: "unimpaired", isIncapacitated: false },
    { name: "final", isIncapacitated: true, variant: "death" },
  ],
  equipment: [],
  activeEffects: [],
  resourcesHistory: {
    health: [],
    willpower: [],
  },
};
