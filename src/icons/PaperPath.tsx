import { FC } from "react";

interface IProps {}
export const PaperPath: FC<IProps> = () => {
  return (
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="			
            M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z
            M6 20V4h7v5h5v11H6z
        "
    />
  );
};
