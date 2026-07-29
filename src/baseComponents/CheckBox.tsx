import { FC, InputHTMLAttributes } from "react";

interface TPtops extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox: FC<TPtops> = ({ ...props }) => {
  return <input type="checkbox" {...props} />;
};
