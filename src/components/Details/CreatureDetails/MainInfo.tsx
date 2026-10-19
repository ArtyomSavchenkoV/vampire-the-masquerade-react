import { FC } from "react";
import { useMainInfoSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";

interface TProps {
  unitId: string;
}

export const MainInfo: FC<TProps> = ({ unitId }) => {
  const { translate } = useTranslate();
  const { editNotes } = useActions();
  const data = useMainInfoSelector(unitId);
  return (
    <>
      {/* Заметки */}
      {translate("details.notes")}
      <TextArea
        value={data.notes}
        onChange={(ev) => editNotes(unitId, ev.target.value)}
        rows={5}
      />
    </>
  );
};
