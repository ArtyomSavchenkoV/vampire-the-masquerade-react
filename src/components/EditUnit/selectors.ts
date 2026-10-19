import { useMemo } from "react";
import { useUnitSelector } from "store/selectors";

export const useEditUnitSelector = (id: string) => {
  const unitType = useUnitSelector(id).type;

  return useMemo(
    () => ({
      unitType,
    }),
    [unitType],
  );
};
