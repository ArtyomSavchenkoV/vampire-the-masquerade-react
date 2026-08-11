import { Input } from "baseComponents/Input";
import { Select } from "baseComponents/Select";
import { ArrayEditor } from "../common/ArrayEditor";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { KindredLayout } from "components/edit/common/KindredLayout";
import { PartialObjectEditor } from "../common/PartialObjectEditor";
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
import { ClanName } from "domain/Clan";
import { damageTypes } from "domain/Damage";
import { disciplineLevels, disciplineNames } from "domain/Discipline";
import { humanityOrPathRatings } from "domain/HumanityOrPathRating";
import { aggregateModifiers } from "domain/kindred/CalculatedKindred";
import {
  calculateGeneration,
  getGenerationLevel,
} from "domain/kindred/Generation";
import { getKinderedHealthLevel } from "domain/kindred/Health";
import { Kindred } from "domain/kindred/Kindred";
import {
  MentalStability,
  MentalStabilityLevel,
  mentalStabilityLevels,
} from "domain/MentalStability";
import { FlawName, MeritName, MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { willpowerLevels } from "domain/Willpower";
import { FC, HTMLAttributes, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { getDefinedEntries } from "utils/getDefinedEntries";
import { ChangeClan } from "./ChangeClan";
import { WithoutBorderSelect } from "commonComponents/WithoutBorderSelect";
import { NameTitleText } from "commonComponents/NameTitleText";
import { NameInput } from "../common/NameInput";
import { getHealthLevelTranslateKey } from "domain/Health";
import { MAX_HEALTH } from "data/kindredHealthLevels";
import { Info } from "../common/Info";

interface TProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  kindred: Kindred;
  onChange: (kindred: Kindred) => void;
  onClanChange: (clan: ClanName) => void;
}

export const EditKindredForm: FC<TProps> = ({
  kindred,
  onChange,
  onClanChange,
  ...props
}) => {
  const { translate } = useTranslate();
  const attributesMaxLimit = aggregateModifiers(kindred).attributesMaxLimit;

  const realGeneration = calculateGeneration(kindred);
  const generationLevel = getGenerationLevel(realGeneration);
  useEffect(() => {
    if (generationLevel.maxBloodPool < kindred.bloodPool) {
      onChange({ ...kindred, bloodPool: generationLevel.maxBloodPool });
    }
  }, [generationLevel.maxBloodPool, kindred, onChange]);

  const attributeChangeHandler = (
    name: AttributeName,
    value: BaseAttributeLevel,
  ) => {
    onChange({
      ...kindred,
      attributes: { ...kindred.attributes, [name]: value },
    });
  };

  const abilityChangeHandler = (name: AbilityName, value: BaseAbilityLevel) => {
    onChange({
      ...kindred,
      abilities: { ...kindred.abilities, [name]: value },
    });
  };

  const mentalStabilityHandler = (
    name: MentalStability,
    value: MentalStabilityLevel,
  ) => {
    onChange({
      ...kindred,
      mentalStability: { ...kindred.mentalStability, [name]: value },
    });
  };

  const healthLevel = getKinderedHealthLevel(kindred.bodyDamages);

  return (
    <KindredLayout
      name={
        /* Имя */
        <NameTitleText title={translate("fields.name")}>
          <NameInput
            value={kindred.name}
            onChange={(ev) => onChange({ ...kindred, name: ev.target.value })}
          />
        </NameTitleText>
      }
      player={
        /* Игрок */
        <NameTitleText title={translate("fields.player")}>
          <NameInput
            value={kindred.player ?? ""}
            onChange={(ev) =>
              onChange({ ...kindred, player: ev.target.value || null })
            }
          />
        </NameTitleText>
      }
      chronicle={
        /* Хроника */
        <TitleText title={translate("fields.chronicle")}>
          <Input
            value={kindred.chronicle ?? ""}
            onChange={(ev) =>
              onChange({ ...kindred, chronicle: ev.target.value || null })
            }
          />
        </TitleText>
      }
      personality={
        <>
          {/* Натура */}
          <TitleText title={translate("fields.nature")}>
            <Input
              value={kindred.nature}
              onChange={(ev) =>
                onChange({ ...kindred, nature: ev.target.value })
              }
            />
          </TitleText>
          {/* Маска */}
          <TitleText title={translate("fields.demeanor")}>
            <Input
              value={kindred.demeanor}
              onChange={(ev) =>
                onChange({ ...kindred, demeanor: ev.target.value })
              }
            />
          </TitleText>
          {/* Амплуа */}
          <TitleText title={translate("fields.role")}>
            <Input
              value={kindred.role}
              onChange={(ev) => onChange({ ...kindred, role: ev.target.value })}
            />
          </TitleText>
        </>
      }
      kindredSocialPosition={
        <>
          {/* Клан */}
          <TitleText title={translate("fields.clan")}>
            <ChangeClan
              clanName={kindred.clan.clanName}
              onChange={onClanChange}
            >
              {translate(`clanes.${kindred.clan.clanName}`)}
            </ChangeClan>
          </TitleText>
          {/* Поколение */}
          <TitleText title={translate("fields.initialGeneration")}>
            <Select
              options={[9, 10, 11, 12, 13]}
              value={kindred.generation}
              onChange={(generation) => onChange({ ...kindred, generation })}
            />
            {` (${realGeneration})`}
          </TitleText>
          {/* Сир */}
          <TitleText title={translate("fields.sire")}>
            <Input
              value={kindred.sire ?? ""}
              onChange={(ev) =>
                onChange({ ...kindred, sire: ev.target.value || null })
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
                value={kindred.attributes.strength}
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
                value={kindred.attributes.dexterity}
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
                value={kindred.attributes.stamina}
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
                value={kindred.attributes.charisma}
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
                value={kindred.attributes.manipulation}
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
                value={kindred.attributes.appearance}
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
                value={kindred.attributes.perception}
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
                value={kindred.attributes.intelligence}
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
                value={kindred.attributes.wits}
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
              value={kindred.abilities.athletics}
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
              value={kindred.abilities.alertness}
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
              value={kindred.abilities.brawl}
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
              value={kindred.abilities.intimidation}
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
              value={kindred.abilities.expression}
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
              value={kindred.abilities.leadership}
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
              value={kindred.abilities.streetwise}
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
              value={kindred.abilities.subterfuge}
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
              value={kindred.abilities.awareness}
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
              value={kindred.abilities.empathy}
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
              value={kindred.abilities.drive}
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
              value={kindred.abilities.larceny}
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
              value={kindred.abilities.survival}
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
              value={kindred.abilities.performance}
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
              value={kindred.abilities.animal_ken}
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
              value={kindred.abilities.crafts}
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
              value={kindred.abilities.stealth}
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
              value={kindred.abilities.firearms}
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
              value={kindred.abilities.melee}
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
              value={kindred.abilities.etiquette}
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
              value={kindred.abilities.academics}
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
              value={kindred.abilities.science}
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
              value={kindred.abilities.law}
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
              value={kindred.abilities.computer}
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
              value={kindred.abilities.medicine}
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
              value={kindred.abilities.occult}
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
              value={kindred.abilities.politics}
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
              value={kindred.abilities.investigation}
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
              value={kindred.abilities.finance}
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
              value={kindred.abilities.electronics}
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
          <PartialObjectEditor
            object={kindred.clan.disciplines}
            onChange={(disciplines) =>
              onChange({
                ...kindred,
                clan: {
                  ...kindred.clan,
                  disciplines,
                },
              })
            }
            options={disciplineNames
              .filter(
                (disciplineName) =>
                  !Object.keys(kindred.acquiredDisciplines).includes(
                    disciplineName,
                  ),
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
            isObjectFixed={kindred.clan.clanName !== "Other"}
          />
          {/* Обретённые дисциплины */}
          <DetailsSectionTitle>
            {translate("fields.acquiredDisciplines")}
          </DetailsSectionTitle>
          <PartialObjectEditor
            object={kindred.acquiredDisciplines}
            onChange={(disciplines) =>
              onChange({
                ...kindred,
                acquiredDisciplines: disciplines,
              })
            }
            options={disciplineNames
              .filter(
                (disciplineName) =>
                  !Object.keys(kindred.clan.disciplines).includes(
                    disciplineName,
                  ),
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
            object={kindred.backgrounds}
            onChange={(backgrounds) => onChange({ ...kindred, backgrounds })}
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
              value={kindred.mentalStability.morality}
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
              value={kindred.mentalStability.selfControl}
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
              value={kindred.mentalStability.courage}
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
            array={kindred.merits}
            onChange={(merits) =>
              onChange({
                ...kindred,
                merits,
              })
            }
            options={getDefinedEntries(
              merits as Record<MeritName, MeritsAndFlawsData>,
            )
              .filter(
                ({ value }) =>
                  !value?.abandonForClans?.includes(kindred.clan.clanName),
              )
              .map(({ key }) => ({
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
            array={kindred.flaws}
            onChange={(flaws) =>
              onChange({
                ...kindred,
                flaws,
              })
            }
            options={getDefinedEntries(
              flaws as Record<FlawName, MeritsAndFlawsData>,
            )
              .filter(
                ({ value }) =>
                  !value?.abandonForClans?.includes(kindred.clan.clanName),
              )
              .map(({ key }) => ({
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
              value={kindred.humanityOrPathRating}
              options={humanityOrPathRatings}
              onChange={(humanityOrPathRating) =>
                onChange({ ...kindred, humanityOrPathRating })
              }
            />
          </TitleText>

          {/* Столп */}
          <TitleText title={translate("fields.pillar")}>
            <Input
              value={kindred.pillar ?? ""}
              onChange={(ev) =>
                onChange({ ...kindred, pillar: ev.target.value || null })
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
              value={kindred.maxWillpower}
              options={willpowerLevels}
              onChange={(maxWillpower) =>
                onChange({
                  ...kindred,
                  maxWillpower,
                  willpower:
                    kindred.willpower > maxWillpower
                      ? maxWillpower
                      : kindred.willpower,
                })
              }
            />
          </TitleText>
          {/* Воля */}
          <TitleText title={translate("fields.willpower")}>
            <Select
              value={kindred.willpower}
              options={willpowerLevels.filter(
                (level) => level <= kindred.maxWillpower,
              )}
              onChange={(willpower) => onChange({ ...kindred, willpower })}
            />
          </TitleText>
          {/* Запас крови */}
          <DetailsSectionTitle>
            {translate("createUnit.bloodPool")}
          </DetailsSectionTitle>
          {/* Макс/предел */}
          <Info>{`${translate("fields.maxBloodPool")}: ${generationLevel.maxBloodPool}, ${translate("fields.bloodConsumptionLimitPerTurn")}: ${generationLevel.bloodConsumptionLimitPerTurn}`}</Info>
          {/* Запас крови */}
          <TitleText title={translate("fields.bloodPool")}>
            <PositiveNumberInput
              value={kindred.bloodPool}
              onChange={(bloodPool) =>
                onChange({
                  ...kindred,
                  bloodPool:
                    bloodPool > generationLevel.maxBloodPool
                      ? generationLevel.maxBloodPool
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
            {`${translate("createUnit.health")}: ${MAX_HEALTH - kindred.bodyDamages.length}/${MAX_HEALTH}`}
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
            array={kindred.bodyDamages}
            onChange={(bodyDamages) =>
              onChange({
                ...kindred,
                bodyDamages,
              })
            }
            options={damageTypes.map((damage) => ({
              value: damage,
              name: translate(`damages.${damage}`),
            }))}
            allowDuplicates
            addTitle={translate("editDamages.add")}
            isOverflow={
              getKinderedHealthLevel(kindred.bodyDamages).name === "final"
            }
          />
        </>
      }
      {...props}
    />
  );
};
