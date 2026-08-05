import { AddElementButton } from "commonComponents/editPersonForm/AddElementButton";
import { RemoveElementButton } from "commonComponents/editPersonForm/RemoveElementButton";
import { TitleText } from "commonComponents/TitleText";
import { hasModifiers, healthLevels as healthLevelsData } from "domain/Health";
import { getHealthLevelTranslateKey, HealthLevelData } from "domain/Health";
import { FC, useMemo } from "react";
import useTranslate from "services/translate/useTranslate";

interface TProps {
  healthLevels: HealthLevelData[];
  onChange: (healthLevels: HealthLevelData[]) => void;
  allowDuplicates?: boolean;
}

export const EditHealthLevels: FC<TProps> = ({
  healthLevels,
  onChange,
  allowDuplicates = false,
}) => {
  const { translate } = useTranslate();
  // Поля, которые ещё не добавлены
  const notUsedFields = useMemo(
    () =>
      (allowDuplicates
        ? healthLevelsData.filter(
            // Отсеиваем фиксированные уровни здоровья, которые нельзя изменять
            (healthLevelData) =>
              healthLevelData.name !== "unimpaired" &&
              healthLevelData.name !== "final",
          )
        : healthLevelsData.filter(
            (healthLevelData) =>
              !healthLevels.some((el) => el.name === healthLevelData.name),
          )
      ).map((healthLevelData) => {
        const commonDiceBonus = hasModifiers(healthLevelData)
          ? healthLevelData.modifiers.commonDiceBonus
          : null;
        return {
          value: healthLevelData.name,
          name: `${translate(`healthLevels.${healthLevelData.name}`)}${commonDiceBonus ? ` (${commonDiceBonus})` : ""}`,
        };
      }),
    [allowDuplicates, healthLevels, translate],
  );

  // Поля без фиксированных
  const healthLevelsValues = useMemo(
    () =>
      healthLevels.filter(
        // Отсеиваем фиксированные уровни здоровья, которые нельзя изменять
        (healthLevel) =>
          healthLevel.name !== "unimpaired" && healthLevel.name !== "final",
      ),
    [healthLevels],
  );

  const sortWeight = healthLevelsData.map((healthLevel, index) => ({
    name: healthLevel.name,
    index,
  }));

  const changeHandler = (newHealthLevels: HealthLevelData[]) => {
    onChange([
      ...healthLevels.filter(
        (healthLevel) => healthLevel.name === "unimpaired",
      ),
      ...newHealthLevels.sort(
        (healthLevel1, healthLevel2) =>
          (sortWeight.find((data) => data.name === healthLevel1.name)?.index ??
            0) -
          (sortWeight.find((data) => data.name === healthLevel2.name)?.index ??
            0),
      ),
      ...healthLevels.filter((healthLevel) => healthLevel.name === "final"),
    ]);
  };

  return (
    <>
      {healthLevels.some(
        (healthLevel) => healthLevel.name === "unimpaired",
      ) && <TitleText title={translate("healthLevels.unimpaired")} />}

      {healthLevelsValues.map((healthLevelData, index) => {
        const commonDiceBonus = hasModifiers(healthLevelData)
          ? healthLevelData.modifiers.commonDiceBonus
          : null;
        return (
          <TitleText
            key={allowDuplicates ? index : healthLevelData.name}
            title={`${translate(`healthLevels.${healthLevelData.name}`)}${commonDiceBonus ? ` (${commonDiceBonus})` : ""}`}
          >
            <RemoveElementButton
              onDelete={() => {
                // Удаляем строго по индексу — безопасно даже при дублях
                const nextArray = [...healthLevelsValues];
                nextArray.splice(index, 1);
                changeHandler([...nextArray]);
              }}
              deleteTitle={translate("editHealthLevels.delete")}
              deleteDescription={translate(
                `healthLevels.${getHealthLevelTranslateKey(healthLevelData)}`,
              )}
            />
          </TitleText>
        );
      })}

      {healthLevels.some((healthLevel) => healthLevel.name === "final") && (
        <TitleText title={translate("healthLevels.final")} />
      )}

      {/** Кнопка добавить */}
      {notUsedFields.length > 0 && (
        <AddElementButton
          onAdd={(selectedValue) => {
            const newHealthLevel = healthLevelsData.find(
              (healthLevel) => healthLevel.name === selectedValue,
            );
            if (newHealthLevel) {
              changeHandler([...healthLevelsValues, newHealthLevel]);
            }
          }}
          notUsedFields={notUsedFields}
          addTitle={translate("editHealthLevels.add")}
          allowDuplicates={allowDuplicates}
        />
      )}
    </>
  );
};
