import { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import useTranslate from "services/translate/useTranslate";
import { Card } from "../baseComponents/Card";
import { Button } from "../baseComponents/Button";

const PADDING = 5;

const ConfirmWindowRoot = styled(Card)<{ size: "sm" | "md" | "lg" }>(
  ({ size }) => `
  width: ${(size === "sm" && 300) || (size === "md" && 500) || 1000}px;
  max-width: calc(100% - ${PADDING * 2}px);
  background-color: #9bf;
  padding: ${PADDING}px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`,
);

const Head = styled.div`
  min-height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
  padding-bottom: 8px;
`;

const Title = styled.div`
  font-size: 1.5em;
  color: #fff;
  padding-left: 4px;
  padding-top: 4px;
`;

const Body = styled.div<{ finished: boolean }>(
  ({ finished }) => `
  padding: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 150px;
  overflow: auto;
  padding: 12px 8px;
  ${finished ? "border-radius: 0 0 4px 4px;" : ""}
`,
);

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
`;

const StyledButton = styled(Button)<{ isVisible: boolean }>(
  ({ isVisible }) => ({
    width: "100%",
    ...(isVisible ? {} : { visibility: "hidden" }),
  }),
);

interface TProps {
  title: ReactNode;
  children: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}

export const ConfirmWindow: FC<TProps> = ({
  title,
  children,
  onConfirm,
  onCancel,
  onClose,
  size = "md",
}) => {
  const { translate } = useTranslate();

  return (
    <ConfirmWindowRoot size={size}>
      <Head>
        <Title>{title}</Title>
        <Button onClick={onClose}>x</Button>
      </Head>
      {children && <Body finished={!onCancel && !onConfirm}>{children}</Body>}
      {(!!onCancel || !!onConfirm) && (
        <Buttons>
          <StyledButton isVisible={!!onCancel} onClick={onCancel}>
            {translate("confirmWindow.cancel")}
          </StyledButton>
          <StyledButton isVisible={!!onConfirm} onClick={onConfirm}>
            {translate("confirmWindow.confirm")}
          </StyledButton>
        </Buttons>
      )}
    </ConfirmWindowRoot>
  );
};
