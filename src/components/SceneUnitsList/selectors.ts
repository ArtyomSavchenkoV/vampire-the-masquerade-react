import { healthLevels } from "data/healthLevels";
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
      sceneUnits.map((scene) => ({
        id: scene.id,
        type: units[scene.id]?.type,
      })),
    [units, sceneUnits],
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedKindred.name,
      player: calculatedKindred.player,
      willpower: calculatedKindred.willpower,
      bloodPool: calculatedKindred.bloodPool,
      bodyDamages: calculatedKindred.bodyDamages,
      isIncapacitated: getKinderedHealthLevel(calculatedKindred.bodyDamages)
        .isIncapacitated,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedKindred]);

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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedHuman.name,
      player: calculatedHuman.player,
      willpower: calculatedHuman.willpower,
      bodyDamages: calculatedHuman.bodyDamages,
      isIncapacitated: getHealthLevel({
        healthLevels: healthLevels,
        bodyDamages: calculatedHuman.bodyDamages,
        isKindred: false,
      }).isIncapacitated,
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedCreature.name,
      player: calculatedCreature.player,
      willpower: calculatedCreature.willpower,
      bodyDamages: calculatedCreature.bodyDamages,
      maxHealth: calculatedCreature.healthLevels.length - 1,
      isIncapacitated: getHealthLevel({
        healthLevels: healthLevels,
        bodyDamages: calculatedCreature.bodyDamages,
        isKindred: false,
      }).isIncapacitated,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedCreature]);

  return memoizedValue;
};
