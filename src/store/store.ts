import { create } from "zustand";
import { Store } from "./types";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { persistOptions } from "./persistence";
import { initialState } from "./initialState";
import { createActions } from "./actions";

export const useStore = create<Store>()(
  persist(
    immer((set) => {
      return {
        ...initialState,
        actions: createActions(set),
      };
    }),
    persistOptions,
  ),
);
