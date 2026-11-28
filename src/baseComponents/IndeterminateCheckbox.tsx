import { CheckBoxCheckedIcon } from "./common/CheckBoxCheckedIcon";
import { CheckboxSquareIcon } from "./common/CheckboxSquareIcon";
import { CheckBoxIndeterminateIcon } from "./common/CheckBoxIndeterminateIcon";
import { ComponentProps, FC } from "react";
import { CheckBoxButton } from "./common/CheckBoxButton";

interface TProps extends Omit<
  ComponentProps<typeof CheckBoxButton>,
  "onChange"
> {
  value: "checked" | "unchecked" | "indeterminate";
  onChange: (value: "checked" | "unchecked") => void;
}

export const IndeterminateCheckbox: FC<TProps> = ({
  value,
  onChange,
  onClick,
  children,
  ...props
}) => {
  return (
    <CheckBoxButton
      onClick={(ev) => {
        onClick?.(ev);
        if (value === "unchecked") {
          onChange("checked");
          return;
        }
        onChange("unchecked");
      }}
      {...props}
    >
      {value === "unchecked" && <CheckboxSquareIcon />}
      {value === "checked" && <CheckBoxCheckedIcon />}
      {value === "indeterminate" && <CheckBoxIndeterminateIcon />}
      {children}
    </CheckBoxButton>
  );
};
