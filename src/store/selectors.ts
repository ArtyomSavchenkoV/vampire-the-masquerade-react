import { calculateCreature } from "domain/creature/CalculatedCreature";
import { calculateHuman } from "domain/human/CalculatedHuman";
import { useStore } from "./store";
import { calculateKindred } from "domain/kindred/CalculatedKindred";
import { useMemo } from "react";

// TODO:
// import { useShallow } from "zustand/shallow";

/**
 * Получает список всех юнитов
 */
export const useUnitsSelector = () => useStore((state) => state.units);

/**
 * Получает список ID юнитов сцены
 */
export const useSceneUnitsSelector = () =>
  useStore((state) => state.sceneUnits);

/**
 * Получает ID выбранного юнита
 */
export const useSelectedUnitIdSelector = () =>
  useStore((state) => state.selectedUnitId);

/**
 * Получает сырые данные юнита по ID из стора.
 * Возвращает null, если юнит не найден.
 */
export const useUnitSelector = (id: string) =>
  useStore((state) => state.units[id] ?? null);

/**
 * Извлекает объект Kindred из юнита, если тип сущности — "kindred".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useKindredSelector = (id: string) => {
  const unit = useUnitSelector(id);
  if (!unit || unit.type !== "kindred") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычисляет итоговую модель Kindred с учётом всех модификаторов и правил.
 * Расчёт мемоизирован: выполняется только при изменении исходных данных.
 */
export const useCalculatedKindredSelector = (id: string) => {
  const kindred = useKindredSelector(id);

  return useMemo(() => (kindred ? calculateKindred(kindred) : null), [kindred]);
};

/**
 * Извлекает объект Human из юнита, если тип сущности — "human".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useHumanSelector = (id: string) => {
  const unit = useUnitSelector(id);
  if (!unit || unit.type !== "human") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычисляет итоговую модель Human с учётом всех модификаторов и правил.
 * Расчёт мемоизирован: выполняется только при изменении исходных данных.
 */
export const useCalculatedHumanSelector = (id: string) => {
  const human = useHumanSelector(id);

  return useMemo(() => (human ? calculateHuman(human) : null), [human]);
};

/**
 * Извлекает объект Creature из юнита, если тип сущности — "creature".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useCreatureSelector = (id: string) => {
  const unit = useUnitSelector(id);
  if (!unit || unit.type !== "creature") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычисляет итоговую модель Creature с учётом всех модификаторов и правил.
 * Расчёт мемоизирован: выполняется только при изменении исходных данных.
 */
export const useCalculatedCreatureSelector = (id: string) => {
  const creature = useCreatureSelector(id);

  return useMemo(
    () => (creature ? calculateCreature(creature) : null),
    [creature],
  );
};

/**
 * Хук для получения объекта экшенов из стора.
 */
export const useActions = () => useStore((state) => state.actions);
