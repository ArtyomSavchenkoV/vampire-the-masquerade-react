import { FC, HTMLAttributes } from "react";

interface TProps extends HTMLAttributes<HTMLTableElement> {}

export const Table: FC<TProps> = ({ ...props }) => {
  return <table {...props} />;
};
