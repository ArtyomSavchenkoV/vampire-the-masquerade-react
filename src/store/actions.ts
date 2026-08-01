import { initialState } from "./initialState";
import { Actions, UnitEntry } from "./types";
import { State } from "./types";

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
  resetStore: () => {
    set(initialState);
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
  addUnit: (id: string, entry: UnitEntry) =>
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
      if (draft.focusedUnitId === id) {
        draft.focusedUnitId = null;
      }
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
   * Устанавливает ID текущего фокуса (карточка персонажа)
   * или сбрасывает его в null.
   */
  focusUnit: (id: string | null) =>
    set((draft) => {
      draft.focusedUnitId = id;
    }),
});
