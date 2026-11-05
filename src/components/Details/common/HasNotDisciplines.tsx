import { FC } from "react";
import useTranslate from "services/translate/useTranslate";

export const HasNotDisciplines: FC = () => {
  const { translate } = useTranslate();
  return <div>{translate("details.unitHasNotDisciplines")}</div>;
};
