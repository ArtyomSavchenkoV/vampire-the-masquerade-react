import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

export const Input = styled.input(({ theme }) => ({
  fontSize: "0.85em",
  padding: 2,
  margin: "-2px 0",
  borderWidth: 1,
  borderRadius: 4,
  width: "calc(100% - 4px - 2px)",
  borderColor: colorMix(theme.palette.text, theme.palette.shift, 0),
  backgroundColor: theme.palette.input,
  color: theme.palette.text,
}));
