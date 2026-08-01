import { humanHealthLevels } from "data/humanHealthLevels";
import { getHealthLevel } from "domain/Health";
import { getKinderedHealthLevel } from "domain/kindred/Health";
import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedHumanSelector,
  useCalculatedKindredSelector,
  useSceneUnitsSelector as useSceneUnitsIdsSelector,
  useUnitsSelector,
} from "store/selectors";
import { useStore } from "store/store";

export const useSceneUnitsSelector = () => {
  const units = useUnitsSelector();
  const sceneUnits = useSceneUnitsIdsSelector();

  return useMemo(
    () =>
      Object.entries(units)
        .map(([id, { type }]) => ({
          id,
          type,
        }))
        .filter(({ id }) => sceneUnits.some((scene) => scene.id === id)),
    [units, sceneUnits],
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedKindred.name,
      willpower: calculatedKindred.willpower,
      bloodPool: calculatedKindred.bloodPool,
      bodyDamages: calculatedKindred.bodyDamages,
      healthLevel: getKinderedHealthLevel(calculatedKindred.bodyDamages).name,
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedHuman.name,
      willpower: calculatedHuman.willpower,
      bodyDamages: calculatedHuman.bodyDamages,
      healthLevel: getHealthLevel({ healthLevels: humanHealthLevels })(
        calculatedHuman.bodyDamages,
      ).name,
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedCreature.name,
      willpower: calculatedCreature.willpower,
      bodyDamages: calculatedCreature.bodyDamages,
      maxHealth: calculatedCreature.healthLevels.length - 1,
      healthLevel: getHealthLevel({
        healthLevels: calculatedCreature.healthLevels,
      })(calculatedCreature.bodyDamages).name,
    };
  }, [id, focusedUnitId, sceneUnits, calculatedCreature]);

  return memoizedValue;
};
