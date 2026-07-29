import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { Dialog } from "commonComponents/Dialog";
import { CreateUnit } from "components/CreateUnit";
import { HTMLAttributes, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";

const HeaderRoot = styled.div`
  background-color: #fcc;
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<TProps> = ({ ...props }) => {
  const { translate } = useTranslate();

  const [isCreateUnitOpen, setIsCreateUnitOpe] = useState(false);

  return (
    <HeaderRoot {...props}>
      {translate("title")}
      <ConfirmingButton onConfirm={() => {}} confirmWindowTitle="Подтверди!">
        444
      </ConfirmingButton>
      <Button onClick={() => setIsCreateUnitOpe(true)}>
        {translate("createUnit.title")}
      </Button>
      <Dialog open={isCreateUnitOpen}>
        <CreateUnit onClose={() => setIsCreateUnitOpe(false)} />
      </Dialog>
    </HeaderRoot>
  );
};
