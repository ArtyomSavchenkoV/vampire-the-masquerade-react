import styled from "@emotion/styled";
import { Button } from "commonComponents/Button";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { HTMLAttributes, FC } from "react";
import useTranslate from "services/translate/useTranslate";

const HeaderRoot = styled.div`
  background-color: #fcc;
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<TProps> = ({ ...props }) => {
  const { translate } = useTranslate();

  return (
    <HeaderRoot {...props}>
      {translate("title")}
      <ConfirmingButton onConfirm={() => {}} confirmWindowTitle="Подтверди!">
        444
      </ConfirmingButton>
    </HeaderRoot>
  );
};
