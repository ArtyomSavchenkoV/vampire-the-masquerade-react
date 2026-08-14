import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Input } from "baseComponents/Input";
import { Tab } from "baseComponents/Tab";
import { PositiveNumberInput } from "commonComponents/PositiveNumberInput";
import { TitleText } from "commonComponents/TitleText";
import { ModifiedAttributeLevel } from "domain/Attributes";
import { DamageType } from "domain/Damage";
import { FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { joinStrings } from "utils/string/joinStrings";

const Buttons = styled.div({
  display: "flex",
  gap: 8,
});

interface TProps {
  staminaChecks: Partial<Record<DamageType, boolean>> | null;
  stamina: ModifiedAttributeLevel | null;
  absorptionDice: Partial<Record<DamageType, number>> | null;
  damageMultipliers: Partial<Record<DamageType, number>> | null;
  onDamage: (values: {
    value: number;
    description: string;
    type: DamageType;
  }) => void;
}
export const Form: FC<TProps> = ({
  staminaChecks,
  stamina,
  absorptionDice,
  damageMultipliers,
  onDamage,
}) => {
  const { translate } = useTranslate();
  const [description, setDescription] = useState<string>("");
  const [initialDamage, setInitialDamage] = useState<number>(1);
  const [damageType, setDamageType] = useState<DamageType>("bashing");
  const [successes, setSuccesses] = useState<number>(0);

  const damageTypeChangeHandler = (damageType: DamageType) => {
    setDamageType(damageType);
    setSuccesses(0);
  };

  const isDamageTypeStaminaCheck = staminaChecks?.[damageType] || false;
  const damageTypeAbsorptionDice = absorptionDice?.[damageType] ?? null;
  const damageTypeDamageMultipliers = damageMultipliers?.[damageType] ?? 1;

  const preparedDamage =
    initialDamage - successes > 0 ? initialDamage - successes : 0;

  const realDamage = Math.floor(preparedDamage * damageTypeDamageMultipliers);

  return (
    <>
      {/* Тип урона */}
      <Buttons>
        {/* Обычный урон */}
        <Tab
          onClick={() => damageTypeChangeHandler("bashing")}
          isSelected={damageType === "bashing"}
        >
          {translate("damages.bashing")}
        </Tab>
        {/* Летальный урон */}
        <Tab
          onClick={() => damageTypeChangeHandler("lethal")}
          isSelected={damageType === "lethal"}
        >
          {translate("damages.lethal")}
        </Tab>
        {/* Сверхестественный урон */}
        <Tab
          onClick={() => damageTypeChangeHandler("aggravated")}
          isSelected={damageType === "aggravated"}
        >
          {translate("damages.aggravated")}
        </Tab>
      </Buttons>
      {/* Количество урона */}
      <TitleText title={translate("damageUnit.healCount")}>
        <PositiveNumberInput
          value={initialDamage}
          onChange={(value) => setInitialDamage(value)}
        />
      </TitleText>
      {/* Описание */}
      <TitleText title={translate("damageUnit.description")}>
        <Input
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </TitleText>
      {/* Проверки */}
      {(isDamageTypeStaminaCheck || damageTypeAbsorptionDice != null) && (
        <>
          {/* Формула количества дайсов для броска */}
          <TitleText title={translate("dice.dicesToRoll")}>
            {`${joinStrings(
              " + ",
              isDamageTypeStaminaCheck
                ? `${stamina} (${translate("attributes.stamina")})`
                : null,
              damageTypeAbsorptionDice != null
                ? `${damageTypeAbsorptionDice} (${translate("calculatedFields.fortitude")})`
                : null,
            )} = ${(isDamageTypeStaminaCheck ? (stamina ?? 0) : 0) + (damageTypeAbsorptionDice ?? 0)}`}
          </TitleText>
          {/* Количество успехов */}
          <TitleText title={translate("dice.successes")}>
            <PositiveNumberInput
              value={successes}
              onChange={(value) => setSuccesses(value)}
            />
          </TitleText>
        </>
      )}
      {/* Рассчёт урона */}
      <TitleText title={translate("damageUnit.calculateDamage")}>
        {`(${initialDamage} - ${successes}) * ${damageTypeDamageMultipliers}`}
      </TitleText>
      {/* Применить */}
      <Button
        onClick={() =>
          onDamage({
            value: realDamage,
            description,
            type: damageType,
          })
        }
      >
        {`${translate("damageUnit.complete")}: ${translate(`damages.${damageType}`)} (${realDamage})`}
      </Button>
    </>
  );
};
