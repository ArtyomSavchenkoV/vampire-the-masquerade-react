import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Input } from "baseComponents/Input";
import { PositiveNumberInput } from "commonComponents/PositiveNumberInput";
import { TitleText } from "commonComponents/TitleText";
import { DamageType } from "domain/Damage";
import { FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";

const Buttons = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

interface TProps {
  onHeal: (values: {
    value: number;
    description: string;
    type: DamageType;
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
        <PositiveNumberInput
          value={values.value}
          onChange={(value) => setValues((values) => ({ ...values, value }))}
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
      <Buttons>
        {/* Обычный урон */}
        <Button
          onClick={() =>
            onHeal({
              ...values,
              type: "bashing",
            })
          }
        >
          {translate("damages.bashing")}
        </Button>
        {/* Летальный урон */}
        <Button
          onClick={() =>
            onHeal({
              ...values,
              type: "lethal",
            })
          }
        >
          {translate("damages.lethal")}
        </Button>
        {/* Сверхестественный урон */}
        <Button
          onClick={() =>
            onHeal({
              ...values,
              type: "aggravated",
            })
          }
        >
          {translate("damages.aggravated")}
        </Button>
      </Buttons>
    </>
  );
};
