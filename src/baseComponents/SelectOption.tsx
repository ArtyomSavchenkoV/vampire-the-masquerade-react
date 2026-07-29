import { FC, InputHTMLAttributes } from "react";

interface TProps extends InputHTMLAttributes<HTMLOptionElement> {}

export const SelectOption: FC<TProps> = ({ ...props }) => {
  return <option {...props} />;
};
