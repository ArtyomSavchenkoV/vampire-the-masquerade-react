import styled from "@emotion/styled";
import { Card } from "baseComponents/Card";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { useOnElementResize } from "hooks/useOnElementResize";
import { FC, HTMLAttributes, ReactNode, useRef, useState } from "react";
import useTranslate from "services/translate/useTranslate";

const Page = styled.div`
  width: 1000px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 8px 0;
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
const ClanCurse = styled.div({
  maxHeight: "9em",
  overflow: "auto",
});

interface TProps extends HTMLAttributes<HTMLDivElement> {
  name: ReactNode;
  player: ReactNode;
  chronicle: ReactNode;
  personality: ReactNode;
  kindredSocialPosition: ReactNode;
  curse: ReactNode;
  // Характеристики
  physical: ReactNode;
  social: ReactNode;
  mental: ReactNode;
  // Способности
  talents: ReactNode;
  skills: ReactNode;
  knowledges: ReactNode;
  // Преимущества
  disciplines: ReactNode;
  backgrounds: ReactNode;
  mentalStability: ReactNode;
  // Нижний блок
  meritsAndFlaws: ReactNode;
  centerBottom: ReactNode;
  health: ReactNode;
}

export const KindredLayout: FC<TProps> = ({
  name,
  player,
  chronicle,
  personality,
  kindredSocialPosition,
  curse,
  physical,
  social,
  mental,
  talents,
  skills,
  knowledges,
  disciplines,
  backgrounds,
  mentalStability,
  meritsAndFlaws,
  centerBottom,
  health,
  ...props
}) => {
  const { translate } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setisSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setisSmallElement(size.width < 600),
  });
  return (
    <Page ref={ref} {...props}>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>
          {name}
          {player}
          {chronicle}
          <Divider />
          {personality}
        </List>
        <List isSmallElement={isSmallElement}>
          {kindredSocialPosition}
          <DetailsSectionTitle>
            {translate("createUnit.clanCurse")}
          </DetailsSectionTitle>
          <ClanCurse>{curse}</ClanCurse>
        </List>
      </Section>
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
        <List isSmallElement={isSmallElement}>{disciplines}</List>
        <List isSmallElement={isSmallElement}>{backgrounds}</List>
        <List isSmallElement={isSmallElement}>{mentalStability}</List>
      </Section>
      <Section isSmallElement={isSmallElement}>
        <List isSmallElement={isSmallElement}>{meritsAndFlaws}</List>
        <List isSmallElement={isSmallElement}>{centerBottom}</List>
        <List isSmallElement={isSmallElement}>{health}</List>
      </Section>
    </Page>
  );
};
