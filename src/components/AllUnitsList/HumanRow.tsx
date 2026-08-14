import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { TableCheckbox } from "commonComponents/TableCheckbox";
import { IconButton } from "baseComponents/IconButton";
import TrashBinIcon from "icons/TrashBinIcon";
import { HealUnit } from "components/HealUnit";
import { DamageUnit } from "components/DamageUnit";

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
      <ButtonsTd>
        <TableCheckbox
          checked={humanRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(checked) => {
            checked ? addToScene(id) : removeFromScene(id);
          }}
        />
      </ButtonsTd>

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
      <ButtonsTd>
        {/* Нанести урон персонажу */}
        <DamageUnit unitId={id} onClick={(ev) => ev.stopPropagation()} />

        {/* Лечить персонажа */}
        <HealUnit unitId={id} onClick={(ev) => ev.stopPropagation()} />

        {/* Удалить персонажа */}
        <ConfirmingButton
          onClick={(ev) => ev.stopPropagation()}
          onConfirm={() => removeUnit(id)}
          confirmWindowTitle={translate("unitRow.remove")}
          confirmWindowContent={translate(
            "unitRow.removeUnitConfirmingMessage",
          )}
          ButtonComponent={IconButton}
        >
          <TrashBinIcon />
        </ConfirmingButton>
      </ButtonsTd>
    </StyledRow>
  );
});
