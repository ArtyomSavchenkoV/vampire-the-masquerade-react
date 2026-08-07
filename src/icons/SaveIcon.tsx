import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const SaveIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M4 2 H19 L22 5 V20 A2 2 0 0 1 20 22 H4 A2 2 0 0 1 2 20 V4 A2 2 0 0 1 4 2 Z
          M8 2.5 H18 V7.5 A1 1 0 0 1 17 8.5 H9 A1 1 0 0 1 8 7.5 V2.5 Z
          M13 3 H 15 V 7.5 H 13 Z
          M5 12.5 V20 A1 1 0 0 0 5.5 20.5 H18.5 A1 1 0 0 0 19 20 V12.5 A1 1 0 0 0 18.5 12 H5.5 A1 1 0 0 0 5 12.5 Z
        "
      />
    </InlineIcon>
  );
};
