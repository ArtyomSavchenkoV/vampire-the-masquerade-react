import styled from "@emotion/styled";

export const TextArea = styled.textarea<{ rows?: number }>(({ rows = 4 }) => ({
  padding: 2,
  borderWidth: 1,
  borderRadius: 4,
  width: `calc(100% - 4px - 2px)`,
  minHeight: `calc(${rows} * 1em + (${rows} - 1) * 1px + 4px)`,
}));
