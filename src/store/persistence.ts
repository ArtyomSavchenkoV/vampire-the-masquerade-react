import type { PersistOptions, PersistStorage } from "zustand/middleware";
import type { Store, State } from "./types";
import type { TLocalStorageKey } from "localStorage";
import {
  serializeToSave,
  serializeFromSave,
} from "services/dataMigration/migrators";

const STORAGE_KEY: TLocalStorageKey = "store";
const STORAGE_VERSION = 1;

// Сохраняется только часть данных, без actions
type PersistedState = State;

const persistStorage: PersistStorage<PersistedState> = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (raw === null) return null;

    try {
      return {
        state: serializeFromSave(JSON.parse(raw)),
        version: STORAGE_VERSION,
      };
    } catch (e) {
      console.error("Не удалось прочитать сохранение", e);
      return null;
    }
  },

  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(serializeToSave(value.state)));
    } catch (e) {
      console.error("Не удалось записать сохранение", e);
    }
  },

  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const persistOptions: PersistOptions<Store, PersistedState> = {
  name: STORAGE_KEY,
  version: STORAGE_VERSION,
  storage: persistStorage,

  partialize: (state) => {
    const { actions, ...data } = state;
    return data;
  },

  onRehydrateStorage: () => (state, error) => {
    if (error) {
      console.error("Не удалось восстановить стор", error);
    }
  },
};
