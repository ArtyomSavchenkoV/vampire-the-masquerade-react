import { EditKindredForm } from "commonComponents/editUnitForms/EditKindredForm";
import { EditKindred } from "components/Details/EditKindred";
import { clanes } from "data/clanes";
import { initialKindred } from "data/initialKindred";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useKindredSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";
import { useKindredDetailsSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";
import { UnitActions } from "components/UnitActions";
import { TorporAwakeningUnit } from "components/TorporAwakeningUnit";
import styled from "@emotion/styled";

const Body = styled.div`
  overflow: auto;
  padding: 4px;
`;

interface TProps {
  unitId: string;
}

export const KindredDetails: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { editKindred, selectUnit, editNotes } = useActions();
  const kindredDetails = useKindredDetailsSelector(unitId);
  const isTorpor =
    kindredDetails.healthLevel &&
    kindredDetails.healthLevel.name === "final" &&
    kindredDetails.healthLevel.variant === "torpor";
  // TODO: Временное отображение базовых данных
  const kindred = useKindredSelector(unitId);

  return (
    <>
      {kindred && (
        <Panel open>
          <Header
            title={kindred.name}
            buttons={
              <>
                <UnitActions unitId={unitId} />
                {isTorpor && <TorporAwakeningUnit unitId={unitId} />}
                <EditKindred kindredId={unitId} />
              </>
            }
            onClose={() => selectUnit(null)}
          />
          {/* Заметки */}
          {translate("details.notes")}
          <TextArea
            value={kindredDetails.notes}
            onChange={(ev) => editNotes(unitId, ev.target.value)}
            rows={5}
          />
          <Body>
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
          </Body>
        </Panel>
      )}
    </>
  );
};
