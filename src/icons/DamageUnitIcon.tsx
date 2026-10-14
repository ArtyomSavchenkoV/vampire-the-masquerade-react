import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";
import { SubtractPath } from "./SubtractPath";
import { DamagePath } from "./DamagePath";

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const DamageUnitIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <DamagePath />
      <SubtractPath />
    </InlineIcon>
  );
};
