import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { ComponentProps, FC, memo, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { EditCreatureForm } from "commonComponents/editUnitForms/EditCreatureForm";
import { useActions, useCreatureSelector } from "store/selectors";
import { initialCreature } from "data/initialCreature";
import { Creature } from "domain/creature/Creature";

interface TProps extends Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children"
> {
  creatureId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditCreatureWindow: FC<TProps> = memo(
  ({ creatureId, onClose, onSuccess }) => {
    const { translate } = useTranslate();

    const { editCreature } = useActions();
    const creature = useCreatureSelector(creatureId) || initialCreature;

    // Данные форм
    const [form, setForm] = useState<Creature>(creature);

    return (
      <ConfirmWindow
        size="lg"
        title={translate("editKindred.title")}
        onConfirm={() => {
          editCreature(creatureId, form);
          onSuccess();
        }}
        onCancel={() => {
          setForm(creature);
          onClose();
        }}
        onClose={() => {
          setForm(creature);
          onClose();
        }}
      >
        <EditCreatureForm creature={form} onChange={setForm} />
      </ConfirmWindow>
    );
  },
);
