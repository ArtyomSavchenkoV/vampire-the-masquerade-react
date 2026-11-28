import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedGhoulSelector,
  useCalculatedHumanSelector,
  useCalculatedKindredSelector,
  useUnitSelector,
  useFilteredUnitsSelector,
} from "store/selectors";
import { useStore } from "store/store";

export const useAllUnitsSelector = () => {
  const units = useFilteredUnitsSelector();

  return useMemo(
    () =>
      units
        .sort(({ unit }) => (unit.unit.player?.trim() ? -1 : 1))
        .map(({ id, unit }) => ({
          id,
          type: unit.type,
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
  const role = calculatedKindred.role;
  const clanName = calculatedKindred.clan.clanName;
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
      role,
      clanName,
      willpower,
      bloodPool,
      bodyWounds,
      notes,
    };
  }, [
    isSelected,
    isOnScene,
    name,
    player,
    role,
    clanName,
    willpower,
    bloodPool,
    bodyWounds,
    notes,
  ]);
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
  const role = calculatedGhoul.role;
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
      role,
      willpower,
      bloodPool,
      bodyWounds,
      notes,
    };
  }, [
    isSelected,
    isOnScene,
    name,
    player,
    role,
    willpower,
    bloodPool,
    bodyWounds,
    notes,
  ]);
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
  const role = calculatedHuman.role;
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
      role,
      willpower,
      bodyWounds,
      maxHealth,
      notes,
    };
  }, [
    isSelected,
    isOnScene,
    name,
    player,
    role,
    willpower,
    bodyWounds,
    maxHealth,
    notes,
  ]);
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
  const role = calculatedCreature.role;
  const animalSpecies = calculatedCreature.animalSpecies;
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
      role,
      animalSpecies,
      willpower,
      bodyWounds,
      maxHealth,
      notes,
    };
  }, [
    isSelected,
    isOnScene,
    name,
    player,
    role,
    animalSpecies,
    willpower,
    bodyWounds,
    maxHealth,
    notes,
  ]);
};
