import styled from "@emotion/styled";
import { Tr } from "baseComponents/Tr";

export const StyledRow = styled(Tr)<{ isFocused: boolean }>(
  ({ isFocused }) => ({
    backgroundColor: isFocused ? "#e3f2fd" : "transparent", // #e3f2fd — светло-голубой
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: !isFocused ? "#f5f5f5" : "#bbdefb", // чуть темнее при ховере, если строка уже активна
    },
  }),
);
