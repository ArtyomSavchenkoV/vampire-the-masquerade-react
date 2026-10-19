import styled from "@emotion/styled";
import { RightPanel } from "commonComponents/RightPanel";

const PADDING = 24;

export const Panel = styled(RightPanel)(`
  width: 1000px;
  padding: ${PADDING}px;
  max-width: calc(60% - ${PADDING * 2}px);
  height: calc(100% - ${PADDING * 2}px);
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 600px) {
    max-width: calc(100% - ${PADDING * 2}px);
  }
`);
