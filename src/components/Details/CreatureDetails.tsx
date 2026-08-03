import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { RightPanel } from "commonComponents/RightPanel";
import { EditCreatureForm } from "components/edit/EditCreatureForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useCreatureSelector } from "store/selectors";

const StyledPanel = styled(RightPanel)`
  padding: 24px;
  max-width: calc(60% - 48px);
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  font-size: 2em;
  display: flex;
  gap: 24px;
`;

const CloseButton = styled(Button)`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TProps {
  selectedUnitId: string;
}

export const CreatureDetails: FC<TProps> = ({ selectedUnitId }) => {
  const { translate } = useTranslate();
  const { addUnit, selectUnit } = useActions();
  const creature = useCreatureSelector(selectedUnitId);

  return (
    <>
      {creature && (
        <StyledPanel open>
          <Header>
            <CloseButton onClick={() => selectUnit(null)}>x</CloseButton>
            {translate("details.title")}
          </Header>
          <EditCreatureForm
            creature={creature}
            onChange={(creature) =>
              addUnit(selectedUnitId, {
                type: "creature",
                unit: creature,
              })
            }
          />
        </StyledPanel>
      )}
    </>
  );
};
