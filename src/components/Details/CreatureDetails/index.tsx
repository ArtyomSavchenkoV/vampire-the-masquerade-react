import { FC } from "react";
import { TDetailsTab } from "..";
import { MainInfo } from "./MainInfo";
import { ExtendedInfo } from "./ExtendedInfo";
import { HasNotDisciplines } from "../common/HasNotDisciplines";

interface TProps {
  unitId: string;
  tab: TDetailsTab;
}

export const CreatureDetails: FC<TProps> = ({ unitId, tab }) => {
  return (
    <>
      {tab === "main_info" && <MainInfo unitId={unitId} />}
      {tab === "extended_info" && <ExtendedInfo unitId={unitId} />}
      {tab === "disciplines" && <HasNotDisciplines />}
    </>
  );
};
