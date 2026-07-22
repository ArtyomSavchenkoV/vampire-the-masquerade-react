import { Clan } from "models/Clan";

export const clanes: Clan[] = [
  {
    clanName: "Brujah",
    desciplines: {
      Celerity: 1,
      Potence: 1,
      Presence: 1,
    },
  },
  {
    clanName: "Ventrue",
    desciplines: {
      Dominate: 1,
      Fortitude: 1,
      Presence: 1,
    },
  },
  {
    clanName: "Gangrel",
    desciplines: {
      Animalism: 1,
      Fortitude: 1,
      Protean: 1,
    },
  },
  {
    clanName: "Lasombra",
    desciplines: {
      Presence: 1,
      Obtenebration: 1,
      Potence: 1,
    },
  },
  {
    clanName: "Malkavian",
    desciplines: {
      Auspex: 1,
      Dementation: 1,
      Obfuscate: 1,
    },
  },
  {
    clanName: "Nosferatu",
    desciplines: {
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
    desciplines: {
      Auspex: 1,
      Celerity: 1,
      Presence: 1,
    },
  },
] as const;
