import { FC } from "react";
import { TDetailsTab } from "..";
import { MainInfo } from "./MainInfo";
import { ExtendedInfo } from "./ExtendedInfo";
import { Disciplines } from "./Disciplines";

interface TProps {
  unitId: string;
  tab: TDetailsTab;
}

export const KindredDetails: FC<TProps> = ({ unitId, tab }) => {
  return (
    <>
      {tab === "main_info" && <MainInfo unitId={unitId} />}
      {tab === "extended_info" && <ExtendedInfo unitId={unitId} />}
      {tab === "disciplines" && <Disciplines unitId={unitId} />}
    </>
  );
};
