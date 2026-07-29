import { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

const CardRoot = styled.div`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<TProps> = ({ ...props }) => {
  return <CardRoot {...props} />;
};
