import { FC, HTMLAttributes } from "react";

interface TProps extends HTMLAttributes<HTMLTableCellElement> {}

export const Td: FC<TProps> = ({ ...props }) => {
  return <td {...props} />;
};
