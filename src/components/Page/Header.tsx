import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { IconButton } from "baseComponents/IconButton";
import { Tab } from "baseComponents/Tab";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { Dialog } from "commonComponents/Dialog";
import OpenFileButton from "commonComponents/OpenFileButton";
import { CreateUnit } from "components/CreateUnit";
import {
  detectVersion,
  serializeToFile,
  dataMigrators,
} from "services/dataMigration/migrators";
import { OpenIcon } from "icons/OpenIcon";
import { SaveIcon } from "icons/SaveIcon";
import { HTMLAttributes, FC, useState, memo } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useStore } from "store/store";
import { formatTimestampForFilename } from "utils/formatTimestampForFilename";
import useTheme from "services/theme/useTheme";
import { Tabs } from "baseComponents/Tabs";

const ThemeButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.background};
  color: ${({ theme }) => theme.palette.text};
`;

const HeaderRoot = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PlaceHolder = styled.div`
  width: 100%;
  flex: 1;
`;

const OpenButton = styled(OpenFileButton)`
  width: 30px;
  min-height: 30px;
  font-size: 24px;
`;

const SaveButton = styled(IconButton)`
  width: 30px;
  min-height: 30px;
  font-size: 24px;
`;

export type TTabs = "allUnits" | "sceneUnits";

interface TProps extends HTMLAttributes<HTMLDivElement> {
  selectedTab: TTabs;
  onTabChange: (selectedTab: TTabs) => void;
}

export const Header: FC<TProps> = memo(
  ({ selectedTab, onTabChange, ...props }) => {
    const { translate } = useTranslate();
    const { themeName, toggleTheme } = useTheme();
    const { setStoreState, sortSceneByInitiative } = useActions();

    const [isCreateUnitOpen, setIsCreateUnitOpe] = useState(false);

    const handleSave = async () => {
      try {
        // 1. Получаем стейт ровно один раз
        const currentState = useStore.getState();

        // 2. Преобразуем в формат файла — только здесь и только один раз
        const fileData = serializeToFile(currentState);

        const blob = new Blob([JSON.stringify(fileData, null, "\t")], {
          type: "application/json",
        });

        const fileName = `${formatTimestampForFilename()}.json`;

        if ((window as any).navigator?.msSaveBlob) {
          // IE fallback
          (window as any).navigator.msSaveBlob(blob, fileName);
        } else {
          const link = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("Ошибка при сохранении файла", error);
        alert("Не удалось сохранить файл. Проверьте консоль для деталей.");
      }
    };

    return (
      <HeaderRoot {...props}>
        <Tabs>
          {/* Все */}
          <Tab
            isSelected={selectedTab === "allUnits"}
            onClick={() =>
              selectedTab !== "allUnits" && onTabChange("allUnits")
            }
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
        </Tabs>

        {/* отсортировать по инициативе */}
        {selectedTab === "sceneUnits" && (
          <Button onClick={() => sortSceneByInitiative()}>
            {translate("header.sortSceneByInitiative")}
          </Button>
        )}

        <PlaceHolder />

        <ConfirmingButton
          onConfirm={() => {}}
          confirmWindowTitle="Подтверди!"
          confirmWindowContent={<div></div>}
        >
          444
        </ConfirmingButton>
        <ThemeButton onClick={toggleTheme}>
          {themeName === "light" ? "☀️" : "🌙"}
        </ThemeButton>

        {/* открыть */}
        <OpenButton
          onFileOpen={(content) => {
            if (typeof content === "string") {
              const data = JSON.parse(content);
              const dataVersion = detectVersion(data);
              setStoreState(dataMigrators[dataVersion].toStore(data));
            } else {
              throw new Error("Не верный формат файла");
            }
          }}
        >
          <OpenIcon />
        </OpenButton>

        {/* Сохранить */}
        <SaveButton onClick={handleSave}>
          <SaveIcon />
        </SaveButton>

        {/* Создать участника */}
        <Button onClick={() => setIsCreateUnitOpe(true)}>
          {translate("createUnit.title")}
        </Button>
        <Dialog open={isCreateUnitOpen}>
          <CreateUnit onClose={() => setIsCreateUnitOpe(false)} />
        </Dialog>
      </HeaderRoot>
    );
  },
);
