import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { ComponentProps, FC, memo, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { EditHumanForm } from "commonComponents/editUnitForms/EditHumanForm";
import { useActions, useHumanSelector } from "store/selectors";
import { initialHuman } from "data/initialHuman";
import { Human } from "domain/human/Human";

interface TProps extends Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children"
> {
  humanId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditHumanWindow: FC<TProps> = memo(
  ({ humanId, onClose, onSuccess }) => {
    const { translate } = useTranslate();

    const { editHuman } = useActions();
    const human = useHumanSelector(humanId) || initialHuman;

    // Данные форм
    const [form, setForm] = useState<Human>(human);

    return (
      <ConfirmWindow
        size="lg"
        title={translate("editKindred.title")}
        onConfirm={() => {
          editHuman(humanId, form);
          onSuccess();
        }}
        onCancel={() => {
          setForm(human);
          onClose();
        }}
        onClose={() => {
          setForm(human);
          onClose();
        }}
      >
        <EditHumanForm human={form} onChange={setForm} />
      </ConfirmWindow>
    );
  },
);
