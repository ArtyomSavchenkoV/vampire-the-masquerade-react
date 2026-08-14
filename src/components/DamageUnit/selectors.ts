import { useMemo } from "react";
import { useUnitsSelector } from "store/selectors";
import { calculateKindred } from "domain/kindred/CalculatedKindred";
import { calculateGhoul } from "domain/ghoul/CalculatedGhoul";
import { calculateHuman } from "domain/human/CalculatedHuman";
import { calculateCreature } from "domain/creature/CalculatedCreature";

export const useDamageUnitSelector = (unitId: string) => {
  const units = useUnitsSelector();
  const unitMeta = units[unitId];
  const name = unitMeta?.unit.name;
  const player = unitMeta?.unit.player;
  const staminaChecks = unitMeta.unit.unitTypeFeatures.staminaChecks ?? null;
  const calculated = useMemo(
    () =>
      (unitMeta.type === "kindred" && calculateKindred(unitMeta.unit)) ||
      (unitMeta.type === "ghoul" && calculateGhoul(unitMeta.unit)) ||
      (unitMeta.type === "human" && calculateHuman(unitMeta.unit)) ||
      (unitMeta.type === "creature" && calculateCreature(unitMeta.unit)) ||
      null,
    [unitMeta.type, unitMeta.unit],
  );
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
