import { Clan } from "models/Clan";

export const clanes = [
  {
    clanName: "Brujah",
    disciplines: {
      Celerity: 1,
      Potence: 1,
      Presence: 1,
    },
  },
  {
    clanName: "Ventrue",
    disciplines: {
      Dominate: 1,
      Fortitude: 1,
      Presence: 1,
    },
  },
  {
    clanName: "Gangrel",
    disciplines: {
      Animalism: 1,
      Fortitude: 1,
      Protean: 1,
    },
  },
  {
    clanName: "Lasombra",
    disciplines: {
      Presence: 1,
      Obtenebration: 1,
      Potence: 1,
    },
  },
  {
    clanName: "Malkavian",
    disciplines: {
      Auspex: 1,
      Dementation: 1,
      Obfuscate: 1,
    },
  },
  {
    clanName: "Nosferatu",
    disciplines: {
      Animalism: 1,
      Obfuscate: 1,
      Potence: 1,
    },
    priorityAtributes: {
      appearance: 0,
    },
  },
  {
    clanName: "Toreador",
    disciplines: {
      Auspex: 1,
      Celerity: 1,
      Presence: 1,
    },
  },
] as const satisfies readonly Clan[];
