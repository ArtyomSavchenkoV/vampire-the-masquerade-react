import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

export const CheckBoxButton = styled.button`
  font-size: 1em;
  padding: 0.2em;
  border: none;
  border-radius: 0.2em;
  cursor: pointer;
  background: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${({ theme }) => theme.palette.buttonText};

  &:hover:enabled {
    background-color: ${({ theme }) => colorMix("transparent", theme.palette.shift, 10)};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
