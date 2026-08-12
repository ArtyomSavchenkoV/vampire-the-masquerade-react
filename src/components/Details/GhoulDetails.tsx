import { EditGhoulForm } from "commonComponents/editUnitForms/EditGhoulForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useGhoulSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";
import { useGhoulDetailsSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";

interface TProps {
  unitId: string;
}

export const GhoulDetails: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { editGhoul, selectUnit, editNotes } = useActions();
  const ghoulDetails = useGhoulDetailsSelector(unitId);
  // TODO: Временное отображение базовых данных
  const ghoul = useGhoulSelector(unitId);

  return (
    <>
      {ghoul && (
        <Panel open>
          <Header
            title={translate("details.title")}
            onClose={() => selectUnit(null)}
          />
          {/* Заметки */}
          <TextArea
            value={ghoulDetails.notes}
            onChange={(ev) => editNotes(unitId, ev.target.value)}
            rows={5}
          />
          <EditGhoulForm
            ghoul={ghoul}
            onChange={(ghoul) => editGhoul(unitId, ghoul)}
          />
        </Panel>
      )}
    </>
  );
};
