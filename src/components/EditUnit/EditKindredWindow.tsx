import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { ComponentProps, FC, memo, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { EditKindredForm } from "commonComponents/editUnitForms/EditKindredForm";
import { useActions, useKindredSelector } from "store/selectors";
import { clanes } from "data/clanes";
import { initialKindred } from "data/initialKindred";
import { ClanName } from "domain/Clan";
import { Kindred } from "domain/kindred/Kindred";

const INITIAL_CLAN: ClanName = "Gangrel";

interface TProps extends Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children"
> {
  kindredId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditKindredWindow: FC<TProps> = memo(
  ({ kindredId, onClose, onSuccess }) => {
    const { translate } = useTranslate();

    const { editKindred } = useActions();
    const selectedKindred = useKindredSelector(kindredId);
    const kindred = selectedKindred
      ? selectedKindred
      : {
          ...initialKindred,
          clan: clanes[INITIAL_CLAN],
        };

    // Данные форм
    const [kindredForm, setKindredForm] = useState<Kindred>(kindred);

    const changeClanHandler = (clanName: ClanName) => {
      setKindredForm({
        ...initialKindred,
        clan: clanes[clanName],
      });
    };

    return (
      <ConfirmWindow
        size="lg"
        title={translate("editKindred.title")}
        onConfirm={() => {
          editKindred(kindredId, kindredForm);
          onSuccess();
        }}
        onCancel={() => {
          setKindredForm(kindred);
          onClose();
        }}
        onClose={() => {
          setKindredForm(kindred);
          onClose();
        }}
      >
        <EditKindredForm
          kindred={kindredForm}
          onChange={setKindredForm}
          onClanChange={changeClanHandler}
        />
      </ConfirmWindow>
    );
  },
);
