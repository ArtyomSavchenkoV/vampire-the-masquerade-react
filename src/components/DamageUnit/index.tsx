import { IconButton } from "baseComponents/IconButton";
import { DamageUnitIcon } from "icons/DamageUnitIcon";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { Form } from "./Form";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { useDamageUnitSelector } from "./selectors";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
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
    damageMultipliers,
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
          title={translate("damageUnit.title")}
        >
          <DetailsSectionTitle>
            {joinStrings(
              " ",
              name ? name : null,
              player ? `(${player})` : null,
            )}
          </DetailsSectionTitle>
          <Form
            staminaChecks={staminaChecks}
            stamina={stamina}
            absorptionDice={absorptionDice}
            damageMultipliers={damageMultipliers}
            onDamage={(values) => {
              changeHealth(
                unitId,
                {
                  type: "damage",
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
