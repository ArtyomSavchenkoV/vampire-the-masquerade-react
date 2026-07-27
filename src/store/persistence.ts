import { createJSONStorage, type PersistOptions } from "zustand/middleware";
import { Store } from "./types";

const STORAGE_KEY = "store";
const STORAGE_VERSION = 1;

type PersistedState = {};

export const persistOptions: PersistOptions<Store, PersistedState> = {
  name: STORAGE_KEY,
  version: STORAGE_VERSION,
  storage: createJSONStorage(() => localStorage),
  // TODO: позже сделать сохранение в localStorage
  partialize: (_state) => ({}),
};
