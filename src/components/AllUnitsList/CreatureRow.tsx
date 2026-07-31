import { CheckBox } from "baseComponents/CheckBox";
import { Td } from "baseComponents/Td";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { FC, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useCreatureRowSelector } from "./selectors";
import { StyledRow } from "./StyledRow";
import { useActions } from "store/selectors";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";

interface TProps {
  id: string;
}

export const CreatureRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const { removeUnit } = useActions();
  const creatureRow = useCreatureRowSelector(id);
  const { focusUnit, addToScene, removeFromScene } = useActions();
  if (!creatureRow) {
    return (
      <ErrorIndicator>
        Ошибка CreatureRow: нет данных creatureRow
      </ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isFocused={creatureRow.isFocused}
      onClick={() => focusUnit(creatureRow.isFocused ? null : id)}
    >
      {/* Переключатель участия в сцене */}
      <Td>
        <CheckBox
          checked={creatureRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(ev) => {
            ev.target.checked ? addToScene(id) : removeFromScene(id);
          }}
        />
      </Td>

      {/* Имя персонажа */}
      <Td>{creatureRow.name}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.creature")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${creatureRow.maxHealth - creatureRow.bodyDamages.length}/${creatureRow.maxHealth}, `}
        {`${translate("resources.willpower")}: ${creatureRow.willpower}, `}
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
