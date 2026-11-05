import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";
import { HitBoxPath } from "./HitBoxPath";
import styled from "@emotion/styled";

const Root = styled(InlineIcon)(`
  fill: transparent;
  stroke: currentColor;
`);

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const LethalIcon: FC<TProps> = ({ ...props }) => {
  return (
    <Root {...props}>
      <HitBoxPath />
      <path
        strokeWidth={2.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M0 24 L24 0
          M0 0 L24 24
        "
      />
    </Root>
  );
};
