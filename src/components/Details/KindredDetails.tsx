import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { RightPanel } from "commonComponents/RightPanel";
import { EditKindred } from "components/kindred/EditKindred";
import { EditKindredForm } from "components/kindred/EditKindredForm";
import { clanes } from "data/clanes";
import { initialKindred } from "data/initialKindred";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useKindredSelector } from "store/selectors";

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

export const KindredDetails: FC<TProps> = ({ selectedUnitId }) => {
  const { translate } = useTranslate();
  const { addUnit, selectUnit } = useActions();
  const kindred = useKindredSelector(selectedUnitId);

  return (
    <>
      {kindred && (
        <StyledPanel open>
          <Header>
            <CloseButton onClick={() => selectUnit(null)}>x</CloseButton>
            {translate("details.title")}
            <EditKindred kindredId={selectedUnitId} />
          </Header>
          <EditKindredForm
            kindred={kindred}
            onChange={(kindred) =>
              addUnit(selectedUnitId, {
                type: "kindred",
                unit: kindred,
              })
            }
            onClanChange={(clanName) => {
              addUnit(selectedUnitId, {
                type: "kindred",
                unit: {
                  ...initialKindred,
                  clan: clanes[clanName],
                },
              });
            }}
          />
        </StyledPanel>
      )}
    </>
  );
};
