import { Table } from "baseComponents/Table";
import { FC } from "react";
import { useAllUnitsSelector } from "./selectors";
import { KindredRow } from "./KindredRow";
import { HumanRow } from "./HumanRow";
import { CreatureRow } from "./CreatureRow";

interface TProps {}
export const AllUnits: FC<TProps> = () => {
  const allUnits = useAllUnitsSelector();
  return (
    <>
      {/* Таблица */}
      <Table>
        {allUnits.map(({ id, type }) => (
          <>
            {type === "kindred" && <KindredRow key={id} id={id} />}
            {type === "human" && <HumanRow key={id} id={id} />}
            {type === "creature" && <CreatureRow key={id} id={id} />}
          </>
        ))}
      </Table>
      {/* Карточка */}
    </>
  );
};
