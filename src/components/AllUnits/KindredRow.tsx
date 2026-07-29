import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import { useKindredRowSelector } from "./selectors";
import { CheckBox } from "baseComponents/CheckBox";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "./StyledRow";
import { MAX_HEALTH } from "domain/kindred/Health";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";

interface TProps {
  id: string;
}

export const KindredRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const kindredRow = useKindredRowSelector(id);
  const { focusUnit, addToScene, removeFromScene } = useActions();
  if (!kindredRow) {
    return (
      <ErrorIndicator>Ошибка KindredRow: нет данных kindredRow</ErrorIndicator>
    );
  }
  return (
    <StyledRow
      isFocused={kindredRow.isFocused}
      onClick={() => focusUnit(kindredRow.isFocused ? null : id)}
    >
      {/* Переключатель участия в сцене */}
      <Td>
        <CheckBox
          checked={kindredRow.isOnScene}
          onChange={(ev) => {
            ev.stopPropagation();
            ev.target.checked ? removeFromScene(id) : addToScene(id);
          }}
        />
      </Td>

      {/* Имя персонажа */}
      <Td>{kindredRow.name}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.kindred")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${MAX_HEALTH - kindredRow.bodyDamages.length}/${MAX_HEALTH}, `}
        {`${translate("resources.willpower")}: ${kindredRow.willpower}, `}
        {`${translate("resources.bloodPool")}: ${kindredRow.bloodPool}`}
      </Td>
    </StyledRow>
  );
});
