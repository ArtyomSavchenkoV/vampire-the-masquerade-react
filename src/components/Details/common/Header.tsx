import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { FC, ReactNode } from "react";

const StyledHeader = styled.div`
  font-size: 2em;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TProps {
  title: ReactNode;
  buttons?: ReactNode;
  onClose: () => void;
}

export const Header: FC<TProps> = ({ title, buttons, onClose }) => {
  return (
    <StyledHeader>
      {title}
      {buttons}
      <CloseButton onClick={onClose}>x</CloseButton>
    </StyledHeader>
  );
};
