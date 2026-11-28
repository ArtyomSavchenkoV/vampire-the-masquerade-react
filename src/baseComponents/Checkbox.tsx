import { CheckBoxCheckedIcon } from "./common/CheckBoxCheckedIcon";
import { CheckboxSquareIcon } from "./common/CheckboxSquareIcon";
import { ComponentProps, FC } from "react";
import { CheckBoxButton } from "./common/CheckBoxButton";

interface TProps extends Omit<
  ComponentProps<typeof CheckBoxButton>,
  "onChange"
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: FC<TProps> = ({
  checked,
  onChange,
  onClick,
  children,
  ...props
}) => {
  return (
    <CheckBoxButton
      onClick={(ev) => {
        onClick?.(ev);
        onChange(!checked);
      }}
      {...props}
    >
      {!checked && <CheckboxSquareIcon />}
      {checked && <CheckBoxCheckedIcon />}
      {children}
    </CheckBoxButton>
  );
};
