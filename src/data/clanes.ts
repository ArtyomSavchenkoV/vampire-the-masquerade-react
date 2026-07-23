import { Clan } from "models/Clan";

export const clanes = [
  {
    clanName: "Brujah",
    disciplines: {
      celerity: 1,
      potence: 1,
      presence: 1,
    },
  },
  {
    clanName: "Ventrue",
    disciplines: {
      dominate: 1,
      fortitude: 1,
      presence: 1,
    },
  },
  {
    clanName: "Gangrel",
    disciplines: {
      animalism: 1,
      fortitude: 1,
      protean: 1,
    },
  },
  {
    clanName: "Lasombra",
    disciplines: {
      presence: 1,
      obtenebration: 1,
      potence: 1,
    },
  },
  {
    clanName: "Malkavian",
    disciplines: {
      auspex: 1,
      dementation: 1,
      obfuscate: 1,
    },
  },
  {
    clanName: "Nosferatu",
    disciplines: {
      animalism: 1,
      obfuscate: 1,
      potence: 1,
    },
    modifiers: {
      attributesMaxLimit: {
        appearance: 0,
      },
    },
  },
  {
    clanName: "Toreador",
    disciplines: {
      auspex: 1,
      celerity: 1,
      presence: 1,
    },
  },
] as const satisfies readonly Clan[];
