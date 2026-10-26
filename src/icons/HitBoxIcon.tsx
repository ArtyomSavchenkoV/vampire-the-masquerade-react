import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";
import { HitBoxPath } from "./HitBoxPath";
import styled from "@emotion/styled";

const Root = styled(InlineIcon)(`
  fill: transparent;
  stroke: currentColor;
`);

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const HitBoxIcon: FC<TProps> = ({ ...props }) => {
  return (
    <Root {...props}>
      <HitBoxPath />
    </Root>
  );
};
