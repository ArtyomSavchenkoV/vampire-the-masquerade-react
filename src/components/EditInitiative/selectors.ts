import { useMemo } from "react";
import { useCalculatedUnitSelector, useUnitSelector } from "store/selectors";

export const useEditIniciativeSelector = (unitId: string) => {
  const unit = useUnitSelector(unitId);
  const name = unit?.unit.name;
  const player = unit?.unit.player;

  const calculatedUnit = useCalculatedUnitSelector(unitId);

  const memoizedValue = useMemo(() => {
    return {
      name,
      player,
      dexterity: calculatedUnit?.attributes?.dexterity ?? 0,
      wits: calculatedUnit?.attributes?.wits ?? 0,
      commonDiceBonus: calculatedUnit?.commonDiceBonus ?? 0,
    };
  }, [name, player, calculatedUnit]);

  return memoizedValue;
};
