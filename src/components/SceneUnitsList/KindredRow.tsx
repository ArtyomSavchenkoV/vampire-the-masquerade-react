import { Td } from "baseComponents/Td";
import { FC, memo, useEffect } from "react";
import { useKindredRowSelector } from "./selectors";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { EditInitiative } from "components/EditInitiative";
import { MAX_HEALTH } from "data/kindredHealthLevels";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { UnitActions } from "components/UnitActions";

interface TProps {
  id: string;
}

export const KindredRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const kindredRow = useKindredRowSelector(id);
  const { selectUnit, setInitiative } = useActions();

  useEffect(() => {
    if (
      kindredRow &&
      kindredRow.isIncapacitated &&
      kindredRow.initiative != null
    ) {
      setInitiative({ id, initiative: null });
    }
  }, [kindredRow, setInitiative, id]);

  if (!kindredRow) {
    return (
      <ErrorIndicator>Ошибка KindredRow: нет данных kindredRow</ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isSelected={kindredRow.isSelected}
      onClick={() => selectUnit(kindredRow.isSelected ? null : id)}
    >
      {/* Инициатива */}
      <ButtonsTd>
        {!kindredRow.isIncapacitated && (
          <EditInitiative onClick={(ev) => ev.stopPropagation()} unitId={id}>
            {kindredRow.initiative ?? translate("unitRow.initiative")}
          </EditInitiative>
        )}
      </ButtonsTd>

      {/* Имя персонажа */}
      <Td>{kindredRow.name}</Td>

      {/* Имя игрока */}
      <Td>{kindredRow.player}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.kindred")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${MAX_HEALTH - kindredRow.bodyDamages.length}/${MAX_HEALTH}, `}
        {`${translate("resources.willpower")}: ${kindredRow.willpower}, `}
        {`${translate("resources.bloodPool")}: ${kindredRow.bloodPool}`}
      </Td>

      {/* Кнопки */}
      <ButtonsTd>
        {/* Действия над персонажем */}
        <UnitActions unitId={id} />
      </ButtonsTd>
    </StyledRow>
  );
});
