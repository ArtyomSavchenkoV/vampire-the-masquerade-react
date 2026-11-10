import { FC, ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";

const ButtonRoot = styled.button<TProps>`
  font-size: 1em;
  position: relative;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  color: #07f;

  &:hover:enabled {
    background-color: #ddd;
  }

  &:disabled {
    color: #bbb;
    cursor: default;
  }

  &:focus-visible {
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px dashed rgba(0, 0, 0, 0.4);
      pointer-events: none;
      z-index: 1;
    }
  }
`;

interface TProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const StringButton: FC<TProps> = ({ ...props }) => {
  return <ButtonRoot {...props} />;
};
