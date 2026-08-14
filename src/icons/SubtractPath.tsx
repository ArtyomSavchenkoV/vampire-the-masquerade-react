import { FC } from "react";

interface IProps {}
export const SubtractPath: FC<IProps> = () => {
  return (
    <>
      <circle opacity={0.9} fill="#fff" cx="18" cy="18" r="6" />
      <path
        stroke="#b20"
        strokeWidth={2}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 18 H21"
      />
    </>
  );
};
