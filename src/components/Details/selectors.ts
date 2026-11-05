import { useMemo } from "react";
import { useSelectedUnitIdSelector, useUnitsSelector } from "store/selectors";

export const useDetailsSelector = () => {
  const selectedUnitId = useSelectedUnitIdSelector();
  const units = useUnitsSelector();
  const unit = selectedUnitId !== null ? units[selectedUnitId] : null;
  const unitType = unit?.type;
  const unitName = unit?.unit.name;
  const unitPlayer = unit?.unit.player;
  return useMemo(
    () => ({ unitId: selectedUnitId, unitType, unitName, unitPlayer }),
    [selectedUnitId, unitType, unitName, unitPlayer],
  );
};
