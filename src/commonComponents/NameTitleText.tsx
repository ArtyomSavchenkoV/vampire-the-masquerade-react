import styled from "@emotion/styled";
import { useOnElementResize } from "hooks/useOnElementResize";
import { FC, HTMLAttributes, ReactNode, useRef, useState } from "react";

const Root = styled.div<{ isSmallElement: boolean }>(({ isSmallElement }) => ({
  fontSize: "2em",
  gap: 4,
  overflowWrap: "anywhere",
  ...(isSmallElement
    ? {}
    : {
        display: "grid",
        gridTemplateColumns: "minmax(100px, 1fr) 1.7fr",
      }),
}));

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
  title: ReactNode;
  children: ReactNode;
}
export const NameTitleText: FC<IProps> = ({ title, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setIsSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setIsSmallElement(size.width < 380),
  });
  return (
    <Root ref={ref} isSmallElement={isSmallElement} {...props}>
      <Div>
        {title}
        {!isSmallElement && <Line />}
      </Div>
      <Div>{children}</Div>
    </Root>
  );
};
