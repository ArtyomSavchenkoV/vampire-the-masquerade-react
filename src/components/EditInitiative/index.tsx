import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useEditIniciativeSelector } from "./selectors";
import { useActions } from "store/selectors";
import { NullablePositiveNumberInput } from "commonComponents/NullablePositiveNumberInput";
import styled from "@emotion/styled";

const Input = styled(NullablePositiveNumberInput)`
  display: inline;
  width: 28px;
`;

const Formula = styled.div``;

interface TProps extends ComponentProps<typeof Button> {
  unitId: string;
}

export const EditInitiative: FC<TProps> = ({ unitId, onClick, ...props }) => {
  const { translate } = useTranslate();
  const { commonDiceBonus, dexterity, wits } =
    useEditIniciativeSelector(unitId);
  const { setInitiative } = useActions();
  const [open, setOpen] = useState(false);
  const [newInitiative, setNewInitiative] = useState<number | null>(null);
  const setNewInitiativeHandler = (initiative: number | null) =>
    setNewInitiative(
      initiative == null
        ? null
        : initiative < 0
          ? 0
          : initiative > 50
            ? 50
            : initiative,
    );
  return (
    <>
      <Button
        onClick={(ev) => {
          ev.stopPropagation();
          setOpen(true);
        }}
        {...props}
      />

      <Dialog open={open}>
        <ConfirmWindow
          title={translate("editInitiative.title")}
          onConfirm={() => {
            setInitiative({ id: unitId, initiative: newInitiative });
            setNewInitiative(null);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          <Formula>
            {`${translate("editInitiative.dexterity")} + ${translate("editInitiative.wits")} + `}
            {`${translate("editInitiative.dice")} + ${translate("editInitiative.commonDiceBonus")} = ${translate("editInitiative.newInitiative")}`}
          </Formula>
          <Formula>
            {`${dexterity} + ${wits} + `}
            <Input
              value={
                newInitiative == null
                  ? null
                  : newInitiative - dexterity - wits - commonDiceBonus
              }
              onChange={(dice) =>
                setNewInitiativeHandler(
                  dice == null
                    ? null
                    : dexterity + wits + dice + commonDiceBonus,
                )
              }
            />
            {` + ${commonDiceBonus} = `}
            <Input
              value={newInitiative}
              onChange={(newInitiative) =>
                setNewInitiativeHandler(newInitiative)
              }
            />
          </Formula>
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
