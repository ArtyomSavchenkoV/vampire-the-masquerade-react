import { ComponentProps, FC } from "react";
import { InlineIcon } from "../../icons/InlineIcon";
interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const CheckBoxCheckedIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <path
        fill="#03f"
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M2 4 A2 2 0 0 1 4 2 H20 A2 2 0 0 1 22 4 V20 A 2 2 0 0 1 20 22 H4 A2 2 0 0 1 2 20 Z
        "
      />
      <path
        stroke="white"
        fill="none"
        strokeWidth={3.5}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M22.5 2.5 L11.5 16 L 7 10
        "
      />
    </InlineIcon>
  );
};
