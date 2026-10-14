import { IconButton } from "baseComponents/IconButton";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { HealUnitIcon } from "icons/HealUnitIcon";
import { ComponentProps, FC, useState } from "react";
import { Form } from "./Form";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { useHealUnitSelector } from "./selectors";
import { joinStrings } from "utils/string/joinStrings";

interface TProps extends Omit<ComponentProps<typeof IconButton>, "children"> {
  unitId: string;
}

export const HealUnit: FC<TProps> = ({ unitId, onClick, ...props }) => {
  const { translate } = useTranslate();
  const { changeHealth } = useActions();
  const { name, player } = useHealUnitSelector(unitId);
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
        <HealUnitIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ConfirmWindow
          onClose={() => setOpen(false)}
          title={joinStrings(
            " ",
            translate("healUnit.title"),
            name ? name : null,
            player ? `(${player})` : null,
          )}
        >
          <Form
            onHeal={(values) => {
              changeHealth(
                unitId,
                {
                  type: "heal",
                  value: values.value,
                  woundType: values.type,
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
