import { Td } from "baseComponents/Td";
import { FC, memo, useEffect } from "react";
import { useGhoulRowSelector } from "./selectors";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";
import { EditInitiative } from "components/EditInitiative";
import { MAX_HEALTH } from "data/ghoulHealthLevels";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { UnitActions } from "components/UnitActions";

interface TProps {
  id: string;
}

export const GhoulRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const ghoulRow = useGhoulRowSelector(id);
  const { selectUnit, setInitiative } = useActions();

  useEffect(() => {
    if (ghoulRow && ghoulRow.isIncapacitated && ghoulRow.initiative != null) {
      setInitiative({ id, initiative: null });
    }
  }, [ghoulRow, setInitiative, id]);

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
      {/* Инициатива */}
      <ButtonsTd>
        {!ghoulRow.isIncapacitated && (
          <EditInitiative onClick={(ev) => ev.stopPropagation()} unitId={id}>
            {ghoulRow.initiative ?? translate("unitRow.initiative")}
          </EditInitiative>
        )}
      </ButtonsTd>

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
      <ButtonsTd>
        {/* Действия над персонажем */}
        <UnitActions unitId={id} />
      </ButtonsTd>
    </StyledRow>
  );
});
