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

const Section = styled.div<{ isSmallScreen: boolean }>(({ isSmallScreen }) => ({
  display: "flex",
  gap: 16,
  ...(isSmallScreen ? { width: "100%", flexDirection: "column" } : {}),
}));
const List = styled(Card)<{ isSmallScreen: boolean }>(({ isSmallScreen }) => ({
  display: "flex",
  gap: 8,
  flexDirection: "column",
  ...(isSmallScreen ? {} : { width: "100%" }),
}));

interface TProps extends HTMLAttributes<HTMLDivElement> {
  name: ReactNode;
  player: ReactNode;
  // Характеристики
  attributes: ReactNode;
  abilities: ReactNode;
  mentalStability: ReactNode;
  // Нижний блок
  willpower: ReactNode;
  health: ReactNode;
  healthLevels: ReactNode;
}

export const CreatureLayout: FC<TProps> = ({
  name,
  player,
  attributes,
  abilities,
  mentalStability,
  willpower,
  health,
  healthLevels,
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
        </Names>
      </Header>
      <Section isSmallScreen={isSmallScreen}>
        <List isSmallScreen={isSmallScreen}>{attributes}</List>
        <List isSmallScreen={isSmallScreen}>{abilities}</List>
        <List isSmallScreen={isSmallScreen}>{mentalStability}</List>
      </Section>
      <Section isSmallScreen={isSmallScreen}>
        <List isSmallScreen={isSmallScreen}>{willpower}</List>
        <List isSmallScreen={isSmallScreen}>{health}</List>
        <List isSmallScreen={isSmallScreen}>{healthLevels}</List>
      </Section>
    </Page>
  );
};
