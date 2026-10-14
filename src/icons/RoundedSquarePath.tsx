import { FC, SVGProps } from "react";

interface IProps extends SVGProps<SVGPathElement> {}
export const RoundedSquarePath: FC<IProps> = ({ ...props }) => {
  return (
    <path
      fill="black"
      fillRule="evenodd"
      clipRule="evenodd"
      d="						
          M0 4 A4 4 0 0 1 4 0 H20 A4 4 0 0 1 24 4 V20 A 4 4 0 0 1 20 24 H4 A4 4 0 0 1 0 20 Z
        "
      {...props}
    />
  );
};
