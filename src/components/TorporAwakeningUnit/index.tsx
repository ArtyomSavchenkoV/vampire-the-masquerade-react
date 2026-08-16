import { Button } from "baseComponents/Button";
import { ComponentProps, FC, useState } from "react";
import { useTorporAwakeningUnitSelector } from "./selectors";
import { useActions } from "store/selectors";
import useTranslate from "services/translate/useTranslate";
import { Form } from "./Form";
import { Dialog } from "commonComponents/Dialog";

interface TProps extends Omit<ComponentProps<typeof Button>, "children"> {
  unitId: string;
}

export const TorporAwakeningUnit: FC<TProps> = ({
  unitId,
  onClick,
  disabled,
  ...props
}) => {
  const { translate } = useTranslate();
  const { changeHealth } = useActions();
  const { name, player, healthLevel } = useTorporAwakeningUnitSelector(unitId);
  const [open, setOpen] = useState(false);
  const isTorpor =
    healthLevel &&
    healthLevel.name === "final" &&
    healthLevel.variant === "torpor";

  return (
    <>
      <Button
        onClick={(ev) => {
          onClick?.(ev);
          setOpen(true);
        }}
        disabled={!isTorpor || disabled}
        {...props}
      >
        {translate("torporAwakeningUnit.title")}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Form
          name={name}
          player={player}
          onHealTorporAwakening={(values) => {
            changeHealth(unitId, { type: "torpor" }, values.description);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </Dialog>
    </>
  );
};
