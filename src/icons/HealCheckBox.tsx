import styled from "@emotion/styled";
import { CheckBoxButton } from "baseComponents/common/CheckBoxButton";
import { HealPath } from "icons/HealPath";
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

export const HealCheckbox: FC<TProps> = ({
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
          <HealPath />
        </StyledInlineIcon>
      )}
      {checked && (
        <StyledInlineIcon>
          <RoundedSquarePath
            fill={colorMix(theme.palette.green, theme.palette.shift, 20)}
          />
          <HealPath />
        </StyledInlineIcon>
      )}
    </CheckBoxButton>
  );
};
