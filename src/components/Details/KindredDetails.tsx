import { EditKindredForm } from "components/edit/EditKindredForm";
import { EditKindred } from "components/edit/EditKindred";
import { clanes } from "data/clanes";
import { initialKindred } from "data/initialKindred";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useKindredSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";
import { useKindredDetailsSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";

interface TProps {
  unitId: string;
}

export const KindredDetails: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { editKindred, selectUnit, editNotes } = useActions();
  const kindredDetails = useKindredDetailsSelector(unitId);
  // TODO: Временное отображение базовых данных
  const kindred = useKindredSelector(unitId);

  return (
    <>
      {kindred && (
        <Panel open>
          <Header
            title={translate("details.title")}
            buttons={<EditKindred kindredId={unitId} />}
            onClose={() => selectUnit(null)}
          />
          {/* Заметки */}
          <TextArea
            value={kindredDetails.notes}
            onChange={(ev) => editNotes(unitId, ev.target.value)}
            rows={5}
          />
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
        </Panel>
      )}
    </>
  );
};
