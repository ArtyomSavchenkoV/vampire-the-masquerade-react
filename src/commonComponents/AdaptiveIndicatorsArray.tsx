import styled from "@emotion/styled";
import { useOnElementResize } from "hooks/useOnElementResize";
import { FC, HTMLAttributes, useRef, useState } from "react";

const Root = styled.div<{ isSmallElement: boolean }>(({ isSmallElement }) => ({
  display: "grid",
  gridTemplateColumns: isSmallElement ? "repeat(5, 16px)" : "repeat(10, 16px)",
  gap: 4,
}));

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const AdaptiveIndicatorsArray: FC<TProps> = ({ ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setIsSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setIsSmallElement(size.width < 16 * 10 + 4 * 9),
  });
  return <Root ref={ref} isSmallElement={isSmallElement} {...props} />;
};
