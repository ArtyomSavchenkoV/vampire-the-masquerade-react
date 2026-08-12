import { FC } from "react";

interface IProps {}
const AddPath: FC<IProps> = () => {
  return (
    <>
      <circle opacity={0.9} fill="#fff" cx="18" cy="18" r="6" />
      <path
        stroke="#2b0"
        strokeWidth={2}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 18 H21 M18 15 V21"
      />
    </>
  );
};

export default AddPath;
