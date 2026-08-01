import { Input } from "baseComponents/Input";
import { FC, useEffect, useState } from "react";

interface TProps extends Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "onChange"
> {
  value: number | null;
  onChange: (value: number | null) => void;
}
export const NullablePositiveNumberInput: FC<TProps> = ({
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const [stringValue, setStringValue] = useState(
    value == null || isNaN(value) ? "" : String(value),
  );
  const [numberValue, setNumberValue] = useState<number | null>(value);
  useEffect(() => {
    const bothNaN =
      value !== null &&
      numberValue !== null &&
      isNaN(value) &&
      isNaN(numberValue);
    if (value !== numberValue && !bothNaN) {
      setStringValue(value == null || isNaN(value) ? "" : String(value));
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
            setNumberValue(null);
            onChange(null);
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
