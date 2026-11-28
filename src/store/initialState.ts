import { clanNames } from "domain/Clan";
import { UnitType, unitTypes } from "domain/UnitType";
import { State } from "./types";

export const initialState: State = {
  units: {},
  unitsFilter: {
    unitsTypes: unitTypes.filter(
      (type): type is Exclude<UnitType, "kindred"> => type !== "kindred",
    ),
    clans: [...clanNames],
  },
  sceneUnits: [],
  selectedUnitId: null,
};
