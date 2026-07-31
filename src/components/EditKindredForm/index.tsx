import { Input } from "baseComponents/Input";
import { Select } from "baseComponents/Select";
import { ArrayEditor } from "commonComponents/ArrayEditor";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { KindredLayout } from "commonComponents/KindredLayout";
import { PartialObjectEditor } from "commonComponents/PartialObjectEditor";
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
import { getKinderedHealthLevel, MAX_HEALTH } from "domain/kindred/Health";
import { Kindred } from "domain/kindred/Kindred";
import {
  MentalStability,
  MentalStabilityLevel,
  mentalStabilityLevels,
} from "domain/MentalStability";
import { FlawName, MeritName, MeritsAndFlawsData } from "domain/MeritsAndFlaws";
import { willpowerLevels } from "domain/Willpower";
import { FC, useEffect } from "react";
import useTranslate from "services/translate/useTranslate";
import { getDefinedEntries } from "utils/getDefinedEntries";
import { ChangeClan } from "./ChangeClan";

interface TProps {
  kindred: Kindred;
  onChange: (kindred: Kindred) => void;
  onClanChange: (clan: ClanName) => void;
}

export const EditKindredForm: FC<TProps> = ({
  kindred,
  onChange,
  onClanChange,
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

  return (
    <KindredLayout
      name={
        /* Имя */
        <TitleText title={translate("fields.name")}>
          <Input
            value={kindred.name}
            onChange={(ev) => onChange({ ...kindred, name: ev.target.value })}
          />
        </TitleText>
      }
      player={
        /* Игрок */
        <TitleText title={translate("fields.player")}>
          <Input
            value={kindred.player ?? ""}
            onChange={(ev) =>
              onChange({ ...kindred, player: ev.target.value || null })
            }
          />
        </TitleText>
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
              <Select
                options={baseAttributeLevels}
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
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.athletics}
              onChange={(value) => abilityChangeHandler("athletics", value)}
            />
          </TitleText>
          {/* Бдительность */}
          <TitleText title={translate("abilities.alertness")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.alertness}
              onChange={(value) => abilityChangeHandler("alertness", value)}
            />
          </TitleText>
          {/* Драка */}
          <TitleText title={translate("abilities.brawl")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.brawl}
              onChange={(value) => abilityChangeHandler("brawl", value)}
            />
          </TitleText>
          {/* Запугивание */}
          <TitleText title={translate("abilities.intimidation")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.intimidation}
              onChange={(value) => abilityChangeHandler("intimidation", value)}
            />
          </TitleText>
          {/* Красноречие */}
          <TitleText title={translate("abilities.expression")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.expression}
              onChange={(value) => abilityChangeHandler("expression", value)}
            />
          </TitleText>
          {/* Лидерство */}
          <TitleText title={translate("abilities.leadership")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.leadership}
              onChange={(value) => abilityChangeHandler("leadership", value)}
            />
          </TitleText>
          {/* Уличное чутьё */}
          <TitleText title={translate("abilities.streetwise")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.streetwise}
              onChange={(value) => abilityChangeHandler("streetwise", value)}
            />
          </TitleText>
          {/* Хитрость */}
          <TitleText title={translate("abilities.subterfuge")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.subterfuge}
              onChange={(value) => abilityChangeHandler("subterfuge", value)}
            />
          </TitleText>
          {/* Шестое чувство */}
          <TitleText title={translate("abilities.awareness")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.awareness}
              onChange={(value) => abilityChangeHandler("awareness", value)}
            />
          </TitleText>
          {/* Эмпатия */}
          <TitleText title={translate("abilities.empathy")}>
            <Select
              options={baseAbilityLevels}
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
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.drive}
              onChange={(value) => abilityChangeHandler("drive", value)}
            />
          </TitleText>
          {/* Воровство */}
          <TitleText title={translate("abilities.larceny")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.larceny}
              onChange={(value) => abilityChangeHandler("larceny", value)}
            />
          </TitleText>
          {/* Выживание */}
          <TitleText title={translate("abilities.survival")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.survival}
              onChange={(value) => abilityChangeHandler("survival", value)}
            />
          </TitleText>
          {/* Исполнение */}
          <TitleText title={translate("abilities.performance")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.performance}
              onChange={(value) => abilityChangeHandler("performance", value)}
            />
          </TitleText>
          {/* Обращение с животными */}
          <TitleText title={translate("abilities.animal_ken")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.animal_ken}
              onChange={(value) => abilityChangeHandler("animal_ken", value)}
            />
          </TitleText>
          {/* Ремесло */}
          <TitleText title={translate("abilities.crafts")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.crafts}
              onChange={(value) => abilityChangeHandler("crafts", value)}
            />
          </TitleText>
          {/* Скрытность */}
          <TitleText title={translate("abilities.stealth")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.stealth}
              onChange={(value) => abilityChangeHandler("stealth", value)}
            />
          </TitleText>
          {/* Стрельба */}
          <TitleText title={translate("abilities.firearms")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.firearms}
              onChange={(value) => abilityChangeHandler("firearms", value)}
            />
          </TitleText>
          {/* Фехтование */}
          <TitleText title={translate("abilities.melee")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.melee}
              onChange={(value) => abilityChangeHandler("melee", value)}
            />
          </TitleText>
          {/* Этикет */}
          <TitleText title={translate("abilities.etiquette")}>
            <Select
              options={baseAbilityLevels}
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
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.academics}
              onChange={(value) => abilityChangeHandler("academics", value)}
            />
          </TitleText>
          {/* Естественные науки */}
          <TitleText title={translate("abilities.science")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.science}
              onChange={(value) => abilityChangeHandler("science", value)}
            />
          </TitleText>
          {/* Законы */}
          <TitleText title={translate("abilities.law")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.law}
              onChange={(value) => abilityChangeHandler("law", value)}
            />
          </TitleText>
          {/* Информатика */}
          <TitleText title={translate("abilities.computer")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.computer}
              onChange={(value) => abilityChangeHandler("computer", value)}
            />
          </TitleText>
          {/* Медицина */}
          <TitleText title={translate("abilities.medicine")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.medicine}
              onChange={(value) => abilityChangeHandler("medicine", value)}
            />
          </TitleText>
          {/* Оккультизм */}
          <TitleText title={translate("abilities.occult")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.occult}
              onChange={(value) => abilityChangeHandler("occult", value)}
            />
          </TitleText>
          {/* Политика */}
          <TitleText title={translate("abilities.politics")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.politics}
              onChange={(value) => abilityChangeHandler("politics", value)}
            />
          </TitleText>
          {/* Расследование */}
          <TitleText title={translate("abilities.investigation")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.investigation}
              onChange={(value) => abilityChangeHandler("investigation", value)}
            />
          </TitleText>
          {/* Финансы */}
          <TitleText title={translate("abilities.finance")}>
            <Select
              options={baseAbilityLevels}
              value={kindred.abilities.finance}
              onChange={(value) => abilityChangeHandler("finance", value)}
            />
          </TitleText>
          {/* Электроника */}
          <TitleText title={translate("abilities.electronics")}>
            <Select
              options={baseAbilityLevels}
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
            {translate("createUnit.disciplines")}
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
            options={disciplineNames.map((value) => ({
              value,
              name: translate(`disciplines.${value}.name`),
            }))}
            availableValues={disciplineLevels}
            addTitle={translate("editDisciplines.add")}
            deleteTitle={translate("editDisciplines.delete")}
            isObjectFixed={kindred.clan.clanName !== "Other"}
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
            availableValues={backgroundLevels}
            addTitle={translate("editBackgrounds.add")}
            deleteTitle={translate("editBackgrounds.delete")}
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
            <Select
              options={mentalStabilityLevels}
              value={kindred.mentalStability.morality}
              onChange={(value) => mentalStabilityHandler("morality", value)}
            />
          </TitleText>
          {/* Самоконтроль/инстинкты" */}
          <TitleText title={translate("mentalStability.selfControl")}>
            <Select
              options={mentalStabilityLevels}
              value={kindred.mentalStability.selfControl}
              onChange={(value) => mentalStabilityHandler("selfControl", value)}
            />
          </TitleText>
          {/* Смелость" */}
          <TitleText title={translate("mentalStability.courage")}>
            <Select
              options={mentalStabilityLevels}
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
            deleteTitle={translate("editMeritsAndFlaws.delete")}
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
            deleteTitle={translate("editMeritsAndFlaws.delete")}
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
          <div>{`${translate("fields.maxBloodPool")}: ${generationLevel.maxBloodPool}, ${translate("fields.bloodConsumptionLimitPerTurn")}: ${generationLevel.bloodConsumptionLimitPerTurn}`}</div>
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
          <TitleText title={translate("createUnit.healthLevel")}>
            {translate(
              `healthLevels.${getKinderedHealthLevel(kindred.bodyDamages).name}`,
            )}
          </TitleText>
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
            deleteTitle={translate("editDamages.delete")}
            isOverflow={
              getKinderedHealthLevel(kindred.bodyDamages).name ===
                "finalDeath" ||
              getKinderedHealthLevel(kindred.bodyDamages).name === "torpor"
            }
          />
        </>
      }
    />
  );
};
