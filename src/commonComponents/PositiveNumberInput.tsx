import { Input } from "baseComponents/Input";
import { FC, useEffect, useState } from "react";

interface TProps extends Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "onChange"
> {
  value: number;
  onChange: (value: number) => void;
}
export const PositiveNumberInput: FC<TProps> = ({
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const [stringValue, setStringValue] = useState(String(value));
  const [numberValue, setNumberValue] = useState<number>(value);
  useEffect(() => {
    if (value !== numberValue) {
      setStringValue(String(value));
      setNumberValue(value);
    }
  }, [value, numberValue]);

  return (
    <Input
      value={stringValue.replace(".", ",")}
      onChange={(ev) => {
        let newValue = ev.target.value.replace(".", ",");
        if (/^\d*,?\d*$/.test(newValue)) {
          setStringValue(newValue);
          if (newValue === "") {
          } else {
            setNumberValue(+newValue.replace(",", "."));
            onChange(+newValue.replace(",", "."));
          }
        }
      }}
      onBlur={(ev) => {
        setStringValue(value == null || isNaN(value) ? "" : String(value));
        onBlur?.(ev);
      }}
      {...props}
    />
  );
};
