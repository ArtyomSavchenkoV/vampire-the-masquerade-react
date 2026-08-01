import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 60%;
  height: 100%;
  overflow: auto;
  background-color: white;
  box-shadow: -8px 0 16px rgba(30, 30, 30, 0.15);
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
