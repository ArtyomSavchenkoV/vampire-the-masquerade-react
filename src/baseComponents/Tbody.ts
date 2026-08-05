import styled from "@emotion/styled";

export const Tbody = styled.tbody`
  & > tr:not(:first-of-type) > td {
    border-top: 1px solid #ccc;
  }
`;
