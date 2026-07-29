import { FC, HTMLAttributes } from "react";

interface TProps extends HTMLAttributes<HTMLTableRowElement> {}

export const Tr: FC<TProps> = ({ ...props }) => {
  return <tr {...props} />;
};
