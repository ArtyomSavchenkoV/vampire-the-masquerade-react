import { Input } from "baseComponents/Input";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { TitleText } from "commonComponents/TitleText";
import { FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { joinStrings } from "utils/string/joinStrings";

interface TProps {
  name: string;
  player: string | null;
  onHealTorporAwakening: (values: { description: string }) => void;
  onCancel: () => void;
}
export const Form: FC<TProps> = ({
  name,
  player,
  onHealTorporAwakening,
  onCancel,
}) => {
  const { translate } = useTranslate();
  const [description, setDescription] = useState<string>("");

  return (
    <ConfirmWindow
      title={translate("torporAwakeningUnit.title")}
      onConfirm={() => onHealTorporAwakening({ description })}
      onCancel={onCancel}
      onClose={onCancel}
    >
      <DetailsSectionTitle>
        {joinStrings(" ", name ? name : null, player ? `(${player})` : null)}
      </DetailsSectionTitle>
      <TitleText title={translate("torporAwakeningUnit.description")}>
        <Input
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </TitleText>
    </ConfirmWindow>
  );
};
