import { FC } from "react";
import { useDisciplinesSelector } from "./selectors";

interface TProps {
  unitId: string;
}

export const Disciplines: FC<TProps> = ({ unitId }) => {
  const data = useDisciplinesSelector(unitId);
  return <div>Disciplines {!!data}</div>;
};
