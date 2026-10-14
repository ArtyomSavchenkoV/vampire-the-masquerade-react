import { useMemo } from "react";
import { useCalculatedUnitSelector, useUnitSelector } from "store/selectors";

export const useDamageUnitSelector = (unitId: string) => {
  const unitMeta = useUnitSelector(unitId);
  const name = unitMeta?.unit.name;
  const player = unitMeta?.unit.player;
  const staminaChecks = unitMeta.unit.unitFeatures.staminaChecks ?? null;
  const damageToWoundMap = unitMeta?.unit.unitFeatures.damageToWoundMap;
  const calculated = useCalculatedUnitSelector(unitId);
  const stamina = calculated?.attributes?.stamina ?? null;
  const absorptionDice = calculated?.absorptionDice ?? null;
  const woundMultipliers = calculated?.woundMultipliers ?? null;

  return useMemo(
    () => ({
      name,
      player,
      staminaChecks,
      stamina,
      absorptionDice,
      woundMultipliers,
      damageToWoundMap,
    }),
    [
      name,
      player,
      staminaChecks,
      stamina,
      absorptionDice,
      woundMultipliers,
      damageToWoundMap,
    ],
  );
};
