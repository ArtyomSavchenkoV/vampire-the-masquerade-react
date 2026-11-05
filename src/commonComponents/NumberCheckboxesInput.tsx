import { FC, HTMLAttributes, useMemo, useRef, useState } from "react";
import { Checkbox } from "baseComponents/Checkbox";
import styled from "@emotion/styled";
import { useOnElementResize } from "hooks/useOnElementResize";
import { chunkArray } from "utils/array/chunkArray";

const TEN_ELEMS = 10;
const FIVE_ELEMS = 5;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

const Row = styled.div<{ align: "left" | "center" | "right" }>(
  ({ align }) => `
  display: flex;
  gap: 0;
  justify-content: ${align};
`,
);

const DefaultStyledCheckbox = styled(Checkbox)`
  font-size: 16px;
  height: 18px;
  width: 18px;
`;
export function createStyledCheckbox<T extends React.ComponentType<any>>(
  Component: T,
) {
  // Поэксперементировать, это не должно создавать бесконечно стили при каждом запуске
  return styled(Component)`
    font-size: 16px;
    height: 18px;
    width: 18px;
  `;
}

interface TProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "value" | "onChange"
> {
  value: number;
  max: number;
  onChange: (value: number) => void;
  align?: "left" | "center" | "right";
  CustomCheckBox?: typeof Checkbox;
}

export const NumberCheckboxesInput: FC<TProps> = ({
  value,
  max,
  onChange,
  align = "center",
  CustomCheckBox,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setIsSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) => setIsSmallElement(size.width < 18 * TEN_ELEMS + 2),
  });

  const arr = useMemo(
    () =>
      Array(max)
        .fill(null)
        .map((_, i) => i + 1),
    [max],
  );
  const chunkArr = useMemo(
    () => chunkArray(arr, isSmallElement ? FIVE_ELEMS : TEN_ELEMS),
    [arr, isSmallElement],
  );

  const CheckboxComponent = CustomCheckBox
    ? createStyledCheckbox(CustomCheckBox)
    : DefaultStyledCheckbox;

  return (
    <Root ref={ref} {...props}>
      {chunkArr.map((chunk, i) => (
        <Row key={i} align={align}>
          {chunk.map((option) => (
            <CheckboxComponent
              key={option}
              checked={option <= value}
              onChange={() => onChange(option === value ? option - 1 : option)}
            />
          ))}
        </Row>
      ))}
    </Root>
  );
};
