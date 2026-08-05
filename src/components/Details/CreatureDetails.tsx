import styled from "@emotion/styled";
import { RightPanel } from "commonComponents/RightPanel";
import { EditCreatureForm } from "components/edit/EditCreatureForm";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useCreatureSelector } from "store/selectors";
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

export const CreatureDetails: FC<TProps> = ({ selectedUnitId }) => {
  const { translate } = useTranslate();
  const { addUnit, selectUnit } = useActions();
  const creature = useCreatureSelector(selectedUnitId);

  return (
    <>
      {creature && (
        <StyledPanel open>
          <Header
            title={translate("details.title")}
            onClose={() => selectUnit(null)}
          />
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
