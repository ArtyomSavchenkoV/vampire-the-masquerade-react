import { Td } from "baseComponents/Td";
import { FC, memo, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { useCreatureRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { useActions } from "store/selectors";
import { EditInitiative } from "components/EditInitiative";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { UnitActions } from "components/UnitActions";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";
import { UnitsListDescription } from "commonComponents/UnitsListDescription";

interface TProps {
  id: string;
}

export const CreatureRow: FC<TProps> = withErrorBoundary(
  memo(({ id }) => {
    const { translate } = useTranslate();
    const { setInitiative, selectUnit } = useActions();
    const creatureRow = useCreatureRowSelector(id);

    useEffect(() => {
      if (creatureRow.isIncapacitated && creatureRow.initiative != null) {
        setInitiative({ id, initiative: null });
      }
    }, [creatureRow, setInitiative, id]);

    return (
      <StyledRow
        isSelected={creatureRow.isSelected}
        onClick={() => selectUnit(creatureRow.isSelected ? null : id)}
      >
        {/* Инициатива */}
        <ButtonsTd>
          {!creatureRow.isIncapacitated && (
            <EditInitiative unitId={id}>
              {creatureRow.initiative ?? translate("unitRow.initiative")}
            </EditInitiative>
          )}
        </ButtonsTd>

        {/* Имя персонажа */}
        <Td>{creatureRow.name}</Td>

        {/* Имя игрока или амплуа */}
        <Td>{creatureRow.player?.trim() || creatureRow.role}</Td>

        {/* Тип персонажа */}
        <Td>
          {creatureRow.animalSpecies?.trim() || translate("unitTypes.creature")}
        </Td>

        {/* Описание */}
        <Td>
          <UnitsListDescription>{creatureRow.notes}</UnitsListDescription>
        </Td>

        {/* Ресурсы персонажа */}
        <Td>
          {`${translate("resources.health")}: ${creatureRow.maxHealth - creatureRow.bodyWounds.length}/${creatureRow.maxHealth},`}
          <> </>
          {`${translate("resources.willpower")}: ${creatureRow.willpower},`}
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
