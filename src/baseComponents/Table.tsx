import { HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export const Table = styled.table<TableProps>`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;
