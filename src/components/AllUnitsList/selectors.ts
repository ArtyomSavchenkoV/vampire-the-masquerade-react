import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedGhoulSelector,
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
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedKindred) return null;

    return {
      isSelected: selectedUnitId === id,
      isOnScene: sceneUnits.some((scene) => scene.id === id),
      name: calculatedKindred.name,
      player: calculatedKindred.player,
      willpower: calculatedKindred.willpower,
      bloodPool: calculatedKindred.bloodPool,
      bodyDamages: calculatedKindred.bodyDamages,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedKindred]);

  return memoizedValue;
};

export const useGhoulRowSelector = (id: string) => {
  const calculatedGhoul = useCalculatedGhoulSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedGhoul) return null;

    return {
      isSelected: selectedUnitId === id,
      isOnScene: sceneUnits.some((scene) => scene.id === id),
      name: calculatedGhoul.name,
      player: calculatedGhoul.player,
      willpower: calculatedGhoul.willpower,
      bloodPool: calculatedGhoul.bloodPool,
      bodyDamages: calculatedGhoul.bodyDamages,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedGhoul]);

  return memoizedValue;
};

export const useHumanRowSelector = (id: string) => {
  const calculatedHuman = useCalculatedHumanSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedHuman) return null;

    return {
      isSelected: selectedUnitId === id,
      isOnScene: sceneUnits.some((scene) => scene.id === id),
      name: calculatedHuman.name,
      player: calculatedHuman.player,
      willpower: calculatedHuman.willpower,
      bodyDamages: calculatedHuman.bodyDamages,
      maxHealth: calculatedHuman.healthLevels.length - 1,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedHuman]);

  return memoizedValue;
};

export const useCreatureRowSelector = (id: string) => {
  const calculatedCreature = useCalculatedCreatureSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  const memoizedValue = useMemo(() => {
    if (!calculatedCreature) return null;

    return {
      isSelected: selectedUnitId === id,
      isOnScene: sceneUnits.some((scene) => scene.id === id),
      name: calculatedCreature.name,
      player: calculatedCreature.player,
      willpower: calculatedCreature.willpower,
      bodyDamages: calculatedCreature.bodyDamages,
      maxHealth: calculatedCreature.healthLevels.length - 1,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedCreature]);

  return memoizedValue;
};
