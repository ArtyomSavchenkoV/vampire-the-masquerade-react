import TrashBinIcon from "icons/TrashBinIcon";
import styled from "@emotion/styled";
import { ComponentProps, FC } from "react";
import { IconButton } from "baseComponents/IconButton";

const TrashButton = styled(IconButton)`
  font-size: 0.8em;
`;

interface TProps extends Omit<ComponentProps<typeof IconButton>, "children"> {}

export const RemoveElementButton: FC<TProps> = ({ ...props }) => {
  return (
    <TrashButton {...props}>
      <TrashBinIcon />
    </TrashButton>
  );
};
