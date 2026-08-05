import styled from "@emotion/styled";
import { RightPanel } from "commonComponents/RightPanel";
import { EditKindredForm } from "components/edit/EditKindredForm";
import { EditKindred } from "components/edit/EditKindred";
import { clanes } from "data/clanes";
import { initialKindred } from "data/initialKindred";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useKindredSelector } from "store/selectors";
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

export const KindredDetails: FC<TProps> = ({ selectedUnitId }) => {
  const { translate } = useTranslate();
  const { addUnit, selectUnit } = useActions();
  const kindred = useKindredSelector(selectedUnitId);

  return (
    <>
      {kindred && (
        <StyledPanel open>
          <Header
            title={translate("details.title")}
            buttons={<EditKindred kindredId={selectedUnitId} />}
            onClose={() => selectUnit(null)}
          />
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
