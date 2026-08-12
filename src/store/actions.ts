import { RESOURCE_HISTORY_LENGTH_LIMIT } from "domain/ResourceHistory";
import { initialState } from "./initialState";
import { Actions } from "./types";
import { State } from "./types";
import { completeHealthEvents as completeKindredHealthEvents } from "domain/kindred/ResourcesHistory";
import { completeHealthEvents as completeGhoulHealthEvents } from "domain/ghoul/ResourcesHistory";
import { completeHealthEvents as completeHumanHealthEvents } from "domain/human/ResourcesHistory";
import { completeHealthEvents as completeCreatureHealthEvents } from "domain/creature/ResourcesHistory";

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
  addUnit: (id, entry) =>
    set((draft) => {
      draft.units[id] = entry;
    }),

  /**
   * Удаляет юнита из хранилища, очищает его из сцены
   * и сбрасывает фокус, если он был установлен на этого юнита.
   */
  removeUnit: (id) =>
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
  editNotes: (id, notes) =>
    set((draft) => {
      draft.units[id].notes = notes;
    }),

  /**
   * Изменяет юнита в хранилище по уникальному ID
   */
  editKindred: (id, unit) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "kindred",
        unit,
      };
    }),
  editGhoul: (id, unit) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "ghoul",
        unit,
      };
    }),
  editHuman: (id, unit) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "human",
        unit,
      };
    }),
  editCreature: (id, unit) =>
    set((draft) => {
      draft.units[id] = {
        ...draft.units[id],
        type: "creature",
        unit,
      };
    }),

  /** Изменяет здоровье персонажа */
  changeHealth: (unitId, event, description) =>
    set((draft) => {
      const unit = draft.units[unitId];
      if (!unit) return; // защита от несуществующего юнита
      if (unit.type !== "kindred" && event.type === "torpor") {
        // С torpor работаем только для kindred
        return;
      }

      const history = unit.unit.resourcesHistory?.health ?? [];
      const LIMIT = RESOURCE_HISTORY_LENGTH_LIMIT;

      let legacyEvents: typeof history = [];

      // Если история переполнена — забираем старые события для слияния в ранения
      if (history.length >= LIMIT) {
        const countToRemove = history.length - (LIMIT - 1); // оставляем LIMIT-1, чтобы после push было ровно LIMIT
        legacyEvents = history.slice(0, countToRemove);
        // Мутируем draft: обрезаем историю
        unit.unit.resourcesHistory.health = history.slice(countToRemove);
      }

      // Слияние старых событий в текущие ранения (по типу существа)
      if (legacyEvents.length > 0) {
        if (unit.type === "kindred") {
          unit.unit.bodyDamages = completeKindredHealthEvents(
            unit.unit.bodyDamages,
            legacyEvents,
          );
        } else if (unit.type === "ghoul") {
          unit.unit.bodyDamages = completeGhoulHealthEvents(
            unit.unit.bodyDamages,
            // @ts-ignore
            legacyEvents,
          );
        } else if (unit.type === "human") {
          unit.unit.bodyDamages = completeHumanHealthEvents(
            unit.unit.healthLevels,
            unit.unit.bodyDamages,
            // @ts-ignore
            legacyEvents,
          );
        } else if (unit.type === "creature") {
          unit.unit.bodyDamages = completeCreatureHealthEvents(
            unit.unit.healthLevels,
            unit.unit.bodyDamages,
            // @ts-ignore
            legacyEvents,
          );
        }
      }

      // Добавляем новое событие в историю
      (unit.unit.resourcesHistory.health ??= []).push({
        date: Date.now(),
        // Жалуется на torpor
        // @ts-ignore
        effect: event,
        description,
      });
    }),

  /**
   * Добавляет ID юнита в список участников сцены,
   * если его там ещё нет.
   */
  addToScene: (id) =>
    set((draft) => {
      if (!draft.sceneUnits.some((scene) => scene.id === id)) {
        draft.sceneUnits.push({ id, initiative: null });
      }
    }),

  /**
   * Удаляет ID юнита из списка участников сцены.
   */
  removeFromScene: (id) =>
    set((draft) => {
      draft.sceneUnits = draft.sceneUnits.filter((scene) => scene.id !== id);
    }),

  /**
   * Задать инициативу
   */
  setInitiative: ({ id, initiative }) =>
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
  selectUnit: (id) =>
    set((draft) => {
      draft.selectedUnitId = id;
    }),
});
