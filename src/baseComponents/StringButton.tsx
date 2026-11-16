import { FC, ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

const ButtonRoot = styled.button<TProps>`
  background: none;
  display: inline;
  font: inherit;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => `${theme.palette.sapphire}`};
  text-align: start;

  &:hover:enabled {
    background-color: ${({ theme }) => colorMix("transparent", theme.palette.shift, 15)};
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
        ${({ theme }) => colorMix("transparent", theme.palette.shift, 25)};
      pointer-events: none;
      z-index: 1;
    }
  }
`;

interface TProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const StringButton: FC<TProps> = ({ ...props }) => {
  return <ButtonRoot {...props} />;
};
