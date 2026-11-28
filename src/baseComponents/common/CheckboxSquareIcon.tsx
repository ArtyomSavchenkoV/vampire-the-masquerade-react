import { ComponentProps, FC } from "react";
import { InlineIcon } from "icons/InlineIcon";
import { CheckboxSquarePath } from "../../icons/CheckboxSquarePath";
interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const CheckboxSquareIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      <CheckboxSquarePath />
    </InlineIcon>
  );
};
