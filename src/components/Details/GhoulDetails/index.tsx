import { FC } from "react";
import { TDetailsTab } from "..";
import { MainInfo } from "./MainInfo";
import { Disciplines } from "./Disciplines";
import { ExtendedInfo } from "./ExtendedInfo";

interface TProps {
  unitId: string;
  tab: TDetailsTab;
}

export const GhoulDetails: FC<TProps> = ({ unitId, tab }) => {
  return (
    <>
      {tab === "main_info" && <MainInfo unitId={unitId} />}
      {tab === "extended_info" && <ExtendedInfo unitId={unitId} />}
      {tab === "disciplines" && <Disciplines unitId={unitId} />}
    </>
  );
};
