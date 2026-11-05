import { FC } from "react";
import { useDisciplinesSelector } from "./selectors";
import { Disciplines as CommonDisciplines } from "../common/Disciplines";

interface TProps {
  unitId: string;
}

export const Disciplines: FC<TProps> = ({ unitId }) => {
  const data = useDisciplinesSelector(unitId);
  return (
    <div>
      <CommonDisciplines
        disciplines={data.disciplines}
        acquiredDisciplines={data.acquiredDisciplines}
      />
    </div>
  );
};
