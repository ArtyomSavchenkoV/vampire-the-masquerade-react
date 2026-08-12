import { IconButton } from "baseComponents/IconButton";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { HealIcon } from "icons/HealIcon";
import { ComponentProps, FC, useState } from "react";
import { Form } from "./Form";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";

interface TProps extends Omit<ComponentProps<typeof IconButton>, "children"> {
  unitId: string;
}

export const HealUnit: FC<TProps> = ({ unitId, onClick, ...props }) => {
  const { translate } = useTranslate();
  const { changeHealth } = useActions();
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={(ev) => {
          onClick?.(ev);
          setOpen(true);
        }}
        {...props}
      >
        <HealIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ConfirmWindow
          onClose={() => setOpen(false)}
          title={translate("healUnit.title")}
        >
          <Form
            onHeal={(values) => {
              changeHealth(
                unitId,
                {
                  type: "heal",
                  value: values.value,
                  damageType: values.type,
                },
                values.description,
              );
              setOpen(false);
            }}
          />
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
