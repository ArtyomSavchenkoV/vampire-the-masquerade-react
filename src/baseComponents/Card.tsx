import { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

const CardRoot = styled.div`
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.surface};
  box-shadow: 1px 1px 4px
    ${({ theme }) => colorMix(theme.palette.black, "transparent", 80)};
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<TProps> = ({ ...props }) => {
  return <CardRoot {...props} />;
};
