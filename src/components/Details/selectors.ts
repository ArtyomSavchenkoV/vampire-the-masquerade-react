import { getKinderedHealthLevel } from "domain/kindred/Health";
import { useMemo } from "react";
import {
  useCalculatedKindredSelector,
  useSelectedUnitIdSelector,
  useUnitSelector,
  useUnitsSelector,
} from "store/selectors";

export const useDetailsSelector = () => {
  const selectedUnitId = useSelectedUnitIdSelector();
  const units = useUnitsSelector();
  return useMemo(
    () =>
      selectedUnitId == null
        ? null
        : { id: selectedUnitId, type: units[selectedUnitId].type },
    [selectedUnitId, units],
  );
};

export const useKindredDetailsSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const calculatedKindred = useCalculatedKindredSelector(unitId);
  return useMemo(
    () => ({
      notes: unit.notes,
      healthLevel: calculatedKindred?.bodyDamages
        ? getKinderedHealthLevel(calculatedKindred.bodyDamages)
        : null,
    }),
    [unit.notes, calculatedKindred?.bodyDamages],
  );
};

export const useGhoulDetailsSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  return useMemo(
    () => ({
      notes: unit.notes,
    }),
    [unit.notes],
  );
};

export const useHumanDetailsSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  return useMemo(
    () => ({
      notes: unit.notes,
    }),
    [unit.notes],
  );
};

export const useCreatureDetailsSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  return useMemo(
    () => ({
      notes: unit.notes,
    }),
    [unit.notes],
  );
};
