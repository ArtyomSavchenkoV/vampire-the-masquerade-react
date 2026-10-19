import { useMemo } from "react";
import { useCalculatedGhoulSelector, useUnitSelector } from "store/selectors";

export const useMainInfoSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculatedGhoul = useCalculatedGhoulSelector(unitId);

  const notes = unit.notes;
  const chronicle = calculatedGhoul?.chronicle;
  const nature = calculatedGhoul?.nature;
  const demeanor = calculatedGhoul?.demeanor;
  const role = calculatedGhoul?.role;
  const merits = calculatedGhoul?.merits;
  const flaws = calculatedGhoul?.flaws;
  const bodyWounds = calculatedGhoul?.bodyWounds;
  const willpower = calculatedGhoul?.willpower;
  const maxWillpower = calculatedGhoul?.maxWillpower;
  const bloodPool = calculatedGhoul?.bloodPool;

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
      willpower,
      maxWillpower,
      bloodPool,
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
      willpower,
      maxWillpower,
      bloodPool,
    ],
  );
};

export const useDisciplinesSelector = (unitId: string) => {
  const calculatedGhoul = useCalculatedGhoulSelector(unitId);

  const disciplines = calculatedGhoul?.disciplines;
  const acquiredDisciplines = calculatedGhoul?.acquiredDisciplines;

  return useMemo(
    () => ({
      disciplines,
      acquiredDisciplines,
    }),
    [disciplines, acquiredDisciplines],
  );
};
