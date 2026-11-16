import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

export const TextArea = styled.textarea<{ rows?: number }>(
  ({ rows = 4, theme }) => `
    font-size: 1em;
    padding: 2px;
    border-width: 1px;
    border-radius: 4px;
    width: calc(100% - 4px - 2px);
    min-height: calc(${rows} * 1em + (${rows} - 1) * 1px + 4px);
    font-family: inherit;
    border-color: ${colorMix(theme.palette.text, theme.palette.shift, 0)};
    background-color: ${theme.palette.input};
    color: ${theme.palette.text};
  `,
);
