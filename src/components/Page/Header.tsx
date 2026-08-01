import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Tab } from "baseComponents/Tab";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { Dialog } from "commonComponents/Dialog";
import OpenFileButton from "commonComponents/OpenFileButton";
import { CreateUnit } from "components/CreateUnit";
import { HTMLAttributes, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useUnitsSelector } from "store/selectors";

const HeaderRoot = styled.div`
  display: flex;
  gap: 8px;
`;

const PlaceHolder = styled.div`
  width: 100%;
  flex: 1;
`;

export type Tabs = "allUnits" | "sceneUnits";

interface TProps extends HTMLAttributes<HTMLDivElement> {
  selectedTab: Tabs;
  onTabChange: (selectedTab: Tabs) => void;
}

export const Header: FC<TProps> = ({ selectedTab, onTabChange, ...props }) => {
  const { translate } = useTranslate();
  const { changeUnits, sortSceneByInitiative } = useActions();
  const units = useUnitsSelector();

  const [isCreateUnitOpen, setIsCreateUnitOpe] = useState(false);

  return (
    <HeaderRoot {...props}>
      {/* Все */}
      <Tab
        isSelected={selectedTab === "allUnits"}
        onClick={() => selectedTab !== "allUnits" && onTabChange("allUnits")}
      >
        {translate("header.allUnitsTab")}
      </Tab>

      {/* Сцена */}
      <Tab
        isSelected={selectedTab === "sceneUnits"}
        onClick={() =>
          selectedTab !== "sceneUnits" && onTabChange("sceneUnits")
        }
      >
        {translate("header.sceneUnitsTab")}
      </Tab>

      {/* отсортировать по инициативе */}
      <Button onClick={() => sortSceneByInitiative()}>
        {translate("header.sortSceneByInitiative")}
      </Button>

      <PlaceHolder />

      <ConfirmingButton onConfirm={() => {}} confirmWindowTitle="Подтверди!">
        444
      </ConfirmingButton>

      {/* открыть */}
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
        {translate("header.open")}
      </OpenFileButton>

      {/* Сохранить */}
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
        {translate("header.save")}
      </Button>

      {/* Создать участника */}
      <Button onClick={() => setIsCreateUnitOpe(true)}>
        {translate("createUnit.title")}
      </Button>
      <Dialog open={isCreateUnitOpen}>
        <CreateUnit onClose={() => setIsCreateUnitOpe(false)} />
      </Dialog>
    </HeaderRoot>
  );
};
