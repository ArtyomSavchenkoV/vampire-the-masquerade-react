import styled from "@emotion/styled";

export const UnitsListDescription = styled.div`
  min-width: 300px;
  overflow: hidden;

  /* Для многострочного обрезания с троеточием */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;