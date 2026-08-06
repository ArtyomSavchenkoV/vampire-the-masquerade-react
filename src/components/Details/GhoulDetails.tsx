import { EditGhoulForm } from "components/edit/EditGhoulForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useGhoulSelector } from "store/selectors";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";

interface TProps {
  selectedUnitId: string;
}

export const GhoulDetails: FC<TProps> = ({ selectedUnitId }) => {
  const { translate } = useTranslate();
  const { addUnit, selectUnit } = useActions();
  const ghoul = useGhoulSelector(selectedUnitId);

  return (
    <>
      {ghoul && (
        <Panel open>
          <Header
            title={translate("details.title")}
            onClose={() => selectUnit(null)}
          />
          <EditGhoulForm
            ghoul={ghoul}
            onChange={(ghoul) =>
              addUnit(selectedUnitId, {
                type: "ghoul",
                unit: ghoul,
              })
            }
          />
        </Panel>
      )}
    </>
  );
};
