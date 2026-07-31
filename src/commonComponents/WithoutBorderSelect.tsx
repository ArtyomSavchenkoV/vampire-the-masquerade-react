import styled from "@emotion/styled";
import { Select } from "baseComponents/Select";
import { ComponentProps } from "react";

export const StyledSelect = styled(Select)({
  border: "none",
  fontSize: ".7em",
  padding: "0.15em 0",
});

interface TProps extends Omit<
  ComponentProps<typeof Select>,
  "value" | "options" | "onChange"
> {}

export const WithoutBorderSelect = <T extends string | number>({
  ...props
}: {
  value: T;
  options: readonly (T | { value: T; name: string })[];
  onChange: (value: T) => void;
  //@ts-ignore
} & TProps) => <StyledSelect {...props} />;
