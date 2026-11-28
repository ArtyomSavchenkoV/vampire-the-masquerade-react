import { ComponentProps, FC } from "react";
import { InlineIcon } from "icons/InlineIcon";
import styled from "@emotion/styled";
import useTheme from "services/theme/useTheme";
import { themes } from "services/theme/theme";

const SapphirePath = styled.path`
  fill: ${({ theme }) => theme.palette.sapphire};
`;
interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const CheckBoxIndeterminateIcon: FC<TProps> = ({ ...props }) => {
  const { themeName } = useTheme();
  const theme = themes[themeName];

  return (
    <InlineIcon {...props}>
      <SapphirePath
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M2 4 A2 2 0 0 1 4 2 H20 A2 2 0 0 1 22 4 V20 A 2 2 0 0 1 20 22 H4 A2 2 0 0 1 2 20 Z
        "
      />
      <path
        stroke={theme.palette.white}
        fill="none"
        strokeWidth={3.5}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M6 12 H18
        "
      />
    </InlineIcon>
  );
};
