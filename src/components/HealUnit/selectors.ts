import { useMemo } from "react";
import { useUnitsSelector } from "store/selectors";

export const useHealUnitSelector = (unitId: string) => {
  const units = useUnitsSelector();
  const unit = units[unitId]?.unit;
  const name = unit.name;
  const player = unit.player;

  return useMemo(
    () => ({
      name,
      player,
    }),
    [name, player],
  );
};
