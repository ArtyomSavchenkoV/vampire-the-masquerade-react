import styled from "@emotion/styled";
import { CheckBoxButton } from "baseComponents/Checkbox/CheckBoxButton";
import { DamagePath } from "icons/DamagePath";
import { InlineIcon } from "icons/InlineIcon";
import { RoundedSquarePath } from "icons/RoundedSquarePath";
import { ComponentProps, FC } from "react";

const StyledInlineIcon = styled(InlineIcon)`
  color: #fff;
`;

interface TProps extends Omit<
  ComponentProps<typeof CheckBoxButton>,
  "children" | "onChange"
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const DamageCheckbox: FC<TProps> = ({
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
      {!checked && (
        <StyledInlineIcon>
          <RoundedSquarePath fill={"#ccc"} />
          <DamagePath />
        </StyledInlineIcon>
      )}
      {checked && (
        <StyledInlineIcon>
          <RoundedSquarePath fill={"#b20"} />
          <DamagePath />
        </StyledInlineIcon>
      )}
    </CheckBoxButton>
  );
};
