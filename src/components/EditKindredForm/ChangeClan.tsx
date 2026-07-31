import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Select } from "baseComponents/Select";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { ClanName, clanNames } from "domain/Clan";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";

const StyledButton = styled(Button)`
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TProps extends Omit<ComponentProps<typeof Button>, "onChange"> {
  clanName: ClanName;
  onChange: (clanName: ClanName) => void;
}

export const ChangeClan: FC<TProps> = ({ clanName, onChange, ...props }) => {
  const { translate } = useTranslate();
  const [open, setOpen] = useState(false);
  const [selectedClanName, setSelectedClanName] = useState(clanName);
  return (
    <>
      <StyledButton onClick={() => setOpen(true)} {...props} />
      <Dialog open={open}>
        <ConfirmWindow
          title={translate("changeClan.confirmTitle")}
          onConfirm={() => {
            onChange(selectedClanName);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          <div>{translate("changeClan.attention")}</div>
          <div>{translate("changeClan.confirmTitleMessage")}</div>
          <Select
            options={clanNames.map((clanName) => ({
              value: clanName,
              name: translate(`clanes.${clanName}`),
            }))}
            value={selectedClanName}
            onChange={setSelectedClanName}
          />
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
