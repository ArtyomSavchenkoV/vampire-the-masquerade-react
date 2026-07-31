import { FC } from "react";
import { InlineIcon } from "./InlineIcon";

interface IProps {}
const TrashBinIcon: FC<IProps> = () => {
  return (
    <InlineIcon>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="						
          M2.75 3 H 7 V2 A2 2 0 0 1 9 0 H15 A 2 2 0 0 1 17 2 V 3 H21.25 A1.375 1.375 0 1 1 21.25 5.75 H2.75 A1.375 1.375 0 1 1 2.75 3Z
          M8.5 3 H15.5 V2.25 A1 1 0 0 0 14.5 1.25 H9.5 A1 1 0 0 0 8.5 2.25 Z

          M3 7 H21 L19.75 22 A2 2 0 0 1 17.75 24 H6.25 A2 2 0 0 1 4.25 22Z
          M11.25 9 V20.5 A.75 .75 0 0 0 12.75 20.5 V9 A.75 .75 0 0 0 11.25 9Z
          M7 9 L7.5 20.5 A.75 .75 0 0 0 9 20.5 L8.5 9 A.75 .75 0 0 0 7 9Z
          M15.5 9 L15 20.5 A.75 .75 0 0 0 16.5 20.5 L17 9 A.75 .75 0 0 0 15.5 9Z
        "
      />
    </InlineIcon>
  );
};

export default TrashBinIcon;
