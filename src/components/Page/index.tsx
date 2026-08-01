import { FC, HTMLAttributes, useState } from "react";
import styled from "@emotion/styled";
import { Header, Tabs } from "./Header";
import { AllUnitsList } from "components/AllUnitsList";
import { SceneUnitsList } from "components/SceneUnitsList";

const PageRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRoot = styled(Header)`
  flex: none;
`;

const ContentRoot = styled.div`
  flex: 1;
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Page: FC<TProps> = () => {
  const [tab, setTab] = useState<Tabs>("allUnits");
  return (
    <PageRoot>
      <HeaderRoot selectedTab={tab} onTabChange={(tab) => setTab(tab)} />
      <ContentRoot>
        {tab === "allUnits" && <AllUnitsList />}
        {tab === "sceneUnits" && <SceneUnitsList />}
      </ContentRoot>
    </PageRoot>
  );
};
