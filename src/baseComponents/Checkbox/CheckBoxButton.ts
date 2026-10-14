import styled from "@emotion/styled";

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

  &:hover:enabled {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: #bbb;
    cursor: not-allowed;
  }
`;
