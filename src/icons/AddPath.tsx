import { FC } from "react";
import { themes } from "services/theme/theme";
import useTheme from "services/theme/useTheme";
import { colorMix } from "utils/styles/colorMix";

interface IProps {}
export const AddPath: FC<IProps> = () => {
  const { themeName } = useTheme();
  const theme = themes[themeName];

  return (
    <>
      <circle
        opacity={0.9}
        fill={theme.palette.buttonBackground}
        cx="18"
        cy="18"
        r="6"
      />
      <path
        stroke={colorMix(theme.palette.green, theme.palette.shift, 20)}
        strokeWidth={2}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 18 H21 M18 15 V21"
      />
    </>
  );
};
