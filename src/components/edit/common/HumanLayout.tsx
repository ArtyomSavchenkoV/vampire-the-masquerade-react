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
const PersonDetails = styled.div`
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
  healthLevels: ReactNode;
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
  healthLevels,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setisSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setisSmallElement(size.width < 600),
  });
  return (
    <Page ref={ref} {...props}>
      <Header isSmallElement={isSmallElement}>
        <Names>
          <div>{name}</div>
          <div>{player}</div>
          <div>{chronicle}</div>
        </Names>
        <PersonDetails>{personality}</PersonDetails>
      </Header>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{physical}</List>
        <List isSmallElement={isSmallElement}>{social}</List>
        <List isSmallElement={isSmallElement}>{mental}</List>
      </Section>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{talents}</List>
        <List isSmallElement={isSmallElement}>{skills}</List>
        <List isSmallElement={isSmallElement}>{knowledges}</List>
      </Section>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{meritsAndFlaws}</List>
        <List isSmallElement={isSmallElement}>{backgrounds}</List>
        <List isSmallElement={isSmallElement}>{mentalStability}</List>
      </Section>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{centerBottom}</List>
        <List isSmallElement={isSmallElement}>{health}</List>
        <List isSmallElement={isSmallElement}>{healthLevels}</List>
      </Section>
    </Page>
  );
};
