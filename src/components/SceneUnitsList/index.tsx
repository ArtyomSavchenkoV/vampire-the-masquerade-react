import { Table } from "baseComponents/Table";
import { FC, Fragment } from "react";
import { useSceneUnitsSelector } from "./selectors";
import { ColGroup } from "baseComponents/ColGroup";
import { CreatureRow } from "./CreatureRow";
import { HumanRow } from "./HumanRow";
import { KindredRow } from "./KindredRow";

// Ширины колонок
const columnWidths = [
  /** Инициатива */
  40,
  /** Имя */
  160,
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
    <>
      {/* Таблица */}
      <Table>
        {/* Компонент устанавливает ширину столбцов */}
        <ColGroup widths={columnWidths} />
        {/* Список участников */}
        <tbody>
          {sceneUnits.map(({ id, type }) => (
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
