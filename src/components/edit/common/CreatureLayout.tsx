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
const Header = styled(Card)<{ isSmallElement: boolean }>(
  ({ isSmallElement }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallElement ? { flexDirection: "column" } : {}),
  }),
);
const Names = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Section = styled.div<{ isSmallElement: boolean }>(
  ({ isSmallElement }) => ({
    display: "flex",
    gap: 16,
    ...(isSmallElement ? { width: "100%", flexDirection: "column" } : {}),
  }),
);
const List = styled(Card)<{ isSmallElement: boolean }>(
  ({ isSmallElement }) => ({
    display: "flex",
    gap: 8,
    flexDirection: "column",
    ...(isSmallElement ? {} : { width: "100%" }),
  }),
);

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
  const [isSmallElement, setIsSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setIsSmallElement(size.width < 600),
  });
  return (
    <Page ref={ref} {...props}>
      <Header isSmallElement={isSmallElement}>
        <Names>
          <div>{name}</div>
          <div>{player}</div>
        </Names>
      </Header>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{attributes}</List>
        <List isSmallElement={isSmallElement}>{abilities}</List>
        <List isSmallElement={isSmallElement}>{mentalStability}</List>
      </Section>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{willpower}</List>
        <List isSmallElement={isSmallElement}>{health}</List>
        <List isSmallElement={isSmallElement}>{healthLevels}</List>
      </Section>
    </Page>
  );
};
