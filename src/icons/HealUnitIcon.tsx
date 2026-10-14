import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";
import { AddPath } from "./AddPath";
import { HealPath } from "./HealPath";

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const HealUnitIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <HealPath />
      <AddPath />
    </InlineIcon>
  );
};
