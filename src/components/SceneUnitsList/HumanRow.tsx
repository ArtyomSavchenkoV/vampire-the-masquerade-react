import { Td } from "baseComponents/Td";
import { MAX_HEALTH } from "domain/human/Health";
import { FC, memo, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { EditInitiative } from "components/EditInitiative";

interface TProps {
  id: string;
}

export const HumanRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const { removeUnit, setInitiative, focusUnit } = useActions();
  const humanRow = useHumanRowSelector(id);

  useEffect(() => {
    if (
      humanRow &&
      (humanRow.healthLevel === "finalDeath" ||
        humanRow.healthLevel === "incapacitated") &&
      humanRow.initiative != null
    ) {
      setInitiative({ id, initiative: null });
    }
  }, [humanRow, setInitiative, id]);

  if (!humanRow) {
    return (
      <ErrorIndicator>Ошибка HumanRow: нет данных humanRow</ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isFocused={humanRow.isFocused}
      onClick={() => focusUnit(humanRow.isFocused ? null : id)}
    >
      {/* Инициатива */}
      <Td>
        {humanRow.healthLevel !== "finalDeath" &&
          humanRow.healthLevel !== "incapacitated" && (
            <EditInitiative unitId={id}>
              {humanRow.initiative ?? translate("unitRow.initiative")}
            </EditInitiative>
          )}
      </Td>

      {/* Имя персонажа */}
      <Td>{humanRow.name}</Td>

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
