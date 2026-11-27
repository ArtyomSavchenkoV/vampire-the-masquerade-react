import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useUnitSelector,
} from "store/selectors";

export const useMainInfoSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculatedCreature = useCalculatedCreatureSelector(unitId);

  if (!calculatedCreature) {
    throw new Error("useCalculatedCreatureSelector return null");
  }

  const notes = unit.notes;
  const role = calculatedCreature.role;
  const animalSpecies = calculatedCreature.animalSpecies;
  const bodyWounds = calculatedCreature.bodyWounds;
  const healthLevels = calculatedCreature.healthLevels;
  const willpower = calculatedCreature.willpower;
  const maxWillpower = calculatedCreature.maxWillpower;

  return useMemo(
    () => ({
      notes,
      role,
      animalSpecies,
      bodyWounds,
      healthLevels,
      willpower,
      maxWillpower,
    }),
    [
      notes,
      role,
      animalSpecies,
      bodyWounds,
      healthLevels,
      willpower,
      maxWillpower,
    ],
  );
};
