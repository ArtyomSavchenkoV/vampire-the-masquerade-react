import { Td } from "baseComponents/Td";
import { FC, memo, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { EditInitiative } from "components/EditInitiative";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { UnitActions } from "components/UnitActions";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";

interface TProps {
  id: string;
}

export const HumanRow: FC<TProps> = withErrorBoundary(
  memo(({ id }) => {
    const { translate } = useTranslate();
    const { setInitiative, selectUnit } = useActions();
    const humanRow = useHumanRowSelector(id);

    useEffect(() => {
      if (humanRow.isIncapacitated && humanRow.initiative != null) {
        setInitiative({ id, initiative: null });
      }
    }, [humanRow, setInitiative, id]);

    return (
      <StyledRow
        isSelected={humanRow.isSelected}
        onClick={() => selectUnit(humanRow.isSelected ? null : id)}
      >
        {/* Инициатива */}
        <ButtonsTd>
          {!humanRow.isIncapacitated && (
            <EditInitiative unitId={id}>
              {humanRow.initiative ?? translate("unitRow.initiative")}
            </EditInitiative>
          )}
        </ButtonsTd>

        {/* Имя персонажа */}
        <Td>{humanRow.name}</Td>

        {/* Имя игрока */}
        <Td>{humanRow.player}</Td>

        {/* Тип персонажа */}
        <Td>{translate("unitTypes.human")}</Td>

        {/* Ресурсы персонажа */}
        <Td>
          {`${translate("resources.health")}: ${humanRow.maxHealth - humanRow.bodyWounds.length}/${humanRow.maxHealth}, `}
          {`${translate("resources.willpower")}: ${humanRow.willpower}, `}
        </Td>

        {/* Кнопки */}
        <ButtonsTd>
          {/* Действия над персонажем */}
          <UnitActions unitId={id} />
        </ButtonsTd>
      </StyledRow>
    );
  }),
);
