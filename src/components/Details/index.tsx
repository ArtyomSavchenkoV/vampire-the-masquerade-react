import { FC, useState } from "react";
import { useDetailsSelector } from "./selectors";
import { KindredDetails } from "./KindredDetails";
import { HumanDetails } from "./HumanDetails";
import { CreatureDetails } from "./CreatureDetails";
import { GhoulDetails } from "./GhoulDetails";
import { Header } from "./common/Header";
import { Panel } from "./common/Panel";
import { useActions } from "store/selectors";
import { joinStrings } from "utils/string/joinStrings";
import { Tab } from "baseComponents/Tab";
import useTranslate from "services/translate/useTranslate";
import styled from "@emotion/styled";

const Content = styled.div`
  overflow: auto;
  padding: 4px;
`;

/**
 * Табы детальной информации
 */
export type TDetailsTab =
  /** Основная информация */
  | "main_info"
  /** Расширенная информация */
  | "extended_info"
  /** Дисциплины */
  | "disciplines";

interface TProps {}

export const Details: FC<TProps> = () => {
  const { translate } = useTranslate();

  const { unitId, unitType, unitName, unitPlayer } = useDetailsSelector();

  const [tab, setTab] = useState<TDetailsTab>("main_info");

  const { selectUnit } = useActions();

  return (
    <>
      {unitId && (
        <Panel open>
          <Header
            unitId={unitId}
            title={joinStrings(
              " ",
              unitName ? unitName : null,
              unitPlayer ? `(${unitPlayer})` : null,
            )}
            type={unitType && translate(`unitTypes.${unitType}`)}
            onClose={() => selectUnit(null)}
            tabs={
              <>
                <Tab
                  isSelected={tab === "main_info"}
                  onClick={() => setTab("main_info")}
                >
                  {translate("details.tabs.main_info")}
                </Tab>
                <Tab
                  isSelected={tab === "extended_info"}
                  onClick={() => setTab("extended_info")}
                >
                  {translate("details.tabs.extended_info")}
                </Tab>
                {(unitType === "kindred" || unitType === "ghoul") && (
                  <Tab
                    isSelected={tab === "disciplines"}
                    onClick={() => setTab("disciplines")}
                  >
                    {translate("details.tabs.disciplines")}
                  </Tab>
                )}
              </>
            }
          />
          <Content>
            {unitType === "kindred" && (
              <KindredDetails unitId={unitId} tab={tab} />
            )}
            {unitType === "ghoul" && <GhoulDetails unitId={unitId} tab={tab} />}
            {unitType === "human" && <HumanDetails unitId={unitId} tab={tab} />}
            {unitType === "creature" && (
              <CreatureDetails unitId={unitId} tab={tab} />
            )}
          </Content>
        </Panel>
      )}
    </>
  );
};
