import styled from "@emotion/styled";
import { CheckBoxButton } from "baseComponents/Checkbox/CheckBoxButton";
import { DamagePath } from "icons/DamagePath";
import { InlineIcon } from "icons/InlineIcon";
import { RoundedSquarePath } from "icons/RoundedSquarePath";
import { ComponentProps, FC } from "react";
import { themes } from "services/theme/theme";
import useTheme from "services/theme/useTheme";
import { colorMix } from "utils/styles/colorMix";

const StyledInlineIcon = styled(InlineIcon)`
  color: ${({ theme }) => theme.palette.textInvert};
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
  const { themeName } = useTheme();
  const theme = themes[themeName];

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
          <RoundedSquarePath
            fill={colorMix("transparent", theme.palette.shift, 20)}
          />
          <DamagePath />
        </StyledInlineIcon>
      )}
      {checked && (
        <StyledInlineIcon>
          <RoundedSquarePath
            fill={colorMix(theme.palette.red, theme.palette.shift, 20)}
          />
          <DamagePath />
        </StyledInlineIcon>
      )}
    </CheckBoxButton>
  );
};
