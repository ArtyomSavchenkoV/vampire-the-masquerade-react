import { ComponentProps, FC, ReactNode, useState } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { ConfirmWindow } from "./ConfirmWindow";

interface TProps extends Omit<ComponentProps<typeof Button>, "onClick"> {
  onConfirm: () => void;
  confirmWindowTitle: ReactNode;
  confirmWindowContent?: ReactNode;
}

export const ConfirmingButton: FC<TProps> = ({
  onConfirm,
  confirmWindowTitle,
  confirmWindowContent,
  disabled,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => !disabled && setOpen(true)}
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
