import { FC } from "react";
import { useMainInfoSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { MainInfoLayout } from "../common/MainInfoLayout";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { TitleText } from "commonComponents/TitleText";
import { getCreatureHealthLevel } from "domain/creature/Health";
import { getHealthLevelTranslateKey } from "domain/Health";
import { joinStrings } from "utils/string/joinStrings";
import { HealUnit } from "components/HealUnit";
import { DamageUnit } from "components/DamageUnit";
import { Wounds } from "../common/Wounds";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";

interface TProps {
  unitId: string;
}

export const MainInfo: FC<TProps> = withErrorBoundary(({ unitId }) => {
  const { translate } = useTranslate();
  const { editNotes } = useActions();
  const data = useMainInfoSelector(unitId);
  const healthLevel = getCreatureHealthLevel(
    data.healthLevels,
    data.bodyWounds,
  );

  return (
    <MainInfoLayout
      actions={
        <>
          <HealUnit unitId={unitId} disabled={healthLevel.name === "final"} />
          <DamageUnit unitId={unitId} disabled={healthLevel.name === "final"} />
        </>
      }
      health={
        <>
          {/* Здоровье */}
          <TitleText title={translate("details.health")}>
            {`${data.healthLevels.length - data.bodyWounds.length - 1}/${data.healthLevels.length - 1}`}
          </TitleText>
          {/* Наименование уровня здоровья */}
          <TitleText title={translate("details.healthLevel")}>
            {joinStrings(
              " ",
              translate(
                `health.healthLevels.${getHealthLevelTranslateKey(healthLevel)}`,
              ),
              healthLevel.modifiers?.commonDiceBonus &&
                `(${healthLevel.modifiers.commonDiceBonus})`,
            )}
          </TitleText>
          {/* Раны */}
          <DetailsSectionTitle>
            {translate("details.wounds")}
          </DetailsSectionTitle>
          <Wounds
            wounds={data.bodyWounds}
            maxWounds={data.healthLevels.length - 1}
          />
        </>
      }
      willpower={
        <>
          {/* Запас воли */}
          <TitleText title={translate("fields.willpower")}>
            {`${data.willpower}/${data.maxWillpower}`}
          </TitleText>
        </>
      }
      effects={
        <>
          {/* Действующие состояния */}
          <DetailsSectionTitle>
            {translate("details.states")}
          </DetailsSectionTitle>
        </>
      }
      notes={
        <>
          {/* Заметки */}
          <DetailsSectionTitle>
            {translate("details.notes")}
          </DetailsSectionTitle>
          <TextArea
            value={data.notes}
            onChange={(ev) => editNotes(unitId, ev.target.value)}
            rows={10}
          />
        </>
      }
    />
  );
});
