import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Input } from "baseComponents/Input";
import { HealCheckbox } from "icons/HealCheckBox";
import { NumberCheckboxesInput } from "commonComponents/NumberCheckboxesInput";
import { TitleText } from "commonComponents/TitleText";
import { WoundType } from "domain/Wound";
import { FC, useState } from "react";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import useTranslate from "services/translate/useTranslate";

const Buttons = styled.div({
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
});

const StyledButton = styled(Button)`
  width: 100%;
`;

interface TProps {
  onHeal: (values: {
    value: number;
    description: string;
    type: WoundType;
  }) => void;
}
export const Form: FC<TProps> = ({ onHeal }) => {
  const { translate } = useTranslate();
  const [values, setValues] = useState<{ value: number; description: string }>({
    value: 1,
    description: "",
  });
  return (
    <>
      {/* Количество исцеления */}
      <TitleText title={translate("healUnit.healCount")}>
        <NumberCheckboxesInput
          align="left"
          value={values.value}
          max={10}
          onChange={(value) => setValues((values) => ({ ...values, value }))}
          CustomCheckBox={HealCheckbox}
        />
      </TitleText>

      {/* Описание */}
      <TitleText title={translate("healUnit.description")}>
        <Input
          value={values.description}
          onChange={(ev) =>
            setValues((values) => ({ ...values, description: ev.target.value }))
          }
        />
      </TitleText>

      {/* Типы исцеляемых ран */}
      <DetailsSectionTitle>
        {translate("healUnit.healWoundType")}
      </DetailsSectionTitle>
      <Buttons>
        {/* Обычный урон */}
        <StyledButton
          onClick={() =>
            onHeal({
              ...values,
              type: "bashing",
            })
          }
        >
          {translate("wounds.bashing")}
        </StyledButton>

        {/* Летальный урон */}
        <StyledButton
          onClick={() =>
            onHeal({
              ...values,
              type: "lethal",
            })
          }
        >
          {translate("wounds.lethal")}
        </StyledButton>

        {/* Сверхестественный урон */}
        <StyledButton
          onClick={() =>
            onHeal({
              ...values,
              type: "aggravated",
            })
          }
        >
          {translate("wounds.aggravated")}
        </StyledButton>
      </Buttons>
    </>
  );
};
