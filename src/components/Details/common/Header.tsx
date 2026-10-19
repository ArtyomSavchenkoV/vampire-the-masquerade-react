import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { DeleteUnit } from "components/DeleteUnit";
import { EditUnit } from "components/EditUnit";
import { FC, ReactNode } from "react";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-wrap: wrap;
`;

const Title = styled.div`
  display: flex;
  gap: 12px;
  align-items: baseline;
  margin-right: 50px;
  flex-wrap: wrap;
`;

const Name = styled.div`
  font-size: 2em;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
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
  unitId: string;
  title: ReactNode;
  tabs: ReactNode;
  onClose: () => void;
}

export const Header: FC<TProps> = ({ unitId, title, tabs, onClose }) => {
  return (
    <Root>
      <Title>
        <Name>{title}</Name>
        <Buttons>
          <EditUnit unitId={unitId} />
          {/* Удалить персонажа */}
          <DeleteUnit unitId={unitId} />
        </Buttons>
      </Title>
      <CloseButton onClick={onClose}>x</CloseButton>
      <Tabs>{tabs}</Tabs>
    </Root>
  );
};
