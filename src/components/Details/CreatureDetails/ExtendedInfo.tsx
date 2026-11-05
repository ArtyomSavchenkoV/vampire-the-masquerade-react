import { EditCreatureForm } from "commonComponents/editUnitForms/EditCreatureForm";
import { FC } from "react";
import { useActions, useCreatureSelector } from "store/selectors";

interface TProps {
  unitId: string;
}

export const ExtendedInfo: FC<TProps> = ({ unitId }) => {
  const { editCreature } = useActions();
  // TODO: Временное отображение базовых данных
  const creature = useCreatureSelector(unitId);
  return (
    <>
      {creature && (
        <EditCreatureForm
          creature={creature}
          onChange={(creature) => editCreature(unitId, creature)}
        />
      )}
    </>
  );
};
