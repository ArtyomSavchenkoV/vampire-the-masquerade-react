import { FC } from "react";

interface ColGroupProps {
  widths: readonly (number | string)[];
}

export const ColGroup: FC<ColGroupProps> = ({ widths }) => (
  <colgroup>
    {widths.map((w, idx) => {
      const widthValue = typeof w === "number" ? `${w}px` : w;
      return <col key={idx} style={{ width: widthValue }} />;
    })}
  </colgroup>
);
