import { useMemo } from "react";
import { useUnitSelector } from "store/selectors";

export const useHealUnitSelector = (unitId: string) => {
  const unitMeta = useUnitSelector(unitId);
  const name = unitMeta?.unit.name;
  const player = unitMeta?.unit.player;

  return useMemo(
    () => ({
      name,
      player,
    }),
    [name, player],
  );
};
