import { IconButton } from "baseComponents/IconButton";
import { ConfirmingButton } from "commonComponents/ConfirmingButton";
import TrashBinIcon from "icons/TrashBinIcon";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";

interface TProps {
  unitId: string;
}

export const DeleteUnit: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { removeUnit } = useActions();

  return (
    <ConfirmingButton
      onConfirm={() => removeUnit(unitId)}
      confirmWindowTitle={translate("deleteUnit.remove")}
      confirmWindowContent={translate("deleteUnit.removeUnitConfirmingMessage")}
      ButtonComponent={IconButton}
    >
      <TrashBinIcon />
    </ConfirmingButton>
  );
};
