import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { ComponentProps, FC, memo, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { EditGhoulForm } from "commonComponents/editUnitForms/EditGhoulForm";
import { useActions, useGhoulSelector } from "store/selectors";
import { initialGhoul } from "data/initialGhoul";
import { Ghoul } from "domain/ghoul/Ghoul";

interface TProps extends Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children"
> {
  ghoulId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditGhoulWindow: FC<TProps> = memo(
  ({ ghoulId, onClose, onSuccess }) => {
    const { translate } = useTranslate();

    const { editGhoul } = useActions();
    const ghoul = useGhoulSelector(ghoulId) || initialGhoul;

    // Данные форм
    const [form, setForm] = useState<Ghoul>(ghoul);

    return (
      <ConfirmWindow
        size="lg"
        title={translate("editKindred.title")}
        onConfirm={() => {
          editGhoul(ghoulId, form);
          onSuccess();
        }}
        onCancel={() => {
          setForm(ghoul);
          onClose();
        }}
        onClose={() => {
          setForm(ghoul);
          onClose();
        }}
      >
        <EditGhoulForm ghoul={form} onChange={setForm} />
      </ConfirmWindow>
    );
  },
);
