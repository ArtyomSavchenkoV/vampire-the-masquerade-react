import { EditHumanForm } from "components/edit/EditHumanForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useHumanSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";

interface TProps {
  selectedUnitId: string;
}

export const HumanDetails: FC<TProps> = ({ selectedUnitId }) => {
  const { translate } = useTranslate();
  const { addUnit, selectUnit } = useActions();
  const human = useHumanSelector(selectedUnitId);

  return (
    <>
      {human && (
        <Panel open>
          <Header
            title={translate("details.title")}
            onClose={() => selectUnit(null)}
          />
          <EditHumanForm
            human={human}
            onChange={(human) =>
              addUnit(selectedUnitId, {
                type: "human",
                unit: human,
              })
            }
          />
        </Panel>
      )}
    </>
  );
};
