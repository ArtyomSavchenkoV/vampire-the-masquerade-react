import { CheckBoxCheckedIcon } from "baseComponents/Checkbox/CheckBoxCheckedIcon";
import { CheckboxSquareIcon } from "baseComponents/Checkbox/CheckboxSquareIcon";
import { ComponentProps, FC } from "react";
import { CheckBoxButton } from "./CheckBoxButton";

interface TProps extends Omit<
  ComponentProps<typeof CheckBoxButton>,
  "children" | "onChange"
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: FC<TProps> = ({
  checked,
  onChange,
  onClick,
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
    </CheckBoxButton>
  );
};
