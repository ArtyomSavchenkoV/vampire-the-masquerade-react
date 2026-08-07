import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const OpenIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M8 2 L11 5 H21.5 A2 2 0 0 1 23.5 7 V18 A2 2 0 0 1 21.5 20 H2.5 A 2 2 0 0 1 0.5 18 V4 A 2 2 0 0 1 2.5 2 Z
          M2.5 6 A1 1 0 0 0 1.5 7 V18 A 1 1 0 0 0 2.5 19 H21.5 A1 1 0 0 0 22.5 18 V7 A1 1 0 0 0 21.5 6 Z
        "
      />
    </InlineIcon>
  );
};
