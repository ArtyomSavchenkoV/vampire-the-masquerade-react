import { useMemo } from "react";
import {
  useUnitsSelector,
  useCalculatedKindredSelector,
  useCalculatedHumanSelector,
  useCalculatedCreatureSelector,
} from "store/selectors";

export const useEditIniciativeSelector = (unitId: string) => {
  const units = useUnitsSelector();
  const type = units[unitId]?.type;
  const name = units[unitId]?.unit.name;
  const player = units[unitId]?.unit.player;

  const kindredUnit = useCalculatedKindredSelector(unitId);
  const humanUnit = useCalculatedHumanSelector(unitId);
  const creatureUnit = useCalculatedCreatureSelector(unitId);

  const memoizedValue = useMemo(() => {
    // Выбираем нужный объект в зависимости от типа
    const unit =
      type === "kindred"
        ? kindredUnit
        : type === "human"
          ? humanUnit
          : type === "creature"
            ? creatureUnit
            : null;

    return {
      name,
      player,
      dexterity: unit?.attributes?.dexterity ?? 0,
      wits: unit?.attributes?.wits ?? 0,
      commonDiceBonus: unit?.commonDiceBonus ?? 0,
    };
  }, [name, player, type, kindredUnit, humanUnit, creatureUnit]);

  return memoizedValue;
};
