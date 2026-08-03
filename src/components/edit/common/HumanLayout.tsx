import styled from "@emotion/styled";
import { Card } from "baseComponents/Card";
import { useOnElementResize } from "hooks/useOnElementResize";
import { FC, HTMLAttributes, ReactNode, useRef, useState } from "react";

const Page = styled.div`
  width: 1000px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Header = styled(Card)<{ isSmallScreen: boolean }>(
  ({ isSmallScreen }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallScreen ? { flexDirection: "column" } : {}),
  }),
);
const Names = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const PersonDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Attributes = styled.div<{ isSmallScreen: boolean }>(
  ({ isSmallScreen }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallScreen ? { width: "100%", flexDirection: "column" } : {}),
  }),
);
const Abilities = styled.div<{ isSmallScreen: boolean }>(
  ({ isSmallScreen }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallScreen ? { width: "100%", flexDirection: "column" } : {}),
  }),
);
const Advantages = styled.div<{ isSmallScreen: boolean }>(
  ({ isSmallScreen }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallScreen ? { width: "100%", flexDirection: "column" } : {}),
  }),
);
const BottomDiv = styled.div<{ isSmallScreen: boolean }>(
  ({ isSmallScreen }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallScreen ? { width: "100%", flexDirection: "column" } : {}),
  }),
);
const List = styled(Card)<{ isSmallScreen: boolean }>(({ isSmallScreen }) => ({
  display: "flex",
  gap: 8,
  flexDirection: "column",
  ...(isSmallScreen ? {} : { width: "100%" }),
}));

interface TProps extends HTMLAttributes<HTMLDivElement> {
  name: ReactNode;
  player: ReactNode;
  chronicle: ReactNode;
  personality: ReactNode;
  // Характеристики
  physical: ReactNode;
  social: ReactNode;
  mental: ReactNode;
  // Способности
  talents: ReactNode;
  skills: ReactNode;
  knowledges: ReactNode;
  // Преимущества
  backgrounds: ReactNode;
  mentalStability: ReactNode;
  // Нижний блок
  meritsAndFlaws: ReactNode;
  centerBottom: ReactNode;
  health: ReactNode;
}

export const HumanLayout: FC<TProps> = ({
  name,
  player,
  chronicle,
  personality,
  physical,
  social,
  mental,
  talents,
  skills,
  knowledges,
  backgrounds,
  mentalStability,
  meritsAndFlaws,
  centerBottom,
  health,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setIsSmallScreen(size.width < 600),
  });
  return (
    <Page ref={ref} {...props}>
      <Header isSmallScreen={isSmallScreen}>
        <Names>
          <div>{name}</div>
          <div>{player}</div>
          <div>{chronicle}</div>
        </Names>
        <PersonDetails>{personality}</PersonDetails>
      </Header>
      <Attributes isSmallScreen={isSmallScreen}>
        <List isSmallScreen={isSmallScreen}>{physical}</List>
        <List isSmallScreen={isSmallScreen}>{social}</List>
        <List isSmallScreen={isSmallScreen}>{mental}</List>
      </Attributes>
      <Abilities isSmallScreen={isSmallScreen}>
        <List isSmallScreen={isSmallScreen}>{talents}</List>
        <List isSmallScreen={isSmallScreen}>{skills}</List>
        <List isSmallScreen={isSmallScreen}>{knowledges}</List>
      </Abilities>
      <Advantages isSmallScreen={isSmallScreen}>
        <List isSmallScreen={isSmallScreen}>{meritsAndFlaws}</List>
        <List isSmallScreen={isSmallScreen}>{backgrounds}</List>
        <List isSmallScreen={isSmallScreen}>{mentalStability}</List>
      </Advantages>
      <BottomDiv isSmallScreen={isSmallScreen}>
        <List isSmallScreen={isSmallScreen}>{centerBottom}</List>
        <List isSmallScreen={isSmallScreen}>{health}</List>
      </BottomDiv>
    </Page>
  );
};
