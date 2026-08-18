import { Human } from "domain/human/Human";
import { FC, HTMLAttributes } from "react";
import { HumanLayout } from "./common/HumanLayout";
import useTranslate from "services/translate/useTranslate";
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
import {
  MentalStability,
  MentalStabilityLevel,
  mentalStabilityLevels,
} from "domain/MentalStability";
import { Input } from "baseComponents/Input";
import { NameTitleText } from "commonComponents/NameTitleText";
import { TitleText } from "./common/TitleText";
import { NameInput } from "./common/NameInput";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { WithoutBorderSelect } from "commonComponents/WithoutBorderSelect";
import { aggregateModifiers } from "domain/human/CalculatedHuman";
import { ArrayEditor } from "./common/ArrayEditor";
import { PartialObjectEditor } from "./common/PartialObjectEditor";
import { merits, flaws } from "data/meritsAndFlaws";
import { backgroundNames, backgroundLevels } from "domain/Backgrounds";
import { MeritName, MeritsAndFlawsData, FlawName } from "domain/MeritsAndFlaws";
import { getDefinedEntries } from "utils/object/getDefinedEntries";
import { Select } from "baseComponents/Select";
import { humanityOrPathRatings } from "domain/HumanityOrPathRating";
import { willpowerLevels } from "domain/Willpower";
import { getHealthLevelTranslateKey } from "domain/Health";
import { damageTypes } from "domain/Damage";
import { getHumanHealthLevel } from "domain/human/Health";
import { EditHealthLevels } from "./common/EditHealthLevels";
import { Info } from "./common/Info";
import { completeHealthEvents } from "domain/human/ResourcesHistory";
import { NumberCheckboxesInput } from "commonComponents/NumberCheckboxesInput";

interface TProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  human: Human;
  onChange: (human: Human) => void;
}

export const EditHumanForm: FC<TProps> = ({ human, onChange, ...props }) => {
  const { translate } = useTranslate();
  const attributesMaxLimit = aggregateModifiers(human).attributesMaxLimit;

  const attributeChangeHandler = (
    name: AttributeName,
    value: BaseAttributeLevel,
  ) => {
    onChange({
      ...human,
      attributes: { ...human.attributes, [name]: value },
    });
  };

  const abilityChangeHandler = (name: AbilityName, value: BaseAbilityLevel) => {
    onChange({
      ...human,
      abilities: { ...human.abilities, [name]: value },
    });
  };

  const mentalStabilityHandler = (
    name: MentalStability,
    value: MentalStabilityLevel,
  ) => {
    onChange({
      ...human,
      mentalStability: { ...human.mentalStability, [name]: value },
    });
  };

  const bodyDamages = completeHealthEvents(
    human.healthLevels,
    human.bodyDamages,
    human.resourcesHistory.health,
  );

  const healthLevel = getHumanHealthLevel(human.healthLevels, bodyDamages);

  const MAX_HEALTH = human.healthLevels.length - 1;

  return (
    <HumanLayout
      name={
        /* Имя */
        <NameTitleText title={translate("fields.name")}>
          <NameInput
            value={human.name}
            onChange={(ev) => onChange({ ...human, name: ev.target.value })}
          />
        </NameTitleText>
      }
      player={
        /* Игрок */
        <NameTitleText title={translate("fields.player")}>
          <NameInput
            value={human.player ?? ""}
            onChange={(ev) =>
              onChange({ ...human, player: ev.target.value || null })
            }
          />
        </NameTitleText>
      }
      chronicle={
        /* Хроника */
        <TitleText title={translate("fields.chronicle")}>
          <Input
            value={human.chronicle ?? ""}
            onChange={(ev) =>
              onChange({ ...human, chronicle: ev.target.value || null })
            }
          />
        </TitleText>
      }
      personality={
        <>
          {/* Натура */}
          <TitleText title={translate("fields.nature")}>
            <Input
              value={human.nature}
              onChange={(ev) => onChange({ ...human, nature: ev.target.value })}
            />
          </TitleText>
          {/* Маска */}
          <TitleText title={translate("fields.demeanor")}>
            <Input
              value={human.demeanor}
              onChange={(ev) =>
                onChange({ ...human, demeanor: ev.target.value })
              }
            />
          </TitleText>
          {/* Амплуа */}
          <TitleText title={translate("fields.role")}>
            <Input
              value={human.role}
              onChange={(ev) => onChange({ ...human, role: ev.target.value })}
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
                value={human.attributes.strength}
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
                value={human.attributes.dexterity}
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
                value={human.attributes.stamina}
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
                value={human.attributes.charisma}
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
                value={human.attributes.manipulation}
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
                value={human.attributes.appearance}
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
                value={human.attributes.perception}
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
                value={human.attributes.intelligence}
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
                value={human.attributes.wits}
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
              value={human.abilities.athletics}
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
              value={human.abilities.alertness}
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
              value={human.abilities.brawl}
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
              value={human.abilities.intimidation}
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
              value={human.abilities.expression}
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
              value={human.abilities.leadership}
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
              value={human.abilities.streetwise}
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
              value={human.abilities.subterfuge}
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
              value={human.abilities.awareness}
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
              value={human.abilities.empathy}
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
              value={human.abilities.drive}
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
              value={human.abilities.larceny}
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
              value={human.abilities.survival}
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
              value={human.abilities.performance}
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
              value={human.abilities.animal_ken}
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
              value={human.abilities.crafts}
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
              value={human.abilities.stealth}
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
              value={human.abilities.firearms}
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
              value={human.abilities.melee}
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
              value={human.abilities.etiquette}
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
              value={human.abilities.academics}
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
              value={human.abilities.science}
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
              value={human.abilities.law}
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
              value={human.abilities.computer}
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
              value={human.abilities.medicine}
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
              value={human.abilities.occult}
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
              value={human.abilities.politics}
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
              value={human.abilities.investigation}
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
              value={human.abilities.finance}
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
              value={human.abilities.electronics}
              onChange={(value) => abilityChangeHandler("electronics", value)}
            />
          </TitleText>
        </>
      }
      backgrounds={
        <>
          {/* Факты биографии */}
          <DetailsSectionTitle>
            {translate("createUnit.backgrounds")}
          </DetailsSectionTitle>
          <PartialObjectEditor
            object={human.backgrounds}
            onChange={(backgrounds) => onChange({ ...human, backgrounds })}
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
              value={human.mentalStability.morality}
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
              value={human.mentalStability.selfControl}
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
              value={human.mentalStability.courage}
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
            array={human.merits}
            onChange={(merits) =>
              onChange({
                ...human,
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
            array={human.flaws}
            onChange={(flaws) =>
              onChange({
                ...human,
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
              value={human.humanityOrPathRating}
              options={humanityOrPathRatings}
              onChange={(humanityOrPathRating) =>
                onChange({ ...human, humanityOrPathRating })
              }
            />
          </TitleText>

          {/* Столп */}
          <TitleText title={translate("fields.pillar")}>
            <Input
              value={human.pillar ?? ""}
              onChange={(ev) =>
                onChange({ ...human, pillar: ev.target.value || null })
              }
            />
          </TitleText>
          {/* Воля */}
          <DetailsSectionTitle>
            {translate("fields.willpower")}
          </DetailsSectionTitle>
          <NumberCheckboxesInput
            value={human.willpower}
            max={human.maxWillpower}
            onChange={(willpower) => onChange({ ...human, willpower })}
          />
          {/* Максимальный запас воли */}
          <TitleText title={translate("fields.maxWillpower")}>
            <Select
              value={human.maxWillpower}
              options={willpowerLevels}
              onChange={(maxWillpower) =>
                onChange({
                  ...human,
                  maxWillpower,
                  willpower:
                    human.willpower > maxWillpower
                      ? maxWillpower
                      : human.willpower,
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
                ...human,
                bodyDamages,
                resourcesHistory: {
                  ...human.resourcesHistory,
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
            isOverflow={
              getHumanHealthLevel(human.healthLevels, bodyDamages).name ===
              "final"
            }
          />
        </>
      }
      healthLevels={
        <>
          {/* Уровни здоровья */}
          <DetailsSectionTitle>
            {translate("createUnit.healthLevels")}
          </DetailsSectionTitle>
          <EditHealthLevels
            healthLevels={human.healthLevels}
            onChange={(healthLevels) =>
              onChange({
                ...human,
                healthLevels,
                bodyDamages: [],
                resourcesHistory: {
                  ...human.resourcesHistory,
                  health: [],
                },
              })
            }
          />
        </>
      }
      {...props}
    />
  );
};
