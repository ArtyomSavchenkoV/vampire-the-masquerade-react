import styled from "@emotion/styled";
import { Card } from "baseComponents/Card";
import { useOnElementResize } from "hooks/useOnElementResize";
import { FC, ReactNode, useRef, useState } from "react";

const Root = styled.div(`
  display: flex;
  flex-direction: column;
  gap: 16px;    
`);

const Actions = styled.div(`
  font-size: 1.5em;
  display: flex;
  gap: 4px;   
`);

const Columns = styled.div<{ isSmallElement: boolean }>(
  ({ isSmallElement }) => `
  display: grid;
  grid-template-columns: repeat(${isSmallElement ? "1" : "3"}, 1fr);
  gap: 16px;   
`,
);

const Rows = styled.div(`
  display: flex;
  flex-direction: column;
  gap: 16px;   
`);

const Resources = styled.div<{ isSmallElement: boolean }>(
  ({ isSmallElement }) => `
  display: grid;
  grid-template-columns: repeat(${isSmallElement ? "1" : "3"}, 1fr);
  gap: 16px;
`,
);

const List = styled(Card)(`
  display: flex;
  gap: 8px;
  flex-direction: column;
`);

interface TProps {
  actions: ReactNode;
  health: ReactNode;
  willpower: ReactNode;
  bloodPool?: ReactNode;
  effects: ReactNode;
  clan?: ReactNode;
  social?: ReactNode;
  meritsAndFlaws?: ReactNode;
  notes: ReactNode;
}
export const MainInfoLayout: FC<TProps> = ({
  actions,
  health,
  willpower,
  bloodPool,
  effects,
  clan,
  social,
  meritsAndFlaws,
  notes,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setisSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setisSmallElement(size.width < 600),
  });

  return (
    <Root ref={ref}>
      <Actions>{actions}</Actions>
      <Resources isSmallElement={isSmallElement}>
        <List>{health}</List>
        <List>{willpower}</List>
        {bloodPool && <List>{bloodPool}</List>}
      </Resources>
      <Columns isSmallElement={isSmallElement}>
        <List>{effects}</List>
        <Rows>
          {social && <List>{social}</List>}
          {meritsAndFlaws && <List>{meritsAndFlaws}</List>}
        </Rows>
        {clan && <List>{clan}</List>}
      </Columns>
      <List>{notes}</List>
    </Root>
  );
};
