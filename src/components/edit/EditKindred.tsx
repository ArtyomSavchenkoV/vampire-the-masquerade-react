import { Button } from "baseComponents/Button";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { ComponentProps, FC, memo, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { EditKindredForm } from "./EditKindredForm";
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
}

export const EditKindred: FC<TProps> = memo(({ kindredId }) => {
  const { translate } = useTranslate();

  const { editKindred } = useActions();
  const selectedKindred = useKindredSelector(kindredId);
  const kindred = selectedKindred
    ? selectedKindred
    : {
        ...initialKindred,
        clan: clanes[INITIAL_CLAN],
      };

  const [open, setOpen] = useState(false);

  // Данные форм
  const [kindredForm, setKindredForm] = useState<Kindred>(kindred);

  const changeClanHandler = (clanName: ClanName) => {
    setKindredForm({
      ...initialKindred,
      clan: clanes[clanName],
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {translate("editKindred.editButton")}
      </Button>

      <Dialog open={open}>
        <ConfirmWindow
          title={translate("editKindred.title")}
          onConfirm={() => {
            editKindred(kindredId, kindredForm);
            setOpen(false);
          }}
          onCancel={() => {
            setKindredForm(kindred);
            setOpen(false);
          }}
          onClose={() => {
            setKindredForm(kindred);
            setOpen(false);
          }}
        >
          <EditKindredForm
            kindred={kindredForm}
            onChange={setKindredForm}
            onClanChange={changeClanHandler}
          />
        </ConfirmWindow>
      </Dialog>
    </>
  );
});
