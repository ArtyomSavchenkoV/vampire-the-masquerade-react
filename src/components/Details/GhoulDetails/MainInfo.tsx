import { FC } from "react";
import { useMainInfoSelector } from "./selectors";
import { TextArea } from "baseComponents/TextArea";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { MainInfoLayout } from "../common/MainInfoLayout";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { TitleText } from "commonComponents/TitleText";
import { getGhoulHealthLevel } from "domain/ghoul/Health";
import { getHealthLevelTranslateKey } from "domain/Health";
import { joinStrings } from "utils/string/joinStrings";
import { HealUnit } from "components/HealUnit";
import { DamageUnit } from "components/DamageUnit";
import { Divider } from "baseComponents/Divider";
import { Wounds } from "../common/Wounds";
import { ghoulHealthLevels } from "data/ghoulHealthLevels";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";

interface TProps {
  unitId: string;
}

export const MainInfo: FC<TProps> = withErrorBoundary(({ unitId }) => {
  const { translate } = useTranslate();
  const { editNotes } = useActions();
  const data = useMainInfoSelector(unitId);
  const healthLevels = ghoulHealthLevels;
  const healthLevel = getGhoulHealthLevel(data.bodyWounds);

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
            {`${healthLevels.length - data.bodyWounds.length - 1}/${healthLevels.length - 1}`}
          </TitleText>
          {/* Наименование уровня здоровья */}
          <TitleText title={translate("details.healthLevel")}>
            {joinStrings(
              " ",
              healthLevel &&
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
          {data.bodyWounds && (
            <Wounds
              wounds={data.bodyWounds}
              maxWounds={healthLevels.length - 2}
            />
          )}
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
      bloodPool={
        <>
          {/* Запас крови */}
          <TitleText title={translate("fields.bloodPool")}>
            {`${data.bloodPool}/${data?.maxBloodPool}`}
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
      social={
        <>
          {/* Хроника */}
          <TitleText title={translate("fields.chronicle")}>
            {data.chronicle}
          </TitleText>
          {/* Разделитель */}
          <Divider />
          {/* Натура */}
          <TitleText title={translate("fields.nature")}>
            {data.nature}
          </TitleText>
          {/* Маска */}
          <TitleText title={translate("fields.demeanor")}>
            {data.demeanor}
          </TitleText>
          {/* Амплуа */}
          <TitleText title={translate("fields.role")}>{data.role}</TitleText>
        </>
      }
      clan={
        <>
          <TitleText title={translate("fields.domitor")}>
            {data.domitor}
          </TitleText>
        </>
      }
      meritsAndFlaws={
        <>
          {/* Достоинства */}
          <DetailsSectionTitle>
            {translate("details.merits")}
          </DetailsSectionTitle>
          {data.merits.map((merit) => (
            <div key={merit}>{translate(`merits.${merit}`)}</div>
          ))}
          {/* Недостатки */}
          <DetailsSectionTitle>
            {translate("details.flaws")}
          </DetailsSectionTitle>
          {data.flaws.map((flaw) => (
            <div key={flaw}>{translate(`flaws.${flaw}`)}</div>
          ))}
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
