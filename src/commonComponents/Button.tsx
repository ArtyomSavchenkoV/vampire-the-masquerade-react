import { FC, ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";

const ButtonRoot = styled.button<TProps>`
  position: relative;
  border: 1px solid #999;
  border-radius: 4px;
  background-color: #eee;
  cursor: pointer;

  &:hover:enabled {
    background-color: #ddd;
    border-color: #777;
  }

  &:disabled {
    background-color: #eee;
    color: #bbb;
    border-color: #bbb;
    cursor: not-allowed;
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

export const Button: FC<TProps> = ({ children, ...props }) => {
  return <ButtonRoot {...props}>{children}</ButtonRoot>;
};
