import { StringButton } from "baseComponents/StringButton";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { TReference } from "domain/Reference";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";

interface TProps extends ComponentProps<typeof StringButton> {
  reference: TReference;
}
/**
 * Отображение текстовой кнопки с окном справки
 */
export const Reference: FC<TProps> = ({ reference, onClick, ...props }) => {
  const { translate } = useTranslate();
  const [open, setOpen] = useState(false);
  return (
    <>
      {reference.type === "mentalDisorder" && (
        <>
          {/* Кнопка */}
          <StringButton
            onClick={(ev) => {
              onClick?.(ev);
              setOpen(true);
            }}
            {...props}
          >
            {translate(`mentalDisorders.${reference.mentalDisorder}.title`)}
          </StringButton>

          {/* Окно */}
          <Dialog onClose={() => setOpen(false)} open={open}>
            <ConfirmWindow
              size="md"
              title={translate(
                `mentalDisorders.${reference.mentalDisorder}.title`,
              )}
              onClose={() => setOpen(false)}
            >
              {translate(
                `mentalDisorders.${reference.mentalDisorder}.description`,
              )}
            </ConfirmWindow>
          </Dialog>
        </>
      )}
    </>
  );
};
