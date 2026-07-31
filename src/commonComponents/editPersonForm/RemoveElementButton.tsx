import TrashBinIcon from "icons/TrashBinIcon";
import styled from "@emotion/styled";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import { ComponentProps, FC } from "react";

const TrashButton = styled(ConfirmingButton)`
  height: 19px;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.54em;
`;

interface TProps extends Omit<
  ComponentProps<typeof ConfirmingButton>,
  "onConfirm" | "confirmWindowTitle" | "confirmWindowContent"
> {
  onDelete: () => void;
  deleteTitle: string;
  deleteDescription?: string;
}

export const RemoveElementButton: FC<TProps> = ({
  onDelete,
  deleteTitle,
  deleteDescription,
  ...props
}) => {
  return (
    <TrashButton
      onConfirm={onDelete}
      confirmWindowTitle={deleteTitle}
      confirmWindowContent={deleteDescription}
      {...props}
    >
      <TrashBinIcon />
    </TrashButton>
  );
};
