import styled from "@emotion/styled";

export const Tbody = styled.tbody`
  & > tr:not(:first-child) > td {
    border-top: 1px solid #ccc;
  }
`;
