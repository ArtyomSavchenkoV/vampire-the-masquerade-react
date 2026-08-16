import { useMemo } from "react";
import { useCalculatedUnitSelector, useUnitSelector } from "store/selectors";

export const useDamageUnitSelector = (unitId: string) => {
  const unitMeta = useUnitSelector(unitId);
  const name = unitMeta?.unit.name;
  const player = unitMeta?.unit.player;
  const staminaChecks = unitMeta.unit.unitTypeFeatures.staminaChecks ?? null;
  const calculated = useCalculatedUnitSelector(unitId);
  const stamina = calculated?.attributes?.stamina ?? null;
  const absorptionDice = calculated?.absorptionDice ?? null;
  const damageMultipliers = calculated?.damageMultipliers ?? null;

  return useMemo(
    () => ({
      name,
      player,
      staminaChecks,
      stamina,
      absorptionDice,
      damageMultipliers,
    }),
    [name, player, staminaChecks, stamina, absorptionDice, damageMultipliers],
  );
};
