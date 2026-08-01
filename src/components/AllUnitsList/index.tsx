import { Table } from "baseComponents/Table";
import { FC, Fragment } from "react";
import { useAllUnitsSelector } from "./selectors";
import { KindredRow } from "./KindredRow";
import { HumanRow } from "./HumanRow";
import { CreatureRow } from "./CreatureRow";
import { ColGroup } from "baseComponents/ColGroup";

// Ширины колонок
const columnWidths = [
  /** Чекбокс */
  40,
  /** Имя */
  160,
  /** Игрок */
  160,
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
    <>
      {/* Таблица */}
      <Table>
        {/* Компонент устанавливает ширину столбцов */}
        <ColGroup widths={columnWidths} />
        {/* Список участников */}
        <tbody>
          {allUnits.map(({ id, type }) => (
            <Fragment key={id}>
              {type === "kindred" && <KindredRow id={id} />}
              {type === "human" && <HumanRow id={id} />}
              {type === "creature" && <CreatureRow id={id} />}
            </Fragment>
          ))}
        </tbody>
      </Table>
      {/* Карточка */}
    </>
  );
};
