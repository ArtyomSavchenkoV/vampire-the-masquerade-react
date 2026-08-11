import { FC } from "react";
import { useDetailsSelector } from "./selectors";
import { KindredDetails } from "./KindredDetails";
import { HumanDetails } from "./HumanDetails";
import { CreatureDetails } from "./CreatureDetails";
import { GhoulDetails } from "./GhoulDetails";

interface TProps {}

export const Details: FC<TProps> = () => {
  const selectedUnit = useDetailsSelector();
  return (
    <>
      {selectedUnit?.type === "kindred" && (
        <KindredDetails unitId={selectedUnit.id} />
      )}
      {selectedUnit?.type === "ghoul" && (
        <GhoulDetails unitId={selectedUnit.id} />
      )}
      {selectedUnit?.type === "human" && (
        <HumanDetails unitId={selectedUnit.id} />
      )}
      {selectedUnit?.type === "creature" && (
        <CreatureDetails unitId={selectedUnit.id} />
      )}
    </>
  );
};
