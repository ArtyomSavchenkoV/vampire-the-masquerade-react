import { CheckBox } from "baseComponents/CheckBox";
import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { MAX_HEALTH } from "data/humanHealthLevels";

interface TProps {
  id: string;
}

export const HumanRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const humanRow = useHumanRowSelector(id);
  const { selectUnit, addToScene, removeFromScene, removeUnit } = useActions();
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
      {/* Переключатель участия в сцене */}
      <Td>
        <CheckBox
          checked={humanRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(ev) => {
            ev.target.checked ? addToScene(id) : removeFromScene(id);
          }}
        />
      </Td>

      {/* Имя персонажа */}
      <Td>{humanRow.name}</Td>

      {/* Имя игрока */}
      <Td>{humanRow.player}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.human")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${MAX_HEALTH - humanRow.bodyDamages.length}/${MAX_HEALTH}, `}
        {`${translate("resources.willpower")}: ${humanRow.willpower}, `}
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
