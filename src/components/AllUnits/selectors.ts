import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedHumanSelector,
  useCalculatedKindredSelector,
  useUnitsSelector,
} from "store/selectors";
import { useStore } from "store/store";

export const useAllUnitsSelector = () => {
  const units = useUnitsSelector();

  return useMemo(
    () =>
      Object.entries(units).map(([id, { type }]) => ({
        id,
        type,
      })),
    [units],
  );
};

export const useKindredRowSelector = (id: string) => {
  const calculatedKindred = useCalculatedKindredSelector(id);
  const focusedUnitId = useStore((s) => s.focusedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedKindred) return null;

    return {
      isFocused: focusedUnitId === id,
      isOnScene: sceneUnits.includes(id),
      name: calculatedKindred.name,
      willpower: calculatedKindred.willpower,
      bloodPool: calculatedKindred.bloodPool,
      bodyDamages: calculatedKindred.bodyDamages,
    };
  }, [id, focusedUnitId, sceneUnits, calculatedKindred]);

  return memoizedValue;
};

export const useHumanRowSelector = (id: string) => {
  const calculatedHuman = useCalculatedHumanSelector(id);
  const focusedUnitId = useStore((s) => s.focusedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedHuman) return null;

    return {
      isFocused: focusedUnitId === id,
      isOnScene: sceneUnits.includes(id),
      name: calculatedHuman.name,
      willpower: calculatedHuman.willpower,
      bodyDamages: calculatedHuman.bodyDamages,
    };
  }, [id, focusedUnitId, sceneUnits, calculatedHuman]);

  return memoizedValue;
};

export const useCreatureRowSelector = (id: string) => {
  const calculatedCreature = useCalculatedCreatureSelector(id);
  const focusedUnitId = useStore((s) => s.focusedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedCreature) return null;

    return {
      isFocused: focusedUnitId === id,
      isOnScene: sceneUnits.includes(id),
      name: calculatedCreature.name,
      willpower: calculatedCreature.willpower,
      bodyDamages: calculatedCreature.bodyDamages,
      maxHealth: calculatedCreature.healthLevels.length - 1,
    };
  }, [id, focusedUnitId, sceneUnits, calculatedCreature]);

  return memoizedValue;
};
