import { Button } from "baseComponents/Button";
import { ModifiedAttributeLevel } from "domain/Attributes";
import { WoundType } from "domain/Wound";
import { FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { joinStrings } from "utils/string/joinStrings";
import { Select } from "baseComponents/Select";
import { TitleText } from "commonComponents/TitleText";
import { DamageType, damageTypes } from "domain/Damage";
import { DamageToWoundMap } from "domain/DamageToWoundMap";
import { NumberCheckboxesInput } from "commonComponents/NumberCheckboxesInput";
import { TextArea } from "baseComponents/TextArea";
import { DamageCheckbox } from "icons/DamageCheckBox";

const INITIAL_DAMAGE_TYPE = "blunt" as const;
const INITIAL_DAMAGE = 1;
const INITIAL_SUCCESSES = 0;

interface TProps {
  damageToWoundMap: DamageToWoundMap;
  staminaChecks: Partial<Record<WoundType, boolean>> | null;
  stamina: ModifiedAttributeLevel | null;
  absorptionDice: Partial<Record<WoundType, number>> | null;
  woundMultipliers: Partial<Record<WoundType, number>> | null;
  onDamage: (values: {
    value: number;
    description: string;
    type: WoundType;
  }) => void;
}
export const Form: FC<TProps> = ({
  damageToWoundMap,
  staminaChecks,
  stamina,
  absorptionDice,
  woundMultipliers,
  onDamage,
}) => {
  const { translate } = useTranslate();
  const createDescription = (
    damageType: DamageType,
    initialDamage: number,
    successes: number,
  ) =>
    `${translate(`damageTypes.${damageType}`)}: ${initialDamage}. ${translate("damageUnit.successes")}: ${successes}`;

  const [damageType, setDamageType] = useState<DamageType>(INITIAL_DAMAGE_TYPE);
  const [initialDamage, setInitialDamage] = useState<number>(INITIAL_DAMAGE);
  const [successes, setSuccesses] = useState<number>(INITIAL_SUCCESSES);
  const [description, setDescription] = useState<string>(
    createDescription(INITIAL_DAMAGE_TYPE, INITIAL_DAMAGE, INITIAL_SUCCESSES),
  );

  const woundType = damageToWoundMap[damageType];

  const isDamageTypeStaminaCheck =
    (woundType && staminaChecks?.[woundType]) || false;
  const damageTypeAbsorptionDice =
    (woundType && absorptionDice?.[woundType]) ?? null;
  const damageTypeDamageMultipliers =
    (woundType && woundMultipliers?.[woundType]) ?? 1;

  const dicesCount =
    (isDamageTypeStaminaCheck ? (stamina ?? 0) : 0) +
    (damageTypeAbsorptionDice ?? 0);

  const preparedDamage =
    initialDamage - successes > 0 ? initialDamage - successes : 0;

  const realDamage = Math.floor(preparedDamage * damageTypeDamageMultipliers);

  return (
    <>
      {/* Выбор типа урона */}
      <TitleText title={translate("damageUnit.selectDamageType")}>
        <Select
          options={damageTypes.map((damageType) => ({
            value: damageType,
            name: translate(`damageTypes.${damageType}`),
          }))}
          value={damageType}
          onChange={(damageType) => {
            setDamageType(damageType);
            setSuccesses(0);
            setDescription(createDescription(damageType, initialDamage, 0));
          }}
          size={4}
        />
      </TitleText>

      {/* Количество урона */}
      <TitleText title={translate("damageUnit.damageCount")}>
        <NumberCheckboxesInput
          align="left"
          value={initialDamage}
          onChange={(value) => {
            setInitialDamage(value);
            setDescription(createDescription(damageType, value, successes));
          }}
          max={20}
          CustomCheckBox={DamageCheckbox}
        />
      </TitleText>

      {/* Тип ран */}
      <TitleText title={translate("damageUnit.woundType")}>
        {woundType
          ? translate(`wounds.${woundType}`)
          : translate("damageUnit.fullResist")}
      </TitleText>

      {/* Проверки */}
      <TitleText title={translate("damageUnit.checks")}>
        {joinStrings(
          " = ",
          joinStrings(
            " + ",
            isDamageTypeStaminaCheck
              ? `${translate("damageUnit.stamina")}(${stamina ?? 0})`
              : null,
            damageTypeAbsorptionDice != null
              ? `${translate("damageUnit.fortitude")}(${damageTypeAbsorptionDice})`
              : null,
          ) || null,
          dicesCount,
        )}
      </TitleText>

      {/* Успехи проверок */}
      <TitleText title={translate("damageUnit.successes")}>
        <NumberCheckboxesInput
          align="left"
          value={successes}
          onChange={(value) => {
            setSuccesses(value);
            setDescription(createDescription(damageType, initialDamage, value));
          }}
          max={dicesCount}
        />
      </TitleText>

      {/* Множитель */}
      <TitleText title={translate("damageUnit.multiplier")}>
        {damageTypeDamageMultipliers}
      </TitleText>

      {/* Описание */}
      <TitleText title={translate("damageUnit.description")}>
        <TextArea
          rows={2}
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </TitleText>

      {/* Применить */}
      <Button
        onClick={() =>
          woundType &&
          onDamage({
            value: realDamage,
            description,
            type: woundType,
          })
        }
        disabled={!woundType}
      >
        {`${translate("damageUnit.complete")}: ${
          woundType
            ? `${translate(`wounds.${woundType}`)} (${realDamage})`
            : translate("damageUnit.fullResist")
        }`}
      </Button>
    </>
  );
};
