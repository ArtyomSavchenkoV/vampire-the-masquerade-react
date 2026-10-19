import { EditKindredForm } from "commonComponents/editUnitForms/EditKindredForm";
import { clanes } from "data/clanes";
import { initialKindred } from "data/initialKindred";
import { FC } from "react";
import { useActions, useKindredSelector } from "store/selectors";

interface TProps {
  unitId: string;
}

export const ExtendedInfo: FC<TProps> = ({ unitId }) => {
  const { editKindred } = useActions();
  // TODO: Временное отображение базовых данных
  const kindred = useKindredSelector(unitId);
  return (
    <>
      {kindred && (
        <EditKindredForm
          kindred={kindred}
          onChange={(kindred) => editKindred(unitId, kindred)}
          onClanChange={(clanName) => {
            editKindred(unitId, {
              ...initialKindred,
              clan: clanes[clanName],
            });
          }}
        />
      )}
    </>
  );
};
