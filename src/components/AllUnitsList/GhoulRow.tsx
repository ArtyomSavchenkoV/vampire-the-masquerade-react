import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import { useGhoulRowSelector } from "./selectors";
import { CheckBox } from "baseComponents/CheckBox";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { MAX_HEALTH } from "data/ghoulHealthLevels";

interface TProps {
  id: string;
}

export const GhoulRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const ghoulRow = useGhoulRowSelector(id);
  const { selectUnit, addToScene, removeFromScene, removeUnit } = useActions();
  if (!ghoulRow) {
    return (
      <ErrorIndicator>Ошибка GhoulRow: нет данных ghoulRow</ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isSelected={ghoulRow.isSelected}
      onClick={() => selectUnit(ghoulRow.isSelected ? null : id)}
    >
      {/* Переключатель участия в сцене */}
      <Td>
        <CheckBox
          checked={ghoulRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(ev) => {
            ev.target.checked ? addToScene(id) : removeFromScene(id);
          }}
        />
      </Td>

      {/* Имя персонажа */}
      <Td>{ghoulRow.name}</Td>

      {/* Имя игрока */}
      <Td>{ghoulRow.player}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.ghoul")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${MAX_HEALTH - ghoulRow.bodyDamages.length}/${MAX_HEALTH}, `}
        {`${translate("resources.willpower")}: ${ghoulRow.willpower}, `}
        {`${translate("resources.bloodPool")}: ${ghoulRow.bloodPool}`}
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
