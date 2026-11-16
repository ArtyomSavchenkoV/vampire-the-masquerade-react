import { FC, SVGProps } from "react";
import { themes } from "services/theme/theme";
import useTheme from "services/theme/useTheme";

interface IProps extends SVGProps<SVGPathElement> {}
export const RoundedSquarePath: FC<IProps> = ({ ...props }) => {
  const { themeName } = useTheme();
  const theme = themes[themeName];

  return (
    <path
      fill={theme.palette.text}
      fillRule="evenodd"
      clipRule="evenodd"
      d="						
          M0 4 A4 4 0 0 1 4 0 H20 A4 4 0 0 1 24 4 V20 A 4 4 0 0 1 20 24 H4 A4 4 0 0 1 0 20 Z
        "
      {...props}
    />
  );
};
