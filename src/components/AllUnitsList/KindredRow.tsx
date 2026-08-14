import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import { useKindredRowSelector } from "./selectors";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { MAX_HEALTH } from "data/kindredHealthLevels";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { TableCheckbox } from "commonComponents/TableCheckbox";
import { IconButton } from "baseComponents/IconButton";
import TrashBinIcon from "icons/TrashBinIcon";
import { HealUnit } from "components/HealUnit";
import { DamageUnit } from "components/DamageUnit";

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
      isSelected={kindredRow.isSelected}
      onClick={() => selectUnit(kindredRow.isSelected ? null : id)}
    >
      {/* Переключатель участия в сцене */}
      <ButtonsTd>
        <TableCheckbox
          checked={kindredRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(checked) => {
            checked ? addToScene(id) : removeFromScene(id);
          }}
        />
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
