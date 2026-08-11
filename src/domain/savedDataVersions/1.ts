import { SavedData as SavedData0 } from "./0";

export type SavedData = {
  version: 1;
  units: SavedData0;
};

export const migrateFrom0To1 = (savedData: SavedData0): SavedData => ({
  version: 1,
  units: savedData,
});
