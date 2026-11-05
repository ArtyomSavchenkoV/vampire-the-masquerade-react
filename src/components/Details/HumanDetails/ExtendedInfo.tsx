import { EditHumanForm } from "commonComponents/editUnitForms/EditHumanForm";
import { FC } from "react";
import { useActions, useHumanSelector } from "store/selectors";

interface TProps {
  unitId: string;
}

export const ExtendedInfo: FC<TProps> = ({ unitId }) => {
  const { editHuman } = useActions();
  // TODO: Временное отображение базовых данных
  const human = useHumanSelector(unitId);
  return (
    <>
      {human && (
        <EditHumanForm
          human={human}
          onChange={(human) => editHuman(unitId, human)}
        />
      )}
    </>
  );
};
