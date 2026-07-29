import { ComponentProps, FC, ReactNode, useState } from "react";
import { Button } from "../baseComponents/Button";
import { Dialog } from "./Dialog";
import { ConfirmWindow } from "./ConfirmWindow";

interface TProps extends ComponentProps<typeof Button> {
  onConfirm: () => void;
  confirmWindowTitle: ReactNode;
  confirmWindowContent?: ReactNode;
}

export const ConfirmingButton: FC<TProps> = ({
  onConfirm,
  onClick,
  confirmWindowTitle,
  confirmWindowContent,
  disabled,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={(ev) => {
          onClick?.(ev);
          !disabled && setOpen(true);
        }}
        disabled={disabled}
        {...props}
      />
      <Dialog open={open}>
        <ConfirmWindow
          title={confirmWindowTitle}
          onConfirm={() => {
            setOpen(false);
            onConfirm();
          }}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          {confirmWindowContent}
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
