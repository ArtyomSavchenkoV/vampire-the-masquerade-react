import { useMemo } from "react";
import { useCalculatedKindredSelector, useUnitSelector } from "store/selectors";

export const useMainInfoSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculatedKindred = useCalculatedKindredSelector(unitId);

  if (!calculatedKindred) {
    throw new Error("useCalculatedKindredSelector return null");
  }

  const notes = unit.notes;
  const chronicle = calculatedKindred.chronicle;
  const nature = calculatedKindred.nature;
  const demeanor = calculatedKindred.demeanor;
  const role = calculatedKindred.role;
  const clanName = calculatedKindred.clan.clanName;
  const generation = calculatedKindred.generation;
  const sire = calculatedKindred.sire;
  const merits = calculatedKindred.merits;
  const flaws = calculatedKindred.flaws;
  const bodyWounds = calculatedKindred.bodyWounds;
  const willpower = calculatedKindred.willpower;
  const maxWillpower = calculatedKindred.maxWillpower;
  const bloodPool = calculatedKindred.bloodPool;

  return useMemo(
    () => ({
      notes,
      chronicle,
      nature,
      demeanor,
      role,
      clanName,
      generation,
      sire,
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
      clanName,
      generation,
      sire,
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
  const calculatedKindred = useCalculatedKindredSelector(unitId);

  if (!calculatedKindred) {
    throw new Error("useCalculatedKindredSelector return null");
  }

  const disciplines = calculatedKindred.clan.disciplines;
  const acquiredDisciplines = calculatedKindred.acquiredDisciplines;

  return useMemo(
    () => ({
      disciplines,
      acquiredDisciplines,
    }),
    [disciplines, acquiredDisciplines],
  );
};
