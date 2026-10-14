import { getKinderedHealthLevel } from "domain/kindred/Health";
import { useMemo } from "react";
import { useCalculatedKindredSelector, useUnitSelector } from "store/selectors";

export const useTorporAwakeningUnitSelector = (unitId: string) => {
  const unitMeta = useUnitSelector(unitId);
  const name = unitMeta?.unit.name;
  const player = unitMeta?.unit.player;

  const calculatedKindred = useCalculatedKindredSelector(unitId);

  return useMemo(
    () => ({
      name,
      player,
      healthLevel: calculatedKindred?.bodyWounds
        ? getKinderedHealthLevel(calculatedKindred.bodyWounds)
        : null,
    }),
    [name, player, calculatedKindred?.bodyWounds],
  );
};
