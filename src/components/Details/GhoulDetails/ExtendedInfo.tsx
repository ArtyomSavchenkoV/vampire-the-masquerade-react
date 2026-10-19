import { EditGhoulForm } from "commonComponents/editUnitForms/EditGhoulForm";
import { useActions, useGhoulSelector } from "store/selectors";
import { FC } from "react";

interface TProps {
  unitId: string;
}

export const ExtendedInfo: FC<TProps> = ({ unitId }) => {
  const { editGhoul } = useActions();
  // TODO: Временное отображение базовых данных
  const ghoul = useGhoulSelector(unitId);
  return (
    <>
      {ghoul && (
        <EditGhoulForm
          ghoul={ghoul}
          onChange={(ghoul) => editGhoul(unitId, ghoul)}
        />
      )}
    </>
  );
};
