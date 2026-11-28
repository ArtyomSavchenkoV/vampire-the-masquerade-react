import styled from "@emotion/styled";
import { Tr } from "baseComponents/Tr";
import { colorMix } from "utils/styles/colorMix";

export const StyledRow = styled(Tr)<{ isSelected: boolean }>(
  ({ isSelected, theme }) => ({
    backgroundColor: isSelected
      ? colorMix(theme.palette.sapphire, "transparent", 85)
      : "transparent",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: isSelected
        ? colorMix(theme.palette.sapphire, "transparent", 75)
        : colorMix("transparent", theme.palette.shift, 10),
    },
  }),
);
