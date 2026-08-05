import TrashBinIcon from "icons/TrashBinIcon";
import styled from "@emotion/styled";
import { ComponentProps, FC } from "react";
import { Button } from "baseComponents/Button";

const TrashButton = styled(Button)`
  height: 19px;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.54em;
`;

interface TProps extends Omit<ComponentProps<typeof Button>, "children"> {}

export const RemoveElementButton: FC<TProps> = ({ ...props }) => {
  return (
    <TrashButton {...props}>
      <TrashBinIcon />
    </TrashButton>
  );
};
