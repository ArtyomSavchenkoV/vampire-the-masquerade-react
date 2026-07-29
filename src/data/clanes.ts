import { Clan, ClanName } from "domain/Clan";

export const clanes = {
  Gangrel: {
    clanName: "Gangrel",
    disciplines: {
      animalism: 1,
      fortitude: 1,
      protean: 1,
    },
  },
  Brujah: {
    clanName: "Brujah",
    disciplines: {
      celerity: 1,
      potence: 1,
      presence: 1,
    },
  },
  Ventrue: {
    clanName: "Ventrue",
    disciplines: {
      dominate: 1,
      fortitude: 1,
      presence: 1,
    },
  },
  Lasombra: {
    clanName: "Lasombra",
    disciplines: {
      presence: 1,
      obtenebration: 1,
      potence: 1,
    },
  },
  Malkavian: {
    clanName: "Malkavian",
    disciplines: {
      auspex: 1,
      dementation: 1,
      obfuscate: 1,
    },
  },
  Nosferatu: {
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
  Toreador: {
    clanName: "Toreador",
    disciplines: {
      auspex: 1,
      celerity: 1,
      presence: 1,
    },
  },
  Other: {
    clanName: "Other",
    disciplines: {},
  },
} as const satisfies Record<ClanName, Clan>;
