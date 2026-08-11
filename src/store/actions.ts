import { Kindred } from "domain/kindred/Kindred";
import { initialState } from "./initialState";
import { Actions, CommonUnitEntry } from "./types";
import { State } from "./types";
import { Ghoul } from "domain/ghoul/Ghoul";
import { Human } from "domain/human/Human";
import { Creature } from "domain/creature/Creature";

/**
 * Фабрика экшенов для управления юнитами в сторе.
 * Возвращает набор методов для изменения состояния через Immer-draft.
 */
export const createActions = (
  set: (cb: State | ((draft: State) => void)) => void,
): Actions => ({
  /**
   * Сброс стора
   */
  setStoreState: (state) => {
    set(state);
  },
  /**
   * Перезаписывает юниты новым объектом
   */
  changeUnits: (units) =>
    set({
      ...initialState,
      units,
    }),

  /**
   * Добавляет юнита в хранилище по ID.
   */
  addUnit: (id: string, entry: CommonUnitEntry) =>
    set((draft) => {
      draft.units[id] = entry;
    }),

  /**
   * Удаляет юнита из хранилища, очищает его из сцены
   * и сбрасывает фокус, если он был установлен на этого юнита.
   */
  removeUnit: (id: string) =>
    set((draft) => {
      delete draft.units[id];
      draft.sceneUnits = draft.sceneUnits.filter((scene) => scene.id !== id);
      if (draft.selectedUnitId === id) {
        draft.selectedUnitId = null;
      }
    }),

  /**
   * Изменяет заметки
   */
  editNotes: (id: string, notes: string) =>
    set((draft) => {
      draft.units[id].notes = notes;
    }),

  /**
   * Изменяет юнита в хранилище по уникальному ID
   */
  editKindred: (id: string, unit: Kindred) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "kindred",
        unit,
      };
    }),
  editGhoul: (id: string, unit: Ghoul) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "ghoul",
        unit,
      };
    }),
  editHuman: (id: string, unit: Human) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "human",
        unit,
      };
    }),
  editCreature: (id: string, unit: Creature) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "creature",
        unit,
      };
    }),

  /**
   * Добавляет ID юнита в список участников сцены,
   * если его там ещё нет.
   */
  addToScene: (id: string) =>
    set((draft) => {
      if (!draft.sceneUnits.some((scene) => scene.id === id)) {
        draft.sceneUnits.push({ id, initiative: null });
      }
    }),

  /**
   * Удаляет ID юнита из списка участников сцены.
   */
  removeFromScene: (id: string) =>
    set((draft) => {
      draft.sceneUnits = draft.sceneUnits.filter((scene) => scene.id !== id);
    }),

  /**
   * Задать инициативу
   */
  setInitiative: ({
    id,
    initiative,
  }: {
    id: string;
    initiative: number | null;
  }) =>
    set((draft) => {
      const index = draft.sceneUnits.findIndex((unit) => unit.id === id);
      if (index === -1) return; // юнит не найден — ничего не делаем
      // Мутируем существующий объект
      draft.sceneUnits[index].initiative = initiative;
    }),

  /**
   * Сортирует участников по инициативе от большего к меньшему
   */
  sortSceneByInitiative: () => {
    set((draft) => {
      const withInitiative = draft.sceneUnits
        .filter((u) => u.initiative != null)
        .sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0));

      const withoutInitiative = draft.sceneUnits.filter(
        (u) => u.initiative == null,
      );

      draft.sceneUnits = [...withInitiative, ...withoutInitiative];
    });
  },

  /**
   * Устанавливает ID текущего фокуса (карточка персонажа)
   * или сбрасывает его в null.
   */
  selectUnit: (id: string | null) =>
    set((draft) => {
      draft.selectedUnitId = id;
    }),
});
