import { EditHumanForm } from "commonComponents/editUnitForms/EditHumanForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useHumanSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";
import { useHumanDetailsSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";
import { UnitActions } from "components/UnitActions";
import styled from "@emotion/styled";

const Body = styled.div`
  overflow: auto;
  padding: 4px;
`;

interface TProps {
  unitId: string;
}

export const HumanDetails: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { editHuman, selectUnit, editNotes } = useActions();
  const humanDetails = useHumanDetailsSelector(unitId);
  // TODO: Временное отображение базовых данных
  const human = useHumanSelector(unitId);

  return (
    <>
      {human && (
        <Panel open>
          <Header
            title={human.name}
            onClose={() => selectUnit(null)}
            buttons={<UnitActions unitId={unitId} />}
          />
          {/* Заметки */}
          {translate("details.notes")}
          <TextArea
            value={humanDetails.notes}
            onChange={(ev) => editNotes(unitId, ev.target.value)}
            rows={5}
          />
          <Body>
            <EditHumanForm
              human={human}
              onChange={(human) => editHuman(unitId, human)}
            />
          </Body>
        </Panel>
      )}
    </>
  );
};
