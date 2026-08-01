import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import { useKindredRowSelector } from "./selectors";
import { CheckBox } from "baseComponents/CheckBox";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { MAX_HEALTH } from "domain/kindred/Health";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";

interface TProps {
  id: string;
}

export const KindredRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const kindredRow = useKindredRowSelector(id);
  const { selectUnit, addToScene, removeFromScene, removeUnit } = useActions();
  if (!kindredRow) {
    return (
      <ErrorIndicator>Ошибка KindredRow: нет данных kindredRow</ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isFocused={kindredRow.isFocused}
      onClick={() => selectUnit(kindredRow.isFocused ? null : id)}
    >
      {/* Переключатель участия в сцене */}
      <Td>
        <CheckBox
          checked={kindredRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(ev) => {
            ev.target.checked ? addToScene(id) : removeFromScene(id);
          }}
        />
      </Td>

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
      <Td>
        <ConfirmingButton
          onClick={(ev) => ev.stopPropagation()}
          onConfirm={() => removeUnit(id)}
          confirmWindowTitle={translate("unitRow.remove")}
          confirmWindowContent={translate(
            "unitRow.removeUnitConfirmingMessage",
          )}
        >
          {translate("unitRow.remove")}
        </ConfirmingButton>
      </Td>
    </StyledRow>
  );
});
