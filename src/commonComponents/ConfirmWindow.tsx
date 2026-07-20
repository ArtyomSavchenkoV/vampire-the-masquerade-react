import { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import useTranslate from "services/translate/useTranslate";
import { Card } from "./Card";
import { Button } from "./Button";

const ConfirmWindowRoot = styled(Card)`
  width: 400px;
  max-width: 100%;
  background-color: #9bf;
  padding: 5px; /* TODO: уточнить складывается ли с отступом Card */
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Head = styled.div`
  min-height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const Title = styled.div`
  font-size: 1.5em;
  color: #fff;
  padding-left: 4px;
  padding-top: 4px;
`;

const Body = styled.div`
  padding: 8px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface TProps {
  title: ReactNode;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

export const ConfirmWindow: FC<TProps> = ({
  title,
  children,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const { translate } = useTranslate();

  return (
    <ConfirmWindowRoot>
      <Head>
        <Title>{title}</Title>
        <Button onClick={onClose}>x</Button>
      </Head>
      <Body>
        {children}
        <Buttons>
          <StyledButton onClick={onCancel}>
            {translate("confirmWindow.cancel")}
          </StyledButton>
          <StyledButton onClick={onConfirm}>
            {translate("confirmWindow.confirm")}
          </StyledButton>
        </Buttons>
      </Body>
    </ConfirmWindowRoot>
  );
};
