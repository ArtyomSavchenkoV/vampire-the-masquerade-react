import { useMemo } from "react";
import {
  useCalculatedCreatureSelector,
  useUnitSelector,
} from "store/selectors";

export const useMainInfoSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculatedCreature = useCalculatedCreatureSelector(unitId);

  const notes = unit.notes;
  const bodyWounds = calculatedCreature?.bodyWounds;
  const healthLevels = calculatedCreature?.healthLevels;
  const willpower = calculatedCreature?.willpower;
  const maxWillpower = calculatedCreature?.maxWillpower;

  return useMemo(
    () => ({
      notes,
      bodyWounds,
      healthLevels,
      willpower,
      maxWillpower,
    }),
    [notes, bodyWounds, healthLevels, willpower, maxWillpower],
  );
};
