import { Td } from "baseComponents/Td";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { FC, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useCreatureRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { useActions } from "store/selectors";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { TableCheckbox } from "commonComponents/TableCheckbox";
import { UnitActions } from "components/UnitActions";

interface TProps {
  id: string;
}

export const CreatureRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const creatureRow = useCreatureRowSelector(id);
  const { selectUnit, addToScene, removeFromScene } = useActions();
  if (!creatureRow) {
    return (
      <ErrorIndicator>
        Ошибка CreatureRow: нет данных creatureRow
      </ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isSelected={creatureRow.isSelected}
      onClick={() => selectUnit(creatureRow.isSelected ? null : id)}
    >
      {/* Переключатель участия в сцене */}
      <ButtonsTd>
        <TableCheckbox
          checked={creatureRow.isOnScene}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={(checked) => {
            checked ? addToScene(id) : removeFromScene(id);
          }}
        />
      </ButtonsTd>

      {/* Имя персонажа */}
      <Td>{creatureRow.name}</Td>

      {/* Имя игрока */}
      <Td>{creatureRow.player}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.creature")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${creatureRow.maxHealth - creatureRow.bodyWounds.length}/${creatureRow.maxHealth}, `}
        {`${translate("resources.willpower")}: ${creatureRow.willpower}, `}
      </Td>

      {/* Кнопки */}
      <ButtonsTd>
        {/* Действия над персонажем */}
        <UnitActions unitId={id} />
      </ButtonsTd>
    </StyledRow>
  );
});
