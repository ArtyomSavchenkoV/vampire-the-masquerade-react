import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { TitleText } from "./TitleText";
import { Modifiers as TModifiers } from "domain/Modifiers";
import { ComponentProps, FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { getDefinedEntries } from "utils/object/getDefinedEntries";

const StyledTitleText: FC<ComponentProps<typeof TitleText>> = ({
  ...props
}) => (
  <TitleText
    {...props}
    gridTemplateColumnsOnNormal="1fr auto"
    smallSize={160}
  />
);

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
              <StyledTitleText key={key} title={translate(`attributes.${key}`)}>
                {value}
              </StyledTitleText>
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
              <StyledTitleText key={key} title={translate(`attributes.${key}`)}>
                {value}
              </StyledTitleText>
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
              <StyledTitleText key={key} title={translate(`abilities.${key}`)}>
                {value}
              </StyledTitleText>
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
            <StyledTitleText key={key} title={translate(`wounds.${key}`)}>
              {value}
            </StyledTitleText>
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
              <StyledTitleText key={key} title={translate(`wounds.${key}`)}>
                {value}
              </StyledTitleText>
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
