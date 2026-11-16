import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { colorMix } from "utils/styles/colorMix";

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 60%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.palette.background};
  box-shadow: -8px 0 16px
    ${({ theme }) => colorMix(theme.palette.black, "transparent", 80)};
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open: boolean;
}

export const RightPanel: FC<TProps> = ({ children, open, ...props }) => {
  return open
    ? createPortal(<Panel {...props}>{children}</Panel>, document.body)
    : null;
};
