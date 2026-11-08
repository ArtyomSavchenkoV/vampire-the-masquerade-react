import styled from "@emotion/styled";
import { useOnElementResize } from "hooks/useOnElementResize";
import { FC, HTMLAttributes, ReactNode, useRef, useState } from "react";

const Root = styled.div<{
  isSmallElement: boolean;
  gridTemplateColumnsOnNormal?: string;
}>(({ isSmallElement, gridTemplateColumnsOnNormal }) => ({
  gap: 4,
  overflowWrap: "anywhere",
  ...(isSmallElement
    ? {}
    : {
        display: "grid",
        gridTemplateColumns:
          gridTemplateColumnsOnNormal || "minmax(80px, 1fr) auto",
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
  children?: ReactNode;
  smallSize?: number;
  gridTemplateColumnsOnNormal?: string;
}
export const TitleText: FC<IProps> = ({
  title,
  children,
  smallSize,
  gridTemplateColumnsOnNormal,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setIsSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setIsSmallElement(size.width < (smallSize || 200)),
  });
  return (
    <Root
      ref={ref}
      gridTemplateColumnsOnNormal={gridTemplateColumnsOnNormal}
      isSmallElement={isSmallElement}
      {...props}
    >
      <Div>
        {title}
        {!isSmallElement && <Line />}
      </Div>
      <Div>{children}</Div>
    </Root>
  );
};
