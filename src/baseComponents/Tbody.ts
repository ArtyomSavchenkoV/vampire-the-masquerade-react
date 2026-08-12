import styled from "@emotion/styled";

export const Tbody = styled.tbody`
  & > tr:not(:first-of-type) {
    border-top: 1px solid #ccc;
  }
`;
