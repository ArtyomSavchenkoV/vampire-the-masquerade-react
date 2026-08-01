import { useMemo } from "react";
import { useSelectedUnitIdSelector, useUnitsSelector } from "store/selectors";

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
