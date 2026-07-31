import styled from "@emotion/styled";
import { FC, HTMLAttributes, ReactNode } from "react";

const Root = styled.div`
  /*padding: 4px;*/
  display: grid;
  grid-template-columns: 1.3fr minmax(85px, 1fr);
  gap: 4px;
  overflow-wrap: anywhere;
`;

const Div = styled.div`
  display: flex;
  align-items: start;
`;

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  children: ReactNode;
}
export const TitleText: FC<IProps> = ({ title, children, ...props }) => {
  return (
    <Root {...props}>
      <Div>{title}</Div>
      <Div>{children}</Div>
    </Root>
  );
};
