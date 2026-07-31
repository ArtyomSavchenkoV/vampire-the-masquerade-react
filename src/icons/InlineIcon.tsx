import styled from "@emotion/styled";
import { FC, SVGProps } from "react";

const Svg = styled.svg({
  fill: "currentColor",
  width: "1em",
  height: "1em",
  display: "inline-block",
  fontSize: "1.5em",
  transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  flexShrink: 0,
  userSelect: "none",
});

interface IProps extends SVGProps<SVGSVGElement> {}
export const InlineIcon: FC<IProps> = ({ className, ...props }) => {
  return <Svg focusable="false" viewBox="0 0 24 24" {...props} />;
};
