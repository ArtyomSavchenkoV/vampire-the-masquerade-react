import styled from "@emotion/styled";
import { RightPanel } from "commonComponents/RightPanel";
import { EditHumanForm } from "components/edit/EditHumanForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useHumanSelector } from "store/selectors";
import { Header } from "./common/Header";

const StyledPanel = styled(RightPanel)`
  padding: 24px;
  max-width: calc(60% - 48px);
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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
        <StyledPanel open>
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
        </StyledPanel>
      )}
    </>
  );
};
