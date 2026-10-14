import { getCreatureHealthLevel } from "domain/creature/Health";
import { getHumanHealthLevel } from "domain/human/Health";
import { getKinderedHealthLevel } from "domain/kindred/Health";
import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedGhoulSelector,
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
      bodyWounds: calculatedKindred.bodyWounds,
      isIncapacitated: getKinderedHealthLevel(calculatedKindred.bodyWounds)
        .isIncapacitated,
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedGhoul.name,
      player: calculatedGhoul.player,
      willpower: calculatedGhoul.willpower,
      bloodPool: calculatedGhoul.bloodPool,
      bodyWounds: calculatedGhoul.bodyWounds,
      isIncapacitated: getKinderedHealthLevel(calculatedGhoul.bodyWounds)
        .isIncapacitated,
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
      initiative:
        sceneUnits.find((scene) => scene.id === id)?.initiative ?? null,
      name: calculatedHuman.name,
      player: calculatedHuman.player,
      willpower: calculatedHuman.willpower,
      bodyWounds: calculatedHuman.bodyWounds,
      maxHealth: calculatedHuman.healthLevels.length - 1,
      isIncapacitated: getHumanHealthLevel(
        calculatedHuman.healthLevels,
        calculatedHuman.bodyWounds,
      ).isIncapacitated,
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
      bodyWounds: calculatedCreature.bodyWounds,
      maxHealth: calculatedCreature.healthLevels.length - 1,
      isIncapacitated: getCreatureHealthLevel(
        calculatedCreature.healthLevels,
        calculatedCreature.bodyWounds,
      ).isIncapacitated,
    };
  }, [id, selectedUnitId, sceneUnits, calculatedCreature]);

  return memoizedValue;
};
