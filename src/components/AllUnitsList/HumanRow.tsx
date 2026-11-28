import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHumanRowSelector } from "./selectors";
import { StyledRow } from "commonComponents/StyledRow";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { Checkbox } from "baseComponents/Checkbox";
import { UnitActions } from "components/UnitActions";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";
import { UnitsListDescription } from "commonComponents/UnitsListDescription";

interface TProps {
  id: string;
}

export const HumanRow: FC<TProps> = withErrorBoundary(
  memo(({ id }) => {
    const { translate } = useTranslate();
    const humanRow = useHumanRowSelector(id);
    const { selectUnit, addToScene, removeFromScene } = useActions();

    return (
      <StyledRow
        isSelected={humanRow.isSelected}
        onClick={() => selectUnit(humanRow.isSelected ? null : id)}
      >
        {/* Переключатель участия в сцене */}
        <ButtonsTd>
          <Checkbox
            checked={humanRow.isOnScene}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            onChange={(checked) => {
              checked ? addToScene(id) : removeFromScene(id);
            }}
          />
        </ButtonsTd>

        {/* Имя персонажа */}
        <Td>{humanRow.name}</Td>

        {/* Имя игрока или амплуа */}
        <Td>{humanRow.player?.trim() || humanRow.role}</Td>

        {/* Тип персонажа */}
        <Td>{translate("unitTypes.human")}</Td>

        {/* Описание */}
        <Td>
          <UnitsListDescription>{humanRow.notes}</UnitsListDescription>
        </Td>

        {/* Ресурсы персонажа */}
        <Td>
          {`${translate("resources.health")}: ${humanRow.maxHealth - humanRow.bodyWounds.length}/${humanRow.maxHealth},`}
          <> </>
          {`${translate("resources.willpower")}: ${humanRow.willpower},`}
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
