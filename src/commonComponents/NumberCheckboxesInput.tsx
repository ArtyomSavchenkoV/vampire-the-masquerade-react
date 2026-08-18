import { FC, HTMLAttributes } from "react";
import { AdaptiveIndicatorsArray } from "./AdaptiveIndicatorsArray";
import { Checkbox } from "baseComponents/Checkbox";
import styled from "@emotion/styled";

const StyledCheckBox = styled(Checkbox)`
  font-size: 16px;
  height: 18px;
  width: 18px;
`;

interface TProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "value" | "onChange"
> {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export const NumberCheckboxesInput: FC<TProps> = ({
  value,
  max,
  onChange,
  ...props
}) => {
  return (
    <AdaptiveIndicatorsArray {...props}>
      {Array(max)
        .fill(null)
        .map((_, i) => (
          <StyledCheckBox
            key={i}
            checked={i < value}
            onChange={() => onChange(i < value ? i : i + 1)} // или i + 1 === value
          />
        ))}
    </AdaptiveIndicatorsArray>
  );
};
