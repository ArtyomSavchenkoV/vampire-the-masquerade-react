import { getCreatureHealthLevel } from "domain/creature/Health";
import { getGhoulHealthLevel } from "domain/ghoul/Health";
import { getHumanHealthLevel } from "domain/human/Health";
import { getKinderedHealthLevel } from "domain/kindred/Health";
import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useCalculatedGhoulSelector,
  useCalculatedHumanSelector,
  useCalculatedKindredSelector,
  useSceneUnitsSelector as useSceneUnitsIdsSelector,
  useUnitSelector,
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
  const unit = useUnitSelector(id);
  const calculatedKindred = useCalculatedKindredSelector(id);
  const selectedUnitId = useStore((s) => s.selectedUnitId);
  const sceneUnits = useStore((s) => s.sceneUnits);

  if (!calculatedKindred) {
    throw new Error("useKindredRowSelector return null");
  }

  const isSelected = selectedUnitId === id;
  const initiative =
    sceneUnits.find((scene) => scene.id === id)?.initiative ?? null;
  const isIncapacitated = getKinderedHealthLevel(
    calculatedKindred.bodyWounds,
  ).isIncapacitated;
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
      initiative,
      isIncapacitated,
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
    initiative,
    isIncapacitated,
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
    throw new Error("useGhoulRowSelector return null");
  }

  const isSelected = selectedUnitId === id;
  const initiative =
    sceneUnits.find((scene) => scene.id === id)?.initiative ?? null;
  const isIncapacitated = getGhoulHealthLevel(
    calculatedGhoul.bodyWounds,
  ).isIncapacitated;
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
      initiative,
      isIncapacitated,
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
    initiative,
    isIncapacitated,
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
    throw new Error("useHumanRowSelector return null");
  }

  const isSelected = selectedUnitId === id;
  const initiative =
    sceneUnits.find((scene) => scene.id === id)?.initiative ?? null;
  const isIncapacitated = getHumanHealthLevel(
    calculatedHuman.healthLevels,
    calculatedHuman.bodyWounds,
  ).isIncapacitated;
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
      initiative,
      isIncapacitated,
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
    initiative,
    isIncapacitated,
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
    throw new Error("useCreatureRowSelector return null");
  }

  const isSelected = selectedUnitId === id;
  const initiative =
    sceneUnits.find((scene) => scene.id === id)?.initiative ?? null;
  const isIncapacitated = getCreatureHealthLevel(
    calculatedCreature.healthLevels,
    calculatedCreature.bodyWounds,
  );
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
      initiative,
      isIncapacitated,
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
    initiative,
    isIncapacitated,
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
