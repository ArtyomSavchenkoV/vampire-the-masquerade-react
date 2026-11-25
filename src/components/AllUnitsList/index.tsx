import { Table } from "baseComponents/Table";
import { FC, Fragment } from "react";
import { useAllUnitsSelector } from "./selectors";
import { KindredRow } from "./KindredRow";
import { HumanRow } from "./HumanRow";
import { CreatureRow } from "./CreatureRow";
import { ColGroup } from "baseComponents/ColGroup";
import { Tbody } from "baseComponents/Tbody";
import { GhoulRow } from "./GhoulRow";

// Ширины колонок
const columnWidths = [
  /** Чекбокс */
  40,
  /** Имя */
  100,
  /** Игрок/Амплуа */
  60,
  /** Тип/Клан */
  100,
  /** Описание */
  "auto",
  /** Ресурсы */
  300,
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
            {type === "ghoul" && <GhoulRow id={id} />}
            {type === "human" && <HumanRow id={id} />}
            {type === "creature" && <CreatureRow id={id} />}
          </Fragment>
        ))}
      </Tbody>
    </Table>
  );
};
