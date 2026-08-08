import { abilityNames, baseAbilityLevels } from "domain/Abilities";
import { attributeNames, baseAttributeLevels } from "domain/Attributes";
import { Creature } from "domain/creature/Creature";
import {
  MentalStability,
  MentalStabilityLevel,
  mentalStabilityLevels,
} from "domain/MentalStability";
import { FC, HTMLAttributes } from "react";
import useTranslate from "services/translate/useTranslate";
import { CreatureLayout } from "./common/CreatureLayout";
import { NameTitleText } from "commonComponents/NameTitleText";
import { NameInput } from "./common/NameInput";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import { PartialObjectEditor } from "commonComponents/PartialObjectEditor";
import { TitleText } from "commonComponents/TitleText";
import { WithoutBorderSelect } from "commonComponents/WithoutBorderSelect";
import { Select } from "baseComponents/Select";
import { willpowerLevels } from "domain/Willpower";
import { ArrayEditor } from "commonComponents/ArrayEditor";
import { damageTypes } from "domain/Damage";
import { getHealthLevelTranslateKey } from "domain/Health";
import { EditHealthLevels } from "./common/EditHealthLevels";
import { getCreatureHealthLevel } from "domain/creature/Health";
import { Info } from "./common/Info";

interface TProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  creature: Creature;
  onChange: (creature: Creature) => void;
}

export const EditCreatureForm: FC<TProps> = ({
  creature,
  onChange,
  ...props
}) => {
  const { translate } = useTranslate();

  const mentalStabilityHandler = (
    name: MentalStability,
    value: MentalStabilityLevel,
  ) => {
    onChange({
      ...creature,
      mentalStability: { ...creature.mentalStability, [name]: value },
    });
  };

  const healthLevel = getCreatureHealthLevel(
    creature.healthLevels,
    creature.bodyDamages,
  );

  const MAX_HEALTH = creature.healthLevels.length - 1;
  return (
    <CreatureLayout
      name={
        /* Имя */
        <NameTitleText title={translate("fields.name")}>
          <NameInput
            value={creature.name}
            onChange={(ev) => onChange({ ...creature, name: ev.target.value })}
          />
        </NameTitleText>
      }
      player={
        /* Игрок */
        <NameTitleText title={translate("fields.player")}>
          <NameInput
            value={creature.player ?? ""}
            onChange={(ev) =>
              onChange({ ...creature, player: ev.target.value || null })
            }
          />
        </NameTitleText>
      }
      attributes={
        <>
          {/* Характеристики */}
          <DetailsSectionTitle>
            {translate("fields.attributes")}
          </DetailsSectionTitle>
          <PartialObjectEditor
            object={creature.attributes}
            onChange={(attributes) => onChange({ ...creature, attributes })}
            options={attributeNames.map((value) => ({
              value,
              name: translate(`attributes.${value}`),
            }))}
            availableValues={baseAttributeLevels.map((level) => ({
              value: level,
              name: translate(`parametersEditLevels.${level}`),
            }))}
            addTitle={translate("editAttributes.add")}
          />
        </>
      }
      abilities={
        <>
          {/* Способности */}
          <DetailsSectionTitle>
            {translate("fields.abilities")}
          </DetailsSectionTitle>
          <PartialObjectEditor
            object={creature.abilities}
            onChange={(abilities) => onChange({ ...creature, abilities })}
            options={abilityNames.map((value) => ({
              value,
              name: translate(`abilities.${value}`),
            }))}
            availableValues={baseAbilityLevels.map((level) => ({
              value: level,
              name: translate(`parametersEditLevels.${level}`),
            }))}
            addTitle={translate("editAbilities.add")}
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
              value={creature.mentalStability.morality}
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
              value={creature.mentalStability.selfControl}
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
              value={creature.mentalStability.courage}
              onChange={(value) => mentalStabilityHandler("courage", value)}
            />
          </TitleText>
        </>
      }
      willpower={
        <>
          {/* Воля */}
          <DetailsSectionTitle>
            {translate("createUnit.willpower")}
          </DetailsSectionTitle>
          {/* Максимальный запас воли */}
          <TitleText title={translate("fields.maxWillpower")}>
            <Select
              value={creature.maxWillpower}
              options={willpowerLevels}
              onChange={(maxWillpower) =>
                onChange({
                  ...creature,
                  maxWillpower,
                  willpower:
                    creature.willpower > maxWillpower
                      ? maxWillpower
                      : creature.willpower,
                })
              }
            />
          </TitleText>
          {/* Воля */}
          <TitleText title={translate("fields.willpower")}>
            <Select
              value={creature.willpower}
              options={willpowerLevels.filter(
                (level) => level <= creature.maxWillpower,
              )}
              onChange={(willpower) => onChange({ ...creature, willpower })}
            />
          </TitleText>
        </>
      }
      health={
        <>
          {/* Здоровье */}
          <DetailsSectionTitle>
            {`${translate("createUnit.health")}: ${MAX_HEALTH - creature.bodyDamages.length}/${MAX_HEALTH}`}
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
            array={creature.bodyDamages}
            onChange={(bodyDamages) =>
              onChange({
                ...creature,
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
              getCreatureHealthLevel(
                creature.healthLevels,
                creature.bodyDamages,
              ).name === "final"
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
            healthLevels={creature.healthLevels}
            onChange={(healthLevels) =>
              onChange({ ...creature, healthLevels, bodyDamages: [] })
            }
          />
        </>
      }
      {...props}
    />
  );
};
