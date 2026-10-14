import { IconButton } from "baseComponents/IconButton";
import { DamageUnitIcon } from "icons/DamageUnitIcon";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { Form } from "./Form";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { useDamageUnitSelector } from "./selectors";
import { joinStrings } from "utils/string/joinStrings";

interface TProps extends Omit<ComponentProps<typeof IconButton>, "children"> {
  unitId: string;
}

export const DamageUnit: FC<TProps> = ({ unitId, onClick, ...props }) => {
  const { translate } = useTranslate();
  const { changeHealth } = useActions();
  const {
    name,
    player,
    staminaChecks,
    stamina,
    absorptionDice,
    woundMultipliers,
    damageToWoundMap,
  } = useDamageUnitSelector(unitId);
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
        <DamageUnitIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ConfirmWindow
          onClose={() => setOpen(false)}
          title={joinStrings(
            " ",
            translate("damageUnit.title"),
            name ? name : null,
            player ? `(${player})` : null,
          )}
        >
          <Form
            damageToWoundMap={damageToWoundMap}
            staminaChecks={staminaChecks}
            stamina={stamina}
            absorptionDice={absorptionDice}
            woundMultipliers={woundMultipliers}
            onDamage={(values) => {
              changeHealth(
                unitId,
                {
                  type: "wound",
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
