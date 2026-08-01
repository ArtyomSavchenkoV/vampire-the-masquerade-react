import { Td } from "baseComponents/Td";
import { FC, memo, useEffect } from "react";
import { useKindredRowSelector } from "./selectors";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { MAX_HEALTH } from "domain/kindred/Health";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { EditInitiative } from "components/EditInitiative";

interface TProps {
  id: string;
}

export const KindredRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const kindredRow = useKindredRowSelector(id);
  const { selectUnit, setInitiative } = useActions();

  useEffect(() => {
    if (
      kindredRow &&
      (kindredRow.healthLevel === "finalDeath" ||
        kindredRow.healthLevel === "torpor" ||
        kindredRow.healthLevel === "incapacitated") &&
      kindredRow.initiative != null
    ) {
      setInitiative({ id, initiative: null });
    }
  }, [kindredRow, setInitiative, id]);

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
      {/* Инициатива */}
      <Td>
        {kindredRow.healthLevel !== "torpor" &&
          kindredRow.healthLevel !== "finalDeath" &&
          kindredRow.healthLevel !== "incapacitated" && (
            <EditInitiative onClick={(ev) => ev.stopPropagation()} unitId={id}>
              {kindredRow.initiative ?? translate("unitRow.initiative")}
            </EditInitiative>
          )}
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
      <Td></Td>
    </StyledRow>
  );
});
