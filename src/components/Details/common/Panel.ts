import styled from "@emotion/styled";
import { RightPanel } from "commonComponents/RightPanel";

export const Panel = styled(RightPanel)`
  padding: 24px;
  max-width: calc(60% - 48px);
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
