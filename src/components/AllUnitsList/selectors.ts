import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedGhoulSelector,
  useCalculatedHumanSelector,
  useCalculatedKindredSelector,
  useUnitSelector,
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
  const unit = useUnitSelector(id);
  const calculatedKindred = useCalculatedKindredSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  if (!calculatedKindred) {
    throw new Error("useKindredRowSelector return null");
  }

  const isSelected = selectedUnitId === id;
  const isOnScene = sceneUnits.some((scene) => scene.id === id);
  const name = calculatedKindred.name;
  const player = calculatedKindred.player;
  const willpower = calculatedKindred.willpower;
  const bloodPool = calculatedKindred.bloodPool;
  const bodyWounds = calculatedKindred.bodyWounds;
  const notes = unit.notes;

  return useMemo(() => {
    return {
      isSelected,
      isOnScene,
      name,
      player,
      willpower,
      bloodPool,
      bodyWounds,
      notes
    };
  }, [isSelected, isOnScene, name, player, willpower, bloodPool, bodyWounds, notes]);
};

export const useGhoulRowSelector = (id: string) => {
  const unit = useUnitSelector(id);
  const calculatedGhoul = useCalculatedGhoulSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  if (!calculatedGhoul) {
    throw new Error("calculatedGhoul return null");
  }

  const isSelected = selectedUnitId === id;
  const isOnScene = sceneUnits.some((scene) => scene.id === id);
  const name = calculatedGhoul.name;
  const player = calculatedGhoul.player;
  const willpower = calculatedGhoul.willpower;
  const bloodPool = calculatedGhoul.bloodPool;
  const bodyWounds = calculatedGhoul.bodyWounds;
  const notes = unit.notes;

  return useMemo(() => {
    return {
      isSelected,
      isOnScene,
      name,
      player,
      willpower,
      bloodPool,
      bodyWounds,
      notes
    };
  }, [isSelected, isOnScene, name, player, willpower, bloodPool, bodyWounds, notes]);
};

export const useHumanRowSelector = (id: string) => {
  const unit = useUnitSelector(id);
  const calculatedHuman = useCalculatedHumanSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  if (!calculatedHuman) {
    throw new Error("calculatedHuman return null");
  }

  const isSelected = selectedUnitId === id;
  const isOnScene = sceneUnits.some((scene) => scene.id === id);
  const name = calculatedHuman.name;
  const player = calculatedHuman.player;
  const willpower = calculatedHuman.willpower;
  const bodyWounds = calculatedHuman.bodyWounds;
  const maxHealth = calculatedHuman.healthLevels.length - 1;
  const notes = unit.notes;

  return useMemo(() => {
    return {
      isSelected,
      isOnScene,
      name,
      player,
      willpower,
      bodyWounds,
      maxHealth,
      notes
    };
  }, [isSelected, isOnScene, name, player, willpower, bodyWounds, maxHealth, notes]);
};

export const useCreatureRowSelector = (id: string) => {
  const unit = useUnitSelector(id);
  const calculatedCreature = useCalculatedCreatureSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  if (!calculatedCreature) {
    throw new Error("calculatedCreature return null");
  }

  const isSelected = selectedUnitId === id;
  const isOnScene = sceneUnits.some((scene) => scene.id === id);
  const name = calculatedCreature.name;
  const player = calculatedCreature.player;
  const willpower = calculatedCreature.willpower;
  const bodyWounds = calculatedCreature.bodyWounds;
  const maxHealth = calculatedCreature.healthLevels.length - 1;
  const notes = unit.notes;

  return useMemo(() => {
    return {
      isSelected,
      isOnScene,
      name,
      player,
      willpower,
      bodyWounds,
      maxHealth,
      notes
    };
  }, [isSelected, isOnScene, name, player, willpower, bodyWounds, maxHealth, notes]);
};
