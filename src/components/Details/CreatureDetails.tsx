import { EditCreatureForm } from "components/edit/EditCreatureForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useCreatureSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";
import { useCreatureDetailsSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";

interface TProps {
  unitId: string;
}

export const CreatureDetails: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { editCreature, selectUnit, editNotes } = useActions();
  const creatureDetails = useCreatureDetailsSelector(unitId);
  // TODO: Временное отображение базовых данных
  const creature = useCreatureSelector(unitId);

  return (
    <>
      {creature && (
        <Panel open>
          <Header
            title={translate("details.title")}
            onClose={() => selectUnit(null)}
          />
          {/* Заметки */}
          <TextArea
            value={creatureDetails.notes}
            onChange={(ev) => editNotes(unitId, ev.target.value)}
            rows={5}
          />
          <EditCreatureForm
            creature={creature}
            onChange={(creature) => editCreature(unitId, creature)}
          />
        </Panel>
      )}
    </>
  );
};
