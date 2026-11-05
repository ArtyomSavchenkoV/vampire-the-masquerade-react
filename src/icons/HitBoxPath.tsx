import { FC } from "react";

interface IProps {}
export const HitBoxPath: FC<IProps> = () => {
  return (
    <path
      strokeWidth={2}
      fillRule="evenodd"
      clipRule="evenodd"
      d="						
          M1 1 H23 V23 H1Z
        "
    />
  );
};
