import styled from "@emotion/styled";

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.palette.divider};
  margin: calc((1em - 1px) / 2) 0;
`;
