import { Table } from "baseComponents/Table";
import { FC, Fragment } from "react";
import { useSceneUnitsSelector } from "./selectors";
import { ColGroup } from "baseComponents/ColGroup";
import { CreatureRow } from "./CreatureRow";
import { HumanRow } from "./HumanRow";
import { KindredRow } from "./KindredRow";
import { Tbody } from "baseComponents/Tbody";
import { GhoulRow } from "./GhoulRow";

// Ширины колонок
const columnWidths = [
  /** Инициатива */
  100,
  /** Имя */
  100,
  /** Игрок */
  60,
  /** Тип */
  100,
  /** Ресурсы */
  "auto",
  /** Кнопки */
  200,
] as const;

interface TProps {}

export const SceneUnitsList: FC<TProps> = () => {
  const sceneUnits = useSceneUnitsSelector();
  return (
    <Table>
      {/* Компонент устанавливает ширину столбцов */}
      <ColGroup widths={columnWidths} />
      {/* Список участников */}
      <Tbody>
        {sceneUnits.map(({ id, type }) => (
          <Fragment key={id}>
            {type === "kindred" && <KindredRow id={id} />}
            {type === "ghoul" && <GhoulRow id={id} />}
            {type === "human" && <HumanRow id={id} />}
            {type === "creature" && <CreatureRow id={id} />}
          </Fragment>
        ))}
      </Tbody>
    </Table>
  );
};
