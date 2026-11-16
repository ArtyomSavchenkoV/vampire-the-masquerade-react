import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

export const Button = styled.button`
  font-size: 0.85em;
  position: relative;
  border: 1px solid
    ${({ theme }) => colorMix(theme.palette.buttonBackground, theme.palette.shift, 25)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.buttonBackground};
  color: ${({ theme }) => theme.palette.buttonText};
  cursor: pointer;
  padding: 4px 8px;

  &:hover:enabled {
    background-color: ${({ theme }) => colorMix(theme.palette.buttonBackground, theme.palette.shift, 10)};
    border-color: ${({ theme }) => colorMix(theme.palette.buttonBackground, theme.palette.shift, 40)};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:focus-visible {
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px dashed
        ${({ theme }) => colorMix(theme.palette.buttonBackground, theme.palette.shift, 25)};
      pointer-events: none;
      z-index: 1;
    }
  }
`;
