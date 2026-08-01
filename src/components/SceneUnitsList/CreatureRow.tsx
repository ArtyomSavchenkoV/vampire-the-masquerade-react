import { Td } from "baseComponents/Td";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { FC, memo, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { useCreatureRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { useActions } from "store/selectors";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { EditInitiative } from "components/EditInitiative";

interface TProps {
  id: string;
}

export const CreatureRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const { removeUnit, setInitiative, focusUnit } = useActions();
  const creatureRow = useCreatureRowSelector(id);

  useEffect(() => {
    if (
      creatureRow &&
      (creatureRow.healthLevel === "finalDeath" ||
        creatureRow.healthLevel === "incapacitated") &&
      creatureRow.initiative != null
    ) {
      setInitiative({ id, initiative: null });
    }
  }, [creatureRow, setInitiative, id]);

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
      {/* Инициатива */}
      <Td>
        {creatureRow.healthLevel !== "finalDeath" &&
          creatureRow.healthLevel !== "incapacitated" && (
            <EditInitiative unitId={id}>
              {creatureRow.initiative ?? translate("unitRow.initiative")}
            </EditInitiative>
          )}
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
