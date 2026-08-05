import { Td } from "baseComponents/Td";
import { FC, memo, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { EditInitiative } from "components/EditInitiative";

interface TProps {
  id: string;
}

export const HumanRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const { setInitiative, selectUnit } = useActions();
  const humanRow = useHumanRowSelector(id);

  useEffect(() => {
    if (humanRow && humanRow.isIncapacitated && humanRow.initiative != null) {
      setInitiative({ id, initiative: null });
    }
  }, [humanRow, setInitiative, id]);

  if (!humanRow) {
    return (
      <ErrorIndicator>Ошибка HumanRow: нет данных humanRow</ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isSelected={humanRow.isSelected}
      onClick={() => selectUnit(humanRow.isSelected ? null : id)}
    >
      {/* Инициатива */}
      <Td>
        {!humanRow.isIncapacitated && (
          <EditInitiative unitId={id}>
            {humanRow.initiative ?? translate("unitRow.initiative")}
          </EditInitiative>
        )}
      </Td>

      {/* Имя персонажа */}
      <Td>{humanRow.name}</Td>

      {/* Имя игрока */}
      <Td>{humanRow.player}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.human")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${humanRow.maxHealth - humanRow.bodyDamages.length}/${humanRow.maxHealth}, `}
        {`${translate("resources.willpower")}: ${humanRow.willpower}, `}
      </Td>

      {/* Кнопки */}
      <Td></Td>
    </StyledRow>
  );
});
