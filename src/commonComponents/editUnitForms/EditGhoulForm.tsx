import { Input } from "baseComponents/Input";
import { Select } from "baseComponents/Select";
import { ArrayEditor } from "./common/ArrayEditor";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { GhoulLayout } from "./common/GhoulLayout";
import { PartialObjectEditor } from "./common/PartialObjectEditor";
import { PositiveNumberInput } from "commonComponents/PositiveNumberInput";
import { TitleText } from "commonComponents/TitleText";
import { merits, flaws } from "data/meritsAndFlaws";
import {
  AbilityName,
  BaseAbilityLevel,
  baseAbilityLevels,
} from "domain/Abilities";
import {
  AttributeName,
  BaseAttributeLevel,
  baseAttributeLevels,
} from "domain/Attributes";
import { backgroundLevels, backgroundNames } from "domain/Backgrounds";
import { damageTypes } from "domain/Damage";
import {
  disciplineLevels,
  DisciplineName,
  disciplineNames,
} from "domain/Discipline";
import { humanityOrPathRatings } from "domain/HumanityOrPathRating";
import { aggregateModifiers } from "domain/ghoul/CalculatedGhoul";
import { getGhoulHealthLevel } from "domain/ghoul/Health";
import { Ghoul } from "domain/ghoul/Ghoul";
import {
  MentalStability,
  MentalStabilityLevel,
  mentalStabilityLevels,
} from "domain/MentalStability";
import { FlawName, MeritName, MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { willpowerLevels } from "domain/Willpower";
import { FC, HTMLAttributes } from "react";
import useTranslate from "services/translate/useTranslate";
import { getDefinedEntries } from "utils/object/getDefinedEntries";
import { WithoutBorderSelect } from "commonComponents/WithoutBorderSelect";
import { NameTitleText } from "commonComponents/NameTitleText";
import { NameInput } from "./common/NameInput";
import { getHealthLevelTranslateKey } from "domain/Health";
import { MAX_HEALTH } from "data/ghoulHealthLevels";
import { Info } from "./common/Info";
import { completeHealthEvents } from "domain/ghoul/ResourcesHistory";

interface TProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  ghoul: Ghoul;
  onChange: (ghoul: Ghoul) => void;
}

export const EditGhoulForm: FC<TProps> = ({ ghoul, onChange, ...props }) => {
  const { translate } = useTranslate();
  const attributesMaxLimit = aggregateModifiers(ghoul).attributesMaxLimit;

  const attributeChangeHandler = (
    name: AttributeName,
    value: BaseAttributeLevel,
  ) => {
    onChange({
      ...ghoul,
      attributes: { ...ghoul.attributes, [name]: value },
    });
  };

  const abilityChangeHandler = (name: AbilityName, value: BaseAbilityLevel) => {
    onChange({
      ...ghoul,
      abilities: { ...ghoul.abilities, [name]: value },
    });
  };

  const mentalStabilityHandler = (
    name: MentalStability,
    value: MentalStabilityLevel,
  ) => {
    onChange({
      ...ghoul,
      mentalStability: { ...ghoul.mentalStability, [name]: value },
    });
  };

  const bodyDamages = completeHealthEvents(
    ghoul.bodyDamages,
    ghoul.resourcesHistory.health,
  );

  const healthLevel = getGhoulHealthLevel(bodyDamages);

  return (
    <GhoulLayout
      name={
        /* Имя */
        <NameTitleText title={translate("fields.name")}>
          <NameInput
            value={ghoul.name}
            onChange={(ev) => onChange({ ...ghoul, name: ev.target.value })}
          />
        </NameTitleText>
      }
      player={
        /* Игрок */
        <NameTitleText title={translate("fields.player")}>
          <NameInput
            value={ghoul.player ?? ""}
            onChange={(ev) =>
              onChange({ ...ghoul, player: ev.target.value || null })
            }
          />
        </NameTitleText>
      }
      chronicle={
        /* Хроника */
        <TitleText title={translate("fields.chronicle")}>
          <Input
            value={ghoul.chronicle ?? ""}
            onChange={(ev) =>
              onChange({ ...ghoul, chronicle: ev.target.value || null })
            }
          />
        </TitleText>
      }
      personality={
        <>
          {/* Натура */}
          <TitleText title={translate("fields.nature")}>
            <Input
              value={ghoul.nature}
              onChange={(ev) => onChange({ ...ghoul, nature: ev.target.value })}
            />
          </TitleText>
          {/* Маска */}
          <TitleText title={translate("fields.demeanor")}>
            <Input
              value={ghoul.demeanor}
              onChange={(ev) =>
                onChange({ ...ghoul, demeanor: ev.target.value })
              }
            />
          </TitleText>
          {/* Амплуа */}
          <TitleText title={translate("fields.role")}>
            <Input
              value={ghoul.role}
              onChange={(ev) => onChange({ ...ghoul, role: ev.target.value })}
            />
          </TitleText>
        </>
      }
      domitor={
        <>
          {/* Домитор */}
          <TitleText title={translate("fields.domitor")}>
            <Input
              value={ghoul.domitor ?? ""}
              onChange={(ev) =>
                onChange({ ...ghoul, domitor: ev.target.value || null })
              }
            />
          </TitleText>
        </>
      }
      physical={
        <>
          {/* Физические */}
          <DetailsSectionTitle>
            {translate("createUnit.physical")}
          </DetailsSectionTitle>
          {/* Сила */}
          <TitleText title={translate("attributes.strength")}>
            {attributesMaxLimit?.strength === 0 && 0}
            {attributesMaxLimit?.strength !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.strength}
                onChange={(value) => attributeChangeHandler("strength", value)}
                disabled={attributesMaxLimit?.strength === 0}
              />
            )}
          </TitleText>
          {/* Ловкость */}
          <TitleText title={translate("attributes.dexterity")}>
            {attributesMaxLimit?.dexterity === 0 && 0}
            {attributesMaxLimit?.dexterity !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.dexterity}
                onChange={(value) => attributeChangeHandler("dexterity", value)}
                disabled={attributesMaxLimit?.dexterity === 0}
              />
            )}
          </TitleText>
          {/* Выносливость */}
          <TitleText title={translate("attributes.stamina")}>
            {attributesMaxLimit?.stamina === 0 && 0}
            {attributesMaxLimit?.stamina !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.stamina}
                onChange={(value) => attributeChangeHandler("stamina", value)}
                disabled={attributesMaxLimit?.stamina === 0}
              />
            )}
          </TitleText>
        </>
      }
      social={
        <>
          {/* Социальные */}
          <DetailsSectionTitle>
            {translate("createUnit.social")}
          </DetailsSectionTitle>
          {/* Обаяние */}
          <TitleText title={translate("attributes.charisma")}>
            {attributesMaxLimit?.charisma === 0 && 0}
            {attributesMaxLimit?.charisma !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.charisma}
                onChange={(value) => attributeChangeHandler("charisma", value)}
                disabled={attributesMaxLimit?.charisma === 0}
              />
            )}
          </TitleText>
          {/* Манипуляция */}
          <TitleText title={translate("attributes.manipulation")}>
            {attributesMaxLimit?.manipulation === 0 && 0}
            {attributesMaxLimit?.manipulation !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.manipulation}
                onChange={(value) =>
                  attributeChangeHandler("manipulation", value)
                }
                disabled={attributesMaxLimit?.manipulation === 0}
              />
            )}
          </TitleText>
          {/* Привлекательность */}
          <TitleText title={translate("attributes.appearance")}>
            {attributesMaxLimit?.appearance === 0 && 0}
            {attributesMaxLimit?.appearance !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.appearance}
                onChange={(value) =>
                  attributeChangeHandler("appearance", value)
                }
              />
            )}
          </TitleText>
        </>
      }
      mental={
        <>
          {/* Ментальные */}
          <DetailsSectionTitle>
            {translate("createUnit.mental")}
          </DetailsSectionTitle>
          {/* Восприятие */}
          <TitleText title={translate("attributes.perception")}>
            {attributesMaxLimit?.perception === 0 && 0}
            {attributesMaxLimit?.perception !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.perception}
                onChange={(value) =>
                  attributeChangeHandler("perception", value)
                }
              />
            )}
          </TitleText>
          {/* Интеллект */}
          <TitleText title={translate("attributes.intelligence")}>
            {attributesMaxLimit?.intelligence === 0 && 0}
            {attributesMaxLimit?.intelligence !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.intelligence}
                onChange={(value) =>
                  attributeChangeHandler("intelligence", value)
                }
              />
            )}
          </TitleText>
          {/* Смекалка */}
          <TitleText title={translate("attributes.wits")}>
            {attributesMaxLimit?.wits === 0 && 0}
            {attributesMaxLimit?.wits !== 0 && (
              <WithoutBorderSelect
                options={baseAttributeLevels.map((value) => ({
                  value,
                  name: translate(`parametersEditLevels.${value}`),
                }))}
                value={ghoul.attributes.wits}
                onChange={(value) => attributeChangeHandler("wits", value)}
              />
            )}
          </TitleText>
        </>
      }
      talents={
        <>
          {/* Таланты */}
          <DetailsSectionTitle>
            {translate("createUnit.talents")}
          </DetailsSectionTitle>
          {/* Атлетика */}
          <TitleText title={translate("abilities.athletics")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.athletics}
              onChange={(value) => abilityChangeHandler("athletics", value)}
            />
          </TitleText>
          {/* Бдительность */}
          <TitleText title={translate("abilities.alertness")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.alertness}
              onChange={(value) => abilityChangeHandler("alertness", value)}
            />
          </TitleText>
          {/* Драка */}
          <TitleText title={translate("abilities.brawl")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.brawl}
              onChange={(value) => abilityChangeHandler("brawl", value)}
            />
          </TitleText>
          {/* Запугивание */}
          <TitleText title={translate("abilities.intimidation")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.intimidation}
              onChange={(value) => abilityChangeHandler("intimidation", value)}
            />
          </TitleText>
          {/* Красноречие */}
          <TitleText title={translate("abilities.expression")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.expression}
              onChange={(value) => abilityChangeHandler("expression", value)}
            />
          </TitleText>
          {/* Лидерство */}
          <TitleText title={translate("abilities.leadership")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.leadership}
              onChange={(value) => abilityChangeHandler("leadership", value)}
            />
          </TitleText>
          {/* Уличное чутьё */}
          <TitleText title={translate("abilities.streetwise")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.streetwise}
              onChange={(value) => abilityChangeHandler("streetwise", value)}
            />
          </TitleText>
          {/* Хитрость */}
          <TitleText title={translate("abilities.subterfuge")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.subterfuge}
              onChange={(value) => abilityChangeHandler("subterfuge", value)}
            />
          </TitleText>
          {/* Шестое чувство */}
          <TitleText title={translate("abilities.awareness")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.awareness}
              onChange={(value) => abilityChangeHandler("awareness", value)}
            />
          </TitleText>
          {/* Эмпатия */}
          <TitleText title={translate("abilities.empathy")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.empathy}
              onChange={(value) => abilityChangeHandler("empathy", value)}
            />
          </TitleText>
        </>
      }
      skills={
        <>
          {/* Навыки */}
          <DetailsSectionTitle>
            {translate("createUnit.skills")}
          </DetailsSectionTitle>
          {/* Вождение */}
          <TitleText title={translate("abilities.drive")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.drive}
              onChange={(value) => abilityChangeHandler("drive", value)}
            />
          </TitleText>
          {/* Воровство */}
          <TitleText title={translate("abilities.larceny")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.larceny}
              onChange={(value) => abilityChangeHandler("larceny", value)}
            />
          </TitleText>
          {/* Выживание */}
          <TitleText title={translate("abilities.survival")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.survival}
              onChange={(value) => abilityChangeHandler("survival", value)}
            />
          </TitleText>
          {/* Исполнение */}
          <TitleText title={translate("abilities.performance")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.performance}
              onChange={(value) => abilityChangeHandler("performance", value)}
            />
          </TitleText>
          {/* Обращение с животными */}
          <TitleText title={translate("abilities.animal_ken")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.animal_ken}
              onChange={(value) => abilityChangeHandler("animal_ken", value)}
            />
          </TitleText>
          {/* Ремесло */}
          <TitleText title={translate("abilities.crafts")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.crafts}
              onChange={(value) => abilityChangeHandler("crafts", value)}
            />
          </TitleText>
          {/* Скрытность */}
          <TitleText title={translate("abilities.stealth")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.stealth}
              onChange={(value) => abilityChangeHandler("stealth", value)}
            />
          </TitleText>
          {/* Стрельба */}
          <TitleText title={translate("abilities.firearms")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.firearms}
              onChange={(value) => abilityChangeHandler("firearms", value)}
            />
          </TitleText>
          {/* Фехтование */}
          <TitleText title={translate("abilities.melee")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.melee}
              onChange={(value) => abilityChangeHandler("melee", value)}
            />
          </TitleText>
          {/* Этикет */}
          <TitleText title={translate("abilities.etiquette")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.etiquette}
              onChange={(value) => abilityChangeHandler("etiquette", value)}
            />
          </TitleText>
        </>
      }
      knowledges={
        <>
          {/* Знания */}
          <DetailsSectionTitle>
            {translate("createUnit.knowledges")}
          </DetailsSectionTitle>
          {/* Гуманитарные науки */}
          <TitleText title={translate("abilities.academics")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.academics}
              onChange={(value) => abilityChangeHandler("academics", value)}
            />
          </TitleText>
          {/* Естественные науки */}
          <TitleText title={translate("abilities.science")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.science}
              onChange={(value) => abilityChangeHandler("science", value)}
            />
          </TitleText>
          {/* Законы */}
          <TitleText title={translate("abilities.law")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.law}
              onChange={(value) => abilityChangeHandler("law", value)}
            />
          </TitleText>
          {/* Информатика */}
          <TitleText title={translate("abilities.computer")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.computer}
              onChange={(value) => abilityChangeHandler("computer", value)}
            />
          </TitleText>
          {/* Медицина */}
          <TitleText title={translate("abilities.medicine")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.medicine}
              onChange={(value) => abilityChangeHandler("medicine", value)}
            />
          </TitleText>
          {/* Оккультизм */}
          <TitleText title={translate("abilities.occult")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.occult}
              onChange={(value) => abilityChangeHandler("occult", value)}
            />
          </TitleText>
          {/* Политика */}
          <TitleText title={translate("abilities.politics")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.politics}
              onChange={(value) => abilityChangeHandler("politics", value)}
            />
          </TitleText>
          {/* Расследование */}
          <TitleText title={translate("abilities.investigation")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.investigation}
              onChange={(value) => abilityChangeHandler("investigation", value)}
            />
          </TitleText>
          {/* Финансы */}
          <TitleText title={translate("abilities.finance")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.finance}
              onChange={(value) => abilityChangeHandler("finance", value)}
            />
          </TitleText>
          {/* Электроника */}
          <TitleText title={translate("abilities.electronics")}>
            <WithoutBorderSelect
              options={baseAbilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.abilities.electronics}
              onChange={(value) => abilityChangeHandler("electronics", value)}
            />
          </TitleText>
        </>
      }
      disciplines={
        <>
          {/* Дисциплины */}
          <DetailsSectionTitle>
            {translate("fields.disciplines")}
          </DetailsSectionTitle>
          <TitleText title={translate("disciplines.potence.name")}>
            <WithoutBorderSelect
              options={disciplineLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.disciplines.potence}
              onChange={(value) =>
                onChange({
                  ...ghoul,
                  disciplines: {
                    ...ghoul.disciplines,
                    potence: value,
                  },
                })
              }
            />
          </TitleText>
          {/* Обретённые дисциплины */}
          <DetailsSectionTitle>
            {translate("fields.acquiredDisciplines")}
          </DetailsSectionTitle>
          <PartialObjectEditor
            object={ghoul.acquiredDisciplines}
            onChange={(disciplines) =>
              onChange({
                ...ghoul,
                acquiredDisciplines: disciplines,
              })
            }
            options={disciplineNames
              .filter(
                (
                  discipline,
                ): discipline is Exclude<DisciplineName, "potence"> =>
                  discipline !== "potence",
              )
              .map((value) => ({
                value,
                name: translate(`disciplines.${value}.name`),
              }))}
            availableValues={disciplineLevels.map((level) => ({
              value: level,
              name: translate(`parametersEditLevels.${level}`),
            }))}
            addTitle={translate("editDisciplines.add")}
          />
        </>
      }
      backgrounds={
        <>
          {/* Факты биографии */}
          <DetailsSectionTitle>
            {translate("createUnit.backgrounds")}
          </DetailsSectionTitle>
          <PartialObjectEditor
            object={ghoul.backgrounds}
            onChange={(backgrounds) => onChange({ ...ghoul, backgrounds })}
            options={backgroundNames.map((value) => ({
              value,
              name: translate(`backgrounds.${value}`),
            }))}
            availableValues={backgroundLevels.map((level) => ({
              value: level,
              name: translate(`parametersEditLevels.${level}`),
            }))}
            addTitle={translate("editBackgrounds.add")}
          />
        </>
      }
      mentalStability={
        <>
          {/* Добродетели */}
          <DetailsSectionTitle>
            {translate("createUnit.mentalStability")}
          </DetailsSectionTitle>
          {/* Совесть/решимость" */}
          <TitleText title={translate("mentalStability.morality")}>
            <WithoutBorderSelect
              options={mentalStabilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.mentalStability.morality}
              onChange={(value) => mentalStabilityHandler("morality", value)}
            />
          </TitleText>
          {/* Самоконтроль/инстинкты" */}
          <TitleText title={translate("mentalStability.selfControl")}>
            <WithoutBorderSelect
              options={mentalStabilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.mentalStability.selfControl}
              onChange={(value) => mentalStabilityHandler("selfControl", value)}
            />
          </TitleText>
          {/* Смелость" */}
          <TitleText title={translate("mentalStability.courage")}>
            <WithoutBorderSelect
              options={mentalStabilityLevels.map((value) => ({
                value,
                name: translate(`parametersEditLevels.${value}`),
              }))}
              value={ghoul.mentalStability.courage}
              onChange={(value) => mentalStabilityHandler("courage", value)}
            />
          </TitleText>
        </>
      }
      meritsAndFlaws={
        <>
          {/* Достоинства */}
          <DetailsSectionTitle>
            {translate("createUnit.merits")}
          </DetailsSectionTitle>
          <ArrayEditor
            array={ghoul.merits}
            onChange={(merits) =>
              onChange({
                ...ghoul,
                merits,
              })
            }
            options={getDefinedEntries(
              merits as Record<MeritName, MeritsAndFlawsData>,
            ).map(({ key }) => ({
              value: key,
              name: translate(`merits.${key}`),
            }))}
            addTitle={translate("editMeritsAndFlaws.addMerit")}
          />
          {/* Недостатки */}
          <DetailsSectionTitle>
            {translate("createUnit.flaws")}
          </DetailsSectionTitle>
          <ArrayEditor
            array={ghoul.flaws}
            onChange={(flaws) =>
              onChange({
                ...ghoul,
                flaws,
              })
            }
            options={getDefinedEntries(
              flaws as Record<FlawName, MeritsAndFlawsData>,
            ).map(({ key }) => ({
              value: key,
              name: translate(`flaws.${key}`),
            }))}
            addTitle={translate("editMeritsAndFlaws.addFlaw")}
          />
        </>
      }
      centerBottom={
        <>
          {/* Человечность/Путь */}
          <DetailsSectionTitle>
            {translate("createUnit.humanityOrPathRating")}
          </DetailsSectionTitle>
          <TitleText title={translate("fields.humanityOrPathRating")}>
            <Select
              value={ghoul.humanityOrPathRating}
              options={humanityOrPathRatings}
              onChange={(humanityOrPathRating) =>
                onChange({ ...ghoul, humanityOrPathRating })
              }
            />
          </TitleText>

          {/* Столп */}
          <TitleText title={translate("fields.pillar")}>
            <Input
              value={ghoul.pillar ?? ""}
              onChange={(ev) =>
                onChange({ ...ghoul, pillar: ev.target.value || null })
              }
            />
          </TitleText>
          {/* Воля */}
          <DetailsSectionTitle>
            {translate("createUnit.willpower")}
          </DetailsSectionTitle>
          {/* Максимальный запас воли */}
          <TitleText title={translate("fields.maxWillpower")}>
            <Select
              value={ghoul.maxWillpower}
              options={willpowerLevels}
              onChange={(maxWillpower) =>
                onChange({
                  ...ghoul,
                  maxWillpower,
                  willpower:
                    ghoul.willpower > maxWillpower
                      ? maxWillpower
                      : ghoul.willpower,
                })
              }
            />
          </TitleText>
          {/* Воля */}
          <TitleText title={translate("fields.willpower")}>
            <Select
              value={ghoul.willpower}
              options={willpowerLevels.filter(
                (level) => level <= ghoul.maxWillpower,
              )}
              onChange={(willpower) => onChange({ ...ghoul, willpower })}
            />
          </TitleText>
          {/* Запас крови */}
          <DetailsSectionTitle>
            {translate("createUnit.bloodPool")}
          </DetailsSectionTitle>
          {/* Макс/предел */}
          <TitleText title={translate("fields.maxBloodPool")}>
            <PositiveNumberInput
              value={ghoul.maxBloodPool}
              onChange={(maxBloodPool) =>
                onChange({
                  ...ghoul,
                  maxBloodPool,
                  bloodPool:
                    ghoul.bloodPool > maxBloodPool
                      ? maxBloodPool
                      : ghoul.bloodPool,
                })
              }
            />
          </TitleText>
          {/* Запас крови */}
          <TitleText title={translate("fields.bloodPool")}>
            <PositiveNumberInput
              value={ghoul.bloodPool}
              onChange={(bloodPool) =>
                onChange({
                  ...ghoul,
                  bloodPool:
                    bloodPool > ghoul.maxBloodPool
                      ? ghoul.maxBloodPool
                      : bloodPool,
                })
              }
            />
          </TitleText>
        </>
      }
      health={
        <>
          {/* Здоровье */}
          <DetailsSectionTitle>
            {`${translate("createUnit.health")}: ${MAX_HEALTH - bodyDamages.length}/${MAX_HEALTH}`}
          </DetailsSectionTitle>
          {/* Уровень здоровья */}
          <Info>
            {`${translate(
              `health.healthLevels.${getHealthLevelTranslateKey(healthLevel)}`,
            )}${healthLevel.modifiers?.commonDiceBonus ? ` (${healthLevel.modifiers.commonDiceBonus})` : ""}`}
          </Info>
          {/* Раны */}
          <DetailsSectionTitle>
            {translate("createUnit.damages")}
          </DetailsSectionTitle>
          <ArrayEditor
            array={bodyDamages}
            onChange={(bodyDamages) =>
              onChange({
                ...ghoul,
                bodyDamages,
                resourcesHistory: {
                  ...ghoul.resourcesHistory,
                  health: [],
                },
              })
            }
            options={damageTypes.map((damage) => ({
              value: damage,
              name: translate(`damages.${damage}`),
            }))}
            allowDuplicates
            addTitle={translate("editDamages.add")}
            isOverflow={getGhoulHealthLevel(bodyDamages).name === "final"}
          />
        </>
      }
      {...props}
    />
  );
};
