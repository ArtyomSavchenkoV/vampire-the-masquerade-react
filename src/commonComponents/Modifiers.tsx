import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { TitleText } from "./TitleText";
import { Modifiers as TModifiers } from "domain/Modifiers";
import { FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { getDefinedEntries } from "utils/object/getDefinedEntries";

interface TProps {
  modifiers: TModifiers;
}
export const Modifiers: FC<TProps> = ({ modifiers }) => {
  const { translate } = useTranslate();

  return (
    <>
      {/* Плоские бонусы к атрибутам */}
      {modifiers.attributesModifiers && (
        <>
          <DetailsSectionTitle>
            {translate("modifiers.attributesModifiers")}
          </DetailsSectionTitle>
          {getDefinedEntries(modifiers.attributesModifiers).map(
            ({ key, value }) => (
              <TitleText key={key} title={translate(`attributes.${key}`)}>
                {value}
              </TitleText>
            ),
          )}
        </>
      )}

      {/* Ограничение максимального значения атрибута */}
      {modifiers.attributesMaxLimit && (
        <>
          <DetailsSectionTitle>
            {translate("modifiers.attributesMaxLimit")}
          </DetailsSectionTitle>
          {getDefinedEntries(modifiers.attributesMaxLimit).map(
            ({ key, value }) => (
              <TitleText key={key} title={translate(`attributes.${key}`)}>
                {value}
              </TitleText>
            ),
          )}
        </>
      )}

      {/* Плоские бонусы к способностям */}
      {modifiers.abilityModifiers && (
        <>
          <DetailsSectionTitle>
            {translate("modifiers.abilityModifiers")}
          </DetailsSectionTitle>
          {getDefinedEntries(modifiers.abilityModifiers).map(
            ({ key, value }) => (
              <TitleText key={key} title={translate(`abilities.${key}`)}>
                {value}
              </TitleText>
            ),
          )}
        </>
      )}

      {/* Кубики для поглощения урона */}
      {modifiers.absorptionDice && (
        <>
          <DetailsSectionTitle>
            {translate("modifiers.absorptionDice")}
          </DetailsSectionTitle>
          {getDefinedEntries(modifiers.absorptionDice).map(({ key, value }) => (
            <TitleText key={key} title={translate(`wounds.${key}`)}>
              {value}
            </TitleText>
          ))}
        </>
      )}

      {/* Множители получения ранений */}
      {modifiers.woundMultipliers && (
        <>
          <DetailsSectionTitle>
            {translate("modifiers.woundMultipliers")}
          </DetailsSectionTitle>
          {getDefinedEntries(modifiers.woundMultipliers).map(
            ({ key, value }) => (
              <TitleText key={key} title={translate(`wounds.${key}`)}>
                {value}
              </TitleText>
            ),
          )}
        </>
      )}

      {/* Общее изменение количества кубиков при всех бросках. */}
      {modifiers.commonDiceBonus && (
        <>
          <DetailsSectionTitle>
            {translate("modifiers.commonDiceBonus")}
          </DetailsSectionTitle>
          {modifiers.commonDiceBonus}
        </>
      )}
    </>
  );
};
