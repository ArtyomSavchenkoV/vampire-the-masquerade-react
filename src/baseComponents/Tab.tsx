import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";
import { Button } from "./Button";

export const Tab = styled(Button)<{ isSelected: boolean }>(
  ({ isSelected, theme }) => ({
    fontSize: "1em",
    borderRadius: 0,
    border: "none",
    borderBottom: "3px solid transparent",
    borderBottomColor: isSelected
      ? theme.palette.sapphire
      : colorMix(theme.palette.buttonBackground, theme.palette.shift, 25),
    "&&:hover": {
      ...(isSelected
        ? {
            borderBottomColor: theme.palette.sapphire,
          }
        : {}),
    },
    backgroundColor: "transparent",
    fontWeight: isSelected ? 700 : 400,
    ":focus-visible": {
      borderBottom: `3px solid ${colorMix(theme.palette.sapphire, "transparent", 20)}`,
      boxShadow: `0 0 0 2px ${colorMix(theme.palette.sapphire, "transparent", 30)}`,
    },
    minWidth: "3em",
  }),
);
