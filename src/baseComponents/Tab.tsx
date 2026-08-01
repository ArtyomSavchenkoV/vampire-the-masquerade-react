import styled from "@emotion/styled";
import { Button } from "./Button";

export const Tab = styled(Button)<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    fontSize: "1em",
    borderRadius: 0,
    border: "none",
    borderBottom: "3px solid rgb(93, 122, 238)",
    borderBottomColor: isSelected ? "rgb(118, 142, 236)" : "transparent",
    backgroundColor: "transparent",
    color: "#000",
    fontWeight: isSelected ? 700 : 400,
    ":focus-visible": {
      borderBottom: "3px solid rgb(92, 121, 233)",
      boxShadow: "0 0 0 2px rgba(3, 0, 255, 0.3)", // мягкий акцент для фокуса
    },
  }),
);
