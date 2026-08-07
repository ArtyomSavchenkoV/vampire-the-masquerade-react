import { ComponentProps, FC } from "react";
import { InlineIcon } from "../../icons/InlineIcon";
interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const CheckboxIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <path
        fill="black"
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M2 4 A2 2 0 0 1 4 2 H20 A2 2 0 0 1 22 4 V20 A 2 2 0 0 1 20 22 H4 A2 2 0 0 1 2 20 Z
          M5 4 A1 1 0 0 0 4 5 V19 A1 1 0 0 0 5 20 H19 A1 1 0 0 0 20 19 V5 A1 1 0 0 0 19 4 Z
        "
      />
    </InlineIcon>
  );
};
