import styled from "@emotion/styled";
import { CheckBoxCheckedIcon } from "baseComponents/Checkbox/CheckBoxCheckedIcon";
import { CheckboxIcon } from "baseComponents/Checkbox/CheckboxIcon";
import { ComponentProps, FC } from "react";

const StyledButton = styled.button`
  font-size: 1em;
  height: 2em;
  width: 2em;
  border: none;
  border-radius: 20%;
  cursor: pointer;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:enabled {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: #bbb;
    cursor: not-allowed;
  }
`;

interface TProps extends Omit<
  ComponentProps<typeof StyledButton>,
  "children" | "onChange"
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: FC<TProps> = ({
  checked,
  onChange,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      onClick={(ev) => {
        onClick?.(ev);
        onChange(!checked);
      }}
      {...props}
    >
      {!checked && <CheckboxIcon />}
      {checked && <CheckBoxCheckedIcon />}
    </StyledButton>
  );
};
