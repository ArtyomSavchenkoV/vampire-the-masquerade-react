import { CheckBox } from "baseComponents/CheckBox";
import { Td } from "baseComponents/Td";
import { MAX_HEALTH } from "domain/human/Health";
import { FC, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "./StyledRow";
import { ErrorIndicator } from "commonComponents/ErrorIndicator";

interface TProps {
  id: string;
}

export const HumanRow: FC<TProps> = memo(({ id }) => {
  const { translate } = useTranslate();
  const humanRow = useHumanRowSelector(id);
  const { focusUnit, addToScene, removeFromScene } = useActions();
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
      {/* Переключатель участия в сцене */}
      <Td>
        <CheckBox
          checked={humanRow.isOnScene}
          onChange={(ev) => {
            ev.stopPropagation();
            ev.target.checked ? removeFromScene(id) : addToScene(id);
          }}
        />
      </Td>

      {/* Имя персонажа */}
      <Td>{humanRow.name}</Td>

      {/* Тип персонажа */}
      <Td>{translate("unitTypes.kindred")}</Td>

      {/* Ресурсы персонажа */}
      <Td>
        {`${translate("resources.health")}: ${MAX_HEALTH - humanRow.bodyDamages.length}/${MAX_HEALTH}, `}
        {`${translate("resources.willpower")}: ${humanRow.willpower}, `}
      </Td>
    </StyledRow>
  );
});
