import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Select } from "baseComponents/Select";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";
import { ClanName, clanNames } from "domain/Clan";
import { ComponentProps, FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";

const StyledButton = styled(Button)`
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Attention = styled.div`
  color: #f30;
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
          title={translate("editClan.confirmTitle")}
          onConfirm={() => {
            onChange(selectedClanName);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          <div>
            <Attention>{translate("editClan.attention")}</Attention>
            <div>{translate("editClan.confirmTitleMessage")}</div>
          </div>
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
