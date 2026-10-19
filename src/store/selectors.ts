import { useMemo } from "react";
import { useStore } from "./store";
import { calculateKindred } from "domain/kindred/CalculatedKindred";
import { calculateGhoul } from "domain/ghoul/CalculatedGhoul";
import { calculateHuman } from "domain/human/CalculatedHuman";
import { calculateCreature } from "domain/creature/CalculatedCreature";

// TODO:
// import { useShallow } from "zustand/shallow";

/**
 * Получить список всех юнитов
 */
export const useUnitsSelector = () => useStore((state) => state.units);

/**
 * Получить список ID юнитов сцены
 */
export const useSceneUnitsSelector = () =>
  useStore((state) => state.sceneUnits);

/**
 * Получить ID выбранного юнита
 */
export const useSelectedUnitIdSelector = () =>
  useStore((state) => state.selectedUnitId);

/**
 * Получает сырые данные юнита по ID из стора.
 * Возвращает null, если юнит не найден.
 */
export const useUnitSelector = (unitId: string) =>
  useStore((state) => state.units[unitId] ?? null);

/**
 * Извлечь объект Kindred из юнита, если тип сущности — "kindred".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useKindredSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  if (!unit || unit.type !== "kindred") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычислить итоговую модель Kindred с учётом всех модификаторов и правил.
 */
export const useCalculatedKindredSelector = (unitId: string) => {
  const kindred = useKindredSelector(unitId);

  return useMemo(() => (kindred ? calculateKindred(kindred) : null), [kindred]);
};

/**
 * Извлечь объект Kindred из юнита, если тип сущности — "kindred".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useGhoulSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  if (!unit || unit.type !== "ghoul") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычислить итоговую модель Ghoul с учётом всех модификаторов и правил.
 */
export const useCalculatedGhoulSelector = (unitId: string) => {
  const ghoul = useGhoulSelector(unitId);

  return useMemo(() => (ghoul ? calculateGhoul(ghoul) : null), [ghoul]);
};

/**
 * Извлечь объект Human из юнита, если тип сущности — "human".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useHumanSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  if (!unit || unit.type !== "human") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычислить итоговую модель Human с учётом всех модификаторов и правил.
 */
export const useCalculatedHumanSelector = (unitId: string) => {
  const human = useHumanSelector(unitId);

  return useMemo(() => (human ? calculateHuman(human) : null), [human]);
};

/**
 * Извлечь объект Creature из юнита, если тип сущности — "creature".
 * Возвращает null для других типов или при отсутствии юнита.
 */
export const useCreatureSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  if (!unit || unit.type !== "creature") {
    return null;
  }
  return unit.unit;
};

/**
 * Вычислить итоговую модель Creature с учётом всех модификаторов и правил.
 */
export const useCalculatedCreatureSelector = (unitId: string) => {
  const creature = useCreatureSelector(unitId);

  return useMemo(
    () => (creature ? calculateCreature(creature) : null),
    [creature],
  );
};

/**
 * Получить общие данные существа
 */
export const useCalculatedUnitSelector = (unitId: string) => {
  const calculatedKindred = useCalculatedKindredSelector(unitId);
  const calculatedHuman = useCalculatedHumanSelector(unitId);
  const calculatedCreature = useCalculatedCreatureSelector(unitId);
  const calculatedGhoul = useCalculatedGhoulSelector(unitId);
  return (
    calculatedKindred ||
    calculatedHuman ||
    calculatedCreature ||
    calculatedGhoul
  );
};

/**
 * Хук для получения объекта экшенов из стора.
 */
export const useActions = () => useStore((state) => state.actions);
