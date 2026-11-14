import { StringButton } from "baseComponents/StringButton";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { ComponentProps, FC, ReactNode, useState } from "react";

interface TProps extends Omit<
  ComponentProps<typeof StringButton>,
  "title" | "children"
> {
  buttonTitle?: ReactNode;
  title: ReactNode;
  children: ReactNode;
}
/**
 * Отображение текстовой кнопки с окном справки
 */
export const ButtonWindow: FC<TProps> = ({
  buttonTitle,
  title,
  onClick,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Кнопка */}
      <StringButton
        onClick={(ev) => {
          onClick?.(ev);
          setOpen(true);
        }}
        {...props}
      >
        {buttonTitle || title}
      </StringButton>

      {/* Окно */}
      <Dialog onClose={() => setOpen(false)} open={open}>
        <ConfirmWindow size="md" title={title} onClose={() => setOpen(false)}>
          {children}
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
