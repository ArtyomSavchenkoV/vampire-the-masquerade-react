import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { Dialog } from "commonComponents/Dialog";
import OpenFileButton from "commonComponents/OpenFileButton";
import { CreateUnit } from "components/CreateUnit";
import { HTMLAttributes, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useUnitsSelector } from "store/selectors";

const HeaderRoot = styled.div`
  background-color: #fcc;
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<TProps> = ({ ...props }) => {
  const { translate } = useTranslate();
  const { changeUnits } = useActions();
  const units = useUnitsSelector();

  const [isCreateUnitOpen, setIsCreateUnitOpe] = useState(false);

  return (
    <HeaderRoot {...props}>
      {translate("title")}
      <ConfirmingButton onConfirm={() => {}} confirmWindowTitle="Подтверди!">
        444
      </ConfirmingButton>
      <OpenFileButton
        onFileOpen={(content) => {
          if (typeof content === "string") {
            const data = JSON.parse(content);
            changeUnits(data);
          } else {
            throw new Error("Не верный формат файла");
          }
        }}
      >
        ##открыть
      </OpenFileButton>
      <Button
        onClick={() => {
          const blobdtMIME = new Blob([JSON.stringify(units, null, "\t")], {
            type: "application/json",
          });
          const fileName = [+new Date(), "VTM"].join(" - ");
          // @ts-ignore
          if (window.navigator.msSaveBlob) {
            // для IE
            // @ts-ignore
            window.navigator.msSaveBlob(blobdtMIME, fileName);
          } else {
            const link = document.createElement("a");
            const url = window.URL.createObjectURL(blobdtMIME);
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
          }
        }}
      >
        ##Сохранить
      </Button>
      <Button onClick={() => setIsCreateUnitOpe(true)}>
        {translate("createUnit.title")}
      </Button>
      <Dialog open={isCreateUnitOpen}>
        <CreateUnit onClose={() => setIsCreateUnitOpe(false)} />
      </Dialog>
    </HeaderRoot>
  );
};
