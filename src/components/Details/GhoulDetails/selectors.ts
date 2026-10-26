import { useMemo } from "react";
import { useCalculatedGhoulSelector, useUnitSelector } from "store/selectors";

export const useMainInfoSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculatedGhoul = useCalculatedGhoulSelector(unitId);

  if (!calculatedGhoul) {
    throw new Error("useCalculatedGhoulSelector return null");
  }

  const notes = unit.notes;
  const chronicle = calculatedGhoul.chronicle;
  const nature = calculatedGhoul.nature;
  const demeanor = calculatedGhoul.demeanor;
  const role = calculatedGhoul.role;
  const merits = calculatedGhoul.merits;
  const flaws = calculatedGhoul.flaws;
  const bodyWounds = calculatedGhoul.bodyWounds;
  const willpower = calculatedGhoul.willpower;
  const maxWillpower = calculatedGhoul.maxWillpower;
  const bloodPool = calculatedGhoul.bloodPool;
  const maxBloodPool = calculatedGhoul.maxBloodPool;
  const domitor = calculatedGhoul.domitor;

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
      maxBloodPool,
      domitor,
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
      maxBloodPool,
      domitor,
    ],
  );
};

export const useDisciplinesSelector = (unitId: string) => {
  const calculatedGhoul = useCalculatedGhoulSelector(unitId);

  if (!calculatedGhoul) {
    throw new Error("useCalculatedGhoulSelector return null");
  }

  const disciplines = calculatedGhoul.disciplines;
  const acquiredDisciplines = calculatedGhoul.acquiredDisciplines;

  return useMemo(
    () => ({
      disciplines,
      acquiredDisciplines,
    }),
    [disciplines, acquiredDisciplines],
  );
};
