import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useEditIniciativeSelector } from "./selectors";
import { useActions } from "store/selectors";
import { NullablePositiveNumberInput } from "commonComponents/NullablePositiveNumberInput";
import styled from "@emotion/styled";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { joinStrings } from "utils/string/joinStrings";
import { NumberCheckboxesInput } from "commonComponents/NumberCheckboxesInput";

const Input = styled(NullablePositiveNumberInput)`
  display: inline;
  width: 28px;
`;

const Content = styled.div`
  text-align: center;
`;

interface TProps extends ComponentProps<typeof Button> {
  unitId: string;
}

export const EditInitiative: FC<TProps> = ({ unitId, onClick, ...props }) => {
  const { translate } = useTranslate();
  const { name, player, commonDiceBonus, dexterity, wits } =
    useEditIniciativeSelector(unitId);
  const { setInitiative } = useActions();
  const [open, setOpen] = useState(false);
  const [newInitiative, setNewInitiative] = useState<number | null>(null);
  const setNewInitiativeHandler = (initiative: number | null) =>
    setNewInitiative(
      initiative === null ? null : initiative > 50 ? 50 : initiative,
    );
  const dice =
    newInitiative !== null
      ? newInitiative - dexterity - wits - commonDiceBonus
      : null;
  return (
    <>
      <Button
        onClick={(ev) => {
          ev.stopPropagation();
          setOpen(true);
          setNewInitiative(null);
        }}
        {...props}
      />

      <Dialog open={open}>
        <ConfirmWindow
          title={joinStrings(
            " ",
            translate("editInitiative.title"),
            name ? name : null,
            player ? `(${player})` : null,
          )}
          onConfirm={() => {
            setInitiative({ id: unitId, initiative: newInitiative });
            setNewInitiative(null);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          {/* Формула расчёта инициативы */}
          <DetailsSectionTitle>
            {translate("editInitiative.formula")}
          </DetailsSectionTitle>
          <Content>
            {joinStrings(
              " ",
              `${translate("editInitiative.dexterity")}(${dexterity})`,
              "+",
              `${translate("editInitiative.wits")}(${wits})`,
              "+",
              `${translate("editInitiative.dice")}(${dice ?? "?"})`,
              "+",
              `${translate("editInitiative.commonDiceBonus")}(${commonDiceBonus})`,
              "=",
              `${translate("editInitiative.initiative")}(${newInitiative ?? "?"})`,
            )}
          </Content>

          {/* Бросок инициативы */}
          <DetailsSectionTitle>
            {translate("editInitiative.enterDiceResult")}
          </DetailsSectionTitle>
          <NumberCheckboxesInput
            value={dice || 0}
            onChange={(dice) =>
              setNewInitiativeHandler(dexterity + wits + dice + commonDiceBonus)
            }
            max={(dice || 0) > 10 ? dice || 0 : 10}
          />

          {/* Прямой ввод инициативы */}
          <DetailsSectionTitle>
            {translate("editInitiative.orEnterInitiative")}
          </DetailsSectionTitle>
          <Content>
            <Input
              value={newInitiative}
              onChange={(newInitiative) =>
                setNewInitiativeHandler(newInitiative)
              }
            />
          </Content>
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
