import { Td } from "baseComponents/Td";
import { FC, memo } from "react";
import { useGhoulRowSelector } from "./selectors";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { StyledRow } from "commonComponents/StyledRow";
import { MAX_HEALTH } from "data/ghoulHealthLevels";
import { ButtonsTd } from "commonComponents/ButtonsTd";
import { Checkbox } from "baseComponents/Checkbox";
import { UnitActions } from "components/UnitActions";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";
import { UnitsListDescription } from "commonComponents/UnitsListDescription";

interface TProps {
  id: string;
}

export const GhoulRow: FC<TProps> = withErrorBoundary(
  memo(({ id }) => {
    const { translate } = useTranslate();
    const ghoulRow = useGhoulRowSelector(id);
    const { selectUnit, addToScene, removeFromScene } = useActions();

    return (
      <StyledRow
        isSelected={ghoulRow.isSelected}
        onClick={() => selectUnit(ghoulRow.isSelected ? null : id)}
      >
        {/* Переключатель участия в сцене */}
        <ButtonsTd>
          <Checkbox
            checked={ghoulRow.isOnScene}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            onChange={(checked) => {
              checked ? addToScene(id) : removeFromScene(id);
            }}
          />
        </ButtonsTd>

        {/* Имя персонажа */}
        <Td>{ghoulRow.name}</Td>

        {/* Имя игрока или амплуа */}
        <Td>{ghoulRow.player?.trim() || ghoulRow.role}</Td>

        {/* Тип персонажа */}
        <Td>{translate("unitTypes.ghoul")}</Td>

        {/* Описание */}
        <Td>
          <UnitsListDescription>{ghoulRow.notes}</UnitsListDescription>
        </Td>

        {/* Ресурсы персонажа */}
        <Td>
          {`${translate("resources.health")}: ${MAX_HEALTH - ghoulRow.bodyWounds.length}/${MAX_HEALTH},`}
          <> </>
          {`${translate("resources.willpower")}: ${ghoulRow.willpower},`}
          <> </>
          {`${translate("resources.bloodPool")}: ${ghoulRow.bloodPool}`}
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
