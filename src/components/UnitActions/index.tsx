import { DamageUnit } from "components/DamageUnit";
import { HealUnit } from "components/HealUnit";
import { FC } from "react";

interface TProps {
  unitId: string;
}

export const UnitActions: FC<TProps> = ({ unitId }) => {
  return (
    <>
      {/* Нанести урон персонажу */}
      <DamageUnit unitId={unitId} onClick={(ev) => ev.stopPropagation()} />

      {/* Лечить персонажа */}
      <HealUnit unitId={unitId} onClick={(ev) => ev.stopPropagation()} />
    </>
  );
};
