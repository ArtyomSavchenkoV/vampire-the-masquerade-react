import { useMemo } from "react";
import {
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
  return useMemo(
    () => ({
      notes: unit.notes,
    }),
    [unit.notes],
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
