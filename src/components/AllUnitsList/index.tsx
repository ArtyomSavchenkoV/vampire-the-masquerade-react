import { Table } from "baseComponents/Table";
import { FC, Fragment } from "react";
import { useAllUnitsSelector } from "./selectors";
import { KindredRow } from "./KindredRow";
import { HumanRow } from "./HumanRow";
import { CreatureRow } from "./CreatureRow";
import { ColGroup } from "baseComponents/ColGroup";
import { Tbody } from "baseComponents/Tbody";

// Ширины колонок
const columnWidths = [
  /** Чекбокс */
  40,
  /** Имя */
  100,
  /** Игрок */
  60,
  /** Тип */
  100,
  /** Ресурсы */
  "auto",
  /** Кнопки */
  80,
] as const;

interface TProps {}
export const AllUnitsList: FC<TProps> = () => {
  const allUnits = useAllUnitsSelector();
  return (
    <Table>
      {/* Компонент устанавливает ширину столбцов */}
      <ColGroup widths={columnWidths} />
      {/* Список участников */}
      <Tbody>
        {allUnits.map(({ id, type }) => (
          <Fragment key={id}>
            {type === "kindred" && <KindredRow id={id} />}
            {type === "human" && <HumanRow id={id} />}
            {type === "creature" && <CreatureRow id={id} />}
          </Fragment>
        ))}
      </Tbody>
    </Table>
  );
};
