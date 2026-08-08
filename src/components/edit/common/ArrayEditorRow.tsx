import styled from "@emotion/styled";
import { FC, HTMLAttributes, ReactNode } from "react";

const Root = styled.div({
  gap: 4,
  overflowWrap: "anywhere",
  display: "grid",
  gridTemplateColumns: "1fr 20px",
});

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: start;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 1em;
  flex: 1;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
`;

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  removeButton?: ReactNode;
}
export const ArrayEditorRow: FC<IProps> = ({
  children,
  removeButton,
  ...props
}) => {
  return (
    <Root {...props}>
      <Div>
        {children}
        <Line />
      </Div>
      <Div>{removeButton}</Div>
    </Root>
  );
};
