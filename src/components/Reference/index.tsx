import { StringButton } from "baseComponents/StringButton";
import { Text } from "baseComponents/Text";
import { TitleText } from "commonComponents/TitleText";
import { auraFragments } from "domain/AuraColor";
import { TReference } from "domain/Reference";
import { ComponentProps, FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { ButtonWindow } from "./ButtonWindow";
import { DisciplineLevelReference } from "./DisciplineLevelReference";

interface TProps extends ComponentProps<typeof StringButton> {
  reference: TReference;
}
/**
 * Отображение текстовой кнопки с окном справки
 */
export const Reference: FC<TProps> = ({
  reference,
  onClick,
  children,
  ...props
}) => {
  const { translate, translateRich } = useTranslate();
  return (
    <>
      {/* Справка о психическом расстройстве. */}
      {reference.type === "mentalDisorder" && (
        <ButtonWindow
          buttonTitle={children}
          onClick={onClick}
          title={translate(`mentalDisorders.${reference.mentalDisorder}.title`)}
        >
          <Text>
            {translate(
              `mentalDisorders.${reference.mentalDisorder}.description`,
            )}
          </Text>
        </ButtonWindow>
      )}

      {/* Справка о силе дисциплины */}
      {reference.type === "disciplineLevel" && (
        <DisciplineLevelReference reference={reference}>
          {children}
        </DisciplineLevelReference>
      )}

      {/* Справка о цветах ауры */}
      {reference.type === "auraColors" && (
        <ButtonWindow
          buttonTitle={children}
          onClick={onClick}
          title={translate("auraColors.title")}
        >
          {auraFragments.map((fragment) => (
            <TitleText title={translate(`auraColors.${fragment}.title`)}>
              {translate(`auraColors.${fragment}.color`)}
            </TitleText>
          ))}
        </ButtonWindow>
      )}

      {/* Справка видиние невидимого */}
      {reference.type === "seeInvisible" && (
        <ButtonWindow
          buttonTitle={children}
          onClick={onClick}
          title={translate("disciplines.auspex.seeInvisible.title")}
        >
          <Text>
            {translateRich("disciplines.auspex.seeInvisible.text", {
              heightened_senses: (
                <Reference
                  reference={{
                    type: "disciplineLevel",
                    discipline: "auspex",
                    level: 1,
                  }}
                />
              ),
            })}
          </Text>
        </ButtonWindow>
      )}
    </>
  );
};
