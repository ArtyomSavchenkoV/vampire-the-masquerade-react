import { useMemo } from "react";
import { useCalculatedHumanSelector, useUnitSelector } from "store/selectors";

export const useMainInfoSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculateHuman = useCalculatedHumanSelector(unitId);

  if (!calculateHuman) {
    throw new Error("useCalculatedHumanSelector return null");
  }

  const notes = unit.notes;
  const chronicle = calculateHuman.chronicle;
  const nature = calculateHuman.nature;
  const demeanor = calculateHuman.demeanor;
  const role = calculateHuman.role;
  const merits = calculateHuman.merits;
  const flaws = calculateHuman.flaws;
  const bodyWounds = calculateHuman.bodyWounds;
  const healthLevels = calculateHuman.healthLevels;
  const willpower = calculateHuman.willpower;
  const maxWillpower = calculateHuman.maxWillpower;

  return useMemo(
    () => ({
      notes,
      chronicle,
      nature,
      demeanor,
      role,
      merits,
      flaws,
      bodyWounds,
      healthLevels,
      willpower,
      maxWillpower,
    }),
    [
      notes,
      chronicle,
      nature,
      demeanor,
      role,
      merits,
      flaws,
      bodyWounds,
      healthLevels,
      willpower,
      maxWillpower,
    ],
  );
};
