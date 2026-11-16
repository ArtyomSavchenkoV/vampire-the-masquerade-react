import styled from "@emotion/styled";
import { colorMix } from "utils/styles/colorMix";

export const CheckBoxButton = styled.button`
  font-size: 1em;
  height: 2em;
  width: 2em;
  border: none;
  border-radius: 20%;
  cursor: pointer;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.buttonText};

  &:hover:enabled {
    background-color: ${({ theme }) => colorMix("transparent", theme.palette.shift, 10)};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
