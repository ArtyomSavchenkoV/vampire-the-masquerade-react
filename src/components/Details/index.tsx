import { FC } from "react";
import { useDetailsSelector } from "./selectors";
import { KindredDetails } from "./KindredDetails";
import { HumanDetails } from "./HumanDetails";

interface TProps {}

export const Details: FC<TProps> = () => {
  const selectedUnit = useDetailsSelector();
  return (
    <>
      {selectedUnit?.type === "kindred" && (
        <KindredDetails selectedUnitId={selectedUnit.id} />
      )}
      {selectedUnit?.type === "human" && (
        <HumanDetails selectedUnitId={selectedUnit.id} />
      )}
      {selectedUnit?.type === "creature" && null}
    </>
  );
};
