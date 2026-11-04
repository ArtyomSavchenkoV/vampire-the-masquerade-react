import styled from "@emotion/styled";
import { Tab } from "baseComponents/Tab";
import { withErrorBoundary } from "commonComponents/hoc/withErrorBoundary";
import { Modifiers } from "commonComponents/Modifiers";
import {
  DisciplineLevel as TDisciplineLevel,
  DisciplineName,
  Discipline,
  DisciplineLevelVariants,
  getCheckRuleTargetTranslationKey,
} from "domain/Discipline";
import { ComponentProps, FC, useMemo, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { disciplines } from "data/disciplines";
import { DictionaryTranslatePaths } from "dictionaries/types";
import { DecrementUnionNumbers } from "utils/types/DecrementUnionNumbers";
import { Card } from "baseComponents/Card";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { joinStrings } from "utils/string/joinStrings";
import { getDefinedEntries } from "utils/object/getDefinedEntries";
import { TitleText } from "commonComponents/TitleText";
import { Divider } from "baseComponents/Divider";

type LevelVariants<
  TName extends DisciplineName,
  TLevel extends TDisciplineLevel,
> = Discipline<TName>[DecrementUnionNumbers<TLevel>];

type LevelVariantName<
  TName extends DisciplineName,
  TLevel extends TDisciplineLevel,
> = keyof LevelVariants<TName, TLevel> & string;

const getLevelVariants = <
  TName extends DisciplineName,
  TLevel extends TDisciplineLevel,
>(
  disciplineName: TName,
  disciplineLevel: TLevel,
): LevelVariants<TName, TLevel> =>
  disciplines[disciplineName][disciplineLevel - 1] as LevelVariants<
    TName,
    TLevel
  >;

const typedKeys = <T extends object>(obj: T): (keyof T & string)[] =>
  Object.keys(obj) as (keyof T & string)[];

const StyledTitleText: FC<ComponentProps<typeof TitleText>> = ({
  ...props
}) => (
  <TitleText
    {...props}
    gridTemplateColumnsOnNormal="1fr auto"
    smallSize={160}
  />
);

const Root = styled(Card)<{ isNotMastered: boolean }>(
  ({ isNotMastered }) => `
    display: flex;
    flex-direction: column;
    gap: 4px;
    ${isNotMastered ? "opacity: .5; background-color: #eee;" : ""}
  `,
);

const Name = styled(DetailsSectionTitle)(`
  font-size: 1em;
`);

const Variants = styled.div(`
  font-size: .8em;
`);

export const DisciplineLevel = withErrorBoundary(
  <TName extends DisciplineName, TLevel extends TDisciplineLevel>({
    disciplineName,
    disciplineLevel,
    isHasBeenMastered,
    ...props
  }: {
    disciplineName: TName;
    disciplineLevel: TLevel;
    isHasBeenMastered: boolean;
  } & ComponentProps<typeof Card>) => {
    const { translate } = useTranslate();

    const variants = getLevelVariants(disciplineName, disciplineLevel);
    const variantsNames = useMemo(() => typedKeys(variants), [variants]);
    const variantsRecord: DisciplineLevelVariants = variants;

    const [selectedVariant, setSelectedVariant] = useState<
      LevelVariantName<TName, TLevel> | undefined
    >();

    const validatedSelectedVariant = useMemo<
      LevelVariantName<TName, TLevel>
    >(() => {
      const fallback = variantsNames[0];
      return selectedVariant && variantsNames.includes(selectedVariant)
        ? selectedVariant
        : fallback;
    }, [variantsNames, selectedVariant]);

    const disciplineLevelVariant = variantsRecord[validatedSelectedVariant];

    return (
      <Root isNotMastered={!isHasBeenMastered} {...props}>
        {/* Название */}
        <Name>
          {translate(
            `disciplines.${disciplineName}.levels.${disciplineLevel}.name`,
          )}
        </Name>

        {/* Варианты */}
        <Variants>
          {variantsNames.length > 1 &&
            variantsNames.map((variantName) => (
              <Tab
                key={variantName}
                isSelected={validatedSelectedVariant === variantName}
                onClick={() => setSelectedVariant(variantName)}
              >
                {translate(
                  `disciplines.${disciplineName}.levels.${disciplineLevel}.variants.${variantName}.name` as DictionaryTranslatePaths,
                )}
              </Tab>
            ))}

          {/* Тип */}
          {variantsNames.length === 1 &&
            translate(`disciplinesDetails.${disciplineLevelVariant.type}`)}
        </Variants>

        {/* Описание */}
        {translate(
          `disciplines.${disciplineName}.levels.${disciplineLevel}.variants.${validatedSelectedVariant}.description` as DictionaryTranslatePaths,
        )}

        {/* Допустимые цели */}
        {disciplineLevelVariant.type === "usable" && (
          <>
            <DetailsSectionTitle>
              {translate("disciplinesDetails.targetField")}
            </DetailsSectionTitle>
            {joinStrings(
              ", ",
              ...disciplineLevelVariant.availableTarget.map((target) =>
                translate(`disciplinesDetails.target.${target}`),
              ),
            )}
          </>
        )}

        {/* Стоимость активации */}
        {disciplineLevelVariant.type === "usable" &&
          disciplineLevelVariant.cost && (
            <>
              <DetailsSectionTitle>
                {translate("disciplinesDetails.costField")}
              </DetailsSectionTitle>
              {getDefinedEntries(disciplineLevelVariant.cost).map(
                ({ key, value }) => (
                  <StyledTitleText
                    key={key}
                    title={translate(`resources.${key}`)}
                  >
                    {value}
                  </StyledTitleText>
                ),
              )}
            </>
          )}

        {/* Правило проверки */}
        {disciplineLevelVariant.type === "usable" &&
          disciplineLevelVariant.check && (
            <>
              {/* Проверка */}
              <DetailsSectionTitle>
                {translate("disciplinesDetails.checkField")}
              </DetailsSectionTitle>
              {joinStrings(
                "+",
                ...disciplineLevelVariant.check.selfCheck.map((checkParam) =>
                  translate(getCheckRuleTargetTranslationKey(checkParam)),
                ),
              )}
              {/* Сложность проверки */}
              <DetailsSectionTitle>
                {translate("disciplinesDetails.checkDifficultField")}
              </DetailsSectionTitle>
              <StyledTitleText
                title={translate(
                  `disciplinesDetails.checkDifficult.${disciplineLevelVariant.check.type}`,
                )}
              >
                {disciplineLevelVariant.check.type === "fixedDifficulty" &&
                  disciplineLevelVariant.check.difficultLevel}
                {disciplineLevelVariant.check.type === "opposedCheck" &&
                  joinStrings(
                    "+",
                    ...disciplineLevelVariant.check.difficultTarget.map(
                      (checkParam) =>
                        translate(getCheckRuleTargetTranslationKey(checkParam)),
                    ),
                  )}
              </StyledTitleText>
            </>
          )}

        {/* Модификаторы */}
        {disciplineLevelVariant?.effects && (
          <Modifiers modifiers={disciplineLevelVariant.effects} />
        )}

        {/* Длительность */}
        {disciplineLevelVariant.type === "usable" &&
          disciplineLevelVariant.duration && (
            <>
              <Divider />
              <StyledTitleText
                title={translate("disciplinesDetails.durationField")}
              >
                {(disciplineLevelVariant.duration === "scene" &&
                  translate("disciplinesDetails.duration.scene")) ||
                  (disciplineLevelVariant.duration === "successCount" &&
                    translate("disciplinesDetails.duration.successCount")) ||
                  disciplineLevelVariant.duration}
              </StyledTitleText>
            </>
          )}

        {/* Время каста */}
        {disciplineLevelVariant.type === "usable" &&
          disciplineLevelVariant.castDuration && (
            <>
              <Divider />
              <StyledTitleText
                title={translate("disciplinesDetails.castDurationField")}
              >
                {disciplineLevelVariant.castDuration}
              </StyledTitleText>
            </>
          )}
      </Root>
    );
  },
);
